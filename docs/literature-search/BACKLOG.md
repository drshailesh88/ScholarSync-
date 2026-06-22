# Backlog — Remaining Search-Quality Gaps

## Shipped this initiative (status)

**Round 1–2 (ranking & robustness):** de-Semantic-Scholar (default pubmed+openalex,
S2 opt-in; fetch_paper via PubMed/Crossref/OpenAlex); PubMed Best-Match relevance
sort; NL→keyword simplification; trial-acronym `[tiab]` pinning; wired the quality
pipeline (evidence/citations/velocity/journal) + cross-encoder rerank (Cohere,
adaptive/fail-open); OpenAlex citation+PMID/DOI backfill; retraction flag+demote;
provenance/trace/flags; query relaxation; over-fetch; capped Retry-After.

**Root-cause work (recall) — the semantic gap:**
- ✅ **OpenAlex dense semantic lane** (`search.semantic`) — default ON. Corpus-free
  embedding retrieval; validated to surface CLARITY-AD (lecanemab) into top-10.
- ✅ **Citation/PMRA neighbour expansion** — shipped **opt-in** (`expandCitations`);
  slower (sequential wave) so not default until latency work below lands.

**Remaining recall work** is items 1–3 below (multi-query/HyDE, MedCPT, latency).

---


Prioritized by impact ÷ effort. Synthesizes the eval findings, the LLM-council
verdicts, and `SEARCH-METHODOLOGY-RESEARCH.md`. Each item names the file(s) to
touch. Items 1–4 are the highest-leverage next steps.

## P0 — close the residual recall gap the principled way

The root cause is lexical-only stage-1 retrieval (see ETIOLOGY.md). The general fix
(NOT a hardcoded landmark map — that was prototyped and rejected as benchmark-gaming)
is hosted dense retrieval + corpus-free expansion, per the solutions council.

**SHIPPED:** OpenAlex dense semantic lane (default on); citation/PMRA expansion
(opt-in). See COUNCIL-SOLUTIONS.md for the full ranked plan and prior art.

**REMAINING (top priorities):**
1. **Latency / OpenAlex request pacing (token bucket)** ← *blocks making expansion
   default + clean re-validation.* Lexical + semantic + enrichment = 3–4 OpenAlex
   calls/query; under load this 429s and pushes latency to 20–28s. The absurd-
   `Retry-After` hang is fixed (capped) and a basic in-process pace is in, but a
   proper shared token bucket + a short-TTL query cache are needed. Until this lands,
   the citation-expansion lane can't be default and aggregate eval is noisy.
   *Impact: High (perf + measurability) · Effort: S–M · `openalex.ts`, `resilient-fetch.ts`, cache.*
2. **Multi-query / RAG-fusion + HyDE** ← *the general replacement for the rejected
   landmark hack.* One fast LLM call → query variants (acronyms / synonyms / MeSH /
   timepoint-stripped / PICO) + optional hypothetical-abstract; fan out existing
   retrievers; reuse RRF. The model supplies domain knowledge for every topic.
   *Impact: High · Effort: S · `query-planner.ts` (+ AI SDK). Fail-open.*
3. **MedCPT on-the-fly (SOTA biomedical), behind a small sidecar** — bi-encoder KNN
   over the query-time pool + cross-encoder rerank; A/B vs Cohere & Voyage rerank-2.5.
   No standing index. *Impact: Med-High · Effort: L (Python/HF sidecar).*

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
