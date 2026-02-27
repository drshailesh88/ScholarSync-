/**
 * GET /api/systematic-review/gap-map?projectId=123
 *
 * Returns GapMapData for a project — the intervention × outcome evidence
 * gap map matrix populated from data extraction and meta-analysis results.
 *
 * Auth: Clerk user must own or be a collaborator of the project.
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { generateEvidenceGapMap } from "@/lib/systematic-review/evidence-gap-map";
import { db } from "@/lib/db";
import { projects, projectCollaborators } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Ownership / collaboration check
// ---------------------------------------------------------------------------

async function canViewProject(
  userId: string,
  projectId: number
): Promise<boolean> {
  // Check direct ownership
  const owned = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
    .limit(1);

  if (owned.length > 0) return true;

  // Check collaboration
  const collab = await db
    .select({ id: projectCollaborators.id })
    .from(projectCollaborators)
    .where(
      and(
        eq(projectCollaborators.projectId, projectId),
        eq(projectCollaborators.userId, userId)
      )
    )
    .limit(1);

  return collab.length > 0;
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const log = logger.withRequestId();

  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(
      userId,
      "systematic-review",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") ?? "0", 10);

    if (!projectId || isNaN(projectId)) {
      return NextResponse.json(
        { error: "projectId is required and must be a positive integer" },
        { status: 400 }
      );
    }

    const allowed = await canViewProject(userId, projectId);
    if (!allowed) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 403 }
      );
    }

    const data = await generateEvidenceGapMap(projectId);
    return NextResponse.json(data);
  } catch (error) {
    log.error("Evidence gap map generation error", error);
    return NextResponse.json(
      { error: "Failed to generate evidence gap map" },
      { status: 500 }
    );
  }
}
