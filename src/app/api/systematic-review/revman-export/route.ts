/**
 * /api/systematic-review/revman-export
 *
 * GET — Generate a RevMan CSV data package for a systematic review project.
 *       Returns a JSON object with 4 CSV strings (studyCharacteristics,
 *       riskOfBias, outcomeData, excludedStudies).
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { generateRevManExport } from "@/lib/systematic-review/revman-export";

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

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

    const exportPackage = await generateRevManExport(projectId);

    return NextResponse.json(exportPackage);
  } catch (error) {
    console.error("RevMan export error:", error);
    return NextResponse.json(
      { error: "Failed to generate RevMan export" },
      { status: 500 }
    );
  }
}
