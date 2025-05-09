/**
 * Project data model
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imagePath?: string;
  teamMembers: string[];
  technologies: string[];
  wikiUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  voteCount: number;
}

/**
 * Basic project data without votes or fetch details
 */
export type ProjectSummary = Pick<
  Project,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "teamMembers"
  | "technologies"
  | "voteCount"
>;
