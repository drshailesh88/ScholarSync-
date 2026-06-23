# Cycle 5 — Demote trial follow-up / cost / registry sub-reports (best-in-top-3)

## Lacuna (from cycle-4's frozen-pool inspection)
For trial-acronym lookups, the PRIMARY trial paper ranked behind its own
sub-reports that the cycle-2 markers missed: `acronym-partner-3` primary sat at
rank 4 behind "Economic Outcomes…", "Five-Year Outcomes…", and a "Bicuspid
Registry" — all RCT-typed and acronym-covered, so neither the secondary-marker set
nor acronym-coverage caught them.

## Change (ONE coherent, TDD)
Extended `SECONDARY_TITLE_MARKERS` in `trial-ranking.ts` with: `economic outcomes`,
`cost-effectiveness`, `quality of life`, `health status`, `N-year(s)` (follow-up
reports), and `registry`. Gated — as before — on `isTrialLookup`, so it only fires
for "give me this trial" lookups and **cannot** affect a genuine long-term-outcome
query like `tavr-low-risk-6yr` (which is NOT a trial lookup — no acronym, no "trial").

## Result (keep) — DETERMINISTIC frozen-pool A/B
Measured with the reproducible harness (same frozen pool, change toggled — zero
retrieval noise):
| query | best-rank before → after |
|---|---|
| acronym-partner-3 | 4 → **2** (now top-3) |
| acronym-sprint | 4 → **3** (now top-3) |
| acronym-keynote-189 | 10 → 9 |
| acronym-aristotle / dapa-hf / empa-reg / exact-dapa-hf | unchanged |

**3 improved, 0 regressions — no primary wrongly demoted.** 8 unit tests green;
tsc + full search suite green.

**Decision: KEEP.** Targets the best-in-top-3 gate (partner-3 and sprint cross into
top-3). The change is provably safe by construction (gated on trial-lookup; only
demotes follow-up/cost/registry reports *below* the index trial, never the index).

## Note on the live confirm
A live targeted run showed partner-3 at rank 7 — but that run had `OpenAlex=0`
(transient throttling → a degraded, smaller candidate pool), an API-noise artifact,
NOT the change. sprint still showed rank 3 live. The frozen-pool A/B is the sound
measurement here; this is the second cycle where live runs were noise-degraded while
the harness gave a clean verdict.
