import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";
import { IStaff, IStaffQuery } from "./staff.dto";

const TABLE = "staff";

export const listStaff = async (filters: IStaffQuery = {}): Promise<IStaff[]> => {
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (filters.user_id !== undefined) {
    where.push("user_id = ?");
    values.push(filters.user_id);
  }
  if (filters.department) {
    where.push("department LIKE ?");
    values.push(`%${filters.department}%`);
  }
  if (filters.position) {
    where.push("position LIKE ?");
    values.push(`%${filters.position}%`);
  }

  try {
    const query = `SELECT id, user_id, employee_id, department, position, created_at, updated_at FROM ${TABLE} ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    return rows as unknown as IStaff[];
  } catch (error) {
    throw createHttpError(500, `Failed to list staff: ${(error as Error).message}`);
  }
};

export const getStaffById = async (id: number): Promise<IStaff | null> => {
  try {
    const query = `SELECT id, user_id, employee_id, department, position, created_at, updated_at FROM ${TABLE} WHERE id = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return ((rows as RowDataPacket[])[0] as unknown as IStaff) ?? null;
  } catch (error) {
    throw createHttpError(500, `Failed to get staff: ${(error as Error).message}`);
  }
};

export const createStaff = async (data: IStaff): Promise<{ id: number }> => {
  const allowed: Record<keyof IStaff, string> = {
    id: "id",
    user_id: "user_id",
    employee_id: "employee_id",
    department: "department",
    position: "position",
    created_at: "created_at",
    updated_at: "updated_at",
  };

  const cols: string[] = [];
  const placeholders: string[] = [];
  const values: Array<string | number | null> = [];

  (Object.keys(allowed) as (keyof IStaff)[]).forEach((k) => {
    if (k === "id" || k === "created_at" || k === "updated_at") return;
    const v = data[k];
    if (v !== undefined) {
      cols.push(allowed[k]);
      placeholders.push("?");
      values.push(v as any);
    }
  });

  if (!cols.length) {
    throw createHttpError(400, "No valid fields provided to create staff");
  }

  try {
    const query = `INSERT INTO ${TABLE} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  } catch (error) {
    throw createHttpError(500, `Failed to create staff: ${(error as Error).message}`);
  }
};

export const updateStaff = async (id: number, data: Partial<IStaff>): Promise<{ id: number } & Partial<IStaff>> => {
  const allowed: Record<string, boolean> = {
    user_id: true,
    employee_id: true,
    department: true,
    position: true,
  };

  const sets: string[] = [];
  const values: Array<string | number | null> = [];

  Object.entries(data).forEach(([k, v]) => {
    if (allowed[k] && v !== undefined) {
      sets.push(`${k} = ?`);
      values.push(v as any);
    }
  });

  if (!sets.length) {
    throw createHttpError(400, "No valid fields provided to update staff");
  }

  try {
    const query = `UPDATE ${TABLE} SET ${sets.join(", ")} WHERE id = ?`;
    values.push(id);
    await pool.execute(query, values);
    return { id, ...data } as any;
  } catch (error) {
    throw createHttpError(500, `Failed to update staff: ${(error as Error).message}`);
  }
};

export const deleteStaff = async (id: number): Promise<{ id: number; deleted: boolean }> => {
  try {
    await pool.execute(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return { id, deleted: true };
  } catch (error) {
    throw createHttpError(500, `Failed to delete staff: ${(error as Error).message}`);
  }
};
