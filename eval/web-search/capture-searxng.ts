/**
 * Freeze raw SearXNG responses for the benchmark queries into
 * eval/web-search/cache/<tab>-<hash>.json so the deterministic scorer replays
 * them with zero network. Run by hand (needs SEARXNG_URL):
 *   op-run -- npx tsx eval/web-search/capture-searxng.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { searchSearXNG } from "@/lib/search/sources/searxng";
import { BENCHMARK_QUERIES } from "./queries";
import type { WebTab } from "./types";
import type { UnifiedSearchResult } from "@/types/search";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(HERE, "cache");

export const CATEGORY_BY_TAB: Record<WebTab, "general" | "news" | "social media"> = {
  web: "general",
  news: "news",
  discussions: "social media",
};

export function cacheKey(tab: WebTab, query: string): string {
  const hash = createHash("md5").update(`${tab}:${query}`).digest("hex").slice(0, 12);
  return `${tab}-${hash}.json`;
}

export type SearxFn = (
  query: string,
  opts: { category: "general" | "news" | "social media"; limit?: number },
) => Promise<{ results: UnifiedSearchResult[]; total: number; degraded: boolean }>;

export async function captureToCache(
  searchFn: SearxFn,
  queries: typeof BENCHMARK_QUERIES,
  dir: string,
): Promise<number> {
  mkdirSync(dir, { recursive: true });
  let ok = 0;
  for (const q of queries) {
    const resp = await searchFn(q.query, { category: CATEGORY_BY_TAB[q.tab], limit: 30 });
    if (resp.degraded) {
      console.log(`  ✗ ${q.id.padEnd(34)} SearXNG degraded — skipped (do not freeze a degraded pool)`);
      continue;
    }
    const body = { tab: q.tab, query: q.query, capturedAt: "FROZEN", results: resp.results };
    writeFileSync(join(dir, cacheKey(q.tab, q.query)), JSON.stringify(body, null, 2));
    ok++;
    console.log(`  ✓ ${q.id.padEnd(34)} ${resp.results.length} results`);
    await new Promise((r) => setTimeout(r, 800));
  }
  return ok;
}

async function main() {
  const n = await captureToCache(searchSearXNG as unknown as SearxFn, BENCHMARK_QUERIES, CACHE_DIR);
  console.log(`\n[searxng] froze ${n}/${BENCHMARK_QUERIES.length} pools → ${CACHE_DIR}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("[searxng] fatal:", e);
    process.exit(1);
  });
}
