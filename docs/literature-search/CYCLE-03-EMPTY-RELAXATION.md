# Cycle 3 — Eliminate empty result sets (OR-relaxation) + acronym misdetection fix

## Lacuna (from the 87q floor)
3 of 87 queries returned **ZERO results** — the worst failure mode. All were
trial-FAMILY queries naming several trials:
- `family-evolut-trials`, `family-sglt2-cvot-trials`, `family-zuma-cart-trials`

Root causes (diagnosed via `planQuery`):
1. **Acronym misdetection** — `CAR-T` and `B-cell` were treated as trial acronyms
   (they are concepts/biomarkers), while the real family name (`ZUMA`) was missed.
2. **Over-constraint** — a detected acronym `[tiab]` was AND-ed with ALL remaining
   topic words (including OTHER trial names, e.g. `DECLARE`, `CANVAS`), so almost
   nothing matched. The existing verbatim fallback AND-ed ~9 terms → also empty.

## Change (ONE coherent, TDD)
`query-planner.ts`:
1. Extended the acronym skip-list with concept/biomarker tokens (`CAR-T`, `B-CELL`,
   `T-CELL`, `NK-CELL`, `CTLA-4`, `IL-n`, `TNF-x`, `BRCA`, `HLA-x`, `NT-proBNP`…).
2. New `relaxedOrQuery` + `QueryPlan.pubmedRelaxed`: the distinctive query tokens
   OR-ed together (generic filler dropped, hyphenated trial names preserved).
`run-search.ts`: added a **tier-3 recall relaxation** to `searchPubMedPlanned` —
if primary + broadened + verbatim-fallback ALL return nothing, retry with the
OR-relaxed query. Strictly additive: it fires ONLY when the result set would
otherwise be empty, so it can never reduce results on a healthy query. 5 unit tests.

## Result (keep)
Targeted (verified twice, to rule out API noise):
| query | before | after |
|---|---|---|
| `family-evolut-trials` | EMPTY | recall@10 100% |
| `family-zuma-cart-trials` | EMPTY | recall@10 100% (ZUMA-1 @ rank 1) |
| `family-sglt2-cvot-trials` | EMPTY | 10 results (EMPA-REG not yet top-10 — ranking, later) |

**Empty result sets: 3 → 0.** 259 search unit tests green; tsc + eslint clean.

**Decision: KEEP** on targeted + logical evidence (empty-set elimination is a binary
reliability fix that does not need a council; the change is provably additive). A full
87q council was NOT run on this cycle's full eval because that run hit a transient API
failure (see below) that would pollute the council.

## ⚠️ Decisive harness-noise finding (blocks the ratchet)
The cycle-3 FULL 87q eval showed a phantom aggregate "regression" (recall@10 88→81%,
best-in-top-3 73→65%) — but the drops were on queries this change PROVABLY cannot
affect (`exact-dapa-hf`, `exact-recovery-dex`, `tavr`, `acronym-partner-3`,
`recency-lecanemab` all went empty/low). A **re-run with the identical cycle-3 code
recovered every one** (exact-dapa-hf 0→100%, exact-recovery-dex 0→100%, partner-3
0→100%, lecanemab 0→100%, tavr 0→50%). The swing was 100% transient upstream
throttling (PubMed/OpenAlex 429 / fan-out-deadline under load — the very Tier-1 #1
reliability bug).

**Conclusion:** comparing two independent live-API runs is an UNSOUND basis for
per-cycle keep/revert — transient failures cause ±8pt phantom swings on the 37-GT
aggregate. The next cycle MUST make the harness reproducible: cache raw upstream
candidates per query so re-ranking is deterministic and councils can be PAIRED
(same pool, old-ranker vs new-ranker). Until then, deterministic keep/revert relies
on per-query, re-verified, change-attributable evidence (as used here), not aggregates.
