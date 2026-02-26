/**
 * Dual Screening & Conflict Resolution
 *
 * Supports human reviewer decisions alongside AI screening,
 * inter-rater agreement (Cohen's kappa), and conflict resolution.
 */

import { db } from "@/lib/db";
import {
  screeningDecisions,
  projectPapers,
  papers,
} from "@/lib/db/schema";
import { eq, and, sql, isNull } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HumanDecisionInput {
  projectId: number;
  paperId: number;
  userId: string;
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

export interface AgreementStats {
  totalPapers: number;
  agreements: number;
  disagreements: number;
  kappa: number;
  interpretation: string;
}

// ---------------------------------------------------------------------------
// Record a human screening decision
// ---------------------------------------------------------------------------

export async function recordHumanDecision(
  input: HumanDecisionInput
): Promise<void> {
  const stage = input.stage ?? "title_abstract";

  // Upsert: the unique constraint is (projectId, paperId, stage)
  // But we want to store human decisions as decided_by="user"
  // First check if AI already decided
  const [existing] = await db
    .select()
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, input.projectId),
        eq(screeningDecisions.paperId, input.paperId),
        eq(screeningDecisions.stage, stage)
      )
    )
    .limit(1);

  if (existing) {
    // Update existing decision (human overrides AI)
    await db
      .update(screeningDecisions)
      .set({
        decision: input.decision,
        reason: input.reason || existing.reason,
        decidedBy: "user",
      })
      .where(eq(screeningDecisions.id, existing.id));
  } else {
    // Insert new human decision
    await db.insert(screeningDecisions).values({
      projectId: input.projectId,
      paperId: input.paperId,
      stage,
      decision: input.decision,
      reason: input.reason || null,
      decidedBy: "user",
    });
  }

  // Also update the project_papers screening fields
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
// Get screening queue (unscreened papers, ordered by priority)
// ---------------------------------------------------------------------------

export async function getScreeningQueue(
  projectId: number,
  stage: "title_abstract" | "full_text" = "title_abstract",
  filter: "all" | "unscreened" | "conflicts" | "uncertain" = "unscreened"
) {
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

  // Enrich papers with AI decision info
  const enriched = allPapers.map((p) => ({
    ...p,
    aiDecision: aiDecisionMap.get(p.paperId)?.decision || null,
    aiReason: aiDecisionMap.get(p.paperId)?.reason || null,
  }));

  // Apply filter
  let filtered = enriched;
  switch (filter) {
    case "unscreened":
      filtered = enriched.filter((p) => !p.screeningDecision);
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

  return filtered;
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
// ---------------------------------------------------------------------------

export async function computeInterRaterAgreement(
  projectId: number
): Promise<AgreementStats> {
  // Get papers where both AI and human have made decisions
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

  // Find pairs where both AI and human have decided
  let agreements = 0;
  let disagreements = 0;
  let totalPairs = 0;

  // For kappa: count category frequencies
  let aiInclude = 0,
    aiExclude = 0;
  let humanInclude = 0,
    humanExclude = 0;

  for (const h of humanDecisions) {
    if (!h.decision) continue;
    const aiDec = aiMap.get(h.paperId);
    if (!aiDec) continue;

    totalPairs++;

    // Simplify "maybe" to "exclude" for agreement calculation
    const aiSimple = aiDec === "include" ? "include" : "exclude";
    const humanSimple = h.decision === "include" ? "include" : "exclude";

    if (aiSimple === "include") aiInclude++;
    else aiExclude++;
    if (humanSimple === "include") humanInclude++;
    else humanExclude++;

    if (aiSimple === humanSimple) {
      agreements++;
    } else {
      disagreements++;
    }
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
  const po = agreements / totalPairs; // observed agreement
  const pAiInclude = aiInclude / totalPairs;
  const pAiExclude = aiExclude / totalPairs;
  const pHumanInclude = humanInclude / totalPairs;
  const pHumanExclude = humanExclude / totalPairs;
  const pe =
    pAiInclude * pHumanInclude + pAiExclude * pHumanExclude; // expected agreement

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
