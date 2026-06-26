# Web/News/Discussions Search — Blinded LLM Council (Plan 2 of 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the offline **blinded LLM-council** layer (Layer 2) for non-academic search, so each ranking change can be judged "beat-or-tie vs Exa" by ≥3 cross-family judges who cannot tell which engine is ours — reusing Plan 1's queries, gold-set `mustHaves`, and Exa fixtures.

**Architecture:** Port the proven academic council harness (`eval/literature-search/council/*`, ~80% reusable) into `eval/web-search/council/`, applying the four open-web hardening changes from the design spec §6.2: (1) ground-truth `mustHaves` printed in the packet, (2) an objective per-tab rubric, (3) rich packet rows (domain + publishedDate + snippet, not bare titles), (4) a strong tab-matched Exa opponent. Add one web-specific hardening the academic version never needed — a **blinding-integrity / field-parity check** — because Exa rows always carry dates+snippets while SearXNG rows may not, which is a fingerprint. Every judge is blinded, isolated, fresh-context, `temperature: 0`; A/B labels are randomized per query; the de-anon key is withheld from judges. A run that fails the §6.3 council-strength checklist is discarded, not trusted.

**Tech Stack:** TypeScript, Node, `tsx`, `vitest`, the OpenRouter HTTP API (cross-family third seat), and the Plan 1 modules (`queries.ts`, `quality.ts`, `run.ts`, `types.ts`'s `CommonRow`/`ExaFixtureItem`). No new runtime dependency; everything here is offline/eval-time.

## Global Constraints

Copied from the design spec (`docs/superpowers/specs/2026-06-24-web-news-discussions-search-design.md`) and Plan 1. Every task implicitly includes these.

- **Runtime engine is SearXNG only.** Exa/Perplexity/OpenRouter judges are offline/eval-time only — never imported by `src/` runtime code. (`ARCHITECTURE.md`: "the benchmark is never a runtime dependency".)
- **Secrets via 1Password only.** `OPENROUTER_API_KEY`, `EXA_API_KEY`, `COHERE_API_KEY` live in the `Dev` vault; all access is through `op-run -- <cmd>`. Never print, log, or commit a key.
- **No academic regression.** This plan adds only new files under `eval/web-search/` (and extends Plan-1 files `quality.ts`/`run.ts`/`package.json` additively). It must not modify `src/lib/search/run-search.ts`, `eval/literature-search/`, `ralph-search/`, or any academic path. The academic `ralph-search` and literature-search scorecards stay byte-identical.
- **Exa is the opponent, never the answer key.** Ground truth is the human-ratified `mustHaves` from Plan 1; Exa is only the blinded A/B peer. No self-grading.
- **Blinding is load-bearing.** Both engines render in identical format using only common fields (`title`, `url`, `domain`, `publishedDate`, `snippet`); A/B assignment is randomized per query via `sha1(salt:id)`; `key.json` is withheld from judges. A council run whose blinding-integrity check fails is discarded.
- **Cross-family judges, temp 0, isolated.** ≥3 judges from different model families: **Opus** (Claude subagent) + **Codex** + a third via OpenRouter (**Grok** or **DeepSeek**). `temperature: 0`, strict JSON, fresh context, no judge sees another's vote. One council per genuine change — never re-roll.
- **All eval is offline.** Nothing in this plan runs on a user's request path.
- **Stage only your task's files.** The working tree holds many unrelated untracked files (`.obsidian/`, `.vercel/`, `docs/*`, `*.md`) and a pre-existing modification to `src/lib/search/__tests__/ralph-search/scorecard.json`. Stage files by explicit path; never `git add -A` / `git add .` / `git commit -a`. Confirm `git status` shows only your files before committing.

---

## File Structure

```
eval/web-search/
  quality.ts            # (EXTEND) add toPacketRows(): UnifiedSearchResult[] → CommonRow[]
  run.ts                # (EXTEND) also emit runs/<label>/queries/<id>.json (per-query engine rows for the packet)
  council/
    rubric.ts           # per-tab RUBRIC_BY_TAB + shared 6-dim web scoring schema + OUTPUT_SCHEMA
    build-blinded-packet.ts  # deterministic A/B blinding, rich rows, mustHaves anchor, per-tab rubric → PACKET.md + key.json
    blinding-check.ts   # field-parity + A/B-balance integrity check (the web fingerprint guard)
    judge-schema.ts     # extractJson() + parseVerdict() — tolerant parse, strict validate of a judge reply
    aggregate-blinded.ts# de-anon via key → per-query majority + per-tab tally + beat-or-tie% + embed blinding result
    preflight.ts        # council-strength checklist (§6.3): a run failing any gate is discarded
    openrouter-judge.mjs# run one OpenRouter judge (Grok/DeepSeek/Gemini) at temp 0 (web-generic instruction)
    RUNBOOK.md          # the human council-run procedure (build → 3 judges → aggregate → checklist)
    __tests__/
      rubric.test.ts
      build-blinded-packet.test.ts
      blinding-check.test.ts
      judge-schema.test.ts
      aggregate-blinded.test.ts
      preflight.test.ts
    <cycle-dir>/        # generated per run: PACKET.md, key.json, <judge>.json, COUNCIL-REPORT.md (gitignored except baseline)
```

`rubric.ts`, `blinding-check.ts`, `judge-schema.ts`, and `preflight.ts` are pure (no I/O) so they are fully unit-testable. `build-blinded-packet.ts` and `aggregate-blinded.ts` isolate I/O in `main()` and export a pure core (`buildPacket(...)`, `aggregate(...)`) that the tests drive with in-memory data and temp dirs.

---

## Task 1: Per-query engine rows for the packet

**Why:** The blinded packet must show each engine's actual top-10 result list. Plan 1's `run.ts` writes only `scorecard.json` (scores), not the ranked rows. Mirror the academic harness (`run.ts` writes `runs/<label>/queries/<id>.json`) so the packet builder can read our engine's rendered output.

**Files:**
- Modify: `eval/web-search/quality.ts`
- Modify: `eval/web-search/run.ts`
- Test: `eval/web-search/__tests__/quality.test.ts` (extend), `eval/web-search/__tests__/run.test.ts` (extend)

**Interfaces:**
- Consumes: `UnifiedSearchResult` (`@/types/search`), `normalizeDomain` (`@/lib/search/domain-utils`), `CommonRow` (`./types`).
- Produces: `toPacketRows(results: UnifiedSearchResult[]): CommonRow[]` in `quality.ts`; `runFromCache(...)` now also returns `perQuery[].rows: CommonRow[]`; `main()` writes `runs/<label>/queries/<id>.json` = `{ id, tab, query, rows: CommonRow[] }`.

- [ ] **Step 1: Write the failing test (quality)**

Add to `eval/web-search/__tests__/quality.test.ts`:

```ts
import { toPacketRows } from "../quality";

describe("toPacketRows", () => {
  it("maps top-10 unified results to blinding-safe CommonRows (title/url/domain/publishedDate/snippet)", () => {
    const rows = toPacketRows([
      r({ url: "https://www.cdc.gov/flu", title: "Flu update", publishedAt: "2026-06-01", abstract: "snippet text" }),
    ]);
    expect(rows[0]).toEqual({
      title: "Flu update",
      url: "https://www.cdc.gov/flu",
      domain: "cdc.gov",
      publishedDate: "2026-06-01",
      snippet: "snippet text",
    });
  });
  it("caps at 10 rows", () => {
    const many = Array.from({ length: 14 }, (_v, i) => r({ url: `https://a.com/${i}` }));
    expect(toPacketRows(many)).toHaveLength(10);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/__tests__/quality.test.ts`
Expected: FAIL — `toPacketRows` is not exported.

- [ ] **Step 3: Implement `toPacketRows` in `quality.ts`**

Append to `eval/web-search/quality.ts` (keep existing exports unchanged):

```ts
import type { CommonRow } from "./types";

/** Render results into the blinding-safe common row shape the council packet uses. */
export function toPacketRows(results: UnifiedSearchResult[]): CommonRow[] {
  return results.slice(0, 10).map((r) => {
    const domain = r.domain ?? (r.url ? normalizeDomain(r.url) ?? null : null);
    return {
      title: r.title ?? "",
      url: r.url ?? "",
      domain: domain ?? null,
      publishedDate: r.publishedAt ?? (r.year ? String(r.year) : null),
      snippet: r.abstract ?? null,
    };
  });
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/__tests__/quality.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the failing test (run emits per-query rows)**

Add to `eval/web-search/__tests__/run.test.ts` (inside the existing `describe("runFromCache", ...)`):

```ts
  it("returns per-query rows (top-10 engine output) for the packet builder", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wsrun-rows-"));
    const q = BENCHMARK_QUERIES.find((x) => x.id === "news-h5n1-dairy")!;
    writeFileSync(
      join(dir, cacheKey(q.tab, q.query)),
      JSON.stringify({
        tab: q.tab, query: q.query, capturedAt: "FROZEN",
        results: [
          { title: "CDC avian influenza", url: "https://www.cdc.gov/bird-flu", domain: "cdc.gov", publishedAt: "2026-06-10", abstract: "outbreak update", year: 2026, authors: [], journal: "", citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["news"] },
        ],
      }),
    );
    const card = await runFromCache({ cacheDir: dir, label: "test", now: new Date("2026-06-24").getTime() });
    const row = card.perQuery.find((p) => p.id === "news-h5n1-dairy")!;
    expect(row.rows).toBeDefined();
    expect(row.rows[0]).toMatchObject({ url: "https://www.cdc.gov/bird-flu", domain: "cdc.gov", publishedDate: "2026-06-10" });
  });
```

- [ ] **Step 6: Run to verify it fails**

Run: `npx vitest run eval/web-search/__tests__/run.test.ts`
Expected: FAIL — `row.rows` is undefined.

- [ ] **Step 7: Extend `run.ts` to compute and emit per-query rows**

In `eval/web-search/run.ts`:

1. Import `toPacketRows` and `CommonRow`:

```ts
import { applyQualityLayer, toEvalItems, toPacketRows } from "./quality";
import type { WebTab, CommonRow } from "./types";
```

2. Extend the `Scorecard.perQuery` row type to include `rows: CommonRow[]`:

```ts
  perQuery: Array<{ id: string; tab: WebTab; composite: number; pass: boolean; dimensions: Record<DimensionKey, number>; details: string[]; rows: CommonRow[] }>;
```

3. In `runFromCache`, after computing `ranked`, build and push the rows:

```ts
    const ranked = await applyQualityLayer(q.query, pool.results);
    const score = scoreTab(toEvalItems(ranked), q, opts.now);
    perQuery.push({ id: q.id, tab: q.tab, composite: score.composite, pass: score.pass, dimensions: score.dimensions, details: score.details, rows: toPacketRows(ranked) });
```

4. In `main()`, after computing `card`, write one per-query file alongside the scorecard:

```ts
  const card = await runFromCache({ cacheDir: DEFAULT_CACHE, label, now });
  const outDir = join(HERE, "runs", label);
  mkdirSync(join(outDir, "queries"), { recursive: true });
  for (const p of card.perQuery) {
    writeFileSync(
      join(outDir, "queries", `${p.id}.json`),
      JSON.stringify({ id: p.id, tab: p.tab, query: BENCHMARK_QUERIES.find((q) => q.id === p.id)?.query ?? "", rows: p.rows }, null, 2),
    );
  }
  writeFileSync(join(outDir, "scorecard.json"), JSON.stringify(card, null, 2));
```

(`BENCHMARK_QUERIES` is already imported in `run.ts`.)

- [ ] **Step 8: Run to verify it passes**

Run: `npx vitest run eval/web-search/__tests__/run.test.ts eval/web-search/__tests__/quality.test.ts`
Expected: PASS (both files green). Then `npx vitest run eval/web-search` to confirm no cross-file breakage.

- [ ] **Step 9: Commit**

```bash
git add eval/web-search/quality.ts eval/web-search/run.ts eval/web-search/__tests__/quality.test.ts eval/web-search/__tests__/run.test.ts
git commit -m "feat(web-council): emit per-query engine rows for the blinded packet"
```

---

## Task 2: Per-tab rubric + shared web scoring schema

**Files:**
- Create: `eval/web-search/council/rubric.ts`
- Test: `eval/web-search/council/__tests__/rubric.test.ts`

**Interfaces:**
- Consumes: `WebTab` (`../types`).
- Produces: `DIMS: readonly ["relevance","authority","recency","diversity","dedup","usefulness"]`; `type WebDimScores = Record<(typeof DIMS)[number], number>`; `RUBRIC_BY_TAB: Record<WebTab, string>`; `SCORING_PREAMBLE: string`; `OUTPUT_SCHEMA: string`.

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/rubric.test.ts
import { describe, it, expect } from "vitest";
import { DIMS, RUBRIC_BY_TAB, OUTPUT_SCHEMA, SCORING_PREAMBLE } from "../rubric";

describe("rubric", () => {
  it("defines exactly the six objective web dimensions", () => {
    expect([...DIMS]).toEqual(["relevance", "authority", "recency", "diversity", "dedup", "usefulness"]);
  });
  it("has a distinct rubric for each tab that names that tab's emphasis", () => {
    expect(RUBRIC_BY_TAB.news.toLowerCase()).toContain("recency");
    expect(RUBRIC_BY_TAB.discussions.toLowerCase()).toContain("community");
    expect(RUBRIC_BY_TAB.web).not.toBe(RUBRIC_BY_TAB.news);
    expect(RUBRIC_BY_TAB.news).not.toBe(RUBRIC_BY_TAB.discussions);
  });
  it("output schema mentions every dimension and the winner field", () => {
    for (const d of DIMS) expect(OUTPUT_SCHEMA).toContain(d);
    expect(OUTPUT_SCHEMA).toContain("winner");
    expect(SCORING_PREAMBLE.toLowerCase()).toContain("engine a");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/rubric.test.ts`
Expected: FAIL — cannot resolve `../rubric`.

- [ ] **Step 3: Implement `rubric.ts`**

```ts
// eval/web-search/council/rubric.ts
import type { WebTab } from "../types";

/** The six objective, checkable web dimensions (replaces the biomedical rubric). */
export const DIMS = ["relevance", "authority", "recency", "diversity", "dedup", "usefulness"] as const;
export type WebDimScores = Record<(typeof DIMS)[number], number>;

export const SCORING_PREAMBLE = `You are an impartial judge comparing TWO anonymous web-search engines,
**Engine A** and **Engine B**, on the SAME query. You do NOT know which engine is which and must not
guess or speculate about their identity. Judge ONLY the result lists shown (each row is title · domain ·
date · snippet). Use the listed must-have results as the ground-truth relevance anchor.

Score EACH engine 0–5 (5 = best) on these six dimensions:
1. **relevance** — are the on-topic / must-have results present in the top 10; few off-topic items?
2. **authority** — credible sources for this query (official/agency/primary/reputable outlet or a real
   community), not SEO/marketing/content-farm pages.
3. **recency** — is the date-appropriateness right for the query (fresh where freshness matters; not stale)?
4. **diversity** — no single-domain/outlet/platform flood; a healthy spread of sources.
5. **dedup** — no duplicate URLs and no near-duplicate same-wire-story repeats.
6. **usefulness** — would the top 10 actually help a research-adjacent user act on this query?

Then pick a **winner** per query: "A", "B", or "tie".`;

const COMMON_TAIL = `Penalize a missing must-have and penalize off-topic / low-authority items in the top 10.`;

export const RUBRIC_BY_TAB: Record<WebTab, string> = {
  web: `**Tab = web (general).** Weight relevance and authority most. Recency matters little unless the query
implies it. ${COMMON_TAIL}`,
  news: `**Tab = news.** Weight recency highly: prefer recent reporting from real outlets and penalize stale or
undated items; also weight outlet diversity and same-wire-story dedup. ${COMMON_TAIL}`,
  discussions: `**Tab = discussions.** Authority means a REAL community thread (Reddit/HN/StackExchange), not an
SEO Q&A farm; weight platform diversity (don't flood one platform). ${COMMON_TAIL}`,
};

export const OUTPUT_SCHEMA = `## Output format (STRICT)

Return ONLY a JSON object — no prose, no markdown fences — of EXACTLY this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "A": {"relevance":0-5,"authority":0-5,"recency":0-5,"diversity":0-5,"dedup":0-5,"usefulness":0-5},
      "B": {"relevance":0-5,"authority":0-5,"recency":0-5,"diversity":0-5,"dedup":0-5,"usefulness":0-5},
      "winner": "A" | "B" | "tie",
      "note": "<one sentence justification, no identity guessing>"
    }
  ],
  "overall": {"winner":"A"|"B"|"tie","summary":"<2-3 sentences>"}
}`;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/rubric.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/rubric.ts eval/web-search/council/__tests__/rubric.test.ts
git commit -m "feat(web-council): objective per-tab rubric + strict 6-dim web schema"
```

---

## Task 3: Blinded packet builder

**Files:**
- Create: `eval/web-search/council/build-blinded-packet.ts`
- Test: `eval/web-search/council/__tests__/build-blinded-packet.test.ts`

**Interfaces:**
- Consumes: `BENCHMARK_QUERIES` (`../../queries`), `WebTab`/`WebBenchmarkQuery`/`CommonRow`/`ExaFixtureItem` (`../../types`), `RUBRIC_BY_TAB`/`SCORING_PREAMBLE`/`OUTPUT_SCHEMA` (`./rubric`).
- Produces: `oursIsEngineA(salt, id): boolean`; `renderRows(rows: CommonRow[]): string[]`; `type EnginePair = { id: string; tab: WebTab; ours: CommonRow[]; exa: CommonRow[] }`; `buildPacket(opts: { pairs: EnginePair[]; queriesById: Map<string, WebBenchmarkQuery>; salt: string }): { packet: string; key: Record<string, "ours" | "exa"> }`; `main()` (reads `runs/<label>/queries/*.json` + `exa/fixtures.json`, writes `council/<out>/{PACKET.md,key.json}`).

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/build-blinded-packet.test.ts
import { describe, it, expect } from "vitest";
import { oursIsEngineA, renderRows, buildPacket } from "../build-blinded-packet";
import type { EnginePair } from "../build-blinded-packet";
import { BENCHMARK_QUERIES } from "../../queries";
import type { CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: null, snippet: null, ...over });

describe("oursIsEngineA", () => {
  it("is deterministic for a given salt+id and varies across ids", () => {
    expect(oursIsEngineA("s", "abc")).toBe(oursIsEngineA("s", "abc"));
    const flips = BENCHMARK_QUERIES.map((q) => oursIsEngineA("salt", q.id));
    expect(new Set(flips).size).toBe(2); // both A and B occur across the set
  });
});

describe("renderRows", () => {
  it("renders title · domain · date · snippet and marks empty lists", () => {
    expect(renderRows([])).toEqual(["_(no results)_"]);
    const line = renderRows([row({ title: "CDC flu", domain: "cdc.gov", publishedDate: "2026-06-01", snippet: "snip-text" })])[0];
    expect(line).toContain("CDC flu");
    expect(line).toContain("cdc.gov");
    expect(line).toContain("2026-06-01");
    expect(line).toContain("snip-text");
  });
});

describe("buildPacket", () => {
  const q = BENCHMARK_QUERIES.find((x) => x.id === "news-h5n1-dairy")!;
  // Neutral fixture titles ("alpha"/"beta") so the identity-leak assertions below
  // test the BUILDER, not the fixture text. (A real engine name in a title would be
  // fixture noise, not a blinding leak.)
  const pairs: EnginePair[] = [{
    id: q.id, tab: q.tab,
    ours: [row({ title: "alpha-1", domain: "cdc.gov" })],
    exa: [row({ title: "beta-1", domain: "reuters.com" })],
  }];
  const queriesById = new Map(BENCHMARK_QUERIES.map((x) => [x.id, x]));

  it("emits a key mapping each id to which engine is 'A', and a packet that hides identity", () => {
    const { packet, key } = buildPacket({ pairs, queriesById, salt: "t" });
    expect(["ours", "exa"]).toContain(key[q.id]);
    // packet must never name the real engines (the builder emits only "Engine A/B").
    // Word-boundary check for the opponent so ordinary words ("exactly") don't false-positive.
    expect(packet.toLowerCase()).not.toContain("searxng");
    expect(packet).not.toMatch(/\bexa\b/i);
    // packet prints the ground-truth must-haves as the relevance anchor
    expect(packet.toLowerCase()).toContain("must-have");
    // both engines appear under A/B headings
    expect(packet).toContain("Engine A");
    expect(packet).toContain("Engine B");
    // the per-query tab rubric is present
    expect(packet.toLowerCase()).toContain("tab = news");
  });

  it("places ours under the label key says it is", () => {
    const { packet, key } = buildPacket({ pairs, queriesById, salt: "t" });
    const aIdx = packet.indexOf("### Engine A");
    const bIdx = packet.indexOf("### Engine B");
    const oursTitleIdx = packet.indexOf("alpha-1");
    const oursUnderA = oursTitleIdx > aIdx && oursTitleIdx < bIdx;
    expect(oursUnderA).toBe(key[q.id] === "ours");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/build-blinded-packet.test.ts`
Expected: FAIL — cannot resolve `../build-blinded-packet`.

- [ ] **Step 3: Implement `build-blinded-packet.ts`**

```ts
// eval/web-search/council/build-blinded-packet.ts
/**
 * Build a BLINDED LLM-council packet for web/news/discussions: Engine A vs Engine B.
 * BENCHMARK/CALIBRATION ONLY — neither Exa nor any judge is a runtime dependency.
 *
 * Hardening over the academic packet (design spec §6.2):
 *  1. mustHaves printed as the ground-truth relevance anchor.
 *  2. per-tab objective rubric (./rubric).
 *  3. rich rows: title · domain · date · snippet (not bare titles).
 *  4. strong tab-matched Exa opponent (captured in Plan 1).
 * Both engines render in IDENTICAL format; A/B is randomized per query via sha1(salt:id);
 * key.json (withheld from judges) lets the aggregator de-anonymize.
 *
 * Usage:
 *   tsx eval/web-search/council/build-blinded-packet.ts --run <run-label> --out <cycle-dir> [--salt <salt>]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { BENCHMARK_QUERIES } from "../queries";
import type { WebTab, WebBenchmarkQuery, CommonRow, ExaFixtureItem } from "../types";
import { RUBRIC_BY_TAB, SCORING_PREAMBLE, OUTPUT_SCHEMA } from "./rubric";

const HERE = dirname(fileURLToPath(import.meta.url));

export interface EnginePair {
  id: string;
  tab: WebTab;
  ours: CommonRow[];
  exa: CommonRow[];
}

function parseArgs(argv: string[]): { run: string; out: string; salt: string } {
  let run = "baseline";
  let out = "baseline";
  let salt = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--run") run = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--salt") salt = argv[++i];
  }
  return { run, out, salt: salt || out };
}

/** Deterministic per-query coin flip: is OUR engine shown as Engine A for this id? */
export function oursIsEngineA(salt: string, id: string): boolean {
  const h = createHash("sha1").update(`${salt}:${id}`).digest("hex");
  return parseInt(h.slice(0, 8), 16) % 2 === 0;
}

export function renderRows(rows: CommonRow[]): string[] {
  if (rows.length === 0) return ["_(no results)_"];
  return rows.map((r, i) => {
    const date = r.publishedDate ?? "no date";
    const dom = r.domain ?? "no domain";
    const snip = r.snippet ? ` — ${r.snippet.slice(0, 160)}` : "";
    return `${i + 1}. ${r.title || "(untitled)"} · ${dom} · ${date}${snip}`;
  });
}

export function buildPacket(opts: {
  pairs: EnginePair[];
  queriesById: Map<string, WebBenchmarkQuery>;
  salt: string;
}): { packet: string; key: Record<string, "ours" | "exa"> } {
  const sections: string[] = [];
  sections.push("# Blinded LLM-Council packet — Engine A vs Engine B (web/news/discussions)", "");
  sections.push(
    "Two anonymous engines are compared on identical queries. Engine assignment is randomized",
    "per query; you cannot infer identity from position or formatting. Each tab has its own rubric.",
    "",
  );
  sections.push(SCORING_PREAMBLE, "");
  sections.push("### Per-tab rubric", "");
  for (const tab of ["web", "news", "discussions"] as WebTab[]) sections.push(`- ${RUBRIC_BY_TAB[tab]}`, "");
  sections.push(OUTPUT_SCHEMA, "", "---", "");

  const key: Record<string, "ours" | "exa"> = {};
  for (const pair of opts.pairs) {
    const bq = opts.queriesById.get(pair.id);
    if (!bq) continue;
    const oursA = oursIsEngineA(opts.salt, pair.id);
    key[pair.id] = oursA ? "ours" : "exa";
    const engineA = oursA ? pair.ours : pair.exa;
    const engineB = oursA ? pair.exa : pair.ours;

    sections.push(`## Query: \`${pair.id}\` — "${bq.query}"`);
    sections.push(`Tab: ${bq.tab}. Class: ${bq.queryClass}. Intent: ${bq.intent}`);
    sections.push(`_Apply the **Tab = ${bq.tab}** rubric above._`);
    if (bq.recencyBiased) sections.push("_Recency-sensitive: newer high-quality results are better._");
    if (bq.mustHaves?.length) {
      sections.push("", "**Must-have results (ground truth — relevance anchor):**");
      for (const m of bq.mustHaves) sections.push(`- ${m.label}${m.domain ? ` (${m.domain})` : ""}`);
    }
    sections.push("", "### Engine A — top 10");
    sections.push(...renderRows(engineA));
    sections.push("", "### Engine B — top 10");
    sections.push(...renderRows(engineB));
    sections.push("", "---", "");
  }
  return { packet: sections.join("\n"), key };
}

function loadOursRows(runLabel: string, id: string): CommonRow[] {
  const path = join(HERE, "..", "runs", runLabel, "queries", `${id}.json`);
  const data = JSON.parse(readFileSync(path, "utf8")) as { rows: CommonRow[] };
  return data.rows.slice(0, 10);
}

function exaToCommon(items: ExaFixtureItem[]): CommonRow[] {
  return items.slice(0, 10).map((r) => ({
    title: r.title,
    url: r.url,
    domain: r.domain,
    publishedDate: r.publishedDate,
    snippet: r.snippet,
  }));
}

function main() {
  const { run, out, salt } = parseArgs(process.argv.slice(2));
  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "..", "exa", "fixtures.json"), "utf8"),
  ) as Record<string, ExaFixtureItem[]>;

  const pairs: EnginePair[] = [];
  for (const q of BENCHMARK_QUERIES) {
    const exa = fixtures[q.id];
    if (!Array.isArray(exa) || exa.length === 0) continue; // no opponent → skip (fair comparison)
    const oursPath = join(HERE, "..", "runs", run, "queries", `${q.id}.json`);
    if (!existsSync(oursPath)) continue; // no run output → skip
    pairs.push({ id: q.id, tab: q.tab, ours: loadOursRows(run, q.id), exa: exaToCommon(exa) });
  }

  const { packet, key } = buildPacket({ pairs, queriesById, salt });
  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), packet);
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify({ run, salt, generatedFrom: "build-blinded-packet.ts", aIs: key }, null, 2),
  );
  console.log(`[blinded-packet] wrote ${join(outDir, "PACKET.md")} (${pairs.length} queries, run=${run}, salt=${salt})`);
  console.log(`[blinded-packet] wrote ${join(outDir, "key.json")} — KEEP THIS AWAY FROM JUDGES`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/build-blinded-packet.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/build-blinded-packet.ts eval/web-search/council/__tests__/build-blinded-packet.test.ts
git commit -m "feat(web-council): blinded packet builder (rich rows + mustHaves anchor + per-tab rubric)"
```

---

## Task 4: Blinding-integrity / field-parity check

**Why (web-specific, the academic version never needed this):** Exa fixtures almost always carry `publishedDate` and `snippet`; SearXNG rows often do not. If one engine systematically has a field the other lacks, a judge can fingerprint which list is ours — the blinding leaks even though the format is identical. This check measures per-engine field-presence parity and A/B balance, and fails the run if either diverges past a threshold (design spec §6.2 "blinding-integrity check" and §6.3 checklist).

**Files:**
- Create: `eval/web-search/council/blinding-check.ts`
- Test: `eval/web-search/council/__tests__/blinding-check.test.ts`

**Interfaces:**
- Consumes: `EnginePair` (`./build-blinded-packet`).
- Produces: `presenceRate(pairs, engine, field): number`; `checkBlinding(opts: { pairs: EnginePair[]; key: Record<string,"ours"|"exa">; maxFieldGap?: number }): { ok: boolean; reasons: string[]; fieldGap: Record<"domain"|"publishedDate"|"snippet", number>; aShareOurs: number }`.

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/blinding-check.test.ts
import { describe, it, expect } from "vitest";
import { presenceRate, checkBlinding } from "../blinding-check";
import type { EnginePair } from "../build-blinded-packet";
import type { CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: null, snippet: null, ...over });

const pair = (id: string, ours: CommonRow[], exa: CommonRow[]): EnginePair => ({ id, tab: "news", ours, exa });

describe("presenceRate", () => {
  it("is the fraction of rows whose field is non-null", () => {
    const pairs = [pair("a", [row({ snippet: "s" }), row({ snippet: null })], [])];
    expect(presenceRate(pairs, "ours", "snippet")).toBe(0.5);
  });
});

describe("checkBlinding", () => {
  it("passes when both engines carry date+snippet at similar rates and A/B is balanced", () => {
    const pairs = [
      pair("a", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
      pair("b", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
    ];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "exa" } });
    expect(res.ok).toBe(true);
    expect(res.reasons).toEqual([]);
  });

  it("FAILS when one engine always has snippets and the other never does (a fingerprint)", () => {
    const pairs = [
      pair("a", [row({ snippet: "s" })], [row({ snippet: null })]),
      pair("b", [row({ snippet: "s" })], [row({ snippet: null })]),
    ];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "exa" } });
    expect(res.ok).toBe(false);
    expect(res.reasons.join(" ")).toMatch(/snippet/i);
    expect(res.fieldGap.snippet).toBeGreaterThan(0.5);
  });

  it("FAILS when the A/B assignment is lopsided (blinding not randomized)", () => {
    const pairs = [pair("a", [row({})], [row({})]), pair("b", [row({})], [row({})]), pair("c", [row({})], [row({})])];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "ours", c: "ours" } });
    expect(res.ok).toBe(false);
    expect(res.reasons.join(" ")).toMatch(/balance|lopsided/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/blinding-check.test.ts`
Expected: FAIL — cannot resolve `../blinding-check`.

- [ ] **Step 3: Implement `blinding-check.ts`**

```ts
// eval/web-search/council/blinding-check.ts
/**
 * Blinding-integrity guard for the web council. Both engines render in the same
 * format, but a SYSTEMATIC field-presence gap (Exa always has date+snippet,
 * SearXNG often doesn't) lets a judge fingerprint which list is ours. This checks
 * per-engine presence parity for domain/publishedDate/snippet and A/B balance.
 * A council run that fails is discarded, not trusted (design spec §6.3).
 */
import type { EnginePair } from "./build-blinded-packet";

type Field = "domain" | "publishedDate" | "snippet";
const FIELDS: Field[] = ["domain", "publishedDate", "snippet"];

export function presenceRate(pairs: EnginePair[], engine: "ours" | "exa", field: Field): number {
  const rows = pairs.flatMap((p) => p[engine]);
  if (rows.length === 0) return 0;
  const present = rows.filter((r) => r[field] != null && r[field] !== "").length;
  return present / rows.length;
}

export function checkBlinding(opts: {
  pairs: EnginePair[];
  key: Record<string, "ours" | "exa">;
  maxFieldGap?: number;
}): { ok: boolean; reasons: string[]; fieldGap: Record<Field, number>; aShareOurs: number } {
  const maxGap = opts.maxFieldGap ?? 0.4;
  const reasons: string[] = [];

  const fieldGap = {} as Record<Field, number>;
  for (const f of FIELDS) {
    const gap = Math.abs(presenceRate(opts.pairs, "ours", f) - presenceRate(opts.pairs, "exa", f));
    fieldGap[f] = Math.round(gap * 100) / 100;
    if (gap > maxGap) {
      reasons.push(
        `field-presence gap on "${f}" is ${fieldGap[f]} (> ${maxGap}): the two engines are distinguishable by ${f}.`,
      );
    }
  }

  const ids = opts.pairs.map((p) => p.id).filter((id) => opts.key[id]);
  const aShareOurs = ids.length ? ids.filter((id) => opts.key[id] === "ours").length / ids.length : 0;
  if (ids.length >= 3 && (aShareOurs < 0.2 || aShareOurs > 0.8)) {
    reasons.push(`A/B assignment is lopsided: ours is "A" in ${Math.round(aShareOurs * 100)}% of queries (expected ~50%).`);
  }

  return { ok: reasons.length === 0, reasons, fieldGap, aShareOurs: Math.round(aShareOurs * 100) / 100 };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/blinding-check.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/blinding-check.ts eval/web-search/council/__tests__/blinding-check.test.ts
git commit -m "feat(web-council): blinding-integrity field-parity guard (the web fingerprint risk)"
```

---

## Task 5: Judge JSON validator

**Why:** A judge's reply is free text that should be strict JSON. Models occasionally wrap it in ```` ```json ```` fences or add a stray prefix. Parse tolerantly, then validate strictly so a malformed/short reply fails loud instead of silently skewing the tally.

**Files:**
- Create: `eval/web-search/council/judge-schema.ts`
- Test: `eval/web-search/council/__tests__/judge-schema.test.ts`

**Interfaces:**
- Consumes: `DIMS`, `WebDimScores` (`./rubric`).
- Produces: `extractJson(raw: string): unknown`; `type PerQueryVerdict = { id: string; A: WebDimScores; B: WebDimScores; winner: "A"|"B"|"tie"; note?: string }`; `type Verdict = { perQuery: PerQueryVerdict[]; overall: { winner: string; summary: string } }`; `parseVerdict(raw: string): Verdict` (throws with a clear message on malformed input).

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/judge-schema.test.ts
import { describe, it, expect } from "vitest";
import { extractJson, parseVerdict } from "../judge-schema";

const goodScores = { relevance: 4, authority: 5, recency: 3, diversity: 4, dedup: 5, usefulness: 4 };
const good = JSON.stringify({
  perQuery: [{ id: "news-h5n1-dairy", A: goodScores, B: goodScores, winner: "A", note: "ok" }],
  overall: { winner: "A", summary: "A is better." },
});

describe("extractJson", () => {
  it("parses bare JSON", () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
  });
  it("strips ```json fences and surrounding prose", () => {
    expect(extractJson('here:\n```json\n{"a":1}\n```\nthanks')).toEqual({ a: 1 });
  });
});

describe("parseVerdict", () => {
  it("accepts a well-formed verdict", () => {
    const v = parseVerdict(good);
    expect(v.perQuery[0].winner).toBe("A");
    expect(v.overall.winner).toBe("A");
  });
  it("throws on a missing dimension", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: { relevance: 4 }, B: goodScores, winner: "A" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/dimension|relevance|authority/i);
  });
  it("throws on an out-of-range score", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: { ...goodScores, relevance: 9 }, B: goodScores, winner: "A" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/0-5|range/i);
  });
  it("throws on an invalid winner", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: goodScores, B: goodScores, winner: "C" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/winner/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/judge-schema.test.ts`
Expected: FAIL — cannot resolve `../judge-schema`.

- [ ] **Step 3: Implement `judge-schema.ts`**

```ts
// eval/web-search/council/judge-schema.ts
import { DIMS, type WebDimScores } from "./rubric";

export interface PerQueryVerdict {
  id: string;
  A: WebDimScores;
  B: WebDimScores;
  winner: "A" | "B" | "tie";
  note?: string;
}
export interface Verdict {
  perQuery: PerQueryVerdict[];
  overall: { winner: string; summary: string };
}

/** Tolerant JSON extraction: bare JSON, or fenced/prefixed by taking the outermost {...}. */
export function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("judge reply contains no JSON object");
    }
    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function validateScores(s: unknown, where: string): WebDimScores {
  if (typeof s !== "object" || s === null) throw new Error(`${where}: scores must be an object`);
  const obj = s as Record<string, unknown>;
  const out = {} as WebDimScores;
  for (const d of DIMS) {
    const v = obj[d];
    if (typeof v !== "number") throw new Error(`${where}: missing dimension "${d}"`);
    if (v < 0 || v > 5) throw new Error(`${where}: dimension "${d}" out of range 0-5 (got ${v})`);
    out[d] = v;
  }
  return out;
}

export function parseVerdict(raw: string): Verdict {
  const data = extractJson(raw) as Record<string, unknown>;
  if (!Array.isArray(data.perQuery)) throw new Error("verdict.perQuery must be an array");
  const perQuery: PerQueryVerdict[] = data.perQuery.map((q, i) => {
    const row = q as Record<string, unknown>;
    if (typeof row.id !== "string") throw new Error(`perQuery[${i}]: id must be a string`);
    if (row.winner !== "A" && row.winner !== "B" && row.winner !== "tie") {
      throw new Error(`perQuery[${i}] (${row.id}): winner must be "A"|"B"|"tie" (got ${String(row.winner)})`);
    }
    return {
      id: row.id,
      A: validateScores(row.A, `perQuery[${i}].A`),
      B: validateScores(row.B, `perQuery[${i}].B`),
      winner: row.winner,
      note: typeof row.note === "string" ? row.note : undefined,
    };
  });
  const overall = data.overall as Record<string, unknown> | undefined;
  return {
    perQuery,
    overall: {
      winner: typeof overall?.winner === "string" ? overall.winner : "tie",
      summary: typeof overall?.summary === "string" ? overall.summary : "",
    },
  };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/judge-schema.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/judge-schema.ts eval/web-search/council/__tests__/judge-schema.test.ts
git commit -m "feat(web-council): tolerant-parse + strict-validate judge verdict schema"
```

---

## Task 6: Blinded aggregator

**Files:**
- Create: `eval/web-search/council/aggregate-blinded.ts`
- Test: `eval/web-search/council/__tests__/aggregate-blinded.test.ts`

**Interfaces:**
- Consumes: `DIMS` (`./rubric`), `Verdict`/`parseVerdict` (`./judge-schema`), `WebTab`/`WebBenchmarkQuery` (`../../types`), `BENCHMARK_QUERIES` (`../../queries`).
- Produces: `deanon(aIs, winner): "ours"|"exa"|"tie"`; `majority(winners): string`; `aggregate(opts: { key: { aIs: Record<string,"ours"|"exa"> }; verdicts: Record<string, Verdict>; queriesById: Map<string, WebBenchmarkQuery> }): { rows; tally; perTab: Record<WebTab,{beatTie:number;total:number;pct:number}>; pctBeatTie: number }`; `main()` (reads cycle dir's `key.json` + `<judge>.json`, writes `COUNCIL-REPORT.md` + `council-summary.json`).

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/aggregate-blinded.test.ts
import { describe, it, expect } from "vitest";
import { deanon, majority, aggregate } from "../aggregate-blinded";
import type { Verdict } from "../judge-schema";
import { BENCHMARK_QUERIES } from "../../queries";

const sc = { relevance: 4, authority: 4, recency: 4, diversity: 4, dedup: 4, usefulness: 4 };
const verdict = (id: string, winner: "A" | "B" | "tie"): Verdict => ({
  perQuery: [{ id, A: sc, B: sc, winner }],
  overall: { winner, summary: "s" },
});

describe("deanon", () => {
  it("maps blinded A/B back to ours/exa via the key", () => {
    expect(deanon("ours", "A")).toBe("ours");
    expect(deanon("ours", "B")).toBe("exa");
    expect(deanon("exa", "A")).toBe("exa");
    expect(deanon("tie" as never, "tie")).toBe("tie");
  });
});

describe("majority", () => {
  it("returns the plurality winner, tie on a draw", () => {
    expect(majority(["ours", "ours", "exa"])).toBe("ours");
    expect(majority(["ours", "exa"])).toBe("tie");
  });
});

describe("aggregate", () => {
  const id = "news-h5n1-dairy"; // a news-tab query in the seed set
  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  it("de-anonymizes, takes per-query majority, and tallies beat-or-tie per tab", () => {
    // key says ours is 'A'; two judges pick 'A' (=ours), one picks 'B' (=exa) → majority ours.
    const res = aggregate({
      key: { aIs: { [id]: "ours" } },
      verdicts: { opus: verdict(id, "A"), codex: verdict(id, "A"), grok: verdict(id, "B") },
      queriesById,
    });
    const row = res.rows.find((r) => r.id === id)!;
    expect(row.majority).toBe("ours");
    expect(res.tally.ours).toBe(1);
    expect(res.perTab.news.beatTie).toBe(1);
    expect(res.pctBeatTie).toBe(100);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/aggregate-blinded.test.ts`
Expected: FAIL — cannot resolve `../aggregate-blinded`.

- [ ] **Step 3: Implement `aggregate-blinded.ts`**

```ts
// eval/web-search/council/aggregate-blinded.ts
/**
 * Aggregate BLINDED web-council verdicts into a per-tab majority-vote report.
 * Judges voted on anonymous Engine A / B; key.json de-anonymizes to ours/exa.
 * Reports per-query majority, per-tab beat-or-tie %, and the overall beat-or-tie %
 * against the ≥80% stop gate (design spec §9).
 *
 * Usage:
 *   tsx eval/web-search/council/aggregate-blinded.ts --dir <cycle-dir>
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DIMS } from "./rubric";
import { parseVerdict, type Verdict } from "./judge-schema";
import { BENCHMARK_QUERIES } from "../queries";
import type { WebTab, WebBenchmarkQuery } from "../types";

const HERE = dirname(fileURLToPath(import.meta.url));
const JUDGES = ["opus", "codex", "grok", "deepseek", "gemini"] as const;
const TABS: WebTab[] = ["web", "news", "discussions"];

export function deanon(aIs: "ours" | "exa", winner: "A" | "B" | "tie"): "ours" | "exa" | "tie" {
  if (winner === "tie") return "tie";
  if (winner === "A") return aIs;
  return aIs === "ours" ? "exa" : "ours";
}

export function majority(winners: string[]): string {
  const tally: Record<string, number> = {};
  for (const w of winners) tally[w] = (tally[w] ?? 0) + 1;
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "tie";
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return "tie";
  return sorted[0][0];
}

export function aggregate(opts: {
  key: { aIs: Record<string, "ours" | "exa"> };
  verdicts: Record<string, Verdict>;
  queriesById: Map<string, WebBenchmarkQuery>;
}): {
  rows: Array<{ id: string; tab: WebTab; winners: Record<string, string>; majority: string; oursMean: number; exaMean: number }>;
  tally: Record<string, number>;
  perTab: Record<WebTab, { beatTie: number; total: number; pct: number }>;
  pctBeatTie: number;
} {
  const present = Object.keys(opts.verdicts);
  const ids = [...new Set(present.flatMap((j) => opts.verdicts[j].perQuery.map((q) => q.id)))].filter(
    (id) => opts.key.aIs[id] && opts.queriesById.has(id),
  );

  const mean = (ns: number[]) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : 0);

  const rows = ids.map((id) => {
    const aIs = opts.key.aIs[id];
    const tab = opts.queriesById.get(id)!.tab;
    const entries = present
      .map((j) => ({ j, q: opts.verdicts[j].perQuery.find((q) => q.id === id) }))
      .filter((e) => e.q) as { j: string; q: Verdict["perQuery"][number] }[];
    const winners = entries.map((e) => deanon(aIs, e.q.winner));
    const oursScores: number[] = [];
    const exaScores: number[] = [];
    for (const e of entries) {
      const a = DIMS.map((d) => e.q.A[d]);
      const b = DIMS.map((d) => e.q.B[d]);
      if (aIs === "ours") { oursScores.push(...a); exaScores.push(...b); }
      else { oursScores.push(...b); exaScores.push(...a); }
    }
    return {
      id,
      tab,
      winners: Object.fromEntries(entries.map((e) => [e.j, deanon(aIs, e.q.winner)])),
      majority: majority(winners),
      oursMean: Math.round(mean(oursScores) * 100) / 100,
      exaMean: Math.round(mean(exaScores) * 100) / 100,
    };
  });

  const tally = { ours: 0, exa: 0, tie: 0 } as Record<string, number>;
  for (const r of rows) tally[r.majority] = (tally[r.majority] ?? 0) + 1;

  const perTab = {} as Record<WebTab, { beatTie: number; total: number; pct: number }>;
  for (const tab of TABS) {
    const trows = rows.filter((r) => r.tab === tab);
    const beatTie = trows.filter((r) => r.majority === "ours" || r.majority === "tie").length;
    perTab[tab] = { beatTie, total: trows.length, pct: trows.length ? Math.round((beatTie / trows.length) * 100) : 0 };
  }
  const oursBeatTie = tally.ours + tally.tie;
  const pctBeatTie = rows.length ? Math.round((oursBeatTie / rows.length) * 100) : 0;
  return { rows, tally, perTab, pctBeatTie };
}

function main() {
  let dir = "baseline";
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--dir") dir = argv[++i];
  const cycleDir = join(HERE, dir);
  const key = JSON.parse(readFileSync(join(cycleDir, "key.json"), "utf8")) as {
    run: string; salt: string; aIs: Record<string, "ours" | "exa">;
  };

  const verdicts: Record<string, Verdict> = {};
  for (const j of JUDGES) {
    const p = join(cycleDir, `${j}.json`);
    if (!existsSync(p)) continue;
    try {
      verdicts[j] = parseVerdict(readFileSync(p, "utf8"));
    } catch (e) {
      console.error(`[council] skipping malformed ${j}.json: ${e instanceof Error ? e.message : e}`);
    }
  }
  const present = Object.keys(verdicts);
  if (present.length < 3) {
    console.error(`[council] need ≥3 valid judges (got ${present.length}: ${present.join(",") || "none"}). A run with <3 cross-family judges is discarded.`);
    process.exit(1);
  }

  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const { rows, tally, perTab, pctBeatTie } = aggregate({ key, verdicts, queriesById });

  const md: string[] = [];
  md.push("# BLINDED LLM-Council Verdict — Ours vs Exa (web/news/discussions)", "");
  md.push(`Cycle dir: \`${dir}\` · run: \`${key.run}\` · salt: \`${key.salt}\``);
  md.push(`Judges (isolated, blinded A/B): ${present.join(", ")}.`, "");
  md.push("## Per-query majority vote (de-anonymized)", "");
  md.push(`| query | tab | ${present.join(" | ")} | **majority** | ours mean | exa mean |`);
  md.push(`|---|---|${present.map(() => "---").join("|")}|---|---|---|`);
  for (const r of rows) {
    md.push(`| ${r.id} | ${r.tab} | ${present.map((j) => r.winners[j] ?? "—").join(" | ")} | **${r.majority}** | ${r.oursMean} | ${r.exaMean} |`);
  }
  md.push("", "## Per-tab beat-or-tie", "");
  for (const tab of TABS) md.push(`- **${tab}:** ${perTab[tab].beatTie}/${perTab[tab].total} = ${perTab[tab].pct}%`);
  md.push("", "## Overall tally (by per-query majority)", "");
  md.push(`- **Ours wins: ${tally.ours}** · Exa wins: ${tally.exa} · Ties: ${tally.tie}`);
  md.push(`- **Ours beats-or-ties: ${tally.ours + tally.tie}/${rows.length} = ${pctBeatTie}%** (Stop gate ≥ 80%)`, "");
  md.push("## Judge overall summaries (blinded — A/B)", "");
  for (const j of present) md.push(`- **${j}:** winner=${verdicts[j].overall.winner} — ${verdicts[j].overall.summary}`);
  md.push("");

  writeFileSync(join(cycleDir, "COUNCIL-REPORT.md"), md.join("\n"));
  writeFileSync(join(cycleDir, "council-summary.json"), JSON.stringify({ dir, run: key.run, salt: key.salt, judges: present, tally, perTab, pctBeatTie, rows }, null, 2));
  console.log(`[council] dir=${dir} judges=${present.join("+")} → ours ${tally.ours} / exa ${tally.exa} / tie ${tally.tie} · beat-or-tie ${pctBeatTie}%`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/aggregate-blinded.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/aggregate-blinded.ts eval/web-search/council/__tests__/aggregate-blinded.test.ts
git commit -m "feat(web-council): de-anon aggregator with per-tab beat-or-tie + ≥3-judge gate"
```

---

## Task 7: Council-strength preflight (the §6.3 checklist gate)

**Why:** Design spec §6.3 — "Before any council run counts, all must hold … A run failing any of these is discarded, not trusted." Encode the checklist as a function the RUNBOOK runs against a built packet so a weak instrument can't quietly produce a trusted verdict.

**Files:**
- Create: `eval/web-search/council/preflight.ts`
- Test: `eval/web-search/council/__tests__/preflight.test.ts`

**Interfaces:**
- Consumes: `EnginePair` (`./build-blinded-packet`), `checkBlinding` (`./blinding-check`), `WebBenchmarkQuery` (`../../types`).
- Produces: `councilStrengthCheck(opts: { pairs: EnginePair[]; key: Record<string,"ours"|"exa">; queriesById: Map<string, WebBenchmarkQuery>; judgesPresent: string[] }): { ok: boolean; failures: string[]; passes: string[] }`.

- [ ] **Step 1: Write the failing test**

```ts
// eval/web-search/council/__tests__/preflight.test.ts
import { describe, it, expect } from "vitest";
import { councilStrengthCheck } from "../preflight";
import type { EnginePair } from "../build-blinded-packet";
import type { WebBenchmarkQuery, CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: "2026-06-01", snippet: "s", ...over });
const q = (id: string): WebBenchmarkQuery => ({ id, tab: "news", queryClass: "recency", query: "q", intent: "i", recencyBiased: true, mustHaves: [{ label: "m", domain: "cdc.gov", rule: "authority" }] });

function pairs(ids: string[]): EnginePair[] {
  return ids.map((id) => ({ id, tab: "news", ours: [row({})], exa: [row({})] }));
}

describe("councilStrengthCheck", () => {
  const ids = ["a", "b", "c", "d"];
  const queriesById = new Map(ids.map((id) => [id, q(id)]));
  const key = { a: "ours", b: "exa", c: "ours", d: "exa" } as Record<string, "ours" | "exa">;

  it("passes when mustHaves present, rows show date+snippet, ≥3 judges, blinding ok", () => {
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(true);
    expect(res.failures).toEqual([]);
  });

  it("fails with <3 judges", () => {
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById, judgesPresent: ["opus", "codex"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/judge/i);
  });

  it("fails when a query has no mustHaves (ground truth missing)", () => {
    const qb = new Map(queriesById);
    qb.set("a", { ...q("a"), mustHaves: [] });
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById: qb, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/must-have|ground truth/i);
  });

  it("fails when rows lack date+snippet (a fingerprint / poor rows)", () => {
    const bare: EnginePair[] = ids.map((id) => ({ id, tab: "news", ours: [row({ snippet: null, publishedDate: null })], exa: [row({})] }));
    const res = councilStrengthCheck({ pairs: bare, key, queriesById, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/blinding|snippet|date/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run eval/web-search/council/__tests__/preflight.test.ts`
Expected: FAIL — cannot resolve `../preflight`.

- [ ] **Step 3: Implement `preflight.ts`**

```ts
// eval/web-search/council/preflight.ts
/**
 * Council-strength checklist (design spec §6.3). A council run that fails ANY of
 * these is discarded, not trusted. Run against a built packet + the present judges
 * BEFORE aggregating.
 */
import type { EnginePair } from "./build-blinded-packet";
import { checkBlinding } from "./blinding-check";
import type { WebBenchmarkQuery } from "../types";

export function councilStrengthCheck(opts: {
  pairs: EnginePair[];
  key: Record<string, "ours" | "exa">;
  queriesById: Map<string, WebBenchmarkQuery>;
  judgesPresent: string[];
}): { ok: boolean; failures: string[]; passes: string[] } {
  const failures: string[] = [];
  const passes: string[] = [];

  // 1. ground-truth mustHaves present for every compared query
  const missing = opts.pairs.filter((p) => !(opts.queriesById.get(p.id)?.mustHaves?.length));
  if (missing.length) failures.push(`ground-truth must-haves missing for: ${missing.map((p) => p.id).join(", ")}`);
  else passes.push("ground-truth must-haves present for all compared queries");

  // 2. ≥3 cross-family judges
  if (opts.judgesPresent.length < 3) failures.push(`only ${opts.judgesPresent.length} judges present (need ≥3 cross-family)`);
  else passes.push(`${opts.judgesPresent.length} judges present`);

  // 3. packet rows are rich (domain+date+snippet) AND 4. blinding integrity holds (one check covers both)
  const blind = checkBlinding({ pairs: opts.pairs, key: opts.key });
  if (!blind.ok) failures.push(...blind.reasons);
  else passes.push(`blinding integrity ok (field gaps: ${JSON.stringify(blind.fieldGap)}, ours-as-A ${Math.round(blind.aShareOurs * 100)}%)`);

  return { ok: failures.length === 0, failures, passes };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run eval/web-search/council/__tests__/preflight.test.ts`
Expected: PASS. Then run the whole suite: `npx vitest run eval/web-search` (all green).

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/preflight.ts eval/web-search/council/__tests__/preflight.test.ts
git commit -m "feat(web-council): council-strength preflight gate (§6.3 — discard weak runs)"
```

---

## Task 8: OpenRouter judge runner + RUNBOOK + npm scripts + gitignore

**Files:**
- Create: `eval/web-search/council/openrouter-judge.mjs`
- Create: `eval/web-search/council/RUNBOOK.md`
- Create/Modify: `eval/web-search/.gitignore` (ignore generated cycle dirs except the baseline)
- Modify: `package.json` (add `council:web:*` scripts)

**Interfaces:** none (script + docs). The `.mjs` is the same shape as the academic `openrouter-judge.mjs`, with a web-generic instruction; it has no unit test (network I/O) — its JSON output is validated by `judge-schema.ts` (Task 5) downstream.

- [ ] **Step 1: Create the OpenRouter judge runner (web-generic instruction)**

```js
// eval/web-search/council/openrouter-judge.mjs
/**
 * Run ONE blinded web-council judge via OpenRouter (cross-family third seat:
 * Grok → DeepSeek → Gemini). Sends the blinded packet as the user message at
 * temperature 0 and writes the raw reply; aggregate-blinded.ts validates the JSON.
 *
 * Reads OPENROUTER_API_KEY from env (inject via `op-run --`).
 *
 * Usage:
 *   op-run -- node eval/web-search/council/openrouter-judge.mjs \
 *     --model x-ai/grok-4 --packet eval/web-search/council/baseline/PACKET.md \
 *     --out eval/web-search/council/baseline/grok.json
 *   # --list → print available grok/deepseek/gemini model ids and exit
 */
import { readFileSync, writeFileSync } from "node:fs";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
}

const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) {
  console.error("OPENROUTER_API_KEY missing — run via `op-run --`.");
  process.exit(2);
}

const INSTRUCTION =
  "You are an impartial, BLINDED judge in a web-search bake-off. The blinded comparison packet follows. " +
  "It contains a per-tab scoring rubric and a STRICT JSON output format. For EVERY query in the packet, " +
  "apply that query's tab rubric, score Engine A and Engine B 0-5 on the six dimensions (relevance, " +
  "authority, recency, diversity, dedup, usefulness), pick a per-query winner (\"A\"|\"B\"|\"tie\") with a " +
  "one-sentence note, then give an overall winner. You do NOT know which engine is which; do not guess. " +
  "Respond with ONLY the JSON object exactly matching the packet schema (keys \"perQuery\" and \"overall\"). " +
  "No prose, no markdown code fences.";

async function listModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models", { headers: { Authorization: `Bearer ${KEY}` } });
  const data = await res.json();
  console.log((data.data ?? []).map((m) => m.id).filter((id) => /grok|deepseek|gemini/i.test(id)).sort().join("\n"));
}

async function judge() {
  const model = arg("model", "x-ai/grok-4");
  const packetPath = arg("packet");
  const outPath = arg("out");
  if (!packetPath || !outPath) {
    console.error("need --packet and --out");
    process.exit(2);
  }
  const packet = readFileSync(packetPath, "utf8");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 32000,
      messages: [
        { role: "system", content: INSTRUCTION },
        { role: "user", content: packet },
      ],
    }),
  });
  if (!res.ok) {
    console.error(`OpenRouter HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  if (!text) {
    console.error(`empty content; raw: ${JSON.stringify(data).slice(0, 300)}`);
    process.exit(1);
  }
  writeFileSync(outPath, text);
  console.log(`[openrouter-judge] model=${model} wrote ${outPath} (${text.length} chars)`);
}

if (process.argv.includes("--list")) await listModels();
else await judge();
```

- [ ] **Step 2: Add the npm scripts**

In `package.json` `"scripts"`, ADD (keep existing untouched):

```json
"council:web:packet": "npx tsx eval/web-search/council/build-blinded-packet.ts",
"council:web:judge": "node eval/web-search/council/openrouter-judge.mjs",
"council:web:aggregate": "npx tsx eval/web-search/council/aggregate-blinded.ts"
```

- [ ] **Step 3: Ignore generated cycle dirs (keep the baseline)**

Append to `eval/web-search/.gitignore` (the file exists from Plan 1):

```
council/*/
!council/baseline/
!council/__tests__/
```

- [ ] **Step 4: Write the RUNBOOK**

````markdown
// eval/web-search/council/RUNBOOK.md
# Web/News/Discussions Council — Run Procedure

All judge calls run with secrets injected via 1Password (`op-run --`). Never paste keys.
Run exactly ONE council per genuine change (never re-roll). A run that fails the
council-strength checklist is **discarded, not trusted**.

## Prereqs
- Plan-1 baseline done: a scored run exists at `eval/web-search/runs/<run>/queries/*.json`
  and the Exa opponent at `eval/web-search/exa/fixtures.json`.
- `OPENROUTER_API_KEY` (+ `EXA_API_KEY`, `COHERE_API_KEY`) in the `Dev` vault.

## 1. Build the blinded packet
```bash
npx tsx eval/web-search/council/build-blinded-packet.ts --run <run-label> --out <cycle> --salt <cycle>
```
→ writes `council/<cycle>/PACKET.md` (judges see this) + `council/<cycle>/key.json` (judges NEVER see this).

## 2. Run ≥3 cross-family judges, isolated, temp 0 — each writes `<judge>.json`
- **Opus** — dispatch a FRESH Claude Code subagent (no shared context). Give it ONLY `PACKET.md`
  and the judge instruction (score A/B 0-5 on the six dims per the packet's tab rubric, strict JSON).
  Save its JSON to `council/<cycle>/opus.json`.
- **Codex** — run the Codex CLI on `PACKET.md` with the same instruction; save JSON to
  `council/<cycle>/codex.json`.
- **Third (Grok or DeepSeek) via OpenRouter:**
  ```bash
  op-run -- node eval/web-search/council/openrouter-judge.mjs \
    --model x-ai/grok-4 --packet eval/web-search/council/<cycle>/PACKET.md \
    --out eval/web-search/council/<cycle>/grok.json
  ```
  (Use `--list` to see current grok/deepseek/gemini ids; DeepSeek v4 is a valid third seat.)

Each judge must run at `temperature: 0`, fresh context, and must NOT see `key.json` or another
judge's output.

## 3. Aggregate + de-anonymize
```bash
npx tsx eval/web-search/council/aggregate-blinded.ts --dir <cycle>
```
→ writes `council/<cycle>/COUNCIL-REPORT.md` + `council-summary.json`. Refuses to run with <3 valid
judges. Reports per-tab and overall **beat-or-tie %** vs the ≥80% stop gate.

## 4. Council-strength checklist (§6.3) — the run only counts if ALL hold
- ground-truth `mustHaves` present & ratified for every compared query
- per-tab objective rubric loaded (the packet shows a `Tab = …` rubric per query)
- packet rows show domain + date + snippet (blinding-integrity field-parity passes)
- ≥3 cross-family judges at temp 0
- blinding-integrity check passes (judges can't fingerprint ours by field presence)
- opponent captured with strong tab-matched Exa params
- exactly one council per change
`build-blinded-packet.ts` enforces the rubric/rows; `blinding-check.ts` + `preflight.ts` enforce the
integrity gates; `aggregate-blinded.ts` enforces the ≥3-judge gate. A run failing any is discarded.

## Keep/revert gate (design spec §9)
KEEP a change iff deterministic metrics hold-or-improve AND the council holds-or-improves
(beat-or-tie %) AND no mainstream-class regression AND all quality gates pass — else REVERT.
````

- [ ] **Step 5: Commit**

```bash
git add eval/web-search/council/openrouter-judge.mjs eval/web-search/council/RUNBOOK.md eval/web-search/.gitignore package.json
git commit -m "chore(web-council): OpenRouter judge runner + council RUNBOOK + scripts + gitignore"
```

---

## Self-Review

**1. Spec coverage (design §6.2 / §6.3 / §9):**
- Reuse the academic blinded harness verbatim where possible → `build-blinded-packet.ts`, `aggregate-blinded.ts`, `openrouter-judge.mjs` are direct ports (Tasks 3, 6, 8). ✓
- Hardening 1 — mustHaves in the packet → Task 3 (`buildPacket` prints the must-have block). ✓
- Hardening 2 — objective per-tab rubric → Task 2 (`RUBRIC_BY_TAB` + 6 web dims), injected per query in Task 3. ✓
- Hardening 3 — rich rows (domain+date+snippet) → Task 1 (`toPacketRows`) + Task 3 (`renderRows`). ✓
- Hardening 4 — strong tab-matched Exa opponent → captured in Plan 1 (`capture-exa.ts`, tab→category); consumed here in Task 3. ✓ (Perplexity as a 2nd opponent is a documented future extension; the `EnginePair` shape generalizes — out of scope here.)
- Blinding integrity (§6.2 / §6.3) → Task 4 field-parity check + Task 7 preflight gate. ✓ (This is the one piece with no academic source — added because the web has an engine-correlated field-presence fingerprint the biomedical packet didn't.)
- ≥3 cross-family judges, temp 0, isolated, one council per change → Task 8 RUNBOOK + Task 6 ≥3-judge gate + Task 2/8 temp-0 instruction. ✓
- Majority vote, de-anon after scoring, per-tab + overall beat-or-tie vs ≥80% stop gate → Task 6. ✓
- Council-strength checklist "discard, don't trust" → Task 7. ✓
- Keep/revert + cycle loop (§9, §10) → documented in Task 8 RUNBOOK; the CYCLE-0x execution itself is harness-driven, not pre-planned. ✓

**2. Placeholder scan:** No "TBD"/"add error handling"/"similar to". Every code step contains the actual content. The `openrouter-judge.mjs` is a faithful adaptation of the proven academic file, not a stub.

**3. Type consistency:** `CommonRow`/`ExaFixtureItem`/`WebTab`/`WebBenchmarkQuery` come from Plan-1 `types.ts` and are used identically across Tasks 1/3/4/6/7. `DIMS` + `WebDimScores` defined in `rubric.ts` (Task 2) and consumed by `judge-schema.ts` (Task 5) and `aggregate-blinded.ts` (Task 6). `EnginePair` defined in `build-blinded-packet.ts` (Task 3) and consumed by `blinding-check.ts` (Task 4) and `preflight.ts` (Task 7). `Verdict`/`PerQueryVerdict`/`parseVerdict` defined in `judge-schema.ts` (Task 5) and consumed by `aggregate-blinded.ts` (Task 6). `key.aIs` shape (`Record<string,"ours"|"exa">`) is written by Task 3 and read by Tasks 6/7. `deanon(aIs, winner)` signature is consistent. `toPacketRows` (Task 1) feeds the `runs/<label>/queries/<id>.json` shape that Task 3's `loadOursRows` reads.

---

## Execution Handoff

Plan complete and saved. This is **Plan 2 of 2** — it depends on Plan 1's harness (`queries.ts`, `quality.ts`, `run.ts`, `types.ts`, `capture-exa.ts`) being merged and on the human Phase-0 baseline run having produced `runs/<run>/queries/*.json` + `exa/fixtures.json`. Tasks 2/4/5/7 are pure and fully unit-tested; Tasks 1/3/6 isolate I/O behind exported pure cores; Task 8 is the human-run procedure + the OpenRouter seat. After implementation, the first real council is a RUNBOOK step (needs `op-run` keys + the Opus/Codex/OpenRouter judges).

---

## Post-implementation corrections (executed 2026-06-26)

Applied during subagent-driven execution + review; this section keeps the plan honest as a re-runnable artifact.

- **Import paths:** source files under `council/` import sibling-of-`council` modules with one `../` (e.g. `../types`, `../queries`), not `../../`. The code blocks above are authoritative; a few Interfaces *notes* still read `../../types`/`../../queries` — treat those as `../…` for source files (test files under `council/__tests__/` correctly use `../../`).
- **Task 3 blinding tests (corrected above):** the identity-leak assertion uses `not.toMatch(/\bexa\b/i)` (a bare `not.toContain("exa")` false-positives on words like "exactly"); the "ours under the label" test indexes `"### Engine A"`/`"### Engine B"` section headers, not the bare `"Engine A"` which also matches the packet title.
- **Council-strength gate is wired into the builder (final-review must-fix):** `build-blinded-packet.ts` `main()` calls `councilStrengthCheck` (preflight.ts) with the in-memory flat `key` and a `--judges` arg (default `opus,codex,grok`), and REFUSES to write a packet that fails any build-time §6.3 gate (missing ground truth, blinding field-parity fingerprint, lopsided A/B, <3 intended judges, or empty comparison set). `aggregate-blinded.ts` independently enforces the actual ≥3 valid-judge gate. Earlier drafts left these checks defined-but-uninvoked.
