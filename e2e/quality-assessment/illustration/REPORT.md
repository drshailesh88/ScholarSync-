# Illustration Quality Assessment
**Competitor Benchmark:** BioRender / Napkin.AI
**Date:** 2026-03-09

## Scores
| Dimension | Score (1-5) | Evidence |
|-----------|-------------|----------|
| D1: Responsiveness | 4/5 | The agent workspace loaded quickly and the benchmark prompt produced a preview state with edit/export controls in about 10 seconds. |
| D2: Feedback | 4/5 | Good template categories, prompt input, preview controls, regenerate action, and visible export options. |
| D3: Error Recovery | 3/5 | The working agent route was solid, but the top-level `Create with AI` entry did not map cleanly to a usable `/illustrate/create` workspace during testing. |
| D4: Task Efficiency | 4/5 | Prompt-to-preview was straightforward, and export controls were one click away from the preview. |
| D5: Discoverability | 4/5 | Categories, starter prompts, and the main prompt box are all easy to understand. |
| D6: Visual Polish | 4/5 | The module feels like a real diagram workspace rather than a thin prompt wrapper. |
| D7: Edge Cases | 3/5 | I verified prompt generation and export affordances, but I did not fully validate deep editor manipulation or very complex prompts. |

## OVERALL: 26/35
## Competitor Parity Rating: ACCEPTABLE

## Specific Gaps Found
| # | Gap Description | Severity | Estimated Effort | Screenshot |
|---|-----------------|----------|------------------|------------|
| 1 | The top-level `Create with AI` path did not resolve to a useful `/illustrate/create` workspace; the functional generation path was `/illustrate/agent`. | IMPORTANT | M | `e2e/quality-assessment/illustration/02-create-page.png` |
| 2 | Export options exposed SVG and PNG, but PDF export was not visible in the tested preview flow. | IMPORTANT | M | `e2e/quality-assessment/illustration/04-after-prompt.png` |

## What Works Well
- The agent route has good prompt starters and domain-specific categories.
- The benchmark prompt generated a usable preview with zoom, regenerate, edit, and export controls.
- SVG and PNG export are surfaced directly in the preview.
