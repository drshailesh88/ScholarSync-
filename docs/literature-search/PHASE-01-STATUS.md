# Phase 1 Status — Self-Hosted MedCPT Dense Lane

Branch `feat/medcpt-dense-lane` (off `corpus-build-base`). Tracks the build
against `PHASE-01-BUILD-GOAL.md` / `CORPUS-RESEARCH.md`.

## Shipped (code complete, CI-green locally, fail-open proven live)

| Deliverable | State |
|---|---|
| `src/lib/search/sources/medcpt-dense.ts` — live dense query lane (Modal encoder → int8 Turbopuffer ANN → `UnifiedSearchResult`), fail-open | ✅ 13 unit tests, TDD |
| `run-search.ts` — `openalex_semantic` lane replaced by an always-on internal `medcpt_dense` lane, RRF-fused | ✅ |
| `openalex.ts` — dead `searchOpenAlexSemantic` removed | ✅ |
| `infra/modal/medcpt_service.py` — Query-Encoder endpoint + precomputed index loader + one freshness/backfill pipeline (weekly cron) | ✅ syntax-valid; Context7/model-card verified |
| `infra/modal/OPS.md` — provisioning + ops runbook | ✅ |
| `SOURCE-MATRIX.md` / `ARCHITECTURE.md` — dense lane documented, semantic lane retired | ✅ |

**Quality gates (local):** `tsc --noEmit` ✅ · `eslint --max-warnings 0` ✅ ·
`vitest run` ✅ 6670 passed · Python `py_compile` ✅.

## Interim evidence — fail-open verified in the LIVE pipeline

A real `runLiteratureSearch` call (no index provisioned yet) returns:

```
sourceStatuses.medcpt_dense = { status: "missing_config",
  message: "MedCPT dense lane not configured (encoder URL / Turbopuffer key)" }
sourceCounts = { pubmed: 2360, openalex: 1569, medcpt_dense: 0 }
```

→ The lane runs, is correctly **dormant**, and search succeeds on the lexical
lanes with **zero regression**. It activates with **no code change** the moment
`MEDCPT_QUERY_ENCODER_URL` + `TURBOPUFFER_API_KEY` are set.

## Remaining — operational (needs cloud creds + spend; gated)

These are the only things between here and the full Definition of Done; all are
in `infra/modal/OPS.md`:

1. **`HF_TOKEN`** added to the 1Password Agent Vault (if not already) →
   `modal secret create manan-medcpt-secrets` (HF_TOKEN + TURBOPUFFER_API_KEY).
2. `modal deploy` the encoder + weekly freshness cron.
3. `modal run ::load_index` — load the ~24M precomputed embeddings (int8).
4. `modal run ::backfill --year-start 2024 --year-end 2026` — recency gap (~$3–15).
5. Set the live env vars (step 4 of OPS) → lane goes live.
6. **AFTER 87q run:** `eval:search --label after-medcpt` and `rescore` vs the
   throttled-OpenAlex floor (`BASELINE-87Q-FLOOR.md`), incl. recency queries.

## Definition-of-Done tracker

- [x] `openalex_semantic` replaced by the Turbopuffer MedCPT dense lane (code + wiring)
- [x] Fails open to current lanes (proven live)
- [x] Every result keeps provenance (`sources: ["medcpt_dense", …]`) + ranking trace (RRF)
- [x] Secrets via env/op-run only, never hardcoded
- [x] Freshness updater built + scheduled (weekly, configurable) — *deploy pending*
- [ ] Index built (24M + 2024–2026 gap) — **operational, gated on spend**
- [ ] nDCG@10 / recall@10 ≥ floor incl. recency, zero 429s — **needs live index**
- [ ] Freshness proven on a real delta — **needs deploy**
- [ ] CI-green PR merged — **after AFTER-evidence passes**
