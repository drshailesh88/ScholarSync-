/**
 * POST /api/systematic-review/screen
 *
 * Triple-agent AI screening for systematic reviews.
 * Supports both single paper and batch screening.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { screeningCriteria } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  screenPaper,
  batchScreenPapers,
  getScreeningSummary,
  type ScreeningCriterion,
} from "@/lib/systematic-review";

const screenSingleSchema = z.object({
  mode: z.literal("single"),
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  title: z.string().min(1),
  abstract: z.string().min(1),
});

const screenBatchSchema = z.object({
  mode: z.literal("batch"),
  projectId: z.number().int().positive(),
  papers: z
    .array(
      z.object({
        paperId: z.number().int().positive(),
        title: z.string().min(1),
        abstract: z.string().min(1),
      })
    )
    .min(1)
    .max(100),
});

const requestSchema = z.discriminatedUnion("mode", [
  screenSingleSchema,
  screenBatchSchema,
]);

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(
      userId,
      "systematic-review",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Load screening criteria for the project
    const criteria = await db
      .select()
      .from(screeningCriteria)
      .where(eq(screeningCriteria.projectId, data.projectId));

    if (criteria.length === 0) {
      return NextResponse.json(
        {
          error:
            "No screening criteria found. Define inclusion/exclusion criteria first.",
        },
        { status: 400 }
      );
    }

    const formattedCriteria: ScreeningCriterion[] = criteria.map((c: { id: number; criterionType: string | null; description: string; category: string | null }) => ({
      id: c.id,
      type: c.criterionType as "inclusion" | "exclusion",
      description: c.description,
      category: c.category ?? undefined,
    }));

    if (data.mode === "single") {
      const result = await screenPaper(
        data.projectId,
        data.paperId,
        data.title,
        data.abstract,
        formattedCriteria
      );
      return NextResponse.json(result);
    }

    // Batch mode
    const results = await batchScreenPapers(
      data.projectId,
      data.papers,
      formattedCriteria
    );

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        included: results.filter((r) => r.finalDecision === "include").length,
        excluded: results.filter((r) => r.finalDecision === "exclude").length,
        conflicts: results.filter((r) => r.finalDecision === "conflict").length,
      },
    });
  } catch (error) {
    log.error("Screening error", error);
    return NextResponse.json(
      { error: "Screening failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/systematic-review/screen?projectId=123
 *
 * Get screening summary for a project.
 */
export async function GET(req: Request) {
  try {
    await getCurrentUserId();

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const summary = await getScreeningSummary(projectId);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get screening summary" },
      { status: 500 }
    );
  }
}
