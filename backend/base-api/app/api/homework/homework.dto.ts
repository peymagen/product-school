import { BaseSchema } from "../../common/dto/base.dto";

//when teacher/admin create homework.
export interface IHomeworkAssignment extends BaseSchema {
  title: string;
  description?: string;
  classId?: number; // class or grade the homework is assigned to
  className?: string; // alternative to classId
  subjectId?: number;
  subjectName?: string; // alternative to subjectId
  dueDate?: string; // ISO date yyyy-mm-dd
  assignedById: number; // teacher/admin id
}

// filters when listing homework.
export interface IHomeworkQuery {
  classId?: number;
  subjectId?: number;
  assignedById?: number;
  dueBefore?: string; // ISO date
  dueAfter?: string; // ISO date
}

// when  student submit  homework.
export interface IHomeworkSubmission extends BaseSchema {
  homeworkId: number;       
  studentId: number;
  content?: string;         
  attachment?: Express.Multer.File | string; 
  submittedOn?: string;     // ISO date string
  status?: "submitted" | "graded" | "returned";
  grade?: string;
  remarks?: string;
}
