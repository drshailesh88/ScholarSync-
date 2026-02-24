/**
 * RoB 2 (Risk of Bias) Assessment Engine
 *
 * Automates the Cochrane RoB 2 tool for randomized trials:
 * - Evaluates 5 domains with signaling questions
 * - AI answers each question with supporting text
 * - Generates per-domain and overall judgments
 * - Links every answer to source text for transparency
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { getRoB2AssessmentPrompt, ROB2_DOMAINS } from "@/lib/ai/prompts/systematic-review";
import { db } from "@/lib/db";
import { riskOfBias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SignalingQuestionResult {
  question: string;
  answer: "Yes" | "Probably yes" | "Probably no" | "No" | "No information";
  support: string;
}

export interface DomainAssessment {
  domain: string;
  domainName: string;
  signalingQuestions: SignalingQuestionResult[];
  judgment: "Low" | "Some concerns" | "High";
  rationale: string;
}

export interface FullRoB2Assessment {
  paperId: number;
  projectId: number;
  domains: DomainAssessment[];
  overallJudgment: "Low" | "Some concerns" | "High";
  overallRationale: string;
}

// ---------------------------------------------------------------------------
// Schema for AI output
// ---------------------------------------------------------------------------

const domainAssessmentSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["Yes", "Probably yes", "Probably no", "No", "No information"]),
      support: z.string(),
    })
  ),
  judgment: z.enum(["Low", "Some concerns", "High"]),
  rationale: z.string(),
});

// ---------------------------------------------------------------------------
// Assess a single RoB 2 domain
// ---------------------------------------------------------------------------

async function assessDomain(
  title: string,
  textContent: string,
  domain: (typeof ROB2_DOMAINS)[number]
): Promise<DomainAssessment> {
  const prompt = getRoB2AssessmentPrompt(title, textContent, domain);

  const { object } = await generateObject({
    model: getModel(),
    schema: domainAssessmentSchema,
    prompt,
  });

  return object;
}

// ---------------------------------------------------------------------------
// Compute overall RoB 2 judgment from domain judgments
// ---------------------------------------------------------------------------

function computeOverallJudgment(
  domains: DomainAssessment[]
): { judgment: "Low" | "Some concerns" | "High"; rationale: string } {
  const judgments = domains.map((d) => d.judgment);

  // Per RoB 2 algorithm:
  // - "High" if any domain is "High"
  // - "Some concerns" if any domain is "Some concerns" (and none "High")
  // - "Low" only if all domains are "Low"

  if (judgments.includes("High")) {
    const highDomains = domains
      .filter((d) => d.judgment === "High")
      .map((d) => d.domainName);
    return {
      judgment: "High",
      rationale: `High risk of bias due to concerns in: ${highDomains.join(", ")}`,
    };
  }

  if (judgments.includes("Some concerns")) {
    const concernDomains = domains
      .filter((d) => d.judgment === "Some concerns")
      .map((d) => d.domainName);
    return {
      judgment: "Some concerns",
      rationale: `Some concerns about bias in: ${concernDomains.join(", ")}`,
    };
  }

  return {
    judgment: "Low",
    rationale: "Low risk of bias across all domains",
  };
}

// ---------------------------------------------------------------------------
// Run full RoB 2 assessment for a paper
// ---------------------------------------------------------------------------

export async function assessRiskOfBias(
  paperId: number,
  projectId: number,
  title: string,
  textContent: string
): Promise<FullRoB2Assessment> {
  // Assess all 5 domains (sequentially to manage rate limits)
  const domainResults: DomainAssessment[] = [];

  for (const domain of ROB2_DOMAINS) {
    const result = await assessDomain(title, textContent, domain);
    domainResults.push(result);
  }

  const overall = computeOverallJudgment(domainResults);

  // Persist to database
  const judgmentMap: Record<string, "low" | "some_concerns" | "high"> = {
    Low: "low",
    "Some concerns": "some_concerns",
    High: "high",
  };

  for (const domain of domainResults) {
    await db
      .insert(riskOfBias)
      .values({
        paperId,
        projectId,
        domain: domain.domain,
        judgment: judgmentMap[domain.judgment],
        supportText: domain.rationale,
        assessedBy: "ai",
      })
      .onConflictDoUpdate({
        target: [
          riskOfBias.paperId,
          riskOfBias.projectId,
          riskOfBias.domain,
        ],
        set: {
          judgment: judgmentMap[domain.judgment],
          supportText: domain.rationale,
          assessedBy: "ai",
        },
      });
  }

  return {
    paperId,
    projectId,
    domains: domainResults,
    overallJudgment: overall.judgment,
    overallRationale: overall.rationale,
  };
}

// ---------------------------------------------------------------------------
// Get stored RoB 2 results for a project
// ---------------------------------------------------------------------------

export async function getProjectRoB2Summary(projectId: number) {
  const results = await db
    .select()
    .from(riskOfBias)
    .where(eq(riskOfBias.projectId, projectId));

  // Group by paper
  const byPaper = new Map<number, typeof results>();
  for (const r of results) {
    const existing = byPaper.get(r.paperId) || [];
    existing.push(r);
    byPaper.set(r.paperId, existing);
  }

  return Array.from(byPaper.entries()).map(([paperId, domains]) => {
    const judgments = domains.map((d) => d.judgment);
    let overall: "low" | "some_concerns" | "high" = "low";
    if (judgments.includes("high")) overall = "high";
    else if (judgments.includes("some_concerns")) overall = "some_concerns";

    return {
      paperId,
      domains: domains.map((d) => ({
        domain: d.domain,
        judgment: d.judgment,
        supportText: d.supportText,
      })),
      overallJudgment: overall,
    };
  });
}
