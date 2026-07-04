/**
 * Minimal, dependency-free BM25 for the BEIR harness FIRST STAGE.
 *
 * Why a first stage at all: our production ranking stage (`rerankResults` in
 * src/lib/search/rerank.ts) is a cross-encoder reranker — it re-orders a
 * candidate set, it does not scan a corpus. On a fixed BEIR corpus we therefore
 * generate candidates with lexical BM25, then hand the top-N to our reranker.
 * BM25 here uses the Anserini/BEIR biomedical defaults (k1=0.9, b=0.4) so the
 * BM25-only column is itself a recognizable baseline.
 *
 * Lucene-style non-negative IDF: idf = ln(1 + (N − df + 0.5)/(df + 0.5)).
 *
 * Pure and deterministic — unit tested by vitest.
 */

export const BM25_K1 = 0.9;
export const BM25_B = 0.4;

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "at",
  "by", "from", "as", "is", "are", "was", "were", "be", "been", "it", "its",
  "this", "that", "these", "those", "which", "what", "how", "does", "do", "did",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

export interface Bm25Doc {
  id: string;
  text: string;
}

interface Posting {
  docId: string;
  tf: number;
}

export interface Bm25Index {
  postings: Map<string, Posting[]>;
  df: Map<string, number>;
  docLen: Map<string, number>;
  avgdl: number;
  n: number;
  k1: number;
  b: number;
}

export function buildIndex(
  docs: Bm25Doc[],
  opts: { k1?: number; b?: number } = {}
): Bm25Index {
  const postings = new Map<string, Posting[]>();
  const df = new Map<string, number>();
  const docLen = new Map<string, number>();
  let totalLen = 0;

  for (const doc of docs) {
    const tokens = tokenize(doc.text);
    docLen.set(doc.id, tokens.length);
    totalLen += tokens.length;
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const [term, count] of tf) {
      if (!postings.has(term)) postings.set(term, []);
      postings.get(term)!.push({ docId: doc.id, tf: count });
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }

  return {
    postings,
    df,
    docLen,
    avgdl: docs.length ? totalLen / docs.length : 0,
    n: docs.length,
    k1: opts.k1 ?? BM25_K1,
    b: opts.b ?? BM25_B,
  };
}

function idf(index: Bm25Index, term: string): number {
  const df = index.df.get(term) ?? 0;
  return Math.log(1 + (index.n - df + 0.5) / (df + 0.5));
}

/** Rank docIds by BM25 for a query, returning the top-N (ties broken by docId for
 * determinism). */
export function search(index: Bm25Index, query: string, topN: number): string[] {
  const terms = tokenize(query);
  const scores = new Map<string, number>();
  const seenQueryTerms = new Set<string>();

  for (const term of terms) {
    if (seenQueryTerms.has(term)) continue; // count each query term's idf once
    seenQueryTerms.add(term);
    const postings = index.postings.get(term);
    if (!postings) continue;
    const termIdf = idf(index, term);
    for (const { docId, tf } of postings) {
      const dl = index.docLen.get(docId) ?? 0;
      const denom = tf + index.k1 * (1 - index.b + (index.b * dl) / (index.avgdl || 1));
      const contribution = termIdf * ((tf * (index.k1 + 1)) / denom);
      scores.set(docId, (scores.get(docId) ?? 0) + contribution);
    }
  }

  return [...scores.entries()]
    .sort((a, b) => (b[1] - a[1]) || (a[0] < b[0] ? -1 : 1))
    .slice(0, topN)
    .map(([docId]) => docId);
}
