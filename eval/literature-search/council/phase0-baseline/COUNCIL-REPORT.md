# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `phase0-baseline` · Manan run: `phase0-baseline` · blinding salt: `phase0`
Judges (isolated, blinded A/B): opus, codex, grok.

## Per-query majority vote (de-anonymized)

| query | opus | codex | grok | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 3.89 | 4.94 |
| exact-dapa-hf | manan | manan | manan | **manan** | 4.83 | 3.72 |
| recency-lecanemab | elicit | manan | manan | **manan** | 4.06 | 3.94 |
| pico-sglt2-cv-mortality | elicit | elicit | manan | **elicit** | 4.11 | 3.72 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.5 | 3.72 |
| compare-doac-vs-warfarin | elicit | manan | manan | **manan** | 3.61 | 3.17 |
| exact-recovery-dex | manan | manan | manan | **manan** | 4.89 | 3.44 |
| exact-keynote-189 | manan | tie | manan | **manan** | 4.83 | 4.33 |
| acronym-dapa-hf | manan | manan | manan | **manan** | 4.78 | 4 |
| acronym-partner-3 | manan | manan | manan | **manan** | 2.94 | 1.39 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.67 | 2.94 |
| acronym-sprint | elicit | elicit | elicit | **elicit** | 4 | 4.39 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 2.78 | 4 |
| broad-cap-treatment | manan | manan | manan | **manan** | 4 | 3.11 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.28 | 2.44 |
| pico-egdt-septic-shock | manan | manan | manan | **manan** | 5 | 4.44 |
| pico-oxygen-icu | manan | manan | elicit | **manan** | 4.11 | 4.17 |
| recency-semaglutide-cv-2025 | elicit | elicit | elicit | **elicit** | 3 | 3.89 |
| recency-cart-myeloma | manan | elicit | manan | **manan** | 3.83 | 3.44 |
| sr-statins-primary-prevention | manan | elicit | elicit | **elicit** | 4.11 | 4.33 |
| sr-sglt2-hf-hospitalization | elicit | manan | manan | **manan** | 4.39 | 4.44 |
| sr-cochrane-steroids-sepsis | manan | elicit | elicit | **elicit** | 4.28 | 4.72 |
| guideline-aortic-stenosis | manan | manan | manan | **manan** | 4.72 | 3.72 |
| guideline-kdigo-ckd | elicit | elicit | manan | **elicit** | 4.33 | 4.17 |
| lto-bariatric-diabetes | manan | manan | elicit | **manan** | 4.61 | 4.39 |
| lto-pci-vs-cabg-left-main | manan | elicit | manan | **manan** | 4.89 | 4.39 |
| lto-dapa-ckd | manan | manan | tie | **manan** | 4.89 | 4.28 |
| safety-vaccine-myocarditis | tie | manan | tie | **tie** | 5 | 4.94 |
| safety-glp1-pancreatitis | elicit | elicit | elicit | **elicit** | 3.44 | 4.39 |
| safety-sglt2-dka | elicit | elicit | elicit | **elicit** | 4.11 | 4.5 |
| safety-fluoroquinolone-aneurysm | tie | manan | tie | **tie** | 5 | 4.83 |
| compare-tirzepatide-semaglutide | manan | elicit | elicit | **elicit** | 4.56 | 4.44 |
| compare-ticagrelor-clopidogrel | manan | manan | tie | **manan** | 4.94 | 4.61 |
| mechanism-sglt2-cardioprotection | elicit | elicit | tie | **elicit** | 3.89 | 4.67 |

## Tally (by per-query majority)

- **Manan wins: 20**
- Elicit wins: 12
- Ties: 2
- **Manan beats-or-ties: 22/34 = 65%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Engine A wins the majority of queries by maintaining tighter topical focus, cleaner metadata, and fewer irrelevant or duplicate entries, especially on exact-paper, mechanism, and systematic-review intents. Engine B wins where it surfaces the single most authoritative landmark that A misplaced or omitted (e.g., PARTNER 3, current ESC/ACC guidelines, landmark AF DOAC RCTs) and on some recency-sensitive queries. Two safety queries were genuine ties with both engines returning the landmark evidence.
- **codex:** winner=B — B wins narrowly overall, mainly by doing better on exact acronym resolution, guideline recency, and several therapy-comparison or safety queries. A was stronger when it stayed tightly focused on systematic reviews, mechanisms, and some long-term outcome questions, but it had more severe failures on acronym disambiguation and broad clinical retrieval.
- **grok:** winner=B — Engine B more consistently surfaces landmark papers at higher ranks, provides superior metadata completeness, and maintains better clinical relevance across guideline, exact-paper, and recency queries. Engine A occasionally excels on metadata cleanliness for exact trials but loses on ranking and recall of must-have studies.
