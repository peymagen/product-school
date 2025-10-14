



import { BaseSchema } from "../../common/dto/base.dto";

// Input filters for querying exam routines
export interface IExamRoutineQuery {
  classId?: number;
  branchId?: number;
  uploadedBy?: number;
  examId?: number;
  status?: boolean;
  className?: string;
  branchName?: string;
  examName?: string;
}

// Record returned from the database/service
export interface IExamRoutineRecord extends BaseSchema {
  fileName: string;
  originalName?: string;
  examName?: string;
  url: string;
  classId?: Number | null;
  branchId?: number | null;
  examId?: number | null;
  uploadedBy?: number | null;
  fileSize?: number | null;
  mimeType?: string | null;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;

  // notes?: string | null;
}

// Input for creating exam routine
export interface ICreateExamRoutine {
  fileName: string;
  originalName?: string;
  examName?: string;
  url: string;
  classId?: Number | null;
  branchId?: number | null;
  examId?: number | null;
  uploadedBy?: number | null;
  fileSize?: number | null;
  mimeType?: string | null;
  status?: boolean;
  notes?: string | null;
}
