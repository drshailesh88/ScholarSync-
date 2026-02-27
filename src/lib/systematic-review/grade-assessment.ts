/**
 * GRADE Certainty of Evidence Assessment
 *
 * Implements the Grading of Recommendations, Assessment, Development,
 * and Evaluation (GRADE) framework:
 * - Rates certainty of evidence across 5 domains
 * - Risk of bias, inconsistency, indirectness, imprecision, publication bias
 * - AI-powered assessment using meta-analysis + RoB 2 data
 * - Outputs: High / Moderate / Low / Very Low per outcome
 * - Summary of Findings table export (CSV)
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { metaAnalysisResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getMetaAnalysisResults } from "./meta-analysis";
import { getProjectRoB2Summary } from "./rob2-assessment";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CertaintyRating = "high" | "moderate" | "low" | "very_low";

export type GRADEDomain =
  | "risk_of_bias"
  | "inconsistency"
  | "indirectness"
  | "imprecision"
  | "publication_bias";

export interface GRADEDomainAssessment {
  domain: GRADEDomain;
  rating: "no_concern" | "serious" | "very_serious";
  rationale: string;
  downgradeBy: 0 | 1 | 2;
}

export interface GRADEAssessment {
  outcome: string;
  analysisId: number | null;
  domains: GRADEDomainAssessment[];
  overallCertainty: CertaintyRating;
  overallRationale: string;
  effectEstimate: string | null;
  numberOfStudies: number;
  totalParticipants: number | null;
  assessedAt: string;
}

// ---------------------------------------------------------------------------
// Zod schema for AI output
// ---------------------------------------------------------------------------

const gradeDomainSchema = z.object({
  domain: z.enum([
    "risk_of_bias",
    "inconsistency",
    "indirectness",
    "imprecision",
    "publication_bias",
  ]),
  rating: z.enum(["no_concern", "serious", "very_serious"]),
  rationale: z.string(),
  downgradeBy: z.union([z.literal(0), z.literal(1), z.literal(2)]),
});

const gradeAssessmentSchema = z.object({
  domains: z.array(gradeDomainSchema).length(5),
  overallCertainty: z.enum(["high", "moderate", "low", "very_low"]),
  overallRationale: z.string(),
  effectEstimate: z.string().nullable(),
  numberOfStudies: z.number().int().nonnegative(),
  totalParticipants: z.number().int().nonnegative().nullable(),
});

// ---------------------------------------------------------------------------
// GRADE domain labels
// ---------------------------------------------------------------------------

export const GRADE_DOMAIN_LABELS: Record<GRADEDomain, string> = {
  risk_of_bias: "Risk of Bias",
  inconsistency: "Inconsistency",
  indirectness: "Indirectness",
  imprecision: "Imprecision",
  publication_bias: "Publication Bias",
};

export const CERTAINTY_LABELS: Record<CertaintyRating, string> = {
  high: "High",
  moderate: "Moderate",
  low: "Low",
  very_low: "Very Low",
};

// ---------------------------------------------------------------------------
// AI-powered GRADE assessment
// ---------------------------------------------------------------------------

export async function assessGRADE(
  projectId: number,
  outcome: string,
  analysisId?: number
): Promise<GRADEAssessment> {
  // Gather evidence data
  const [maResults, robSummary] = await Promise.all([
    getMetaAnalysisResults(projectId),
    getProjectRoB2Summary(projectId),
  ]);

  // Find the relevant meta-analysis (by analysisId or outcome match)
  const relevantMA = analysisId
    ? maResults.find((r) => r.id === analysisId)
    : maResults.find(
        (r) =>
          r.outcomeMeasure?.toLowerCase() === outcome.toLowerCase() ||
          r.analysisName?.toLowerCase().includes(outcome.toLowerCase())
      );

  // Build context for the AI
  const maContext = relevantMA
    ? `Meta-analysis found for "${relevantMA.analysisName}":
  - Effect model: ${relevantMA.effectModel}
  - Pooled effect: ${relevantMA.pooledEffect} (95% CI: ${relevantMA.pooledCiLower} to ${relevantMA.pooledCiUpper})
  - Heterogeneity I²: ${relevantMA.heterogeneityI2}%
  - Heterogeneity p-value: ${relevantMA.heterogeneityP}
  - Study data: ${JSON.stringify(relevantMA.studyData)}`
    : "No meta-analysis results available for this outcome.";

  const robContext =
    robSummary.length > 0
      ? `Risk of Bias (RoB 2) summary for ${robSummary.length} papers:
${robSummary
  .map(
    (r) =>
      `  Paper ${r.paperId}: Overall = ${r.overallJudgment}, Domains: ${r.domains.map((d) => `${d.domain}=${d.judgment}`).join(", ")}`
  )
  .join("\n")}`
      : "No RoB 2 assessments available.";

  const prompt = `You are a systematic review methodologist applying the GRADE (Grading of Recommendations, Assessment, Development and Evaluation) framework.

Assess the certainty of evidence for the following outcome: "${outcome}"

## Available Evidence

### Meta-Analysis Results
${maContext}

### Risk of Bias Assessments
${robContext}

## GRADE Framework

Rate each of the 5 GRADE domains. For RCTs, start at "high" certainty and downgrade as needed:

1. **Risk of Bias**: Based on the RoB 2 assessments. Serious = most studies have "some concerns"; Very serious = most studies are "high risk".
2. **Inconsistency**: Based on heterogeneity (I², prediction intervals, subgroup differences). Serious if I² > 50% or significant Q-test; Very serious if I² > 75%.
3. **Indirectness**: Based on how well the PICO of included studies matches the review question. Assess population, intervention, comparator, and outcome directness.
4. **Imprecision**: Based on confidence interval width, optimal information size (OIS), and whether the CI crosses clinical decision thresholds. Serious if total participants < 300 for continuous or < 300 events for binary outcomes.
5. **Publication Bias**: Based on Egger's test results, funnel plot asymmetry, and number of studies. Serious if Egger's test p < 0.1 or fewer than 10 studies with asymmetry.

Overall certainty starts at HIGH for RCTs:
- Each "serious" concern downgrades by 1 level
- Each "very serious" concern downgrades by 2 levels
- Minimum is "very_low"

Provide thorough rationale for each domain and the overall assessment.`;

  const { object } = await generateObject({
    model: getModel(),
    schema: gradeAssessmentSchema,
    prompt,
  });

  const assessment: GRADEAssessment = {
    outcome,
    analysisId: relevantMA?.id ?? null,
    domains: object.domains,
    overallCertainty: object.overallCertainty,
    overallRationale: object.overallRationale,
    effectEstimate: object.effectEstimate,
    numberOfStudies: object.numberOfStudies,
    totalParticipants: object.totalParticipants,
    assessedAt: new Date().toISOString(),
  };

  // Persist to the metaAnalysisResults.studyData JSONB field
  if (relevantMA) {
    const existingData =
      (relevantMA.studyData as Record<string, unknown>) ?? {};
    const existingGrade =
      (existingData.gradeAssessments as GRADEAssessment[]) ?? [];

    // Replace existing assessment for same outcome or append
    const updatedGrade = existingGrade.filter(
      (g) => g.outcome !== outcome
    );
    updatedGrade.push(assessment);

    await db
      .update(metaAnalysisResults)
      .set({
        studyData: {
          ...existingData,
          gradeAssessments: updatedGrade,
        } as unknown as Record<string, unknown>,
      })
      .where(eq(metaAnalysisResults.id, relevantMA.id));
  } else {
    // No matching meta-analysis — store as a standalone GRADE record
    await db.insert(metaAnalysisResults).values({
      projectId,
      analysisName: `GRADE: ${outcome}`,
      outcomeMeasure: outcome,
      studyData: {
        gradeAssessments: [assessment],
      } as unknown as Record<string, unknown>,
    });
  }

  return assessment;
}

// ---------------------------------------------------------------------------
// Get all GRADE assessments for a project
// ---------------------------------------------------------------------------

export async function getGRADESummary(
  projectId: number
): Promise<GRADEAssessment[]> {
  const results = await db
    .select()
    .from(metaAnalysisResults)
    .where(eq(metaAnalysisResults.projectId, projectId));

  const assessments: GRADEAssessment[] = [];

  for (const row of results) {
    const data = row.studyData as Record<string, unknown> | null;
    if (data?.gradeAssessments) {
      const gradeList = data.gradeAssessments as GRADEAssessment[];
      assessments.push(...gradeList);
    }
  }

  return assessments;
}

// ---------------------------------------------------------------------------
// Export GRADE Summary of Findings table as CSV
// ---------------------------------------------------------------------------

export async function exportGRADETable(projectId: number): Promise<string> {
  const assessments = await getGRADESummary(projectId);

  if (assessments.length === 0) {
    return "No GRADE assessments to export.";
  }

  const headers = [
    "Outcome",
    "No. of Studies",
    "Total Participants",
    "Risk of Bias",
    "Inconsistency",
    "Indirectness",
    "Imprecision",
    "Publication Bias",
    "Overall Certainty",
    "Effect Estimate",
    "Rationale",
  ];

  const rows = assessments.map((a) => {
    const domainMap = new Map(a.domains.map((d) => [d.domain, d]));
    const getRating = (domain: GRADEDomain) => {
      const d = domainMap.get(domain);
      if (!d) return "—";
      if (d.rating === "no_concern") return "Not serious";
      if (d.rating === "serious") return "Serious";
      return "Very serious";
    };

    return [
      `"${a.outcome.replace(/"/g, '""')}"`,
      a.numberOfStudies.toString(),
      a.totalParticipants?.toString() ?? "—",
      getRating("risk_of_bias"),
      getRating("inconsistency"),
      getRating("indirectness"),
      getRating("imprecision"),
      getRating("publication_bias"),
      CERTAINTY_LABELS[a.overallCertainty],
      a.effectEstimate ? `"${a.effectEstimate.replace(/"/g, '""')}"` : "—",
      `"${a.overallRationale.replace(/"/g, '""')}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
