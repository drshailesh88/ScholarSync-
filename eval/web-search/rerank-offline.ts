/**
 * Frozen-pool A/B toggle (the CYCLE-04 lesson): re-rank each frozen SearXNG pool
 * WITH and WITHOUT a candidate ranking change and report the score delta. No
 * network — the delta is 100% attributable to `transform`.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { BENCHMARK_QUERIES } from "./queries";
import { cacheKey } from "./capture-searxng";
import { toEvalItems } from "./quality";
import { scoreTab } from "./metrics";
import type { WebTab } from "./types";
import type { UnifiedSearchResult } from "@/types/search";

export type RankTransform = (query: string, results: UnifiedSearchResult[]) => UnifiedSearchResult[];

export async function abToggle(opts: {
  cacheDir: string;
  now: number;
  transform: RankTransform;
}): Promise<Array<{ id: string; tab: WebTab; before: number; after: number; delta: number }>> {
  const rows: Array<{ id: string; tab: WebTab; before: number; after: number; delta: number }> = [];
  for (const q of BENCHMARK_QUERIES) {
    const path = join(opts.cacheDir, cacheKey(q.tab, q.query));
    if (!existsSync(path)) continue;
    const pool = JSON.parse(readFileSync(path, "utf8")) as { results: UnifiedSearchResult[] };
    const before = scoreTab(toEvalItems(pool.results), q, opts.now).composite;
    const after = scoreTab(toEvalItems(opts.transform(q.query, pool.results)), q, opts.now).composite;
    rows.push({ id: q.id, tab: q.tab, before, after, delta: Math.round((after - before) * 10) / 10 });
  }
  return rows;
}
