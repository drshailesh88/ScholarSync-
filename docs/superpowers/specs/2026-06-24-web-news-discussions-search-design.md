# Web / News / Discussions Search — Quality Sprint Design

- **Date:** 2026-06-24
- **Status:** Approved (design) — pending implementation plan
- **Author:** Shailesh Singh (with Claude Code)
- **Scope:** The non-academic search tabs (`web`, `news`, `discussions`) served by
  `/api/search/unified`. Academic search (`run-search.ts`) is out of scope and unchanged.

---

## 1. Problem

ScholarSync has two search worlds with very different maturity.

**Academic search** (`src/lib/search/run-search.ts`) is a fusion machine: multi-source
fan-out (PubMed, OpenAlex lexical **+** semantic, Semantic Scholar, ClinicalTrials, a
domain-restricted Tavily fallback) → query planning → RRF fusion → OpenAlex enrichment →
Cohere rerank → evidence-aware quality ranking → trust tiers. It is hardened (circuit
breakers, per-lane timeouts, a global fan-out deadline with partial results, two-tier
cache) and — critically — it is **measured**: a frozen eval harness (`ralph-search`)
scores recall/precision/ranking/metadata/dedup, anchored to **Elicit as a blinded gold
standard**, improved over documented cycles (`CYCLE-01…06`).

**Non-academic search** (`/api/search/unified`, the `tab !== "academic"` branch →
`fetchNonAcademicResults`) is single-source: SearXNG only → Cohere rerank → domain
preferences → trust tier → paginate. There is **no second opinion, no domain-appropriate
ranking machine, and — the real gap — no way to measure "better."**

The gap is therefore not a SearXNG tweak. It is that non-academic search lacks the one
thing that made academic improvable: **a gold standard and a frozen eval harness.**

## 2. Goal & non-goals

**Goal:** Reach *decent*, profitable-to-run quality on the `web`, `news`, and
`discussions` tabs by running the **same blinded gold-standard drill** that worked for
academic — without adding a per-query paid-API dependency.

**Quality floor is non-negotiable:** low operational cost with trash results is a failure.
No user adopts a bad search. "Decent" is defined numerically in §8.

**Non-goals:**

- Changing academic search in any way.
- Multi-source runtime fusion (SearXNG + Tavily + Exa blended on every query). Explicitly
  deferred — see §4. It may be revisited *only* if the harness proves a single source
  cannot reach the target.
- A best-in-class general web engine. The target is *decent for our users*, not "beat
  Google."

## 3. Locked decisions

These were settled during the design conversation and are the spine of the sprint.

1. **Free engine, paid yardstick.** SearXNG (self-hosted, ~$0/query) is the sole runtime
   engine. Paid tools are used **offline only** to build the benchmark. This mirrors the
   academic model, where Elicit was a yardstick, never called on a user's search.

2. **Cost lives in two different places, and we only avoid one of them.**
   - *Paid search API as a runtime source* (on every user query) → the profitability
     killer → **avoided.**
   - *Paid tool as an offline yardstick* (~30–50 queries, once) → a few dollars total →
     **fine.**

3. **Gold standard = Exa-anchored, blinded, frozen, human-ratified.** Exa (category-matched
   per tab) seeds candidate ideal results; Perplexity is an optional sanity seed; the user
   blind-ratifies; the result is **frozen to JSON**. The live engine is scored against the
   frozen human set — never against live Exa — which removes the self-grading bias.

4. **SearXNG + degradation fallback.** SearXNG runs every query. A single Tavily call fires
   **only** when SearXNG is degraded/blocked/empty (rare → bounded cost). Tavily is the
   fallback (not Exa) because `searchTavily` already exists and the key is already
   provisioned.

5. **Per-tab rubric.** "Good" differs by tab; there is no evidence hierarchy on the open
   web. Each tab gets its own scored dimensions and weights (§6).

6. **Benchmark queries are research-adjacent.** They match real ScholarSync users
   (emerging-science topics, drug/treatment/trial news, methodology debates, public-health
   discourse, preprint controversies), not general-purpose web queries.

7. **Every improvement lever is free code/config.** No lever in the improvement backlog
   (§7) introduces a per-query paid dependency.

## 4. Source roles (unambiguous)

| Tool | Role | When it runs | Cost | Status |
|---|---|---|---|---|
| **SearXNG** | Runtime workhorse | Every query | $0/query (fixed server cost) | Integrated (`sources/searxng.ts`) |
| **Tavily** | Runtime degradation fallback | Only when SearXNG breaker trips / returns empty | ~$0.006 × (rare) | Integrated (`sources/tavily.ts`); call with `restrictDomains: false` for general web |
| **Exa** | Offline yardstick (gold-set seed) | Once, building the gold set | ~few $ total | Signup needed; offline only |
| **Perplexity** | Optional offline sanity seed | Once, gold-set ratification | Optional | Not integrated; manual web UI is fine |
| **Cohere** | Runtime rerank | Every query, fail-open | ~$0.002/query | Integrated (`rerank.ts`); no key → returns input unchanged |

Why fusion is deferred (not chosen): academic *must* union sources because PubMed,
OpenAlex, and S2 are disjoint corpora — a missed source is a missed paper. The open web is
the opposite: SearXNG, Tavily, and Exa are three rankers over the *same* web, so unioning
yields small marginal recall while adding cross-source dedup and heterogeneous-metadata
noise. Single-source is the disciplined default; the harness can later justify fusion with
evidence if a single source plateaus below target.

## 5. Production architecture

The `tab !== "academic"` branch of `/api/search/unified` becomes:

```
query (tab → SearXNG category: web=general, news=news, discussions=social media)
  └─ SearXNG                                   ← sole engine, $0/query
        │  breaker trips OR degraded OR results < floor
        └─ FALLBACK: single Tavily call (restrictDomains:false, topic=general|news)
  → quality layer (all free; trust-tier + dedup + domain-prefs already exist):
        1. trust / authority ranking      (reuse + extend trust-tier.ts)
        2. freshness / time-decay         (new; weighted per tab)
        3. dedup + domain/outlet diversity (extend dedup.ts; cap results per domain)
        4. spam / content-farm filter     (new; heuristic)
        5. Cohere rerank                  (reuse rerank.ts; per-tab profile; fail-open)
        6. domain preferences             (reuse applyDomainPreferences)
  → top-N to dashboard
```

**Fallback trigger (precise):** fire the Tavily fallback when SearXNG returns
`degraded === true`, OR returns fewer than a configured floor of results for a non-trivial
query. Exactly one fallback call; fallback results pass through the same quality layer.

**Fail-open chain (no new failure modes):** SearXNG degraded → Tavily fallback → both fail
→ return empty with the `searxngUnavailable`/degraded flag already present in the response
contract.

**Ranking profile per tab:** the quality layer reads a per-tab weight profile (§6) so the
same code produces tab-appropriate ordering without branching logic.

## 6. Eval harness (first deliverable) ⭐

Mirrors `src/lib/search/__tests__/ralph-search/` structure: frozen `cases/`, a frozen
response `cache/`, a `scorer`, a `runner`, and a `scorecard.json`.

### 6.1 Gold-set construction (offline, once)

For each benchmark query: query Exa with the tab-matched `category` (+ optional Perplexity)
→ pool candidates → **user blind-ratifies** which results are "ideal" → freeze to a per-tab
case JSON (query + ranked expected results + per-result notes). The frozen set is the
scoring target; live Exa is never called during scoring.

### 6.2 Per-tab rubric

Dimensions are scored 0–10; a per-tab **weighted composite** produces the case score; each
dimension emits **✓/✗ detail traces** per expected item so failures are debuggable (exactly
like the academic `scoreDetails`).

| Dimension | Web | News | Discussions |
|---|---|---|---|
| Relevance | ●●● | ●●● | ●●● |
| Authority / source reputation | ●●● | ●●● | ●● (real community vs SEO Q&A farm) |
| Recency / freshness | ● | ●●● | ●● |
| Diversity (no single-domain flood) | ●● | ●● (outlets) | ●● (platforms: Reddit/HN/SE) |
| Dedup (incl. same wire story) | ●● | ●●● | ●● |

(`●●●` ≈ high weight, `●●` ≈ medium, `●` ≈ low. Exact numeric weights are set in the
harness config and tuned during the sprint; weights are data, not code.)

### 6.3 Blinded A/B scoring

Our top-10 vs the gold top-10, de-identified, scoring **recall** (did we surface the gold
items), **precision** (are our top-10 good), and **ranking** (are the best items high).
This reproduces the blind comparison that drove the academic sprint.

### 6.4 Determinism

Freeze raw SearXNG (and fallback) responses into the harness `cache/` (mirrors
`REPRODUCIBLE-HARNESS.md`). The scorer **replays cached responses → runs the ranking
pipeline → scores**, so the *ranking layer* iterates deterministically with zero live
calls. Only a *retrieval* change (SearXNG engine/`settings.yml`) requires a re-fetch +
re-freeze.

## 7. Improvement lever backlog (all free)

Ordered roughly by expected impact-per-effort; the harness re-prioritizes as data arrives.

1. **Trust / authority ranking** — extend `trust-tier.ts`; boost credible domains, demote
   SEO/marketing/content-farm domains. (Half-built.)
2. **Dedup + domain/outlet diversity** — extend `dedup.ts`; collapse near-duplicates and
   cap results per domain so one site can't flood a page.
3. **Freshness / time-decay** — recency scoring, weighted per tab (heavy for news, light
   for web).
4. **Query understanding / expansion** — rule-based first; optionally one cheap, cached LLM
   rewrite (reuse the academic `augmentQuery` pattern). Must stay cache-friendly to avoid
   per-query cost.
5. **SearXNG engine config** — tune enabled engines, weights, and `settings.yml` per
   category for coverage and reliability.
6. **Spam / content-farm filter** — heuristic removal of listicle/SEO/thin-content pages.
7. **Rerank profile per tab** — keep Cohere (fail-open); tune `topN` and the per-tab blend;
   a self-hosted cross-encoder is a future $0 option if a fully zero-paid runtime is wanted.

## 8. Phasing & exit gate

```
Phase 0  Build harness + ratify gold set + BASELINE (current SearXNG per tab)  ← the floor
Phase 1  Trust/authority ranking · dedup/diversity · freshness                 → re-measure
Phase 2  Query understanding + SearXNG engine/settings.yml tuning              → re-measure
Phase 3  Fallback wiring · spam/content-farm filter · per-tab rerank profile   → re-measure
Cycles   Documented (CYCLE-01…) until the exit gate is met
```

**Exit gate ("decent") — proposed, tunable:** per tab, **recall@10 ≥ 70%** of the gold set
**and weighted composite ≥ 7.5/10**. Each improvement cycle is documented like the academic
`CYCLE-0x` notes (before/after scores, the change, kept-or-reverted).

## 9. Error handling

- All sources fail open (existing pattern). The fallback chain in §5 introduces no new
  failure modes.
- Harness: a case with a missing cache entry is skipped with a warning, never a hard fail.
- Cohere/Tavily/SearXNG absence each degrade gracefully (no key / breaker open → empty or
  unchanged).

## 10. Testing strategy

- **Unit (TDD, one red-green at a time):** each new lever — freshness decay, diversity cap,
  spam filter, trust-ranking extension — gets behavior tests (happy / edge / sad paths).
- **Harness runner tests:** mirror `ralph-search/runner.test.ts` — scorer correctness on
  fixed fixtures, deterministic replay from `cache/`.
- **Route integration:** the non-academic branch returns correctly ranked, deduped,
  fallback-resilient results; degraded-SearXNG triggers exactly one Tavily call.
- **No academic regression:** academic eval (`ralph-search` scorecard) must be unchanged —
  this sprint must not touch its code paths.

## 11. Open questions (resolve during planning / spec review)

- Exact numeric weights per dimension per tab (start from §6.2, tune via harness).
- Whether `engagement` should be a scored dimension for discussions (currently folded into
  authority/community-quality).
- The results-count floor that triggers the Tavily fallback.
- Number of benchmark queries per tab (target ~30–50 total, research-adjacent).
- Long-term: refresh the gold set from real user queries once the app has traction.

## 12. Decision trace

| Decision | Source |
|---|---|
| Build the measurement rig first (gold standard + harness), then pull levers | User: "I need a gold standard to compare and then keep improving" |
| Exa-anchored gold standard | User selection: "Exa-anchored" |
| SearXNG-only runtime + cheap degradation fallback | User selection: "SearXNG + degradation fallback" |
| Avoid per-query paid API; offline yardstick is fine | User: low opex / profitability is paramount, but trash quality loses users |
| Same blinded A/B drill as academic (Elicit) | User: described the academic Elicit sprint as the template |
| Research-adjacent benchmark queries | User selection: "Research-adjacent" |
| Per-tab rubric | Design proposal, accepted (no objection) |
