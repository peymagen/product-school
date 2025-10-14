import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";
import { IFeeRecord, IFeesStatusSummary ,CreateFeeInput} from "./fees.dto";


export const findFeesByUser = async (userId: number): Promise<IFeeRecord[]> => {
  try {
    const sql = `
      SELECT f.id,
             f.student_id AS studentId,
             f.title,
             CAST(f.amount AS DECIMAL(10,2)) AS amount,
             DATE_FORMAT(f.due_date, '%Y-%m-%d') AS dueDate,
             f.status,
             CAST(f.paid_amount AS DECIMAL(10,2)) AS paidAmount,
             f.branch_id AS branchId,
             f.class_id AS class
      FROM fees f
      WHERE f.student_id = ?
      ORDER BY f.due_date DESC, f.id DESC
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [userId]);
    return rows.map((r: any) => ({
      id: Number(r.id),
      studentId: Number(r.studentId),
      title: r.title ?? null,
      amount: Number(r.amount),
      dueDate: r.dueDate ?? null,
      status: r.status as IFeeRecord["status"],
      paidAmount: r.paidAmount != null ? Number(r.paidAmount) : 0,
      branchId: r.branchId ?? null,
      class: r.class ?? null,
    }));
  } catch (err) {
    console.error("findFeesByUser error:", err);
    throw createHttpError(500, `Failed to fetch fees: ${(err as Error).message}`);
  }
};

export const getFeesStatus = async (userId: number): Promise<IFeesStatusSummary> => {
  try {
    const sql = `
      SELECT
        SUM(amount) AS totalAmount,
        COALESCE(SUM(paid_amount),0) AS totalPaid,
        SUM(CASE WHEN status = 'unpaid' THEN 1 ELSE 0 END) AS unpaidCount,
        SUM(CASE WHEN status = 'partial' THEN 1 ELSE 0 END) AS partialCount
      FROM fees
      WHERE student_id = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [userId]);
    const r = rows[0] as any;

    const totalAmount = Number(r.totalAmount || 0);
    const totalPaid = Number(r.totalPaid || 0);
    const totalDue = Math.max(0, totalAmount - totalPaid);

    const status: IFeesStatusSummary["status"] =
      Number(r.unpaidCount || 0) > 0 ? "unpaid" : (Number(r.partialCount || 0) > 0 ? "partial" : "paid");

    return { status, totalDue, totalAmount };
  } catch (err) {
    console.error("getFeesStatus error:", err);
    throw createHttpError(500, `Failed to get status: ${(err as Error).message}`);
  }
};

export const getStudentIdByRollNo = async (rollNo: string | number): Promise<number | null> => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM students WHERE roll_no = ? LIMIT 1`,
      [rollNo]
    );
    if (!rows || rows.length === 0) return null;
    return Number((rows[0] as any).id);
  } catch (err) {
    console.error("getStudentIdByRollNo error:", err);
    throw createHttpError(500, `Failed to resolve student by rollNo: ${(err as Error).message}`);
  }
};



//create fees

export const createFee = async (data: CreateFeeInput): Promise<IFeeRecord> => {
  try {
    // 0) basic required validation
    if (!data.rollNo || !data.amount) {
      throw createHttpError(400, "rollNo and amount are required");
    }
    
    
    // 1) resolve student by roll number
    const [studentRows]: any = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM students WHERE roll_no = ? LIMIT 1`,
      [data.rollNo]
    );
    if (!studentRows || studentRows.length === 0) {
      throw createHttpError(400, `Student not found with rollNo=${data.rollNo}`);
    }
    const studentId: number = Number(studentRows[0].id);

    // 2) optional: resolve className -> class_id if provided
    let classId: number | null = null;
    if (data.className) {
      const [rows]: any = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM classes WHERE name = ? LIMIT 1`,
        [data.className]
      );
      if (rows && rows.length > 0) classId = Number(rows[0].id);
      else classId = null;
      console.log(classId);
    }

    // 3) resolve branchId from branchName
    let branchId: number | null = null;
    if (data.branchName) {
      const [brows]: any = await pool.execute<RowDataPacket[]>(
        `SELECT id FROM branches WHERE name = ? LIMIT 1`,
        [data.branchName]
      );
      if (!brows || brows.length === 0) {
        throw createHttpError(400, `Branch not found with name=${data.branchName}`);
      }
      branchId = Number(brows[0].id);
    }


    const existingSql = `
      SELECT id, status FROM fees
      WHERE student_id = ? AND title = ? AND (due_date <=> ?) LIMIT 1
    `;
    const [existRows]: any = await pool.execute<RowDataPacket[]>(existingSql, [
      studentId,
      data.title ?? null,
      data.dueDate ?? null,
    ]);
    if (existRows && existRows.length > 0) {
      const ex = existRows[0];
      // allow duplicate only if previous is paid (adjust logic as needed)
      if (ex.status !== "paid") {
        throw createHttpError(409, `Fee already exists for student=${studentId} title="${data.title}" dueDate=${data.dueDate}`);
      }
    }

    // 4) insert fee (ensure columns match DB)
    const sql = `INSERT INTO fees
      (student_id, title, amount, due_date, branch_id, class_id, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

    const params = [
      studentId,
      data.title ?? null,
      data.amount,
      data.dueDate ?? null,
      branchId,
      classId,
      data.status ?? "unpaid",
    ];

    const [result]: any = await pool.execute<ResultSetHeader>(sql, params);
    const id = result.insertId;

    const out: any = {
      id,
      studentId,
      title: data.title ?? null,
      amount: data.amount,
      dueDate: data.dueDate ?? null,
      status: data.status ?? "pending",
      paidAmount: 0,
      branchId,
      classId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return out as IFeeRecord;
  } catch (err: any) {
    console.error("createFee error:", err.message || err);
    // propagate client errors as-is, wrap others as 500
    if (err.status && err.status >= 400 && err.status < 500) throw err;
    throw createHttpError(500, `Failed to create fee: ${err.message || err}`);
  }
};
