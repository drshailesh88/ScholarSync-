# Systematic Review Quality Assessment
**Competitor Benchmark:** Covidence / Rayyan / RevMan
**Date:** 2026-03-09

## Scores
| Dimension | Score (1-5) | Evidence |
|-----------|-------------|----------|
| D1: Responsiveness | 3/5 | The landing page and create modal opened quickly. |
| D2: Feedback | 2/5 | The landing copy is strong, but the create flow surfaced only a disabled `Create` button with no obvious way to satisfy its requirements. |
| D3: Error Recovery | 2/5 | The module did not crash, but it also did not explain how to proceed when creation was blocked. |
| D4: Task Efficiency | 1/5 | I could not create a review project from the initial empty state, so the benchmark workflow was blocked at step one. |
| D5: Discoverability | 3/5 | The module purpose is obvious, but the project-start interaction is not self-explanatory enough when no data exists yet. |
| D6: Visual Polish | 4/5 | The empty-state messaging and PRISMA-oriented framing look polished and credible. |
| D7: Edge Cases | 1/5 | The baseline empty-state path is already fragile because project creation was blocked. |

## OVERALL: 16/35
## Competitor Parity Rating: BELOW

## Specific Gaps Found
| # | Gap Description | Severity | Estimated Effort | Screenshot |
|---|-----------------|----------|------------------|------------|
| 1 | The first-run create flow showed a disabled `Create` button with no visible project fields, blocking review creation from the empty state. | CRITICAL | M | `e2e/quality-assessment/systematic-review/02-create-modal.png` |
| 2 | The modal does not explain what is missing or how to unblock project creation. | IMPORTANT | S | `e2e/quality-assessment/systematic-review/02-create-modal.png` |

## What Works Well
- The landing page communicates the PRISMA workflow clearly.
- The module framing feels purpose-built for systematic-review users rather than generic project management.
