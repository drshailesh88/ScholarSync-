/**
 * POST /api/systematic-review/amstar2
 * GET  /api/systematic-review/amstar2?projectId=123
 *
 * POST: Run an AI-powered AMSTAR 2 self-assessment for the project.
 * GET:  Retrieve the most recent stored AMSTAR 2 assessment.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { assessAMSTAR2, getAMSTAR2Assessment } from "@/lib/systematic-review/amstar2-checklist";

const assessSchema = z.object({
  projectId: z.number().int().positive(),
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

    const { projectId } = parsed.data;
    const assessment = await assessAMSTAR2(projectId);

    return NextResponse.json(assessment);
  } catch (error) {
    log.error("AMSTAR 2 assessment error", error);
    return NextResponse.json(
      { error: "AMSTAR 2 assessment failed" },
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

    const assessment = await getAMSTAR2Assessment(projectId);

    if (!assessment) {
      return NextResponse.json(
        { error: "No AMSTAR 2 assessment found for this project" },
        { status: 404 }
      );
    }

    return NextResponse.json(assessment);
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve AMSTAR 2 assessment" },
      { status: 500 }
    );
  }
}
