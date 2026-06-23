# Next-phase goal — Manan OS literature search: "decisively better than Elicit," then productionize

> For a fresh-context agent continuing the search-quality initiative. Run via `/goal`
> with the companion one-liner that points here. **Read the "START BY READING" docs
> first — build on them, do not re-derive.**

## Aim
Go from the current "beats Elicit on most" to "decisively better than Elicit," then
surface the quality signals in the UI.

## Start by reading (do NOT re-derive what's written there)
- `/tmp/manan-elicit-parity-handoff.md` (original handoff)
- `docs/literature-search/SESSION-2026-06-PARITY-RERUN.md` (the 4 fixes + the full-34 council result + this backlog)
- `docs/literature-search/{BACKLOG.md,ETIOLOGY.md,ARCHITECTURE.md,SOURCE-MATRIX.md,SEARCH-METHODOLOGY-RESEARCH.md}`

## Current state (the FLOOR — never regress below this)
`main` is current (pull first). Prior-phase DoD is MET:
- Full 34-query LLM-council (Opus + Codex + DeepSeek) per-query majority = **Manan 25 / Elicit 7 / tie 2**.
- Deterministic: recall@10 **96%**, nDCG@10 **0.74**, best-in-top-3 **0.67**, MRR **0.65**, DOI/year/journal fill ~**100%**, 0 errors, 0 empty sets.
- Already shipped (do NOT redo): OpenAlex wildcard-400 sanitize; multiplicative (quality-amplifying) recency; exact-title boosting; lecanemab must-have tightened to CLARITY-AD by exact id.

No change may drop council majority below 25/34 or any deterministic metric below the numbers above.

## Eval + council mechanics (all already in `eval/literature-search/`)
- Full benchmark: `op-run -- npm run eval:search -- --label <name>` (34 queries, 700ms-paced). Targeted: add `--only id1,id2`.
- Re-score saved runs after a metric change: `npx tsx eval/literature-search/rescore.ts <label>`.
- Elicit fixtures for all 34 are captured (`elicit/fixtures.json`); re-capture with `op-run -- npx tsx eval/literature-search/capture-elicit.ts`.
- Council: `op-run -- npx tsx eval/literature-search/build-packets.ts <run-label>` → run 3 fresh-context judges on `council/PACKET.md` → write `opus.json` / `codex.json` / `deepseek.json` → `op-run -- npx tsx eval/literature-search/council/aggregate.ts <run-label>`.
  - Judges: **Opus** (spawn a fresh general-purpose subagent that writes `opus.json`), **Codex** (`codex exec -c sandbox_mode="read-only" "<instr>" < PACKET.md`), and a **cross-family third** — try Grok first (SuperGrok or OpenRouter `x-ai/grok-4.3`); else Gemini (REST `generativelanguage.googleapis.com`, `GEMINI_API_KEY`); else DeepSeek (`api.deepseek.com`, `response_format: json_object`).
  - **Run ONE council per genuine change.** Never re-roll a noisy council hoping for a better number.

## The work, in priority order
One coherent change at a time; TDD (RED→GREEN); keep only if council and/or deterministic
metrics improve without regressions; commit each on a feature branch and open a CI-green PR.

### Tier 1 — close the genuine remaining gaps
1. **Dense semantic-lane reliability.** OpenAlex `search.semantic` is server-throttled (429s, 2.9–4.3s), so the 5s fan-out deadline (`run-search.ts` `FANOUT_DEADLINE_MS`) drops it on ~18% of queries and dense-retrieved landmarks vanish from the pool. Give it a dedicated rate budget / its own circuit breaker (it currently shares one with the keyword + enrich OpenAlex calls) and/or a lane-specific longer deadline. Re-validate p95 — do not blow up the tail.
2. **PICO intervention + outcome entity matching.** `pico-sglt2` (and similar) drift to SGLT2-but-renal and GLP-1/semaglutide items the cross-encoder scores ~0.89. Extend `src/lib/search/query-expander.ts` `SYNONYM_MAP` into an intervention/outcome entity matcher; gently demote results whose primary drug-class/outcome conflicts with the query's. Must NOT hurt therapy-comparison (two-drug) or safety (observational-is-right) queries — validate per-query on the full benchmark.
3. **`broad-hfref-management`** (the one clear Elicit win, Manan 3.22 vs 3.89): prioritize high-quality reviews/guidelines for broad (non-landmark) overview intent.

### Tier 2 — exceed Elicit
4. **Multi-query / HyDE expansion** in `src/lib/search/query-planner.ts` — the principled (non-hardcoded) fix for landmark trials absent from the pool (e.g. PARTNER 3). The landmark-map hack is REJECTED.
5. **MedCPT** (NCBI biomedical reranker) behind a small Python/HF sidecar; A/B vs Cohere via the eval harness.
6. **Full-text + structured extraction** (Unpaywall PDF → chunk → extract outcomes/PICO/effect-sizes into a table) — a new subsystem; the biggest differentiator vs Elicit.

### Tier 3 — productionize & harden
7. **Surface** `whyRelevant` / `flags` / `rankingTrace` / retrieval-path in the UI (computed but not shown).
8. **PR-D latency polish:** error-rate breaker + bulkhead (`cockatiel`) and streaming results (NDJSON/SSE) for perceived p50.

## Hard constraints (unchanged)
- Elicit only in eval, never a runtime path. No hardcoding/overfitting to game the benchmark.
- Semantic Scholar optional. Missing metadata flagged, never hallucinated. Every result exposes provenance; ranking stays traceable. Prefer stable primary sources.
- Production-quality, fully unit-tested, CI-green before merge. Verify library/API signatures with Context7 before coding (cohere, openalex, cockatiel, MedCPT/HF, upstash, AI SDK).
- Secrets via `op-run --` only (`PUBMED_API_KEYS`, `OPENALEX_API_KEY`, `COHERE_API_KEY`, `TAVILY_API_KEY`, `ELICIT_API_KEY`, `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`).
- Serialize edits to `run-search.ts` / `pipeline.ts` / `quality-ranker.ts` (one lane). New subsystems (MedCPT sidecar, extraction, UI, eval) are safe to parallelize via git worktrees.

## Deliverables
Updated diagnosis/before-after report per change; A/B eval evidence (deterministic + council)
for each kept item; updated `SOURCE-MATRIX.md`, `ARCHITECTURE.md`, `BACKLOG.md`; reproducible
commands. Re-add Grok + Gemini judges to the council when keys/quota allow.

## Definition of Done
On the full 34-query benchmark with a 3-judge council, **Manan wins ≥30/34** (Elicit-majority ≤2)
AND every deterministic metric is at or above the current floor (recall@10 ≥96%, nDCG@10 ≥0.74,
best-in-top-3 ≥0.67, DOI fill ~100%, 0 errors/empty sets, semantic-lane drops ≤5%), with the
ranking signals surfaced in the UI — OR the remaining shortfall is documented as genuinely
requiring full-text/proprietary data the system cannot obtain. No critical regressions in
metadata, citation reliability, clinical relevance, or reproducibility.
