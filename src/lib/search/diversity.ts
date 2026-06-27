/**
 * Maximal Marginal Relevance (MMR) diversification for the result page.
 *
 * Why: a broad topic query ("management of HFrEF") can return a top page that is
 * five near-identical meta-analyses of the same finding — high relevance, low
 * coverage. MMR re-orders the page to trade a little relevance for diversity, so a
 * distinct-but-relevant paper surfaces above a redundant near-duplicate.
 *
 * Safe-by-construction: it reorders ONLY within the fixed top-K set (never pulls
 * from the tail, never drops anything), so the SET of top-K results is unchanged —
 * recall@k provably cannot regress; only the within-page order changes. The leading
 * `anchor` results (the exact-title / trial-primary winner that upstream steps
 * pinned at #1) are kept in place.
 */

import type { UnifiedSearchResult } from "@/types/search";

function titleTokens(title: string): Set<string> {
  return new Set(
    (title ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 0)
  );
}

/** Jaccard overlap of two papers' title token sets, in [0,1]. */
export function titleSimilarity(a: UnifiedSearchResult, b: UnifiedSearchResult): number {
  const ta = titleTokens(a.title);
  const tb = titleTokens(b.title);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}

export interface MmrOptions {
  /** Page size to diversify (default 10). Results past this are left untouched. */
  k?: number;
  /** Relevance-vs-diversity trade-off in [0,1]; higher favors relevance (default 0.75). */
  lambda?: number;
  /** Number of leading results to pin unchanged (default 1 — the #1 anchor). */
  anchor?: number;
}

/**
 * Re-order the top-K of an already-ranked list by MMR. Relevance is taken from the
 * incoming rank (the list is assumed sorted best-first, so earlier = more
 * relevant), and redundancy is the max title-similarity to an already-selected
 * result. Greedy, stable on ties (lower incoming rank wins), and a pure function.
 */
export function diversifyTopK(
  results: UnifiedSearchResult[],
  opts: MmrOptions = {}
): UnifiedSearchResult[] {
  const anchor = Math.max(0, opts.anchor ?? 1);
  const lambda = Math.min(1, Math.max(0, opts.lambda ?? 0.75));
  const k = Math.min(opts.k ?? 10, results.length);
  // Nothing to reorder: fewer than two movable candidates.
  if (k - anchor < 2) return results;

  const head = results.slice(0, k);
  const tail = results.slice(k);
  // Incoming-rank relevance in [0,1] (position 0 = 1, position k-1 ≈ 1/k).
  const relevance = head.map((_, i) => (k - i) / k);

  const selected: UnifiedSearchResult[] = head.slice(0, anchor);
  const remaining = head.slice(anchor).map((r, i) => ({ r, idx: anchor + i }));

  while (remaining.length > 0) {
    let bestPos = 0;
    let bestScore = -Infinity;
    for (let p = 0; p < remaining.length; p++) {
      const { r, idx } = remaining[p];
      let maxSim = 0;
      for (const s of selected) {
        const sim = titleSimilarity(r, s);
        if (sim > maxSim) maxSim = sim;
      }
      const mmr = lambda * relevance[idx] - (1 - lambda) * maxSim;
      // Strictly-greater keeps it stable: earlier (higher-ranked) ties win.
      if (mmr > bestScore) {
        bestScore = mmr;
        bestPos = p;
      }
    }
    selected.push(remaining[bestPos].r);
    remaining.splice(bestPos, 1);
  }

  return [...selected, ...tail];
}
