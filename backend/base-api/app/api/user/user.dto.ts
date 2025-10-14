import { type BaseSchema } from "../../common/dto/base.dto";

export interface IUser extends BaseSchema {
  email: string;
  password?: string;
  role: string;
  status?: string;
  branch_id?: number;
}

// Role-specific DTOs
export interface IStudentData {
  roll_no?: string;
  class_id?: number;
  branch_id?: number;
}

export interface ITeacherData {
  employee_id?: string;
  department?: string;
  qualification?: string;
  branch_id?: number;
}

export interface IParentData {
  phone?: string;
  address?: string;
  occupation?: string;
  branch_id?: number;
}

export interface IStaffData {
  employee_id?: string;
  department?: string;
  position?: string;
  branch_id?: number;
}

export interface IAdminData {
  employee_id?: string;
  department?: string;
  access_level?: string;
  branch_id?: number;
}

export interface IAccountantData {
  employee_id?: string;
  department?: string;
  license_number?: string;
  branch_id?: number;
}

// Combined user creation DTO
export interface ICreateUserWithRole extends IUser {
  studentData?: IStudentData;
  teacherData?: ITeacherData;
  parentData?: IParentData;
  staffData?: IStaffData;
  adminData?: IAdminData;
  accountantData?: IAccountantData;
  branch_id?: number;
}
