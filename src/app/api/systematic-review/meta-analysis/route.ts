/**
 * /api/systematic-review/meta-analysis
 *
 * POST — Run meta-analysis from study data
 * GET  — Retrieve stored meta-analysis results
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  runMetaAnalysis,
  getMetaAnalysisResults,
  trimAndFill,
  type StudyEffect,
  type EffectType,
  type ModelType,
} from "@/lib/systematic-review/meta-analysis";

// ---------------------------------------------------------------------------
// POST — Run meta-analysis
// ---------------------------------------------------------------------------

const studySchema = z.object({
  studyId: z.string(),
  studyLabel: z.string(),
  effect: z.number(),
  se: z.number().positive(),
  ciLower: z.number(),
  ciUpper: z.number(),
  n: z.number().optional(),
});

const runSchema = z.object({
  projectId: z.number().int().positive(),
  analysisName: z.string().min(1).max(200),
  outcomeMeasure: z.string().min(1).max(200),
  effectType: z.enum(["OR", "RR", "SMD", "MD", "RD"]),
  model: z.enum(["fixed", "random"]),
  studies: z.array(studySchema).min(2),
  includeTrimAndFill: z.boolean().default(false),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = runSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      projectId,
      analysisName,
      outcomeMeasure,
      effectType,
      model,
      studies,
      includeTrimAndFill,
    } = parsed.data;

    // Verify project ownership
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

    // Run meta-analysis
    const result = await runMetaAnalysis(
      projectId,
      analysisName,
      outcomeMeasure,
      effectType as EffectType,
      model as ModelType,
      studies as StudyEffect[]
    );

    // Optionally run trim-and-fill
    let trimFillResult = null;
    if (includeTrimAndFill) {
      trimFillResult = trimAndFill(
        studies as StudyEffect[],
        model as ModelType
      );
    }

    return NextResponse.json({ result, trimAndFill: trimFillResult });
  } catch (error) {
    console.error("Meta-analysis error", error);
    return NextResponse.json(
      { error: "Failed to run meta-analysis" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Retrieve stored results
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

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

    const results = await getMetaAnalysisResults(projectId);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Meta-analysis fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
