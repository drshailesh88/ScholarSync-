# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `cycle2-trial-primary` · Manan run: `cycle2-trial-primary` · blinding salt: `cycle2`
Judges (isolated, blinded A/B): opus, codex, grok.

## Per-query majority vote (de-anonymized)

| query | opus | codex | grok | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 3.94 | 4.94 |
| exact-dapa-hf | manan | manan | manan | **manan** | 4.89 | 4.17 |
| recency-lecanemab | tie | manan | manan | **manan** | 4.33 | 3.89 |
| pico-sglt2-cv-mortality | elicit | elicit | manan | **elicit** | 3.83 | 4 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.56 | 3.67 |
| compare-doac-vs-warfarin | elicit | manan | manan | **manan** | 3.94 | 3.28 |
| exact-recovery-dex | manan | manan | manan | **manan** | 4.83 | 3.72 |
| exact-keynote-189 | manan | elicit | tie | **tie** | 4.72 | 4.56 |
| acronym-dapa-hf | manan | manan | manan | **manan** | 4.89 | 3.61 |
| acronym-partner-3 | manan | manan | manan | **manan** | 3.67 | 1.61 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.78 | 2.39 |
| acronym-sprint | manan | manan | tie | **manan** | 4.78 | 4.22 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 3.61 | 4.28 |
| broad-cap-treatment | manan | manan | manan | **manan** | 3.89 | 3.22 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.11 | 2.72 |
| pico-egdt-septic-shock | manan | manan | tie | **manan** | 5 | 4.89 |
| pico-oxygen-icu | elicit | elicit | elicit | **elicit** | 4.17 | 4.5 |
| recency-semaglutide-cv-2025 | elicit | elicit | elicit | **elicit** | 3.11 | 4.56 |
| recency-cart-myeloma | tie | elicit | manan | **tie** | 3.44 | 3.72 |
| sr-statins-primary-prevention | manan | manan | manan | **manan** | 4.83 | 3.78 |
| sr-sglt2-hf-hospitalization | manan | manan | manan | **manan** | 5 | 4.44 |
| sr-cochrane-steroids-sepsis | elicit | elicit | tie | **elicit** | 4.61 | 4.72 |
| guideline-aortic-stenosis | manan | manan | manan | **manan** | 4.83 | 3.89 |
| guideline-kdigo-ckd | elicit | elicit | tie | **elicit** | 4.22 | 4.5 |
| lto-bariatric-diabetes | manan | manan | manan | **manan** | 4.94 | 4 |
| lto-pci-vs-cabg-left-main | tie | manan | manan | **manan** | 4.89 | 4.67 |
| lto-dapa-ckd | elicit | elicit | elicit | **elicit** | 4.17 | 4.56 |
| safety-vaccine-myocarditis | manan | manan | tie | **manan** | 5 | 4.94 |
| safety-glp1-pancreatitis | elicit | elicit | elicit | **elicit** | 3.72 | 4.67 |
| safety-sglt2-dka | manan | elicit | elicit | **elicit** | 4.39 | 4.28 |
| safety-fluoroquinolone-aneurysm | — | tie | tie | **tie** | 5 | 5 |
| compare-tirzepatide-semaglutide | — | elicit | tie | **tie** | 4.83 | 4.92 |
| compare-ticagrelor-clopidogrel | — | manan | tie | **tie** | 4.92 | 4.5 |
| mechanism-sglt2-cardioprotection | — | elicit | tie | **tie** | 3.83 | 4.5 |

## Tally (by per-query majority)

- **Manan wins: 18**
- Elicit wins: 10
- Ties: 6
- **Manan beats-or-ties: 24/34 = 71%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Engine A won 17 queries, Engine B 10, with 3 ties. A was more consistent on landmark recall for acronym and long-term-outcome queries (PARTNER 3, KEYNOTE-189, DAPA-HF, bariatric RCTs) and kept top-10 lists tightly on-target, while B repeatedly omitted primary landmark papers or drifted to adjacent topics. B's strengths were recency-sensitive and exact-paper queries (DAPA-HF exact, SPRINT original+final, SELECT, DAPA-CKD primary) where it retrieved the key trial that A missed.
- **codex:** winner=A — Engine A narrowly wins overall because it more often retrieved the exact landmark trial, acronym target, or high-quality systematic review in difficult broad and acronym queries. Engine B was stronger in several guideline, safety, and recency-sensitive searches, but it had more severe failures on acronym resolution and topic drift.
- **grok:** winner=B — B shows more consistent ranking of landmark papers, superior metadata completeness, and fewer irrelevant results across guideline, recency, and safety queries. A performs well on exact-paper and acronym queries but occasionally buries key results or includes noisier items.
