/**
 * Offline rescorer — recompute metrics + summaries for an existing run from its
 * saved per-query result artifacts, WITHOUT re-hitting any API. Use after a
 * metric-definition change (e.g. fixing nDCG) to refresh past runs consistently.
 *
 * Usage: tsx eval/literature-search/rescore.ts <label> [<label2> ...]
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import { computeQueryMetrics } from "@/lib/search/eval/metrics";
import { buildSummaryMd, buildSummaryJson, type QueryRun } from "./report";

const HERE = dirname(fileURLToPath(import.meta.url));
const byId = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));

function rescore(label: string): void {
  const dir = join(HERE, "runs", label);
  const qDir = join(dir, "queries");
  if (!existsSync(qDir)) {
    console.error(`[rescore] no queries dir for label "${label}" (${qDir})`);
    return;
  }
  const runs: QueryRun[] = [];
  for (const file of readdirSync(qDir).filter((f) => f.endsWith(".json")).sort()) {
    const run = JSON.parse(readFileSync(join(qDir, file), "utf8")) as QueryRun;
    const bq = byId.get(run.id);
    run.metrics = computeQueryMetrics(run.results, {
      mustHaves: bq?.mustHaves,
      query: run.query,
    });
    runs.push(run);
    writeFileSync(join(qDir, file), JSON.stringify(run, null, 2));
  }
  // Preserve benchmark order.
  runs.sort((a, b) => {
    const ia = BENCHMARK_QUERIES.findIndex((q) => q.id === a.id);
    const ib = BENCHMARK_QUERIES.findIndex((q) => q.id === b.id);
    return ia - ib;
  });
  writeFileSync(
    join(dir, "summary.json"),
    JSON.stringify(buildSummaryJson(label, runs, new Date().toISOString()), null, 2)
  );
  writeFileSync(join(dir, "summary.md"), buildSummaryMd(label, runs));
  console.log(`[rescore] ${label}: rescored ${runs.length} queries → summary.{json,md}`);
}

const labels = process.argv.slice(2);
if (labels.length === 0) {
  console.error("Usage: tsx eval/literature-search/rescore.ts <label> [<label2> ...]");
  process.exit(1);
}
for (const l of labels) rescore(l);
