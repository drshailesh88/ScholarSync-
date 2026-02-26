/**
 * POST /api/systematic-review/grade
 * GET  /api/systematic-review/grade?projectId=123
 *
 * Run GRADE certainty of evidence assessment for an outcome.
 * GET returns all GRADE assessments for a project.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  assessGRADE,
  getGRADESummary,
  exportGRADETable,
} from "@/lib/systematic-review";

const assessSchema = z.object({
  projectId: z.number().int().positive(),
  outcome: z.string().min(1),
  analysisId: z.number().int().positive().optional(),
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

    const { projectId, outcome, analysisId } = parsed.data;
    const assessment = await assessGRADE(projectId, outcome, analysisId);

    return NextResponse.json(assessment);
  } catch (error) {
    log.error("GRADE assessment error", error);
    return NextResponse.json(
      { error: "GRADE assessment failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await getCurrentUserId();

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const format = searchParams.get("format"); // "csv" for export

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    if (format === "csv") {
      const csv = await exportGRADETable(projectId);
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="grade-summary-${projectId}.csv"`,
        },
      });
    }

    const assessments = await getGRADESummary(projectId);
    return NextResponse.json(assessments);
  } catch {
    return NextResponse.json(
      { error: "Failed to get GRADE assessments" },
      { status: 500 }
    );
  }
}
