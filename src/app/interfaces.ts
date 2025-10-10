export interface Project {
  id: number;
  name: string;
  logo: string | null;
  status: ProjectStatus;
  public: boolean;
  start_date: string;
  end_date: string | null;
  estimated_end: string | null;
  created_at: string;
  updated_at: string;
  tags: Array<ProjectTag>;
  creator_id: number;
  short_description: string;
  long_description: string;
  pagination: Pagination;
}

export type ProjectStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PAUSED"
  | "FINISHED"
  | "DRAFT"
  | "DISCARDED"
  | "CANCELED";

export interface ProjectTag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  offset: number;
  limit: number;
  count: number;
  total: number;
}
