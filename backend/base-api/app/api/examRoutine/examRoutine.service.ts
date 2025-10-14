import { pool } from '../../common/services/sql.service';
import path from 'path';
import fs from 'fs/promises';
import cloudinary from '../../common/services/cloudinary.service';
import { IExamRoutineQuery, IExamRoutineRecord, ICreateExamRoutine } from './examRoutine.dto';

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'base-api', 'app', 'api', 'examRoutine', 'uploads');

type UploadMeta = { 
  className?: string | null; 
  branchName?: string | null; 
  examName?: string | null; 
  uploaded_by?: number | null; 
};

export const uploadRoutine = async (
  file: Express.Multer.File,
  meta: UploadMeta
): Promise<IExamRoutineRecord> => {
  if (!file || !file.path) throw new Error('Invalid file');

  // Fetch branch_id from branchName
  let branchId: number | null = null;
  if (meta.branchName) {
    const [branchRows]: any = await pool.execute(
      'SELECT id FROM branches WHERE name = ? LIMIT 1', 
      [meta.branchName]
    );
    if (branchRows.length > 0) branchId = branchRows[0].id;
    else throw new Error(`Branch not found: ${meta.branchName}`);
  }
  console.log("branchId",branchId)
  // Fetch class_id from className
  let classId: number | null = null;
  if (meta.className) {
    const [classRows]: any = await pool.execute(
      'SELECT id FROM classes WHERE name = ? LIMIT 1', 
      [meta.className]
    );
    if (classRows.length > 0) classId = classRows[0].id;
    else throw new Error(`Class not found: ${meta.className}`);
  }
console.log("classId",classId)
  // Fetch exam_id from examName
  let examId: number | null = null;
  if (meta.examName) {
    const [examRows]: any = await pool.execute(
      'SELECT id FROM exams WHERE exam_name = ? LIMIT 1', 
      [meta.examName]
    );
    if (examRows.length > 0) examId = examRows[0].id;
    else throw new Error(`Exam not found: ${meta.examName}`);
  }
console.log("examId",examId)
  // Upload file to Cloudinary
  const uploadRes = await cloudinary.uploader.upload(file.path, {
    folder: 'exam_routine',
    resource_type: 'auto',
    use_filename: true,
    unique_filename: false,
  });

  const cloudUrl = uploadRes.secure_url || uploadRes.url || "";
  const publicId = uploadRes.public_id || null;

  // Prepare insert data
  const localRel = path.relative(process.cwd(), file.path).replace(/\\/g, '/');

  const sql = `
    INSERT INTO exam_routine
    (file_name, original_name, exam_id, class_id, branch_id, url, public_id, uploaded_by, file_size, mime_type, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const params = [
    localRel,
    file.originalname,
    examId,
    classId,
    branchId,
    cloudUrl,
    publicId,
    meta.uploaded_by || null,
    file.size,
    file.mimetype,
    true
  ];

  const [result]: any = await pool.execute(sql, params);
  const insertId = result.insertId;

  //  Return response
  return {
    id: insertId,
    fileName: localRel,
    originalName: file.originalname,
    examId,
    classId,
    branchId,
    url: cloudUrl,
    uploadedBy: meta.uploaded_by,
    fileSize: file.size,
    mimeType: file.mimetype,
    status: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const getAllRoutines = async (filters?: any): Promise<IExamRoutineRecord[]> => {
  let where: string[] = [];
  let params: any[] = [];

  // alias className -> class
  const classFilter = filters?.class ?? filters?.className;
  if (classFilter) {
    where.push("class = ?");
    params.push(classFilter);
  }

  // resolve branchName -> branchId if provided
  let branchIdFilter = filters?.branchId as number | undefined;
  if (!branchIdFilter && filters?.branchName) {
    const [brows]: any = await pool.execute('SELECT id FROM branches WHERE name = ? LIMIT 1', [filters.branchName]);
    if (brows && brows.length > 0) branchIdFilter = Number(brows[0].id);
  }
  if (branchIdFilter) {
    where.push("branch_id = ?");
    params.push(branchIdFilter);
  }

  if (filters?.examName) {
    where.push("exam_name = ?");
    params.push(filters.examName);
  }

  const sql = `
    SELECT * FROM exam_routine
    ${where.length ? "WHERE " + where.join(" AND ") : ""}
    ORDER BY created_at DESC
    LIMIT 1000
  `;
  const [rows]: any = await pool.execute(sql, params);
  return rows as IExamRoutineRecord[];
};

export const deleteRoutineById = async (id: number): Promise<boolean> => {
  // 1) fetch record
  const [rows]: any = await pool.execute('SELECT * FROM exam_routine WHERE id = ? LIMIT 1', [id]);
  if (!rows || rows.length === 0) return false;
  const row = rows[0];

  // 2) delete from cloudinary if url/public_id found
  try {
    let publicId: string | null = null;
    if (row.public_id) {
      publicId = row.public_id;
    } else if (row.url) {
      const match = row.url.match(/\/exam-routine\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
      if (match && match[1]) {
        publicId = `exam-routine/${match[1]}`;
      }
    }
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
    }
  } catch (e) {
    console.warn('Cloudinary delete warning', e);
  }

  // 3) delete local file if exists
  try {
    if (row.file_name) {
      const abs = path.join(process.cwd(), row.file_name);
      await fs.unlink(abs).catch(() => null);
    }
  } catch (e) {
    console.warn('Local delete warning', e);
  }

  // 4) delete DB record
  await pool.execute('DELETE FROM exam_routine WHERE id = ?', [id]);
  return true;
};

export const deleteRoutineByName = async (
  className: string,
  branchName: string
): Promise<{ deleted: number }> => {
  // resolve branch id by name
  const [brows]: any = await pool.execute('SELECT id FROM branches WHERE name = ? LIMIT 1', [branchName]);
  if (!brows || brows.length === 0) {
    return { deleted: 0 };
  }
  const branchId = Number(brows[0].id);

  // fetch all matching routines
  const [rows]: any = await pool.execute(
    'SELECT * FROM exam_routine WHERE class_id = ? AND branch_id = ?',
    [className, branchId]
  );
  if (!rows || rows.length === 0) {
    return { deleted: 0 };
  }

  let deleted = 0;
  for (const row of rows) {
    try {
      let publicId: string | null = null;
      if (row.public_id) {
        publicId = row.public_id;
      } else if (row.url) {
        const match = row.url.match(/\/exam-routine\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
        if (match && match[1]) publicId = `exam-routine/${match[1]}`;
      }
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
      }
    } catch (e) {
      console.warn('Cloudinary delete warning', e);
    }

    try {
      if (row.file_name) {
        const abs = path.join(process.cwd(), row.file_name);
        await fs.unlink(abs).catch(() => null);
      }
    } catch (e) {
      console.warn('Local delete warning', e);
    }

    await pool.execute('DELETE FROM exam_routine WHERE id = ?', [row.id]);
    deleted += 1;
  }

  return { deleted };
};


//soft delete
export const deleteSoftRoutineByName = async (className: string, branchName: string): Promise<{ deleted: number }> => {
  const [brows]: any = await pool.execute('SELECT id FROM branches WHERE name = ? LIMIT 1', [branchName]);
  if (!brows || brows.length === 0) {
    return { deleted: 0 };
  }
  const branchId = Number(brows[0].id);

  const [rows]: any = await pool.execute(
    'SELECT * FROM exam_routine WHERE class_id = ? AND branch_id = ?',
    [className, branchId]
  );
  if (!rows || rows.length === 0) {
    return { deleted: 0 };
  }

  let deleted = 0;
  for (const row of rows) {
    await pool.execute('UPDATE exam_routine SET status = 0 WHERE id = ?', [row.id]);
    deleted += 1;
  }

  return { deleted };
};