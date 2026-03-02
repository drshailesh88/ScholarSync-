import type { UnifiedSearchResult, EvidenceLevel } from "@/types/search";
import { lookupJournalQuality } from "./journal-quality";

// ── Configuration ───────────────────────────────────────────────────

export interface QualityRankingConfig {
  /** Weight for evidence level signal (0-1) */
  evidenceWeight: number;
  /** Weight for citation count signal (0-1) */
  citationWeight: number;
  /** Weight for journal quartile signal (0-1) */
  journalWeight: number;
  /** Weight for original RRF score (0-1) */
  rrfWeight: number;
  /** Weight for query relevance signal (0-1) */
  relevanceWeight: number;
}

const DEFAULT_CONFIG: QualityRankingConfig = {
  evidenceWeight: 0.25,
  citationWeight: 0.10,
  journalWeight: 0.10,
  rrfWeight: 0.25,
  relevanceWeight: 0.30,
};

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

/**
 * Re-rank results using a weighted composite of:
 * - Evidence level (OCEBM hierarchy)
 * - Citation count (log-scaled)
 * - Journal quartile (Scimago)
 * - Original RRF score (preserves source-rank information)
 * - Query relevance (keyword overlap with the original query)
 *
 * Call this AFTER reciprocalRankFusion() and AFTER enrichJournalQuality().
 *
 * @param query - The original search query (for relevance scoring)
 */
export function qualityRank(
  results: UnifiedSearchResult[],
  query?: string,
  config: QualityRankingConfig = DEFAULT_CONFIG
): UnifiedSearchResult[] {
  if (results.length === 0) return results;

  // Compute citation cap (99th percentile)
  const citations = results
    .map((r) => r.citationCount || 0)
    .sort((a, b) => a - b);
  const p99Index = Math.floor(citations.length * 0.99);
  const citationCap = citations[p99Index] || 1;

  // Find max RRF score for normalization
  const maxRrf = Math.max(...results.map((r) => r.rrfScore ?? 0), 0.001);

  // Extract query keywords for relevance scoring
  const queryKeywords = query ? extractQueryKeywords(query) : [];

  // Score and sort
  const scored = results.map((r) => {
    const evidenceSignal = normalizeEvidence(r.evidenceLevel);
    const citationSignal = normalizeCitations(r.citationCount || 0, citationCap);
    const journalSignal = normalizeJournalQuartile(r.journalQuartile);
    const rrfSignal = normalizeRrf(r.rrfScore, maxRrf);
    const relevanceSignal = queryKeywords.length > 0
      ? computeRelevance(r, queryKeywords)
      : 0.5;

    const composite =
      config.evidenceWeight * evidenceSignal +
      config.citationWeight * citationSignal +
      config.journalWeight * journalSignal +
      config.rrfWeight * rrfSignal +
      config.relevanceWeight * relevanceSignal;

    return { result: r, composite };
  });

  scored.sort((a, b) => b.composite - a.composite);

  return scored.map(({ result, composite }) => ({
    ...result,
    // Preserve the composite score for debugging (overwrite rrfScore)
    rrfScore: Math.round(composite * 10000) / 10000,
  }));
}
