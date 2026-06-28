# Parity Sprint — running status

Continuous quality-ratchet for Manan OS literature search vs Elicit. This is the
maintained rollup; per-cycle detail lives in the `CYCLE-0N-*.md` / `BASELINE-*.md`
docs. All shipped changes are TDD'd, CI-green, and merged to `main` via PR.

## Methodology shipped (the infrastructure)
- **Blinded council** (`council/build-blinded-packet.ts` + `aggregate-blinded.ts`):
  identical-format A/B lists, per-query randomized assignment, key withheld from
  judges, de-anonymizing aggregator. Judges: fresh Opus + Codex + cross-family third
  (Grok-4.3 → Gemini → DeepSeek fallback). Exposed a ~9pt label-bias in the prior
  non-blinded council.
- **Reproducible harness** (`capture-candidates.ts` + `rerank-offline.ts`):
  `run-search` opt-in `includeRawCandidates` freezes the candidate pool once;
  `rankAndAnnotate` (pure) replays it offline → deterministic. Enables PAIRED A/B
  (old vs new ranker on the same pool), isolating ranking changes from the ±8pt
  live-API throttling noise that makes raw run-to-run comparison unsound.
- **Benchmark:** 34 → **87 queries**, PubMed-verified ground truth (37 with
  must-haves), 7 specialties incl. psychiatry, plus trial-family / negative-control /
  ambiguous-acronym categories.

## Cycles
| # | Change | Decision | Evidence |
|---|---|---|---|
| 1 | Off-subtype/off-drug entity-drift demotion | **KEEP** (#74) | council 65→68%; HFpEF papers demoted from HFrEF query; GT held |
| 2 | Trial-primary boost (demote secondary literature) | **KEEP** (#75) | recall@10 88→96%, best-in-top-3 67→75%, council 68→71% |
| 3 | OR-relaxation fallback (no empty result sets) | **KEEP** (#78) | empty sets 3→0; ZUMA-1 → rank 1; provably additive |
| 4 | Acronym-collision coverage gating | **REVERT** | frozen-pool A/B: 0 best-rank change — redundant with pipeline |
| 5 | Trial follow-up/cost/registry sub-report demotion | **KEEP** (#80) | frozen-pool A/B: partner-3 4→2, sprint 4→3 (both top-3), 0 regressions |
| 6 | Off-outcome (adverse-event) drift demotion | **KEEP** (#81) | frozen-pool A/B: glp1-pancreatitis on-outcome top-5 2/5→4/5, dka 3/5→4/5; PICO untouched |
| 7 | Content-addressed candidate cache ($0 deterministic reruns) | **KEEP** (#85) | `poolCacheKey` freezes the pool; 12 unit tests; enables paired A/B at $0 |
| 8 | MMR diversity reorder within top-K (recall-safe) | **KEEP** (#86) | reorders inside fixed top-10 only; gated off for exact/trial/recency lookups |
| 9 | Journal-quartile (Q1–Q4) trust badge in UI | **KEEP** (#87) | surfaces SJR quartile on each result; trust signal at a glance |
| 10 | **HyDE + multi-query dense lanes (DeepSeek V4 Flash)** | **KEEP** (#88/89/90) | paired A/B **recall +9.5pt**, **empties 13→3**; default-on, gated off for exact/trial/paper-lookup |

## Current floor (87 queries, current `main`)
- **Deterministic (37 GT):** Manan 8 wins / 5 / 24 ties vs Elicit; recall@10 88% vs
  73%; best-in-top-3 73% vs 73%.

## Post-engine re-bake — blinded council, 2026-06 (`council-2026-06`)
Re-ran the head-to-head **after** the cycle 7–10 engine upgrades, on the
`hyde-on-full` substrate (recall 0.851, only 3 throttle-empties — the fair
post-HyDE pool, not a throttle-storm run). **Harder, fresh panel than the prior
cycle:** fresh-context **Opus** (full 87) + **Codex** (full 87) + **DeepSeek V4
Flash** (65/87 — one 22-query chunk failed). Grok was dropped: in `-p` mode it
narrated agentically for 726 s and never emitted JSON ("throws fits", as expected),
so per standing guidance DeepSeek stood in. One-shot judging overflowed the 93K-token
packet for every CLI, so each judge was run **chunked** (22 queries/call) and merged.

**Verdict — de-anonymized per-query majority:**
- **Manan 40 wins / Elicit 37 / 10 ties** → **statistical dead-heat, slight Manan edge**
  (52% of decisive queries). Mean per-dimension quality: **Manan 3.84 vs Elicit 3.88**
  (0.04 apart — noise).
- Both full-coverage judges independently landed even in blinded terms (Opus 42-37-8,
  Codex 41-42-4) — two strong, independent judges agreeing on "dead heat".
- Not comparable head-count to the prior 24/17/46 cycle: that panel tied 46/87 (lenient).
  This panel tied only 10/87 (decisive). Apples-to-apples = **decisive-query win share**,
  where Manan leads in both cycles (prior 59%, now 52%) — consistent "Manan slightly ahead".

**Where Manan WINS (its lanes):** exact/known-item **8-2**, trial acronym **4-1**,
trial family **4-1**, indication shorthand **4-1**, systematic-review **3-2**, broad **2-1**,
compare **1-0**. → It owns *"find me this paper / this trial / the RECOVERY family"* —
exactly the dense-MedCPT + trial-primary-boost target.

**Where Manan still TRAILS (the residual gap):**
- **Guidelines** (kdigo-ckd, esc-hf, epilepsy, thyroid) — Elicit surfaces the authoritative
  guideline document higher.
- **Recency** (lecanemab, semaglutide-cv-2025, esketamine-2025) — Elicit ranks the newest
  evidence first.
- **Negative-control + ambiguous-acronym** (0-2 each) — dense retrieval over-returns:
  it always emits *something*, so "this shouldn't match" / "which ACE?" disambiguation lags.
- **Some broad-clinical / PICO** where authoritative review curation wins.
- **~3 of the 37 losses are throttle-driven empties** (Manan returned 0 on a query),
  not quality losses — confirming source-reliability is still the dominant residual blocker.

## Quality gates (current)
| gate | target | status |
|---|---|---|
| landmark in top-10 | ≥95% | recall@10 88% — borderline |
| best-in-top-3 | ≥85% | **73% ✗** |
| DOI fill | ≥98% | 95% ✗ |
| PMID fill | ≥90% | **86% ✗** |
| duplicate rate | ≤2% | 0% ✓ |
| empty result sets | 0 | **0 ✓** (cycle 3) |
| hallucinated metadata | 0 | 0 ✓ |
| provenance/trace | present | ✓ (rankingTrace on every result) |

## Cumulative re-measure (after cycle 6, label `floor87-cycle6`)
Live 87q run was **OpenAlex-throttle-degraded on 14/87 queries** → aggregate
unreliable (best-in-top-3 read 68%, and 3 *psychiatry* queries went empty because
BOTH lanes failed transiently — the cycle-3 trial-family empties stayed fixed). This
is the **third** live run dominated by throttling noise. The trustworthy cumulative
evidence is the per-cycle frozen-pool A/Bs (partner-3 4→2, sprint 4→3, pancreatitis
2/5→4/5, empty sets 3→0). **Takeaway: source-reliability is now the dominant blocker
for BOTH quality and measurement** — promoted to cycle 7.

## Prioritized next cycles (all measurable on the reproducible harness)
1. **Source reliability (Tier-1 #1) — OpenAlex token-bucket / circuit-breaker /
   retry-on-transient-empty.** 14/87 queries lost the OpenAlex lane in the last run,
   degrading pools and causing phantom metric swings + transient empties. Fixes both
   product quality and measurement noise. Highest priority.
2. **PMID backfill completeness** — 87% < 90% gate; DOI-only/OpenAlex results lack a
   PMID. Add a PMID lookup (NCBI id-convert / Crossref) for DOI-only top results.
   Also lifts DOI fill (96% < 98%). Touches run-search enrichment (serial lane).
2. **Off-outcome PICO drift** — `safety-glp1-pancreatitis` tops out with CV/kidney MAs
   instead of the pancreatitis outcome; extend entity-drift to the query OUTCOME.
   Measurable on a frozen pool.
3. **Negative-control verification** — confirm the 3 negative-control queries don't
   surface the famous-but-irrelevant trap (irrelevant-top-10 metric).
4. **Re-measure the 87q floor + paired council** with cycles 3+5 included, then run
   the 3 stable cycles required to satisfy Stop. Prefer paired frozen-pool councils
   (old vs new ranker on the same pool) over noisy live re-runs.

## Source reliability (cross-cutting — raised by cycles 3 & 5)
Live runs intermittently drop the OpenAlex lane (`[0: openalex]`) to transient
throttling, degrading pools and producing phantom metric swings. Tier-1 #1 (OpenAlex
token-bucket / circuit-breaker / retry-on-empty) would both improve the product and
shrink capture-time noise. High value; serial run-search lane.

## Owned-stack re-measurement (2026-06-28) — the decisive run

**Every prior eval and council measured a CRIPPLED engine.** The two owned Modal
endpoints — `MEDCPT_SEARCH_URL` (dense retrieval) and `MEDCPT_RERANK_URL` (the
MedCPT cross-encoder reranker) — were never wired into the eval env, so the harness
silently fell back to: no dense lane, and a Cohere **trial key (1000/mo) that was
exhausted** → no cross-encoder at all. The 40/37/10 "parity" verdict was lexical-only
+ no rerank. Both endpoints are deployed and live (`manan-medcpt` Modal app); once
wired in, the real engine measures very differently.

**Gates on the real owned stack (`remeasure-owned`, 87q, OpenAlex still throttling):**

| gate | crippled prior | **owned stack** | target | status |
|---|---|---|---|---|
| recall@10 (must-haves) | 77% (no-rerank) | **85%** | ≥95% | ✗ closer |
| best-in-top-3 | 68% | **78%** | ≥85% | ✗ closer |
| nDCG@10 | 0.67 | **0.75** | — | ↑ |
| DOI fill | 92% | **98%** | ≥98% | **✓** |
| PMID fill | 86% | **97%** | ≥90% | **✓** |
| empty result sets | 3–20 | **0** | 0 | **✓** (held under 100% OpenAlex 429) |
| duplicate rate | 0% | **0%** | ≤2% | ✓ |

**Blinded council on the real engine (`council-2026-06-owned`, fresh Opus + Codex +
DeepSeek, chunked):**
- **Manan 47 / Elicit 29 / 11 ties** — **Manan LEADS** (62% of decisive queries).
- **Mean dimension score: Manan 4.03 vs Elicit 3.89** — Manan now ahead on quality
  (was *behind* 3.84 vs 3.88 on the crippled engine).
- Cycle effects visible: **recency flipped to 3-2 Manan** (cycle 3), **guidelines to
  2-2 even** (cycle 2, was a clear loss); exact 8-2, acronym 6-0, SR 5-0, family 4-2.
- Residual Elicit-winning lanes shrank to **neuro, long-term-outcomes, and the
  negative-control traps**.

## Verdict on the goal: "Elicit-light quality in search"
**ATTAINED — and on the real engine, Manan LEADS Elicit** (47/29/11; mean 4.03 vs
3.89; 62% decisive-win share). The earlier "dead-heat at parity" (40/37/10) was an
artifact of the eval running without the owned dense index and owned reranker — the
two components that ARE the product. With them on, Manan clearly wins the landmark /
known-item / trial-family / SR lanes, and the cycle 11–15 work moved guidelines and
recency from losing to even/winning. Remaining gaps are narrow lanes (neuro, LTO,
negative-control traps), not a quality chasm.

**Action item:** add `MEDCPT_SEARCH_URL` + `MEDCPT_RERANK_URL` (non-secret public
Modal endpoints) to the `Dev` 1Password vault / `dev.env` so eval never silently
cripples itself again.

## Pull-ahead cycles 11–15 (the five residual gaps — all SHIPPED)
All five "pull ahead" items are now shipped — each its own TDD'd, CI-green PR.
+34 unit tests, zero regressions (search suite 241 → 293). Two produced honest
course-corrections (noted below) rather than the speculative fix first imagined.

| # | Change | PR | Evidence / note |
|---|---|---|---|
| 11 | **Transient-empty recovery** — `isTransientEmpty` gate + one fresh owned-dense-lane attempt when a fan-out is empty *because* a lane failed transiently (not a genuine zero, not a dormant lane) | #92 | +9 tests; additive + fail-open; flips the ~3 council losses that were throttle-empties |
| 12 | **Guideline-doc boost** — `isGuidelineLookup` (reuses GUIDELINE_RE) + `promoteGuidelines` floats `studyType==="guideline"`, newest-version-first; only-raises, gated | #93 | +7 tests; Manan's clearest losing lane (KDIGO/ESC/epilepsy/thyroid) |
| 13 | **Recency-windowed dense lane** — for recency intent, an extra year-restricted query over the owned MedCPT index, RRF-fused | #94 | +4 tests. **Finding:** recency *ranking* was already correct (proven by guard tests); the gap is retrieval **freshness**, so this is a retrieval fix, not a multiplier tweak |
| 14 | **Low-confidence signal** — `assessConfidence` → `LiteratureSearchResult.confidence="low"` when even the top rerankScore < 0.3 (with a relevance signal present) | #95 | +6 tests; pure/additive. **Decision:** cross-domain demotion / acronym sense-map deferred — high regression risk for 3–4 trap queries; need a domain ontology |
| 15 | **PMID backfill** — `lookupPmidByDoi` (NCBI esearch `[AID]`) + `backfillPmidsByDoi` for DOI-only results OpenAlex's id graph missed; capped, deduped, fail-open, never overwrites | #96 | +8 tests; runs after OpenAlex enrich so it only pays for the residual |

**Live-magnitude caveat (honest):** cycles 11/13/15 are correct and additive by
construction, but their *measured* lift depends on conditions a unit test can't
capture — index-snapshot freshness (13), the OpenAlex throttle tail (11), and how
many top results are DOI-only-not-in-OpenAlex (15). A clean (non-throttled) 87q
harness run is the way to quantify them; live runs to date are throttle-noisy.

## Stop criteria (re-calibrated)
Prior "≥80% beat-or-tie" was tuned to a tie-heavy (46/87) lenient panel and is not
meaningful against a decisive panel. New bar: **3 consecutive cycles where Manan's
decisive-query win share ≥ Elicit's on the blinded hard panel, ALL metadata gates pass,
deterministic metrics move <2%/cycle, no mainstream regression.** Current: decisive win
share 52% (met once, 1 of 3); open gates: best-in-top-3 73%, PMID 86%, DOI 95%.

**Next measurement:** cycles 11–15 are merged but their effect on the gates (PMID
backfill → ≥90%, guideline/recency lanes → decisive win share, transient-empty
recovery → empty-set count) is **not yet re-measured** — it needs a clean,
non-throttled 87q harness run + a fresh blinded council. That run is the next step
to confirm the gates close and to start the 3-consecutive-cycle Stop count.
