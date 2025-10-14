export interface IBranch {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  status?: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}

export interface IBranchQuery {
  name?: string;
  status?: "active" | "inactive";
}
