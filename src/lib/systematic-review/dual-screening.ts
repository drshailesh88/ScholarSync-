/**
 * Dual Screening & Conflict Resolution
 *
 * Supports human reviewer decisions alongside AI screening,
 * inter-rater agreement (Cohen's kappa), and conflict resolution.
 * Supports multiple independent human reviewers per project.
 */

import { db } from "@/lib/db";
import {
  screeningDecisions,
  projectPapers,
  papers,
} from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HumanDecisionInput {
  projectId: number;
  paperId: number;
  userId: string;
  reviewerId: string;
  decision: "include" | "exclude" | "maybe";
  reason?: string;
  stage?: "title_abstract" | "full_text";
}

export interface ConflictInfo {
  paperId: number;
  title: string;
  aiDecision: string | null;
  humanDecision: string | null;
  aiReason: string | null;
  humanReason: string | null;
}

export interface MultiReviewerConflict {
  paperId: number;
  paperTitle: string;
  decisions: { reviewerId: string; decision: string; reason: string | null }[];
}

export interface AgreementStats {
  totalPapers: number;
  agreements: number;
  disagreements: number;
  kappa: number;
  interpretation: string;
}

export interface UnblindedResult {
  paperId: number;
  paperTitle: string;
  aiDecision: string | null;
  humanDecision: string | null;
  isConflict: boolean;
  conflictType: "ai-include-human-exclude" | "ai-exclude-human-include" | "ai-include-human-maybe" | "ai-exclude-human-maybe" | "none";
}

export interface ScreeningQueueOptions {
  filter?: "all" | "unscreened" | "conflicts" | "uncertain";
  blinded?: boolean;
}

// ---------------------------------------------------------------------------
// Record a human screening decision
// ---------------------------------------------------------------------------

export async function recordHumanDecision(
  input: HumanDecisionInput
): Promise<void> {
  const stage = input.stage ?? "title_abstract";
  const reviewerId = input.reviewerId;

  // Upsert: the unique constraint is (projectId, paperId, stage, reviewerId)
  const [existing] = await db
    .select()
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, input.projectId),
        eq(screeningDecisions.paperId, input.paperId),
        eq(screeningDecisions.stage, stage),
        eq(screeningDecisions.reviewerId, reviewerId)
      )
    )
    .limit(1);

  if (existing) {
    // Update this reviewer's existing decision
    await db
      .update(screeningDecisions)
      .set({
        decision: input.decision,
        reason: input.reason || existing.reason,
        decidedBy: "user",
      })
      .where(eq(screeningDecisions.id, existing.id));
  } else {
    // Insert new human decision for this reviewer
    await db.insert(screeningDecisions).values({
      projectId: input.projectId,
      paperId: input.paperId,
      stage,
      decision: input.decision,
      reason: input.reason || null,
      decidedBy: "user",
      reviewerId,
    });
  }

  // Also update the project_papers screening fields (last-writer wins for the
  // aggregate field, which is used for overall display until conflict resolution)
  await db
    .update(projectPapers)
    .set({
      screening_decision: input.decision,
      screening_reason: input.reason || null,
    })
    .where(
      and(
        eq(projectPapers.project_id, input.projectId),
        eq(projectPapers.paper_id, input.paperId)
      )
    );
}

// ---------------------------------------------------------------------------
// Get reviewer-specific progress
// ---------------------------------------------------------------------------

export async function getReviewerProgress(
  projectId: number,
  reviewerId: string
): Promise<{ total: number; screened: number; progress: number }> {
  // Total papers in the project
  const [totalRow] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));

  // Papers this reviewer has screened (any human decision by this reviewerId)
  const [screenedRow] = await db
    .select({ screened: sql<number>`count(*)::int` })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decidedBy, "user"),
        eq(screeningDecisions.reviewerId, reviewerId)
      )
    );

  const total = totalRow?.total ?? 0;
  const screened = screenedRow?.screened ?? 0;

  return {
    total,
    screened,
    progress: total > 0 ? Math.round((screened / total) * 100) : 0,
  };
}

// ---------------------------------------------------------------------------
// Detect conflicts between multiple human reviewers
// ---------------------------------------------------------------------------

export async function detectConflicts(
  projectId: number,
  stage: "title_abstract" | "full_text"
): Promise<MultiReviewerConflict[]> {
  // Get all human decisions for this project + stage
  const humanDecisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      reviewerId: screeningDecisions.reviewerId,
      decision: screeningDecisions.decision,
      reason: screeningDecisions.reason,
      paperTitle: papers.title,
    })
    .from(screeningDecisions)
    .innerJoin(papers, eq(screeningDecisions.paperId, papers.id))
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.stage, stage),
        eq(screeningDecisions.decidedBy, "user")
      )
    );

  // Group decisions by paperId
  const byPaper = new Map<
    number,
    { paperTitle: string; decisions: { reviewerId: string; decision: string; reason: string | null }[] }
  >();

  for (const row of humanDecisions) {
    if (!row.reviewerId) continue; // skip AI decisions that slipped through
    const entry = byPaper.get(row.paperId) ?? { paperTitle: row.paperTitle ?? "", decisions: [] };
    entry.decisions.push({
      reviewerId: row.reviewerId,
      decision: row.decision ?? "",
      reason: row.reason,
    });
    byPaper.set(row.paperId, entry);
  }

  // Find papers where at least two reviewers disagree
  const conflicts: MultiReviewerConflict[] = [];

  for (const [paperId, { paperTitle, decisions }] of byPaper.entries()) {
    if (decisions.length < 2) continue;

    const uniqueDecisions = new Set(decisions.map((d) => d.decision));
    if (uniqueDecisions.size > 1) {
      conflicts.push({ paperId, paperTitle, decisions });
    }
  }

  return conflicts;
}

// ---------------------------------------------------------------------------
// Resolve a conflict with a final arbiter decision
// ---------------------------------------------------------------------------

export async function resolveConflict(
  projectId: number,
  paperId: number,
  stage: "title_abstract" | "full_text",
  resolution: "include" | "exclude" | "maybe",
  resolvedBy: string,
  reason?: string
): Promise<void> {
  // Record the resolution as a special "resolver" decision
  const [existing] = await db
    .select()
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.paperId, paperId),
        eq(screeningDecisions.stage, stage),
        eq(screeningDecisions.reviewerId, `resolver:${resolvedBy}`)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(screeningDecisions)
      .set({
        decision: resolution,
        reason: reason ?? existing.reason,
        decidedBy: "user",
      })
      .where(eq(screeningDecisions.id, existing.id));
  } else {
    await db.insert(screeningDecisions).values({
      projectId,
      paperId,
      stage,
      decision: resolution,
      reason: reason ?? null,
      decidedBy: "user",
      reviewerId: `resolver:${resolvedBy}`,
    });
  }

  // Write the resolved decision back to project_papers as the canonical answer
  await db
    .update(projectPapers)
    .set({
      screening_decision: resolution,
      screening_reason: reason ?? null,
    })
    .where(
      and(
        eq(projectPapers.project_id, projectId),
        eq(projectPapers.paper_id, paperId)
      )
    );
}

// ---------------------------------------------------------------------------
// Get screening queue (unscreened papers, ordered by priority)
// ---------------------------------------------------------------------------

export async function getScreeningQueue(
  projectId: number,
  stage: "title_abstract" | "full_text" = "title_abstract",
  filter: "all" | "unscreened" | "conflicts" | "uncertain" = "unscreened",
  options?: ScreeningQueueOptions & { reviewerId?: string }
) {
  const blinded = options?.blinded ?? false;
  const reviewerId = options?.reviewerId;

  // Get all project papers with their current screening status
  const allPapers = await db
    .select({
      ppId: projectPapers.id,
      paperId: papers.id,
      title: papers.title,
      authors: papers.authors,
      journal: papers.journal,
      year: papers.year,
      abstract: papers.abstract,
      doi: papers.doi,
      pmid: papers.pubmed_id,
      citationCount: papers.citation_count,
      studyType: papers.study_type,
      evidenceLevel: papers.evidence_level,
      pdfStoragePath: papers.pdf_storage_path,
      priority: projectPapers.relevance_score,
      screeningDecision: projectPapers.screening_decision,
      screeningReason: projectPapers.screening_reason,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));

  // Get AI decisions for comparison
  const aiDecisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      decision: screeningDecisions.decision,
      reason: screeningDecisions.reason,
      decidedBy: screeningDecisions.decidedBy,
    })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.stage, stage)
      )
    );

  const aiDecisionMap = new Map(
    aiDecisions
      .filter((d) => d.decidedBy === "ai")
      .map((d) => [d.paperId, { decision: d.decision, reason: d.reason }])
  );

  // If reviewerId provided, find papers this reviewer already screened
  let reviewerScreenedPaperIds: Set<number> | null = null;
  if (reviewerId) {
    const reviewerDecisions = await db
      .select({ paperId: screeningDecisions.paperId })
      .from(screeningDecisions)
      .where(
        and(
          eq(screeningDecisions.projectId, projectId),
          eq(screeningDecisions.stage, stage),
          eq(screeningDecisions.reviewerId, reviewerId)
        )
      );
    reviewerScreenedPaperIds = new Set(reviewerDecisions.map((d) => d.paperId));
  }

  // Enrich papers with AI decision info and reviewer-specific screened status
  const enriched = allPapers.map((p) => ({
    ...p,
    aiDecision: aiDecisionMap.get(p.paperId)?.decision || null,
    aiReason: aiDecisionMap.get(p.paperId)?.reason || null,
    reviewerScreened: reviewerScreenedPaperIds
      ? reviewerScreenedPaperIds.has(p.paperId)
      : null,
  }));

  // Apply filter
  let filtered = enriched;
  switch (filter) {
    case "unscreened":
      if (reviewerScreenedPaperIds !== null) {
        // Filter to papers this specific reviewer hasn't screened yet
        filtered = enriched.filter((p) => !p.reviewerScreened);
      } else {
        // Fall back to overall screening decision
        filtered = enriched.filter((p) => !p.screeningDecision);
      }
      break;
    case "conflicts":
      filtered = enriched.filter(
        (p) =>
          p.aiDecision &&
          p.screeningDecision &&
          p.aiDecision !== p.screeningDecision
      );
      break;
    case "uncertain":
      filtered = enriched.filter(
        (p) => p.screeningDecision === "maybe" || p.aiDecision === "maybe"
      );
      break;
    // "all" = no filter
  }

  // Sort by priority (descending), then by paperId
  filtered.sort((a, b) => {
    const pa = a.priority ?? 0;
    const pb = b.priority ?? 0;
    if (pb !== pa) return pb - pa;
    return a.paperId - b.paperId;
  });

  // In blinded mode, strip AI decision data so the reviewer is not influenced
  if (blinded) {
    return filtered.map((p) => ({
      ...p,
      aiDecision: null,
      aiReason: null,
    }));
  }

  return filtered;
}

// ---------------------------------------------------------------------------
// Get unblinded results with conflict detection
// ---------------------------------------------------------------------------

export async function getUnblindedResults(
  projectId: number,
  stage: "title_abstract" | "full_text" = "title_abstract"
): Promise<UnblindedResult[]> {
  // Get all project papers with human decisions
  const allPapers = await db
    .select({
      paperId: papers.id,
      title: papers.title,
      humanDecision: projectPapers.screening_decision,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));

  // Get AI decisions
  const aiDecisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      decision: screeningDecisions.decision,
    })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decidedBy, "ai"),
        eq(screeningDecisions.stage, stage)
      )
    );

  const aiMap = new Map(aiDecisions.map((d) => [d.paperId, d.decision]));

  return allPapers.map((p) => {
    const aiDec = aiMap.get(p.paperId) ?? null;
    const humanDec = p.humanDecision;
    const isConflict = !!(aiDec && humanDec && aiDec !== humanDec);

    let conflictType: UnblindedResult["conflictType"] = "none";
    if (isConflict) {
      if (aiDec === "include" && humanDec === "exclude") conflictType = "ai-include-human-exclude";
      else if (aiDec === "exclude" && humanDec === "include") conflictType = "ai-exclude-human-include";
      else if (aiDec === "include" && humanDec === "maybe") conflictType = "ai-include-human-maybe";
      else if (aiDec === "exclude" && humanDec === "maybe") conflictType = "ai-exclude-human-maybe";
    }

    return {
      paperId: p.paperId,
      paperTitle: p.title,
      aiDecision: aiDec,
      humanDecision: humanDec,
      isConflict,
      conflictType,
    };
  });
}

// ---------------------------------------------------------------------------
// Get screening progress stats
// ---------------------------------------------------------------------------

export async function getScreeningProgress(projectId: number) {
  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      screened: sql<number>`count(${projectPapers.screening_decision})::int`,
      included: sql<number>`count(CASE WHEN ${projectPapers.screening_decision} = 'include' THEN 1 END)::int`,
      excluded: sql<number>`count(CASE WHEN ${projectPapers.screening_decision} = 'exclude' THEN 1 END)::int`,
      maybe: sql<number>`count(CASE WHEN ${projectPapers.screening_decision} = 'maybe' THEN 1 END)::int`,
    })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));

  return {
    total: stats.total,
    screened: stats.screened,
    unscreened: stats.total - stats.screened,
    included: stats.included,
    excluded: stats.excluded,
    maybe: stats.maybe,
    progress:
      stats.total > 0
        ? Math.round((stats.screened / stats.total) * 100)
        : 0,
  };
}

// ---------------------------------------------------------------------------
// Compute inter-rater agreement (Cohen's kappa)
// Now compares between multiple human reviewers (not just AI vs human)
// ---------------------------------------------------------------------------

export async function computeInterRaterAgreement(
  projectId: number
): Promise<AgreementStats> {
  // Get all human decisions grouped by paper, to find pairs of reviewers
  const humanDecisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      reviewerId: screeningDecisions.reviewerId,
      decision: screeningDecisions.decision,
    })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decidedBy, "user")
      )
    );

  // Group by paperId — collect decisions per paper per reviewer
  const paperReviewerMap = new Map<
    number,
    Map<string, string>
  >();

  for (const d of humanDecisions) {
    if (!d.reviewerId || !d.decision) continue;
    // Exclude resolver decisions from kappa computation
    if (d.reviewerId.startsWith("resolver:")) continue;

    const reviewerMap = paperReviewerMap.get(d.paperId) ?? new Map<string, string>();
    reviewerMap.set(d.reviewerId, d.decision);
    paperReviewerMap.set(d.paperId, reviewerMap);
  }

  // If fewer than 2 reviewers have overlapping decisions, fall back to AI vs human
  let agreements = 0;
  let disagreements = 0;
  let totalPairs = 0;
  let r1Include = 0, r1Exclude = 0;
  let r2Include = 0, r2Exclude = 0;

  let hasHumanPairs = false;

  for (const reviewerMap of paperReviewerMap.values()) {
    const reviewerIds = Array.from(reviewerMap.keys());
    if (reviewerIds.length < 2) continue;

    // Compare the first two reviewers (pairwise)
    hasHumanPairs = true;
    const dec1 = reviewerMap.get(reviewerIds[0])!;
    const dec2 = reviewerMap.get(reviewerIds[1])!;

    const simple1 = dec1 === "include" ? "include" : "exclude";
    const simple2 = dec2 === "include" ? "include" : "exclude";

    if (simple1 === "include") r1Include++; else r1Exclude++;
    if (simple2 === "include") r2Include++; else r2Exclude++;

    totalPairs++;
    if (simple1 === simple2) agreements++; else disagreements++;
  }

  // Fall back to AI vs human if no human-human pairs found
  if (!hasHumanPairs) {
    return computeAIHumanAgreement(projectId);
  }

  if (totalPairs === 0) {
    return {
      totalPapers: 0,
      agreements: 0,
      disagreements: 0,
      kappa: 0,
      interpretation: "No overlapping decisions to compare",
    };
  }

  // Cohen's kappa
  const po = agreements / totalPairs;
  const pR1Include = r1Include / totalPairs;
  const pR1Exclude = r1Exclude / totalPairs;
  const pR2Include = r2Include / totalPairs;
  const pR2Exclude = r2Exclude / totalPairs;
  const pe = pR1Include * pR2Include + pR1Exclude * pR2Exclude;

  const kappa = pe === 1 ? 1 : (po - pe) / (1 - pe);

  const interpretation =
    kappa >= 0.81
      ? "Almost perfect agreement"
      : kappa >= 0.61
        ? "Substantial agreement"
        : kappa >= 0.41
          ? "Moderate agreement"
          : kappa >= 0.21
            ? "Fair agreement"
            : kappa >= 0
              ? "Slight agreement"
              : "Poor agreement";

  return {
    totalPapers: totalPairs,
    agreements,
    disagreements,
    kappa: Math.round(kappa * 100) / 100,
    interpretation,
  };
}

// ---------------------------------------------------------------------------
// Fallback: AI vs Human agreement (original behaviour)
// ---------------------------------------------------------------------------

async function computeAIHumanAgreement(
  projectId: number
): Promise<AgreementStats> {
  const aiDecisions = await db
    .select({
      paperId: screeningDecisions.paperId,
      decision: screeningDecisions.decision,
    })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decidedBy, "ai")
      )
    );

  const humanDecisions = await db
    .select({
      paperId: projectPapers.paper_id,
      decision: projectPapers.screening_decision,
    })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));

  const aiMap = new Map(aiDecisions.map((d) => [d.paperId, d.decision]));

  let agreements = 0;
  let disagreements = 0;
  let totalPairs = 0;
  let aiInclude = 0, aiExclude = 0;
  let humanInclude = 0, humanExclude = 0;

  for (const h of humanDecisions) {
    if (!h.decision) continue;
    const aiDec = aiMap.get(h.paperId);
    if (!aiDec) continue;

    totalPairs++;

    const aiSimple = aiDec === "include" ? "include" : "exclude";
    const humanSimple = h.decision === "include" ? "include" : "exclude";

    if (aiSimple === "include") aiInclude++; else aiExclude++;
    if (humanSimple === "include") humanInclude++; else humanExclude++;

    if (aiSimple === humanSimple) agreements++; else disagreements++;
  }

  if (totalPairs === 0) {
    return {
      totalPapers: 0,
      agreements: 0,
      disagreements: 0,
      kappa: 0,
      interpretation: "No overlapping decisions to compare",
    };
  }

  const po = agreements / totalPairs;
  const pAiInclude = aiInclude / totalPairs;
  const pAiExclude = aiExclude / totalPairs;
  const pHumanInclude = humanInclude / totalPairs;
  const pHumanExclude = humanExclude / totalPairs;
  const pe = pAiInclude * pHumanInclude + pAiExclude * pHumanExclude;

  const kappa = pe === 1 ? 1 : (po - pe) / (1 - pe);

  const interpretation =
    kappa >= 0.81
      ? "Almost perfect agreement"
      : kappa >= 0.61
        ? "Substantial agreement"
        : kappa >= 0.41
          ? "Moderate agreement"
          : kappa >= 0.21
            ? "Fair agreement"
            : kappa >= 0
              ? "Slight agreement"
              : "Poor agreement";

  return {
    totalPapers: totalPairs,
    agreements,
    disagreements,
    kappa: Math.round(kappa * 100) / 100,
    interpretation,
  };
}
