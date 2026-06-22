/**
 * Ranking + annotation pipeline.
 *
 * Pure transform (the only side effects are the in-place enrichers it calls):
 *   fused results → enrich study types → enrich journal quality →
 *   quality rank (or recency sort) → annotate each result with a ranking trace,
 *   missing-metadata flags, and a deterministic "why this matters" line.
 *
 * Kept separate from `run-search.ts` (which owns the network fan-out) so the
 * ranking logic is deterministic and unit-testable without hitting any API.
 */

import type { RankingTrace, UnifiedSearchResult } from "@/types/search";
import { rankWithTrace, enrichJournalQuality, type ScoredResult } from "./quality-ranker";
import { enrichStudyTypes } from "./study-type-detector";
import { getEvidenceLevel } from "./evidence-level";

const STOPWORDS = new Set([
  "the", "are", "what", "how", "does", "do", "and", "for", "with", "from",
  "this", "that", "have", "has", "been", "were", "was", "its", "can", "may",
  "not", "but", "all", "any", "which", "their", "them", "than", "these",
  "those", "when", "will", "into", "over", "some", "could", "would", "should",
  "about", "between", "through", "versus", "vs", "compared", "compare",
  "effect", "effects", "outcome", "outcomes", "impact", "results", "patients",
  "adults", "risk", "trial", "trials", "study", "studies", "latest", "newest",
  "recent", "year", "years",
]);

function keywords(query: string): string[] {
  return [
    ...new Set(
      query
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
    ),
  ];
}

/** Missing / low-confidence metadata + integrity flags, surfaced not hidden. */
export function buildFlags(r: UnifiedSearchResult): string[] {
  const flags = new Set<string>(r.flags ?? []);
  if (!r.doi) flags.add("missing_doi");
  if (!r.pmid) flags.add("missing_pmid");
  if (!r.year) flags.add("missing_year");
  if (!r.journal) flags.add("missing_journal");
  if (!r.citationCount) flags.add("missing_citation_count");
  if (!r.journalQuartile) flags.add("unrated_journal");
  if (!r.studyType || r.studyType === "other") flags.add("unclassified_study_type");
  if (!r.abstract) flags.add("missing_abstract");

  // Research-integrity signals from PubMed publication types / Crossref updates.
  const pubTypes = (r.publicationTypes ?? []).join(" ").toLowerCase();
  if (pubTypes.includes("retracted publication")) flags.add("retracted");
  if (
    pubTypes.includes("retraction of publication") ||
    pubTypes.includes("published erratum") ||
    pubTypes.includes("erratum")
  ) {
    flags.add("correction_or_retraction_notice");
  }
  return [...flags];
}

/** Deterministic, template-based explanation (never an LLM — no hallucination). */
export function buildWhyRelevant(
  r: UnifiedSearchResult,
  matchedTerms: string[]
): string {
  const parts: string[] = [];
  const ev = getEvidenceLevel(r.studyType ?? "other");
  if (r.studyType && r.studyType !== "other") {
    parts.push(`${ev.label} (Level ${ev.level})`);
  }
  if (r.year) parts.push(String(r.year));
  if (r.citationCount && r.citationCount > 0) {
    parts.push(`${r.citationCount.toLocaleString()} citations`);
  }
  if (r.journalQuartile) parts.push(`${r.journalQuartile} journal`);
  if (r.nctId) parts.push(`registered trial ${r.nctId}`);
  if (matchedTerms.length > 0) parts.push(`matches: ${matchedTerms.slice(0, 5).join(", ")}`);
  return parts.join(" · ");
}

function annotate(
  scored: ScoredResult,
  strategy: RankingTrace["strategy"],
  queryTerms: string[]
): UnifiedSearchResult {
  const { result, composite, signals } = scored;
  const text = `${result.title} ${result.abstract ?? ""}`.toLowerCase();
  const matched = queryTerms.filter((t) => text.includes(t));
  const trace: RankingTrace = {
    composite: Math.round(composite * 10000) / 10000,
    evidence: Math.round(signals.evidence * 1000) / 1000,
    citation: Math.round(signals.citation * 1000) / 1000,
    velocity: Math.round(signals.velocity * 1000) / 1000,
    journal: Math.round(signals.journal * 1000) / 1000,
    rrf: Math.round(signals.rrf * 1000) / 1000,
    relevance: Math.round(signals.relevance * 1000) / 1000,
    strategy,
  };
  return {
    ...result,
    rrfScore: trace.composite,
    rankingTrace: trace,
    flags: buildFlags(result),
    whyRelevant: buildWhyRelevant(result, matched),
  };
}

export interface RankAndAnnotateOptions {
  query: string;
  /** When true, order by recency (newest first), keeping the quality trace. */
  recency?: boolean;
}

/**
 * How strongly recency amplifies a paper's quality composite. The boost is
 * MULTIPLICATIVE (`composite × (1 + RECENCY_BOOST × recencyNorm)`) rather than an
 * additive term, so recency scales quality instead of substituting for it: a
 * pivotal high-composite trial (e.g. CLARITY-AD) cannot be displaced from the top
 * by a stream of recent low-value papers, while among similar-quality papers the
 * newer one still wins. 0.5 ⇒ the newest paper is worth up to 1.5× its composite.
 */
export const RECENCY_BOOST = 0.5;

/**
 * Recency-aware rank key. `recencyNorm` scales the year into [0,1] over the
 * result set (newest = 1); the composite is amplified by up to RECENCY_BOOST.
 * A zero span (all one year) leaves the composite unchanged.
 */
export function recencyRankKey(
  composite: number,
  year: number,
  minYear: number,
  span: number
): number {
  const recencyNorm =
    span > 0 ? Math.min(1, Math.max(0, (year - minYear) / span)) : 0;
  return composite * (1 + RECENCY_BOOST * recencyNorm);
}

function orderByRecency(scored: ScoredResult[]): ScoredResult[] {
  const years = scored.map((s) => s.result.year || 0).filter(Boolean);
  const minY = years.length ? Math.min(...years) : 0;
  const maxY = years.length ? Math.max(...years) : 0;
  const span = Math.max(1, maxY - minY);
  return [...scored]
    .map((s) => ({
      s,
      key: recencyRankKey(s.composite, s.result.year || minY, minY, span),
    }))
    .sort((a, b) => b.key - a.key)
    .map((x) => x.s);
}

/**
 * Enrich, rank, and annotate fused search results. Returns a new array; the
 * input objects are enriched in place (study type + journal quality) as a
 * deliberate, contained side effect of the enrichers.
 */
export function rankAndAnnotate(
  results: UnifiedSearchResult[],
  opts: RankAndAnnotateOptions
): UnifiedSearchResult[] {
  if (results.length === 0) return [];

  enrichStudyTypes(results);
  enrichJournalQuality(results);

  const scored = rankWithTrace(results, opts.query);
  const queryTerms = keywords(opts.query);

  let ordered = scored;
  if (opts.recency) {
    // Recency amplifies the quality composite multiplicatively (see
    // recencyRankKey) instead of an additive year term — so a pivotal
    // high-composite trial (e.g. CLARITY-AD) is not buried under a stream of
    // recent low-value papers, while among similar-quality papers the newer wins.
    ordered = orderByRecency(scored);
  }

  const annotated = ordered.map((s) =>
    annotate(s, opts.recency ? "recency" : "quality", queryTerms)
  );

  // Demote (never drop) retracted papers so they cannot occupy a top slot while
  // still being surfaced with their flag. Stable: preserves order within groups.
  return demoteRetracted(annotated);
}

function demoteRetracted(results: UnifiedSearchResult[]): UnifiedSearchResult[] {
  const clean: UnifiedSearchResult[] = [];
  const retracted: UnifiedSearchResult[] = [];
  for (const r of results) {
    if (r.flags?.includes("retracted")) retracted.push(r);
    else clean.push(r);
  }
  return retracted.length ? [...clean, ...retracted] : results;
}
