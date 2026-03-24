import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { assessCERQualFinding } from "@/lib/systematic-review/cerqual-assessment";

const componentSchema = z.object({
  component: z.enum([
    "methodological_limitations",
    "coherence",
    "adequacy",
    "relevance",
  ]),
  concern: z.enum(["no concerns", "minor", "moderate", "serious"]),
  explanation: z.string(),
  downgradeLevels: z.number().int().min(0).max(2),
});

const cerqualPostSchema = z.object({
  projectId: z.number().int().positive(),
  findingId: z.string().min(1),
  findingStatement: z.string().min(1),
  contributingStudies: z.number().int().min(0),
  components: z.array(componentSchema).length(4),
  explanation: z.string().optional(),
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
      sql`SELECT * FROM cerqual_assessments WHERE project_id = ${projectId} ORDER BY created_at ASC`
    );

    const rows = Array.isArray(results) ? results : [];

    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch CERQual assessments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = cerqualPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      projectId,
      findingId,
      findingStatement,
      contributingStudies,
      components,
      explanation,
    } = parsed.data;

    const assessment = assessCERQualFinding(
      findingId,
      findingStatement,
      contributingStudies,
      components,
      explanation
    );

    await db.execute(sql`
      INSERT INTO cerqual_assessments (project_id, finding_id, finding_statement, contributing_studies, components, overall_confidence, explanation)
      VALUES (
        ${projectId},
        ${assessment.findingId},
        ${assessment.findingStatement},
        ${assessment.contributingStudies},
        ${JSON.stringify(assessment.components)}::jsonb,
        ${assessment.overallConfidence},
        ${assessment.explanation}
      )
      ON CONFLICT (project_id, finding_id) DO UPDATE SET
        finding_statement = EXCLUDED.finding_statement,
        contributing_studies = EXCLUDED.contributing_studies,
        components = EXCLUDED.components,
        overall_confidence = EXCLUDED.overall_confidence,
        explanation = EXCLUDED.explanation,
        updated_at = NOW()
    `);

    return NextResponse.json(assessment);
  } catch {
    return NextResponse.json(
      { error: "CERQual assessment failed" },
      { status: 500 }
    );
  }
}
