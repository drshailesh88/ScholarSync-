# 87-Query Baseline Floor (post Cycle 1 + Cycle 2)

The benchmark was extended 34 → **87 queries** (PubMed-verified ground truth; adds
psychiatry, trial-family, negative-control, ambiguous-acronym categories). This is
the re-grounded measurement floor on current `main` (entity-drift + trial-primary
shipped). Run label `baseline87`.

## Deterministic (37 ground-truth queries)
| metric | value | gate | status |
|---|---|---|---|
| recall@10 | 88% | — | — |
| best-must-have in top-3 | 73% | ≥85% | ✗ |
| nDCG@10 | 0.73 | — | — |
| MRR | 0.67 | — | — |
| DOI fill | 95% | ≥98% | ✗ |
| **PMID fill** | **86%** | ≥90% | ✗ |
| duplicate rate | 0% | ≤2% | ✓ |
| empty result sets | **3** | 0 | ✗ |

**Deterministic head-to-head vs Elicit (37 GT):** Manan **8 wins / 5 losses / 24 ties**;
recall@10 88% vs 73%; best-in-top-3 73% vs 73%. Manan retrieves more landmarks;
ranking parity on best-in-top-3.

## Blinded council (Opus + Grok + DeepSeek)
Manan **24 / Elicit 17 / tie 46 = 80% beat-or-tie** of 87.
- **Panel caveat:** Codex was unavailable this run (its sandbox hit a failing
  `UserPromptSubmit` hook + expired Elicit/BetterBugs MCP tokens, producing empty
  output); DeepSeek substituted as the third cross-family seat per the Grok→Gemini→
  DeepSeek fallback. Grok and DeepSeek are tie-prone (46 ties), so "beat-or-tie"
  (80%) runs well above outright "wins" (24/87 = 28%). Not directly comparable to
  the 34q Opus+Codex+Grok councils — treat as a fresh reference on the new benchmark.

## New concrete lacunae (surfaced by the larger benchmark)
1. **Trial-family queries return EMPTY (3, hard source-failure)** — highest priority.
   `family-evolut-trials`, `family-sglt2-cvot-trials`, `family-zuma-cart-trials`.
   Root causes (diagnosed via `planQuery`):
   - acronym MISDETECTION: `CAR-T`, `B-cell` treated as trial acronyms (concepts, not
     trials) while the real family name (`ZUMA`) is missed (no hyphen/number).
   - OVER-CONSTRAINT: detected acronym `[tiab]` is AND-ed with ALL remaining topic
     words — including OTHER trial names (`DECLARE`, `CANVAS`) — so almost nothing
     matches. No relaxation when the primary returns 0.
2. **PMID fill 86% < 90% gate** — new OpenAlex/DOI-only papers lack PMID backfill
   (e.g. `acronym-dapa-hf` 0% PMID this run).
3. **best-in-top-3 73% < 85%** — still capped partly by acronym-collision noise
   (PARTNER→"Intimate Partner Violence") that `trial-primary` (secondary-demotion)
   does not address.

## Next cycles (priority order)
- **Cycle 3:** fix trial-family empty results (acronym skip-list + de-over-constrain
  the trial query + empty-result relaxation). Tier-1 reliability; deterministic.
- **Cycle 4:** PMID backfill completeness for DOI-only results.
- **Cycle 5:** acronym-collision relevance gating for trial-lookup queries.
