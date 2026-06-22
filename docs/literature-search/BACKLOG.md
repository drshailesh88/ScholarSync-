# Backlog — Remaining Search-Quality Gaps

Prioritized by impact ÷ effort. Synthesizes the eval findings, the LLM-council
verdicts, and `SEARCH-METHODOLOGY-RESEARCH.md`. Each item names the file(s) to
touch. Items 1–4 are the highest-leverage next steps.

## P0 — landmark recall (the one place Elicit still beats us)

The council's only losses (TAVR seed, lecanemab) were **missing the landmark RCT
in the top 10** (PARTNER 3; CLARITY-AD). Round-2 investigation showed the TAVR
loss is a **retrieval** gap, not a ranking one — PARTNER 3 (2019) is never *fetched*
for "TAVR low risk six year outcomes", so no reranker can surface it.

**SHIPPED in Round 2 (done):**
- ✅ **Citation velocity** signal (`citations ÷ years-since-pub`) in the composite + trace.
- ✅ **Cross-encoder rerank as dominant relevance** (`attachRerankScores` → composite
  relevance 0.40), with **adaptive weights**: relevance-dominant only when a rerank
  score is present; otherwise the *exact validated* weights (no regression risk).
- ✅ **Recency blend** (0.65 quality / 0.35 recency) replacing the blunt year-sort.

**REMAINING (now the real top priorities):**
1. **Landmark/seed-trial query expansion** ← *the actual fix for the TAVR loss.*
   When the planner detects a well-known topic ("TAVR low risk"), expand retrieval
   with canonical trial names (PARTNER, Evolut) the way drug-class→drug-name
   expansion already works — so the landmark is *fetched*, then ranked.
   *Impact: High · Effort: S · `query-expander.ts`, `query-planner.ts`.*
2. **Over-fetch + rerank** — retrieve ~25–40 candidates/source, rerank, slice to the
   page, so a landmark at PubMed rank 12 can still reach the top 10. (Preserve web
   pagination semantics.)
   *Impact: Med-High · Effort: S · `run-search.ts`.*
3. **OpenAlex request pacing / shared token bucket** ← *blocks clean re-validation.*
   Search + enrichment = 2–3 OpenAlex calls/query; under load this 429s and makes
   eval runs slow/noisy. The absurd-`Retry-After` hang is fixed (capped); pacing is
   the remaining piece. Until this lands, the Cohere uplift can't be measured cleanly.
   *Impact: Med (reliability + measurability) · Effort: S · `openalex.ts`, `resilient-fetch.ts`.*

## P1 — ranking correctness

5. **Source-trust-weighted RRF** — PubMed Best-Match is a tuned learning-to-rank
   model; RRF currently gives it an equal vote with OpenAlex's plainer relevance,
   diluting it. Weight per source (PubMed > OpenAlex), or let the cross-encoder be
   the final arbiter and use RRF only for candidate recall.
   *Impact: Med · Effort: XS · `rank-fusion.ts`, `run-search.ts`.*
6. **PubMed publication types as authoritative study type** whenever a PMID exists
   (OpenAlex `type` under-classifies as "article"/"review"). Already mapped in
   `mapPubMedPublicationType`; make it the source of truth in enrichment.
   *Impact: Med · Effort: S · `study-type-detector.ts`, `pubmed.ts`.*
7. **Latest-version preference for guidelines** — council noted the 2016 ESC AF
   guideline ranked above the 2024 one. For guideline intent, boost the most recent
   authoritative version.
   *Impact: Med · Effort: S · `pipeline.ts` (guideline-aware recency), `query-planner.ts`.*
8. **MMR diversity pass** (token-Jaccard, λ≈0.3) on the top-N so the page isn't ten
   near-identical meta-analyses of the same trial.
   *Impact: Low-Med · Effort: S · `pipeline.ts` (post-rank).*

## P2 — coverage, trust, metadata

9. **Crossref Retraction Watch enrichment by DOI** for results (not just `fetch_paper`)
   — batch-check DOIs and flag `retracted`/`has_erratum`. PubMed pubtypes already
   flag where a PMID exists; this extends coverage to DOI-only/OpenAlex results.
   *Impact: Med (trust) · Effort: S · `sources/crossref.ts`, `run-search.ts`, `pipeline.ts`.*
10. **Dynamic MeSH expansion** via NCBI E-utilities (replace the static
    drug-class synonym map with fetched MeSH entry terms).
    *Impact: Med · Effort: M · `query-expander.ts`.*
11. **LLM query→boolean expansion (lightweight HyDE)** for the fallback query
    (NL → richer MeSH/keyword strategy), opt-in.
    *Impact: Med · Effort: S · `query-planner.ts`.*
12. **PICO extraction of the query** (the `pico` field exists but is unpopulated) to
    drive expansion + a structured "why relevant".
    *Impact: Low-Med · Effort: M · `query-planner.ts`, `pipeline.ts`.*

## P3 — reranking depth / infra

13. **Opt-in LLM listwise rerank** on the top-10 behind a "deep search" toggle
    (Undermind/Consensus precision stage). Never default (latency/cost).
    *Impact: Med · Effort: M · new `llm-rerank.ts`, `pipeline.ts`.*
14. **MedCPT cross-encoder** as a free, biomedical, self-hosted reranker
    (alternative/fallback to Cohere; zero per-query API spend).
    *Impact: Med · Effort: L · new `rerank-medcpt.ts` behind the `rerank.ts` interface.*
15. **Dense semantic first-stage retrieval over a pre-embedded corpus** — true
    Elicit-parity recall. The one genuinely infra-heavy item (vector store +
    embedding pipeline over millions of records). **Deferred — not cost-justified.**
    *Impact: High · Effort: XL.*

## Engineering / reliability

16. **Latency** — improved p50 rose from ~2.0s to ~3.9s (extra OpenAlex enrich
    call + Cohere). Parallelize the enrichment with a second fan-out wave, add a
    short-TTL cache for repeated queries, and tune per-source timeouts.
    *Impact: Med · Effort: M · `run-search.ts`, new cache.*
17. **OpenAlex 429 handling** — under `op-run` (faster) OpenAlex rate-limited and
    returned an absurd `Retry-After` (~12h). The retry delay is now capped
    (`resilient-fetch.ts`), but also add request pacing / a shared token bucket for
    OpenAlex (search + enrich are 2 calls/query).
    *Impact: Med · Effort: S · `resilient-fetch.ts` (done: cap), `openalex.ts` (pacing).*
18. **Expand the eval ground truth** — only 12/34 benchmark queries have verified
    must-haves; verify landmark identifiers for the rest (and add graded relevance)
    to sharpen recall@10 / nDCG.
    *Impact: Med (measurement) · Effort: M · `eval/literature-search/queries.ts`.*
19. **Widen the LLM council** to all 34 queries and persist judge runs over time to
    track quality as a regression metric.
    *Impact: Med · Effort: M · `eval/literature-search/` council tooling.*

## Known limitations (honest)

- We match **Elicit's reranking, not its corpus pre-embedding** — for exhaustive
  systematic-review-grade recall over the whole literature, a dense index (item 15)
  is still the gap.
- No full-text retrieval/screening (out of scope: no proprietary full text).
- Deterministic recall@10 is only as good as the verified must-have set (item 18).
