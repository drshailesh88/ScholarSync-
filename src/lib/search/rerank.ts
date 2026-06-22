import type { UnifiedSearchResult } from "@/types/search";
import { resilientFetch } from "@/lib/http/resilient-fetch";

interface CohereRerankResponse {
  results: {
    index: number;
    relevance_score: number;
  }[];
}

export async function rerankResults(
  query: string,
  results: UnifiedSearchResult[],
  topN?: number
): Promise<UnifiedSearchResult[]> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey || results.length === 0) {
    return results;
  }

  try {
    const documents = results.map(
      (r) => `${r.title}. ${r.abstract || r.tldr || ""}`
    );

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
          top_n: topN || Math.min(results.length, 50),
          return_documents: false,
        }),
      },
      { service: "Cohere", timeout: 10000, maxRetries: 2 }
    );

    const data: CohereRerankResponse = await response.json();

    const reranked: UnifiedSearchResult[] = data.results.map((r) => ({
      ...results[r.index],
      rerankScore: r.relevance_score,
    }));

    return reranked;
  } catch (error) {
    console.error("Cohere rerank error:", error);
    return results;
  }
}

/**
 * Attach the Cohere cross-encoder relevance score to each candidate (top `topN`)
 * as `rerankScore`, WITHOUT reordering — so the quality ranker can use it as the
 * dominant relevance signal. Mutates and returns the input. Fail-open: with no
 * COHERE_API_KEY or on error, returns the input unchanged (scores absent → the
 * ranker falls back to keyword overlap).
 */
export async function attachRerankScores(
  query: string,
  results: UnifiedSearchResult[],
  topN = 50
): Promise<UnifiedSearchResult[]> {
  if (!process.env.COHERE_API_KEY || results.length < 2) return results;
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
 * Blended cross-encoder rerank: combine the Cohere relevance score (semantic
 * query↔document match) with the clinical-quality composite (evidence level +
 * citations + journal + RRF) from the ranking pipeline. This is the recommended
 * hybrid — the cross-encoder fixes "topically relevant but not the answer"
 * ordering, while the quality priors keep landmark/high-evidence papers on top.
 *
 * Only the top `topN` candidates are sent to the cross-encoder (latency/cost);
 * the tail keeps its quality order. Fail-open: with no COHERE_API_KEY or on any
 * error, the input ordering is returned unchanged.
 */
export async function crossEncoderRerank(
  query: string,
  results: UnifiedSearchResult[],
  opts: { topN?: number; weight?: number } = {}
): Promise<UnifiedSearchResult[]> {
  if (!process.env.COHERE_API_KEY || results.length < 2) return results;
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
