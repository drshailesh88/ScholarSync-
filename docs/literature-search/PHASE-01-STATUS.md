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
| `infra/modal/medcpt_service.py` — CPU always-warm Query-Encoder + precomputed index load + GPU backfill + **weekly freshness cron** + namespace `keep_warm` cron | ✅ deployed |
| **Index** — NCBI precomputed MedCPT embeddings (int8 Turbopuffer) + 2024–2026 GPU backfill | ✅ **~39.66M vectors** (35.92M precomputed + 5.58M backfill, 0 failures) |
| **DeleteCitation handling** — `_extract_delete_pmids` (raw-XML; pubmed_parser drops `<DeleteCitation>`), wired into `process_file`; historical purge | ✅ 5,317 withdrawn PMIDs reconciled |
| `infra/modal/OPS.md` — provisioning + ops runbook (CPU encoder, crons, freshness proof) | ✅ |
| `SOURCE-MATRIX.md` / `ARCHITECTURE.md` — dense lane documented, semantic lane retired | ✅ |

**Quality gates (local + pre-commit hook):** `tsc --noEmit` ✅ ·
`eslint --max-warnings 0` ✅ · `vitest run` ✅ (6670) · Python `py_compile` ✅.

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
| floor (`baseline87`, documented) | — (openalex_semantic) | — | 0.88 | 0.73 | 0.73 | 3 |
| `final-on` (two-hop endpoint) | live | 11/87 | 0.8784 | 0.7281 | 0.7297 | 1 |
| `final-on2` (combined endpoint) | live | **84/87** | 0.8514 | 0.6908 | 0.7297 | **1** |

**Wins already locked:** empties **3 → 1**; the combined `search` endpoint lifted
dense participation **13% → 97%** (fixing the fan-out-deadline starvation); recency
(2024–2026) retrievable; zero 429s on the owned lane.

**Floor gate BLOCKED on the reranker.** `recall@10`/`nDCG@10` land *below* floor —
and counter-intuitively *fall* as dense participation rises (0.878 → 0.851) —
because **Cohere rerank is a Trial key that is monthly-exhausted** (1000 calls/mo,
spent by the day's eval runs; every call 429s). The dense lane feeds candidates to
the reranker, which re-promotes the true papers above semantic neighbours; with **no
reranker**, RRF order alone lets dense neighbours displace ground-truth out of the
top-10 (`exact_paper` recall 1.00 → 0.90). The documented floor was measured *with*
rerank, so a fair comparison requires a working reranker. Unblock options (decision
pending): self-host `ncbi/MedCPT-Cross-Encoder` on Modal (throttle-proof, aligns
with the project thesis) **or** a fresh/Production Cohere key. Then re-run for the
floor gate + the same-session `final-off` control.

## Definition-of-Done tracker

- [x] `openalex_semantic` replaced by the Turbopuffer MedCPT dense lane (code + wiring)
- [x] Fails open to the lexical lanes (proven live: `missing_config` → search succeeds)
- [x] Every result keeps provenance (`sources: ["medcpt_dense", …]`) + RRF ranking trace
- [x] Secrets via env/op-run only, never hardcoded
- [x] Index built — 39.66M (precomputed + 2024–2026 backfill), recency retrievable
- [x] Freshness updater scheduled (weekly) AND **proven on a real delta** (new searchable, deleted removed)
- [ ] nDCG@10 / recall@10 ≥ floor incl. recency, zero 429s — *see 87q evidence above*
- [ ] CI-green PR merged
