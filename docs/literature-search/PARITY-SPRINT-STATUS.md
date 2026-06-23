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

## Prioritized next cycles (all measurable on the reproducible harness)
1. **Trial sub-study ranking** — partner-3 primary sits behind its own COVERED
   "Economic Outcomes"/"N-Year Outcomes" sub-studies (cycle-2 markers miss them).
   Extend primary-vs-secondary detection WITHOUT demoting trials whose pivotal result
   IS an N-year report (tune via frozen-pool A/B). Targets best-in-top-3.
2. **PMID backfill completeness** — 86% < 90% gate; DOI-only/OpenAlex results lack a
   PMID. Add a PMID lookup (Crossref/NCBI id-convert) for DOI-only top results.
3. **Off-outcome PICO drift** — `safety-glp1-pancreatitis` tops out with CV/kidney MAs
   instead of the pancreatitis outcome; extend entity-drift to the query OUTCOME.
4. **Negative-control verification** — confirm the 3 negative-control queries don't
   surface the famous-but-irrelevant trap (irrelevant-top-10 metric).

## Stop criteria (not yet met)
3 consecutive cycles where Manan beats/ties Elicit by blinded council on ≥80% of
queries, ALL gates pass, deterministic metrics move <2%/cycle, no mainstream
regression. Current blockers: best-in-top-3 (73%), PMID fill (86%), DOI fill (95%).
