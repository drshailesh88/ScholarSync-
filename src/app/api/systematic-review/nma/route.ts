/**
 * /api/systematic-review/nma
 *
 * POST — Run network meta-analysis from pairwise study data
 * GET  — Retrieve saved NMA results for a project
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  computeNMA,
  type NMAStudy,
} from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const nmaStudySchema = z.object({
  studyId: z.string().min(1),
  treatment1: z.string().min(1),
  treatment2: z.string().min(1),
  effect: z.number(),
  se: z.number().positive("SE must be positive"),
  n1: z.number().int().positive().optional(),
  n2: z.number().int().positive().optional(),
});

const postSchema = z.object({
  projectId: z.number().int().positive(),
  studies: z.array(nmaStudySchema).min(2, "At least 2 studies required"),
  model: z.enum(["fixed", "random"]).default("fixed"),
});

// ---------------------------------------------------------------------------
// POST — Run NMA
// ---------------------------------------------------------------------------

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

    const { projectId, studies, model } = parsed.data;

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

    // Validate that treatment1 !== treatment2 for every study
    for (const s of studies) {
      if (s.treatment1 === s.treatment2) {
        return NextResponse.json(
          { error: `Study "${s.studyId}" compares a treatment to itself` },
          { status: 400 }
        );
      }
    }

    // Run NMA
    const result = computeNMA(studies as NMAStudy[], model);

    // Save the result in the project metadata (jsonb column) for later retrieval
    const existingMetadata =
      (project.metadata as Record<string, unknown>) ?? {};
    await db
      .update(projects)
      .set({
        metadata: {
          ...existingMetadata,
          nmaResult: result,
          nmaStudies: studies,
          nmaLastRun: new Date().toISOString(),
        },
      })
      .where(eq(projects.id, projectId));

    return NextResponse.json({ result });
  } catch (error) {
    console.error("NMA error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to run NMA";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// GET — Retrieve saved NMA results
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

    const metadata = (project.metadata as Record<string, unknown>) ?? {};
    const nmaResult = metadata.nmaResult ?? null;
    const nmaStudies = metadata.nmaStudies ?? null;
    const nmaLastRun = metadata.nmaLastRun ?? null;

    return NextResponse.json({ result: nmaResult, studies: nmaStudies, lastRun: nmaLastRun });
  } catch (error) {
    console.error("NMA fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch NMA results" },
      { status: 500 }
    );
  }
}
