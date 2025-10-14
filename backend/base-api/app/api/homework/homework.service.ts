import { pool } from "../../common/services/sql.service";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import createHttpError from "http-errors";
import { IHomeworkAssignment, IHomeworkQuery, IHomeworkSubmission } from "./homework.dto";
import fs from "fs";
import cloudinary from "../../common/services/cloudinary.service";
import path from "path";


export const createHomework = async (data: IHomeworkAssignment) => {
  try {
    // Resolve classId from className if necessary
    const resolvedClassId = data.classId ?? (
      data.className
        ? await (async () => {
            const [rows] = await pool.execute<RowDataPacket[]>(
              `SELECT id FROM classes WHERE name = ? LIMIT 1`,
              [data.className]
            );
            if (!rows.length) {
              throw createHttpError(404, `Class not found: ${data.className}`);
            }
            return Number(rows[0].id);
          })()
        : undefined
    );

    if (resolvedClassId == null) {
      throw createHttpError(400, "classId or className is required");
    }

    // Resolve subjectId from subjectName if necessary
    const resolvedSubjectId = data.subjectId ?? (
      data.subjectName
        ? await (async () => {
            const [rows] = await pool.execute<RowDataPacket[]>(
              `SELECT id FROM subjects WHERE name = ? LIMIT 1`,
              [data.subjectName]
            );
            if (!rows.length) {
              throw createHttpError(404, `Subject not found: ${data.subjectName}`);
            }
            return Number(rows[0].id);
          })()
        : undefined
    );

    if (resolvedSubjectId == null) {
      throw createHttpError(400, "subjectId or subjectName is required");
    }

    const columns = [
      "title",
      "description",
      "class_id",
      "subject_id",
      "due_date",
      "assigned_by_id",
    ];
    const values = [
      data.title,
      data.description ?? null,
      resolvedClassId,
      resolvedSubjectId,
      data.dueDate ?? null,
      data.assignedById,
    ];

    const placeholders = columns.map(() => "?");
    const query = `INSERT INTO homework (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  } catch (error) {
    throw createHttpError(500, `Failed to create homework: ${(error as Error).message}`);
  }
};


export const listHomework = async (filters: IHomeworkQuery) => {
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (filters.classId) {
    where.push("class_id = ?");
    values.push(filters.classId); 
  }
  if (filters.subjectId) { 
    where.push("subject_id = ?"); 
    values.push(filters.subjectId); 
  }
  if (filters.assignedById) { 
    where.push("assigned_by_id = ?"); 
    values.push(filters.assignedById); 
  }
  if (filters.dueBefore) { 
    where.push("due_date <= ?"); 
    values.push(filters.dueBefore); 
  }
  if (filters.dueAfter) { 
    where.push("due_date >= ?"); 
    values.push(filters.dueAfter); 
  }

  try {
    const query = `SELECT id,
                    title, 
                    description, 
                    class_id AS classId, 
                    subject_id AS subjectId, 
                    assigned_by_id AS assignedById, 
                    DATE_FORMAT(due_date, '%Y-%m-%d') AS dueDate, 
                    created_at AS createdOn, 
                    updated_at AS updatedOn 
                FROM homework 
                ${where.length ? "WHERE " + where.join(" AND ") : ""} 
                ORDER BY due_date ASC`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    return rows;
  } catch (error) {
    throw createHttpError(500, `Failed to list homework: ${(error as Error).message}`);
  }
};

// export const submitHomework = async (
//   data: IHomeworkSubmission,
//   filePath?: string
// ) => {
//   try {
//     const [existing] = await pool.execute<RowDataPacket[]>(
//       `SELECT id FROM homework_submissions WHERE homework_id = ? AND student_id = ? LIMIT 1`,
//       [data.homeworkId, data.studentId]
//     );
//     if (existing.length > 0) {
//       throw createHttpError(409, "You have already submitted this homework");
//     }

//     const columns = [
//       "homework_id",
//       "student_id",
//       "content",
//       "attachment_url",
//       "submitted_on",
//       "status",
//       "grade",
//       "remarks",
//     ];
//     const values = [
//       data.homeworkId,
//       data.studentId,
//       data.content ?? null,
//       filePath ?? null,
//       data.submittedOn ?? new Date().toISOString().slice(0, 19).replace("T", " "),
//       data.status ?? "submitted",
//       data.grade ?? null,
//       data.remarks ?? null,
//     ];

//     const placeholders = columns.map(() => "?");
//     const query = `INSERT INTO homework_submissions 
//                    (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
//     const [result] = await pool.execute<ResultSetHeader>(query, values);

//     return { id: result.insertId };
//   } catch (error) {
//     throw createHttpError(
//       500,
//       `Failed to submit homework: ${(error as Error).message}`
//     );
//   }
// };


export const submitHomework = async (
  data: IHomeworkSubmission,
  file?: Express.Multer.File
) => {
  try {
    //  Check if student already submitted this homework
    const [existing] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM homework_submissions WHERE homework_id = ? AND student_id = ? LIMIT 1`,
      [data.homeworkId, data.studentId]
    );

    if (existing.length > 0) {
      throw createHttpError(409, "You have already submitted this homework");
    }

    //  Upload file to Cloudinary (if provided)
    let attachmentUrl: string | null = null;

    if (file && file.path) {
      // Automatically handle all file types (image, pdf, doc, etc.)
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        folder: "homework_submissions",
        resource_type: "auto", 
        use_filename: true,
        unique_filename: false,
      });

      // Assign Cloudinary URL
      attachmentUrl = uploadRes.secure_url || uploadRes.url || null;

      // Remove temporary file from server
      fs.unlinkSync(file.path);
    }

    console.log("File Info:", file);
    console.log("Data:", data);
    console.log("Cloudinary URL:", attachmentUrl);

    //  Prepare insert query
    const columns = [
      "homework_id",
      "student_id",
      "content",
      "attachment_url",
      "submitted_on",
      "status",
      "grade",
      "remarks",
    ];

    const values = [
      data.homeworkId,
      data.studentId,
      data.content ?? null,
      attachmentUrl,
      data.submittedOn ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      data.status ?? "submitted",
      data.grade ?? null,
      data.remarks ?? null,
    ];

    const placeholders = columns.map(() => "?").join(", ");
    const query = `INSERT INTO homework_submissions (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;

    const [result] = await pool.execute<ResultSetHeader>(query, values);

    //  Return inserted record details
    return { id: result.insertId, attachmentUrl };
  } catch (error: any) {
    console.error("Error submitting homework:", error);
    throw createHttpError(
      500,
      `Failed to submit homework: ${error.message || "Unknown error"}`
    );
  }
};

export const confirmSubmission = async (
  homeworkId: number,
  studentId: number,
  data: Partial<IHomeworkSubmission>
) => {
  // Find the submission row for this student + homework
  const [existingRows] = await pool.execute<RowDataPacket[]>(
    `SELECT id FROM homework_submissions 
       WHERE homework_id = ? AND student_id = ? LIMIT 1`,
    [homeworkId, studentId]
  );

  if (!existingRows.length) {
    throw createHttpError(404, "Submission not found for this student and homework");
  }

  const submissionId = existingRows[0].id;

  const updates: string[] = [];
  const values: Array<string | number | null> = [];

  if (data.status !== undefined) {
    updates.push("status = ?");
    values.push(data.status);
  }
  if (data.grade !== undefined) {
    updates.push("grade = ?");
    values.push(data.grade);
  }
  if (data.remarks !== undefined) {
    updates.push("remarks = ?");
    values.push(data.remarks);
  }

  if (!updates.length) {
    throw createHttpError(400, "No fields to update");
  }

  // Always update timestamp
  updates.push("updated_at = NOW()");

  const query = `UPDATE homework_submissions SET ${updates.join(", ")} WHERE id = ?`;
  values.push(submissionId);

  await pool.execute<ResultSetHeader>(query, values);

  // Return updated row
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT id, homework_id AS homeworkId, student_id AS studentId, content,
            attachment_url AS attachmentUrl, status, grade, remarks,
            created_at AS createdOn, updated_at AS updatedOn
       FROM homework_submissions WHERE id = ? LIMIT 1`,
    [submissionId]
  );

  return rows[0];
};
