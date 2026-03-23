/**
 * GET  /api/systematic-review/moose?projectId=123
 * POST /api/systematic-review/moose
 *
 * MOOSE (Meta-analysis Of Observational Studies in Epidemiology) checklist
 * assessment — one assessment per project.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { assessMOOSE } from "@/lib/systematic-review/moose-checklist";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const mooseItemSchema = z.object({
  itemNumber: z.number(),
  rating: z.enum(["Yes", "No", "Partial", "Not Applicable"]),
  pageOrSection: z.string(),
  comment: z.string(),
});

const moosePostSchema = z.object({
  projectId: z.number().int().positive(),
  items: z.array(mooseItemSchema),
});

// ---------------------------------------------------------------------------
// GET — Retrieve MOOSE assessment for a project
// ---------------------------------------------------------------------------

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
      sql`SELECT * FROM moose_assessments WHERE project_id = ${projectId} LIMIT 1`
    );

    const rows = Array.isArray(results) ? results : [];
    const row = Array.isArray(rows) ? rows[0] ?? null : null;

    return NextResponse.json(row);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch MOOSE assessment" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Save / update MOOSE assessment (upsert)
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = moosePostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, items } = parsed.data;

    const assessment = assessMOOSE(String(projectId), items);

    await db.execute(sql`
      INSERT INTO moose_assessments (project_id, items, compliance, completed_count, total_applicable, completion_rate)
      VALUES (
        ${projectId},
        ${JSON.stringify(assessment.items)}::jsonb,
        ${assessment.compliance},
        ${assessment.completedCount},
        ${assessment.totalApplicable},
        ${assessment.completionRate}
      )
      ON CONFLICT (project_id) DO UPDATE SET
        items = EXCLUDED.items,
        compliance = EXCLUDED.compliance,
        completed_count = EXCLUDED.completed_count,
        total_applicable = EXCLUDED.total_applicable,
        completion_rate = EXCLUDED.completion_rate,
        updated_at = NOW()
    `);

    return NextResponse.json(assessment);
  } catch {
    return NextResponse.json(
      { error: "MOOSE assessment failed" },
      { status: 500 }
    );
  }
}
