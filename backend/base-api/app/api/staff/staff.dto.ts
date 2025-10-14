export interface IStaff {
  id?: number;
  user_id: number;
  employee_id?: string | null;
  department?: string | null;
  position?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface IStaffQuery {
  user_id?: number;
  department?: string;
  position?: string;
}
