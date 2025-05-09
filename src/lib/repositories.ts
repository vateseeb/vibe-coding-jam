import { Project, ProjectSummary } from "./types";

/**
 * Repository interface for project data access
 */
export interface ProjectRepository {
  /**
   * Get all projects with summary data
   */
  getAllProjects(): Promise<ProjectSummary[]>;

  /**
   * Get detailed project data by slug
   * @param slug - Project unique identifier
   */
  getProjectBySlug(slug: string): Promise<Project | null>;

  /**
   * Increment vote count for a project
   * @param slug - Project unique identifier
   * @returns Updated vote count
   */
  incrementVote(slug: string): Promise<number>;
}

/**
 * Repository interface for Azure DevOps Wiki data
 */
export interface WikiRepository {
  /**
   * Fetch project content from Azure DevOps Wiki
   * @param projectSlug - Project unique identifier
   * @returns Project content in Markdown format
   */
  getProjectWikiContent(projectSlug: string): Promise<string | null>;
}
