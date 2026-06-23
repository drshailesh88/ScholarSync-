/**
 * DETERMINISTIC offline rerank over a frozen candidate pool (see
 * capture-candidates.ts). Loads the cached pools and applies the CURRENT ranking
 * code (`rankAndAnnotate`, a pure function) — NO network — so a ranking-stage
 * change can be A/B-ed on the identical pool without live-retrieval noise.
 *
 * Paired A/B (old ranker vs new ranker on the same pool):
 *   git stash                 # park the ranking change
 *   op-run -- npx tsx eval/literature-search/capture-candidates.ts --label pool   # freeze once
 *   npx tsx eval/literature-search/rerank-offline.ts --pool pool --label before
 *   git stash pop             # restore the ranking change
 *   npx tsx eval/literature-search/rerank-offline.ts --pool pool --label after
 *   # compare runs/<pool>/rerank-before.json vs rerank-after.json — any delta is
 *   # 100% attributable to the ranking change (same frozen candidates).
 *
 * Usage:
 *   npx tsx eval/literature-search/rerank-offline.ts --pool pool-A [--label after]
 *   → writes eval/literature-search/runs/<pool>/rerank-<label>.{json,md}
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import { planQuery } from "@/lib/search/query-planner";
import { rankAndAnnotate } from "@/lib/search/pipeline";
import { computeQueryMetrics } from "@/lib/search/eval/metrics";
import type { UnifiedSearchResult } from "@/types/search";
import { buildSummaryMd, buildSummaryJson, type QueryRun } from "./report";

const HERE = dirname(fileURLToPath(import.meta.url));
const byId = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));

function parseArgs(argv: string[]): { pool: string; label: string } {
  let pool = "pool";
  let label = "rerank";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--pool") pool = argv[++i];
    else if (argv[i] === "--label") label = argv[++i];
  }
  return { pool, label };
}

function toEvalItems(results: UnifiedSearchResult[]) {
  return results.map((r) => ({
    title: String(r.title ?? ""),
    doi: r.doi || undefined,
    pmid: r.pmid || undefined,
    year: typeof r.year === "number" ? r.year : undefined,
    journal: r.journal || undefined,
    studyType: r.studyType || undefined,
    abstract: r.abstract || undefined,
  }));
}

function main() {
  const { pool, label } = parseArgs(process.argv.slice(2));
  const dir = join(HERE, "runs", pool, "candidates");
  if (!existsSync(dir)) {
    console.error(`No frozen pools at ${dir}. Run capture-candidates.ts --label ${pool} first.`);
    process.exit(1);
  }
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  const runs: QueryRun[] = [];

  for (const f of files) {
    const cached = JSON.parse(readFileSync(join(dir, f), "utf8")) as {
      id: string;
      query: string;
      recency: boolean;
      candidates: UnifiedSearchResult[];
    };
    const bq = byId.get(cached.id);
    if (!bq) continue;
    const plan = planQuery(cached.query);
    // Re-rank the FROZEN pool with the current code (deterministic).
    const ranked = rankAndAnnotate(cached.candidates, {
      query: cached.query,
      recency: plan.recency,
      isTrialLookup: plan.isTrialLookup,
    });
    const items = toEvalItems(ranked.slice(0, 10));
    runs.push({
      id: cached.id,
      query: cached.query,
      category: bq.category,
      latencyMs: 0,
      sourceCounts: {},
      zeroSources: [],
      results: items,
      metrics: computeQueryMetrics(items, { mustHaves: bq.mustHaves, query: cached.query }),
    });
  }

  runs.sort((a, b) => a.id.localeCompare(b.id));
  const outDir = join(HERE, "runs", pool);
  writeFileSync(
    join(outDir, `rerank-${label}.json`),
    JSON.stringify(buildSummaryJson(`${pool}:${label}`, runs, "offline"), null, 2)
  );
  writeFileSync(join(outDir, `rerank-${label}.md`), buildSummaryMd(`${pool}:${label}`, runs));
  console.log(`[rerank-offline] pool=${pool} label=${label} queries=${runs.length} → ${outDir}/rerank-${label}.{json,md}`);
}

main();
