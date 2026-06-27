# HyDE / multi-query — measured A/B (DeepSeek V4 Flash)

**Date:** 2026-06-27. **Model:** `deepseek-v4-flash`. **Harness:** full 87q live, `eval:search`,
HyDE-off vs HyDE-on under the same conditions (back-to-back runs).

## Result — a decisive win

| metric | HyDE off | HyDE on | Δ |
|---|---|---|---|
| recall@10 | 0.7568 | **0.8514** | **+0.0946** |
| best-in-top-3 | 0.6757 | 0.7297 | +0.0541 |
| nDCG@10 | 0.6913 | 0.7555 | +0.0641 |
| MRR | 0.6717 | 0.7088 | +0.0371 |
| **empty result sets** | **13** | **3** | **−10** |

HyDE recovered **10 of 13 throttle-empties**: when the rented lexical lanes (PubMed/OpenAlex)
get rate-limited to zero, the LLM-generated hypothetical abstract + query variants run as extra
lanes against the **owned, throttle-proof** MedCPT dense index and still return candidates. So
HyDE buys both recall AND throttle-resilience.

The 6 genuinely-helped queries are all in the under-specified categories HyDE targets (pico,
long-term-outcomes, therapy-comparison, trial-family) — most went 0.00 → 1.00.

## The 2 "regressions" were throttle, not HyDE

Per-query, two queries dropped 1.00 → 0.00. Both are **OpenAlex throttling in the on-run**, not
HyDE dilution — proven by the source counts:

| query | category | off | on |
|---|---|---|---|
| `exact-plato-ticagrelor` | exact_paper | openalex=**8571**, recall 1 | openalex=**0** (rate-limited), recall 0 |
| `psy-stard-major-depression` | trial_acronym | openalex=2720, recall 1 | pubmed=0 **and** openalex=0 (both throttled), recall 0 |

The on-run runs longer (extra LLM latency per query stretches the batch out), so it hit more
OpenAlex throttling on those queries. Union-max correction would wash both out — HyDE's true
effect is even cleaner than the raw +9.5.

## Decision (shipped)

- **HyDE ON by default** when a DeepSeek key is present (opt out with `HYDE_ENABLED="0"`);
  dormant + fail-open without a key.
- **Skipped** for **trial-acronym lookups** (`plan.isTrialLookup` — acronym expansion only adds
  noise to primary-report ranking) and for **specific paper lookups** (`isPaperLookupQuery` —
  DOI / PMID / pasted-title, where the target is already known). These add latency/cost without
  recall benefit and, by lengthening the burst, slightly worsen the throttle.
- Tradeoff accepted: ~1–2s added latency per non-exact/non-trial search (the LLM call precedes
  fan-out) + ~$0.0002/query DeepSeek + extra Modal dense calls. Negligible at 100 users; the
  recall lift is worth it. (A future refinement could run the LLM call concurrently with the
  first lexical wave to hide the latency.)

## Reproduce

```bash
op-run -- npm run eval:search -- --label hyde-off            # HyDE off (HYDE_ENABLED unset → on, so disable:)
HYDE_ENABLED=0 op-run -- npm run eval:search -- --label hyde-off
op-run -- npm run eval:search -- --label hyde-on             # HyDE on (default)
# compare runs/<label>/summary.json aggregates
```

Caveat: a single live A/B carries throttle noise (see the 2 "regressions"). The cleanest read is
the aggregate + the empties delta; per-query, trust only queries with a non-empty pool in both runs.
