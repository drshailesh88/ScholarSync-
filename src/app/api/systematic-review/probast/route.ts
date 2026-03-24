/**
 * GET  /api/systematic-review/probast?projectId=123
 * POST /api/systematic-review/probast
 *
 * PROBAST (Prediction model Risk Of Bias ASsessment Tool) assessments.
 * Stores each domain as a risk_of_bias row with domain prefixed "probast_".
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { assessPROBAST } from "@/lib/systematic-review/probast-assessment";
import type {
  PROBASTJudgment,
  PROBASTDomainAssessment,
  FullPROBASTAssessment,
} from "@/lib/systematic-review/probast-assessment";

const signalingQuestionSchema = z.object({
  question: z.string(),
  answer: z.enum(["Yes", "Probably Yes", "No", "Probably No", "No Information"]),
});

const domainAssessmentSchema = z.object({
  domain: z.enum(["participants", "predictors", "outcome", "analysis"]),
  domainName: z.string(),
  riskOfBias: z.enum(["Low", "High", "Unclear"]),
  applicabilityConcern: z.enum(["Low", "High", "Unclear"]).nullable(),
  signalingQuestions: z.array(signalingQuestionSchema),
  rationale: z.string(),
});

const probastPostSchema = z.object({
  projectId: z.number().int().positive(),
  paperId: z.number().int().positive(),
  modelName: z.string().min(1),
  domains: z.array(domainAssessmentSchema).length(4),
});

function mapJudgmentToEnum(j: PROBASTJudgment): "low" | "high" | "some_concerns" {
  switch (j) {
    case "Low":
      return "low";
    case "High":
      return "high";
    case "Unclear":
      return "some_concerns";
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

    const results = await db.execute(
      sql`SELECT * FROM risk_of_bias WHERE project_id = ${projectId} AND domain LIKE 'probast_%' ORDER BY paper_id, domain`
    );

    const rows = Array.isArray(results) ? results : (results as Record<string, unknown>).rows ?? [];
    const paperMap = new Map<number, { domains: PROBASTDomainAssessment[]; modelName: string }>();

    for (const row of rows as Array<Record<string, unknown>>) {
      const paperId = row.paper_id as number;
      const domainKey = (row.domain as string).replace("probast_", "");
      const supportData = row.support_text
        ? JSON.parse(row.support_text as string)
        : {};

      if (!paperMap.has(paperId)) {
        paperMap.set(paperId, { domains: [], modelName: supportData.modelName || "" });
      }

      const entry = paperMap.get(paperId)!;
      if (supportData.modelName && !entry.modelName) {
        entry.modelName = supportData.modelName;
      }

      const judgment = row.judgment as string;
      let riskOfBias: PROBASTJudgment = "Unclear";
      if (judgment === "low") riskOfBias = "Low";
      else if (judgment === "high") riskOfBias = "High";
      else if (judgment === "some_concerns") riskOfBias = "Unclear";

      entry.domains.push({
        domain: domainKey,
        domainName: supportData.domainName || domainKey,
        riskOfBias,
        applicabilityConcern: supportData.applicabilityConcern ?? null,
        signalingQuestions: supportData.signalingQuestions || [],
        rationale: supportData.rationale || "",
      });
    }

    const assessments: (FullPROBASTAssessment & { paperId: number })[] = [];

    for (const [paperId, data] of paperMap.entries()) {
      const robJudgments = data.domains.map((d) => d.riskOfBias);
      let overallRoB: PROBASTJudgment = "Low";
      if (robJudgments.includes("High")) overallRoB = "High";
      else if (robJudgments.includes("Unclear")) overallRoB = "Unclear";

      const appJudgments = data.domains
        .filter((d) => d.applicabilityConcern !== null)
        .map((d) => d.applicabilityConcern as PROBASTJudgment);
      let overallApplicability: PROBASTJudgment = "Low";
      if (appJudgments.includes("High")) overallApplicability = "High";
      else if (appJudgments.includes("Unclear")) overallApplicability = "Unclear";

      assessments.push({
        paperId,
        studyId: String(paperId),
        modelName: data.modelName,
        domains: data.domains,
        overallRoB,
        overallApplicability,
      });
    }

    return NextResponse.json(assessments);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch PROBAST assessments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = probastPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, paperId, modelName, domains } = parsed.data;

    const assessment = assessPROBAST(
      String(paperId),
      modelName,
      domains as PROBASTDomainAssessment[]
    );

    for (const domain of assessment.domains) {
      const domainField = `probast_${domain.domain}`;
      const judgmentEnum = mapJudgmentToEnum(domain.riskOfBias);
      const supportData = JSON.stringify({
        modelName,
        domainName: domain.domainName,
        signalingQuestions: domain.signalingQuestions,
        rationale: domain.rationale,
        applicabilityConcern: domain.applicabilityConcern,
      });

      await db.execute(sql`
        INSERT INTO risk_of_bias (paper_id, project_id, domain, judgment, support_text, assessed_by)
        VALUES (${paperId}, ${projectId}, ${domainField}, ${judgmentEnum}, ${supportData}, 'user')
        ON CONFLICT ON CONSTRAINT risk_of_bias_paper_project_domain_unique DO UPDATE SET
          judgment = EXCLUDED.judgment,
          support_text = EXCLUDED.support_text,
          assessed_by = EXCLUDED.assessed_by,
          created_at = NOW()
      `);
    }

    return NextResponse.json(assessment);
  } catch {
    return NextResponse.json(
      { error: "PROBAST assessment failed" },
      { status: 500 }
    );
  }
}
