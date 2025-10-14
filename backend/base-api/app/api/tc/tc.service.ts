import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";
import { ITcQueryFilters, ITcRecord, ICreateTcRequest, IUpdateTcStatusRequest, IStudentTcRequest, ITeacherTcUpdateRequest } from "./tc.dto";
import cloudinary from "../../common/services/cloudinary.service";
import { createResponse } from "../../common/helper/response.hepler";

export const listTc = async (filters: ITcQueryFilters): Promise<ITcRecord[]> => {
  const where: string[] = [];
  const values: Array<number | string> = [];

  // Resolved IDs
  let studentId: number | undefined;
  let classId: number | undefined;

  // Resolve rollNo -> studentId if provided
  if (filters.rollNo) {
    const [srows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM students WHERE roll_no = ? LIMIT 1`,
      [filters.rollNo]
    );
    if (srows && srows.length > 0) {
      studentId = Number((srows[0] as any).id);
    } else {
      // if rollNo not found, return empty list early
      return [];
    }
  }

  // Resolve className -> classId if provided
  if (filters.className) {
    const [crows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM classes WHERE name = ? LIMIT 1`,
      [filters.className]
    );
    if (crows && crows.length > 0) {
      classId = Number((crows[0] as any).id);
    } else {
      // class not found -> empty
      return [];
    }
  }

  if (studentId) {
    where.push("t.student_id = ?");
    values.push(studentId);
  }
  if (classId) {
    where.push("t.class_id = ?");
    values.push(classId);
  }
  if (filters.status) {
    where.push("t.status = ?");
    values.push(filters.status);
  }

  try {
    const query = `
      SELECT 
        t.id,
        t.student_id AS studentId,
        t.class_id AS classId,
        t.reason,
        t.status,
        t.file_name AS fileName,
        DATE_FORMAT(t.requested_date, '%Y-%m-%d') AS requestedDate,
        DATE_FORMAT(t.processed_date, '%Y-%m-%d') AS processedDate,
        t.created_at AS createdAt,
        t.updated_at AS updatedAt
      FROM tc t
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY t.requested_date DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    return rows as unknown as ITcRecord[];
  } catch (error) {
    throw createHttpError(500, `Failed to fetch TC records: ${(error as Error).message}`);
  }
};

// Teacher creates a TC entry (more fields allowed)
export const createTcFromTeacher = async (data: ITeacherTcUpdateRequest): Promise<{ id: number }> => {
  // 1) Optional: resolve className -> classId
  if (data.className && !data.classId) {
    const [crows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM classes WHERE name = ? LIMIT 1`,
      [data.className]
    );
    if (!crows || crows.length === 0) {
      throw createHttpError(400, `Class not found with name=${data.className}`);
    }
    data.classId = Number((crows[0] as any).id);
  }

  // 2) Upload to Cloudinary if a file is provided
  let uploadedFileUrl: string | null = null;
  if (data.file && (data.file as any).path) {
    try {
      const uploadRes = await cloudinary.uploader.upload((data.file as any).path, {
        folder: "teacher_tc",
        resource_type: "raw",
        use_filename: true,
        unique_filename: false,
      });
      uploadedFileUrl = uploadRes.secure_url || uploadRes.url || null;
    } catch (err: any) {
      throw createHttpError(500, `Cloudinary upload failed: ${err.message}`);
    }
  }

  // 3) Build insert dynamically (store cloud URL in file_name)
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: Array<string | number | null> = [];

  const allowedFieldToColumn: Record<string, string> = {
    studentId: "student_id",
    classId: "class_id",
    termId: "term_id",
    fileName: "file_name",
    processedDate: "processed_date",
  };

  Object.entries(allowedFieldToColumn).forEach(([key, column]) => {
    const value = key === "fileName" ? uploadedFileUrl : (data as any)[key];
    if (value !== undefined && value !== null) {
      columns.push(column);
      placeholders.push("?");
      values.push(value as any);
    }
  });

  if (!columns.length) {
    throw createHttpError(400, "No valid fields provided to create TC record");
  }

  try {
    const query = `INSERT INTO tc (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  } catch (error) {
    throw createHttpError(500, `Failed to create TC: ${(error as Error).message}`);
  }
};

export const createTcFromStudent = async (
  data: IStudentTcRequest
): Promise<{ id: number }> => {
  try {
    // Resolve rollNo -> studentId
    const [srows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, class_id FROM students WHERE roll_no = ? LIMIT 1`,
      [data.rollNo]
    );
    if (!srows || srows.length === 0) {
      throw createHttpError(404, "Student not found");
    }
    const studentId = Number((srows[0] as any).id);
    const class_id = (srows[0] as any).class_id as number | null;

    // Step 1: Check if this student already requested a TC
    const [existing] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM tc WHERE student_id = ? LIMIT 1`,
      [studentId]
    );

    if (existing.length > 0) {
      throw createHttpError(409, "You have already requested a TC");
    }

    // Step 3: Prepare columns and values
    const columns: string[] = [];
    const placeholders: string[] = [];
    const values: Array<string | number | null> = [];

    const allowedFieldToColumn: Record<string, string> = {
      studentId: "student_id",
      reason: "reason",
      requestedDate: "requested_date",
    };

    // Insert resolved studentId
    columns.push("student_id");
    placeholders.push("?");
    values.push(studentId);

    // Optional fields from data
    if (data.reason !== undefined) {
      columns.push("reason");
      placeholders.push("?");
      values.push(data.reason);
    }
    if (data.requestedDate !== undefined) {
      columns.push("requested_date");
      placeholders.push("?");
      values.push(data.requestedDate);
    }

    // Add class_id fetched from student table
    columns.push("class_id");
    placeholders.push("?");
    values.push(class_id);

    if (!columns.length) {
      throw createHttpError(400, "No valid fields provided to create TC record");
    }

    // Step 4: Insert new TC record
    const query = `INSERT INTO tc (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);

    return { id: result.insertId };
  } catch (error: any) {
    throw createHttpError(
      500,
      `Failed to create TC: ${error.message || "Unknown error"}`
    );
  }
};

export const updateTcStatus = async (data: IUpdateTcStatusRequest): Promise<void> => {
  const set: string[] = ["status = ?"];
  const values: Array<string | number | null> = [data.status];
  if (data.processedDate) { set.push("processed_date = ?"); values.push(data.processedDate); }
  values.push(data.id);

  try {
    const query = `UPDATE tc SET ${set.join(", ")} WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    if ((result as ResultSetHeader).affectedRows === 0) {
      throw createHttpError(404, "TC record not found");
    }
  } catch (error) {
    throw createHttpError(500, `Failed to update TC status: ${(error as Error).message}`);
  }
};

export const updateTcFields = async (data: ITeacherTcUpdateRequest): Promise<{ id: number; fileName: string | null }> => {
  const set: string[] = [];
  const values: Array<string | number | null> = [];

  // If className provided, resolve to classId first
  if (data.className && !data.classId) {
    const [crows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM classes WHERE name = ? LIMIT 1`,
      [data.className]
    );
    if (!crows || crows.length === 0) {
      throw createHttpError(400, `Class not found with name=${data.className}`);
    }
    data.classId = Number((crows[0] as any).id);
  }

  const allowedFieldToColumn: Record<string, string> = {
    classId: "class_id",
    processedDate: "processed_date",
    fileName: "file_name",
  };

  // Step 1: Upload file to Cloudinary (if present)
  let uploadedFileUrl: string | null = null;

  if (data.file && (data.file as any).path) {
    try {
      const uploadRes = await cloudinary.uploader.upload((data.file as any).path, {
        folder: "teacher_tc",
        resource_type: "raw",
        use_filename: true,
        unique_filename: false,
      });
      uploadedFileUrl = uploadRes.secure_url || uploadRes.url || null;
    } catch (err: any) {
      throw createHttpError(500, `Cloudinary upload failed: ${err.message}`);
    }
  }

  // Step 2: Build SQL update dynamically
  Object.entries(allowedFieldToColumn).forEach(([key, column]) => {
    const value = key === "fileName" ? uploadedFileUrl : (data as any)[key];
    if (value !== undefined && value !== null) {
      set.push(`${column} = ?`);
      values.push(value);
    }
  });

  if (!set.length) {
    // nothing to update, but still respond successfully
    return { id: data.id, fileName: uploadedFileUrl };
  }

  values.push(data.id);

  // Step 3: Execute DB update
  try {
    const query = `UPDATE tc SET ${set.join(", ")} WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);

    if ((result as ResultSetHeader).affectedRows === 0) {
      throw createHttpError(404, "TC record not found");
    }
    return { id: data.id, fileName: uploadedFileUrl };
  } catch (error: any) {
    throw createHttpError(500, `Failed to update TC: ${error.message}`);
  }
};