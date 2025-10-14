import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { IMarkQuery, IMarkRecord } from "./marks.dto";
import createHttpError from "http-errors";

export const findMarksForStudent = async (filters: IMarkQuery): Promise<IMarkRecord[]> => {
  const where: string[] = [];
  const values: Array<number | string> = [];

  if (filters.studentId != null) {
    where.push("m.student_id = ?");
    values.push(filters.studentId);
  }
  if (filters.rollNo) {
    where.push("st.roll_no = ?");
    values.push(filters.rollNo);
  }
  if (filters.examId) {
    where.push("m.exam_id = ?");
    values.push(filters.examId);
  }
  if (filters.termId) {
    where.push("m.term_id = ?");
    values.push(filters.termId);
  }
  if (filters.classId) {
    where.push("m.class_id = ?");
    values.push(filters.classId);
  }

  try {
    const query = `
      SELECT 
        m.id,
        m.student_id AS studentId,
        m.exam_id AS examId,
        m.subject_id AS subjectId,
        s.name AS subjectName,
        m.score,
        m.grade,
        m.remarks,
        m.total,
        m.position,
        m.term_id AS termId,
        m.class_id AS classId,
        st.roll_no AS rollNo,
        DATE_FORMAT(m.date, '%d-%m-%Y') AS date
      FROM marks m
      LEFT JOIN subjects s ON s.id = m.subject_id
      LEFT JOIN students st ON st.id = m.student_id
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY m.date DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    return rows as unknown as IMarkRecord[];
  } catch (error) {
    throw createHttpError(500, `Failed to fetch marks: ${(error as Error).message}`);
  }
};

export const createMark = async (data: Partial<IMarkRecord>) => {
  // Resolve rollNo to studentId if provided
  if (!data.studentId && data.rollNo) {
    const [stu] = await pool.execute<RowDataPacket[]>(
      "SELECT id FROM students WHERE roll_no = ? LIMIT 1",
      [data.rollNo]
    );
    if (!stu || stu.length === 0) {
      throw createHttpError(400, `Invalid rollNo: ${data.rollNo}`);
    }
    data.studentId = (stu[0] as any).id as number;
  }
  if (!data.studentId) {
    throw createHttpError(400, "studentId (or valid rollNo) is required");
  }

  // Resolve human-readable names to IDs if provided
  // subjectName -> subjectId
  if (!data.subjectId && (data as any).subjectName) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM subjects WHERE name = ? LIMIT 1`,
      [(data as any).subjectName]
    );
    if (!rows || rows.length === 0) throw createHttpError(400, `Invalid subjectName: ${(data as any).subjectName}`);
    data.subjectId = Number((rows[0] as any).id);
  }
  // className -> classId
  if (!data.classId && (data as any).className) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM classes WHERE name = ? LIMIT 1`,
      [(data as any).className]
    );
    if (!rows || rows.length === 0) throw createHttpError(400, `Invalid className: ${(data as any).className}`);
    data.classId = Number((rows[0] as any).id);
  }
  // termName -> termId (table: terms)
  if (!data.termId && (data as any).termName) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM terms WHERE name = ? LIMIT 1`,
      [(data as any).termName]
    );
    if (!rows || rows.length === 0) throw createHttpError(400, `Invalid termName: ${(data as any).termName}`);
    data.termId = Number((rows[0] as any).id);
  }
  // examName -> examId (assumes table: exams with column name)
 
  if (!data.examId && ((data as any).examName || (data as any).name)) {
    const examLabel = (data as any).examName || (data as any).name;
    try {
      // 1) try exams.exam_name
      let [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM exams WHERE exam_name = ? LIMIT 1`,
        [examLabel]
      );
      if (!rows || rows.length === 0) {
        // 2) fallback to exams.name if present
        [rows] = await pool.execute<RowDataPacket[]>(
          `SELECT id FROM exams WHERE name = ? LIMIT 1`,
          [examLabel]
        );
      }
      if (rows && rows.length > 0) {
        data.examId = Number((rows[0] as any).id);
      } else {
        throw createHttpError(400, `Invalid exam name: ${examLabel}`);
      }
    } catch (e) {
      // If table/columns are missing, don't block creation but log for visibility
      console.warn(`[marks] exams lookup failed for '${examLabel}': ${(e as Error).message}. Proceeding without examId`);
    }
  }
 

  const allowedFieldToColumn: Record<string, string> = {
    studentId: "student_id",
    examId: "exam_id",
    subjectId: "subject_id",
    score: "score",
    grade: "grade",
    remarks: "remarks",
    total: "total",
    position: "position",
    termId: "term_id",
    classId: "class_id",
    date: "date",
  };

  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: Array<string | number | null> = [];

  type MarkKeys = keyof IMarkRecord;

  Object.entries(allowedFieldToColumn).forEach(([key, column]) => {
    const typedKey = key as MarkKeys;
    const value = data[typedKey];
    if (value !== undefined) {
      columns.push(column);
      placeholders.push("?");
      values.push(value as string | number);
    }
  });

  if (!columns.length) {
    throw createHttpError(400, "No valid fields provided to insert mark");
  }

  // Validate subject exists if provided
  if (data.subjectId) {
    const [subjects] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM subjects WHERE id = ?",
      [data.subjectId]
    );
    if ((subjects as RowDataPacket[]).length === 0) {
      throw createHttpError(400, `Invalid subjectId: ${data.subjectId}`);
    }
  }

  // Prevent duplicate marks for same student/subject/exam/term/class
  const [dups] = await pool.execute<RowDataPacket[]>(
    `SELECT id FROM marks
     WHERE student_id = ?
       AND subject_id <=> ?
       AND exam_id <=> ?
       AND term_id <=> ?
       AND class_id <=> ?
     LIMIT 1`,
    [
      data.studentId as number,
      data.subjectId ?? null,
      data.examId ?? null,
      data.termId ?? null,
      data.classId ?? null,
    ]
  );
  if (dups && dups.length > 0) {
    throw createHttpError(409, "Mark already exists for this student/subject/exam/term/class");
  }

  try {
    const query = `INSERT INTO marks (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  } catch (error) {
    throw createHttpError(500, `Failed to create mark: ${(error as Error).message}`);
  }
};