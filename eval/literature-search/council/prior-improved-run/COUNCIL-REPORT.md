# LLM-Council Verdict — Manan vs Elicit

Judges: opus, codex, grok (cross-family: Anthropic Opus · OpenAI Codex · xAI Grok).
Manan run: `improved` (note: this run had the optional Cohere cross-encoder rerank **inactive** — a conservative lower bound).

## Per-query majority vote

| query | opus | codex | grok | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | elicit | **elicit** | 2.94 | 5 |
| exact-dapa-hf | manan | manan | manan | **manan** | 4.94 | 4.5 |
| recency-lecanemab | elicit | elicit | elicit | **elicit** | 2.56 | 4.83 |
| pico-sglt2-cv-mortality | manan | manan | manan | **manan** | 4.22 | 4 |
| guideline-af-esc | manan | manan | manan | **manan** | 4.33 | 3.56 |
| compare-doac-vs-warfarin | elicit | manan | manan | **manan** | 3.56 | 3.17 |

## Tally (by per-query majority)

- **Manan wins: 4**
- Elicit wins: 2
- Ties: 0

Overall winner per judge: opus=elicit, codex=manan, grok=manan.

## Judge summaries

- **opus:** Elicit wins three queries (TAVR, lecanemab, DOAC-vs-warfarin) decisively on landmark recall, evidence-hierarchy ranking, and freedom from off-topic items, taking both must-have-driven landmark queries cleanly. Manan wins three (exact DAPA-HF, SGLT2 PICO, ESC AF guideline) by supplying primary CVOT RCTs and the most current guideline, but its tendency to miss landmark trials (PARTNER 3, CLARITY-AD) and admit irrelevant papers into the top 10 is the decisive weakness. Both have excellent metadata; Elicit's stronger landmark recall and cleaner lists give it the overall edge.
- **codex:** Manan wins four of six queries, largely because its metadata is complete and it often surfaces higher-quality synthesis or guideline evidence. Elicit is clearly better on landmark/exact recall for TAVR and lecanemab, where Manan's ranking and omission of must-have trials are serious weaknesses.
- **grok:** Manan wins four of six queries by excelling at exact-paper retrieval, guideline coverage, and PICO queries that benefit from primary CVOT trials. Elicit decisively wins landmark-heavy long-term outcome and recency queries where hierarchical ranking of must-have RCTs is critical. Neither system consistently surfaces all pivotal primary trials for therapy-comparison queries.

## Notes per query (first judge with a note)

- **tavr-low-risk-6yr:** Elicit returns both landmarks (PARTNER 3 and Evolut 6-yr) at the top with a clean list, while Manan misses PARTNER 3 and pollutes its top 10 with off-topic mitral-leaflet and V-A ECMO papers.
- **exact-dapa-hf:** Both nail the exact DAPA-HF paper at #1 with correct identifiers, but Manan's remaining results are high-value related trials whereas Elicit returns only three items, two of which are low-value commentary/appraisal.
- **recency-lecanemab:** Manan chases 2026 recency items but entirely misses the CLARITY-AD landmark, while Elicit leads with CLARITY-AD plus its phase 2 and 36-month OLE follow-ups.
- **pico-sglt2-cv-mortality:** Manan supplies the defining CVOT RCTs (EMPA-REG, CANVAS, DECLARE) that directly answer the PICO outcome, which Elicit's all-meta-analysis list lacks despite being tightly on-topic.
- **guideline-af-esc:** Both rank the authoritative ESC AF guideline at #1, but Manan also surfaces the current 2024 ESC/EACTS guideline near the top while Elicit omits it and includes a duplicate translated edition.
- **compare-doac-vs-warfarin:** Neither returns the four landmark RCTs (RE-LY/ROCKET-AF/ARISTOTLE/ENGAGE), but Elicit stays more consistently on the DOAC-vs-warfarin comparison whereas Manan drifts into Watchman/CKD/device-surgery items.