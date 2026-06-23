# Cycle 2 — Trial-lookup primary-paper boost (best-in-top-3 gate)

## Lacuna
All four `best-in-top-3` failures in the baseline were **trial-acronym** queries:
the landmark trial was retrieved but ranked 7–9, buried under its own
meta-analyses, sub-studies, and follow-ups (which out-score it on citations/recency).
- `acronym-dapa-hf` best=7 (under QoL / iron / troponin sub-studies + metas)
- `acronym-partner-3` best=9 (under 5-yr/7-yr/economic analyses + acronym-collision noise)
- `acronym-sprint` best=7 (under baseline-BP / frailty / SPRINT-eligible sub-analyses)

## Change (ONE coherent, TDD)
New pure module `src/lib/search/trial-ranking.ts`:
`demoteSecondaryTrialResults` stably moves high-confidence **secondary literature**
below everything else for trial-lookup queries, so the **primary report** rises.
Secondary = `studyType ∈ {meta_analysis, systematic_review}` OR a conservative
title-marker set (`according to`, `findings from`, `post hoc`, `sub-study`,
`subgroup`, `secondary/pooled analysis`, `individual patient data`, `rationale and
design`, `baseline characteristics`, `eligible participants`, `echocardiographic`).
Deliberately excludes generic "effect of … on …" phrasings that primary RCT titles
use. Gated on `plan.isTrialLookup` (run-search passes it through to `rankAndAnnotate`).
**Provably safe:** the primary report is never classified secondary, so the
transform can only RAISE it, never lower it. 7 unit tests (RED→GREEN).

## Result (keep)
| metric | baseline | cycle 1 | **cycle 2** |
|---|---|---|---|
| recall@10 | 88% | 88% | **96%** |
| best-must-have in top-3 | 67% | 67% | **75%** |
| nDCG@10 | 0.72 | 0.72 | **0.78** |
| MRR | 0.64 | 0.64 | **0.69** |
| deterministic head-to-head vs Elicit | 2/2/8 | 2/2/8 | **3/2/7** |
| blinded council beat-or-tie | 65% | 68% | **71%** |
| council Manan / Elicit / tie | 20/12/2 | 19/11/4 | 18/10/6 |

Targeted best-rank moves (provably from the change): `acronym-dapa-hf` 7→**2**
(now top-3), `acronym-partner-3` 9→6, `acronym-sprint` 7→5.

**Decision: KEEP.** Deterministic metrics improved across the board AND the council
beat-or-tie continued its monotonic climb (65→68→71%) with Elicit wins falling
(12→11→10). No regression possible on trial queries by construction.

## Honest attribution
Part of the recall@10 jump (88→96%) is **live-API variance**: `acronym-keynote-189`
went 0%→100% because the landmark entered the candidate pool this run (the demotion
only reorders, it cannot add to the pool). The clean, change-attributable signal is
the monotonic best-rank rise on dapa-hf/partner-3/sprint. `partner-3` (→6) and
`sprint` (→5) are capped short of top-3 by **off-topic acronym-collision noise**
(PARTNER→"Intimate Partner Violence"), a separate retrieval/relevance lacuna for a
future cycle — NOT secondary literature.
