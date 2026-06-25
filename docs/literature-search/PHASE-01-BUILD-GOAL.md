# Phase 1 build goal — self-hosted MedCPT dense index + freshness machine

Stand up Manan OS's own PubMed dense retrieval index (replacing the throttled
OpenAlex `search.semantic` lane) and the recurring updater that keeps it current.
Companion to `CORPUS-RESEARCH.md` (the research) — this is the build.

> **Stack revised 2026-06-25** (see `.planning/decisions/2026-06-25-medcpt-self-hosted-index-stack.md`):
> vectors **and** lexical/BM25 both live in **Turbopuffer** (one store, hybrid
> search). **Neon is dropped** — a 37M-doc PubMed FTS corpus on Neon was costed at
> hundreds/mo, and Turbopuffer does BM25 natively on object storage. LanceDB-on-R2
> was evaluated and rejected (it re-introduces an index lifecycle + a Modal
> keep-warm problem on a scale-to-zero stack). The free live **PubMed E-utilities**
> lane stays as the interim lexical source; self-hosting lexical (Turbopuffer BM25)
> is now optional/deferred, not a blocker.

## How to run
1. The isolated worktree already exists: **`/Users/shaileshsingh/ScholarSync-corpus`**
   on branch `corpus-build-base` (created off `main`). Work there.
   ```bash
   cd /Users/shaileshsingh/ScholarSync-corpus
   ```
2. Paste the `/goal` block below into that terminal.
3. Run in one terminal only. The new lane **fails open** to the current lanes, so
   it cannot break live search while being built. Per-phase feature branch + CI-green PR.

## Accounts / secrets (provisioned 2026-06-25 — all via op-run, never hardcoded)
- **Turbopuffer** (`TURBOPUFFER_API_KEY`) — ✅ in `Agent Vault`, verified. Vector + BM25 store. Region: **`aws-us-east-1`** (colocate with Vercel `iad1` + Modal us-east; constructor arg, trivially changed).
- **Modal** (`MODAL_TOKEN_ID` / `MODAL_TOKEN_SECRET`) — ✅ in `Agent Vault`, live-authenticated. Scale-to-zero GPU for the MedCPT encoders + embedding jobs.
- **Hugging Face** (`HF_TOKEN`) — needed at build time to pull `ncbi/MedCPT-*` models; create a Modal **Secret** to inject it (and `TURBOPUFFER_API_KEY`) into the embedding/freshness function.
- **Cloudflare R2** — only for **Phase 2** full-text blobs; not needed for this phase.
- ~~Neon~~ — **dropped** (see banner above).

## Decisions locked in
Turbopuffer for **both** dense + lexical (BM25) · low-ops, no VPS, scale-to-zero ·
**int8** quant (not binary; ~99% recall, ±0.001 verified) · freshness cadence
**WEEKLY** (one-line config) · recency (2024–2026) is a hard exit gate · fail-open
to current lanes · harness-gated against the 87q floor · PubMed E-utilities is the
interim free lexical lane · Elicit stays eval-only.

## The goal

```
Build Manan OS's self-hosted MedCPT dense retrieval index + a recurring freshness updater, replacing the throttled OpenAlex `search.semantic` lane. Read docs/literature-search/CORPUS-RESEARCH.md first and build ON the existing 87-query harness (eval/literature-search/), rerank.ts, entity-drift.ts, rank-fusion.ts, and the Docling service — do not rebuild them.

DECIDED STACK (low-ops, no VPS, scale-to-zero): dense vectors AND lexical/BM25 both in Turbopuffer (int8 quant, ~99% recall, native hybrid search on object storage — region aws-us-east-1); MedCPT Query-Encoder + all embedding jobs on Modal (scale-to-zero GPU, no idle cost); full-text blobs on R2 (Phase 2 only). NOT Neon (a 37M-doc PubMed FTS corpus there was costed at hundreds/mo; Turbopuffer does BM25 natively); NOT LanceDB-on-R2 (re-introduces index lifecycle + Modal keep-warm on a scale-to-zero stack); NOT a dedicated box; NOT a per-vector managed DB (Pinecone/Astra); NOT Semantic Scholar.

PHASE 1 (PRIORITY — the measurement unlock + the actual throttle fix): download NCBI's free precomputed MedCPT PubMed embeddings (~24M, 768-d, through ~2023); build an int8 index in Turbopuffer; serve ncbi/MedCPT-Query-Encoder on Modal for query-time encoding; add sources/medcpt-dense.ts and REPLACE openalex_semantic in DEFAULT_SOURCES; RRF-fuse with the existing lexical lanes; optionally swap rerank.ts to ncbi/MedCPT-Cross-Encoder. Fail-open: if the index is unreachable, fall back to the existing lanes. This replaces the single binding constraint (OpenAlex semantic throttling — 14/87 queries lost it on the last live run).

BACKFILL + FRESHNESS MACHINE (one job, two uses): build a SINGLE Modal scheduled function that (1) pulls PubMed updatefiles from NCBI FTP, (2) parses new/changed/deleted records (pubmed_parser, honor the delete flag), (3) embeds new/changed title+abstracts with ncbi/MedCPT-Article-Encoder on an on-demand GPU, (4) upserts vectors into Turbopuffer + deletes dropped PMIDs by id. Run it ONCE over the 2024-2026 gap (~8-9M papers, ~$3-15 one-time) so recent papers are searchable; then schedule it (default WEEKLY; configurable). Same machine for the one-time backfill and ongoing freshness.

PHASE 0 (OPTIONAL / DEFERRED — only if PubMed E-utilities reliability becomes the bottleneck): self-host the PubMed lexical lane as a Turbopuffer BM25 namespace (NOT Neon) — ingest the PubMed baseline (NCBI FTP, pubmed_parser), index title+abstract as BM25 in Turbopuffer, expose sources/pubmed-local.ts behind the searchX() contract, hybrid-fuse with the dense lane via multi-query + RRF. Until then, the free live PubMed E-utilities lane (NCBI key) remains the lexical source. Do NOT host a Neon/Postgres FTS box.

HARD CONSTRAINTS: TDD (RED->GREEN); one phase per feature branch + CI-green PR. Verify every library/API with Context7 before coding (MedCPT/HF transformers, Modal, Turbopuffer SDK incl. i8 vector type + BM25/FTS + region config, faiss/int8 quant). Secrets via op-run only, never hardcoded. int8 not binary. No benchmark gaming/hardcoding. Every result keeps provenance + ranking trace. The new lane fails open to current lanes. Elicit stays eval-only.

DELIVERABLES: sources/medcpt-dense.ts (and sources/pubmed-local.ts only if Phase 0 is built, on Turbopuffer BM25); the Modal embedding/freshness job; updated SOURCE-MATRIX.md + ARCHITECTURE.md; an ops note (how to re-run the backfill, change cadence, rotate keys, switch Turbopuffer region); before/after 87q evidence per phase.

DEFINITION OF DONE: openalex_semantic is replaced by the Turbopuffer MedCPT dense lane; on the 87-query frozen-pool harness, nDCG@10 / recall@10 are >= the throttled OpenAlex lane's floor INCLUDING recency queries (2024-2026 papers retrievable), with deterministic latency and zero 429s; the freshness updater is scheduled AND proven on a real delta (new PMIDs embedded + searchable, deleted PMIDs removed); all CI-green and merged; docs updated. No critical regression in metadata, citation reliability, clinical relevance, or reproducibility.
```
