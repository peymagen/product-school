import { BaseSchema } from "../../common/dto/base.dto";

// Input filters for querying marks
export interface IMarkQuery {
  studentId?: number;
  examId?: number;
  termId?: number;
  classId?: number;
  rollNo?: string;
  subjectId?: number;
}

// Record returned from the database/service
export interface IMarkRecord extends BaseSchema {
  studentId?: number;
  examId?: number;
  subjectId?: number;
  score?: number;
  grade?: string;
  remarks?: string;
  total?: number;
  position?: number;
  termId?: number;
  classId?: number;
  date?: string;
  rollNo?: string;
  examName?: string,
  subjectName?: string,
 termName?: string,
 className?: string,

}
