# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `council-2026-06-owned` · Manan run: `remeasure-owned` · blinding salt: `owned2026`
Judges (isolated, blinded A/B): opus, codex, deepseek.

## Per-query majority vote (de-anonymized)

| query | opus | codex | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | — | **elicit** | 3.83 | 4.83 |
| exact-dapa-hf | manan | manan | — | **manan** | 4.83 | 4 |
| recency-lecanemab | elicit | elicit | — | **elicit** | 3 | 4.17 |
| pico-sglt2-cv-mortality | manan | manan | — | **manan** | 4.92 | 3.42 |
| guideline-af-esc | manan | manan | — | **manan** | 4.33 | 4.08 |
| compare-doac-vs-warfarin | manan | manan | — | **manan** | 3.75 | 2.67 |
| exact-recovery-dex | manan | manan | — | **manan** | 4 | 3.5 |
| exact-keynote-189 | manan | manan | — | **manan** | 4.83 | 4.33 |
| acronym-dapa-hf | manan | manan | — | **manan** | 5 | 3.5 |
| acronym-partner-3 | manan | manan | — | **manan** | 3.33 | 1.75 |
| acronym-keynote-189 | manan | manan | — | **manan** | 4.75 | 2.25 |
| acronym-sprint | manan | manan | — | **manan** | 5 | 3.83 |
| broad-hfref-management | tie | elicit | — | **tie** | 3.42 | 3.75 |
| broad-cap-treatment | elicit | elicit | — | **elicit** | 3.42 | 3.67 |
| broad-af-anticoagulation | manan | manan | — | **manan** | 3.92 | 2.75 |
| pico-egdt-septic-shock | manan | manan | — | **manan** | 5 | 4.75 |
| pico-oxygen-icu | elicit | elicit | — | **elicit** | 3.5 | 4.25 |
| recency-semaglutide-cv-2025 | elicit | elicit | — | **elicit** | 3.33 | 3.83 |
| recency-cart-myeloma | manan | manan | — | **manan** | 4.25 | 3.5 |
| sr-statins-primary-prevention | manan | manan | — | **manan** | 4.58 | 3.92 |
| sr-sglt2-hf-hospitalization | manan | manan | — | **manan** | 5 | 4 |
| sr-cochrane-steroids-sepsis | manan | manan | — | **manan** | 4.42 | 4.25 |
| guideline-aortic-stenosis | elicit | elicit | — | **elicit** | 3.08 | 3.67 |
| guideline-kdigo-ckd | elicit | elicit | — | **elicit** | 3.08 | 4 |
| lto-bariatric-diabetes | manan | manan | — | **manan** | 4.5 | 3.75 |
| lto-pci-vs-cabg-left-main | elicit | elicit | — | **elicit** | 4.08 | 3.83 |
| lto-dapa-ckd | elicit | elicit | — | **elicit** | 3.83 | 4.17 |
| safety-vaccine-myocarditis | tie | elicit | — | **tie** | 4.58 | 4.92 |
| safety-glp1-pancreatitis | elicit | elicit | — | **elicit** | 3.58 | 4.25 |
| safety-sglt2-dka | manan | manan | — | **manan** | 4.67 | 3.92 |
| safety-fluoroquinolone-aneurysm | manan | manan | — | **manan** | 5 | 4.75 |
| compare-tirzepatide-semaglutide | manan | elicit | — | **tie** | 4.58 | 4.08 |
| compare-ticagrelor-clopidogrel | elicit | elicit | — | **elicit** | 4.58 | 4.33 |
| mechanism-sglt2-cardioprotection | tie | elicit | — | **tie** | 3.92 | 4.5 |
| psy-stard-major-depression | elicit | elicit | — | **elicit** | 3.17 | 4.5 |
| psy-catie-antipsychotics | manan | manan | — | **manan** | 4.58 | 3.08 |
| psy-esketamine-trd | manan | manan | — | **manan** | 5 | 4.33 |
| psy-ketamine-nmda-depression | manan | manan | — | **manan** | 4.42 | 4.25 |
| psy-lithium-bipolar-maintenance | manan | elicit | — | **tie** | 4.75 | 4.33 |
| psy-ssri-vs-placebo-depression | elicit | elicit | — | **elicit** | 3 | 3.92 |
| exact-flaura-osimertinib | manan | manan | — | **manan** | 4.92 | 4.5 |
| exact-keynote-006-melanoma | manan | manan | — | **manan** | 4.92 | 4.25 |
| family-keynote-trials | manan | manan | — | **manan** | 3.75 | 3.08 |
| onc-her2-adjuvant-residual | tie | manan | — | **tie** | 4.58 | 4.42 |
| onc-immunotherapy-broad | tie | tie | tie | **tie** | 3.39 | 3.33 |
| onc-car-t-lbcl-pico | elicit | elicit | elicit | **elicit** | 2.56 | 4.56 |
| onc-checkpoint-irae-safety | manan | manan | manan | **manan** | 4.72 | 3.33 |
| exact-dawn-thrombectomy | elicit | elicit | tie | **elicit** | 4.33 | 4.56 |
| neuro-thrombectomy-broad | elicit | elicit | tie | **elicit** | 2.89 | 3.44 |
| neuro-tenecteplase-vs-alteplase | manan | manan | manan | **manan** | 4.94 | 3.5 |
| neuro-lecanemab-pico | elicit | tie | manan | **tie** | 3.39 | 3.22 |
| neuro-ms-dmt-comparison | elicit | elicit | elicit | **elicit** | 3.83 | 4.39 |
| neuro-epilepsy-guideline | elicit | elicit | elicit | **elicit** | 2.56 | 4.83 |
| exact-recovery-tocilizumab | manan | manan | manan | **manan** | 4.44 | 4.06 |
| id-hiv-prep-pico | elicit | elicit | elicit | **elicit** | 2.56 | 4.94 |
| id-sepsis-broad | manan | manan | manan | **manan** | 4.5 | 2.61 |
| id-antibiotic-duration-pneumonia | tie | elicit | tie | **tie** | 3.94 | 3.94 |
| id-paxlovid-recency | manan | elicit | elicit | **elicit** | 3.56 | 4.11 |
| id-fluoroquinolone-cdiff-safety | tie | manan | manan | **manan** | 4.61 | 3.56 |
| endo-surmount-obesity | manan | manan | tie | **manan** | 5 | 4.61 |
| exact-select-semaglutide | manan | manan | tie | **manan** | 5 | 4.39 |
| endo-thyroid-guideline | elicit | elicit | elicit | **elicit** | 2.33 | 4.28 |
| endo-glp1-mechanism | tie | manan | tie | **tie** | 4.06 | 3.89 |
| endo-t2dm-first-line-pico | manan | manan | elicit | **manan** | 3.44 | 3.39 |
| exact-dapa-ckd | manan | manan | tie | **manan** | 5 | 4.17 |
| neph-finerenone-pico | elicit | elicit | — | **elicit** | 4 | 4.5 |
| neph-iga-nephropathy-recency | manan | manan | manan | **manan** | 4.22 | 3.83 |
| neph-ckd-anemia-broad | manan | manan | manan | **manan** | 4 | 3.39 |
| family-partner-trials | manan | manan | manan | **manan** | 5 | 2.94 |
| family-emperor-sglt2-hf | manan | manan | manan | **manan** | 4.94 | 3.11 |
| exact-plato-ticagrelor | elicit | elicit | elicit | **elicit** | 2.33 | 4.67 |
| sr-doac-vs-warfarin-metaanalysis | manan | manan | manan | **manan** | 4.17 | 3.67 |
| sr-pci-vs-cabg-metaanalysis | manan | manan | manan | **manan** | 4.67 | 3.39 |
| guideline-esc-heart-failure | elicit | manan | manan | **manan** | 4.44 | 4.11 |
| recency-tavr-2025 | manan | manan | manan | **manan** | 4.22 | 3.06 |
| lto-stampede-bariatric-cardiac | tie | elicit | elicit | **elicit** | 3.78 | 4.44 |
| recency-esketamine-monotherapy-2025 | manan | manan | manan | **manan** | 4.72 | 3.94 |
| family-evolut-trials | manan | manan | manan | **manan** | 4.61 | 3 |
| family-sglt2-cvot-trials | elicit | elicit | tie | **elicit** | 2.5 | 2.78 |
| acronym-aristotle | manan | manan | elicit | **manan** | 4.67 | 4.56 |
| acronym-empa-reg | manan | manan | tie | **manan** | 4.89 | 4.56 |
| family-zuma-cart-trials | elicit | elicit | elicit | **elicit** | 4.17 | 4.83 |
| ambiguous-ace-acronym | manan | elicit | manan | **manan** | 2.89 | 2.89 |
| ambiguous-cast-acronym | elicit | elicit | elicit | **elicit** | 3.39 | 4.67 |
| negctrl-keynote-heart-failure | elicit | elicit | elicit | **elicit** | 1.67 | 4.5 |
| negctrl-dapa-oncology | elicit | elicit | tie | **elicit** | 1.56 | 2.56 |
| negctrl-recovery-orthopedics | tie | elicit | tie | **tie** | 3.94 | 4.22 |

## Tally (by per-query majority)

- **Manan wins: 47**
- Elicit wins: 29
- Ties: 11
- **Manan beats-or-ties: 58/87 = 67%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Close and complementary: Engine A won 41 queries, B 36, with 10 ties. A excelled at recovering primary landmark RCTs and full trial families (EGDT, CATIE, Evolut, PARTNER family, finerenone), recency queries, quantitative safety meta-analyses, and negative controls (B wrongly surfaced KEYNOTE oncology for the HF control). B excelled when it held the exact primary A missed (PLATO, ZUMA-7, EMPEROR-Reduced, HPTN trials), offered cleaner metadata, and surfaced more current guidelines, but more often returned reviews/meta-analyses in place of landmark trials.
- **codex:** winner=B — A:39 B:46 tie:2 across 87 queries
- **deepseek:** winner=B — A:9 B:21 tie:12 across 42 queries
