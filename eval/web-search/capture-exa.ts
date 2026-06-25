/**
 * Capture Exa snapshots for the benchmark queries → eval/web-search/exa/fixtures.json.
 * BENCHMARK/CALIBRATION ONLY — Exa is never a runtime dependency.
 * Run by hand with the key injected:
 *   op-run -- npx tsx eval/web-search/capture-exa.ts
 *   op-run -- npx tsx eval/web-search/capture-exa.ts --only news-lecanemab-decision
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import type { WebTab, WebBenchmarkQuery, ExaFixtureItem } from "./types";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(HERE, "exa", "fixtures.json");

export interface ExaRawResult {
  title?: string;
  url: string;
  publishedDate?: string | null;
  text?: string | null;
  highlights?: string[];
}
export type ExaSearchFn = (query: string, tab: WebTab) => Promise<{ results: ExaRawResult[] }>;

export function categoryForTab(tab: WebTab): string | undefined {
  if (tab === "news") return "news";
  if (tab === "discussions") return "tweets";
  return undefined; // web = general (no category filter)
}

function domainOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function mapExaResult(raw: ExaRawResult, rank: number): ExaFixtureItem {
  const snippet = raw.text ?? raw.highlights?.join(" ") ?? null;
  return {
    rank,
    title: raw.title ?? "",
    url: raw.url,
    domain: domainOf(raw.url),
    publishedDate: raw.publishedDate ?? null,
    snippet: snippet ? snippet.slice(0, 400) : null,
  };
}

export async function captureAll(
  searchFn: ExaSearchFn,
  queries: WebBenchmarkQuery[],
  delayMs = 1200,
): Promise<Record<string, ExaFixtureItem[]>> {
  const out: Record<string, ExaFixtureItem[]> = {};
  for (const q of queries) {
    try {
      const { results } = await searchFn(q.query, q.tab);
      out[q.id] = results.slice(0, 10).map((r, i) => mapExaResult(r, i + 1));
      console.log(`  ✓ ${q.id.padEnd(34)} ${out[q.id].length} results`);
    } catch (e) {
      console.log(`  ✗ ${q.id.padEnd(34)} ${e instanceof Error ? e.message : e}`);
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return out;
}

async function realExaSearch(query: string, tab: WebTab): Promise<{ results: ExaRawResult[] }> {
  const key = process.env.EXA_API_KEY;
  if (!key) throw new Error("EXA_API_KEY missing — run via `op-run --`.");
  const { default: Exa } = await import("exa-js");
  const exa = new Exa(key);
  const category = categoryForTab(tab);
  const res = await exa.search(query, {
    type: "auto",
    numResults: 10,
    ...(category ? { category } : {}),
    contents: { text: { maxCharacters: 400 } },
  } as Record<string, unknown>);
  return { results: (res.results ?? []) as ExaRawResult[] };
}

async function main() {
  const argv = process.argv.slice(2);
  const onlyIdx = argv.indexOf("--only");
  const onlyVal = argv[onlyIdx + 1];
  const only = onlyIdx >= 0 && onlyVal ? onlyVal.split(",").map((s) => s.trim()) : null;
  const queries = only ? BENCHMARK_QUERIES.filter((q) => only.includes(q.id)) : BENCHMARK_QUERIES;

  const existing = existsSync(FIXTURES)
    ? (JSON.parse(readFileSync(FIXTURES, "utf8")) as Record<string, unknown>)
    : {};
  const captured = await captureAll(realExaSearch, queries);
  const merged = { ...existing, ...captured, _note: "Exa snapshots — benchmark/calibration only; never a runtime dependency." };
  mkdirSync(dirname(FIXTURES), { recursive: true });
  writeFileSync(FIXTURES, JSON.stringify(merged, null, 2));
  console.log(`\n[exa] wrote ${Object.keys(captured).length} fixtures → ${FIXTURES}`);
}

// Only run main() when executed directly, not when imported by tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("[exa] fatal:", e);
    process.exit(1);
  });
}
