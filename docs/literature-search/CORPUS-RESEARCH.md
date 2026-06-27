# Corpus Research — self-hosted MedCPT dense retrieval (read this first)

The research substrate behind `PHASE-01-BUILD-GOAL.md`. Consolidated 2026-06-25 from
the deeper docs (linked below) plus the Turbopuffer/Neon cost+capability analysis run
this session. This doc is the "read first" for the build; the linked docs are the
long-form evidence.

## Why we are building this (the binding constraint)
The parity sprint (`PARITY-SPRINT-STATUS.md`) ratcheted ranking quality across 6
cycles, but three live 87-query runs were dominated by **OpenAlex throttling** — the
`search.semantic` lane was lost on **14/87 queries**, degrading candidate pools,
causing phantom metric swings, and producing transient empty result sets. This is
now the **dominant blocker for both product quality and measurement**. PubMed
E-utilities (lexical) was never the throttle problem; **OpenAlex semantic is.**

Recall is capped at stage 1: a paper sharing zero surface terms with the query is in
no candidate set, so no reranker (Cohere, MedCPT cross-encoder) can recover it. We
need a dense first-stage lane whose retrieval happens in embedding space — and one we
**own**, so it can't be throttled away. That is the MedCPT self-hosted index.

## The constraint reversal (important context)
The earlier research — `council-solutions/{oss,apis,algorithms}.md` and the
`apis.md` shortlist — was written under a **hard "do NOT self-host an index"**
constraint, and therefore *parked* MedCPT and recommended hosted APIs (OpenAlex
semantic, Elicit, Exa) instead. **That constraint is now deliberately lifted.** The
reasons it was safe to lift it:
- NCBI publishes **precomputed MedCPT PubMed embeddings** (~24M articles, 768-d,
  through ~2023) for free — we don't have to embed the historical corpus ourselves.
- Object-storage-native vector DBs (Turbopuffer) make a 30M-vector int8 index a
  low-ops, ~tens-of-dollars/month proposition — not the "host a PubMed-scale FAISS
  box" that the original constraint was protecting against.
- The lane **fails open**, so self-hosting adds capability without adding a hard
  dependency on the live path.

## The corpus + models (NCBI MedCPT)
- **MedCPT** (`ncbi/MedCPT-*`) is the SOTA zero-shot biomedical retriever, trained on
  255M PubMed click logs. Three pieces:
  - **Query-Encoder** — encodes the query at request time (served on Modal GPU).
  - **Article-Encoder** — embeds new/changed title+abstracts in the freshness job.
  - **Cross-Encoder** — optional biomedical rerank, a drop-in swap for Cohere in
    `rerank.ts` (pluggable, fail-open stage — see `ARCHITECTURE.md`).
- **Precomputed embeddings**: ~24M PubMed articles, 768-d, through ~2023 — ingested
  directly. The **2024–2026 gap (~8–9M papers)** is closed by running the freshness
  job once over that window (~$3–15 one-time GPU). Recency (2024–2026 retrievable) is
  a **hard exit gate**.

## Decided stack (low-ops, no VPS, scale-to-zero)
Full rationale: `.planning/decisions/2026-06-25-medcpt-self-hosted-index-stack.md`.

| Concern | Choice | Why |
|---|---|---|
| Vectors **and** lexical/BM25 | **Turbopuffer** (one store, hybrid) | Object-storage-native, native `i8` int8 (75% cost cut, ±0.001 quality), native BM25; managed → zero index lifecycle; keeps the live lane warm + **decoupled from Modal cold starts**; fails open. |
| Query encoding + embedding jobs | **Modal** | Scale-to-zero GPU, no idle cost; one job does the one-time backfill *and* the weekly freshness. |
| Full-text blobs | **R2** (Phase 2 only) | Zero egress; not needed for this phase. |
| ~~FTS + metadata~~ | ~~**Neon**~~ **dropped** | A 37M-doc PubMed FTS corpus on Neon was costed at **hundreds/mo** (≈$70 storage + warm compute to ~$300). Turbopuffer does BM25 natively; metadata rides as Turbopuffer document attributes. |
| Rejected: LanceDB-on-R2 | — | Cheapest at rest, but re-introduces an index lifecycle (compaction/versioning) **and** a Modal keep-warm problem on a scale-to-zero stack — fighting the mandate the build exists to honor. Revisit only at very high sustained query volume. |

Quantization: **int8, not binary** — ~99% recall, vectors 4× smaller, same latency,
retrieval delta within ±0.001 on Turbopuffer's `i8` type.

## Lexical lane: interim vs self-hosted
- **Now:** keep the free live **PubMed E-utilities** lane (NCBI key) — reliable, $0,
  no corpus to host. The dense lane (Phase 1) is the priority because it fixes the
  *actual* binding constraint.
- **Later (optional):** if PubMed E-utilities reliability becomes a bottleneck,
  self-host the lexical lane as a **Turbopuffer BM25** namespace and hybrid-fuse
  (multi-query + RRF) with the dense lane — one store, never a Neon FTS box.

## Build on what exists (do not rebuild)
`eval/literature-search/` (87q frozen-pool harness) · `rerank.ts` (pluggable rerank) ·
`entity-drift.ts` · `rank-fusion.ts` (RRF, k=60) · the Docling service ·
`UnifiedSearchResult` spine + `searchX()` source contract (`ARCHITECTURE.md`). Every
new lane is fail-open, returns a typed `SourceStatus`, and writes its signals to
`rankingTrace` (explainability is non-negotiable).

## Definition of done (measurement-gated)
`openalex_semantic` replaced by the Turbopuffer MedCPT dense lane; on the 87q
frozen-pool harness, nDCG@10 / recall@10 ≥ the throttled OpenAlex floor **including
recency queries**, deterministic latency, zero 429s; freshness updater scheduled AND
proven on a real delta; CI-green + merged; no regression in metadata, citation
reliability, clinical relevance, or reproducibility.

## Deeper sources
- `SEARCH-METHODOLOGY-RESEARCH.md` — the evidence base (recall vs rerank, Best-Match, etc.)
- `council-solutions/oss.md` — OSS prior art (MedCPT, pyserini, ELSER, ColBERT…), under the old no-index constraint
- `council-solutions/apis.md` — hosted-API shortlist (OpenAlex semantic, Elicit, Exa…), under the old no-index constraint
- `council-solutions/algorithms.md` — ranking/fusion algorithm notes
- `ARCHITECTURE.md` — the pipeline as built + the extensibility contracts
- `PARITY-SPRINT-STATUS.md` — the cycle history + the throttling diagnosis that motivated this build
