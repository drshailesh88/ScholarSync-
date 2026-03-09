# Research / Paper Search Quality Assessment
**Competitor Benchmark:** Elicit / SciSpace
**Date:** 2026-03-09

## Scores
| Dimension | Score (1-5) | Evidence |
|-----------|-------------|----------|
| D1: Responsiveness | 1/5 | The benchmark query (`SGLT2 inhibitors heart failure`) remained stuck in `Searching...` for more than 13 seconds with no results rendered. |
| D2: Feedback | 2/5 | The page has a strong search box, visible filters, and a disabled `Searching...` state, but there was no progress detail, timeout, or failure message once the query stalled. |
| D3: Error Recovery | 1/5 | No user-facing recovery path was shown. Browser diagnostics reported a hydration mismatch, but the UI surfaced nothing actionable. |
| D4: Task Efficiency | 1/5 | I could not complete the benchmark task because the initial search never produced results, so evaluation, saving, and abstract viewing were blocked. |
| D5: Discoverability | 4/5 | Search is obvious on page load. Filters and suggested queries are prominent. |
| D6: Visual Polish | 3/5 | The initial layout is polished and competitive-looking, but the broken loading state undercuts the credibility of the page. |
| D7: Edge Cases | 1/5 | The first normal query already failed. A hydration mismatch in the client suggests the page is unstable before edge-case testing even begins. |

## OVERALL: 13/35
## Competitor Parity Rating: FAR BELOW

## Specific Gaps Found
| # | Gap Description | Severity | Estimated Effort | Screenshot |
|---|-----------------|----------|------------------|------------|
| 1 | A standard benchmark query never completed; the page remained in `Searching...` with no results after more than 13 seconds. | CRITICAL | M | `e2e/quality-assessment/research/03-stuck-search.png` |
| 2 | The browser surfaced a hydration mismatch on `/research`, indicating a client/server render bug that can destabilize the main workflow before results load. | CRITICAL | M | `e2e/quality-assessment/research/03-stuck-search.png` |
| 3 | No timeout, retry, or explanatory error state appears when search fails or stalls. | IMPORTANT | S | `e2e/quality-assessment/research/02-results.png` |
| 4 | Filters are visible, but their real usefulness could not be verified because the initial result set never loaded. | IMPORTANT | M | `e2e/quality-assessment/research/01-initial-load.png` |

## What Works Well
- The entry point is clear and immediately understandable.
- Suggested queries and topical filters are visible without scrolling.
- The visual shell is strong enough to feel competitive if the underlying workflow is fixed.
