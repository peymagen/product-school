import { BaseSchema } from "../../common/dto/base.dto";

// Input filters for querying class routines
export interface IClassRoutineQuery {
  className?: string;
  branchName?: string;
  branchId?: number;
  uploadedBy?: number;
  status?: boolean;
  classId?: number;
  
}

// Record returned from the database/service
export interface IClassRoutineRecord extends BaseSchema {
  fileName: string;
  originalName?: string;
  url: string;
  className?: string | null;
  branchName?: string | null;
  branchId?: number | null;
  uploadedBy?: number | null;
  fileSize?: number | null;
  mimeType?: string | null;
  status?: boolean;
  // notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Input for creating class routine
export interface ICreateClassRoutine {
  fileName: string;
  originalName?: string;
  url: string;
  className?: string | null;
  branchId?: number | null;
  uploadedBy?: number | null;
  fileSize?: number | null;
  mimeType?: string | null;
  status?: boolean;
  notes?: string | null;
}
