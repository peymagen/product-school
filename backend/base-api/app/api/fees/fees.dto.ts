export interface CreateFeeInput {
  rollNo: string | number;
  amount: number;
  dueDate: string | null;
  title: string | null;
  branchName: string | null;
  className: string | null;
  status?: string | null;
};
export interface IFeeRecord {
  id: number;
  studentId: number;
  title: string;
  amount: number;
  dueDate: string | null;
  status: "unpaid" | "partial" | "paid";
  paidAmount?: number | null;
}

export interface IFeesStatusSummary {
  status: "unpaid" | "paid" | "partial";
  totalDue: number;
  totalAmount: number;
}
