/**
 * /api/systematic-review/screening-queue
 *
 * GET   — Get screening queue (papers to review, ordered by priority)
 * POST  — Record a human screening decision
 * PUT   — Trigger priority recomputation (active learning)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  recordHumanDecision,
  getScreeningQueue,
  getScreeningProgress,
  computeInterRaterAgreement,
  getUnblindedResults,
} from "@/lib/systematic-review/dual-screening";
import { updateScreeningPriorities } from "@/lib/systematic-review/active-learning";

// ---------------------------------------------------------------------------
// GET — Get screening queue + progress
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const filter =
      (searchParams.get("filter") as
        | "all"
        | "unscreened"
        | "conflicts"
        | "uncertain") || "unscreened";
    const stage =
      (searchParams.get("stage") as "title_abstract" | "full_text") ||
      "title_abstract";
    const mode = searchParams.get("mode");
    const blinded = searchParams.get("blinded") === "true";

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify ownership
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

    // Unblind mode: return full results with conflict detection
    if (mode === "unblind") {
      const results = await getUnblindedResults(projectId, stage);
      const conflicts = results.filter((r) => r.isConflict);
      const agreements = results.filter((r) => r.aiDecision && r.humanDecision && !r.isConflict);
      return NextResponse.json({
        results,
        summary: {
          total: results.length,
          withBothDecisions: agreements.length + conflicts.length,
          agreements: agreements.length,
          conflicts: conflicts.length,
        },
      });
    }

    const [queue, progress, agreement] = await Promise.all([
      getScreeningQueue(projectId, stage, filter, { blinded }),
      getScreeningProgress(projectId),
      computeInterRaterAgreement(projectId),
    ]);

    return NextResponse.json({ queue, progress, agreement });
  } catch (error) {
    console.error("Screening queue error", error);
    return NextResponse.json(
      { error: "Failed to get screening queue" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Record human decision
// ---------------------------------------------------------------------------

const decisionSchema = z.object({
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  decision: z.enum(["include", "exclude", "maybe"]),
  reason: z.string().optional(),
  stage: z.enum(["title_abstract", "full_text"]).default("title_abstract"),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = decisionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Verify ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, parsed.data.projectId),
          eq(projects.user_id, userId)
        )
      )
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await recordHumanDecision({
      ...parsed.data,
      userId,
    });

    // Get updated progress
    const progress = await getScreeningProgress(parsed.data.projectId);

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Screening decision error", error);
    return NextResponse.json(
      { error: "Failed to record decision" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Recompute priorities (active learning)
// ---------------------------------------------------------------------------

export async function PUT(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const projectId = body.projectId;

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify ownership
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

    const result = await updateScreeningPriorities(projectId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Priority update error", error);
    return NextResponse.json(
      { error: "Failed to update priorities" },
      { status: 500 }
    );
  }
}
