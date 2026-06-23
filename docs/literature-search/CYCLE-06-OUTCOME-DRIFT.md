# Cycle 6 — Off-outcome (adverse-event) drift demotion

## Lacuna (frozen-pool inspection)
For an adverse-event safety query the top results were EFFICACY meta-analyses about a
DIFFERENT outcome. `safety-glp1-pancreatitis` ("GLP-1 RAs and risk of acute
**pancreatitis**") returned "Cardiovascular, mortality, and kidney **outcomes** with
GLP-1 RAs" at ranks 1–2 (the actual pancreatitis papers sat at 3/5/6/8/9). The
cross-encoder rates them as topically similar; they share the drug class.

## Change (ONE coherent, TDD) — extends entity-drift
New `outcomeDriftPenalty` composed into `entityDriftPenalty`: when the QUERY names a
specific adverse outcome (pancreatitis, ketoacidosis, myocarditis, aneurysm,
thrombosis, fracture, hemorrhage, malignancy, …) and a result's title is about an
EFFICACY outcome (cardiovascular/kidney/renal outcomes, all-cause mortality, HbA1c,
weight loss, HF hospitalization) WITHOUT mentioning the queried adverse event → gentle
×0.8 demotion. **Gated on the query naming an adverse outcome** — so an efficacy/PICO
query that genuinely wants those outcomes is never penalized. 4 new unit tests
(incl. the PICO counter-example).

## Result (keep) — DETERMINISTIC frozen-pool A/B
On-outcome rate in the top-5 (result title mentions the queried adverse event):
| query | before → after |
|---|---|
| safety-glp1-pancreatitis | 2/5 → **4/5** |
| safety-sglt2-dka | 3/5 → **4/5** |
| safety-fluoroquinolone-aneurysm | 4/5 → 4/5 (already on-outcome) |
| safety-vaccine-myocarditis | 5/5 → 5/5 (already on-outcome) |
| **pico-sglt2-cv-mortality** (efficacy) | **unchanged** ✓ — gating protects it |

**2 improved, 0 regressions; the efficacy/PICO query is provably untouched.** 264
search tests green; tsc clean. Targets the `safety-glp1-pancreatitis` council loss
(baseline Manan 3.44 vs Elicit 4.39).

**Decision: KEEP.** Bounded, table-driven, gated on adverse-outcome queries, and
deterministically shown to raise on-outcome ranking with no efficacy-query regression.
