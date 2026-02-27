/**
 * /api/systematic-review/import
 *
 * POST  — Import papers from search databases into a project
 * GET   — Get papers for a project with details
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  importFromSearch,
  getProjectPapersWithDetails,
} from "@/lib/systematic-review/paper-import";

// ---------------------------------------------------------------------------
// POST — Import papers from search
// ---------------------------------------------------------------------------

const importSchema = z.object({
  projectId: z.number().int().positive(),
  searchString: z.string().min(3),
  sources: z
    .array(z.enum(["pubmed", "semantic_scholar", "openalex"]))
    .min(1)
    .default(["pubmed"]),
  maxResults: z.number().int().min(1).max(500).default(100),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = importSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, searchString, sources, maxResults } = parsed.data;

    // Verify project ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Run the import
    const result = await importFromSearch(
      projectId,
      searchString,
      sources,
      maxResults
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("SR paper import error", error);
    return NextResponse.json(
      { error: "Failed to import papers" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Get papers for a project
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const pid = parseInt(projectId, 10);

    // Verify ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, pid), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const papers = await getProjectPapersWithDetails(pid);

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("SR papers fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}
