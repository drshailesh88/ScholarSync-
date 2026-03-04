import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexCompilations, latexProjects } from "@/lib/db/schema/editor";
import { eq, and, desc } from "drizzle-orm";

/**
 * GET /api/latex/synctex/data?projectId=xxx
 * Returns the SyncTeX data availability and the base64-encoded synctex data
 * for the latest compilation of the project.
 */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing projectId parameter" },
        { status: 400 }
      );
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get the latest compilation with SyncTeX data
    const [compilation] = await db
      .select({
        synctexData: latexCompilations.synctexData,
        status: latexCompilations.status,
      })
      .from(latexCompilations)
      .where(eq(latexCompilations.latexProjectId, projectId))
      .orderBy(desc(latexCompilations.createdAt))
      .limit(1);

    if (!compilation) {
      return NextResponse.json({
        available: false,
        reason: "No compilations found",
      });
    }

    if (compilation.status === "error") {
      return NextResponse.json({
        available: false,
        reason: "Last compilation failed",
      });
    }

    if (!compilation.synctexData) {
      return NextResponse.json({
        available: false,
        reason: "SyncTeX data not available for last compilation",
      });
    }

    return NextResponse.json({
      available: true,
      synctexBase64: compilation.synctexData,
    });
  } catch (error) {
    console.error("SyncTeX data fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
