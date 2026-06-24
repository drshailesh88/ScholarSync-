# Phase 0/1 build goal — self-hosted MedCPT dense index + freshness machine

Stand up Manan OS's own PubMed dense retrieval index (replacing the throttled
OpenAlex `search.semantic` lane) and the recurring updater that keeps it current.
Companion to `CORPUS-RESEARCH.md` (the research) — this is the build.

## How to run
1. In a **fresh worktree** (kept separate from the parity sprint):
   ```bash
   git worktree add ../ScholarSync-corpus main
   cd ../ScholarSync-corpus
   ```
2. Paste the `/goal` block below into that terminal.
3. Run in one terminal only. The new lane **fails open** to the current lanes, so
   it cannot break live search while being built.

## Accounts / secrets to provision (the build needs these; add to the op-run vault)
- **Modal** (`MODAL_TOKEN_ID` / `MODAL_TOKEN_SECRET`) — scale-to-zero GPU for the MedCPT query encoder + embedding jobs.
- **Turbopuffer** (`TURBOPUFFER_API_KEY`) **OR** Cloudflare **R2** (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, bucket) for LanceDB.
- **Neon** (`NEON_DATABASE_URL`) — serverless Postgres for FTS + metadata.
The agent will pause and tell you exactly which it needs; never hardcode them.

## Decisions locked in
Neon (not Supabase) · low-ops, no VPS · **int8** quant (not binary) · freshness
cadence **WEEKLY** (one-line config) · recency (2024–2026) is a hard exit gate ·
fail-open to current lanes · harness-gated against the 87q floor.

## The goal

```
Build Manan OS's self-hosted MedCPT dense retrieval index + a recurring freshness updater, replacing the throttled OpenAlex `search.semantic` lane. Read docs/literature-search/CORPUS-RESEARCH.md first and build ON the existing 87-query harness (eval/literature-search/), rerank.ts, entity-drift.ts, rank-fusion.ts, and the Docling service — do not rebuild them.

DECIDED STACK (low-ops, no VPS): vectors in Turbopuffer OR LanceDB-on-Cloudflare-R2 (int8 quant, ~99% recall); MedCPT Query-Encoder + all embedding jobs on Modal (scale-to-zero GPU, no idle cost); Postgres FTS + metadata on NEON serverless (NOT Supabase); full-text blobs on R2 (Phase 2). NOT a dedicated box; NOT a per-vector managed DB (Pinecone/Astra); NOT Semantic Scholar.

PHASE 0 — local PubMed lexical lane ($0): ingest the PubMed baseline (NCBI FTP) with pubmed_parser into Neon FTS; expose a new sources/pubmed-local.ts BM25 lane behind the searchX() contract; RRF-fuse with existing lanes. Exit: 87q recall@10 >= the live PubMed E-utilities lane, zero throttling.

PHASE 1 — MedCPT dense lane (the measurement unlock): download NCBI's free precomputed MedCPT PubMed embeddings (~24M, 768-d, through ~2023); build an int8 index in Turbopuffer/LanceDB; serve ncbi/MedCPT-Query-Encoder on Modal for query-time encoding; add sources/medcpt-dense.ts and REPLACE openalex_semantic in DEFAULT_SOURCES; RRF-fuse with the Phase 0 lane; optionally swap rerank.ts to ncbi/MedCPT-Cross-Encoder. Fail-open: if the index is unreachable, fall back to the existing lanes.

BACKFILL + FRESHNESS MACHINE (one job, two uses): build a SINGLE Modal scheduled function that (1) pulls PubMed updatefiles from NCBI FTP, (2) parses new/changed/deleted records (pubmed_parser, honor the delete flag), (3) embeds new/changed title+abstracts with ncbi/MedCPT-Article-Encoder on an on-demand GPU, (4) upserts vectors into the index + drops deleted PMIDs. Run it ONCE over the 2024-2026 gap (~8-9M papers, ~$3-15 one-time) so recent papers are searchable; then schedule it (default WEEKLY; configurable). Same machine for the one-time backfill and ongoing freshness.

HARD CONSTRAINTS: TDD (RED->GREEN); one phase per feature branch + CI-green PR. Verify every library/API with Context7 before coding (MedCPT/HF transformers, Modal, Turbopuffer or LanceDB, Neon serverless driver, faiss/int8 quant). Secrets via op-run only, never hardcoded. int8 not binary. No benchmark gaming/hardcoding. Every result keeps provenance + ranking trace. The local lane fails open to current lanes. Elicit stays eval-only.

DELIVERABLES: sources/pubmed-local.ts + sources/medcpt-dense.ts; the Modal embedding/freshness job; updated SOURCE-MATRIX.md + ARCHITECTURE.md; an ops note (how to re-run the backfill, change cadence, rotate keys); before/after 87q evidence per phase.

DEFINITION OF DONE: openalex_semantic is replaced by the local MedCPT dense lane; on the 87-query frozen-pool harness, nDCG@10 / recall@10 are >= the throttled OpenAlex lane's floor INCLUDING recency queries (2024-2026 papers retrievable), with deterministic latency and zero 429s; the freshness updater is scheduled AND proven on a real delta (new PMIDs embedded + searchable, deleted PMIDs removed); all CI-green and merged; docs updated. No critical regression in metadata, citation reliability, clinical relevance, or reproducibility.
```
