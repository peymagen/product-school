import { type IUser } from "./user.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";
import createHttpError from "http-errors";

const insertRolePivot = async (role: string | undefined, userId: number, roleData?: any): Promise<number | undefined> => {
  if (!role) return undefined;
  const roleLower = String(role).trim().toLowerCase();

  switch (roleLower) {
    case 'student': {
      const [studentResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO students (user_id, roll_no, class_id, student_name, mother_name, father_name) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          roleData?.roll_no || null,
          roleData?.class_id || null,
          roleData?.student_name || null,
          roleData?.mother_name || null,
          roleData?.father_name || null
        ]
      );
      return (studentResult as ResultSetHeader).insertId;
    }
    case 'parent': {
      if (!roleData?.student_id) {
        throw createHttpError(400, "Parent must be linked to a student_id");
      }
      const [parentResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO parents (user_id, phone, address, occupation, student_id) VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          roleData?.phone || null,
          roleData?.address || null,
          roleData?.occupation || null,
          roleData.student_id
        ]
      );
      return (parentResult as ResultSetHeader).insertId;
    }
    case 'teacher': {
      const [teacherResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO teachers (user_id, employee_id, department, qualification) VALUES (?, ?, ?, ?)`,
        [userId, roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.qualification ?? null]
      );
      return (teacherResult as ResultSetHeader).insertId;
    }
    case 'staff': {
      const [staffResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO staff (user_id, employee_id, department, position) VALUES (?, ?, ?, ?)`,
        [userId, roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.position ?? null]
      );
      return (staffResult as ResultSetHeader).insertId;
    }
    case 'admin': {
      const [adminResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO admins (user_id, employee_id, department, access_level) VALUES (?, ?, ?, ?)`,
        [userId, roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.access_level ?? null]
      );
      return (adminResult as ResultSetHeader).insertId;
    }
    case 'accountant': {
      const [accountantResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO accountants (user_id, employee_id, department, license_number) VALUES (?, ?, ?, ?)`,
        [userId, roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.license_number ?? null]
      );
      return (accountantResult as ResultSetHeader).insertId;
    }
  }
  return undefined;
};

const updateRolePivot = async (role: string | undefined | null, userId: number, roleData?: any): Promise<void> => {
  if (!roleData) return;
  const roleLower = (role ?? "").toLowerCase();
  switch (roleLower) {
    case "staff": {
      await pool.execute(
        `UPDATE staff SET employee_id = ?, department = ?, position = ? WHERE user_id = ?`,
        [roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.position ?? null, userId]
      );
      return;
    }
    case "teacher": {
      await pool.execute(
        `UPDATE teachers SET employee_id = ?, department = ?, qualification = ? WHERE user_id = ?`,
        [roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.qualification ?? null, userId]
      );
      return;
    }
    case "parent": {
      await pool.execute(
        `UPDATE parents SET phone = ?, address = ?, occupation = ? WHERE user_id = ?`,
        [roleData?.phone ?? null, roleData?.address ?? null, roleData?.occupation ?? null, userId]
      );
      return;
    }
    case "admin": {
      await pool.execute(
        `UPDATE admins SET employee_id = ?, department = ?, access_level = ? WHERE user_id = ?`,
        [roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.access_level ?? null, userId]
      );
      return;
    }
    case "accountant": {
      await pool.execute(
        `UPDATE accountants SET employee_id = ?, department = ?, license_number = ? WHERE user_id = ?`,
        [roleData?.employee_id ?? null, roleData?.department ?? null, roleData?.license_number ?? null, userId]
      );
      return;
    }
  }
};

const clearOtherRolePivots = async (userId: number, role: string) => {
  const r = role.toLowerCase();
  console.log(r)
  const deletes: Array<Promise<any>> = [];
  if (r !== "student") deletes.push(pool.execute("DELETE FROM students WHERE user_id = ?", [userId]));
  if (r !== "parent") deletes.push(pool.execute("DELETE FROM parents WHERE user_id = ?", [userId]));
  if (r !== "teacher") deletes.push(pool.execute("DELETE FROM teachers WHERE user_id = ?", [userId]));
  if (r !== "staff") deletes.push(pool.execute("DELETE FROM staff WHERE user_id = ?", [userId]));
  if (r !== "admin") deletes.push(pool.execute("DELETE FROM admins WHERE user_id = ?", [userId]));
  if (r !== "accountant") deletes.push(pool.execute("DELETE FROM accountants WHERE user_id = ?", [userId]));
  await Promise.all(deletes);
};

const getUserRoleById = async (userId: number): Promise<string | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT role FROM `users` WHERE id = ?",
    [userId]
  );
  return rows?.[0]?.role ?? null;
};

const checkBranchExists = async (branchId?: number | null) => {
  if (branchId === undefined || branchId === null) return;
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM `branches` WHERE id = ?",
    [branchId]
  );
  if (!rows || rows.length === 0) {
    throw createHttpError(400, `Invalid branch_id: ${branchId} does not exist`);
  }
};

export const createUser = async (data: any) => {
  try {
    await checkBranchExists(data.branch_id ?? null);
    const query = "INSERT INTO users (email, password, role, status, branch_id) VALUES (?, ?, ?, ?, ?)";
    const values = [data.email, data.password ?? null, data.role ?? null, data.status ?? "active", data.branch_id ?? null];
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    const userId = (result as ResultSetHeader).insertId;

    let roleData = data.roleData;

    const roleRecordId = await insertRolePivot(data.role, userId, roleData);

    return {
      success: true,
      userId,
      roleRecordId,
      branch_id: data.branch_id ?? null,
    };
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw createHttpError(409, "Email already exists");
    }
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      throw createHttpError(400, "Invalid branch_id: referenced branch not found");
    }
    throw createHttpError(500, `Failed to create user: ${error.message}`);
  }
};

export const updateUser = async (id: number, data: IUser) => {
  console.log(data,id)
  try {
    await checkBranchExists((data as any).branch_id ?? null);
    // const query = "UPDATE `users` SET email = ?, password = ?, role = ?, status = ?, branch_id = ? WHERE id = ?";
    // const values = [data.email, data.password ?? null, data.role ?? null, data.status ?? "active", (data as any).branch_id ?? null, id];
    // await pool.execute(query, values);

    // If roleData provided (either generic or role-scoped), update the corresponding pivot
    const incoming: any = data as any;
    const scoped = incoming.role ? incoming[`${String(incoming.role).toLowerCase()}Data`] : undefined;
    const roleData = incoming.roleData ?? scoped;
    // console.log(roleData) 

    if (data.role) {
      // console.log("roleSp",data.role)
      // If role changed, clear old pivots and (re)insert for the new role
      const prevRole = await getUserRoleById(id);
      console.log("prole",prevRole)
      console.log("Drole",data.role)
      // console.log("prevRole",prevRole)
      if (!prevRole || prevRole.toLowerCase() !== data.role.toLowerCase()) {
        console.log(data.role);
        
        console.log("id",id)
        await clearOtherRolePivots(id, data.role);
        console.log("Done")
        await insertRolePivot(data.role, id, roleData);
        console.log("Done2")
        const query = "UPDATE `users` SET email = ?, password = ?, role = ?, status = ?, branch_id = ? WHERE id = ?";
        const values = [data.email, data.password ?? null, data.role ?? null, data.status ?? "active", (data as any).branch_id ?? null, id];
        await pool.execute(query, values);
      } else if (roleData) {
        // Same role, just update pivot with provided data
        await updateRolePivot(data.role, id, roleData);
        console.log("Done3")
        const query = "UPDATE `users` SET email = ?, password = ?, role = ?, status = ?, branch_id = ? WHERE id = ?";
        const values = [data.email, data.password ?? null, data.role ?? null, data.status ?? "active", (data as any).branch_id ?? null, id];
        await pool.execute(query, values);
      }
    } else if (roleData) {
      // Role not changing but roleData present; use current role
      const role = await getUserRoleById(id);
      await updateRolePivot(role, id, roleData);
      console.log("Done4")
      const query = "UPDATE `users` SET email = ?, password = ?, role = ?, status = ?, branch_id = ? WHERE id = ?";
    const values = [data.email, data.password ?? null, data.role ?? null, data.status ?? "active", (data as any).branch_id ?? null, id];
    await pool.execute(query, values);
    }

    return { id, ...data };
  } catch (error: any) {
    console.log(error)
    throw createHttpError(500, `Failed to update user: ${error.message}`);
  }
};



const getStatus = async (id: number): Promise<string | null> => {
  try {
    const query = "SELECT status FROM `users` WHERE id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return rows?.[0]?.status ?? null;
  } catch (error) {
    throw createHttpError(500, `Failed to get status: ${(error as Error).message}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const status = await getStatus(id);
    if (status === null) {
      throw createHttpError(404, `User not found with id ${id}`);
    }
    if (status === "inactive") {
      return { id, deleted: false, status: "inactive" };
    }
    const query = "UPDATE `users` SET status = 'inactive' WHERE id = ?";
    const [res] = await pool.execute<ResultSetHeader>(query, [id]);
    if ((res as ResultSetHeader).affectedRows === 0) {
      throw createHttpError(404, `User not found with id ${id}`);
    }
    return { id, deleted: true, status: "inactive" };
  } catch (error) {
    if ((error as any).status === 404) throw error;
    throw createHttpError(500, `Failed to deactivate user: ${(error as Error).message}`);
  }
};

export const undoDeleteUser = async (id: number) => {
  try {
    const status = await getStatus(id);
    if (status === null) {
      throw createHttpError(404, `User not found with id ${id}`);
    }
    if (status === "active") {
      return { id, undoDeleted: false, status: "active" };
    }
    const query = "UPDATE `users` SET status = 'active' WHERE id = ?";
    const [res] = await pool.execute<ResultSetHeader>(query, [id]);
    if ((res as ResultSetHeader).affectedRows === 0) {
      throw createHttpError(404, `User not found with id ${id}`);
    }
    return { id, undoDeleted: true, status: "active" };
  } catch (error) {
    if ((error as any).status === 404) throw error;
    throw createHttpError(500, `Failed to reactivate user: ${(error as Error).message}`);
  }
};

export const getUserById = async (id: number) => {
  try{
    const query = "SELECT id, email, role, status, branch_id, created_at, updated_at FROM `users` WHERE id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return rows[0] || null;
  } catch (error) {
    throw createHttpError(500, `Failed to get user by id: ${(error as Error).message}`);
  }
};

export const getAllUsers = async () => {
  try{
    const query = "SELECT id, email, role, status, branch_id, created_at, updated_at FROM `users`";
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    throw createHttpError(500, `Failed to get all users: ${(error as Error).message}`);
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try{
    const [rows] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as IUser;
    }
    return null;
  } catch (error) {
    throw createHttpError(500, `Failed to get user by email: ${(error as Error).message}`);
  }
};

export const getActiveUserByEmail = async (email: string): Promise<IUser | null> => {
  try{
    const [rows] = await pool.execute("SELECT * FROM `users` WHERE email = ? AND status = 'active'", [
      email,
    ]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as IUser;
    }
    return null;
  } catch (error) {
    throw createHttpError(500, `Failed to get user by email: ${(error as Error).message}`);
  }
};
