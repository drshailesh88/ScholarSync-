/**
 * Triple-Agent AI Screening Engine
 *
 * Replicates Scholara's multi-agent consensus model:
 * - 3 independent AI agents each evaluate every paper
 * - Majority vote decides include/exclude
 * - Disagreements flagged for human review
 * - Full audit trail for PRISMA compliance
 *
 * Deterministic hardening:
 * - temperature: 0 for reproducible outputs
 * - SHA-256 content hashing for per-agent cache keys
 * - Per-agent decision persistence in screening_agent_decisions
 * - Cache-aware batch screening (skips rate-limit delay on cache hits)
 */

import crypto from "crypto";
import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { getScreeningAgentPrompt } from "@/lib/ai/prompts/systematic-review";
import { db } from "@/lib/db";
import { screeningDecisions, projectPapers } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
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
  contentHash?: string;
  fromCache?: boolean;
}

export interface ConsensusResult {
  finalDecision: "include" | "exclude" | "conflict";
  agentDecisions: AgentDecision[];
  consensusConfidence: number;
  requiresHumanReview: boolean;
  reason: string;
  deterministic: boolean;
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
// Helpers
// ---------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Content hashing for deterministic cache keys
// ---------------------------------------------------------------------------

function computeContentHash(
  criteria: ScreeningCriterion[],
  title: string,
  abstract: string,
  agentIndex: number
): string {
  const sortedCriteria = [...criteria].sort((a, b) => a.id - b.id);
  const normalizedTitle = title.trim().toLowerCase();
  const normalizedAbstract = abstract.trim().toLowerCase();

  const payload = JSON.stringify({
    criteria: sortedCriteria,
    title: normalizedTitle,
    abstract: normalizedAbstract,
    agentIndex,
  });

  return crypto.createHash("sha256").update(payload).digest("hex");
}

// ---------------------------------------------------------------------------
// Per-agent decision cache (screening_agent_decisions table)
// ---------------------------------------------------------------------------

async function getCachedAgentDecision(
  projectId: number,
  paperId: number,
  agentIndex: number,
  contentHash: string
): Promise<AgentDecision | null> {
  try {
    const rows = await db.execute(sql`
      SELECT
        agent_index,
        decision,
        confidence,
        reasoning,
        matched_inclusion,
        matched_exclusion,
        content_hash
      FROM screening_agent_decisions
      WHERE project_id = ${projectId}
        AND paper_id = ${paperId}
        AND agent_index = ${agentIndex}
        AND content_hash = ${contentHash}
      LIMIT 1
    `);

    const row = (rows as unknown as { rows?: Record<string, unknown>[] }).rows?.[0] ?? (rows as unknown as Record<string, unknown>[])[0];
    if (!row) return null;

    return {
      agentIndex: row.agent_index as number,
      decision: row.decision as "include" | "exclude" | "uncertain",
      confidence: Number(row.confidence),
      reasoning: row.reasoning as string,
      matchedInclusion: (row.matched_inclusion ?? []) as number[],
      matchedExclusion: (row.matched_exclusion ?? []) as number[],
      contentHash: row.content_hash as string,
      fromCache: true,
    };
  } catch {
    // Table may not exist yet (pre-migration) — fall through to AI call
    return null;
  }
}

async function persistAgentDecision(
  projectId: number,
  paperId: number,
  decision: AgentDecision,
  contentHash: string
): Promise<void> {
  try {
    await db.execute(sql`
      INSERT INTO screening_agent_decisions (
        project_id,
        paper_id,
        agent_index,
        content_hash,
        decision,
        confidence,
        reasoning,
        matched_inclusion,
        matched_exclusion
      ) VALUES (
        ${projectId},
        ${paperId},
        ${decision.agentIndex},
        ${contentHash},
        ${decision.decision},
        ${decision.confidence},
        ${decision.reasoning},
        ${JSON.stringify(decision.matchedInclusion)}::jsonb,
        ${JSON.stringify(decision.matchedExclusion)}::jsonb
      )
      ON CONFLICT DO NOTHING
    `);
  } catch {
    // Table may not exist yet (pre-migration) — silently skip persistence
  }
}

// ---------------------------------------------------------------------------
// Run a single screening agent (with retry + exponential backoff)
// ---------------------------------------------------------------------------

async function runScreeningAgent(
  agentIndex: 0 | 1 | 2,
  criteria: ScreeningCriterion[],
  title: string,
  abstract: string,
  projectId?: number,
  paperId?: number
): Promise<AgentDecision> {
  const contentHash = computeContentHash(criteria, title, abstract, agentIndex);

  // Check cache first if we have project/paper context
  if (projectId != null && paperId != null) {
    const cached = await getCachedAgentDecision(
      projectId,
      paperId,
      agentIndex,
      contentHash
    );
    if (cached) return cached;
  }

  const formattedCriteria = formatCriteria(criteria);

  const prompt = getScreeningAgentPrompt(
    agentIndex,
    formattedCriteria,
    title,
    abstract
  );

  const maxRetries = 3;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const { object } = await generateObject({
        model: getSmallModel(),
        schema: agentDecisionSchema,
        prompt,
        temperature: 0,
      });

      const decision: AgentDecision = {
        agentIndex,
        decision: object.decision,
        confidence: Math.max(0, Math.min(1, object.confidence)),
        reasoning: object.reasoning,
        matchedInclusion: object.matched_inclusion,
        matchedExclusion: object.matched_exclusion,
        contentHash,
        fromCache: false,
      };

      // Persist the decision for future cache hits
      if (projectId != null && paperId != null) {
        await persistAgentDecision(projectId, paperId, decision, contentHash);
      }

      return decision;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        // Exponential backoff: 2s, 4s, 8s
        await sleep(2000 * Math.pow(2, attempt));
      }
    }
  }

  throw lastError;
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
      deterministic: true,
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
      deterministic: true,
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
      deterministic: true,
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
      deterministic: true,
    };
  }

  // No clear majority (e.g., 1 include, 1 exclude, 1 uncertain)
  return {
    finalDecision: "conflict",
    agentDecisions: decisions,
    consensusConfidence: avgConfidence * 0.5,
    requiresHumanReview: true,
    reason: `No consensus: ${includeCount} include, ${excludeCount} exclude, ${uncertainCount} uncertain — requires human review`,
    deterministic: true,
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
    runScreeningAgent(0, criteria, title, abstract, projectId, paperId),
    runScreeningAgent(1, criteria, title, abstract, projectId, paperId),
    runScreeningAgent(2, criteria, title, abstract, projectId, paperId),
  ]);

  const consensus = resolveConsensus([agent0, agent1, agent2]);

  // Persist the decision to screening_decisions table (audit trail)
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

    // Also update the project_papers row so progress tracking works
    await db
      .update(projectPapers)
      .set({
        screening_decision: consensus.finalDecision as "include" | "exclude",
        screening_reason: consensus.reason,
      })
      .where(
        and(
          eq(projectPapers.project_id, projectId),
          eq(projectPapers.paper_id, paperId)
        )
      );
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

  // Process 2 papers at a time (= 6 concurrent AI calls) with a pause
  // between batches to stay well under Anthropic's rate limits.
  const batchSize = 2;
  const delayBetweenBatchesMs = 1500;

  for (let i = 0; i < papers.length; i += batchSize) {
    const batch = papers.slice(i, i + batchSize);

    // Use allSettled so one failed paper doesn't kill the whole batch
    const settled = await Promise.allSettled(
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

    const batchResults: ConsensusResult[] = [];
    for (const result of settled) {
      if (result.status === "fulfilled") {
        batchResults.push(result.value);
        results.push(result.value);
      }
      // Failed papers are silently skipped — they remain unscreened
      // and can be retried on the next "AI Screen All" click.
    }

    onProgress?.(Math.min(i + batchSize, papers.length), papers.length);

    // Skip rate-limit delay when all results in this batch came from cache
    const allFromCache =
      batchResults.length > 0 &&
      batchResults.every((r) =>
        r.agentDecisions.every((d) => d.fromCache === true)
      );

    if (i + batchSize < papers.length && !allFromCache) {
      await sleep(delayBetweenBatchesMs);
    }
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

// ---------------------------------------------------------------------------
// Audit trail: retrieve per-agent decisions for a paper
// ---------------------------------------------------------------------------

export async function getAgentDecisions(
  projectId: number,
  paperId: number
): Promise<AgentDecision[]> {
  try {
    const rows = await db.execute(sql`
      SELECT
        agent_index,
        decision,
        confidence,
        reasoning,
        matched_inclusion,
        matched_exclusion,
        content_hash
      FROM screening_agent_decisions
      WHERE project_id = ${projectId}
        AND paper_id = ${paperId}
      ORDER BY agent_index ASC
    `);

    const resultRows = (rows as unknown as { rows?: Record<string, unknown>[] }).rows ?? (rows as unknown as Record<string, unknown>[]);
    return (resultRows as Record<string, unknown>[]).map((row) => ({
      agentIndex: row.agent_index as number,
      decision: row.decision as "include" | "exclude" | "uncertain",
      confidence: Number(row.confidence),
      reasoning: row.reasoning as string,
      matchedInclusion: (row.matched_inclusion ?? []) as number[],
      matchedExclusion: (row.matched_exclusion ?? []) as number[],
      contentHash: row.content_hash as string,
      fromCache: true,
    }));
  } catch {
    // Table may not exist yet (pre-migration)
    return [];
  }
}

// ---------------------------------------------------------------------------
// Cache invalidation: remove all cached agent decisions for a project
// ---------------------------------------------------------------------------

export async function invalidateScreeningCache(
  projectId: number
): Promise<void> {
  try {
    await db.execute(sql`
      DELETE FROM screening_agent_decisions
      WHERE project_id = ${projectId}
    `);
  } catch {
    // Table may not exist yet (pre-migration)
  }
}
