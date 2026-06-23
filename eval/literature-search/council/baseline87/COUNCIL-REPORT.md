# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `baseline87` · Manan run: `baseline87` · blinding salt: `base87`
Judges (isolated, blinded A/B): opus, grok, deepseek.

## Per-query majority vote (de-anonymized)

| query | opus | grok | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 4.22 | 5 |
| exact-dapa-hf | manan | manan | manan | **manan** | 5 | 4 |
| recency-lecanemab | manan | elicit | elicit | **elicit** | 4.44 | 4.72 |
| pico-sglt2-cv-mortality | elicit | manan | manan | **manan** | 4.28 | 3.78 |
| guideline-af-esc | manan | manan | tie | **manan** | 4.72 | 4.39 |
| compare-doac-vs-warfarin | manan | tie | manan | **manan** | 4.22 | 3.56 |
| exact-recovery-dex | manan | manan | manan | **manan** | 4.94 | 4.44 |
| exact-keynote-189 | elicit | tie | tie | **tie** | 4.89 | 5 |
| acronym-dapa-hf | elicit | manan | tie | **tie** | 4.5 | 4.44 |
| acronym-partner-3 | manan | manan | manan | **manan** | 4.94 | 1.22 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.94 | 3.44 |
| acronym-sprint | manan | elicit | tie | **tie** | 4.67 | 4.72 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 3.89 | 4.83 |
| broad-cap-treatment | manan | elicit | manan | **manan** | 4.44 | 4 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.17 | 2.94 |
| pico-egdt-septic-shock | manan | tie | tie | **tie** | 5 | 4.94 |
| pico-oxygen-icu | elicit | elicit | elicit | **elicit** | 3.94 | 4.83 |
| recency-semaglutide-cv-2025 | elicit | elicit | elicit | **elicit** | 3.39 | 4.33 |
| recency-cart-myeloma | elicit | elicit | elicit | **elicit** | 3.17 | 4.22 |
| sr-statins-primary-prevention | manan | manan | manan | **manan** | 4.83 | 4.06 |
| sr-sglt2-hf-hospitalization | manan | tie | tie | **tie** | 5 | 4.83 |
| sr-cochrane-steroids-sepsis | manan | tie | tie | **tie** | 4.94 | 4.78 |
| guideline-aortic-stenosis | manan | manan | tie | **manan** | 5 | 4.33 |
| guideline-kdigo-ckd | manan | tie | tie | **tie** | 4.89 | 4.61 |
| lto-bariatric-diabetes | manan | tie | tie | **tie** | 5 | 4.78 |
| lto-pci-vs-cabg-left-main | manan | tie | tie | **tie** | 5 | 4.67 |
| lto-dapa-ckd | manan | tie | tie | **tie** | 4.89 | 4.67 |
| safety-vaccine-myocarditis | elicit | tie | tie | **tie** | 4.78 | 4.94 |
| safety-glp1-pancreatitis | elicit | elicit | elicit | **elicit** | 4.06 | 4.83 |
| safety-sglt2-dka | elicit | elicit | elicit | **elicit** | 4.06 | 4.72 |
| safety-fluoroquinolone-aneurysm | tie | tie | tie | **tie** | 4.94 | 4.94 |
| compare-tirzepatide-semaglutide | elicit | tie | tie | **tie** | 4.67 | 4.94 |
| compare-ticagrelor-clopidogrel | manan | tie | tie | **tie** | 5 | 4.72 |
| mechanism-sglt2-cardioprotection | elicit | elicit | elicit | **elicit** | 4.22 | 5 |
| psy-stard-major-depression | manan | tie | tie | **tie** | 4.94 | 4.83 |
| psy-catie-antipsychotics | manan | manan | tie | **manan** | 4.94 | 4.28 |
| psy-esketamine-trd | tie | tie | tie | **tie** | 5 | 5 |
| psy-ketamine-nmda-depression | manan | tie | tie | **tie** | 4.89 | 4.67 |
| psy-lithium-bipolar-maintenance | manan | tie | tie | **tie** | 5 | 4.83 |
| psy-ssri-vs-placebo-depression | elicit | manan | tie | **tie** | 4.11 | 4.11 |
| exact-flaura-osimertinib | manan | tie | tie | **tie** | 5 | 4.89 |
| exact-keynote-006-melanoma | manan | tie | tie | **tie** | 5 | 4.78 |
| family-keynote-trials | manan | manan | manan | **manan** | 4.94 | 4 |
| onc-her2-adjuvant-residual | manan | tie | tie | **tie** | 4.89 | 4.78 |
| onc-immunotherapy-broad | elicit | manan | tie | **tie** | 4.11 | 4.28 |
| onc-car-t-lbcl-pico | elicit | elicit | elicit | **elicit** | 3.89 | 5 |
| onc-checkpoint-irae-safety | manan | manan | tie | **manan** | 5 | 4.17 |
| exact-dawn-thrombectomy | tie | tie | manan | **tie** | 4.78 | 4.67 |
| neuro-thrombectomy-broad | manan | manan | manan | **manan** | 4.67 | 4.11 |
| neuro-tenecteplase-vs-alteplase | manan | manan | manan | **manan** | 5 | 3.89 |
| neuro-lecanemab-pico | elicit | elicit | tie | **elicit** | 4.11 | 4.44 |
| neuro-ms-dmt-comparison | elicit | tie | tie | **tie** | 4.67 | 4.89 |
| neuro-epilepsy-guideline | elicit | tie | tie | **tie** | 4.67 | 5 |
| exact-recovery-tocilizumab | manan | tie | tie | **tie** | 5 | 4.61 |
| id-hiv-prep-pico | elicit | elicit | elicit | **elicit** | 3.89 | 5 |
| id-sepsis-broad | manan | tie | manan | **manan** | 5 | 4 |
| id-antibiotic-duration-pneumonia | elicit | manan | tie | **tie** | 4.72 | 4.67 |
| id-paxlovid-recency | manan | manan | elicit | **manan** | 4.78 | 4.17 |
| id-fluoroquinolone-cdiff-safety | manan | tie | tie | **tie** | 4.94 | 4.83 |
| endo-surmount-obesity | tie | tie | tie | **tie** | 5 | 5 |
| exact-select-semaglutide | manan | tie | tie | **tie** | 5 | 4.89 |
| endo-thyroid-guideline | elicit | manan | tie | **tie** | 4.61 | 4.33 |
| endo-glp1-mechanism | elicit | elicit | elicit | **elicit** | 4.06 | 4.83 |
| endo-t2dm-first-line-pico | manan | elicit | tie | **tie** | 4.39 | 4.61 |
| exact-dapa-ckd | manan | tie | tie | **tie** | 5 | 4.72 |
| neph-finerenone-pico | elicit | tie | tie | **tie** | 4.94 | 4.83 |
| neph-iga-nephropathy-recency | manan | manan | tie | **manan** | 4.44 | 4.17 |
| neph-ckd-anemia-broad | manan | manan | manan | **manan** | 5 | 3.94 |
| family-partner-trials | manan | manan | manan | **manan** | 4.94 | 3.5 |
| family-emperor-sglt2-hf | manan | tie | tie | **tie** | 5 | 4.61 |
| exact-plato-ticagrelor | manan | tie | tie | **tie** | 5 | 4.78 |
| sr-doac-vs-warfarin-metaanalysis | manan | manan | tie | **manan** | 5 | 4.44 |
| sr-pci-vs-cabg-metaanalysis | manan | tie | tie | **tie** | 5 | 4.56 |
| guideline-esc-heart-failure | manan | tie | tie | **tie** | 5 | 4.61 |
| recency-tavr-2025 | manan | manan | tie | **manan** | 4.61 | 4 |
| lto-stampede-bariatric-cardiac | elicit | tie | tie | **tie** | 4.83 | 4.94 |
| recency-esketamine-monotherapy-2025 | elicit | tie | tie | **tie** | 4.44 | 4.89 |
| family-evolut-trials | elicit | elicit | elicit | **elicit** | 0 | 4.72 |
| family-sglt2-cvot-trials | elicit | elicit | elicit | **elicit** | 0 | 4.56 |
| acronym-aristotle | manan | tie | tie | **tie** | 5 | 4.78 |
| acronym-empa-reg | elicit | tie | tie | **tie** | 4.67 | 5 |
| family-zuma-cart-trials | elicit | elicit | elicit | **elicit** | 0 | 5 |
| ambiguous-ace-acronym | manan | manan | manan | **manan** | 4.83 | 3.67 |
| ambiguous-cast-acronym | elicit | tie | tie | **tie** | 4.67 | 4.94 |
| negctrl-keynote-heart-failure | elicit | tie | elicit | **elicit** | 2.56 | 3.33 |
| negctrl-dapa-oncology | elicit | tie | tie | **tie** | 2.83 | 2.94 |
| negctrl-recovery-orthopedics | elicit | tie | tie | **tie** | 3 | 3.17 |

## Tally (by per-query majority)

- **Manan wins: 24**
- Elicit wins: 17
- Ties: 46
- **Manan beats-or-ties: 70/87 = 80%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Engine A wins the majority of queries on the strength of cleaner metadata, better landmark ranking on exact-paper/acronym/family queries, and reliably resolving trial families (ZUMA, EMPEROR, PARTNER-3 low-risk) where B sometimes returned '(no results)' or off-topic items. Engine B was stronger on several PICO and recency queries (oxygen-ICU, tenecteplase-vs-alteplase, CKD-anemia HIF-PHI trials, paxlovid less so) by surfacing the actual pivotal RCTs A missed, and on a few guideline/disambiguation queries. Net, A took roughly half the queries outright with B taking a substantial minority and several ties, giving A a modest overall edge.
- **grok:** winner=A — Engine A more consistently surfaces exact landmark papers with superior recall, ranking and metadata across exact-paper, acronym and family queries. Engine B performs better on some recency and broad guideline queries but occasionally misses required landmarks or returns lower-quality items.
- **deepseek:** winner=B — Engine B wins overall with superior performance in recency-sensitive queries, systematic reviews, and ambiguous acronym resolution, while Engine A excels in some exact paper retrievals and negative controls. Engine B demonstrated better consistency across a wider range of query types, particularly in delivering high-quality, relevant results for complex clinical questions.
