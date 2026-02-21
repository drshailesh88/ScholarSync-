/**
 * POST /api/systematic-review/rob2
 * GET  /api/systematic-review/rob2?projectId=123
 *
 * Run RoB 2 risk-of-bias assessment on a paper.
 * GET returns the project-level RoB 2 summary.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  assessRiskOfBias,
  getProjectRoB2Summary,
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
    const assessment = await assessRiskOfBias(
      paperId,
      projectId,
      title,
      textContent
    );

    return NextResponse.json(assessment);
  } catch (error) {
    log.error("RoB2 assessment error", error);
    return NextResponse.json(
      { error: "RoB2 assessment failed" },
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

    const summary = await getProjectRoB2Summary(projectId);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get RoB2 summary" },
      { status: 500 }
    );
  }
}
