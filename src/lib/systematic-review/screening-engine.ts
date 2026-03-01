/**
 * Triple-Agent AI Screening Engine
 *
 * Replicates Scholara's multi-agent consensus model:
 * - 3 independent AI agents each evaluate every paper
 * - Majority vote decides include/exclude
 * - Disagreements flagged for human review
 * - Full audit trail for PRISMA compliance
 */

import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { getScreeningAgentPrompt } from "@/lib/ai/prompts/systematic-review";
import { db } from "@/lib/db";
import { screeningDecisions } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScreeningCriterion {
  id: number;
  type: "inclusion" | "exclusion";
  description: string;
  category?: string;
}

export interface AgentDecision {
  agentIndex: number;
  decision: "include" | "exclude" | "uncertain";
  confidence: number;
  reasoning: string;
  matchedInclusion: number[];
  matchedExclusion: number[];
}

export interface ConsensusResult {
  finalDecision: "include" | "exclude" | "conflict";
  agentDecisions: AgentDecision[];
  consensusConfidence: number;
  requiresHumanReview: boolean;
  reason: string;
}

// ---------------------------------------------------------------------------
// Schema for agent output
// ---------------------------------------------------------------------------

const agentDecisionSchema = z.object({
  decision: z.enum(["include", "exclude", "uncertain"]),
  confidence: z.number().describe("Confidence score between 0 and 1"),
  reasoning: z.string(),
  matched_inclusion: z.array(z.number()),
  matched_exclusion: z.array(z.number()),
});

// ---------------------------------------------------------------------------
// Format criteria for prompt injection
// ---------------------------------------------------------------------------

function formatCriteria(criteria: ScreeningCriterion[]): string {
  const inclusion = criteria
    .filter((c) => c.type === "inclusion")
    .map((c) => `  [ID:${c.id}] ${c.description}`)
    .join("\n");

  const exclusion = criteria
    .filter((c) => c.type === "exclusion")
    .map((c) => `  [ID:${c.id}] ${c.description}`)
    .join("\n");

  return `INCLUSION CRITERIA:\n${inclusion}\n\nEXCLUSION CRITERIA:\n${exclusion}`;
}

// ---------------------------------------------------------------------------
// Run a single screening agent
// ---------------------------------------------------------------------------

async function runScreeningAgent(
  agentIndex: 0 | 1 | 2,
  criteria: ScreeningCriterion[],
  title: string,
  abstract: string
): Promise<AgentDecision> {
  const formattedCriteria = formatCriteria(criteria);

  const prompt = getScreeningAgentPrompt(
    agentIndex,
    formattedCriteria,
    title,
    abstract
  );

  const { object } = await generateObject({
    model: getSmallModel(),
    schema: agentDecisionSchema,
    prompt,
  });

  return {
    agentIndex,
    decision: object.decision,
    confidence: Math.max(0, Math.min(1, object.confidence)),
    reasoning: object.reasoning,
    matchedInclusion: object.matched_inclusion,
    matchedExclusion: object.matched_exclusion,
  };
}

// ---------------------------------------------------------------------------
// Resolve consensus from 3 agent decisions
// ---------------------------------------------------------------------------

function resolveConsensus(decisions: AgentDecision[]): ConsensusResult {
  const votes = decisions.map((d) => d.decision);
  const includeCount = votes.filter((v) => v === "include").length;
  const excludeCount = votes.filter((v) => v === "exclude").length;
  const uncertainCount = votes.filter((v) => v === "uncertain").length;

  const avgConfidence =
    decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length;

  // Unanimous include
  if (includeCount === 3) {
    return {
      finalDecision: "include",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence,
      requiresHumanReview: false,
      reason: "All 3 agents voted to include",
    };
  }

  // Unanimous exclude
  if (excludeCount === 3) {
    return {
      finalDecision: "exclude",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence,
      requiresHumanReview: false,
      reason: "All 3 agents voted to exclude",
    };
  }

  // Majority include (2/3)
  if (includeCount >= 2) {
    return {
      finalDecision: "include",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence * 0.85, // slightly lower for non-unanimous
      requiresHumanReview: false,
      reason: `${includeCount}/3 agents voted to include (majority consensus)`,
    };
  }

  // Majority exclude (2/3)
  if (excludeCount >= 2) {
    return {
      finalDecision: "exclude",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence * 0.85,
      requiresHumanReview: false,
      reason: `${excludeCount}/3 agents voted to exclude (majority consensus)`,
    };
  }

  // No clear majority (e.g., 1 include, 1 exclude, 1 uncertain)
  return {
    finalDecision: "conflict",
    agentDecisions: decisions,
    consensusConfidence: avgConfidence * 0.5,
    requiresHumanReview: true,
    reason: `No consensus: ${includeCount} include, ${excludeCount} exclude, ${uncertainCount} uncertain — requires human review`,
  };
}

// ---------------------------------------------------------------------------
// Screen a single paper with triple-agent consensus
// ---------------------------------------------------------------------------

export async function screenPaper(
  projectId: number,
  paperId: number,
  title: string,
  abstract: string,
  criteria: ScreeningCriterion[]
): Promise<ConsensusResult> {
  // Run all 3 agents in parallel
  const [agent0, agent1, agent2] = await Promise.all([
    runScreeningAgent(0, criteria, title, abstract),
    runScreeningAgent(1, criteria, title, abstract),
    runScreeningAgent(2, criteria, title, abstract),
  ]);

  const consensus = resolveConsensus([agent0, agent1, agent2]);

  // Persist the decision
  if (consensus.finalDecision !== "conflict") {
    await db
      .insert(screeningDecisions)
      .values({
        projectId,
        paperId,
        stage: "title_abstract",
        decision: consensus.finalDecision as "include" | "exclude",
        reason: consensus.reason,
        decidedBy: "ai",
        reviewerId: null, // AI decisions have null reviewerId
      })
      .onConflictDoUpdate({
        target: [
          screeningDecisions.projectId,
          screeningDecisions.paperId,
          screeningDecisions.stage,
          screeningDecisions.reviewerId,
        ],
        set: {
          decision: consensus.finalDecision as "include" | "exclude",
          reason: consensus.reason,
          decidedBy: "ai",
        },
      });
  }

  return consensus;
}

// ---------------------------------------------------------------------------
// Batch screen multiple papers
// ---------------------------------------------------------------------------

export async function batchScreenPapers(
  projectId: number,
  papers: Array<{
    paperId: number;
    title: string;
    abstract: string;
  }>,
  criteria: ScreeningCriterion[],
  onProgress?: (completed: number, total: number) => void
): Promise<ConsensusResult[]> {
  const results: ConsensusResult[] = [];

  // Process in batches of 5 to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < papers.length; i += batchSize) {
    const batch = papers.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map((paper) =>
        screenPaper(
          projectId,
          paper.paperId,
          paper.title,
          paper.abstract,
          criteria
        )
      )
    );

    results.push(...batchResults);
    onProgress?.(Math.min(i + batchSize, papers.length), papers.length);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Get screening summary for a project
// ---------------------------------------------------------------------------

export async function getScreeningSummary(projectId: number) {
  const decisions = await db
    .select({
      stage: screeningDecisions.stage,
      decision: screeningDecisions.decision,
      count: sql<number>`count(*)::int`,
    })
    .from(screeningDecisions)
    .where(eq(screeningDecisions.projectId, projectId))
    .groupBy(screeningDecisions.stage, screeningDecisions.decision);

  const summary = {
    titleAbstract: { include: 0, exclude: 0, maybe: 0 },
    fullText: { include: 0, exclude: 0, maybe: 0 },
  };

  for (const row of decisions) {
    const stage =
      row.stage === "title_abstract" ? "titleAbstract" : "fullText";
    const decision = row.decision as "include" | "exclude" | "maybe";
    summary[stage][decision] = row.count;
  }

  return summary;
}
