import { MockProjectRepository } from "@/lib/mockRepository";
import { NextResponse } from "next/server";

// Initialize repository - this would be replaced with actual implementation later
const projectRepo = new MockProjectRepository();

/**
 * GET handler for projects API
 *
 * @returns List of all projects
 */
export async function GET() {
  try {
    const projects = await projectRepo.getAllProjects();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
