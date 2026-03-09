# Studio Editor Quality Assessment
**Competitor Benchmark:** Google Docs (solo editing, no collaboration) / Notion AI
**Date:** 2026-03-09

## Scores
| Dimension | Score (1-5) | Evidence |
|-----------|-------------|----------|
| D1: Responsiveness | 3/5 | Page reload to restored content took about 2.8s. Typing ~700 characters completed in about 0.4s with no dropped characters. Formatting actions that worked applied near-instantly, but some formatting paths were unreliable. |
| D2: Feedback | 3/5 | Good placeholder empty state, slash-command menu, export menu, and active-style toolbar highlight for Italic. Weak feedback for citation insertion and export; no clear success/error messaging for failed insertion. |
| D3: Error Recovery | 2/5 | Citation insertion stalled after reference creation without a recovery hint. Export had no visible progress or confirmation. No helpful guidance when a workflow failed. |
| D4: Task Efficiency | 2/5 | Basic writing is efficient, but citation insertion took multiple steps and still did not complete. Table insertion was not discoverable from the visible toolbar or slash menu. Benchmark task could not be completed cleanly. |
| D5: Discoverability | 3/5 | Core writing controls are obvious. Slash menu is useful. Citation is findable but too modal-heavy. Table insertion was not surfaced in obvious UI during testing. |
| D6: Visual Polish | 4/5 | Overall shell and toolbar feel coherent and professional. Minor polish issues: exiting a bullet list left extra empty paragraphs and the citation dialog state felt awkward. |
| D7: Edge Cases | 3/5 | Empty-state recovery works and Unicode input (`é ñ ∑ ≥ →`) rendered correctly. Reload persistence worked. List exit behavior was messy, and I did not observe graceful handling for failed citation/export flows. |

## OVERALL: 20/35
## Competitor Parity Rating: BELOW

## Specific Gaps Found
| # | Gap Description | Severity | Estimated Effort | Screenshot |
|---|-----------------|----------|------------------|------------|
| 1 | Manual citation creation works, but the actual in-text insertion flow did not complete during testing; the dialog stayed open and no citation appeared in the editor. | CRITICAL | M | `e2e/quality-assessment/studio/02-after-interactions.png` |
| 2 | Standard selection formatting was unreliable: `Ctrl+A` + `Ctrl+B` and toolbar Bold did not format the selected existing text in the tested flow. | IMPORTANT | M | `e2e/quality-assessment/studio/02-after-interactions.png` |
| 3 | Table insertion was not discoverable from the visible toolbar or slash-command menu during the session. | IMPORTANT | M | `e2e/quality-assessment/studio/01-initial-load.png` |
| 4 | Export exposed PDF/Word actions but provided no visible progress, confirmation, or observable export request in the tested Word path. | IMPORTANT | M | `e2e/quality-assessment/studio/02-after-interactions.png` |
| 5 | Exiting a bullet list left multiple empty paragraphs instead of a single clean paragraph break. | NICE | S | `e2e/quality-assessment/studio/02-after-interactions.png` |

## What Works Well
- The editor loads into a usable writing surface with a clear placeholder.
- Typing performance was solid and I did not observe dropped characters.
- Italic formatting applied correctly when the selection was explicitly set.
- Bullet lists continue correctly across multiple entries.
- Auto-save / persistence worked across a full page reload.
- Empty-state recovery after deleting all content is clear and functional.
