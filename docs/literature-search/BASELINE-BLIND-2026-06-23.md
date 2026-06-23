# Blind Baseline — Manan OS vs Elicit (2026-06-23)

> Phase 0 of the continuous parity-sprint goal. Recorded BEFORE reading any prior
> parity/council result summaries, to establish an unbiased starting line. Run
> against current `main` HEAD code with live keys (PubMed, OpenAlex, Cohere,
> Tavily). Elicit = captured snapshots (`eval/literature-search/elicit/fixtures.json`),
> never a runtime path.

## Method
- **Manan run:** `eval/literature-search/runs/phase0-baseline` (34 benchmark queries,
  `npm run eval:search`, max 10 results/query). 0 errors, 0 empty result sets.
- **Deterministic head-to-head:** `compare-elicit.ts` over the 12 queries with verified
  must-have ground truth (recall@10, best-must-have rank, best-in-top-3).
- **Blinded council:** new `build-blinded-packet.ts` → identical-format A/B lists
  (no studyType/citedByCount leak), per-query randomized engine assignment (salt
  `phase0`, key withheld from judges), 3 isolated cross-family judges:
  **Opus** (subagent), **Codex** (`codex exec`, read-only sandbox), **Grok-4.3**
  (OpenRouter). De-anonymized by `aggregate-blinded.ts`.
- **Blinding integrity check:** judges' blinded *overall* picks split (Opus→A,
  Codex→B, Grok→B) — i.e. no judge could tell which engine was the system under
  test. The Manan-favoring result emerges only after de-anonymization.

## Deterministic result (12 ground-truth queries)
| metric | Manan | Elicit |
|---|---|---|
| head-to-head wins | 2 | 2 (8 ties) |
| recall@10 (mean) | **88%** | 75% |
| best-in-top-3 | 67% | **75%** |

Manan finds *more* landmarks (higher recall) but ranks the single canonical paper
into the top-3 slightly *less* often than Elicit. Elicit returns **0 results** on
bare acronym queries `DAPA-HF` / `PARTNER 3` (Manan finds them, but ranks low at 7–9).

## Aggregate Manan metrics (34 queries)
| metric | value | gate | status |
|---|---|---|---|
| recall@10 (must-haves) | 88% | — | — |
| best-must-have in top-3 | 67% | ≥85% | ✗ FAIL |
| nDCG@10 | 0.72 | — | — |
| MRR | 0.64 | — | — |
| DOI fill | 100% | ≥98% | ✓ |
| PMID fill | 94% | ≥90% | ✓ |
| duplicate rate | 0% | ≤2% | ✓ |
| case-report rate (top10) | 1% | — | ✓ |
| latency p50 / p95 | 5.1s / 7.2s | — | — |

## Blinded council verdict (Opus + Codex + Grok, per-query majority)
- **Manan wins: 20 · Elicit wins: 12 · ties: 2**
- **Manan beats-or-ties: 22/34 = 65%** (Stop gate ≥80% — NOT met)

### Where Manan LOSES to Elicit (ranked by gap, mainstream-weighted)
1. `broad-hfref-management` (broad_clinical) — Manan 2.78 vs 4.00 — **biggest gap**;
   broad-overview intent not surfacing guidelines/SRs on top. (Tier-1 #3)
2. `mechanism-sglt2-cardioprotection` — 3.89 vs 4.67 — mechanism reviews weak.
3. `safety-glp1-pancreatitis` — 3.44 vs 4.39 — safety/observational evidence.
4. `tavr-low-risk-6yr` (seed) — 3.89 vs 4.94 — misses PARTNER 3 primary (recall 50%).
5. `recency-semaglutide-cv-2025` — 3.00 vs 3.89 — recency surfacing.
6. `safety-sglt2-dka` — 4.11 vs 4.50.
7. `sr-cochrane-steroids-sepsis` — 4.28 vs 4.72 — SR/MA on top.
8. `acronym-sprint` — 4.00 vs 4.39 — SPRINT ranked #7 not top-3.
9. `sr-statins-primary-prevention` — 4.11 vs 4.33 (split).
10. `compare-tirzepatide-semaglutide` — close split.
11. `guideline-kdigo-ckd` — close split.
12. `pico-sglt2-cv-mortality` — close split (Manan mean higher, majority Elicit).

### Where Manan WINS clearly
Exact-paper lookups, both bare acronyms (DAPA-HF, PARTNER-3, KEYNOTE-189 — Elicit
weak/empty here), guideline-aortic-stenosis, broad-af-anticoagulation,
broad-cap-treatment, several long-term-outcomes, PICO septic shock.

## Lacunae backlog (highest-impact first, mainstream-weighted)
- **L1 — Broad-query curation (Tier-1 #3):** broad clinical overview queries must
  rank high-quality reviews/guidelines/SRs on top. Currently the single worst class.
- **L2 — SR/MA & guideline surfacing:** systematic-review and mechanism queries lose
  because the authoritative review isn't ranked #1–3.
- **L3 — Landmark recall on seed/long-term (PARTNER 3 primary in tavr):** dense lane
  / multi-query expansion (Tier-1 #1, Tier-2 #4).
- **L4 — Acronym ranking:** landmark retrieved but ranked 7–9 (best-in-top-3 fail).
- **L5 — Recency surfacing** and **safety/observational** evidence ranking.

> Do NOT over-optimize the adversarial/edge classes; L1–L3 are mainstream (50% weight)
> and are where the council gap actually is.

## Reconciliation with prior (non-blinded) council
The prior session (`SESSION-2026-06-PARITY-RERUN.md`) reported **Manan 25/34 (74%)**
using the OLD non-blinded packet (`build-packets.ts`), which labels the lists
"Manan" vs "Elicit" and tells judges which is the system under test. This BLIND
re-measurement (identical-format A/B, randomized, judges isolated) gives **Manan
20/34 wins, 22/34 (65%) beat-or-tie** — a ~9-point drop attributable to label bias.
**The honest floor is 65% beat-or-tie, not 74% wins.** The 80% Stop gate is further
than prior docs implied. Going forward, ALL council runs use the blinded harness.

Also: the prior third judge fell back to DeepSeek (Grok/Gemini unavailable then).
Grok-4.3 via OpenRouter is now restored as the cross-family third seat.

## Root-cause read (reconciled with ETIOLOGY/BACKLOG)
The de-anonymized losses concentrate on **off-entity drift the cross-encoder cannot
discriminate**: `broad-hfref-management` returns HF**p**EF (preserved) papers for an
HF**r**EF query; `safety-glp1-pancreatitis` tops out with GLP-1 CV/kidney-outcome MAs
instead of the pancreatitis outcome; `recency-semaglutide-cv-2025` is contaminated
with tirzepatide/renal/HFpEF. This is exactly Tier-1 #2 (PICO intervention+outcome
entity matching) and the prior session's flagged #1 "top-10 tail precision." Cycle 1
targets a bounded, table-driven off-subtype / off-drug demotion.
