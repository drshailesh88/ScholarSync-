/**
 * Federation-aware pool capture (CYCLE 0). Freezes the FUSED multi-source pool
 * for each benchmark query into the same eval/web-search/cache/<tab>-<hash>.json
 * shape run.ts already replays — so the deterministic scorer sees the federated
 * pool, not a single SearXNG category. Each frozen row carries a debug-only
 * `provider` tag (which source(s) contributed it); run.ts/metrics.ts ignore it.
 *
 * Faithful superset: with SearXNG as the only configured provider
 * (`--providers searxng`), the single-source federation passes through
 * unchanged, so re-freezing + run.ts reproduces the SearXNG-only baseline.
 *
 *   SEARXNG_URL=... npx tsx eval/web-search/capture-providers.ts                 # full federation
 *   SEARXNG_URL=... npx tsx eval/web-search/capture-providers.ts --providers searxng  # CYCLE 0 check
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  federateWith,
  SOURCES_BY_TAB,
  searxngSourceForTab,
  type WebSource,
  type FederatedTab,
} from "@/lib/search/web/federate";
import { canonicalUrl } from "@/lib/search/web/canonical-url";
import { BENCHMARK_QUERIES } from "./queries";
import { cacheKey } from "./capture-searxng";
import type { UnifiedSearchResult } from "@/types/search";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(HERE, "cache");

function sourcesForTab(tab: FederatedTab, providerFilter: string | null): WebSource[] {
  // "searxng" alone reproduces the CYCLE-0 single-source baseline (works for tabs
  // like discussions where SearXNG isn't in the default set).
  if (providerFilter === "searxng") return [searxngSourceForTab(tab)];
  // A comma list (e.g. "searxng,brave-news") restricts the tab's default set by
  // source id — used to A/B one source in/out at a fixed capture timestamp.
  if (providerFilter) {
    const ids = new Set(providerFilter.split(",").map((s) => s.trim()));
    const filtered = SOURCES_BY_TAB[tab].filter((s) => ids.has(s.id));
    if (filtered.length) return filtered;
  }
  return SOURCES_BY_TAB[tab];
}

function providerTag(row: UnifiedSearchResult, perSourceRows: Array<{ id: string; results: UnifiedSearchResult[] }>): string {
  const key = row.url ? canonicalUrl(row.url) : `title:${row.title.toLowerCase().trim()}`;
  const ids: string[] = [];
  for (const ps of perSourceRows) {
    const hit = ps.results.some((r) => (r.url ? canonicalUrl(r.url) : `title:${r.title.toLowerCase().trim()}`) === key);
    if (hit) ids.push(ps.id);
  }
  return ids.join("+");
}

export async function captureProviders(
  queries: typeof BENCHMARK_QUERIES,
  dir: string,
  providerFilter: string | null,
  delayMs = 600,
  // GDELT's DOC API runs 10–20s; the offline capture is not latency-sensitive, so
  // give every source a generous ceiling to measure GDELT's quality contribution.
  timeoutMs = 25000
): Promise<number> {
  mkdirSync(dir, { recursive: true });
  let ok = 0;
  for (const q of queries) {
    const sources = sourcesForTab(q.tab, providerFilter);
    const fed = await federateWith(q.query, q.tab, sources, { limit: 30, timeoutMs });
    if (fed.degraded) {
      console.log(`  ✗ ${q.id.padEnd(34)} federation degraded — skipped (do not freeze a degraded pool)`);
      continue;
    }
    const results = fed.results.map((r) => ({ ...r, provider: providerTag(r, fed.perSourceRows) }));
    const body = {
      tab: q.tab,
      query: q.query,
      capturedAt: "FROZEN",
      providers: sources.map((s) => s.id),
      results,
    };
    writeFileSync(join(dir, cacheKey(q.tab, q.query)), JSON.stringify(body, null, 2));
    ok++;
    const counts = fed.perSource.map((s) => `${s.id}:${s.count}`).join(" ");
    console.log(`  ✓ ${q.id.padEnd(34)} ${fed.results.length} fused (${counts})`);
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return ok;
}

async function main() {
  const argv = process.argv.slice(2);
  const pi = argv.indexOf("--providers");
  const providerFilter = pi >= 0 ? argv[pi + 1] : null;
  // --tab <web|news|discussions> re-freezes only that tab's pools, leaving the
  // other frozen pools (e.g. a prior council-validated baseline) untouched.
  const ti = argv.indexOf("--tab");
  const tabFilter = ti >= 0 ? argv[ti + 1] : null;
  const queries = tabFilter
    ? BENCHMARK_QUERIES.filter((q) => q.tab === tabFilter)
    : BENCHMARK_QUERIES;
  const n = await captureProviders(queries, CACHE_DIR, providerFilter);
  console.log(
    `\n[providers] froze ${n}/${queries.length} fused pools → ${CACHE_DIR}` +
      (providerFilter ? ` (providers=${providerFilter})` : "") +
      (tabFilter ? ` (tab=${tabFilter})` : "")
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("[providers] fatal:", e);
    process.exit(1);
  });
}
