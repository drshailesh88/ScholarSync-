# LLM-Council Verdict — Manan vs Elicit

Judges: opus, codex, deepseek (cross-family: Anthropic Opus · OpenAI Codex · Google Gemini).
Manan run: `fix-wildcard` (current `main` HEAD, with the OpenAlex wildcard-400 fix and Cohere cross-encoder active).

## Per-query majority vote

| query | opus | codex | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | tie | **elicit** | 4.28 | 4.83 |
| exact-dapa-hf | elicit | elicit | elicit | **elicit** | 4.44 | 4.67 |
| recency-lecanemab | elicit | elicit | elicit | **elicit** | 3 | 4.83 |
| pico-sglt2-cv-mortality | elicit | elicit | manan | **elicit** | 3.83 | 4 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.44 | 3.89 |
| compare-doac-vs-warfarin | tie | manan | tie | **tie** | 3.89 | 3.67 |

## Tally (by per-query majority)

- **Manan wins: 1**
- Elicit wins: 4
- Ties: 1

Overall winner per judge: opus=elicit, codex=elicit, deepseek=elicit.

## Judge summaries

- **opus:** Elicit wins four of six queries on the strength of superior landmark recall and ranking discipline, consistently placing the must-have paper at or near the top (PARTNER 3, the exact DAPA-HF paper, CLARITY-AD) and keeping its top-10 lists tightly on-target. Manan has excellent metadata completeness and the freshest results, and it clearly wins the guideline query by retrieving the current 2024 ESC AF guideline that Elicit misses, but it repeatedly buries or omits the key landmark trial and admits off-topic items (device trials, a GLP-1 agent, in-vitro studies) into its top 10. The DOAC-vs-warfarin query is a genuine tie, with Manan's stronger top results offset by topical contamination and Elicit offset by a non-primary lead item and a dubious-journal entry.
- **codex:** Elicit wins four of six queries, mainly through stronger landmark recall and better ranking of exact or must-have papers. Manan performs well on metadata and guidelines, but it misses key landmark evidence in several clinically important searches and includes more off-target items.
- **deepseek:** Elicit performed better on exact paper and recency queries, while Manan excelled on guideline and PICO queries. Overall, Elicit had stronger recall of landmark trials and better ranking, leading to a slight edge.

## Notes per query (first judge with a note)

- **tavr-low-risk-6yr:** Elicit returns both landmarks with PARTNER 3 ranked #1 and the Evolut 6-yr trial at #2, whereas Manan has the Evolut 6-yr trial but omits PARTNER 3 entirely and pads its list with meta-analyses.
- **exact-dapa-hf:** For an exact-title retrieval the target DAPA-HF paper must rank #1, which Elicit does, while Manan buries the exact paper at #6 behind meta-analyses and other SGLT2i trials.
- **recency-lecanemab:** Manan is impressively fresh (all 2026) but misses the foundational CLARITY-AD trial and skews to low-evidence case series, PET imaging and in-vitro work, while Elicit anchors on CLARITY-AD plus a recent 2025 36-month open-label extension.
- **pico-sglt2-cv-mortality:** Elicit's list is tightly on-PICO (SGLT2i vs placebo, CV outcomes/mortality in T2DM) whereas Manan dilutes its top 10 with off-PICO items including an oral-semaglutide GLP-1 trial and pure renal/CKD analyses.
- **guideline-af-esc:** Manan surfaces the full ESC AF guideline series including the current 2024 ESC/EACTS guideline, which Elicit omits entirely while returning dated and duplicative translated editions.
- **compare-doac-vs-warfarin:** Manan's top results (COMBINE AF patient-level network MA, BMJ network MA) are strongest but it contaminates the top 10 with four off-topic device/perioperative items, while Elicit stays on-topic but leads with a non-primary Journal Watch summary and includes a dubious low-cite journal MA.