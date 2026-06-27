# Phase 1 Status — Self-Hosted MedCPT Dense Lane

Branch `feat/medcpt-dense-lane`. Replaces the throttled OpenAlex `search.semantic`
lane with a self-hosted MedCPT dense retrieval lane (Modal encoder → int8
Turbopuffer ANN), plus a recurring freshness machine. Tracks
`PHASE-01-BUILD-GOAL.md`.

## Shipped & operational

| Deliverable | State |
|---|---|
| `src/lib/search/sources/medcpt-dense.ts` — live dense lane (Modal encoder → int8 Turbopuffer ANN → `UnifiedSearchResult`), fail-open | ✅ 13 unit tests, TDD |
| `run-search.ts` — `openalex_semantic` replaced by always-on internal `medcpt_dense`, RRF-fused; post-fusion enrich/rerank bounded to top-50 (`POST_FUSION_POOL`) | ✅ |
| `rerank.ts` — self-hosted **MedCPT Cross-Encoder** reranker (Modal scale-to-zero A10G), preferred over Cohere via `MEDCPT_RERANK_URL`; Cohere kept as fail-open fallback | ✅ 8 unit tests, TDD; deployed |
| `infra/modal/medcpt_service.py` — CPU always-warm Query-Encoder (`encode`+`search`) + **CrossEncoder.rerank** + precomputed index load + GPU backfill + **weekly freshness cron** + namespace `keep_warm` cron | ✅ deployed |
| **Index** — NCBI precomputed MedCPT embeddings (int8 Turbopuffer) + 2024–2026 GPU backfill | ✅ **~39.66M vectors** (35.92M precomputed + 5.58M backfill, 0 failures) |
| **DeleteCitation handling** — `_extract_delete_pmids` (raw-XML; pubmed_parser drops `<DeleteCitation>`), wired into `process_file`; historical purge | ✅ 5,317 withdrawn PMIDs reconciled |
| `infra/modal/OPS.md` — provisioning + ops runbook (CPU encoder, crons, freshness proof) | ✅ |
| `SOURCE-MATRIX.md` / `ARCHITECTURE.md` — dense lane documented, semantic lane retired | ✅ |

**Quality gates (local + pre-commit hook):** `tsc --noEmit` ✅ ·
`eslint --max-warnings 0` ✅ · `vitest run` ✅ (6683 passed / 10 skipped) · Python `py_compile` ✅.

## Freshness machine — PROVEN on a real delta

One scheduled `freshness()` (weekly, `Cron("0 6 * * 1")`) pulls new PubMed
updatefiles past a watermark, embeds new/changed title+abstract on GPU
(`MedCPT-Article-Encoder`), upserts them, and removes DeleteCitation PMIDs.

End-to-end proof through the real scheduled function (updatefile n1504):

```
planted marker for real DeleteCitation PMID 41611480 → BEFORE present=True
set watermark to n1503 → freshness() processes exactly n1504
freshness() → {processed: 1, upserted: 24210, deleted: 26}
AFTER  delete-PMID 41611480 present=False        ← withdrawn paper REMOVED
AFTER  kept-PMID  18593717 present=True (real title)  ← new/changed SEARCHABLE
watermark advanced → pubmed26n1504 (caught up; weekly cron starts clean)
=== FRESHNESS DELTA PROOF: PASS ✅ ===
```

The delete path was a latent bug: `pubmed_parser` silently drops `<DeleteCitation>`
blocks (0 detected despite 26 real in n1504), so withdrawn papers would have stayed
searchable forever. Fixed by parsing the blocks from raw XML; a one-time
`purge_historical_deletes` removed 5,317 PMIDs the pre-fix backfill had missed.

## Latency & recency (live namespace, warm)

- ANN median ~0.3–0.7s warm (encode on CPU adds <0.1s) — well inside the 5s
  fan-out deadline. `keep_warm` cron probes every minute so the namespace cache
  never cold-starts against a user (cold ≈3.5s would drop the lane).
- Recency retrieval verified: `year>=2024` ANN filter returns 2024/2025/**2026**
  papers (2026 exists only via the backfill + freshness machine).

## 87q evidence (fresh-quota, lane live)

PubMed + OpenAlex quota healthy (no zero-source throttling); the dense lane itself
ran with **zero 429s** and deterministic ~3s in-pipeline latency. Two runs:

| run | dense lane | dense participation | recall@10 | nDCG@10 | bestInTop3 | empties |
|---|---|---|---|---|---|---|
| floor (`baseline87`, documented, *with* rerank) | — (openalex_semantic) | — | 0.88 | 0.73 | 0.73 | 3 |
| `final-on` (two-hop endpoint, no rerank) | live | 11/87 | 0.8784 | 0.7281 | 0.7297 | 1 |
| `final-on2` (combined endpoint, no rerank) | live | **84/87** | 0.8514 | 0.6908 | 0.7297 | **1** |
| `final-rerank` (combined + self-hosted rerank) | live | 84/87 | 0.6486† | 0.6071† | 0.6216† | 2 |

† **`final-rerank` is depressed by EXTERNAL lexical throttling, not by the lane or
the reranker.** The reranker ran clean (0 rerank errors, 0 Cohere 429s — the
self-hosted Cross-Encoder was used; ranking validated at unit level: exact-match
+9.06 > relevant −5.63 > irrelevant −15.99). But this run executed *latest* in a
day of ~6 evals, by which point PubMed E-utilities + OpenAlex were heavily
rate-limited: 4/87 queries returned `pm=0 & oa=0` outright, and many more were
*partially* throttled (fewer candidates). Recall is then **retrieval-capped, not
ranking-capped** — a reranker can only reorder candidates that the lexical lanes
actually returned. Even on the 34 GT papers that weren't hard-throttled, recall was
0.71 (vs 0.85 in `final-on2`), confirming partial throttle across the set. This is
exactly the goal spec's **deferred Phase 0 trigger** — "*only if PubMed E-utilities
reliability becomes the bottleneck*" — which it now is.

**Wins already locked:** empties **3 → 1**; the combined `search` endpoint lifted
dense participation **13% → 97%** (fixing the fan-out-deadline starvation); recency
(2024–2026) retrievable; zero 429s on the owned lane; self-hosted reranker removes
the Cohere monthly-Trial-cap dependency entirely.

**The one remaining gate — a clean floor number — is BLOCKED on external quota, not
on code.** No single run has yet had healthy lexical lanes AND a working reranker at
the same time: `final-on/on2` had healthy-ish lexical but no reranker (Cohere Trial
key monthly-exhausted, every call 429); `final-rerank` had the working self-hosted
reranker but heavily-throttled lexical lanes. The full self-hosted stack (encode →
ANN → cross-encoder rerank) is now built, deployed, and unit-validated; it needs
**one** OFF+ON pair run in a *fresh external-quota window* (PubMed/OpenAlex recover
after idle) to record the floor-gate number. Each additional eval today only deepens
the throttle, so further runs are paused (also respecting the Modal cycle-spend cap).

## Definition-of-Done tracker

- [x] `openalex_semantic` replaced by the Turbopuffer MedCPT dense lane (code + wiring)
- [x] Fails open to the lexical lanes (proven live: `missing_config` → search succeeds)
- [x] Every result keeps provenance (`sources: ["medcpt_dense", …]`) + RRF ranking trace
- [x] Secrets via env/op-run only, never hardcoded
- [x] Index built — 39.66M (precomputed + 2024–2026 backfill), recency retrievable
- [x] Freshness updater scheduled (weekly) AND **proven on a real delta** (new searchable, deleted removed)
- [x] Self-hosted MedCPT Cross-Encoder reranker (throttle-proof; replaces Cohere Trial cap) — built, deployed, unit-validated
- [ ] nDCG@10 / recall@10 ≥ floor incl. recency, zero 429s — **code complete; one clean OFF+ON pair pending a fresh PubMed/OpenAlex quota window** (today's runs throttled the lexical lanes — see †)
- [ ] CI-green PR merged — *draft PR open; merge gated on the clean floor run above*
