/**
 * Replay frozen SearXNG pools → quality layer → per-tab deterministic score →
 * scorecard. Deterministic (no network) when COHERE_API_KEY is absent; with the
 * key, Cohere rerank is applied (deterministic for a fixed pool).
 *   op-run -- npx tsx eval/web-search/run.ts --label baseline
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import { cacheKey } from "./capture-searxng";
import { applyQualityLayer, toEvalItems } from "./quality";
import { scoreTab, type DimensionKey } from "./metrics";
import type { WebTab } from "./types";
import type { UnifiedSearchResult } from "@/types/search";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_CACHE = join(HERE, "cache");

export interface Scorecard {
  label: string;
  perQuery: Array<{ id: string; tab: WebTab; composite: number; pass: boolean; dimensions: Record<DimensionKey, number>; details: string[] }>;
  tabAverages: Record<WebTab, number>;
  passing: number;
  failing: number;
}

export async function runFromCache(opts: { cacheDir: string; label: string; now: number }): Promise<Scorecard> {
  const perQuery: Scorecard["perQuery"] = [];
  for (const q of BENCHMARK_QUERIES) {
    const path = join(opts.cacheDir, cacheKey(q.tab, q.query));
    if (!existsSync(path)) {
      console.warn(`[run] no frozen pool for ${q.id} — skipped`);
      continue;
    }
    const pool = JSON.parse(readFileSync(path, "utf8")) as { results: UnifiedSearchResult[] };
    const ranked = await applyQualityLayer(q.query, pool.results);
    const score = scoreTab(toEvalItems(ranked), q, opts.now);
    perQuery.push({ id: q.id, tab: q.tab, composite: score.composite, pass: score.pass, dimensions: score.dimensions, details: score.details });
  }

  const tabs: WebTab[] = ["web", "news", "discussions"];
  const tabAverages = Object.fromEntries(
    tabs.map((t) => {
      const rows = perQuery.filter((p) => p.tab === t);
      const avg = rows.length ? rows.reduce((a, b) => a + b.composite, 0) / rows.length : 0;
      return [t, Math.round(avg * 10) / 10];
    }),
  ) as Record<WebTab, number>;

  return {
    label: opts.label,
    perQuery,
    tabAverages,
    passing: perQuery.filter((p) => p.pass).length,
    failing: perQuery.filter((p) => !p.pass).length,
  };
}

async function main() {
  const argv = process.argv.slice(2);
  const li = argv.indexOf("--label");
  const label = li >= 0 ? argv[li + 1] : "baseline";
  // Deterministic clock for reproducible recency scoring; pass via --now <ms> to override.
  const ni = argv.indexOf("--now");
  const now = ni >= 0 ? Number(argv[ni + 1]) : Date.parse("2026-06-24T00:00:00Z");

  const card = await runFromCache({ cacheDir: DEFAULT_CACHE, label, now });
  const outDir = join(HERE, "runs", label);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "scorecard.json"), JSON.stringify(card, null, 2));
  console.log(`[run] label=${label} tabAverages=${JSON.stringify(card.tabAverages)} pass=${card.passing} fail=${card.failing}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("[run] fatal:", e);
    process.exit(1);
  });
}
