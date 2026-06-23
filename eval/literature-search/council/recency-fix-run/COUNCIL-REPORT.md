# LLM-Council Verdict — Manan vs Elicit

Judges: opus, codex, deepseek (cross-family: Anthropic Opus · OpenAI Codex · Google Gemini).
Manan run: `recency-fix` (current `main` HEAD, with the OpenAlex wildcard-400 fix and Cohere cross-encoder active).

## Per-query majority vote

| query | opus | codex | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | tie | **elicit** | 4.67 | 4.94 |
| exact-dapa-hf | elicit | elicit | elicit | **elicit** | 4.33 | 5 |
| recency-lecanemab | elicit | elicit | elicit | **elicit** | 4.06 | 5 |
| pico-sglt2-cv-mortality | elicit | elicit | manan | **elicit** | 4.22 | 4.39 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.67 | 4.11 |
| compare-doac-vs-warfarin | elicit | manan | manan | **manan** | 4.28 | 3.89 |

## Tally (by per-query majority)

- **Manan wins: 2**
- Elicit wins: 4
- Ties: 0

Overall winner per judge: opus=elicit, codex=elicit, deepseek=manan.

## Judge summaries

- **opus:** Elicit wins five of six queries on the strength of cleaner, on-target top-10 lists, reliable placement of the exact or landmark paper at #1 (PARTNER 3, the exact DAPA-HF paper, CLARITY-AD), and consistent inclusion of pivotal recent follow-ups without irrelevant items. Manan is competitive and frequently excellent on meta-analytic coverage with complete, correct metadata, and it clearly wins the guideline query by retrieving the current 2024 ESC AF guideline that Elicit omits. Manan's recurring weaknesses are relevance drift in the PICO and comparison queries and burying the exact-title paper, which cost it the close head-to-heads.
- **codex:** Elicit wins four of six queries, with especially strong performance on exact-paper retrieval and landmark recall for TAVR, DAPA-HF, and lecanemab. Manan is competitive and wins the ESC guideline and DOAC comparison queries, but its ranking and topical precision are less consistent.
- **deepseek:** Manan wins 3 queries, Elicit wins 2, and 1 tie. Manan demonstrates better recall of recent guidelines and comprehensive meta-analyses, while Elicit excels in ranking exact papers and recency queries. Overall, Manan provides more clinically relevant and up-to-date results.

## Notes per query (first judge with a note)

- **tavr-low-risk-6yr:** Elicit surfaces both landmarks with the original PARTNER 3 (2019) at #1 and the Evolut 6-yr trial at #2, whereas Manan has the Evolut 6-yr trial and the PARTNER 3 5-yr follow-up but omits the pivotal PARTNER 3 2019 paper itself.
- **exact-dapa-hf:** For an exact-title retrieval the target DAPA-HF paper must rank #1, which Elicit does, while Manan buries the exact paper at #6 behind related meta-analyses and other dapagliflozin/SGLT2i trials.
- **recency-lecanemab:** Both lead with the CLARITY-AD trial at #1, but Elicit also captures the pivotal 36-month open-label extension (2025) and stays uniformly high-quality, while Manan misses that key recent follow-up and dilutes its top 10 with small case series, PET-imaging cohorts, and a tangential scoping review.
- **pico-sglt2-cv-mortality:** Elicit's results are all SGLT2i CV-outcome/mortality meta-analyses tightly matching the PICO outcome, whereas Manan drifts to renal/CKD outcomes, a HF trial, and an off-target GLP-1 oral-semaglutide analysis.
- **guideline-af-esc:** Manan returns the current 2024 ESC/EACTS AF guideline plus the 2020 and 2016 editions ranked high, while Elicit omits the latest 2024 guideline entirely and returns dated, duplicative translated editions despite high citation counts.
- **compare-doac-vs-warfarin:** Both surface the COMBINE-AF patient-level network meta-analysis and the BMJ network MA, but Manan contaminates its top 10 with off-topic device/LAA-closure (Watchman FLX, BRUISE CONTROL-2) and factor-XIa (asundexian) items, while Elicit stays entirely on the DOAC-vs-warfarin question despite a non-primary Journal Watch lead and a low-cite journal MA.