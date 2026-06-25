# Project State

## Current Initiative
**Self-hosted MedCPT dense retrieval index** (academic search vs Elicit) — corpus build.
Branch: `corpus-build-base` (worktree `/Users/shaileshsingh/ScholarSync-corpus`).
Status: **provisioning complete, build NOT yet started.**

## Why
Academic literature search has plateaued on **source reliability / measurement**:
OpenAlex `search.semantic` was throttled away on 14/87 queries across three live runs,
capping recall and poisoning the benchmark. Fix = own the dense lane instead of renting
a throttled one. See `docs/literature-search/PARITY-SPRINT-STATUS.md`.

## Stack (decided 2026-06-25)
- Vectors **and** lexical/BM25: **Turbopuffer** (one store, hybrid, int8, region `aws-us-east-1`) — provisioned ✅
- Encoders + embedding/freshness jobs: **Modal** (scale-to-zero GPU) — provisioned ✅
- Full-text blobs: **R2** (Phase 2 only)
- **Neon dropped** (Turbopuffer does BM25; a Neon PubMed FTS corpus was ~$hundreds/mo)
- LanceDB-on-R2 evaluated + rejected (index lifecycle + Modal keep-warm on scale-to-zero)
- Interim lexical: free live **PubMed E-utilities**
- Decision record: `.planning/decisions/2026-06-25-medcpt-self-hosted-index-stack.md`

## Source Documents
- Build goal: `docs/literature-search/PHASE-01-BUILD-GOAL.md`
- Research (read first): `docs/literature-search/CORPUS-RESEARCH.md`
- Parity sprint status: `docs/literature-search/PARITY-SPRINT-STATUS.md`
- Architecture + contracts: `docs/literature-search/ARCHITECTURE.md`
- Eval harness: `eval/literature-search/` (87q frozen-pool)

## Next action
In `/Users/shaileshsingh/ScholarSync-corpus`, paste the `/goal` block from
`PHASE-01-BUILD-GOAL.md` to start Phase 1 (MedCPT dense lane → Turbopuffer, replacing
`openalex_semantic`). Create the Modal Secret (`HF_TOKEN` + `TURBOPUFFER_API_KEY`) when
the build asks. TDD; per-phase feature branch + CI-green PR; lane fails open.

## Parallel stream (separate clone — do not disturb from here)
**Web search vs Exa** (Explore module) lives in `/Users/shaileshsingh/ScholarSync` on
`feat/web-news-discussions-search` (~18 uncommitted files). Different working tree;
not part of this build.

## Prior milestones (committed to main)
- Explore Module V1 — phases 1–10 (PRs #52–55)
- Library Module Redesign — phases 11–17 COMPLETE (2026-04-02)
- Parity sprint — 6 ranking cycles shipped/merged (#74, #75, #78, #80, #81); cycle 4 reverted
