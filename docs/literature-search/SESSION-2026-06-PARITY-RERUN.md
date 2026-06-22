# Session report — Elicit-parity re-run + two root-cause fixes (2026-06)

Continues the Elicit-parity goal from `manan-elicit-parity-handoff.md`. This session
**re-measured parity honestly on current `main`** (the handoff's north-star check),
found and fixed two real defects, and corrected an over-optimistic measurement.

## TL;DR

- **Deterministic benchmark (34 queries) is strong:** recall@10 **96%**, nDCG@10 **0.69**,
  DOI/year/journal fill ~**100%**, case-report 1%, 0 errors, 0 empty sets, p50 ~4.7s.
- **LLM council on the 6-query Elicit-comparison set: Manan 2 / Elicit 4 / tie 0**
  (3 fresh judges: Opus + Codex + DeepSeek). **The Definition-of-Done is NOT yet met.**
  - The prior session's "Manan 4 / Elicit 2" was **optimistic** — it used a more generous
    Grok judge and a different run. A fresh, stricter 3-judge panel on current `main`
    puts Manan behind, though the per-query score gaps are small (see table).
- **Two fixes shipped (committed to `fix/openalex-wildcard-400`):**
  1. OpenAlex wildcard-400 (question queries silently lost the OpenAlex lane).
  2. Recency burial (pivotal trials buried under recent low-value papers).
- **One measurement bug fixed:** the lecanemab ground truth was too loose.

## What was broken, and the fixes

### 1. OpenAlex HTTP 400 on every question-style query  ·  `fix(search): sanitize OpenAlex wildcard operators`
OpenAlex's default `search` is stemmed and rejects `?`/`*` as wildcard operators with
HTTP 400. Any PICO/natural-language question ending in `?` silently killed the whole
OpenAlex lane (keyword + dense), losing citation/DOI/PMID backfill and recall for a
huge real-world query class. **Fix:** strip `?`/`*` from the OpenAlex search term.
**Effect:** nDCG 0.66→0.69, MRR 0.53→0.58, PMID fill 95→97%, latency p50 5.6→4.7s; the
PICO queries (`pico-sglt2`, `pico-egdt`, `pico-oxygen`) now return OpenAlex results.

### 2. Recency queries buried the landmark trial  ·  `fix(search): recency amplifies quality instead of overriding it`
The recency branch ranked by `0.35·recencyNorm + 0.65·composite`, so a 2026 real-world
case series (composite 0.50 → key 0.67) outranked CLARITY-AD (composite **0.83**, the
highest in the pool → key 0.54). **Fix:** make recency a *multiplicative* boost
`composite·(1 + 0.5·recencyNorm)` — it scales quality instead of substituting for it.
**Effect (honest, exact-id ground truth), CLARITY-AD position:**
`rank 7 (pre-fixes) → missing (post-wildcard) → rank 1 (this fix)`.

### 3. Measurement bug  ·  `test(eval): tighten lecanemab must-have to CLARITY-AD by exact identifier`
`recency-lecanemab`'s ground truth was `titleIncludes:["lecanemab"]` — ANY lecanemab
sub-study satisfied it, so recall@10 read 100% while the pivotal trial was buried/absent.
Pinned to CLARITY-AD's exact PMID/DOI (verified as returned by our sources).

## Current council detail (run `recency-fix`, judges Opus+Codex+DeepSeek)

| query | majority | Manan mean | Elicit mean | gap | why Elicit edges |
|---|---|---|---|---|---|
| guideline-af-esc | **manan** | 4.67 | 4.11 | +0.56 | Manan also surfaces the current 2024 ESC/EACTS guideline |
| compare-doac-vs-warfarin | **manan** | 4.28 | 3.89 | +0.39 | Manan stays on-topic; neither has all 4 landmark RCTs |
| pico-sglt2-cv-mortality | elicit | 4.22 | 4.39 | −0.17 | near-tie (DeepSeek scored it Manan) |
| exact-dapa-hf | elicit | 4.33 | 5.00 | −0.67 | Elicit's short list is all high-value; Manan's tail is weaker |
| tavr-low-risk-6yr | elicit | 4.67 | 4.94 | −0.27 | **PARTNER 3 not retrieved** (not in top-50 pool) |
| recency-lecanemab | elicit | 4.06 | 5.00 | −0.94 | CLARITY-AD now #1, but the **tail is 2026 real-world noise** vs Elicit's clean landmark+follow-ups |

**The decisive, recurring weakness is top-10 *precision*:** Manan's lists are noisier in
the tail than Elicit's tightly-curated landmark-first lists. Recall and metadata are at
or above parity; ranking/relevance of positions 2–10 is the gap.

## How to reproduce

```bash
op-run -- npm run eval:search -- --label <name>            # 34-query benchmark
op-run -- npx tsx eval/literature-search/build-packets.ts <run-label>   # build council packet
# judges: Opus (subagent) + Codex (`codex exec`) + DeepSeek (api) → opus/codex/deepseek.json
op-run -- npx tsx eval/literature-search/council/aggregate.ts <run-label>  # → COUNCIL-REPORT.md
```
Judge note: **Grok via SuperGrok was unavailable** (no xAI key; OpenRouter `x-ai/grok-3,4`
deprecated). **Gemini was quota-blocked (429).** DeepSeek stood in as the cross-family
third judge. Re-add Grok/Gemini when keys/quota are available.

## Prioritized backlog to close the gap (impact ÷ effort)

1. **Top-10 tail precision (highest council leverage).** 3–4 queries are "Manan just below
   Elicit" because positions 2–10 carry lower-value items (recent real-world substudies,
   commentary). Principled options: stronger relevance gating in `quality-ranker.ts` so a
   low cross-encoder score can't ride high evidence/citation priors into the top-10;
   evidence-tier-aware demotion of low-value recent items **except** where observational is
   the right evidence (safety queries). Must not regress recall — validate per-query.
2. **PARTNER 3 retrieval (`tavr`).** Landmark is absent from the top-50 pool — a *retrieval*
   gap. Non-hardcoded fixes: enable citation/PMRA neighbour expansion (`expandCitations`,
   already built, currently opt-in) for clinical landmark queries; or multi-query/HyDE
   expansion in `query-planner.ts`.
3. **OpenAlex semantic-lane reliability.** Healthy on ~28/34 queries; the ~18% drops (the
   recall workhorse) come from the 5s global fan-out deadline cutting off a slow/throttled
   semantic call. Give the dense lane a dedicated budget or cache it; re-validate p95.
4. **Expand the Elicit fixture set.** Only 6 of 34 queries have Elicit snapshots, so the
   council can only judge a hard, landmark-heavy subset. Capture more (via the Elicit API,
   eval-only) for a representative "most benchmark queries" verdict.
5. **Re-add Grok + Gemini judges** when keys/quota allow (cross-family robustness).
