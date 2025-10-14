// represents a stored attendance row
export interface IAttendanceRecord {
  id: number;
  studentId: number;
  classId?: number | null;
  subjectId?: number | null;
  status: "present" | "absent" | "late" | "excused";
  takenById: number;  //that person id who take the attendence like  teacher
  remarks?: string | null;
  date: string; // yyyy-mm-dd
}

// Filters accepted when fetching a students attendance 
export interface IAttendanceQuery {
  studentId: number;
  fromDate?: string;
  toDate?: string;
  classId?: number;
  subjectId?: number;
}

// One student's attendance input inside a teacher's submission payload
export interface IAttendanceSubmitEntry {
  rollNo?: string | number;
  studentId?: number;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string | null;
}

// Teacher's submit payload containing many students for a date/class/subject
export interface IAttendanceSubmitInput {
  className?: string;
  classId?: number;
  subjectName?: string;
  subjectId?: number;
  date: string; // yyyy-mm-dd
  takenById: number;//that person id who take the attendence like  teacher
  entries: IAttendanceSubmitEntry[];
}


