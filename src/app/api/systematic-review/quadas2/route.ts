/**
 * POST /api/systematic-review/quadas2
 * GET  /api/systematic-review/quadas2?projectId=123
 *
 * Run QUADAS-2 quality assessment on a diagnostic accuracy study paper.
 * GET returns the project-level QUADAS-2 summary.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  assessQUADAS2,
  getProjectQUADAS2Summary,
} from "@/lib/systematic-review/quadas2-assessment";

const assessSchema = z.object({
  paperId: z.number().int().positive(),
  projectId: z.number().int().positive(),
  title: z.string().min(1),
  textContent: z.string().min(100).max(100000),
});

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
    const parsed = assessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { paperId, projectId, title, textContent } = parsed.data;
    const assessment = await assessQUADAS2(
      paperId,
      projectId,
      title,
      textContent
    );

    return NextResponse.json(assessment);
  } catch (error) {
    log.error("QUADAS-2 assessment error", error);
    return NextResponse.json(
      { error: "QUADAS-2 assessment failed" },
      { status: 500 }
    );
  }
}

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

    const summary = await getProjectQUADAS2Summary(projectId);
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { error: "Failed to get QUADAS-2 summary" },
      { status: 500 }
    );
  }
}
