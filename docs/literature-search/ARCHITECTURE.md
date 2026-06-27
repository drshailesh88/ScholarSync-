# Architecture Note — Continuing to Improve Manan OS Search Without Elicit

This note explains the search pipeline as built, the contracts that keep it
extensible, and how to keep improving it toward (and past) Elicit-level quality
**without ever depending on Elicit or Semantic Scholar.**

## The pipeline (as built)

Single orchestrator, two transports. Both the web API (`/api/research/search`)
and the MCP tool (`/api/mcp` → `searchPapers`) call `runLiteratureSearch()` in
`src/lib/search/run-search.ts`. Fix it once, both improve.

```
planQuery(query)                         src/lib/search/query-planner.ts
  → recency? trial-acronym? guideline?    (NL→keyword simplify, [tiab] acronym pin,
    wantsTrials? wantsWeb?                  MeSH/synonym expansion, sort selection)
        │
RETRIEVE (parallel fan-out, per-source timeout + circuit breaker)
  PubMed Best-Match (relevance|date)      sources/pubmed.ts   [REQUIRED]
  OpenAlex (citations, OA, concepts)      sources/openalex.ts [default]
  MedCPT dense (self-hosted, by meaning)  sources/medcpt-dense.ts [internal, fail-open]
  ClinicalTrials.gov (if wantsTrials)     sources/clinical-trials.ts
  Tavily web lane (if wantsWeb + key)     sources/tavily.ts   [trust-tiered]
  Semantic Scholar (only if requested)    sources/semantic-scholar.ts [opt-in]
        │  capture per-source SourceStatus
FUSE   reciprocalRankFusion (k=60)        rank-fusion.ts   → dedup via isSamePaper
        │
ENRICH enrichCitationsByIds (OpenAlex     sources/openalex.ts
        by PMID/DOI: citations, PMID/DOI
        backfill, OA, concepts) — fail-open
        │
RERANK — attach bounded relevance          rerank.ts → attachRerankScores
  MedCPT Cross-Encoder (self-hosted) →      logit squashed to [0,1] at the adapter;
  Cohere fallback, on top ~50              one CAPPED relevance signal (no raw logit
  (skipped for trial-acronym / recency)    that dominates). Fail-open: every backend
        │                                  errors → keyword-overlap relevance stands
RANK + ANNOTATE                            pipeline.ts (pure, unit-tested)
  enrichStudyTypes → enrichJournalQuality   (journal-quality now resolves ISO
  → rankWithTrace (quality composite)        abbreviations, e.g. N Engl J Med → Q1)
     relevance signal = bounded rerank      quality-ranker.ts (metadata-dominant:
     score (w=0.30), metadata dominates     evidence/RRF 0.25, relevance 0.30)
  → flags (missing meta + retraction)      pipeline.ts buildFlags
  → whyRelevant (deterministic template)
  → demote retracted (never drop)
        │
FILTER studyTypes / fullTextOnly → map → LiteraturePaper (+ url, id, provenance)
        │
RETURN results[] + sourceCounts + sourceStatuses + plan
```

Every result carries: `sources[]` (provenance), `rankingTrace` (per-signal
breakdown + strategy), `flags[]` (missing metadata / retraction), and
`whyRelevant` (deterministic rationale). Rankings are explainable and traceable.

## Design contracts that make it extensible

1. **`UnifiedSearchResult` is the spine** (`src/types/search.ts`). Every source
   maps into it; every ranking stage reads/writes it. New sources only need a
   `searchX(): { results: UnifiedSearchResult[]; total; status }`.
2. **Sources are independent + fail-open.** Each has a circuit breaker,
   `resilientFetch` (now with a capped retry delay), and returns a typed
   `SourceStatus`. A dead source degrades the result; it never throws the search.
3. **Ranking is a pure function** (`pipeline.ts` / `quality-ranker.ts`). It takes
   fused results + query and returns ranked+annotated results — no I/O — so every
   ranking change is unit-testable deterministically (`__tests__/pipeline.test.ts`).
4. **The reranker is a pluggable, fail-open CHAIN** (`rerank.ts`). Self-hosted
   MedCPT Cross-Encoder (primary) → Cohere (fallback). Each backend's score is
   normalized to a `[0,1]` relevance probability (MedCPT's logit is sigmoid-squashed
   at the adapter; Cohere is already `[0,1]`), so it is ONE *capped* signal in the
   metadata-dominant composite — never a raw logit that buries landmark answers.
   If every backend errors or is unconfigured, the keyword-overlap relevance + the
   quality composite stand — the "no model, never fails" floor.
5. **The query planner is the single place for intent** — add new intents
   (e.g. "diagnostic accuracy", "dose") and routing there.

## How to keep improving (the loop)

The eval harness IS the improvement engine. The cycle:

```
1. op-run -- npm run eval:search -- --label <before>     # baseline
2. make ONE coherent change (a backlog item)
3. op-run -- npm run eval:search -- --label <after>
4. npx tsx eval/literature-search/rescore.ts <before> <after>   # if metrics changed
5. compare summary.md (recall@10, nDCG, MRR, dup/caseRep, fill rates, latency)
6. rebuild council packet + re-judge for semantic confirmation
7. keep iff deterministic + council metrics improve without regressions
```

- **Deterministic metrics** (`src/lib/search/eval/metrics.ts`) are the fast inner
  loop: recall@10, nDCG@10, MRR, DOI/PMID fill, duplicate/case-report rate,
  lexical coverage, latency.
- **The LLM council** (Opus + Codex + Grok, comparing vs Elicit snapshots) is the
  outer, semantic loop — run it on a representative subset before committing a
  ranking change.

## Replacing Elicit's "secret sauce" without Elicit

Elicit's edge is a **pre-embedded ~100M-paper corpus** for dense recall. Manan
gets first-stage recall from PubMed Best-Match (itself a LambdaMART
learning-to-rank model trained on NIH-scale click logs) + OpenAlex citation
recall + the **self-hosted MedCPT dense lane** (below), and closes the
*precision* gap with a cross-encoder rerank on the fused candidates — the same
technique Elicit/Consensus/Undermind use. See `SEARCH-METHODOLOGY-RESEARCH.md`
for the evidence base.

The S2-independent dense corpus is now **built, not deferred**: a self-hosted
**MedCPT** retriever (NCBI, trained on 255M PubMed click logs) provides true
dense first-stage recall by *meaning* — `sources/medcpt-dense.ts` encodes the
query on a Modal-served MedCPT Query-Encoder and ANN-queries an int8 Turbopuffer
namespace of NCBI's precomputed PubMed embeddings (kept current by a weekly Modal
freshness updater). This **replaced the throttled OpenAlex `search.semantic`
lane** — the lane we now own cannot be rate-limited away. The MedCPT
Cross-Encoder remains a drop-in `rerank.ts` alternative to A/B against Cohere.
Operational runbook: `infra/modal/OPS.md`.

## Guardrails to never regress

- Semantic Scholar stays out of `DEFAULT_SOURCES`. The eval includes runs that
  prove parity without it.
- Elicit is import-forbidden in `src/` (benchmark/eval only).
- Missing metadata is flagged (`buildFlags`), never invented.
- Retracted papers are flagged + demoted, never silently dropped.
- Every new ranking signal must show up in `rankingTrace` (explainability).
