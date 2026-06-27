# Web / News / Discussions Search — Quality Sprint Design

- **Date:** 2026-06-24
- **Status:** Approved (design) — pending implementation plan
- **Author:** Shailesh Singh (with Claude Code)
- **Scope:** The non-academic search tabs (`web`, `news`, `discussions`) served by
  `/api/search/unified`. Academic search (`run-search.ts`) is out of scope and unchanged.
- **Methodology basis:** This sprint ports the **exact** drill that took academic search to
  Elicit parity, as documented in `docs/literature-search/` (`PARITY-SPRINT-GOAL.md`,
  `BASELINE-BLIND-2026-06-23.md`, `BEFORE-AFTER-ELICIT.md`, `ARCHITECTURE.md`) and the
  `src/lib/search/__tests__/ralph-search/` harness. Section 12 maps each ported element to
  its academic source.

---

## 1. Problem

ScholarSync has two search worlds with very different maturity.

**Academic search** (`src/lib/search/run-search.ts`) is a fusion machine *and* a measured
one: multi-source fan-out → RRF → enrichment → Cohere rerank → evidence-aware quality
ranking → trust tiers, improved over documented cycles against **two** evaluation layers —
deterministic metrics **and** a blinded multi-LLM council with **Elicit as the A/B
opponent**.

**Non-academic search** (`/api/search/unified`, the `tab !== "academic"` branch →
`fetchNonAcademicResults`) is single-source SearXNG → Cohere rerank → domain preferences →
trust tier → paginate. It has **no gold standard and no eval harness of either kind** — so
quality cannot be measured, and therefore cannot be improved deliberately.

The gap is not a SearXNG tweak. It is the absence of the measurement rig that made academic
improvable. **Build the rig first; let it choose the levers.**

## 2. Goal & non-goals

**Goal:** Reach *decent*, profitable-to-run quality on `web`, `news`, `discussions` by
running the **same two-layer drill** (deterministic + blinded council) used for academic —
without adding any per-query paid-API dependency.

**Quality floor is non-negotiable:** low operational cost with trash results is a failure.
"Decent" is a number, defined by the stop gate in §9.

**Non-goals:**

- Changing academic search. The academic `ralph-search` scorecard must remain unchanged.
- Multi-source *runtime* fusion (SearXNG + Tavily + Exa blended on every query). Deferred —
  see §4. Revisited only if the harness proves a single source cannot reach the gate.
- A best-in-class general web engine. Target is *decent for our research-adjacent users*.

## 3. Locked decisions

1. **Build the measurement rig first.** Gold standard + two-layer harness + baseline, then
   pull levers chosen by what the harness says is broken. (User: "I need a gold standard to
   compare and then keep improving.")

2. **Free engine, paid yardstick.** SearXNG (self-hosted, ~$0/query) is the **sole runtime
   engine**. Paid tools (Exa, Perplexity) are **offline / eval-time only**. This mirrors the
   academic rule: *"Elicit is a benchmark only — never a runtime dependency"*
   (`ARCHITECTURE.md`).

3. **Two distinct gold artifacts** (this is how academic avoided self-grading, and we copy
   it exactly):
   - **(a) Deterministic ground-truth** — per query, a **hand-ratified** set of ideal
     results encoded as `expectedResults` with a `mustFind` flag. **Construction (objective,
     to keep the council off vibes):** seed each must-have by *authority rule* (the
     primary/official source — paper DOI page, gov/agency page, canonical thread) **and** by
     *tool-consensus* (any URL ≥2 of {Exa, Perplexity, Google} surface in top-5); the human
     then **ratifies and freezes** the seeded list. Drives recall / precision / nDCG / MRR.
     *Never auto-derived from any single tool's output.*
   - **(b) Council opponent** — **Exa** frozen snapshots, captured offline. Used *only* as
     the blinded A/B peer that neutral LLM judges compare our output against. Exa is the
     opponent, **not** the answer key — so there is no self-grading.

4. **SearXNG + degradation fallback (runtime).** SearXNG every query; a single Tavily call
   fires **only** when SearXNG is degraded/blocked/empty (rare → bounded cost). Tavily is the
   fallback (not Exa) because `searchTavily` already exists.

5. **Per-tab rubric.** No evidence hierarchy on the open web; each tab gets its own scored
   dimensions and weights (§6.2).

6. **Benchmark queries are research-adjacent**, with **mainstream-first class weighting**
   (§7) so edge-case fixes can't quietly regress the bread-and-butter.

7. **Every runtime lever is free code/config** (§8). No improvement lever adds a per-query
   paid dependency. All eval machinery (council, Exa snapshots, metrics) is offline.

8. **Secrets via 1Password only.** `EXA_API_KEY` and `TAVILY_API_KEY` live in the `Dev`
   vault; all eval/runtime access is through `op-run --`. Keys are never printed or committed.

## 4. Source roles (unambiguous)

| Tool | Role | When it runs | Cost | Status |
|---|---|---|---|---|
| **SearXNG** | Runtime workhorse | Every query | $0/query (fixed server cost) | Integrated (`sources/searxng.ts`) |
| **Tavily** | Runtime degradation fallback | Only when SearXNG breaker trips / returns empty | ~$0.006 × (rare) | Integrated (`sources/tavily.ts`); key in `Dev` vault; call `restrictDomains:false` |
| **Exa** | **Offline council opponent** + gold-set seed | Snapshot capture, once per benchmark | ~few $ total | Key in `Dev` vault; offline only |
| **Perplexity / Google** | Optional offline gold-set seeds | Once, gold-set ratification | optional | Manual is fine |
| **Cohere** | Runtime rerank | Every query, fail-open | ~$0.002/query | Integrated (`rerank.ts`); no key → input unchanged |
| **LLM council** (Opus + Codex + DeepSeek/Grok) | Offline blind judges | Once per improvement cycle | eval-time tokens | Reuse academic council infra |

Why runtime fusion is deferred: academic *must* union sources (PubMed/OpenAlex/S2 are
disjoint corpora). The open web is three rankers over the *same* corpus, so unioning yields
small marginal recall while adding cross-source dedup and metadata noise. Single-source is
the disciplined default; the harness can later justify fusion with evidence.

## 5. Production architecture (runtime — unchanged cost profile)

The `tab !== "academic"` branch of `/api/search/unified` becomes:

```
query (tab → SearXNG category: web=general, news=news, discussions=social media)
  └─ SearXNG                                   ← sole engine, $0/query
        │  breaker trips OR degraded OR results < floor
        └─ FALLBACK: single Tavily call (restrictDomains:false, topic=general|news)
  → quality layer (all free; trust-tier + dedup + domain-prefs already exist):
        trust/authority ranking · freshness/time-decay · dedup + domain/outlet diversity
        · spam/content-farm filter · Cohere rerank (per-tab profile, fail-open) · domain prefs
  → top-N to dashboard
```

**Fallback trigger:** SearXNG `degraded === true`, OR fewer than a configured floor of
results for a non-trivial query. Exactly one fallback call; fallback results pass through
the same quality layer. **Fail-open chain:** SearXNG degraded → Tavily → both fail → empty +
existing degraded flag. No new failure modes.

## 6. Eval harness — the first deliverable (TWO layers) ⭐

Mirrors the academic structure: a deterministic harness (`ralph-search`) **and** a blinded
LLM council. Both are offline.

### 6.1 Layer 1 — Deterministic metrics

Structure mirrors `src/lib/search/__tests__/ralph-search/`: frozen `cases/`, a frozen
response `cache/`, a `scorer`, a `runner`, a `scorecard.json`.

**Case schema (per tab), adapted from `ralph-search/types.ts`:**

```
{ id, name, tab: "web"|"news"|"discussions", queryClass, query,
  expectedResults: [ { urlOrTitleFragment, domain?, publishedAfter?, mustFind } ],
  rankingRules:    [ ... per-tab assertions ... ],
  authorityChecks, freshnessChecks, diversityChecks, dedupChecks }
```

`expectedResults` is the **hand-ratified** ground-truth (decision 3a). `mustFind:true`
counts toward recall; `mustFind:false` is a logged bonus.

**Deterministic metrics** (reuse/extend `src/lib/search/eval/metrics.ts`, which already has
`recallAtK`, `meanReciprocalRank`, `ndcgAtK` over a `MustHaveSpec`): **recall@10, precision,
nDCG@10, MRR**, plus per-tab **authority / freshness / diversity / dedup** ratios.

**Per-tab rubric** (each dimension 0–10; per-tab weighted composite; ✓/✗ detail traces per
expected item, exactly like academic `scoreDetails`):

| Dimension | Web | News | Discussions |
|---|---|---|---|
| Relevance | ●●● | ●●● | ●●● |
| Authority / source reputation | ●●● | ●●● | ●● (real community vs SEO Q&A farm) |
| Recency / freshness | ● | ●●● | ●● |
| Diversity (no single-domain flood) | ●● | ●● (outlets) | ●● (platforms: Reddit/HN/SE) |
| Dedup (incl. same wire story) | ●● | ●●● | ●● |

(`●●●` high / `●●` medium / `●` low weight. Exact numeric weights are config data, tuned
during the sprint — never code.)

**Determinism + the frozen-pool A/B toggle** (the CYCLE-04 lesson):

- Freeze raw SearXNG (and fallback) responses into `cache/` (MD5(source:query:opts) keys,
  like `ralph-search/runner.ts`). The scorer **replays cache → runs the ranking pipeline →
  scores**, so the *ranking layer* iterates with zero live calls.
- For any **ranking** change: **capture the candidate pool once**, then re-rank the
  identical pool **with vs without** the change. The before/after delta is then **100%
  attributable to code**, not live-retrieval noise. (In academic this caught a plausible
  change that moved *zero* ranks → instant revert.)
- Only a **retrieval** change (SearXNG engine/`settings.yml`) requires re-fetch + re-freeze.

### 6.2 Layer 2 — Blinded LLM council

Directly **reuses the existing academic harness** — `council/build-blinded-packet.ts`,
`council/aggregate-blinded.ts`, `council/openrouter-judge.mjs` are ~80% portable. Their
**structural robustness transfers for free** and must be preserved verbatim:

- **Un-fingerprintable blinding** — both engines rendered in *identical* format using only
  common fields; engine-revealing fields dropped; **A/B labels randomized per query** via
  `sha1(salt:id)`; `key.json` withheld from judges.
- **Cross-family judges**, fresh context, **`temperature: 0`**, strict JSON: **Opus**
  subagent + **Codex** + a third from a *different* family (**Grok**/**Gemini**/**DeepSeek**
  via OpenRouter). Independent — no judge sees another's vote or any implementation note.
- **Majority vote** per query → tally *ours / opponent / tie*; **de-anonymize only after**
  scoring via `key.json`; run **one council per genuine change** (never re-roll).
- **Blinding-integrity check:** judges' raw A/B picks should *not* agree on which list is
  ours — if they can identify the system, blinding leaked.

**What must change for the open web (the parts that decide council strength — §1's risks):**

1. **Ground truth in the packet.** The packet prints the **`mustHaves`** (built per §3a:
   authority-rule + tool-consensus, ratified) as the relevance anchor, so judges score
   objective recall, not vibes. *Without this the council is noise.*
2. **Objective per-tab rubric** replacing the biomedical dimensions. Each tab's `RUBRIC`
   constant scores **0–5** on concrete, checkable dimensions: **on-topic relevance ·
   authority/source-reputation · recency-correctness · outlet/platform diversity ·
   dedup (incl. same wire story) · usefulness**. No "is it good?" vagueness.
3. **Rich packet rows.** Extend the rendered `CommonRow` from title/year/venue to
   **title + domain + publishedDate + snippet**, because judges cannot assess authority or
   recency from a bare title (academic could lean on PMID/venue; the web can't).
4. **A genuinely strong opponent.** `capture-exa.ts` (analogous to `capture-elicit.ts`)
   snapshots Exa with the **tab-matched `category`/`type` and good params** so "beat-or-tie"
   is a real bar; optionally add **Perplexity** as a second opponent to raise it further.
   A weak opponent converges the engine to mediocre.

### 6.3 Council-strength checklist (guards against a weak instrument)

Before any council run counts, all must hold: ground-truth `mustHaves` present & ratified ·
per-tab objective rubric loaded · packet rows show domain+date+snippet · ≥3 cross-family
judges at `temp 0` · blinding-integrity check passes · opponent captured with strong params ·
exactly one council per change. A run failing any of these is **discarded, not trusted.**

## 7. Benchmark set & mainstream-first weighting

~30–50 research-adjacent queries, split across the three tabs, each query tagged with a
**class** and the set weighted so mainstream dominates (academic used 50/20/15/10/5):

| Class | Weight | Example (research-adjacent) |
|---|---|---|
| Mainstream research topic | 50% | "CRISPR base editing clinical applications" |
| Current / recency | 20% | "lecanemab FDA decision news", trial readouts |
| Methodology / controversy discourse | 15% | "peer review reform debate", reproducibility threads |
| Niche / long-tail | 10% | emerging sub-field queries |
| Adversarial / negative-control | 5% | ambiguous acronyms, spam-bait, should-return-little |

**Mainstream-first rule (ported verbatim in spirit):** *a change that improves an edge-case
class but worsens any mainstream class is a BAD change — revert it.*

## 8. Improvement lever backlog (all free at runtime)

Ordered by expected impact-per-effort; the harness re-prioritizes from data.

1. **Trust / authority ranking** — extend `trust-tier.ts`; boost credible domains, demote
   SEO/marketing/content-farm. (Half-built.)
2. **Dedup + domain/outlet diversity** — extend `dedup.ts`; cap results per domain.
3. **Freshness / time-decay** — recency scoring, weighted per tab.
4. **Query understanding / expansion** — rule-based first; optionally one *cheap, cached* LLM
   rewrite (reuse academic `augmentQuery`), kept cache-friendly to avoid per-query cost.
5. **SearXNG engine config** — tune enabled engines/weights/`settings.yml` per category.
6. **Spam / content-farm filter** — heuristic thin-content removal.
7. **Rerank profile per tab** — keep Cohere (fail-open); tune `topN`/blend; self-hosted
   cross-encoder is a future $0 option.

Every lever is **TDD, table-driven, and gated on query-class** (the academic discipline:
`entity-drift.ts`, `trial-ranking.ts` are multiplicative, gated, unit-tested, surfaced as
flags) so it can't regress classes it shouldn't touch.

## 9. The cycle loop, keep/revert gate, and stop criteria

**The cycle (ported from `PARITY-SPRINT-GOAL.md`):**

```
1. ensure/extend the benchmark
2. run OURS + Exa (opponent) on the set
3. deterministic metrics + blinded council
4. identify the highest-impact lacuna (which class/tab is losing)
5. plan ONE coherent change
6. implement it (TDD: RED→GREEN), table-driven, gated on query-class
7. targeted eval (affected queries) → full eval → ONE council
8. KEEP iff (deterministic holds-or-improves) AND (council holds-or-improves)
   AND (no mainstream regression) AND (all quality gates pass) — else REVERT
9. when no major lacuna remains, add 25–50 fresh unseen queries and repeat
```

**Quality gates (per tab, tunable):** recall@10 ≥ 70% of gold · weighted composite ≥ 7.5 ·
authority/diversity/dedup ratios above their floors · zero fabricated metadata.

**Stop criteria (ported):** stop after **3 consecutive cycles** where ours beats-or-ties Exa
by blinded council majority on **≥ 80%** of queries, all gates pass, no critical lacuna
remains, and deterministic metrics move **< 2%** between cycles (converged).

## 10. CYCLE-0x document template (one per cycle)

Mirrors `CYCLE-01…06`; `CYCLE-04-REVERTED` is the model for a reverted cycle.

```
# Cycle N — <name> — KEEP | REVERT
## Lacuna        which queries/classes are losing, the symptom, the root cause
## Change        ONE coherent change; file(s); table-driven rules; gating; unit tests (RED→GREEN);
                 why provably safe (can only help the targeted class)
## Result        deterministic before→after table (recall@10, nDCG, etc.) on a FROZEN pool;
                 council before→after (beat-or-tie %); targeted per-query rank evidence
## Decision      KEEP or REVERT, with the gate that decided it
```

## 11. Phasing

```
Phase 0  Blind baseline FIRST (unbiased): build harness + ratify gold set + capture Exa
         snapshots; score current SearXNG per tab on deterministic + ONE blind council.   ← the floor
Phase 1  Free cheap wins: trust/authority · dedup/diversity · freshness                    → re-run drill
Phase 2  Query understanding + SearXNG engine/settings.yml tuning                          → re-run drill
Phase 3  Fallback wiring · spam/content-farm filter · per-tab rerank profile               → re-run drill
Cycles   One change each, documented (CYCLE-0x), until the stop criteria in §9 are met
```

## 12. Methodology trace (ported element → academic source)

| Ported element | Academic source |
|---|---|
| Gold standard is a benchmark, never runtime | `ARCHITECTURE.md` ("Elicit is a benchmark only") |
| Hand-ratified `mustFind` ground-truth | `ralph-search/types.ts` `ExpectedPaper`; `BASELINE-87Q-FLOOR.md` |
| Deterministic metrics (recall@10/nDCG/MRR) | `src/lib/search/eval/metrics.ts`; `BEFORE-AFTER-ELICIT.md` |
| Per-dimension weighted composite + ✓/✗ traces | `ralph-search/scorer.ts`, `scorecard.json` |
| Frozen response cache + frozen-pool A/B toggle | `ralph-search/runner.ts`; `CYCLE-04-REVERTED.md`; `REPRODUCIBLE-HARNESS.md` |
| Blinded multi-LLM council (opponent = peer tool) | `council/build-blinded-packet.ts`, `council/aggregate-blinded.ts`, `council/openrouter-judge.mjs`; `BASELINE-BLIND-2026-06-23.md` |
| Opponent snapshots captured offline | `capture-elicit.ts` → port as `capture-exa.ts` |
| Cross-family judge fallback (Grok→Gemini→DeepSeek), temp 0 | `council/openrouter-judge.mjs` |
| ONE change/cycle, mainstream-first weighting | `PARITY-SPRINT-GOAL.md` |
| Keep/revert gate + ONE council per change | `PARITY-SPRINT-GOAL.md`; `PARITY-SPRINT-STATUS.md` |
| Convergence stop (3 cycles, ≥80%, <2%) | `PARITY-SPRINT-GOAL.md` |
| CYCLE-0x template | `CYCLE-01…06` |

## 13. Decision trace (this conversation)

| Decision | Source |
|---|---|
| Build the measurement rig first, then pull levers | User: "I need a gold standard to compare and then keep improving" |
| Port the exact academic Elicit drill (two-layer) | User: "see the exact methodology … come back after you understand it" |
| Exa = offline opponent (key in 1Password), not runtime | User: "exa api key is in 1password … useful for comparison" |
| SearXNG-only runtime + cheap Tavily degradation fallback | User selection: "SearXNG + degradation fallback" |
| Avoid per-query paid API; offline yardstick is fine | User: low opex/profitability paramount, but trash quality loses users |
| Research-adjacent benchmark queries | User selection: "Research-adjacent" |
| Per-tab rubric | Design proposal, accepted |
| Ground truth = authority-rule + tool-consensus, human-ratified | User selection: "Authority-rule + tool-consensus, you ratify" |
| Reuse the existing blinded-council harness; harden 4 open-web inputs | User: "if council is weak — results would be bad" |

## 14. Open questions (resolve during planning / spec review)

- Exact numeric weights per dimension per tab (start from §6.1, tune via harness).
- Whether `engagement` is its own scored dimension for discussions (currently folded into
  authority/community-quality).
- The results-count floor that triggers the Tavily fallback.
- Final benchmark query list per tab (~30–50 total, research-adjacent, class-weighted per §7).
- Exact per-tab council `RUBRIC` wording and whether Perplexity joins Exa as a 2nd opponent.
- Long-term: refresh the gold set from real user queries once the app has traction.
