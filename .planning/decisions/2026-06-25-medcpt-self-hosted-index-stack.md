# Planning Session: MedCPT Self-Hosted Index — Stack Decisions
**Date:** 2026-06-25
**Source:** Live session (cost+capability analysis: Turbopuffer vs LanceDB-on-R2; Neon FTS cost)
**Status:** decided
**Supersedes:** the "do NOT self-host an index" constraint in `council-solutions/{oss,apis}.md`

## Context
The parity sprint plateaued not on ranking but on **measurement + source reliability**:
OpenAlex `search.semantic` was throttled away on 14/87 queries across three live runs,
making the aggregate untrustworthy and capping recall. The fix is to **own** the dense
retrieval lane instead of renting a throttled one. `PHASE-01-BUILD-GOAL.md` had a
decided stack, but provisioning surfaced a cost problem that forced two stack changes.

---

## Key Decisions Made

1. **Reverse the no-self-hosted-index constraint.** The earlier research parked MedCPT
   because hosting a PubMed-scale index was forbidden. That is now lifted — NCBI's free
   precomputed MedCPT embeddings (~24M, 768-d) + an object-storage vector DB make a
   ~30M-vector int8 index low-ops and ~tens-of-$/mo, and the lane fails open. The
   constraint was protecting against a cost/ops shape that no longer applies.

2. **Vector store: Turbopuffer — NOT LanceDB-on-R2.** Both are object-storage-native
   and cheap. Decider for *this* workload: the live lane is deadline-bound and fails
   open on a **scale-to-zero** stack.
   - Turbopuffer keeps the search **off Modal** (Node app → managed API), auto-caches
     hot data to NVMe, native `i8` int8 (±0.001 quality), and fail-open neutralizes the
     managed-dependency risk.
   - LanceDB-on-R2 is cheaper at rest but re-introduces an **index lifecycle**
     (compaction/versioning) and a **Modal keep-warm** problem — exactly the infra
     ownership this build exists to remove. Cost is a wash at our scale (Turbopuffer
     floor ~$16–64/mo vs ~$1/mo + Modal), so cost does not decide it; ops does.
   - **Rejected, revisit-if:** LanceDB-on-R2 only at very high sustained query volume,
     or a hard zero-new-vendor / data-ownership requirement.

3. **Drop Neon entirely.** Neon's role in the original goal was "Postgres FTS +
   metadata" (Phase 0 lexical lane). A 37M-doc PubMed FTS corpus + tsvector index was
   costed at **~$70/mo storage + warm compute to ~$300/mo** — hundreds/month, and the
   single biggest line item in the whole stack. **Turbopuffer does BM25/FTS natively**
   on object storage, so the lexical lane can live there too (hybrid search, one
   store); metadata rides as Turbopuffer document attributes. Neon's reason-for-being
   evaporated.

4. **Lexical lane: free PubMed E-utilities now; Turbopuffer BM25 later (optional).**
   The binding constraint was OpenAlex *semantic*, which the dense lane replaces.
   PubMed E-utilities (NCBI key) is reliable and $0, so keep it as the interim lexical
   source and **ship the dense lane (Phase 1) first**. Self-hosting lexical becomes
   optional/deferred — and when built, it's a Turbopuffer BM25 namespace, never a Neon
   box. Phase 0 is demoted from blocker to optional.

5. **Turbopuffer region: `aws-us-east-1`.** Colocate with Vercel `iad1` + Modal
   us-east to keep the live lane fast. Constructor arg, trivially changed; not a secret.

6. **Provisioning (this session):** `TURBOPUFFER_API_KEY` (verified) and
   `MODAL_TOKEN_ID`/`MODAL_TOKEN_SECRET` (live-authenticated via `modal app list`) are
   in 1Password `Agent Vault` and wired into `~/.config/op/dev.env`. `HF_TOKEN` still
   needed at build time (Modal Secret) to pull the MedCPT models. R2 deferred to Phase 2.

---

## Constraints & Requirements
- int8 quant (not binary). Recency (2024–2026) retrievable is a hard exit gate.
- Fail-open to current lanes; harness-gated against the 87q frozen-pool floor.
- TDD (RED→GREEN); one phase per feature branch + CI-green PR; secrets via op-run only.
- Elicit stays eval-only; Semantic Scholar stays out of DEFAULT_SOURCES.
- Every result keeps provenance + `rankingTrace`.

## Open Questions
- [ ] Turbopuffer namespace layout: one namespace for dense + one for BM25, vs a single hybrid namespace? (multi-query fusion either way)
- [ ] MedCPT-Cross-Encoder swap in `rerank.ts` — A/B against Cohere rerank-v3.5 before committing.
- [ ] Exact Turbopuffer per-query cost at our real volume (model once live traffic is measurable).
- [ ] When (if ever) to build Phase 0 self-hosted lexical — gate on observed PubMed E-utilities reliability.

## Next Steps
- Start the build in `/Users/shaileshsingh/ScholarSync-corpus` (branch `corpus-build-base`) by pasting the `/goal` block from `PHASE-01-BUILD-GOAL.md`.
- Create the Modal Secret (`HF_TOKEN` + `TURBOPUFFER_API_KEY`) for the embedding/freshness function.
- Merge this decision + the revised goal/CORPUS-RESEARCH docs to `main` via PR once the build branch lands its first phase.
