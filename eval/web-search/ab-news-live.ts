/**
 * Live A/B for the news tab: control (SearXNG + Brave-News) vs treatment
 * (+ NewsData.io), over CURRENTLY-TRENDING queries.
 *
 * Why not the frozen benchmark: NewsData is a recency engine (its free `latest`
 * endpoint covers ~48h), so it returns 0 rows for the benchmark's time-frozen
 * topics and the deterministic harness can't credit it. But 70% of the news
 * composite (authority + recency + diversity + dedup) is scored from the POOL,
 * not from gold must-haves — so on fresh trending queries we can measure
 * NewsData's effect on exactly the dimensions it exists to lift, no gold needed.
 * The 30% relevance term is recall@10 vs an empty gold set → 0 for BOTH arms,
 * so it cancels and the composite delta is attributable to NewsData.
 *
 *   op-run -- env -u MEDCPT_RERANK_URL -u COHERE_API_KEY \
 *     npx tsx eval/web-search/ab-news-live.ts
 */
import { federateWith, SOURCES_BY_TAB } from "@/lib/search/web/federate";
import { applyQualityLayer, toEvalItems } from "./quality";
import { diversifyForTab } from "@/lib/search/diversity";
import { scoreTab, type DimensionKey } from "./metrics";
import type { WebBenchmarkQuery } from "./types";

const TRENDING: string[] = [
  "Federal Reserve interest rate decision",
  "H5N1 bird flu outbreak",
  "artificial intelligence regulation",
  "Ozempic weight loss drug",
  "Israel Gaza ceasefire",
  "Supreme Court ruling",
];

const NOW = Date.now();
const newsSources = SOURCES_BY_TAB.news;
const controlSources = newsSources.filter((s) => s.id !== "newsdata");

async function poolScore(query: string, sources: typeof newsSources) {
  const fed = await federateWith(query, "news", sources, { limit: 30, timeoutMs: 12000 });
  const ranked = await applyQualityLayer(query, fed.results);
  const diversified = diversifyForTab(ranked, "news");
  const q: WebBenchmarkQuery = {
    id: query,
    tab: "news",
    queryClass: "recency",
    query,
    intent: "trending news",
    recencyBiased: true,
    mustHaves: [],
  };
  const score = scoreTab(toEvalItems(diversified), q, NOW);
  const nd = fed.perSource.find((s) => s.id === "newsdata")?.count ?? 0;
  return { composite: score.composite, dims: score.dimensions, nd, n: fed.results.length };
}

function fmtDims(d: Record<DimensionKey, number>): string {
  return `auth=${d.authority.toFixed(1)} rec=${d.recency.toFixed(1)} div=${d.diversity.toFixed(1)} dedup=${d.dedup.toFixed(1)}`;
}

async function main() {
  console.log(`[ab-news] control=searxng+brave-news  treatment=+newsdata  (${TRENDING.length} trending queries)\n`);
  const rows: Array<{ q: string; c: number; t: number; nd: number }> = [];
  for (const query of TRENDING) {
    const control = await poolScore(query, controlSources);
    const treatment = await poolScore(query, newsSources);
    rows.push({ q: query, c: control.composite, t: treatment.composite, nd: treatment.nd });
    const delta = treatment.composite - control.composite;
    console.log(`• ${query}`);
    console.log(`    control   composite=${control.composite.toFixed(2)}  ${fmtDims(control.dims)}  (n=${control.n})`);
    console.log(`    treatment composite=${treatment.composite.toFixed(2)}  ${fmtDims(treatment.dims)}  (n=${treatment.n}, newsdata=${treatment.nd})  Δ=${delta >= 0 ? "+" : ""}${delta.toFixed(2)}`);
  }
  const avgC = rows.reduce((a, b) => a + b.c, 0) / rows.length;
  const avgT = rows.reduce((a, b) => a + b.t, 0) / rows.length;
  const contributed = rows.filter((r) => r.nd > 0).length;
  console.log(`\n[ab-news] avg control=${avgC.toFixed(2)}  avg treatment=${avgT.toFixed(2)}  Δ=${avgT - avgC >= 0 ? "+" : ""}${(avgT - avgC).toFixed(2)}`);
  console.log(`[ab-news] NewsData contributed rows on ${contributed}/${rows.length} queries`);
}

main().catch((e) => {
  console.error("[ab-news] fatal:", e);
  process.exit(1);
});
