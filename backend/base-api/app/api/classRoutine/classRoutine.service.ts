import { pool } from '../../common/services/sql.service';
import path from 'path';
import fs from 'fs/promises';
import cloudinary from '../../common/services/cloudinary.service';
import { ICreateClassRoutine, IClassRoutineRecord } from './classRoutine.dto';
import createHttpError from 'http-errors';

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'base-api', 'app', 'api', 'classRoutine', 'uploads');

type UploadMeta = { className?: string | null; branchName?: string | null; uploaded_by?: number | null };

export const uploadRoutine = async (
  file: Express.Multer.File,
  meta: UploadMeta
): Promise<IClassRoutineRecord> => {
  if (!file || !file.path) throw new Error("Invalid file");

  const localRel = path.relative(process.cwd(), file.path).replace(/\\/g, '/');

  // Resolve branch_id from branchName
  let branchId: number | null = null;
  if (meta.branchName) {
    const [branchRows]: any = await pool.execute(
      'SELECT id FROM branches WHERE name = ? LIMIT 1',
      [meta.branchName]
    );
    if (!branchRows || branchRows.length === 0) {
      throw createHttpError(400, `Branch '${meta.branchName}' not found`);
    }
    branchId = Number(branchRows[0].id);
  }

  // Optional: ensure the class exists by name (if you maintain a classes table)
  if (meta.className) {
    try {
      const [classRows]: any = await pool.execute(
        'SELECT id FROM classes WHERE name = ? LIMIT 1',
        [meta.className]
      );
      if (!classRows || classRows.length === 0) {
        throw createHttpError(400, `Class '${meta.className}' not found`);
      }
    } catch {
      // If classes table not present, skip validation
    }
  }

  // Duplicate check before uploading
  const duplicateQuery = `
    SELECT id 
    FROM class_routines 
    WHERE original_name = ? 
      AND class = ? 
      AND branch_id = ? 
      AND status = 1
    LIMIT 1
  `;

  const [existingRows]: any = await pool.execute(duplicateQuery, [
    file.originalname,
    meta.className || null,
    branchId,
  ]);

  if (existingRows.length > 0) {
    throw createHttpError(409, 'A routine for this class and branch with the same file already exists.');
  }

  // 1) Upload to Cloudinary (only if not duplicate)
  const uploadRes = await cloudinary.uploader.upload(file.path, {
    folder: 'class_routines',
    resource_type: 'raw',
    use_filename: true,
    unique_filename: false,
  });

  const cloudUrl = uploadRes.secure_url || uploadRes.url || '';
  const publicId = uploadRes.public_id || null;

  // 2) Prepare DTO for DB insert
  const routine: ICreateClassRoutine = {
    fileName: localRel,
    originalName: file.originalname,
    url: cloudUrl,
    className: meta.className || null,
    branchId: branchId,
    uploadedBy: meta.uploaded_by || null,
    fileSize: file.size,
    mimeType: file.mimetype,
    status: true,
  };

  // 3) Insert metadata into DB
  const sql = `INSERT INTO class_routines 
    (file_name, original_name, url, public_id, class, branch_id, uploaded_by, file_size, mime_type, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

  const params = [
    routine.fileName,
    routine.originalName,
    routine.url,
    publicId,
    routine.className,
    routine.branchId,
    routine.uploadedBy,
    routine.fileSize,
    routine.mimeType,
    routine.status,
  ];

  const [result]: any = await pool.execute(sql, params);
  const insertId = result.insertId;

  return {
    id: insertId,
    fileName: routine.fileName,
    originalName: routine.originalName,
    url: routine.url,
    className: routine.className || undefined,
    branchName: meta.branchName || undefined,
    branchId: routine.branchId,
    uploadedBy: routine.uploadedBy || undefined,
    fileSize: routine.fileSize || undefined,
    mimeType: routine.mimeType || undefined,
    status: routine.status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};




export const getAllRoutines = async (): Promise<IClassRoutineRecord[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM class_routines ORDER BY created_at DESC LIMIT 1000');
  return rows as IClassRoutineRecord[];
};




// export const deleteRoutineById = async (id: number): Promise<boolean> => {
//   // 1) fetch record
//   const [rows]: any = await pool.execute('SELECT * FROM class_routines WHERE id = ? LIMIT 1', [id]);
//   if (!rows || rows.length === 0) return false;
//   const row = rows[0];

//   // 2) delete from cloudinary if url/public_id found
//   try {
//     let publicId: string | null = null;
//     if (row.public_id) {
//       publicId = row.public_id;
//     } else if (row.url) {
//       const match = row.url.match(/\/class-routines\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
//       if (match && match[1]) {
//         publicId = `class-routines/${match[1]}`;
//       }
//     }
//     if (publicId) {
//       await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
//     }
//   } catch (e) {
//     console.warn('Cloudinary delete warning', e);
//   }

//   // 3) delete local file if exists
//   try {
//     if (row.file_name) {
//       const abs = path.join(process.cwd(), row.file_name);
//       await fs.unlink(abs).catch(() => null);
//     }
//   } catch (e) {
//     console.warn('Local delete warning', e);
//   }

//   // 4) delete DB record
//   await pool.execute('DELETE FROM class_routines WHERE id = ?', [id]);
//   return true;
// };

export const deleteRoutineById = async (
  className: string,
  branchName: string
): Promise<{ deleted: number }> => {
  // resolve branch id
  const [brows]: any = await pool.execute('SELECT id FROM branches WHERE name = ? LIMIT 1', [branchName]);
  if (!brows || brows.length === 0) {
    return { deleted: 0 };
  }
  const branchId = Number(brows[0].id);

  // fetch all matching routines
  const [rows]: any = await pool.execute(
    'SELECT * FROM class_routines WHERE class = ? AND branch_id = ?',
    [className, branchId]
  );
  if (!rows || rows.length === 0) {
    return { deleted: 0 };
  }

  // delete each asset and db row
  let deleted = 0;
  for (const row of rows) {
    try {
      let publicId: string | null = null;
      if (row.public_id) {
        publicId = row.public_id;
      } else if (row.url) {
        const match = row.url.match(/\/class-routines\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
        if (match && match[1]) publicId = `class-routines/${match[1]}`;
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

    await pool.execute('DELETE FROM class_routines WHERE id = ?', [row.id]);
    deleted += 1;
  }

  return { deleted };
};





export const togglestatus = async (className: string, branchName: string): Promise<boolean> => {

  // resolve branch id
  const [brows]: any = await pool.execute('SELECT id FROM branches WHERE name = ? LIMIT 1', [branchName]);
  if (!brows || brows.length === 0) {
    return false;
  }
  const branchId = Number(brows[0].id);

  // resolve class id
  const [crows]: any = await pool.execute('SELECT id FROM classes WHERE name = ? LIMIT 1', [className]);
  if (!crows || crows.length === 0) {
    return false;
  }
  const classId = Number(crows[0].id);

  // 1) fetch record
  const [rows]: any = await pool.execute('SELECT * FROM class_routines WHERE class = ? AND branch_id = ? LIMIT 1', [className, branchId]);
  if (!rows || rows.length === 0) return false;
  const row = rows[0];

  // 2) delete from cloudinary if url/public_id found
  // try {
  //   let publicId: string | null = null;
  //   if (row.public_id) {
  //     publicId = row.public_id;
  //   } else if (row.url) {
  //     const match = row.url.match(/\/class-routines\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
  //     if (match && match[1]) {
  //       publicId = `class-routines/${match[1]}`;
  //     }
  //   }
  //   if (publicId) {
  //     await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  //   }
  // } catch (e) {
  //   console.warn('Cloudinary delete warning', e);
  // }

  // 3) delete local file if exists
  try {
    if (row.file_name) {
      const abs = path.join(process.cwd(), row.file_name);
      await fs.unlink(abs).catch(() => null);
    }
  } catch (e) {
    console.warn('Local delete warning', e);
  }

  // 4) toggle status only (soft delete)
  const current = row.status === 1 || row.status === true;
  const newStatus = current ? 0 : 1;
  await pool.execute('UPDATE class_routines SET status = ? WHERE id = ?', [newStatus, row.id]);
  return true;
};

