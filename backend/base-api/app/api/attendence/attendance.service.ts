import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";
import {
  IAttendanceQuery,
  IAttendanceRecord,
  IAttendanceSubmitInput,
} from "./attendence.dto";

export const findAttendanceForStudent = async (filters: IAttendanceQuery): Promise<IAttendanceRecord[]> => {
  const where: string[] = ["student_id = ?"];
  const values: Array<number | string> = [filters.studentId];

  if (filters.fromDate) {
    where.push("date >= ?");
    values.push(filters.fromDate);
  }
  if (filters.toDate) {
    where.push("date <= ?");
    values.push(filters.toDate);
  }
  if (filters.classId) {
    where.push("class_id = ?");
    values.push(filters.classId);
  }
  if (filters.subjectId) {
    where.push("subject_id = ?");
    values.push(filters.subjectId);
  }

  try {
    const query = `
      SELECT 
        id as id,
        student_id AS studentId,
        class_id AS classId,
        subject_id AS subjectId,
        status,
        taken_by_id AS takenById,
        remarks,
        DATE_FORMAT(date, '%Y-%m-%d') AS date
      FROM attendance
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY date DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    return rows as IAttendanceRecord[];
  } catch (error) {
    throw createHttpError(500, `Failed to fetch attendance: ${(error as Error).message}`);
  }
};



export const submitAttendance = async (
  data: IAttendanceSubmitInput
): Promise<{ inserted: number; alreadyPresent: number; date: string; message: string }> => {
  const date = data.date;

  try {
    // 1) Resolve classId via className if needed
    let classId = data.classId;
    if (!classId && (data as any).className) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM classes WHERE name = ? LIMIT 1`,
        [(data as any).className]
      );
      if (!rows || rows.length === 0) {
        throw createHttpError(400, `Invalid className: ${(data as any).className}`);
      }
      classId = Number((rows[0] as any).id);
    }
    if (!classId) throw createHttpError(400, "classId or className is required");

    // 2) Resolve subjectId via subjectName if needed
    let subjectId = data.subjectId;
    if (!subjectId && (data as any).subjectName) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM subjects WHERE name = ? LIMIT 1`,
        [(data as any).subjectName]
      );
      if (!rows || rows.length === 0) {
        throw createHttpError(400, `Invalid subjectName: ${(data as any).subjectName}`);
      }
      subjectId = Number((rows[0] as any).id);
    }
    if (!subjectId) throw createHttpError(400, "subjectId or subjectName is required");

    // 3) Resolve studentIds
    const entries = data.entries || [];
    if (entries.length === 0) return { inserted: 0, alreadyPresent: 0, date, message: "No entries" };

    const rollNosToResolve = Array.from(
      new Set(
        entries
          .filter((e) => !e.studentId && (e as any).rollNo != null)
          .map((e) => String((e as any).rollNo))
      )
    );

    const rollNoToStudentId = new Map<string, number>();
    if (rollNosToResolve.length > 0) {
      const placeholders = rollNosToResolve.map(() => "?").join(", ");
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT id, roll_no FROM students WHERE class_id = ? AND roll_no IN (${placeholders})`,
        [classId, ...rollNosToResolve]
      );
      for (const r of rows) {
        rollNoToStudentId.set(String((r as any).roll_no), Number((r as any).id));
      }
      const unresolved = rollNosToResolve.filter((rn) => !rollNoToStudentId.has(String(rn)));
      if (unresolved.length > 0) {
        throw createHttpError(400, `Invalid rollNo for class ${classId}: ${unresolved.join(", ")}`);
      }
    }

    const resolved = entries.map((e) => {
      const sid =
        e.studentId ??
        ((e as any).rollNo != null
          ? rollNoToStudentId.get(String((e as any).rollNo))
          : undefined);
      if (!sid) throw createHttpError(400, "Each entry must include a valid studentId or rollNo");
      return { sid: sid as number, status: e.status, remarks: e.remarks ?? null };
    });

    const uniqueSids = Array.from(new Set(resolved.map((r) => r.sid)));

    // 4) Check for already existing attendance
    const sidPlaceholders = uniqueSids.map(() => "?").join(", ");
    const [existingRows] = await pool.execute<RowDataPacket[]>(
      `SELECT student_id FROM attendance 
       WHERE class_id = ? AND subject_id = ? AND date = ? AND student_id IN (${sidPlaceholders})`,
      [classId, subjectId, date, ...uniqueSids]
    );
    const existingSet = new Set((existingRows as any[]).map((r) => Number(r.student_id)));

    const toInsert = resolved.filter((r) => !existingSet.has(r.sid));
    const alreadyPresent = uniqueSids.filter((sid) => existingSet.has(sid)).length;

    // If all already present
    if (toInsert.length === 0) {
      return {
        inserted: 0,
        alreadyPresent,
        date,
        message: "Attendance already marked for all students on this date.",
      };
    }

    // 5) Insert new attendance records
    const insertValues = toInsert.map((r) => [
      r.sid,
      classId!,
      subjectId!,
      r.status,
      data.takenById,
      r.remarks,
      date,
    ]);

    const placeholdersRows = insertValues.map(() => "(?, ?, ?, ?, ?, ?, ?)").join(", ");
    const flatValues = insertValues.flat();

    const query = `
      INSERT INTO attendance 
      (student_id, class_id, subject_id, status, taken_by_id, remarks, date)
      VALUES ${placeholdersRows}
    `;

    const [result] = await pool.execute<ResultSetHeader>(query, flatValues);

    return {
      inserted: result.affectedRows,
      alreadyPresent,
      date,
      message:
        alreadyPresent > 0
          ? `Inserted ${result.affectedRows}, but ${alreadyPresent} already marked.`
          : "Attendance submitted successfully.",
    };
  } catch (error) {
    throw createHttpError(500, `Failed to submit attendance: ${(error as Error).message}`);
  }
};
