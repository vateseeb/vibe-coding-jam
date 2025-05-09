import { MockWikiRepository } from "@/lib/mockWikiRepository";
import { NextRequest, NextResponse } from "next/server";

// Initialize repository
const wikiRepo = new MockWikiRepository();

/**
 * GET handler for wiki content API
 *
 * @param request The incoming request
 * @param context Request context containing params
 * @returns Wiki content for the specified project or 404 if not found
 */
// Fixed for Next.js 15: `params` is now async
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const content = await wikiRepo.getProjectWikiContent(slug);

    if (!content) {
      return NextResponse.json(
        { error: "Wiki content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch wiki content for ${slug}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch wiki content" },
      { status: 500 }
    );
  }
}
