import { ProjectRepository } from "./repositories";
import { Project, ProjectSummary } from "./types";

/**
 * Mock implementation of ProjectRepository for development
 */
export class MockProjectRepository implements ProjectRepository {
  private projects: Project[] = [
    {
      id: "1",
      slug: "ai-image-generator",
      title: "AI Image Generator",
      description:
        "A tool that generates images from text descriptions using AI",
      teamMembers: ["Alex Chen", "Jamie Smith", "Taylor Wong"],
      technologies: ["React", "TypeScript", "OpenAI API", "Next.js"],
      createdAt: new Date("2025-04-15"),
      updatedAt: new Date("2025-05-01"),
      voteCount: 12,
      repoUrl: "https://github.com/example/ai-image-generator",
    },
    {
      id: "2",
      slug: "blockchain-voting-app",
      title: "Blockchain Voting App",
      description:
        "Secure and transparent voting application using blockchain technology",
      teamMembers: ["Jordan Lee", "Casey Brown"],
      technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
      createdAt: new Date("2025-04-10"),
      updatedAt: new Date("2025-05-02"),
      voteCount: 8,
      repoUrl: "https://github.com/example/blockchain-voting",
    },
    {
      id: "3",
      slug: "ar-fitness-coach",
      title: "AR Fitness Coach",
      description:
        "Augmented reality fitness coach that guides users through workouts",
      teamMembers: ["Morgan Rivera", "Sam Johnson", "Riley Garcia"],
      technologies: ["Unity", "ARKit", "C#", "iOS"],
      createdAt: new Date("2025-04-12"),
      updatedAt: new Date("2025-05-03"),
      voteCount: 15,
      repoUrl: "https://github.com/example/ar-fitness-coach",
    },
  ];

  async getAllProjects(): Promise<ProjectSummary[]> {
    // Convert Projects to ProjectSummary
    return this.projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      description: project.description,
      teamMembers: project.teamMembers,
      technologies: project.technologies,
      voteCount: project.voteCount,
    }));
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const project = this.projects.find((p) => p.slug === slug);
    return project || null;
  }

  async incrementVote(slug: string): Promise<number> {
    const project = this.projects.find((p) => p.slug === slug);
    if (!project) {
      throw new Error(`Project with slug ${slug} not found`);
    }

    // Increment vote count
    project.voteCount += 1;
    return project.voteCount;
  }
}
