# Academic Reranker Decision — OpenRouter `cohere/rerank-4-pro`

**Date:** 2026-06-29
**Status:** Adopted (live)
**Scope:** Literature/academic search reranking only. **Retrieval is unchanged.**

## Decision

The live academic (literature) reranker is **OpenRouter `cohere/rerank-4-pro`** —
a managed, always-warm reranking endpoint reached with `OPENROUTER_API_KEY`.

- **PRIMARY (on the critical path):** OpenRouter `cohere/rerank-4-pro`
  (`OPENROUTER_API_KEY`, model overridable via `ACADEMIC_RERANK_MODEL`, default
  `cohere/rerank-4-pro`). A real `rerankScore` is attached on every normal search.
- **OPTIONAL / break-glass:** the self-hosted **MedCPT Cross-Encoder** on Modal
  A10G (`MEDCPT_RERANK_URL`) is **retired from the live path** and only consulted
  when explicitly opted in with `ACADEMIC_USE_MEDCPT_RERANK=1`.
- **TERTIARY fallback:** Cohere-direct `rerank-v3.5` (`COHERE_API_KEY`), used only
  if OpenRouter (and the opted-in MedCPT lane) are absent or failing.
- **Floor:** with no reranker configured/reachable, search fails open to
  keyword-overlap relevance — "no model, never fails."

Backend order (literature path): **OpenRouter → [MedCPT if `ACADEMIC_USE_MEDCPT_RERANK=1`] → Cohere-direct.**

Implementation: `src/lib/search/rerank.ts`.

## Why

Switching the live reranker to OpenRouter `cohere/rerank-4-pro` resolves three
problems at once that the self-hosted MedCPT cross-encoder carried:

1. **Cold start.** The self-hosted A10G cross-encoder scales to zero and takes
   ~20s to warm. On the first reranked search after idle the lane failed open and
   the user got pre-rerank order. OpenRouter is managed and always-warm (~1.2s).
2. **Idle GPU cost.** Keeping the A10G cross-encoder warm 24/7 to avoid that cold
   start would cost roughly **$540–800/mo of idle GPU**. The managed endpoint has
   no idle cost — we pay only per search.
3. **Cohere-key blocker.** Direct Cohere access was blocked on key provisioning;
   routing Cohere's reranker through OpenRouter removed that dependency.

## Cost

- OpenRouter `cohere/rerank-4-pro`: **~$0.0025 per search** (managed, always-warm).
- MedCPT A10G cross-encoder: **$0 idle** (scale-to-zero, retired from the live
  path), avoiding the **~$540–800/mo** an always-warm reranker would have cost.

## What did NOT change — retrieval

This decision is about **reranking only**. The MedCPT **DENSE retrieval lane** is
untouched and stays live:

- CPU `QueryEncoder` (`MEDCPT_SEARCH_URL` / `MEDCPT_QUERY_ENCODER_URL`),
  `min_containers=1` always-warm — see `infra/modal/medcpt_service.py` §1 and
  `infra/modal/OPS.md`.
- The `keep_warm` cron warms the Turbopuffer ANN namespace (dense lane) **only**;
  it deliberately does **not** warm the reranker.

## Operational notes

- The Modal `CrossEncoder` (A10G) stays deployed but **scale-to-zero**. Do **not**
  add `min_containers` / a keep-warm to it — that re-introduces the idle GPU cost
  this decision eliminated.
- `MEDCPT_RERANK_URL` is now **OPTIONAL**. Leave it unset for the normal config.
  To opt the cross-encoder back onto the critical path (break-glass), set both
  `MEDCPT_RERANK_URL` and `ACADEMIC_USE_MEDCPT_RERANK=1` (accepts ~20s cold start).
- Env reference: `.env.example`. Ops runbook: `infra/modal/OPS.md`.
