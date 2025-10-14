import { BaseSchema } from "../../common/dto/base.dto";

// Filters to fetch TC records
export interface ITcQueryFilters {
  rollNo?: string | number;
  className?: string;
  status?: "pending" | "approved" | "rejected";
}

// Shape of a TC record fetch from the database
export interface ITcRecord extends BaseSchema {
  studentId: number;
  classId?: number;
  reason?: string;
  status?: "pending" | "approved" | "rejected";
  requestedDate?: string; // ISO date string
  processedDate?: string; // ISO date string
  // Attached file metadata (image/pdf)
  fileUrl?: string;
  fileMime?: string;
  fileName?: string;
}

// to create a new TC request (kept for compatibility)
export interface ICreateTcRequest {
  studentId: number;
  classId?: number;
  reason?: string;
  requestedDate?: string;
  fileUrl?: string;
  fileMime?: string;
  fileName?: string;
}

// student submits to request a TC (student context)
export interface IStudentTcRequest {
  rollNo: string | number;
  reason?: string;
  requestedDate?: string;
}

// Payload a teacher (or admin) uses to update an existing TC row (not status)
export interface ITeacherTcUpdateRequest {
  id: number;
  // allow either classId or className
  classId?: number;
  className?: string;
  file?: Express.Multer.File;
  processedDate?: string;
}

//  to update the status of an existing TC request
export interface IUpdateTcStatusRequest {
  id: number;
  status: "approved" | "rejected";
  processedDate?: string;
}

