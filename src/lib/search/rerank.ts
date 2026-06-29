import type { UnifiedSearchResult } from "@/types/search";
import { resilientFetch } from "@/lib/http/resilient-fetch";

interface CohereRerankResponse {
  results: {
    index: number;
    relevance_score: number;
  }[];
}

/** A relevance score paired to a candidate's index in the input list. The score
 * is ALWAYS a [0,1] relevance probability regardless of backend — Cohere returns
 * that natively; the MedCPT cross-encoder returns a raw logit which we squash here
 * (see {@link logitToProbability}) so downstream ranking treats every backend the
 * same and never sees an unbounded value. */
type RerankScore = { index: number; relevance_score: number };

/** Squash a cross-encoder relevance logit (MedCPT range ≈ −16…+10) into the [0,1]
 * probability that `relevance_score` is contracted to carry. Sigmoid is the standard
 * read-out for a single-logit relevance classifier and is monotonic, so it never
 * changes the sort order — only the magnitude, so the score is commensurate with the
 * other [0,1] signals in the quality composite instead of dominating them. */
function logitToProbability(logit: number): number {
  return 1 / (1 + Math.exp(-logit));
}

/** True when SOME reranker is configured (self-hosted MedCPT or Cohere). */
export function hasReranker(): boolean {
  return Boolean(process.env.MEDCPT_RERANK_URL || process.env.COHERE_API_KEY);
}

/**
 * Self-hosted cross-encoder (Modal, scale-to-zero) — biomedical MedCPT for the
 * literature path, general bge-reranker for the web path. Both expose the same
 * contract: a raw relevance LOGIT per document IN INPUT ORDER (range ≈ −16…+10),
 * which we squash to a [0,1] probability ({@link logitToProbability}) — the contract
 * every backend's `relevance_score` honors — then pair to indices, sort desc, and
 * trim to `topN`. Throttle-proof — no external rate limit. `service` is the
 * circuit-breaker/log label so each domain's lane is isolated. Fail-open: a cold
 * start that exceeds the timeout (or any error) throws so the caller keeps order.
 */
async function rerankSelfHosted(
  url: string,
  query: string,
  documents: string[],
  topN: number,
  service: string
): Promise<RerankScore[]> {
  const res = await resilientFetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, documents }),
    },
    { service, timeout: 15000, maxRetries: 1 }
  );
  const data: { scores?: number[] } = await res.json();
  const scores = Array.isArray(data?.scores) ? data.scores : [];
  return scores
    .map((logit, index) => ({ index, relevance_score: logitToProbability(logit) }))
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
 * Rerank by query↔document relevance through a fail-open backend CHAIN. The leading
 * self-hosted backend is DOMAIN-ROUTED: the web path (`domain: "web"`) uses the
 * general cross-encoder (`WEB_RERANK_URL`); the literature path (default) uses the
 * biomedical MedCPT cross-encoder (`MEDCPT_RERANK_URL`) — a query is never reranked
 * by the wrong-domain model. Each domain uses its own circuit-breaker label so an
 * outage in one lane can't trip the other. Cohere (`COHERE_API_KEY`) is the warm
 * fallback for either during the scale-to-zero cold window. A backend is tried only
 * if configured; if it errors or yields no scores, the next is attempted. With none
 * configured — or all failing — the input is returned unchanged and the quality
 * ranker falls back to keyword-overlap relevance: the "no model, never fails" floor.
 */
export async function rerankResults(
  query: string,
  results: UnifiedSearchResult[],
  topN?: number,
  opts?: { domain?: "web" | "literature" }
): Promise<UnifiedSearchResult[]> {
  const isWeb = opts?.domain === "web";
  const selfHostedUrl = isWeb
    ? process.env.WEB_RERANK_URL
    : process.env.MEDCPT_RERANK_URL;
  const cohereKey = process.env.COHERE_API_KEY;
  if (results.length === 0 || (!selfHostedUrl && !cohereKey)) {
    return results;
  }

  const limit = topN || Math.min(results.length, 50);
  const documents = results.map(
    (r) => `${r.title}. ${r.abstract || r.tldr || ""}`
  );

  const backends: { name: string; run: () => Promise<RerankScore[]> }[] = [];
  if (selfHostedUrl)
    backends.push({
      name: isWeb ? "WebReranker" : "MedCPT",
      run: () =>
        rerankSelfHosted(
          selfHostedUrl,
          query,
          documents,
          limit,
          isWeb ? "Web-Rerank" : "MedCPT-Rerank"
        ),
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
