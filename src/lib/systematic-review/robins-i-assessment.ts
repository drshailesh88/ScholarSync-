/**
 * ROBINS-I (Risk of Bias in Non-randomized Studies of Interventions) Assessment Engine
 *
 * Automates the Cochrane ROBINS-I tool for observational and non-randomized studies:
 * - Evaluates 7 domains with signaling questions
 * - AI answers each question with supporting text from the paper
 * - Generates per-domain and overall Low / Moderate / Serious / Critical judgments
 * - Stores results in the existing risk_of_bias table using prefixed domain keys
 *   (e.g., "robins_i_confounding") to avoid conflicts with RoB 2 domain names
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import {
  getROBINSIAssessmentPrompt,
  ROBINS_I_DOMAINS,
} from "@/lib/ai/prompts/systematic-review";
import { db } from "@/lib/db";
import { riskOfBias } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Public domain constant (re-export for component use)
// ---------------------------------------------------------------------------

export { ROBINS_I_DOMAINS };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ROBINSIJudgment =
  | "Low"
  | "Moderate"
  | "Serious"
  | "Critical"
  | "No information";

export interface ROBINSISignalingQuestion {
  question: string;
  answer: "Yes" | "Probably yes" | "Probably no" | "No" | "No information";
  support: string;
}

export interface ROBINSIDomainAssessment {
  domain: string;
  domainName: string;
  signalingQuestions: ROBINSISignalingQuestion[];
  judgment: ROBINSIJudgment;
  rationale: string;
}

export interface FullROBINSIAssessment {
  paperId: number;
  projectId: number;
  domains: ROBINSIDomainAssessment[];
  overallJudgment: ROBINSIJudgment;
  overallRationale: string;
}

// ---------------------------------------------------------------------------
// Schema for AI output
// ---------------------------------------------------------------------------

const robinsIDomainSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum([
        "Yes",
        "Probably yes",
        "Probably no",
        "No",
        "No information",
      ]),
      support: z.string(),
    })
  ),
  judgment: z.enum([
    "Low",
    "Moderate",
    "Serious",
    "Critical",
    "No information",
  ]),
  rationale: z.string(),
});

// ---------------------------------------------------------------------------
// Encoding helpers — store raw ROBINS-I judgment inside supportText
//
// The existing risk_of_bias.judgment column is a PG enum with only
// low | some_concerns | high. Rather than changing the schema, we encode
// the full ROBINS-I judgment string as a prefix in supportText:
//   "ROBINS_I:<judgment>\n<rationale>"
// The summary reader decodes this to recover the original judgment.
// ---------------------------------------------------------------------------

const ROBINS_I_PREFIX = "ROBINS_I:";

function encodeSupport(judgment: ROBINSIJudgment, rationale: string): string {
  return `${ROBINS_I_PREFIX}${judgment}\n${rationale}`;
}

function decodeSupport(supportText: string | null): {
  judgment: ROBINSIJudgment;
  rationale: string;
} | null {
  if (!supportText || !supportText.startsWith(ROBINS_I_PREFIX)) return null;
  const withoutPrefix = supportText.slice(ROBINS_I_PREFIX.length);
  const newlineIdx = withoutPrefix.indexOf("\n");
  if (newlineIdx === -1) {
    return { judgment: withoutPrefix as ROBINSIJudgment, rationale: "" };
  }
  return {
    judgment: withoutPrefix.slice(0, newlineIdx) as ROBINSIJudgment,
    rationale: withoutPrefix.slice(newlineIdx + 1),
  };
}

// Map ROBINS-I judgment → closest existing DB enum value
// (used only for the pg enum column; real judgment lives in supportText)
function toDbJudgment(j: ROBINSIJudgment): "low" | "some_concerns" | "high" {
  switch (j) {
    case "Low":
      return "low";
    case "Moderate":
      return "some_concerns";
    case "Serious":
    case "Critical":
    case "No information":
      return "high";
  }
}

// ---------------------------------------------------------------------------
// Assess a single ROBINS-I domain via AI
// ---------------------------------------------------------------------------

async function assessROBINSIDomain(
  title: string,
  textContent: string,
  domain: (typeof ROBINS_I_DOMAINS)[number]
): Promise<ROBINSIDomainAssessment> {
  const prompt = getROBINSIAssessmentPrompt(title, textContent, domain);

  const { object } = await generateObject({
    model: getModel(),
    schema: robinsIDomainSchema,
    prompt,
  });

  return object;
}

// ---------------------------------------------------------------------------
// Compute overall ROBINS-I judgment
//
// Algorithm (per ROBINS-I guidance):
//  - Critical if any domain is Critical
//  - Serious   if any domain is Serious (and none Critical)
//  - Moderate  if any domain is Moderate (and none Serious/Critical)
//  - Low       only if all domains are Low or No information
// ---------------------------------------------------------------------------

export function computeOverallROBINSIJudgment(
  domains: ROBINSIDomainAssessment[]
): { judgment: ROBINSIJudgment; rationale: string } {
  const judgments = domains.map((d) => d.judgment);

  if (judgments.includes("Critical")) {
    const criticalDomains = domains
      .filter((d) => d.judgment === "Critical")
      .map((d) => d.domainName);
    return {
      judgment: "Critical",
      rationale: `Critical risk of bias due to fundamental flaws in: ${criticalDomains.join(", ")}`,
    };
  }

  if (judgments.includes("Serious")) {
    const seriousDomains = domains
      .filter((d) => d.judgment === "Serious")
      .map((d) => d.domainName);
    return {
      judgment: "Serious",
      rationale: `Serious risk of bias with important problems in: ${seriousDomains.join(", ")}`,
    };
  }

  if (judgments.includes("Moderate")) {
    const moderateDomains = domains
      .filter((d) => d.judgment === "Moderate")
      .map((d) => d.domainName);
    return {
      judgment: "Moderate",
      rationale: `Moderate risk of bias present in: ${moderateDomains.join(", ")}`,
    };
  }

  return {
    judgment: "Low",
    rationale:
      "Low risk of bias across all domains — study is comparable to a well-performed randomised trial",
  };
}

// ---------------------------------------------------------------------------
// Run full ROBINS-I assessment for a paper (all 7 domains)
// ---------------------------------------------------------------------------

export async function assessROBINSI(
  paperId: number,
  projectId: number,
  title: string,
  textContent: string
): Promise<FullROBINSIAssessment> {
  const domainResults: ROBINSIDomainAssessment[] = [];

  // Assess all 7 domains sequentially to manage rate limits
  for (const domain of ROBINS_I_DOMAINS) {
    const result = await assessROBINSIDomain(title, textContent, domain);
    domainResults.push(result);
  }

  const overall = computeOverallROBINSIJudgment(domainResults);

  // Persist to the existing risk_of_bias table
  // Domain keys are prefixed "robins_i_*" so they never collide with RoB 2's D1-D5
  for (const domain of domainResults) {
    await db
      .insert(riskOfBias)
      .values({
        paperId,
        projectId,
        domain: domain.domain, // e.g., "robins_i_confounding"
        judgment: toDbJudgment(domain.judgment),
        supportText: encodeSupport(domain.judgment, domain.rationale),
        assessedBy: "ai",
      })
      .onConflictDoUpdate({
        target: [riskOfBias.paperId, riskOfBias.projectId, riskOfBias.domain],
        set: {
          judgment: toDbJudgment(domain.judgment),
          supportText: encodeSupport(domain.judgment, domain.rationale),
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
// Get stored ROBINS-I results for a project
// ---------------------------------------------------------------------------

export async function getProjectROBINSISummary(projectId: number) {
  // Fetch only ROBINS-I rows (domain starts with "robins_i_")
  const results = await db
    .select()
    .from(riskOfBias)
    .where(
      // Filter to ROBINS-I rows: domain names all start with "robins_i_"
      eq(riskOfBias.projectId, projectId)
    );

  const robinsRows = results.filter((r) => r.domain.startsWith("robins_i_"));

  // Group by paper
  const byPaper = new Map<number, typeof robinsRows>();
  for (const r of robinsRows) {
    const existing = byPaper.get(r.paperId) || [];
    existing.push(r);
    byPaper.set(r.paperId, existing);
  }

  return Array.from(byPaper.entries()).map(([paperId, domains]) => {
    // Decode the real ROBINS-I judgments from supportText
    const decodedDomains = domains.map((d) => {
      const decoded = decodeSupport(d.supportText);
      return {
        domain: d.domain,
        judgment: decoded?.judgment ?? ("No information" as ROBINSIJudgment),
        rationale: decoded?.rationale ?? d.supportText ?? "",
      };
    });

    // Compute overall from decoded judgments
    const overallResult = computeOverallROBINSIJudgment(
      decodedDomains.map((d) => ({
        domain: d.domain,
        domainName: d.domain,
        signalingQuestions: [],
        judgment: d.judgment,
        rationale: d.rationale,
      }))
    );

    return {
      paperId,
      domains: decodedDomains,
      overallJudgment: overallResult.judgment,
    };
  });
}
