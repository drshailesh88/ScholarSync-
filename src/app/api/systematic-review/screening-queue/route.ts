/**
 * /api/systematic-review/screening-queue
 *
 * GET   — Get screening queue (papers to review, ordered by priority)
 *         ?mode=conflicts — return human-reviewer conflict list
 * POST  — Record a human screening decision
 *         body.action="resolve" — resolve a conflict with a final decision
 * PUT   — Trigger priority recomputation (active learning)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  recordHumanDecision,
  getScreeningQueue,
  getScreeningProgress,
  computeInterRaterAgreement,
  getUnblindedResults,
  getReviewerProgress,
  detectConflicts,
  resolveConflict,
} from "@/lib/systematic-review/dual-screening";
import { updateScreeningPriorities } from "@/lib/systematic-review/active-learning";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

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

    // Verify access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // mode=conflicts — return multi-reviewer conflict list
    if (mode === "conflicts") {
      const conflicts = await detectConflicts(projectId, stage);
      return NextResponse.json({ conflicts, total: conflicts.length });
    }

    // Unblind mode: return full results with conflict detection
    if (mode === "unblind") {
      const results = await getUnblindedResults(projectId, stage);
      const conflictsInResults = results.filter((r) => r.isConflict);
      const agreements = results.filter(
        (r) => r.aiDecision && r.humanDecision && !r.isConflict
      );
      return NextResponse.json({
        results,
        summary: {
          total: results.length,
          withBothDecisions: agreements.length + conflictsInResults.length,
          agreements: agreements.length,
          conflicts: conflictsInResults.length,
        },
      });
    }

    const [queue, progress, agreement, reviewerProgress] = await Promise.all([
      getScreeningQueue(projectId, stage, filter, { blinded, reviewerId: userId }),
      getScreeningProgress(projectId),
      computeInterRaterAgreement(projectId),
      getReviewerProgress(projectId, userId),
    ]);

    return NextResponse.json({ queue, progress, agreement, reviewerProgress });
  } catch (error) {
    console.error("Screening queue error", error);
    return NextResponse.json(
      { error: "Failed to get screening queue" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Record human decision OR resolve a conflict
// ---------------------------------------------------------------------------

const decisionSchema = z.object({
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  decision: z.enum(["include", "exclude", "maybe"]),
  reason: z.string().optional(),
  stage: z.enum(["title_abstract", "full_text"]).default("title_abstract"),
  action: z.literal("decide").optional(),
});

const resolveSchema = z.object({
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  stage: z.enum(["title_abstract", "full_text"]).default("title_abstract"),
  resolution: z.enum(["include", "exclude", "maybe"]),
  reason: z.string().optional(),
  action: z.literal("resolve"),
});

const postSchema = z.union([resolveSchema, decisionSchema]);

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Verify access (owner or collaborator)
    const access = await verifyProjectAccess(parsed.data.projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Handle conflict resolution
    if (parsed.data.action === "resolve") {
      await resolveConflict(
        parsed.data.projectId,
        parsed.data.paperId,
        parsed.data.stage,
        parsed.data.resolution,
        userId,
        parsed.data.reason
      );

      const progress = await getScreeningProgress(parsed.data.projectId);
      return NextResponse.json({ success: true, progress });
    }

    // Handle regular screening decision — pass userId as the reviewerId
    await recordHumanDecision({
      ...parsed.data,
      userId,
      reviewerId: userId,
    });

    // Get updated progress (overall + per-reviewer)
    const [progress, reviewerProgress] = await Promise.all([
      getScreeningProgress(parsed.data.projectId),
      getReviewerProgress(parsed.data.projectId, userId),
    ]);

    return NextResponse.json({ success: true, progress, reviewerProgress });
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

    // Verify access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
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
