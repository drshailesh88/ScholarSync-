/**
 * BEIR-convention retrieval metrics: graded nDCG@k and Recall@k against a qrels
 * relevance map keyed by CORPUS DOC ID.
 *
 * This mirrors trec_eval / pytrec_eval (the library BEIR itself uses) so the
 * numbers are comparable to published BEIR results:
 *   - gain is LINEAR (the raw relevance grade, e.g. 0/1/2), NOT 2^rel − 1
 *   - discount is 1 / log2(rank + 1) with 1-based rank (position 0 → 1/log2(2) = 1)
 *   - Recall counts a doc as relevant iff its grade > 0
 * Verified against usnistgov/trec_eval `m_ndcg_cut.c`.
 *
 * These are docId-keyed and graded, which is why they are a separate module from
 * `src/lib/search/eval/metrics.ts` (which is must-have/PMID keyed and binary). The
 * conventions (log2 discount, @k truncation) are deliberately kept parallel.
 *
 * Pure functions, no I/O — unit tested by vitest.
 */

export type Qrels = Map<string, number>;

/** DCG of a ranked docId list against graded qrels, truncated at k. */
function dcgAtK(ranked: string[], qrels: Qrels, k: number): number {
  let dcg = 0;
  const top = ranked.slice(0, k);
  for (let i = 0; i < top.length; i++) {
    const gain = qrels.get(top[i]) ?? 0;
    if (gain > 0) dcg += gain / Math.log2(i + 2);
  }
  return dcg;
}

/** Ideal DCG: gains sorted descending, truncated at k. */
function idealDcgAtK(qrels: Qrels, k: number): number {
  const grades = [...qrels.values()].filter((g) => g > 0).sort((a, b) => b - a);
  let idcg = 0;
  const top = grades.slice(0, k);
  for (let i = 0; i < top.length; i++) idcg += top[i] / Math.log2(i + 2);
  return idcg;
}

/**
 * nDCG@k (graded, linear gain). Returns null when the query has NO positively
 * judged documents (undefined ideal) so the aggregator can exclude it, matching
 * trec_eval's handling of queries with no relevant docs.
 */
export function ndcgAtK(ranked: string[], qrels: Qrels, k: number): number | null {
  const idcg = idealDcgAtK(qrels, k);
  if (idcg === 0) return null;
  return dcgAtK(ranked, qrels, k) / idcg;
}

/**
 * Recall@k = (relevant docs, grade > 0, appearing in the top k) / (total relevant
 * docs). Returns null when there are no relevant docs (undefined denominator).
 */
export function recallAtK(ranked: string[], qrels: Qrels, k: number): number | null {
  const relevant = new Set([...qrels.entries()].filter(([, g]) => g > 0).map(([d]) => d));
  if (relevant.size === 0) return null;
  const top = ranked.slice(0, k);
  let found = 0;
  for (const d of top) if (relevant.has(d)) found++;
  return found / relevant.size;
}

/** Mean of non-null values (queries with no relevant docs are excluded). */
export function meanIgnoringNull(values: (number | null)[]): number | null {
  const nums = values.filter((v): v is number => v !== null && !Number.isNaN(v));
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
