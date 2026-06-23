# Parity Sprint — running status

Continuous quality-ratchet for Manan OS literature search vs Elicit. This is the
maintained rollup; per-cycle detail lives in the `CYCLE-0N-*.md` / `BASELINE-*.md`
docs. All shipped changes are TDD'd, CI-green, and merged to `main` via PR.

## Methodology shipped (the infrastructure)
- **Blinded council** (`council/build-blinded-packet.ts` + `aggregate-blinded.ts`):
  identical-format A/B lists, per-query randomized assignment, key withheld from
  judges, de-anonymizing aggregator. Judges: fresh Opus + Codex + cross-family third
  (Grok-4.3 → Gemini → DeepSeek fallback). Exposed a ~9pt label-bias in the prior
  non-blinded council.
- **Reproducible harness** (`capture-candidates.ts` + `rerank-offline.ts`):
  `run-search` opt-in `includeRawCandidates` freezes the candidate pool once;
  `rankAndAnnotate` (pure) replays it offline → deterministic. Enables PAIRED A/B
  (old vs new ranker on the same pool), isolating ranking changes from the ±8pt
  live-API throttling noise that makes raw run-to-run comparison unsound.
- **Benchmark:** 34 → **87 queries**, PubMed-verified ground truth (37 with
  must-haves), 7 specialties incl. psychiatry, plus trial-family / negative-control /
  ambiguous-acronym categories.

## Cycles
| # | Change | Decision | Evidence |
|---|---|---|---|
| 1 | Off-subtype/off-drug entity-drift demotion | **KEEP** (#74) | council 65→68%; HFpEF papers demoted from HFrEF query; GT held |
| 2 | Trial-primary boost (demote secondary literature) | **KEEP** (#75) | recall@10 88→96%, best-in-top-3 67→75%, council 68→71% |
| 3 | OR-relaxation fallback (no empty result sets) | **KEEP** (#78) | empty sets 3→0; ZUMA-1 → rank 1; provably additive |
| 4 | Acronym-collision coverage gating | **REVERT** | frozen-pool A/B: 0 best-rank change — redundant with pipeline |
| 5 | Trial follow-up/cost/registry sub-report demotion | **KEEP** (#80) | frozen-pool A/B: partner-3 4→2, sprint 4→3 (both top-3), 0 regressions |
| 6 | Off-outcome (adverse-event) drift demotion | **KEEP** (#81) | frozen-pool A/B: glp1-pancreatitis on-outcome top-5 2/5→4/5, dka 3/5→4/5; PICO untouched |

## Current floor (87 queries, current `main`)
- **Deterministic (37 GT):** Manan 8 wins / 5 / 24 ties vs Elicit; recall@10 88% vs
  73%; best-in-top-3 73% vs 73%.
- **Blinded council (Opus+Grok+DeepSeek):** Manan 24 / Elicit 17 / tie 46 = 80%
  beat-or-tie (tie-heavy panel; Codex was env-unavailable that run).

## Quality gates (current)
| gate | target | status |
|---|---|---|
| landmark in top-10 | ≥95% | recall@10 88% — borderline |
| best-in-top-3 | ≥85% | **73% ✗** |
| DOI fill | ≥98% | 95% ✗ |
| PMID fill | ≥90% | **86% ✗** |
| duplicate rate | ≤2% | 0% ✓ |
| empty result sets | 0 | **0 ✓** (cycle 3) |
| hallucinated metadata | 0 | 0 ✓ |
| provenance/trace | present | ✓ (rankingTrace on every result) |

## Cumulative re-measure (after cycle 6, label `floor87-cycle6`)
Live 87q run was **OpenAlex-throttle-degraded on 14/87 queries** → aggregate
unreliable (best-in-top-3 read 68%, and 3 *psychiatry* queries went empty because
BOTH lanes failed transiently — the cycle-3 trial-family empties stayed fixed). This
is the **third** live run dominated by throttling noise. The trustworthy cumulative
evidence is the per-cycle frozen-pool A/Bs (partner-3 4→2, sprint 4→3, pancreatitis
2/5→4/5, empty sets 3→0). **Takeaway: source-reliability is now the dominant blocker
for BOTH quality and measurement** — promoted to cycle 7.

## Prioritized next cycles (all measurable on the reproducible harness)
1. **Source reliability (Tier-1 #1) — OpenAlex token-bucket / circuit-breaker /
   retry-on-transient-empty.** 14/87 queries lost the OpenAlex lane in the last run,
   degrading pools and causing phantom metric swings + transient empties. Fixes both
   product quality and measurement noise. Highest priority.
2. **PMID backfill completeness** — 87% < 90% gate; DOI-only/OpenAlex results lack a
   PMID. Add a PMID lookup (NCBI id-convert / Crossref) for DOI-only top results.
   Also lifts DOI fill (96% < 98%). Touches run-search enrichment (serial lane).
2. **Off-outcome PICO drift** — `safety-glp1-pancreatitis` tops out with CV/kidney MAs
   instead of the pancreatitis outcome; extend entity-drift to the query OUTCOME.
   Measurable on a frozen pool.
3. **Negative-control verification** — confirm the 3 negative-control queries don't
   surface the famous-but-irrelevant trap (irrelevant-top-10 metric).
4. **Re-measure the 87q floor + paired council** with cycles 3+5 included, then run
   the 3 stable cycles required to satisfy Stop. Prefer paired frozen-pool councils
   (old vs new ranker on the same pool) over noisy live re-runs.

## Source reliability (cross-cutting — raised by cycles 3 & 5)
Live runs intermittently drop the OpenAlex lane (`[0: openalex]`) to transient
throttling, degrading pools and producing phantom metric swings. Tier-1 #1 (OpenAlex
token-bucket / circuit-breaker / retry-on-empty) would both improve the product and
shrink capture-time noise. High value; serial run-search lane.

## Stop criteria (not yet met)
3 consecutive cycles where Manan beats/ties Elicit by blinded council on ≥80% of
queries, ALL gates pass, deterministic metrics move <2%/cycle, no mainstream
regression. Current blockers: best-in-top-3 (73%), PMID fill (86%), DOI fill (95%).
