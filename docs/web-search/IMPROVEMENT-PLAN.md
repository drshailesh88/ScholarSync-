# Non-Academic Search — Improvement Plan (web / news / discussions / videos + eval)

> Scope: the WEB, NEWS, DISCUSSIONS, VIDEOS tabs and the eval that measures them.
> Academic search and Deep Research are out of scope (both in a good state).
> Grounded in July-2026 literature, repos, and API pricing. Every lever is tagged
> with **cost** and **effort** so spend stays deliberate. Pre-revenue posture:
> *free/owned first, a little paid spend where it clearly earns it, nothing gratuitous.*

---

## 0. The verdict up front

The rebuild is genuinely good — fully keyed in prod, all tabs federated, and **discussions
is a real, measured win (100% beat-or-tie vs Exa)**. The improvement work here is **mostly
free**: the highest-leverage move on every tab is a ranking/observability change we can make
with tools we already own (the bge cross-encoder, RRF, the transcript fetcher), not a new
paid API.

**The money truth:** at pre-revenue traffic the marginal cost of search is near-zero *if we
don't multiply calls*. Exa carries a 20k-request/mo free tier; the real spend risks are
(a) **fan-out multiplication** (calling 4 engines per query) and (b) **premium endpoints**
(Exa Deep/Answer at 2–3× Search). So cost discipline = **caching + capped tiered fallback**,
not penny-pinching. Two external facts to internalize:
- **Brave killed its free Search API tier (Feb 2026)** — now $5/1k, ~$5/mo (~1k) credit only
  with public attribution. Our **discussions Reddit path and web/news fallback run through
  Brave**, so it is now a *paid dependency to defend with caching*.
- **Bing News API is retired (HTTP 410, Aug 2025)** — do not build on it.

---

## 1. The cost/observability foundation (build once, every tab benefits)

This is the substrate. Do it first; it de-risks spend on all four tabs and is the insurance
against the next free-tier kill.

| Lever | What it does | Cost | Effort | Evidence |
|---|---|---|---|---|
| **Two-layer result cache (exact + semantic), per-tab TTL** | Serve repeat/near-repeat queries from cache; call paid APIs only on miss | **$0** | Low–Med | 40–80% spend cut, 250× latency; one AWS study 86% cut over 63,796 real queries (Percona; MeanCache arXiv:2403.02694) |
| **Per-tab TTLs + ±10% jitter** | Match freshness to truth: news 5–30 min, discussions 1–6 h, web 6–24 h, video 6–24 h, embeddings ∞ (content-hash) | $0 | Low | AWS API Gateway caching; easyparser 2026 |
| **Capped tiered fallback (free-first)** | Cache → SearXNG (free) → free-tier paid (Exa 20k/mo, NewsData, YouTube) → metered paid, only on quality shortfall/quota-exhaust | $0 (saves) | Med | eval-cost research |
| **Per-tab paid-budget guardrail** | Hard daily cap on Exa/Linkup/Brave; when tripped, degrade to owned SearXNG+Brave+RRF+bge instead of erroring — *cost becomes a dial, not a surprise* | $0 (saves) | Low | web-news research §5 |
| **Request coalescing (single-flight) + stale-while-revalidate** | One upstream call per hot query on cache expiry; serve stale instantly, refresh in bg | $0 | Low | coalescer patterns; SWR |
| **Embedding cache (content-hash keyed, never expire)** | Never re-embed the same string; repeat reranks are free | $0 | Low | eval-cost research |
| **`primaryLed` + per-source telemetry** | Emit whether Exa led or the fallback kicked in; alert when Exa-led rate drops — makes the silent web-degradation failure visible | $0 | Low | audit risk #1 |

**Cost ceiling to enforce:** a per-tab daily cap (e.g. Exa ≤ N/day) that trips into the free
owned machinery. This single guardrail means no traffic spike or free-tier kill can bleed money.

---

## 2. WEB tab

**Today:** Exa's top-10 passed through verbatim (paid, per-query); own machinery (SearXNG +
Brave + RRF → bge rerank → MMR) runs only on the Exa-down fallback. Quality = Exa's quality;
it fails silently if Exa drops.

**Verdict: rent, don't build.** An owned open-web crawl+embed index loses build-vs-rent
pre-revenue (embedding is cheap — ~$14 to embed 10M docs on one GPU — but *continuous
crawling of tens of billions of pages for coverage + minute-freshness is Exa's actual
product*, and Common Crawl is a stale monthly snapshot). The money is in caching + routing +
the reranker we already own, not an index.

| # | Lever | What it does | Cost | Effort |
|---|---|---|---|---|
| 1 | **Semantic query-result cache** (from §1) | Shrinks Exa spend directly; overlapping queries repeat heavily | **$0** | Low |
| 2 | **Query routing / tiering** | Navigational/keyword → Serper ($0.30–1/1k) or Brave + **our existing bge reranker**; semantic/exploratory "find pages like this" → Exa. We pay Exa prices for queries a cheap feed + our rerank already answers | **↓ spend** | Med |
| 3 | **Add Linkup in parallel, rerank Exa∪Linkup** | Kills the Exa single-point-of-failure; Linkup benchmarks at Exa quality (~92% F on Verified SimpleQA) at ~same price | **~€5/1k (worth it)** | Med |
| 4 | **Authority as a ranking feature** | Replace the hardcoded allowlist with **Open PageRank / Tranco** rank → demote content farms, break reranker ties | **$0** | Low–Med |
| 5 | **`primaryLed` telemetry** (from §1) | Make the Exa dependency's failure observable | $0 | Low |

**Do NOT:** build an owned web index; build an AI-slop classifier (no detector >85% acc,
3–12% false positives — use authority + engagement instead).

**Money note:** cheap-keyword + our strong reranker *approximates* neural retrieval for a large
query slice — the "fallback" is good enough to be the *primary* for many queries. Exa's edge is
narrow (semantic/exploratory). Routing exploits exactly that, cutting bleed **and** the SPOF at once.

---

## 3. NEWS tab

**Today:** federated (SearXNG-news + Brave-News + NewsData + Exa-news), weighted RRF, MMR
diversity, no rerank. "Recency-first" is a misnomer — no explicit recency sort.

**The biggest win costs nothing and it isn't another API — it's clustering.**

| # | Lever | What it does | Cost | Effort |
|---|---|---|---|---|
| 1 | **Cluster-then-rank + near-dup dedup** | The real wire-flood fix MMR can't do: SimHash/RETSim on **title + lead/locations first**, collapse each cluster to one canonical (highest Open-PageRank authority) + "N more outlets" roll-up | **$0** (CPU) | Med |
| 2 | **Explicit recency-decay score** | Makes "recency-first" true: `e^(−λ·age)` (or Reddit-style `log + t/τ`) with a news half-life (hours–days) — recency becomes a tunable knob | **$0** | Low |
| 3 | **Re-add GDELT done right** | The 12s rejection was an integration bug: query **async, time-range chunked, non-blocking with a timeout budget**, cache hard → free 100+ lang, 15-min-fresh breadth | **$0** | Med |
| 4 | **Light bge rerank over the post-clustering canonical set** | Semantic relevance on the deduped set (small pool = cheap) | **$0** (own GPU) | Low |
| 5 | **Drop / de-weight paid Exa-news** | Redundant once GDELT + Brave News + NewsData + **Guardian (5k/day free)** + clustering are in; reallocate Exa budget to the web tab | **↓ spend** | Low |
| 6 | **Per-domain caps + cluster diversity** | Authority-aware canonical pick + demote farms | **$0** | Low |

**Sources:** keep Brave News (bundled) + NewsData (reliable structured headlines) + add
**Guardian Open Platform** (5k/day free, quality full-text). Skip Event Registry (native
clustering but from $600/mo — we build it free). Bing News: dead (410).

---

## 4. DISCUSSIONS tab  *(the 100% win — broaden cheaply, protect fiercely)*

**Today:** Reddit (via Brave `site:reddit.com`) + Hacker News (Algolia) + Stack Exchange
(only 2 sites) + RRF + MMR. Measured at Exa parity. **Two structural facts:** Reddit's own API
403s from datacenter IPs (and now needs pre-approval + is paid >100 QPM), and the Brave path
is now a **paid dependency** (Brave free tier died Feb 2026).

| # | Lever | What it does | Cost | Effort |
|---|---|---|---|---|
| 1 | **Register free Stack Exchange key + add domain sites** | 2 → many sites (Stats, Data Science, Software Eng, MathOverflow, Bioinformatics); free key lifts 300→**10,000 req/day** (33×). Cheapest, safest broadening | **$0** | Low |
| 2 | **Fold free thread-quality signals into fusion (behind an A/B flag)** | HN points/comments, SE score/`is_answered`/accepted, Reddit/Lemmy upvotes — data already fetched; add **Time-Weighted RRF** for recency. Test vs the frozen 100% baseline before promoting | **$0** | Med |
| 3 | **Add Lemmy + PullPush/Arctic Shift as free Reddit fallback** | Reddit coverage survives a Brave outage/credit-exhaust; Lemmy adds federated threads + vote signals, no auth | **$0** | Med |
| 4 | **Defend the Brave dependency** | Cache hard, normalize keys (lowercase/trim/sort), monitor spend — the one place a traffic spike bleeds money ($5/1k) | **$0** | Low |

**Guardrail:** every change here ships **behind an A/B flag measured against the frozen
100%-parity baseline** — protect the win first.

---

## 5. VIDEOS tab  *(thinnest tab, biggest upside)*

**Today:** YouTube Data API only, **zero ranking layer** (raw YouTube order), no fallback;
prod has one YouTube key (100 searches/day → empty tab on exhaust). The transcript/AI-notes
feature is a separate per-video action, not a search lever.

**The biggest win is the ranking layer we don't have — using tools we already own.**

| # | Lever | What it does | Cost | Effort |
|---|---|---|---|---|
| 1 | **Transcript + metadata cross-encoder rerank** | YouTube top ~20–40 → self-host `youtube-transcript-api` (no key/quota) → rerank `(query, title+desc+transcript-snippet)` with **bge-reranker-v2-m3 on CPU** (~50–100 ms) → tie-break recency/engagement. **Transcripts are the strongest untapped relevance signal** (94% of top videos carry captions). Single highest-ROI change | **$0** | Med |
| 2 | **TTL caching + normalized keys** (from §1) | Collapses YouTube call volume → the 100/day ceiling becomes a non-event | **$0** | Low |
| 3 | **Supadata as quota-free FALLBACK** (not primary) | Overflow for exhausted key + Whisper transcripts for caption-less videos | **free 100/mo, ~$9/1k** | Low |

**Do NOT:** rotate multiple YouTube keys (explicit ToS violation, Google bans *all* projects
incl. the legitimate one); self-host Invidious/Piped as backbone (ToS takedowns, slow/blocked);
federate Vimeo/Dailymotion/podcasts (thin catalogs, low yield — YouTube-with-better-ranking wins).

---

## 6. EVAL — make it honest and cheap (escape the Exa tautology)

**Today:** stale (2 cycles behind shipped code) and **tautological** — Exa is *both* the
council's opponent *and* a runtime source, and the winning move was `web = raw Exa`, so
"web beats-or-ties Exa" = "you can't lose to yourself." The gate is set-based (blind to order);
gold set unratified (N=12, one salt); authority = a hardcoded list.

| # | Lever | What it does | Cost | Effort |
|---|---|---|---|---|
| 1 | **Ordering-aware deterministic gate** | Replace the set-based gate with **nDCG@10 + MRR@10 + ERR/RBP** via **`ir_measures` / `pytrec_eval`** — pure functions of ranked list + frozen labels, **no LLM per run**, runs in CI in seconds | **$0** | Med |
| 2 | **Score vs a frozen, pooled, human-ratified gold set** | ~50 queries/tab (not 12), pooled top-10 across an **engine panel**, graded 0–3, **Krippendorff α reported**, versioned, re-pooled quarterly (monthly for news) | **$0** (your time + LLM pre-label) | Med–High |
| 3 | **Panel of reference engines, never Exa alone** | Pool Exa + Brave + Tavily + a SERP → the gold set records docs Exa *missed*, so raw-Exa stops being an automatic win. **Breaks the tautology** | **$0–small** | Med |
| 4 | **Ensembled, different-family, order-swapped LLM council — only for gold refresh / config change** | Small open judges (**Prometheus-2**), majority vote, position-bias guarded, self-preference guarded (judge ≠ the model that ranks). Not every CI run | **~$0** (local) | Med |
| 5 | **Team-Draft Interleaving on live clicks** | The one signal that *can't* be gamed by copying a reference engine — wire now, meaningful once traffic exists | **$0** | Med |

**OSS:** `ir_measures`, `pytrec_eval`, BEIR (Apache-2.0), RAGAS/DeepEval (Apache-2.0),
Prometheus-2. **Public benchmarks to sanity-check:** BEIR (web), TREC DL/RAG + Tip-of-the-Tongue,
MIND (news — *research-license*, methodology only), MSR-VTT/ActivityNet (video).

---

## 7. Phased roadmap (recommended order)

**Phase 0 — Foundation & de-risk (mostly $0, no measurement needed):**
- §1 result cache + per-tab TTLs + capped tiered fallback + per-tab budget guardrail.
- Web `primaryLed` telemetry.
- Videos: TTL caching (makes the quota ceiling a non-event) + Supadata fallback wired.
- *Outcome: silent failures visible, spend capped, quota risk gone.*

**Phase 1 — Honest eval (so everything after is measured):**
- §6 #1–#3: ordering-aware `ir_measures` gate + ~50-query pooled gold set + engine panel.
- *Outcome: a trustworthy, non-tautological baseline for every tab.*

**Phase 2 — The free high-leverage quality wins (measured against Phase 1):**
- Videos #1: transcript+metadata bge rerank (biggest upside).
- News #1–#2: clustering/dedup + recency-decay.
- Discussions #1: free SE key + domain sites.
- *Outcome: the thinnest tab gets its first ranking layer; news wire-flood fixed; discussions broadened.*

**Phase 3 — Resilience & measured spend:**
- Web #2–#4: query routing + Linkup redundancy + Open-PageRank authority.
- News #3, #5: GDELT-async + drop Exa-news.
- Discussions #2–#3: thread-quality signals (A/B) + Lemmy/PullPush fallback.

**Deferred (post-revenue, explicit):** owned semantic web index (the true Exa-parity retrieval
lever — the web analog of the peS2o academic corpus). Not justified pre-revenue.

---

## 8. What NOT to spend on (the money-savers)

- ❌ Owned open-web crawl+embed index (rent Exa; owning loses pre-revenue).
- ❌ AI-slop classifier (no detector >85%; use authority+engagement free).
- ❌ YouTube multi-key rotation (ToS violation → all-project ban).
- ❌ Self-hosted Invidious/Piped backbone (ToS takedowns, brittle).
- ❌ Vimeo/Dailymotion/podcast video federation (low yield).
- ❌ Event Registry / paid native news clustering ($600/mo — build free with SimHash).
- ❌ Paid Exa-news (redundant; drop it and reallocate to web).
- ❌ Cohere Rerank as default (we own bge at $0; Cohere only if bge proven insufficient).

## 9. Rough cost envelope at pre-revenue traffic

Almost entirely **$0**: caching, reranking (own bge), clustering, recency-decay, GDELT,
Guardian, HN, Stack Exchange, Lemmy, transcripts, the whole eval. The only deliberate paid
lines: **Exa** (web semantic queries, inside/near its 20k free tier), **Linkup** (~€5/1k, web
redundancy), **Brave** (discussions Reddit path + fallback, ~1k/mo free credit), **NewsData**
(free tier), **Supadata** (video fallback, free tier). With the §1 caching + per-tab budget
caps, total controllable spend at low traffic is a small, bounded monthly figure — a dial, not
a surprise.
