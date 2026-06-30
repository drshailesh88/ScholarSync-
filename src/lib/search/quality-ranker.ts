import type { UnifiedSearchResult, EvidenceLevel } from "@/types/search";
import { lookupJournalQuality } from "./journal-quality";
import { entityDriftPenalty } from "./entity-drift";

// ── Configuration ───────────────────────────────────────────────────

export interface QualityRankingConfig {
  /** Weight for evidence level signal (0-1) */
  evidenceWeight: number;
  /** Weight for citation count signal (0-1) */
  citationWeight: number;
  /** Weight for citation velocity (citations/year) signal (0-1) */
  velocityWeight: number;
  /** Weight for journal quartile signal (0-1) */
  journalWeight: number;
  /** Weight for original RRF score (0-1) */
  rrfWeight: number;
  /** Weight for query relevance signal (0-1) — cross-encoder rerank score when present */
  relevanceWeight: number;
}

/**
 * Metadata-dominant weights — the EXACT validated config (the ranking the LLM
 * council scored 4/6). The clinical-quality signals (evidence hierarchy, citations,
 * journal, RRF prior) carry the ranking; relevance is ONE capped signal, not the
 * ruler. Used whether or not a cross-encoder ran — the only difference is the
 * relevance SOURCE (a [0,1]-normalized cross-encoder score when present, else
 * keyword overlap). Weights sum to 1.
 *
 * This replaced a "rerank-dominant" config (relevanceWeight 0.40). The cross-encoder
 * score now arrives already squashed to [0,1] (the reranker adapter applies the
 * sigmoid read-out — see `rerank.ts`), so it is commensurate with the other signals;
 * capping its weight at 0.30 keeps it from overruling the clinical-quality priors. The
 * earlier pathology — a RAW logit (range ≈ −16…+10) summed against [0,1] signals, where
 * a single negative logit on a trial's primary report drove the composite to ≈ −2.8 and
 * buried the correct answer beneath acronym-mentioning secondaries — is fixed at the
 * source (measured: trial-acronym recall 0.72 → 0.85+ on the 87q harness).
 */
const BALANCED_CONFIG: QualityRankingConfig = {
  evidenceWeight: 0.16,
  citationWeight: 0.07,
  velocityWeight: 0.0,
  journalWeight: 0.07,
  rrfWeight: 0.20,
  relevanceWeight: 0.50,
};

/**
 * Relevance GATE. The weighted composite alone let off-topic mega-cited papers
 * (e.g. PRISMA: Level I, Q1, 83k citations) out-score a perfectly relevant but
 * recent, 0-citation paper, because the clinical priors maxed out while relevance
 * was just one term. The gate makes relevance NECESSARY: the whole composite is
 * multiplied by min(1, relevance / FLOOR), so a paper the cross-encoder scores
 * below the floor is crushed no matter how prestigious it is, while everything at
 * or above the floor is unpenalized and ordered by the quality priors as before.
 */
const RELEVANCE_GATE_FLOOR = 0.45;

function relevanceGate(relevance: number): number {
  return Math.min(1, relevance / RELEVANCE_GATE_FLOOR);
}

// ── Signal normalizers ──────────────────────────────────────────────

const EVIDENCE_SCORES: Record<EvidenceLevel, number> = {
  I: 1.0,
  II: 0.8,
  III: 0.6,
  IV: 0.3,
  V: 0.1,
};

function normalizeEvidence(level: EvidenceLevel | undefined): number {
  return EVIDENCE_SCORES[level ?? "V"];
}

/**
 * Log-scale normalization of citation counts, capped at the 99th percentile
 * of the result set to prevent extreme outliers from dominating.
 */
function normalizeCitations(count: number, cap: number): number {
  if (cap <= 0) return 0;
  const clamped = Math.min(count, cap);
  if (clamped <= 0) return 0;
  return Math.log1p(clamped) / Math.log1p(cap);
}

/** Citations per year since publication — separates fast-rising work from old-but-stale. */
function citationVelocity(count: number, year: number, currentYear: number): number {
  if (!count || !year) return 0;
  const age = Math.max(1, currentYear - year + 1);
  return count / age;
}

function normalizeVelocity(velocity: number, cap: number): number {
  if (cap <= 0 || velocity <= 0) return 0;
  return Math.log1p(Math.min(velocity, cap)) / Math.log1p(cap);
}

const QUARTILE_SCORES: Record<string, number> = {
  Q1: 1.0,
  Q2: 0.7,
  Q3: 0.4,
  Q4: 0.2,
};

function normalizeJournalQuartile(
  quartile: "Q1" | "Q2" | "Q3" | "Q4" | null | undefined
): number {
  if (!quartile) return 0.1; // Unknown journal
  return QUARTILE_SCORES[quartile] ?? 0.1;
}

function normalizeRrf(score: number | undefined, maxScore: number): number {
  if (!score || maxScore <= 0) return 0;
  return score / maxScore;
}

// ── Query relevance scoring ─────────────────────────────────────────

const STOPWORDS = new Set([
  "the", "are", "what", "how", "does", "and", "for", "with",
  "from", "this", "that", "have", "been", "were", "was", "its",
  "can", "may", "not", "but", "all", "any", "each", "which",
  "their", "them", "than", "these", "those", "when", "will",
  "into", "over", "some", "could", "would", "should", "about",
  "between", "through", "compare", "versus", "effect", "effects",
  "outcome", "outcomes", "impact", "result", "results", "find",
  "key", "trials", "study", "studies",
]);

function extractQueryKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

/**
 * Compute keyword overlap between a paper and the query.
 * Returns 0-1 ratio: (matched keywords) / (total query keywords).
 */
function computeRelevance(
  result: UnifiedSearchResult,
  queryKeywords: string[]
): number {
  if (queryKeywords.length === 0) return 0.5;

  const text = [
    result.title,
    result.abstract || "",
  ]
    .join(" ")
    .toLowerCase();

  const matchCount = queryKeywords.filter((kw) => text.includes(kw)).length;
  return matchCount / queryKeywords.length;
}

// ── Journal quality enrichment ──────────────────────────────────────

/**
 * Enrich results with journal quality data from Scimago.
 * Mutates the results in place for efficiency.
 */
export function enrichJournalQuality(
  results: UnifiedSearchResult[]
): void {
  for (const r of results) {
    if (r.journalQuartile !== undefined) continue; // Already enriched
    if (!r.journal) continue;

    const quality = lookupJournalQuality(r.journal);
    if (quality) {
      r.journalQuartile = quality.quartile;
      r.journalImpactProxy = quality.citesPerDoc2y;
    }
  }
}

// ── Quality ranking ─────────────────────────────────────────────────

export interface QualitySignals {
  evidence: number;
  citation: number;
  velocity: number;
  journal: number;
  rrf: number;
  relevance: number;
  /** Off-entity drift multiplier in (0,1] applied to the composite; 1 = no drift. */
  entityDrift: number;
}

export interface ScoredResult {
  result: UnifiedSearchResult;
  composite: number;
  signals: QualitySignals;
}

interface ScoringContext {
  citationCap: number;
  velocityCap: number;
  currentYear: number;
  maxRrf: number;
  queryKeywords: string[];
  rawQuery: string;
  config: QualityRankingConfig;
}

function buildScoringContext(
  results: UnifiedSearchResult[],
  query: string | undefined,
  config: QualityRankingConfig
): ScoringContext {
  const currentYear = new Date().getFullYear();
  const citations = results.map((r) => r.citationCount || 0).sort((a, b) => a - b);
  const p99Index = Math.floor(citations.length * 0.99);
  const citationCap = citations[p99Index] || 1;
  const velocities = results
    .map((r) => citationVelocity(r.citationCount || 0, r.year, currentYear))
    .sort((a, b) => a - b);
  const velocityCap = velocities[Math.floor(velocities.length * 0.99)] || 1;
  const maxRrf = Math.max(...results.map((r) => r.rrfScore ?? 0), 0.001);
  const queryKeywords = query ? extractQueryKeywords(query) : [];
  return {
    citationCap,
    velocityCap,
    currentYear,
    maxRrf,
    queryKeywords,
    rawQuery: query ?? "",
    config,
  };
}

function scoreResult(r: UnifiedSearchResult, ctx: ScoringContext): ScoredResult {
  const signals: QualitySignals = {
    evidence: normalizeEvidence(r.evidenceLevel),
    citation: normalizeCitations(r.citationCount || 0, ctx.citationCap),
    velocity: normalizeVelocity(
      citationVelocity(r.citationCount || 0, r.year, ctx.currentYear),
      ctx.velocityCap
    ),
    journal: normalizeJournalQuartile(r.journalQuartile),
    rrf: normalizeRrf(r.rrfScore, ctx.maxRrf),
    // Prefer the cross-encoder rerank score as the relevance signal — it arrives
    // already squashed to [0,1] by the reranker adapter, so it is one capped signal
    // weighted alongside the quality priors, never a raw logit that dominates. Fall
    // back to keyword overlap when no reranker ran.
    relevance:
      typeof r.rerankScore === "number"
        ? r.rerankScore
        : ctx.queryKeywords.length > 0
          ? computeRelevance(r, ctx.queryKeywords)
          : 0.5,
    entityDrift: 1,
  };
  const c = ctx.config;
  const weighted =
    c.evidenceWeight * signals.evidence +
    c.citationWeight * signals.citation +
    c.velocityWeight * signals.velocity +
    c.journalWeight * signals.journal +
    c.rrfWeight * signals.rrf +
    c.relevanceWeight * signals.relevance;
  // Gently demote (never drop) a result whose title is about a different subtype
  // or specific drug than the query specifies — drift the cross-encoder cannot
  // discriminate. The multiplier is recorded for the ranking trace.
  signals.entityDrift = ctx.rawQuery ? entityDriftPenalty(ctx.rawQuery, r) : 1;
  const composite = weighted * signals.entityDrift * relevanceGate(signals.relevance);
  return { result: r, composite, signals };
}

/**
 * Score + sort results by the quality composite, returning the per-signal
 * breakdown for each so callers can build a ranking trace / explanation.
 * Call AFTER reciprocalRankFusion() and AFTER enrichJournalQuality().
 */
export function rankWithTrace(
  results: UnifiedSearchResult[],
  query?: string,
  config?: QualityRankingConfig
): ScoredResult[] {
  if (results.length === 0) return [];
  const ctx = buildScoringContext(results, query, config ?? BALANCED_CONFIG);
  const scored = results.map((r) => scoreResult(r, ctx));
  scored.sort((a, b) => b.composite - a.composite);
  return scored;
}

/**
 * Re-rank results using a weighted composite of evidence level, citation count,
 * journal quartile, original RRF score, and query relevance. Thin wrapper over
 * {@link rankWithTrace} that overwrites `rrfScore` with the composite (legacy shape).
 */
export function qualityRank(
  results: UnifiedSearchResult[],
  query?: string,
  config?: QualityRankingConfig
): UnifiedSearchResult[] {
  if (results.length === 0) return results;
  return rankWithTrace(results, query, config).map(({ result, composite }) => ({
    ...result,
    rrfScore: Math.round(composite * 10000) / 10000,
  }));
}
