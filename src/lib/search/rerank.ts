import type { UnifiedSearchResult } from "@/types/search";
import { resilientFetch } from "@/lib/http/resilient-fetch";

interface CohereRerankResponse {
  results: {
    index: number;
    relevance_score: number;
  }[];
}

/** A relevance score paired to a candidate's index in the input list. */
type RerankScore = { index: number; relevance_score: number };

/** True when SOME reranker is configured (self-hosted MedCPT or Cohere). */
export function hasReranker(): boolean {
  return Boolean(process.env.MEDCPT_RERANK_URL || process.env.COHERE_API_KEY);
}

/**
 * Self-hosted MedCPT Cross-Encoder (Modal, scale-to-zero). Returns a relevance
 * score per document IN INPUT ORDER; we pair to indices, sort desc, and trim to
 * `topN`. Throttle-proof — no external rate limit. Fail-open: a cold start that
 * exceeds the timeout (or any error) propagates as a throw so the caller keeps
 * the pre-rerank order.
 */
async function rerankMedcpt(
  url: string,
  query: string,
  documents: string[],
  topN: number
): Promise<RerankScore[]> {
  const res = await resilientFetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, documents }),
    },
    { service: "MedCPT-Rerank", timeout: 15000, maxRetries: 1 }
  );
  const data: { scores?: number[] } = await res.json();
  const scores = Array.isArray(data?.scores) ? data.scores : [];
  return scores
    .map((relevance_score, index) => ({ index, relevance_score }))
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, topN);
}

/** External Cohere reranker (fallback). Returns its already-sorted top-N. */
async function rerankCohere(
  apiKey: string,
  query: string,
  documents: string[],
  topN: number
): Promise<RerankScore[]> {
  const response = await resilientFetch(
    "https://api.cohere.com/v2/rerank",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "rerank-v3.5",
        query,
        documents,
        top_n: topN,
        return_documents: false,
      }),
    },
    { service: "Cohere", timeout: 10000, maxRetries: 2 }
  );
  const data: CohereRerankResponse = await response.json();
  return data.results;
}

/**
 * Rerank by query↔document relevance. Prefers the self-hosted MedCPT Cross-Encoder
 * (`MEDCPT_RERANK_URL`) — throttle-proof — and falls back to Cohere
 * (`COHERE_API_KEY`). Fail-open: with neither configured, or on any error, returns
 * the input unchanged.
 */
export async function rerankResults(
  query: string,
  results: UnifiedSearchResult[],
  topN?: number
): Promise<UnifiedSearchResult[]> {
  const medcptUrl = process.env.MEDCPT_RERANK_URL;
  const apiKey = process.env.COHERE_API_KEY;
  if (results.length === 0 || (!medcptUrl && !apiKey)) {
    return results;
  }

  const limit = topN || Math.min(results.length, 50);
  try {
    const documents = results.map(
      (r) => `${r.title}. ${r.abstract || r.tldr || ""}`
    );

    const scored = medcptUrl
      ? await rerankMedcpt(medcptUrl, query, documents, limit)
      : await rerankCohere(apiKey as string, query, documents, limit);

    if (scored.length === 0) return results;

    return scored.map((r) => ({
      ...results[r.index],
      rerankScore: r.relevance_score,
    }));
  } catch (error) {
    console.error("Rerank error:", error);
    return results;
  }
}

/**
 * Attach the cross-encoder relevance score (self-hosted MedCPT or Cohere) to each
 * candidate (top `topN`) as `rerankScore`, WITHOUT reordering — so the quality
 * ranker can use it as the dominant relevance signal. Mutates and returns the
 * input. Fail-open: with no reranker configured or on error, returns the input
 * unchanged (scores absent → the ranker falls back to keyword overlap).
 */
export async function attachRerankScores(
  query: string,
  results: UnifiedSearchResult[],
  topN = 50
): Promise<UnifiedSearchResult[]> {
  if (!hasReranker() || results.length < 2) return results;
  const head = results.slice(0, Math.min(results.length, topN));
  const reranked = await rerankResults(query, head, head.length);
  if (reranked === head) return results; // failed → unchanged
  // rerankResults returns the head reordered with rerankScore; map scores back
  // onto the original objects by identity.
  for (const r of reranked) {
    const score = r.rerankScore;
    if (typeof score !== "number") continue;
    const original = head.find(
      (h) => h.title === r.title && h.year === r.year && h.doi === r.doi
    );
    if (original) original.rerankScore = score;
  }
  return results;
}

/**
 * Blended cross-encoder rerank: combine the cross-encoder relevance score
 * (semantic query↔document match) with the clinical-quality composite (evidence
 * level + citations + journal + RRF) from the ranking pipeline. This is the
 * recommended hybrid — the cross-encoder fixes "topically relevant but not the
 * answer" ordering, while the quality priors keep landmark/high-evidence papers
 * on top.
 *
 * Only the top `topN` candidates are sent to the cross-encoder (latency/cost);
 * the tail keeps its quality order. Fail-open: with no reranker configured or on
 * any error, the input ordering is returned unchanged.
 */
export async function crossEncoderRerank(
  query: string,
  results: UnifiedSearchResult[],
  opts: { topN?: number; weight?: number } = {}
): Promise<UnifiedSearchResult[]> {
  if (!hasReranker() || results.length < 2) return results;
  const topN = Math.min(results.length, opts.topN ?? 40);
  const weight = opts.weight ?? 0.5; // 0.5 = equal blend of semantic vs quality
  const head = results.slice(0, topN);
  const tail = results.slice(topN);

  const reranked = await rerankResults(query, head, topN);
  if (reranked === head) return results; // rerank failed → unchanged

  const blended = reranked
    .map((r) => {
      const quality = r.rankingTrace?.composite ?? r.rrfScore ?? 0;
      const semantic = r.rerankScore ?? 0;
      const score = weight * semantic + (1 - weight) * quality;
      return { r, score, semantic };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ r, score, semantic }) => ({
      ...r,
      rrfScore: Math.round(score * 10000) / 10000,
      rankingTrace: r.rankingTrace
        ? {
            ...r.rankingTrace,
            relevance: Math.round(semantic * 1000) / 1000,
            composite: Math.round(score * 10000) / 10000,
          }
        : r.rankingTrace,
    }));

  return [...blended, ...tail];
}
