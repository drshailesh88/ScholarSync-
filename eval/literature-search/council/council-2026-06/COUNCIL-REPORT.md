# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `council-2026-06` · Manan run: `hyde-on-full` · blinding salt: `council2026`
Judges (isolated, blinded A/B): opus, codex, deepseek.

## Per-query majority vote (de-anonymized)

| query | opus | codex | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 3.33 | 4.89 |
| exact-dapa-hf | manan | manan | manan | **manan** | 4.89 | 3.56 |
| recency-lecanemab | elicit | elicit | elicit | **elicit** | 2.5 | 4.17 |
| pico-sglt2-cv-mortality | tie | elicit | manan | **tie** | 3.94 | 3.44 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.5 | 3.5 |
| compare-doac-vs-warfarin | manan | manan | manan | **manan** | 3.72 | 2.56 |
| exact-recovery-dex | manan | manan | manan | **manan** | 4.61 | 3.39 |
| exact-keynote-189 | manan | manan | tie | **manan** | 4.67 | 4.5 |
| acronym-dapa-hf | manan | manan | manan | **manan** | 4.78 | 2.89 |
| acronym-partner-3 | manan | manan | manan | **manan** | 3.94 | 1.33 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.67 | 2.33 |
| acronym-sprint | manan | manan | manan | **manan** | 4.94 | 3.5 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 3.33 | 4.11 |
| broad-cap-treatment | manan | manan | manan | **manan** | 4 | 2.72 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.39 | 2.28 |
| pico-egdt-septic-shock | tie | manan | manan | **manan** | 4.83 | 4.67 |
| pico-oxygen-icu | elicit | elicit | elicit | **elicit** | 2.94 | 4.22 |
| recency-semaglutide-cv-2025 | manan | elicit | elicit | **elicit** | 3.28 | 3.94 |
| recency-cart-myeloma | manan | manan | manan | **manan** | 4.06 | 3.11 |
| sr-statins-primary-prevention | manan | manan | manan | **manan** | 4.89 | 3.56 |
| sr-sglt2-hf-hospitalization | elicit | elicit | manan | **elicit** | 4.39 | 3.94 |
| sr-cochrane-steroids-sepsis | elicit | elicit | manan | **elicit** | 3.83 | 4.22 |
| guideline-aortic-stenosis | manan | manan | — | **manan** | 4.67 | 3.08 |
| guideline-kdigo-ckd | elicit | elicit | — | **elicit** | 3.92 | 4.17 |
| lto-bariatric-diabetes | manan | manan | — | **manan** | 5 | 3.67 |
| lto-pci-vs-cabg-left-main | manan | manan | — | **manan** | 4.83 | 4 |
| lto-dapa-ckd | elicit | elicit | — | **elicit** | 3.75 | 4.17 |
| safety-vaccine-myocarditis | elicit | elicit | — | **elicit** | 0 | 4.92 |
| safety-glp1-pancreatitis | elicit | elicit | — | **elicit** | 3.5 | 4.17 |
| safety-sglt2-dka | manan | manan | — | **manan** | 4.25 | 3.75 |
| safety-fluoroquinolone-aneurysm | tie | manan | — | **tie** | 5 | 4.5 |
| compare-tirzepatide-semaglutide | manan | elicit | — | **tie** | 4.58 | 4.08 |
| compare-ticagrelor-clopidogrel | elicit | manan | — | **tie** | 4.58 | 4.42 |
| mechanism-sglt2-cardioprotection | elicit | elicit | — | **elicit** | 0 | 4.92 |
| psy-stard-major-depression | elicit | elicit | — | **elicit** | 0 | 4.5 |
| psy-catie-antipsychotics | manan | manan | — | **manan** | 4.42 | 3.25 |
| psy-esketamine-trd | manan | manan | — | **manan** | 5 | 4.33 |
| psy-ketamine-nmda-depression | tie | elicit | — | **tie** | 4.17 | 4.5 |
| psy-lithium-bipolar-maintenance | elicit | elicit | — | **elicit** | 3.75 | 4.5 |
| psy-ssri-vs-placebo-depression | elicit | elicit | — | **elicit** | 2.58 | 3.92 |
| exact-flaura-osimertinib | manan | manan | — | **manan** | 5 | 4.42 |
| exact-keynote-006-melanoma | manan | manan | — | **manan** | 4.75 | 4.25 |
| family-keynote-trials | manan | manan | — | **manan** | 4.17 | 2.83 |
| onc-her2-adjuvant-residual | tie | manan | — | **tie** | 4.58 | 4.25 |
| onc-immunotherapy-broad | elicit | elicit | elicit | **elicit** | 2.5 | 3.83 |
| onc-car-t-lbcl-pico | elicit | elicit | elicit | **elicit** | 3.39 | 4.67 |
| onc-checkpoint-irae-safety | manan | manan | manan | **manan** | 5 | 3.44 |
| exact-dawn-thrombectomy | elicit | tie | elicit | **elicit** | 4.22 | 4.61 |
| neuro-thrombectomy-broad | elicit | elicit | elicit | **elicit** | 2.89 | 4 |
| neuro-tenecteplase-vs-alteplase | manan | manan | manan | **manan** | 4.89 | 3.5 |
| neuro-lecanemab-pico | elicit | elicit | elicit | **elicit** | 1.89 | 3.89 |
| neuro-ms-dmt-comparison | elicit | elicit | elicit | **elicit** | 3.67 | 4.22 |
| neuro-epilepsy-guideline | elicit | elicit | elicit | **elicit** | 3.61 | 4.67 |
| exact-recovery-tocilizumab | tie | manan | manan | **manan** | 4.72 | 3.56 |
| id-hiv-prep-pico | elicit | elicit | elicit | **elicit** | 2.44 | 4.72 |
| id-sepsis-broad | manan | manan | manan | **manan** | 4.67 | 2.56 |
| id-antibiotic-duration-pneumonia | manan | manan | manan | **manan** | 4.33 | 4 |
| id-paxlovid-recency | manan | manan | manan | **manan** | 4 | 3.33 |
| id-fluoroquinolone-cdiff-safety | elicit | manan | manan | **manan** | 4.5 | 3.39 |
| endo-surmount-obesity | manan | manan | tie | **manan** | 5 | 4.78 |
| exact-select-semaglutide | manan | manan | tie | **manan** | 4.94 | 4.44 |
| endo-thyroid-guideline | elicit | elicit | elicit | **elicit** | 2.44 | 4.39 |
| endo-glp1-mechanism | elicit | elicit | elicit | **elicit** | 3.33 | 4.61 |
| endo-t2dm-first-line-pico | elicit | elicit | elicit | **elicit** | 2.44 | 3.28 |
| exact-dapa-ckd | manan | manan | manan | **manan** | 4.94 | 4.06 |
| neph-finerenone-pico | elicit | elicit | elicit | **elicit** | 3.94 | 4.67 |
| neph-iga-nephropathy-recency | manan | tie | elicit | **tie** | 3.83 | 4.11 |
| neph-ckd-anemia-broad | manan | manan | manan | **manan** | 4.33 | 3.5 |
| family-partner-trials | manan | manan | manan | **manan** | 5 | 2.94 |
| family-emperor-sglt2-hf | manan | manan | manan | **manan** | 4.94 | 3.39 |
| exact-plato-ticagrelor | elicit | elicit | elicit | **elicit** | 2.39 | 4.61 |
| sr-doac-vs-warfarin-metaanalysis | manan | tie | manan | **manan** | 4.39 | 3.94 |
| sr-pci-vs-cabg-metaanalysis | manan | manan | manan | **manan** | 4.5 | 3.5 |
| guideline-esc-heart-failure | elicit | elicit | elicit | **elicit** | 2.28 | 4.67 |
| recency-tavr-2025 | manan | manan | manan | **manan** | 4.33 | 3.39 |
| lto-stampede-bariatric-cardiac | elicit | elicit | tie | **elicit** | 3.44 | 3.61 |
| recency-esketamine-monotherapy-2025 | elicit | elicit | elicit | **elicit** | 3.78 | 4.56 |
| family-evolut-trials | manan | manan | manan | **manan** | 4.39 | 2.78 |
| family-sglt2-cvot-trials | tie | elicit | tie | **tie** | 2.89 | 3 |
| acronym-aristotle | elicit | tie | elicit | **elicit** | 4.61 | 4.83 |
| acronym-empa-reg | manan | elicit | tie | **tie** | 4.78 | 4.5 |
| family-zuma-cart-trials | elicit | elicit | elicit | **elicit** | 4.33 | 4.89 |
| ambiguous-ace-acronym | manan | elicit | elicit | **elicit** | 2.56 | 3.67 |
| ambiguous-cast-acronym | elicit | elicit | elicit | **elicit** | 3.11 | 4.83 |
| negctrl-keynote-heart-failure | elicit | elicit | elicit | **elicit** | 1.5 | 4.17 |
| negctrl-dapa-oncology | tie | elicit | tie | **tie** | 2.78 | 3.11 |
| negctrl-recovery-orthopedics | elicit | elicit | tie | **elicit** | 2.83 | 3.56 |

## Tally (by per-query majority)

- **Manan wins: 40**
- Elicit wins: 37
- Ties: 10
- **Manan beats-or-ties: 50/87 = 57%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Extremely close: Engine A won landmark-recall categories (exact papers, trial acronyms/families, negative controls), often surfacing primary RCTs B missed and avoiding false matches. Engine B won most guideline, broad-clinical, recency, and several PICO queries, surfacing authoritative guidelines, newer evidence, and primaries A lacked, with generally cleaner metadata. A edges out narrowly (about 42 wins to 37, 8 ties) on stronger landmark retrieval and two empty-result losses by B.
- **codex:** winner=B — A:41 B:42 tie:4 across 87 queries
- **deepseek:** winner=B — A:27 B:30 tie:8 across 65 queries
