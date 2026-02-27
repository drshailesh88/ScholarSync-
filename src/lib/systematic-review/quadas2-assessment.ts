/**
 * QUADAS-2 Assessment Engine
 *
 * Implements the QUADAS-2 (Quality Assessment of Diagnostic Accuracy Studies)
 * tool for evaluating primary diagnostic test accuracy studies:
 * - 4 domains, each with Risk of Bias AND Applicability Concern
 * - Exception: "Flow and Timing" domain has no applicability concern
 * - Signaling questions guide each domain judgment
 * - AI-powered assessment against paper text
 * - Stores results in the existing risk_of_bias table using "quadas2_" prefix
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { riskOfBias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Domain definitions
// ---------------------------------------------------------------------------

export const QUADAS2_DOMAINS = [
  {
    domain: "patient_selection",
    name: "Patient Selection",
    hasApplicability: true,
    signalingQuestions: [
      "Was a consecutive or random sample of patients enrolled?",
      "Was a case-control design avoided?",
      "Did the study avoid inappropriate exclusions?",
    ],
    applicabilityQuestion:
      "Are there concerns that the included patients and setting do not match the review question?",
  },
  {
    domain: "index_test",
    name: "Index Test",
    hasApplicability: true,
    signalingQuestions: [
      "Were the index test results interpreted without knowledge of the results of the reference standard?",
      "If a threshold was used, was it pre-specified?",
    ],
    applicabilityQuestion:
      "Are there concerns that the index test, its conduct, or interpretation differ from the review question?",
  },
  {
    domain: "reference_standard",
    name: "Reference Standard",
    hasApplicability: true,
    signalingQuestions: [
      "Is the reference standard likely to correctly classify the target condition?",
      "Were the reference standard results interpreted without knowledge of the results of the index test?",
    ],
    applicabilityQuestion:
      "Are there concerns that the target condition as defined by the reference standard does not match the question?",
  },
  {
    domain: "flow_timing",
    name: "Flow and Timing",
    hasApplicability: false,
    signalingQuestions: [
      "Was there an appropriate interval between the index test and reference standard?",
      "Did all patients receive the same reference standard?",
      "Were all patients included in the analysis?",
    ],
    applicabilityQuestion: null, // Flow and Timing has no applicability concern
  },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type QUADAS2Judgment = "Low" | "High" | "Unclear";

export interface QUADAS2SignalingQuestion {
  question: string;
  answer: "Yes" | "No" | "Unclear";
}

export interface QUADAS2DomainAssessment {
  domain: string;
  domainName: string;
  riskOfBias: QUADAS2Judgment;
  applicabilityConcern: QUADAS2Judgment | null; // null for Flow & Timing
  signalingQuestions: QUADAS2SignalingQuestion[];
  rationale: string;
}

export interface FullQUADAS2Assessment {
  paperId: number;
  projectId: number;
  domains: QUADAS2DomainAssessment[];
  overallRoB: QUADAS2Judgment;
  overallApplicability: QUADAS2Judgment;
}

// ---------------------------------------------------------------------------
// Zod schema for AI output
// ---------------------------------------------------------------------------

const quadas2DomainSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["Yes", "No", "Unclear"]),
    })
  ),
  riskOfBias: z.enum(["Low", "High", "Unclear"]),
  applicabilityConcern: z.enum(["Low", "High", "Unclear"]).nullable(),
  rationale: z.string(),
});

// ---------------------------------------------------------------------------
// Map QUADAS-2 judgments to the existing DB enum values
// ---------------------------------------------------------------------------

function toDbJudgment(
  judgment: QUADAS2Judgment
): "low" | "some_concerns" | "high" {
  if (judgment === "Low") return "low";
  if (judgment === "High") return "high";
  return "some_concerns"; // "Unclear" maps to "some_concerns" in the existing enum
}

// ---------------------------------------------------------------------------
// Assess a single QUADAS-2 domain
// ---------------------------------------------------------------------------

async function assessDomain(
  title: string,
  textContent: string,
  domainDef: (typeof QUADAS2_DOMAINS)[number]
): Promise<QUADAS2DomainAssessment> {
  const questionsFormatted = domainDef.signalingQuestions
    .map((q, i) => `  ${i + 1}. ${q}`)
    .join("\n");

  const applicabilitySection = domainDef.hasApplicability
    ? `\nAPPLICABILITY CONCERN QUESTION:\n  ${domainDef.applicabilityQuestion}\n`
    : "\nNote: This domain (Flow and Timing) does NOT have an applicability concern. Set applicabilityConcern to null.\n";

  const prompt = `You are an expert in appraising diagnostic accuracy studies using the QUADAS-2 tool (Whiting et al., BMJ 2011).

PAPER:
Title: ${title}

Relevant text:
${textContent.slice(0, 12000)}

DOMAIN: ${domainDef.name}

SIGNALING QUESTIONS (to guide Risk of Bias judgment):
${questionsFormatted}
${applicabilitySection}
For each signaling question, provide:
- "answer": "Yes" | "No" | "Unclear"

Then provide:
- "riskOfBias": "Low" | "High" | "Unclear"
  * Low: all or most signaling questions are answered "Yes"
  * High: one or more signaling questions answered "No"
  * Unclear: insufficient information to judge
- "applicabilityConcern": "Low" | "High" | "Unclear" (or null if Flow and Timing domain)
  * Low: study matches the review question
  * High: important differences exist between study and review question
  * Unclear: insufficient information to judge applicability
- "rationale": 2-3 sentence explanation citing evidence from the text

Respond as a JSON object with:
{
  "domain": "${domainDef.domain}",
  "domainName": "${domainDef.name}",
  "signalingQuestions": [
    { "question": "...", "answer": "Yes" | "No" | "Unclear" }
  ],
  "riskOfBias": "Low" | "High" | "Unclear",
  "applicabilityConcern": "Low" | "High" | "Unclear" | null,
  "rationale": "..."
}`;

  const { object } = await generateObject({
    model: getModel(),
    schema: quadas2DomainSchema,
    prompt,
  });

  return object as QUADAS2DomainAssessment;
}

// ---------------------------------------------------------------------------
// Compute overall judgments from domain results
// ---------------------------------------------------------------------------

function computeOverallJudgments(domains: QUADAS2DomainAssessment[]): {
  overallRoB: QUADAS2Judgment;
  overallApplicability: QUADAS2Judgment;
} {
  const robJudgments = domains.map((d) => d.riskOfBias);

  // Per QUADAS-2 guidance:
  // - "High" if any domain is "High"
  // - "Unclear" if any domain is "Unclear" (and none "High")
  // - "Low" only if all domains are "Low"
  let overallRoB: QUADAS2Judgment = "Low";
  if (robJudgments.includes("High")) {
    overallRoB = "High";
  } else if (robJudgments.includes("Unclear")) {
    overallRoB = "Unclear";
  }

  // Only 3 domains have applicability concerns (not Flow & Timing)
  const applicabilityJudgments = domains
    .filter((d) => d.applicabilityConcern !== null)
    .map((d) => d.applicabilityConcern as QUADAS2Judgment);

  let overallApplicability: QUADAS2Judgment = "Low";
  if (applicabilityJudgments.includes("High")) {
    overallApplicability = "High";
  } else if (applicabilityJudgments.includes("Unclear")) {
    overallApplicability = "Unclear";
  }

  return { overallRoB, overallApplicability };
}

// ---------------------------------------------------------------------------
// Run full QUADAS-2 assessment for a paper
// ---------------------------------------------------------------------------

export async function assessQUADAS2(
  paperId: number,
  projectId: number,
  title: string,
  textContent: string
): Promise<FullQUADAS2Assessment> {
  // Assess all 4 domains sequentially to manage rate limits
  const domainResults: QUADAS2DomainAssessment[] = [];

  for (const domainDef of QUADAS2_DOMAINS) {
    const result = await assessDomain(title, textContent, domainDef);
    domainResults.push(result);
  }

  const { overallRoB, overallApplicability } =
    computeOverallJudgments(domainResults);

  // Persist to the existing risk_of_bias table using "quadas2_" prefixed domain names.
  // Two rows per domain (except Flow & Timing which has no applicability):
  //   - "quadas2_<domain>_rob"  → risk of bias judgment
  //   - "quadas2_<domain>_app"  → applicability concern judgment
  for (const domain of domainResults) {
    const robDomainKey = `quadas2_${domain.domain}_rob`;
    const robJudgment = toDbJudgment(domain.riskOfBias);

    await db
      .insert(riskOfBias)
      .values({
        paperId,
        projectId,
        domain: robDomainKey,
        judgment: robJudgment,
        supportText: domain.rationale,
        assessedBy: "ai",
      })
      .onConflictDoUpdate({
        target: [riskOfBias.paperId, riskOfBias.projectId, riskOfBias.domain],
        set: {
          judgment: robJudgment,
          supportText: domain.rationale,
          assessedBy: "ai",
        },
      });

    // Only store applicability if the domain supports it
    if (domain.applicabilityConcern !== null) {
      const appDomainKey = `quadas2_${domain.domain}_app`;
      const appJudgment = toDbJudgment(domain.applicabilityConcern);

      await db
        .insert(riskOfBias)
        .values({
          paperId,
          projectId,
          domain: appDomainKey,
          judgment: appJudgment,
          supportText: `Applicability: ${domain.rationale}`,
          assessedBy: "ai",
        })
        .onConflictDoUpdate({
          target: [
            riskOfBias.paperId,
            riskOfBias.projectId,
            riskOfBias.domain,
          ],
          set: {
            judgment: appJudgment,
            supportText: `Applicability: ${domain.rationale}`,
            assessedBy: "ai",
          },
        });
    }
  }

  return {
    paperId,
    projectId,
    domains: domainResults,
    overallRoB,
    overallApplicability,
  };
}

// ---------------------------------------------------------------------------
// Get stored QUADAS-2 results for a project
// ---------------------------------------------------------------------------

export async function getProjectQUADAS2Summary(projectId: number) {
  // Fetch all rows with quadas2_ prefix for this project
  const rows = await db
    .select()
    .from(riskOfBias)
    .where(eq(riskOfBias.projectId, projectId));

  const quadas2Rows = rows.filter((r) => r.domain.startsWith("quadas2_"));

  // Group by paperId
  const byPaper = new Map<number, typeof quadas2Rows>();
  for (const r of quadas2Rows) {
    const existing = byPaper.get(r.paperId) ?? [];
    existing.push(r);
    byPaper.set(r.paperId, existing);
  }

  return Array.from(byPaper.entries()).map(([paperId, domainRows]) => {
    // Reconstruct per-domain summary from rows
    const domainSummary = QUADAS2_DOMAINS.map((def) => {
      const robKey = `quadas2_${def.domain}_rob`;
      const appKey = `quadas2_${def.domain}_app`;

      const robRow = domainRows.find((r) => r.domain === robKey);
      const appRow = domainRows.find((r) => r.domain === appKey);

      return {
        domain: def.domain,
        domainName: def.name,
        hasApplicability: def.hasApplicability,
        riskOfBias: robRow?.judgment ?? null,
        applicabilityConcern: appRow?.judgment ?? null,
        rationale: robRow?.supportText ?? null,
      };
    });

    // Overall RoB
    const robJudgments = domainSummary.map((d) => d.riskOfBias);
    let overallRoB: "low" | "some_concerns" | "high" = "low";
    if (robJudgments.includes("high")) overallRoB = "high";
    else if (robJudgments.includes("some_concerns")) overallRoB = "some_concerns";

    // Overall applicability (only domains that have it)
    const appJudgments = domainSummary
      .filter((d) => d.hasApplicability)
      .map((d) => d.applicabilityConcern);
    let overallApplicability: "low" | "some_concerns" | "high" = "low";
    if (appJudgments.includes("high")) overallApplicability = "high";
    else if (appJudgments.includes("some_concerns"))
      overallApplicability = "some_concerns";

    return {
      paperId,
      domains: domainSummary,
      overallRoB,
      overallApplicability,
    };
  });
}
