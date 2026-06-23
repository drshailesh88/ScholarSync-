# Reproducible eval harness (candidate freeze → offline rerank)

## Why
The live eval (`run.ts`) hits PubMed/OpenAlex/Cohere, so two runs differ even on
queries a change never touches. Cycle 3 proved this is not academic: a full run
showed an **8-point aggregate "regression"** that fully recovered on re-run with
identical code — transient upstream throttling, not a real change. Comparing two
live runs is therefore an **unsound** basis for per-cycle keep/revert.

## How
Split retrieval from ranking so the noisy half runs ONCE and the deterministic half
is replayable:

1. **`run-search.ts`** gains an eval-only `includeRawCandidates` flag → returns the
   post-enrichment/rerank candidate POOL (`rawCandidates`) before final ranking. The
   live web/MCP path never sets it (zero overhead, untouched behavior).
2. **`capture-candidates.ts`** freezes each query's pool once →
   `runs/<label>/candidates/<id>.json`.
3. **`rerank-offline.ts`** replays `rankAndAnnotate` (a pure function) over the frozen
   pools — NO network — computing the same deterministic metrics.

Verified: re-running `rerank-offline` twice produces byte-identical rankings.

## Paired A/B (isolates a ranking change from all noise)
```bash
git stash                                                   # park the ranking change
op-run -- npx tsx eval/literature-search/capture-candidates.ts --label pool   # freeze once
npx tsx eval/literature-search/rerank-offline.ts --pool pool --label before
git stash pop                                               # restore the change
npx tsx eval/literature-search/rerank-offline.ts --pool pool --label after
# delta between rerank-before.json and rerank-after.json is 100% attributable to
# the ranking change — same frozen candidates, no retrieval/throttling noise.
```

## Scope & limits
- **Ranking-stage cycles** (entity-drift, trial-primary, future rerank/quality
  changes) are now cleanly measurable and councils can be paired on a fixed pool.
- **Retrieval-stage changes** (query-planner, source fan-out, the empty-relaxation
  fix) change WHICH candidates are retrieved, so they require a fresh capture — the
  frozen pool reflects the retrieval code at capture time.
- Pools live under gitignored `runs/`; re-capture as needed. The capture still has
  one-time live-retrieval noise, so capture during a healthy window (no 429 storm).

## Use going forward
Every ranking cycle: freeze a pool once on current `main`, then A/B before/after the
change offline. Reserve live `run.ts` + blinded council for the cross-engine
(Manan-vs-Elicit) verdict, not for measuring small intra-Manan ranking deltas.
