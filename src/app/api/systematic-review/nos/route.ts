/**
 * GET  /api/systematic-review/nos?projectId=123
 * POST /api/systematic-review/nos
 *
 * Newcastle-Ottawa Scale (NOS) quality assessment for observational studies.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { scoreNOSAssessment } from "@/lib/systematic-review/newcastle-ottawa";

const nosItemSchema = z.object({
  itemId: z.string(),
  category: z.string(),
  question: z.string(),
  selectedOption: z.string(),
  starsAwarded: z.number(),
  maxStars: z.number(),
  rationale: z.string(),
});

const nosPostSchema = z.object({
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  studyDesign: z.enum(["cohort", "case-control"]),
  items: z.array(nosItemSchema),
  overallRationale: z.string().optional(),
});

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

    const results = await db.execute(
      sql`SELECT * FROM nos_assessments WHERE project_id = ${projectId} ORDER BY created_at DESC`
    );

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch NOS assessments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = nosPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, paperId } = parsed.data;

    const assessment = scoreNOSAssessment(
      String(parsed.data.paperId),
      parsed.data.studyDesign,
      parsed.data.items,
      parsed.data.overallRationale ?? ""
    );

    await db.execute(sql`
      INSERT INTO nos_assessments (project_id, paper_id, study_design, items, selection_score, comparability_score, outcome_exposure_score, total_stars, max_stars, quality_rating, overall_rationale)
      VALUES (${projectId}, ${paperId}, ${assessment.studyDesign}, ${JSON.stringify(assessment.items)}::jsonb, ${assessment.categoryScores.selection.score}, ${assessment.categoryScores.comparability.score}, ${assessment.categoryScores.outcomeOrExposure.score}, ${assessment.totalStars}, ${assessment.maxStars}, ${assessment.qualityRating}, ${assessment.overallRationale})
      ON CONFLICT (project_id, paper_id) DO UPDATE SET
        study_design = EXCLUDED.study_design,
        items = EXCLUDED.items,
        selection_score = EXCLUDED.selection_score,
        comparability_score = EXCLUDED.comparability_score,
        outcome_exposure_score = EXCLUDED.outcome_exposure_score,
        total_stars = EXCLUDED.total_stars,
        max_stars = EXCLUDED.max_stars,
        quality_rating = EXCLUDED.quality_rating,
        overall_rationale = EXCLUDED.overall_rationale,
        updated_at = NOW()
    `);

    return NextResponse.json(assessment);
  } catch {
    return NextResponse.json(
      { error: "NOS assessment failed" },
      { status: 500 }
    );
  }
}
