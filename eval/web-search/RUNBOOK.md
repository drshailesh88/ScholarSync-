# Web/News/Discussions Eval — Phase 0 Baseline Runbook

All commands run with secrets injected via 1Password. Never paste keys.

## 0. Prereqs
- `SEARXNG_URL` reachable; `EXA_API_KEY`, `COHERE_API_KEY` in the `Dev` vault.
- `~/.config/op/dev.env` includes EXA_API_KEY, COHERE_API_KEY, SEARXNG_URL.

## 1. Ratify the gold set (the human step — the council's strength depends on this)
For each query in `queries.ts`, build `mustHaves` objectively:
1. **Authority rule:** add the primary/official source (gov/agency page, the canonical
   org page, the DOI/source page, or the canonical thread) — `rule: "authority"`.
2. **Tool-consensus:** capture Exa + Perplexity + Google top-5; any URL that ≥2 of them
   surface is a candidate — `rule: "consensus"`.
3. **Ratify:** keep only the entries you would personally accept as "a great result MUST
   include this." Delete weak ones. Aim for 2–4 must-haves per query.
Edit `queries.ts` accordingly and re-run `npx vitest run eval/web-search/__tests__/queries.test.ts`.

## 2. Capture the Exa opponent (offline, once)
```bash
op-run -- npm run eval:web:exa
```
→ writes `eval/web-search/exa/fixtures.json`. (Used by Plan 2's council.)

## 3. Freeze the SearXNG candidate pools
```bash
op-run -- npm run eval:web:freeze
```
→ writes `eval/web-search/cache/<tab>-<hash>.json`. Re-run only when changing retrieval.

## 4. Produce the baseline scorecard
```bash
op-run -- npm run eval:web:run
```
→ writes `eval/web-search/runs/baseline/scorecard.json` and prints per-tab averages.

## 5. Commit the baseline
```bash
git add eval/web-search/exa/fixtures.json eval/web-search/cache eval/web-search/runs/baseline/scorecard.json eval/web-search/queries.ts
git commit -m "chore(web-eval): Phase 0 frozen baseline (gold set + Exa opponent + scorecard)"
```

## What the baseline is
SearXNG-only retrieval + the session-independent production quality layer
(trust-tier + Cohere rerank), scored on per-tab dimensions. This is the floor every
later CYCLE must beat — measured against the frozen gold set, never live Exa.

**Reproducibility note — which mode produced the committed scorecard.** The scoring
path is byte-reproducible only in the *no-key* mode (no `COHERE_API_KEY` → rerank is
skipped, results pass through unchanged). Step 4 runs under `op-run`, so the key is
present and the committed baseline includes a live Cohere rerank: still deterministic
in practice (Cohere rerank is a scoring model, not sampling), but it carries a
Cohere-stability assumption rather than being byte-identical on re-run. Record in the
baseline commit which mode was used so a later CYCLE compares like with like.
