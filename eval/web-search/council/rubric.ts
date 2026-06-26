import type { WebTab } from "../types";

/** The six objective, checkable web dimensions (replaces the biomedical rubric). */
export const DIMS = ["relevance", "authority", "recency", "diversity", "dedup", "usefulness"] as const;
export type WebDimScores = Record<(typeof DIMS)[number], number>;

export const SCORING_PREAMBLE = `You are an impartial judge comparing TWO anonymous web-search engines,
**Engine A** and **Engine B**, on the SAME query. You do NOT know which engine is which and must not
guess or speculate about their identity. Judge ONLY the result lists shown (each row is title · domain ·
date · snippet). Use the listed must-have results as the ground-truth relevance anchor.

Score EACH engine 0–5 (5 = best) on these six dimensions:
1. **relevance** — are the on-topic / must-have results present in the top 10; few off-topic items?
2. **authority** — credible sources for this query (official/agency/primary/reputable outlet or a real
   community), not SEO/marketing/content-farm pages.
3. **recency** — is the date-appropriateness right for the query (fresh where freshness matters; not stale)?
4. **diversity** — no single-domain/outlet/platform flood; a healthy spread of sources.
5. **dedup** — no duplicate URLs and no near-duplicate same-wire-story repeats.
6. **usefulness** — would the top 10 actually help a research-adjacent user act on this query?

Then pick a **winner** per query: "A", "B", or "tie".`;

const COMMON_TAIL = `Penalize a missing must-have and penalize off-topic / low-authority items in the top 10.`;

export const RUBRIC_BY_TAB: Record<WebTab, string> = {
  web: `**Tab = web (general).** Weight relevance and authority most. Recency matters little unless the query
implies it. ${COMMON_TAIL}`,
  news: `**Tab = news.** Weight recency highly: prefer recent reporting from real outlets and penalize stale or
undated items; also weight outlet diversity and same-wire-story dedup. ${COMMON_TAIL}`,
  discussions: `**Tab = discussions.** Authority means a REAL community thread (Reddit/HN/StackExchange), not an
SEO Q&A farm; weight platform diversity (don't flood one platform). ${COMMON_TAIL}`,
};

export const OUTPUT_SCHEMA = `## Output format (STRICT)

Return ONLY a JSON object — no prose, no markdown fences — of EXACTLY this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "A": {"relevance":0-5,"authority":0-5,"recency":0-5,"diversity":0-5,"dedup":0-5,"usefulness":0-5},
      "B": {"relevance":0-5,"authority":0-5,"recency":0-5,"diversity":0-5,"dedup":0-5,"usefulness":0-5},
      "winner": "A" | "B" | "tie",
      "note": "<one sentence justification, no identity guessing>"
    }
  ],
  "overall": {"winner":"A"|"B"|"tie","summary":"<2-3 sentences>"}
}`;
