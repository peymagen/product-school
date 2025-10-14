import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";
import { IBranch, IBranchQuery } from "./branch.dto";

const TABLE = "branches"; // Ensure this table exists in your DB schema

export const listBranches = async (filters: IBranchQuery = {}): Promise<IBranch[]> => {
  const where: string[] = [];
  const values: Array<string> = [];

  if (filters.name) {
    where.push("name LIKE ?");
    values.push(`%${filters.name}%`);
  }
  if (filters.status) {
    where.push("status = ?");
    values.push(filters.status);
  }

  try {
    const query = `SELECT id, name, address, city, state, zip_code, status, created_at, updated_at FROM ${TABLE} ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC`;
    console.log(query);
    const [rows] = await pool.execute<RowDataPacket[]>(query, values);
    console.log(rows);
    return rows as unknown as IBranch[];
  } catch (error) {
    throw createHttpError(500, `Failed to list branches: ${(error as Error).message}`);
  }
};

export const getBranchById = async (name: string): Promise<IBranch> => {
  try {
    // Resolve numeric id from branch name
    const [idRows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM ${TABLE} WHERE name = ? LIMIT 1`,
      [name]
    );
    if (!idRows || idRows.length === 0) {
      throw createHttpError(400, `Invalid branch name: ${name}`);
    }
    const branchId = Number((idRows[0] as any).id);

    // Fetch full branch by id
    const query = `SELECT id, name, address, city, state, zip_code, status, created_at, updated_at FROM ${TABLE} WHERE id = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [branchId]);
    if (!rows || rows.length === 0) {
      throw createHttpError(400, `Branch not found for id: ${branchId}`);
    }
    return rows[0] as unknown as IBranch;
  } catch (error) {
    throw createHttpError(500, `Failed to get branch: ${(error as Error).message}`);
  }
};



// export const createBranch = async (data: IBranch): Promise<{ id: number }> => {
//   const allowed: Record<keyof IBranch, string> = {
//     id: "id",
//     name: "name",
//     address: "address",
//     city: "city",
//     state: "state",
//     zip_code: "zip_code",
//     status: "status",
//     created_at: "created_at",
//     updated_at: "updated_at",
//   };

//   const cols: string[] = [];
//   const placeholders: string[] = [];
//   const values: Array<string | null> = [];

//   (Object.keys(allowed) as (keyof IBranch)[]).forEach((k) => {
//     if (k === "id" || k === "created_at" || k === "updated_at") return; // auto/managed
//     const v = data[k];
//     if (v !== undefined) {
//       cols.push(allowed[k]);
//       placeholders.push("?");
//       values.push(v as string);
//     }
//   });

//   if (!cols.length) {
//     throw createHttpError(400, "No valid fields provided to create branch");
//   }

//   try {
//     const query = `INSERT INTO ${TABLE} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
//     const [result] = await pool.execute<ResultSetHeader>(query, values);
//     return { id: result.insertId };
//   } catch (error) {
//     throw createHttpError(500, `Failed to create branch: ${(error as Error).message}`);
//   }
// };

export const createBranch = async (data: IBranch): Promise<{ id?: number; message: string }> => {
  const allowed: Record<keyof IBranch, string> = {
    id: "id",
    name: "name",
    address: "address",
    city: "city",
    state: "state",
    zip_code: "zip_code",
    status: "status",
    created_at: "created_at",
    updated_at: "updated_at",
  };

  const cols: string[] = [];
  const placeholders: string[] = [];
  const values: Array<string | null> = [];

  (Object.keys(allowed) as (keyof IBranch)[]).forEach((k) => {
    if (k === "id" || k === "created_at" || k === "updated_at") return; // auto/managed
    const v = data[k];
    if (v !== undefined) {
      cols.push(allowed[k]);
      placeholders.push("?");
      values.push(v as string);
    }
  });

  if (!cols.length) {
    throw createHttpError(400, "No valid fields provided to create branch");
  }

  try {
    //  Check if branch already exists (by name)
    const [existing] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM branches WHERE name = ? LIMIT 1`,
      [data.name]
    );

    if (existing.length > 0) {
      // Branch with same name exists
      return { message: "Branch already present" };
    }

    // If not duplicate, insert new branch
    const query = `INSERT INTO branches (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);

    return { id: result.insertId, message: "Branch created successfully" };
  } catch (error) {
    throw createHttpError(500, `Failed to create branch: ${(error as Error).message}`);
  }
};



export const updateBranch = async (
  name: string,
  data: Partial<IBranch>
): Promise<{ id: number } & Partial<IBranch>> => {
  // Resolve id from provided branch name
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT id FROM ${TABLE} WHERE name = ? LIMIT 1`,
    [name]
  );
  console.log(rows);
  if (!rows || rows.length === 0) {
    throw createHttpError(400, `Invalid branch name: ${name}`);
  }
  const branchId = Number((rows[0] as any).id);

  const allowed: Record<string, boolean> = {
    name: true,
    address: true,
    city: true,
    state: true,
    zip_code: true,
    status: true,
  };

  const sets: string[] = [];
  const values: Array<string> = [];

  Object.entries(data).forEach(([k, v]) => {
    if (allowed[k] && v !== undefined) {
      sets.push(`${k} = ?`);
      values.push(String(v));
    }
  });

  if (!sets.length) {
    throw createHttpError(400, "No valid fields provided to update branch");
  }

  try {
    const query = `UPDATE ${TABLE} SET ${sets.join(", ")} WHERE id = ?`;
    values.push(String(branchId));
    await pool.execute(query, values);
    return { id: branchId, ...data } as any;
  } catch (error) {
    throw createHttpError(500, `Failed to update branch: ${(error as Error).message}`);
  }
};



export const deleteBranch = async (name: string): Promise<{ id: number; deleted: boolean }> => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM ${TABLE} WHERE name = ? LIMIT 1`,
      [name]
    );
    if (!rows || rows.length === 0) {
      throw createHttpError(400, `Invalid branch name: ${name}`);
    }
    const id = Number((rows[0] as any).id);

    const [status] = await pool.execute<RowDataPacket[]>(
      `SELECT status FROM ${TABLE} WHERE id = ? LIMIT 1`,
      [id]
    );

    if (status[0].status === 0) {
      await pool.execute(`update ${TABLE} set status = 1 WHERE id = ?`, [id]);
    } else {
      await pool.execute(`update ${TABLE} set status = 0 WHERE id = ?`, [id]);
    }
    return { id, deleted: true };
  } catch (error) {
    throw createHttpError(500, `Failed to delete branch: ${(error as Error).message}`);
  }
};
