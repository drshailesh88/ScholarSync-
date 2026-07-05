/**
 * Engine-panel pooling for an HONEST, non-tautological gold set.
 *
 * The old eval scored web against Exa alone — but Exa is now also a runtime source, so
 * "web beats Exa" became "you can't lose to yourself". The fix (TREC pooling): gather
 * top-k from a panel of INDEPENDENT engines (Exa neural + Brave index + Tavily), de-dupe
 * by canonical URL, and treat the union as the candidate pool. A doc only Exa found and a
 * doc only Brave found both enter the pool, so the ratified gold set is not blind to what
 * any single engine missed — raw-Exa stops being an automatic win.
 *
 * This produces the CANDIDATE POOL. The next steps: LLM pre-label each doc 0-3, then a
 * human spot-checks/ratifies (IMPROVEMENT-PLAN §6). Run with real keys:
 *   op-run -- npx tsx eval/web-search/pool-panel.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { canonicalUrl } from "./metrics";
import { BENCHMARK_QUERIES } from "./queries";
import { searchExa } from "@/lib/search/sources/exa";
import { searchBrave } from "@/lib/search/sources/brave";
import { searchTavily } from "@/lib/search/sources/tavily";
import type { FederatedTab } from "@/lib/search/web/federate";

export interface PooledDoc {
  /** Canonical URL — the dedup key. */
  url: string;
  title: string;
  /** Which panel engines surfaced this doc (consensus signal for labeling priority). */
  engines: string[];
  /** Best (lowest) rank the doc achieved across engines. */
  bestRank: number;
}

/**
 * Merge per-engine ranked lists into one deduped candidate pool. Docs surfaced by more
 * engines rank first (consensus), then by best rank — the order a labeler works through.
 */
export function poolCandidates(
  perEngine: { engine: string; results: { url?: string; title: string }[] }[]
): PooledDoc[] {
  const byUrl = new Map<string, PooledDoc>();
  for (const { engine, results } of perEngine) {
    results.forEach((r, i) => {
      if (!r.url) return;
      const key = canonicalUrl(r.url);
      const rank = i + 1;
      const existing = byUrl.get(key);
      if (existing) {
        if (!existing.engines.includes(engine)) existing.engines.push(engine);
        existing.bestRank = Math.min(existing.bestRank, rank);
      } else {
        byUrl.set(key, { url: key, title: r.title, engines: [engine], bestRank: rank });
      }
    });
  }
  return [...byUrl.values()].sort(
    (a, b) => b.engines.length - a.engines.length || a.bestRank - b.bestRank
  );
}

async function fetchPanel(
  query: string,
  tab: FederatedTab
): Promise<{ engine: string; results: { url?: string; title: string }[] }[]> {
  const limit = 10;
  const braveOpts =
    tab === "discussions"
      ? { kind: "web" as const, limit, siteFilter: "reddit.com" }
      : { kind: (tab === "news" ? "news" : "web") as "news" | "web", limit };
  const [exa, brave, tavily] = await Promise.all([
    searchExa(query, { tab, limit }).then((r) => r.results).catch(() => []),
    searchBrave(query, braveOpts).then((r) => r.results).catch(() => []),
    searchTavily(query, { maxResults: limit, topic: tab === "news" ? "news" : "general" })
      .then((r) => r.results)
      .catch(() => []),
  ]);
  return [
    { engine: "exa", results: exa },
    { engine: "brave", results: brave },
    { engine: "tavily", results: tavily },
  ];
}

async function main() {
  const outDir = join(process.cwd(), "eval/web-search/gold");
  mkdirSync(outDir, { recursive: true });
  const byTab = new Map<string, unknown[]>();

  for (const q of BENCHMARK_QUERIES) {
    const panel = await fetchPanel(q.query, q.tab);
    const pool = poolCandidates(panel);
    const arr = byTab.get(q.tab) ?? [];
    arr.push({ id: q.id, query: q.query, tab: q.tab, pool });
    byTab.set(q.tab, arr);
    console.log(`[pool] ${q.tab}/${q.id}: ${pool.length} candidates (${panel.map((p) => `${p.engine}:${p.results.length}`).join(" ")})`);
  }

  for (const [tab, rows] of byTab) {
    const file = join(outDir, `pool-${tab}.json`);
    writeFileSync(file, JSON.stringify(rows, null, 2));
    console.log(`[pool] wrote ${rows.length} queries → ${file}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("pool-panel.ts")) {
  main().then(() => process.exit(0)).catch((e) => {
    console.error("[pool] fatal:", e);
    process.exit(1);
  });
}
