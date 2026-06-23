# BLINDED LLM-Council Verdict — Manan vs Elicit

Cycle dir: `cycle1-entity-drift` · Manan run: `cycle1-entity-drift` · blinding salt: `cycle1`
Judges (isolated, blinded A/B): opus, codex, grok.

## Per-query majority vote (de-anonymized)

| query | opus | codex | grok | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 4.06 | 4.89 |
| exact-dapa-hf | manan | manan | manan | **manan** | 4.83 | 3.72 |
| recency-lecanemab | elicit | manan | elicit | **elicit** | 4 | 4.11 |
| pico-sglt2-cv-mortality | elicit | elicit | manan | **elicit** | 3.94 | 3.72 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.5 | 3.72 |
| compare-doac-vs-warfarin | manan | manan | manan | **manan** | 4.11 | 2.78 |
| exact-recovery-dex | manan | manan | manan | **manan** | 4.83 | 3.67 |
| exact-keynote-189 | manan | manan | tie | **manan** | 4.89 | 4.61 |
| acronym-dapa-hf | manan | manan | manan | **manan** | 4.72 | 3.94 |
| acronym-partner-3 | manan | manan | manan | **manan** | 3.72 | 1.56 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.61 | 2.39 |
| acronym-sprint | elicit | elicit | elicit | **elicit** | 3.78 | 4.17 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 3.5 | 4.22 |
| broad-cap-treatment | manan | manan | manan | **manan** | 4.33 | 3 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.17 | 2.44 |
| pico-egdt-septic-shock | manan | elicit | tie | **tie** | 4.78 | 4.67 |
| pico-oxygen-icu | tie | manan | manan | **manan** | 4.39 | 3.83 |
| recency-semaglutide-cv-2025 | elicit | elicit | elicit | **elicit** | 2.83 | 3.94 |
| recency-cart-myeloma | elicit | elicit | elicit | **elicit** | 3.17 | 4 |
| sr-statins-primary-prevention | manan | manan | manan | **manan** | 4.78 | 3.61 |
| sr-sglt2-hf-hospitalization | manan | manan | manan | **manan** | 4.89 | 4.11 |
| sr-cochrane-steroids-sepsis | elicit | elicit | tie | **elicit** | 4.39 | 4.56 |
| guideline-aortic-stenosis | manan | manan | manan | **manan** | 4.61 | 3.56 |
| guideline-kdigo-ckd | manan | manan | manan | **manan** | 4.39 | 3.78 |
| lto-bariatric-diabetes | manan | manan | manan | **manan** | 4.94 | 3.89 |
| lto-pci-vs-cabg-left-main | manan | manan | manan | **manan** | 5 | 4 |
| lto-dapa-ckd | manan | manan | elicit | **manan** | 4.5 | 4.39 |
| safety-vaccine-myocarditis | elicit | manan | tie | **tie** | 4.94 | 4.89 |
| safety-glp1-pancreatitis | elicit | elicit | elicit | **elicit** | 3.44 | 4.39 |
| safety-sglt2-dka | elicit | elicit | elicit | **elicit** | 4.11 | 4.39 |
| safety-fluoroquinolone-aneurysm | tie | manan | tie | **tie** | 5 | 4.89 |
| compare-tirzepatide-semaglutide | manan | elicit | tie | **tie** | 4.94 | 4.56 |
| compare-ticagrelor-clopidogrel | manan | manan | tie | **manan** | 5 | 4.61 |
| mechanism-sglt2-cardioprotection | elicit | elicit | elicit | **elicit** | 4 | 4.94 |

## Tally (by per-query majority)

- **Manan wins: 19**
- Elicit wins: 11
- Ties: 4
- **Manan beats-or-ties: 23/34 = 68%** (Stop gate ≥ 80%)

## Judge overall summaries (blinded — A/B)

- **opus:** winner=A — Engine A wins the majority of queries, driven by superior landmark recall on acronym/exact-paper and long-term-outcome queries (notably resolving PARTNER 3 to the correct cardiac trial where B returned the HIV PARTNER study, and surfacing landmark DOAC and bariatric/STAMPEDE RCTs B missed) and cleaner metadata with fewer junk entries. Engine B is stronger on recency-sensitive and guideline-current queries (2024 ESC AF, current ACC/AHA VHD, SELECT/semaglutide, SGLT2-DKA and mechanism), where it favors newer or more on-topic evidence. Overall A edges B on recall, ranking, and trust across the 30-query set, with several ties on safety queries where both performed excellently.
- **codex:** winner=B — B wins overall by a modest margin across the 34 queries. A is stronger on several exact-paper, systematic-review, and long-term-outcome searches, but B more often ranks current guideline, acronym-resolution, recency, safety, and head-to-head comparison evidence higher with fewer severe query-resolution failures.
- **grok:** winner=A — Engine A more consistently retrieves and correctly ranks landmark papers, maintains higher metadata quality, and avoids irrelevant or malformed entries across exact, guideline, and long-term outcome queries. Engine B occasionally excels on recency or acronym resolution but shows more variability and lower trust scores.
