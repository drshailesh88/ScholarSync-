# Search-Agent Handover — Build a Better Web/News/Discussions Search

> **You are a fresh-context agent.** Your mission: improve ScholarSync's non-academic
> search (the **web / news / discussions** tabs) toward **Exa-level quality**.
> You do **not** need to build a way to measure quality — **it already exists, is proven
> end-to-end, and is on `main`.** Your job is to improve *retrieval* and prove each change
> against the machinery, keep-or-revert. Read this whole file first; it is self-contained.

---

## TL;DR

- A **two-layer quality-measurement machine** is built, reviewed, unit-green, **proven end-to-end
  against live SearXNG + live Exa + 3 real cross-family LLM judges**, and merged to `main`.
- **Baseline verdict (the floor you must climb):** with SearXNG-only retrieval, **ours beats-or-ties
  Exa on 0/12 queries (0%)**. The stop gate is **≥ 80% beat-or-tie**.
- **The diagnosis is structural, not mysterious.** Three measured gaps, each with a known fix
  (see *Findings* + *Architecture direction*).
- **The strategy is federation, not a better single engine** — exactly how Kagi works. SearXNG stays
  as *one* cheap source, not *the* source. Add complementary sources + a fusion/rerank/quality layer.
- **Every improvement is one measured CYCLE:** add a source / ranking change → re-run the machine →
  blinded council vs Exa → **keep iff beat-or-tie went up, revert if not.** No guessing.

---

## 1. The machinery — what exists

Two evaluation layers under `eval/web-search/`. Both are pure benchmark tooling — **neither Exa nor any
judge is ever a runtime dependency.** SearXNG/Brave/etc. are the runtime; Exa is the *offline opponent*.

### Layer 1 — deterministic harness (`eval/web-search/`)
| File | Responsibility |
|------|----------------|
| `types.ts` | Shared types: `WebTab`, `WebBenchmarkQuery`, `WebMustHave`, `ExaFixtureItem`, `CommonRow` |
| `queries.ts` | `BENCHMARK_QUERIES` — 12 seed queries (4 per tab) with `mustHaves` (the gold set) |
| `metrics.ts` | `recallAtK`, `mrr`, `ndcgAtK`, per-tab dimension scorer (`scoreTab`), `PASS_THRESHOLD=7.5` |
| `capture-searxng.ts` | Freeze live SearXNG pools → `cache/<tab>-<hash>.json` (replayable, zero-network scoring) |
| `capture-exa.ts` | Capture the Exa opponent → `exa/fixtures.json` (offline A/B only) |
| `quality.ts` | `toEvalItems`, `applyQualityLayer` (trust-tier + Cohere rerank, **fail-open**), `toPacketRows` |
| `run.ts` | `runFromCache` → writes `runs/<label>/scorecard.json` + `runs/<label>/queries/<id>.json` |
| `rerank-offline.ts` | `abToggle` — frozen-pool A/B toggle for ranking-only changes (delta is 100% attributable) |
| `RUNBOOK.md` | Phase-0 baseline runbook |

### Layer 2 — blinded LLM council (`eval/web-search/council/`)
| File | Responsibility |
|------|----------------|
| `rubric.ts` | 6 dims (`relevance, authority, recency, diversity, dedup, usefulness`), per-tab rubric, output schema |
| `build-blinded-packet.ts` | Builds `PACKET.md` + `key.json`. sha1 A/B blinding per query; **enforces the §6.3 council-strength gates** (≥3 judges, ground-truth present, blinding-integrity field parity, non-empty) and refuses to emit a fingerprintable packet |
| `blinding-check.ts` | Field-parity guard (Exa carries dates/snippets, SearXNG often doesn't — that asymmetry would fingerprint engines) |
| `preflight.ts` | `councilStrengthCheck` — the gate the builder calls |
| `openrouter-judge.mjs` | Run one OpenRouter judge (grok / deepseek / gemini) at temp 0 |
| `judge-schema.ts` | `extractJson` (tolerant) + `parseVerdict` (strict) |
| `aggregate-blinded.ts` | De-anonymizes via `key.json`, majority vote, **per-tab beat-or-tie % vs the ≥80% gate** → `COUNCIL-REPORT.md` |
| `RUNBOOK.md` | Council runbook |

**The 3rd judge seat is a fresh Opus subagent** (blinded, reads `PACKET.md`, writes `opus.json`).
The other two seats are OpenRouter models (grok + deepseek). Aggregator needs **≥3 valid judges** or it discards the run.

Design + plans (deeper detail): `docs/superpowers/specs/2026-06-24-web-news-discussions-search-design.md`,
`docs/superpowers/plans/2026-06-24-web-search-eval-foundation.md`,
`docs/superpowers/plans/2026-06-26-web-search-council-eval.md`.

---

## 2. HOW TO CALL THE MACHINE  ← the loop you run every CYCLE

All secret-bearing commands run via 1Password: `op-run -- <cmd>` (never paste keys).
`SEARXNG_URL` is in `.env.local` but **not** auto-injected into standalone `tsx` — pass it inline.

### Prereqs (already true on this machine)
- `op-run` works; vault is **`Agent Vault`**. Keys present: `COHERE_API_KEY`, `OPENROUTER_API_KEY`, `EXA_API_KEY`.
- Live SearXNG: `http://34.14.206.241:8080` (self-hosted GCP box).

### The full run (copy/paste)
```bash
# 1. Freeze live retrieval pools → eval/web-search/cache/   (re-run only when retrieval changes)
SEARXNG_URL=http://34.14.206.241:8080 npx tsx eval/web-search/capture-searxng.ts

# 2. Capture the Exa opponent → eval/web-search/exa/fixtures.json   (once; re-run to refresh)
op-run -- npx tsx eval/web-search/capture-exa.ts

# 3. Score: cache → quality layer (Cohere rerank) → scorecard + per-query rows
op-run -- npx tsx eval/web-search/run.ts --label baseline

# 4. Build the blinded council packet (runs the §6.3 gates; refuses a fingerprintable packet)
npx tsx eval/web-search/council/build-blinded-packet.ts --run baseline --out CYCLE-XX --salt CYCLE-XX --judges opus,grok,deepseek

# 5. Run the 3 judges on eval/web-search/council/CYCLE-XX/PACKET.md
op-run -- node eval/web-search/council/openrouter-judge.mjs --model x-ai/grok-4.3      --packet eval/web-search/council/CYCLE-XX/PACKET.md --out eval/web-search/council/CYCLE-XX/grok.json
op-run -- node eval/web-search/council/openrouter-judge.mjs --model deepseek/deepseek-v3.2 --packet eval/web-search/council/CYCLE-XX/PACKET.md --out eval/web-search/council/CYCLE-XX/deepseek.json
#   3rd seat = dispatch a fresh Opus subagent: read PACKET.md, score per its schema, Write opus.json (BLINDED — never tell it which engine is which)

# 6. Aggregate → de-anon → per-tab beat-or-tie vs ≥80% gate
npx tsx eval/web-search/council/aggregate-blinded.ts --dir CYCLE-XX
#   → writes eval/web-search/council/CYCLE-XX/COUNCIL-REPORT.md + council-summary.json
```

### Ranking-only changes (cheaper, no judges)
For a pure re-rank experiment (no new source), use the frozen-pool A/B toggle — the score delta is
100% attributable to your `transform`, free of retrieval noise:
```ts
import { abToggle } from "eval/web-search/rerank-offline";
// abToggle({ cacheDir, now, transform }) → [{ id, tab, before, after, delta }]
```

### The keep-or-revert contract (one lever per CYCLE)
1. Run the machine, record `beat-or-tie %` (and per-tab).
2. Make **one** atomic retrieval/ranking change.
3. Re-run. **Keep iff** beat-or-tie went up **AND** no mainstream-query regression **AND** the academic
   suite stays green. Else **revert** that change and try another.
4. Stop when overall + every tab ≥ **80%** beat-or-tie, or returns diminish.

---

## 3. Current baseline result + the 3 structural gaps

Three independent blinded judges (Opus subagent + grok-4.3 + deepseek-v3.2) **unanimously**: **Exa 12 / ours 0 / tie 0**.
Per-tab ours-mean vs exa-mean: web ~2.0–3.3 vs ~4.2–4.6 · news ~2.3–4.0 vs ~4.0–4.9 · discussions ~1.7–1.9 vs ~3.9–4.2.

| Tab | Why it loses (measured) | Fix | Cost |
|-----|------------------------|-----|------|
| **discussions** (~1.8 — worst) | SearXNG `social media` returns **Mastodon/Lemmy fediverse junk**, not real threads. Structural — no rerank fixes it. | **Drop meta-search; go direct: Reddit API + Hacker News (Algolia) + Stack Exchange API** | ~free |
| **web** | keyword scrape returns journal papers, not authoritative *explainers*; no semantic/authority layer | **Brave Search API** (independent index) + **Exa neural** + authority rerank | free tier → paid |
| **news** | single-outlet **wire-flood** (e.g. 8/10 Reuters); weak news source | real news source (**Brave News / Tavily / GDELT**) + **MMR diversity** | free tier → paid |

> ⚠️ Caveats on these numbers: "ours" was **un-reranked** (Cohere trial-key rate-limited the burst — see §5), the
> `mustHaves` gold set is **provisional/un-ratified**, and N=12 with one salt. So treat 0% as a *directional floor*,
> not gospel. The discussions gap is structural and survives all three caveats.

---

## 4. Architecture direction — how the robust players do it

**Nobody good relies on one engine.**
- **Kagi = federation + own verticals + quality re-ranking.** Fans every query to anonymized calls to
  **Google + Brave + Mojeek + Yandex** *plus* its own crawled small-web index (**Teclis**) and news index
  (**TinyGem**) *plus* an AI answer layer, then re-ranks the union with spam/tracker/authority penalties and
  user domain controls. Robustness is a *side effect of federation*.
- **Exa = its own neural embeddings index** (crawl → parse → embed → vector search on *meaning*, not keywords),
  with dedicated news/code/finance modes. That's why it beat us on "find high-quality content about X."

You can't build your own crawl+embed index (millions). So the play is **Kagi-lite: federate rented indexes +
build the fusion/rerank/quality machinery yourself.** That machinery is the moat and is buildable:

```
federated retrieval (N sources/tab, parallel, per-source timeout+fallback)
   → canonicalize + dedup (canonicalUrl)
   → rank fusion (Reciprocal Rank Fusion across sources)
   → semantic rerank (Cohere / cross-encoder)
   → quality/authority signals (domain rep, SEO-spam + ad/tracker penalty, freshness)
   → diversity (MMR — kills the news wire-flood)
   → enrichment (fetch/extract content + dates — fixes the SearXNG no-date field-parity gap)
```

**Source roles (2026 landscape; agent-retrieval scores Exa 8.7 / Tavily 8.6 / Serper 8.0 / Brave 7.1):**
- **SearXNG** — keep as *one* cheap source, not the source.
- **Brave Search API** — independent index (not a Google scraper), generous free tier, Feb-2026 LLM-Context API
  returns ranked chunks. Best robust general-web backbone.
- **Tavily** — cleanest LLM-optimized source; but it's an aggregator over a cache → can return **stale/404**;
  use as *one* federated source, not the only one.
- **Exa** — only real option for semantic / find-similar; already wired as the offline opponent, can graduate to a runtime web source.
- **Serper / SerpAPI** — avoid as a backbone (Google-scraper wrappers = unreliable dependency).
- **Verticals (discussions)** — Reddit API, Hacker News Algolia API, Stack Exchange API — free, and the single highest-leverage fix.

---

## 5. Recommended CYCLE backlog (cheapest/highest-leverage first)

1. **CYCLE 1 — discussions verticals (free, biggest lever).** Replace SearXNG-discussions with
   Reddit + HN (Algolia) + Stack Exchange APIs behind the existing search source interface. Measure.
2. **CYCLE 2 — web/news backbone (free tier).** Add Brave Search API alongside SearXNG; add RRF fusion. Measure.
3. **CYCLE 3 — ranking quality.** Add MMR diversity (kills news flood) + a **production Cohere key** (the
   current key is **Trial, 10 calls/min** → bursts get 429'd and `applyQualityLayer` fails open to *un-reranked*
   results, silently). Until then your "ours" scores understate the production layer. Measure.
4. **CYCLE 4 — paid sources.** Add Exa/Tavily as *runtime* web sources only if CYCLEs 1–3 don't reach 80%; decide on measured lift.

---

## 6. Environment, secrets & guardrails

- **Secrets:** 1Password Service Account via `op-run --`. Vault is **`Agent Vault`** (not "Dev" — older docs say Dev).
  Env template: `~/.config/op/dev.env`. `EXA_API_KEY` is wired (`op://Agent Vault/EXA_API_Key/credential`).
  **Never paste keys in chat**; add new keys to the vault from the 1Password app + a line in `dev.env`.
- **Cohere is a Trial key (10/min).** Real baseline runs need pacing or a production key, else scoring is silently un-reranked.
- **SearXNG:** `http://34.14.206.241:8080` (in `.env.local`; pass inline to `tsx` scripts).
- **Cost constraint relaxed.** The original design was `$0/query, SearXNG-only`. That is what's failing.
  The discussions fix is free; Brave/Tavily have free tiers; decide a per-query budget before adding paid runtime sources.
- **Do NOT break the medical default.** Medicine is the default domain; no-domain-param behavior must stay unchanged. Academic
  eval suite (`src/lib/search/__tests__/ralph-search/`) must stay green.
- **Git hygiene:** `eval/web-search/{cache,runs,exa,council/*}` outputs are untracked and **not** gitignored
  (the RUNBOOKs intend you to commit a *ratified* baseline later). Provisional/throwaway runs: **do not commit.**
  There is an unrelated working-tree edit to `src/lib/search/__tests__/ralph-search/scorecard.json` — **never sweep it into a commit.**
  Stage only explicit paths; never `git add -A/./-a`.

---

## 7. What's verified vs what's pending

- ✅ Machinery built, reviewed, unit-green (web-eval 56/56, academic 20/20), proven end-to-end on live services, on `main`.
- ✅ Cohere rerank integration confirmed (HTTP 200 + correct reorder); Exa capture, blinded packet gates, 3-judge parse, de-anon all real-run-verified.
- ⏳ **Real Phase-0 baseline** still needs: (a) production/paced Cohere key, (b) human ratification of the `mustHaves` gold set
  (`eval/web-search/RUNBOOK.md` §1). Then the `/goal` CYCLE loop has a trustworthy floor to climb from.
