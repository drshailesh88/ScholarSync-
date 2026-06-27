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

/** True when SOME reranker is configured (self-hosted MedCPT, LangSearch, or Cohere). */
export function hasReranker(): boolean {
  return Boolean(
    process.env.MEDCPT_RERANK_URL ||
      process.env.LANGSEARCH_API_KEY ||
      process.env.COHERE_API_KEY
  );
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

/**
 * LangSearch Semantic Rerank (free, no monthly cap). Always-warm cloud service —
 * a resilient fallback that, unlike the scale-to-zero MedCPT reranker, has no cold
 * start, and unlike the Cohere Trial key has no monthly quota. Returns documents
 * (not indices), so we map each returned document back to its original position by
 * an explicit `index` when present, else by document text (consuming duplicates in
 * order). General-purpose (not biomedical), so it sits below MedCPT in the chain.
 */
async function rerankLangSearch(
  apiKey: string,
  query: string,
  documents: string[],
  topN: number
): Promise<RerankScore[]> {
  const res = await resilientFetch(
    "https://api.langsearch.com/v1/rerank",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "langsearch-reranker-v1",
        query,
        top_n: topN,
        return_documents: true,
        documents,
      }),
    },
    { service: "LangSearch", timeout: 10000, maxRetries: 2 }
  );
  const data: {
    reranked_documents?: { document?: string; score?: number; index?: number }[];
  } = await res.json();
  const ranked = Array.isArray(data?.reranked_documents)
    ? data.reranked_documents
    : [];

  const indicesByText = new Map<string, number[]>();
  documents.forEach((doc, i) => {
    const list = indicesByText.get(doc) ?? [];
    list.push(i);
    indicesByText.set(doc, list);
  });

  const scored: RerankScore[] = [];
  for (const item of ranked) {
    const index =
      typeof item.index === "number"
        ? item.index
        : indicesByText.get(item.document ?? "")?.shift();
    if (typeof index !== "number") continue;
    scored.push({ index, relevance_score: item.score ?? 0 });
  }
  return scored
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
 * Rerank by query↔document relevance through a fail-open backend CHAIN, in priority
 * order: self-hosted MedCPT Cross-Encoder (`MEDCPT_RERANK_URL`, biomedical) →
 * LangSearch (`LANGSEARCH_API_KEY`, free/always-warm) → Cohere (`COHERE_API_KEY`).
 * Each backend is tried only if configured; if it errors or yields no usable
 * scores, the next is attempted. With none configured — or all failing — the input
 * is returned unchanged. The chain matters operationally: the MedCPT reranker is
 * scale-to-zero (a ~20s cold start would otherwise drop reranking entirely), so a
 * warm LangSearch fallback preserves ordering quality across cold windows.
 */
export async function rerankResults(
  query: string,
  results: UnifiedSearchResult[],
  topN?: number
): Promise<UnifiedSearchResult[]> {
  const medcptUrl = process.env.MEDCPT_RERANK_URL;
  const langSearchKey = process.env.LANGSEARCH_API_KEY;
  const cohereKey = process.env.COHERE_API_KEY;
  if (results.length === 0 || (!medcptUrl && !langSearchKey && !cohereKey)) {
    return results;
  }

  const limit = topN || Math.min(results.length, 50);
  const documents = results.map(
    (r) => `${r.title}. ${r.abstract || r.tldr || ""}`
  );

  const backends: { name: string; run: () => Promise<RerankScore[]> }[] = [];
  if (medcptUrl)
    backends.push({
      name: "MedCPT",
      run: () => rerankMedcpt(medcptUrl, query, documents, limit),
    });
  if (langSearchKey)
    backends.push({
      name: "LangSearch",
      run: () => rerankLangSearch(langSearchKey, query, documents, limit),
    });
  if (cohereKey)
    backends.push({
      name: "Cohere",
      run: () => rerankCohere(cohereKey, query, documents, limit),
    });

  for (const backend of backends) {
    try {
      const scored = await backend.run();
      if (scored.length === 0) continue;
      return scored.map((r) => ({
        ...results[r.index],
        rerankScore: r.relevance_score,
      }));
    } catch (error) {
      console.error(`Rerank error (${backend.name}):`, error);
    }
  }
  return results;
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
