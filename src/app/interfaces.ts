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

export interface ProjectDetails extends Project {
  collaborators: Array<Collaborator>;
  technologies: Array<Technology>;
  media: Array<Media>;
  external_resources: Array<ExternalResource>;
}

export interface ExternalResource {
  id: number;
  url: string;
  type:
    | "GITHUB"
    | "BITBUCKET"
    | "OTHER_REPO"
    | "JIRA"
    | "TRELLO"
    | "CONFLUENCE"
    | "DRIVE"
    | "OTHER"
    | "WEB";
  name: string;
}

export interface Media {
  id: number;
  url: string;
  type: string;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Collaborator {
  id: number;
  username: string;
  profile_photo: string;
  project_role_id: number;
  project_role_name: string;
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

export interface Blog {
  id: number;
  user_id: number;
  project_id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  rol_id: number;
  username: string;
  password: string;
  profile_photo: string;
  phone: string;
  email: string;
  short_description: string;
  long_description: string;
  job_title: string;
  public: boolean;
  deleted: boolean;
  banned: boolean;
  created_at: string;
  updated_at: string;
  repo_url: string;
  website_url: string;
  linkedinUrl: string;
  location: string;
  skills: Array<Skill>;
  technologies: Array<Technology>;
  experiences: Array<Experience>;
  educations: Array<Education>;
}

export interface Experience {
  id: number;
  role: string;
  start_date: string;
  end_date?: string;
  location: string;
  description: string;
  company_logo: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  field: string;
  start_date: string;
  end_date?: string;
  location: string;
  description?: string;
  institution: string;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Pagination {
  offset: number;
  limit: number;
  count: number;
  total: number;
}
