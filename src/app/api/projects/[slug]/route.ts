import { MockProjectRepository } from "@/lib/mockRepository";
import { NextRequest, NextResponse } from "next/server";

// Initialize repository - this would be replaced with actual implementation later
const projectRepo = new MockProjectRepository();

/**
 * GET handler for specific project by slug
 *
 * @param request The incoming request
 * @param context Request context containing params
 * @returns Project details or 404 if not found
 */
// Fixed for Next.js 15: `params` is now async
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const project = await projectRepo.getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
