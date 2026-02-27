/**
 * Active Learning Priority Engine for Screening
 *
 * Uses embedding-based similarity + uncertainty sampling to prioritize
 * which papers a reviewer should screen next. Papers near the decision
 * boundary (most uncertain) or most similar to already-included papers
 * get highest priority.
 */

import { db } from "@/lib/db";
import { papers, projectPapers, paperChunks, screeningDecisions } from "@/lib/db/schema";
import { eq, and, isNull, isNotNull, sql, inArray } from "drizzle-orm";
import { generateEmbedding } from "@/lib/ai/embeddings";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PriorityScore {
  paperId: number;
  score: number; // 0–1, higher = screen first
  reason: string;
}

// ---------------------------------------------------------------------------
// Compute screening priority for all unscreened papers in a project
// ---------------------------------------------------------------------------

export async function computeScreeningPriority(
  projectId: number
): Promise<PriorityScore[]> {
  // 1. Get all project papers with their screening status
  const allPapers = await db
    .select({
      paperId: projectPapers.paper_id,
      title: papers.title,
      abstract: papers.abstract,
      screeningDecision: projectPapers.screening_decision,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));

  const screenedPaperIds = new Set<number>();
  const includedPaperIds: number[] = [];
  const excludedPaperIds: number[] = [];
  const unscreenedPapers: Array<{
    paperId: number;
    title: string;
    abstract: string | null;
  }> = [];

  // Also check screening_decisions table for AI decisions
  const decisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      decision: screeningDecisions.decision,
    })
    .from(screeningDecisions)
    .where(eq(screeningDecisions.projectId, projectId));

  const decisionMap = new Map<number, string>();
  for (const d of decisions) {
    if (d.decision) decisionMap.set(d.paperId, d.decision);
  }

  for (const p of allPapers) {
    const decision = p.screeningDecision || decisionMap.get(p.paperId);
    if (decision === "include") {
      screenedPaperIds.add(p.paperId);
      includedPaperIds.push(p.paperId);
    } else if (decision === "exclude") {
      screenedPaperIds.add(p.paperId);
      excludedPaperIds.push(p.paperId);
    } else {
      unscreenedPapers.push({
        paperId: p.paperId,
        title: p.title,
        abstract: p.abstract,
      });
    }
  }

  // If nothing screened yet, return papers ordered by citation count (heuristic)
  if (includedPaperIds.length === 0 && excludedPaperIds.length === 0) {
    return unscreenedPapers.map((p, i) => ({
      paperId: p.paperId,
      score: 1 - i / Math.max(unscreenedPapers.length, 1),
      reason: "No screening data yet — default ordering",
    }));
  }

  // 2. Compute centroid of included papers' embeddings
  const centroid = await computeIncludedCentroid(includedPaperIds);

  if (!centroid) {
    // No embeddings available — fall back to simple ordering
    return unscreenedPapers.map((p, i) => ({
      paperId: p.paperId,
      score: 1 - i / Math.max(unscreenedPapers.length, 1),
      reason: "No embeddings available — default ordering",
    }));
  }

  // 3. Score each unscreened paper by similarity to centroid
  const scores: PriorityScore[] = [];
  const centroidStr = `[${centroid.join(",")}]`;

  for (const paper of unscreenedPapers) {
    // Get the best-matching chunk for this paper
    const result = await db.execute(
      sql`SELECT 1 - (embedding <=> ${centroidStr}::vector) as similarity
          FROM paper_chunks
          WHERE paper_id = ${paper.paperId}
            AND embedding IS NOT NULL
          ORDER BY embedding <=> ${centroidStr}::vector
          LIMIT 1`
    );

    const rows = result as unknown as Array<{ similarity: number }>;
    const similarity = rows.length > 0 ? rows[0].similarity : 0.5;

    // Uncertainty sampling: papers closest to 0.5 similarity are most uncertain
    const uncertainty = 1 - Math.abs(similarity - 0.5) * 2;

    // Combined score: weighted blend of similarity and uncertainty
    // High similarity → likely relevant → review first
    // High uncertainty → near decision boundary → review first
    const score = 0.6 * similarity + 0.4 * uncertainty;

    scores.push({
      paperId: paper.paperId,
      score: Math.max(0, Math.min(1, score)),
      reason:
        similarity > 0.7
          ? "High similarity to included papers"
          : uncertainty > 0.7
            ? "Near decision boundary — uncertain"
            : "Moderate relevance",
    });
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  return scores;
}

// ---------------------------------------------------------------------------
// Compute centroid embedding of included papers
// ---------------------------------------------------------------------------

async function computeIncludedCentroid(
  includedPaperIds: number[]
): Promise<number[] | null> {
  if (includedPaperIds.length === 0) return null;

  // Get average embedding across all chunks of included papers
  const result = await db.execute(
    sql`SELECT AVG(e) as avg_val
        FROM paper_chunks,
        LATERAL unnest(embedding::float8[]) WITH ORDINALITY AS t(e, ord)
        WHERE paper_id = ANY(${includedPaperIds})
          AND embedding IS NOT NULL
        GROUP BY ord
        ORDER BY ord`
  );

  const rows = result as unknown as Array<{ avg_val: number }>;
  if (rows.length === 0) return null;

  return rows.map((r) => r.avg_val);
}

// ---------------------------------------------------------------------------
// Update project_papers with computed priorities
// ---------------------------------------------------------------------------

export async function updateScreeningPriorities(
  projectId: number
): Promise<{ updated: number }> {
  const scores = await computeScreeningPriority(projectId);

  for (const { paperId, score } of scores) {
    await db
      .update(projectPapers)
      .set({ relevance_score: score })
      .where(
        and(
          eq(projectPapers.project_id, projectId),
          eq(projectPapers.paper_id, paperId)
        )
      );
  }

  return { updated: scores.length };
}
