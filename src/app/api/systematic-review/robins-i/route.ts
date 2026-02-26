/**
 * POST /api/systematic-review/robins-i
 * GET  /api/systematic-review/robins-i?projectId=123
 *
 * Run ROBINS-I risk-of-bias assessment on a non-randomized study.
 * GET returns the project-level ROBINS-I summary.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  assessROBINSI,
  getProjectROBINSISummary,
} from "@/lib/systematic-review";

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
    const assessment = await assessROBINSI(
      paperId,
      projectId,
      title,
      textContent
    );

    return NextResponse.json(assessment);
  } catch (error) {
    log.error("ROBINS-I assessment error", error);
    return NextResponse.json(
      { error: "ROBINS-I assessment failed" },
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

    const summary = await getProjectROBINSISummary(projectId);
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { error: "Failed to get ROBINS-I summary" },
      { status: 500 }
    );
  }
}
