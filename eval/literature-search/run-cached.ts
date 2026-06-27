/**
 * Cached literature-search eval — the deterministic, $0-on-repeat harness.
 *
 * For each benchmark query it loads the frozen candidate POOL from the local cache
 * (`eval/literature-search/.cache/candidates/`), or — on a miss/stale/`--refresh`
 * — captures it ONCE from the live search (PubMed/OpenAlex/MedCPT-dense + GPU
 * rerank) and persists it. It then applies the CURRENT ranking code
 * (`rankAndAnnotate`, pure) to the frozen pool and computes metrics. So:
 *   - first run on a fresh cache: spends the API/GPU once, fills the cache;
 *   - every repeat run: reads JSON, re-ranks, scores — no network, no GPU, and
 *     identical pools, so any metric delta is 100% attributable to the ranking
 *     change under test (this is the measurement harness for the ranking work).
 *
 * Usage:
 *   op-run -- npm run eval:search:cached -- --label after            # first time: captures + scores
 *   npm run eval:search:cached -- --label after                     # repeat: $0, deterministic
 *   npm run eval:search:cached -- --label after --only acronym-partner-3,broad-hfref-management
 *   op-run -- npm run eval:search:cached -- --label fresh --refresh # force live re-capture
 *
 * Writes eval/literature-search/runs/<label>/summary.{json,md}.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES, type BenchmarkQuery } from "./queries";
import { runLiteratureSearch } from "@/lib/search/run-search";
import { planQuery } from "@/lib/search/query-planner";
import { rankAndAnnotate } from "@/lib/search/pipeline";
import { computeQueryMetrics } from "@/lib/search/eval/metrics";
import { buildSummaryMd, buildSummaryJson, type QueryRun } from "./report";
import { loadOrCapturePool, type CaptureFn } from "./candidate-cache";
import type { UnifiedSearchResult } from "@/types/search";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(HERE, ".cache", "candidates");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function loadEnv(): void {
  for (const f of [".env.local", ".env"]) {
    try {
      (process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile(
        join(process.cwd(), f)
      );
    } catch {
      /* env file absent — providers fall back to keyless/public access */
    }
  }
}

interface CliArgs {
  label: string;
  only?: string[];
  refresh: boolean;
  ttlDays: number;
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { label: "cached", refresh: false, ttlDays: 30 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--label") out.label = argv[++i];
    else if (a === "--only") out.only = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--refresh") out.refresh = true;
    else if (a === "--ttl-days") out.ttlDays = parseInt(argv[++i], 10) || 30;
  }
  return out;
}

const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

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

/** Live capture of the post-enrichment candidate pool (the expensive path). */
const capture: CaptureFn = async (params) => {
  const res = await runLiteratureSearch({
    query: params.query,
    perPage: 10,
    yearFrom: params.yearFrom,
    yearTo: params.yearTo,
    includeRawCandidates: true,
  });
  return { candidates: res.rawCandidates ?? [], recency: res.plan.recency };
};

/** Rank a FROZEN pool with the current code and score it against ground truth. */
function scorePool(q: BenchmarkQuery, candidates: UnifiedSearchResult[]): QueryRun {
  const plan = planQuery(q.query);
  const ranked = rankAndAnnotate(candidates, {
    query: q.query,
    recency: plan.recency,
    isTrialLookup: plan.isTrialLookup,
  });
  const items = toEvalItems(ranked.slice(0, 10));
  return {
    id: q.id,
    query: q.query,
    category: q.category,
    latencyMs: 0,
    sourceCounts: {},
    zeroSources: candidates.length === 0 ? ["pubmed", "openalex"] : [],
    results: items,
    metrics: computeQueryMetrics(items, { mustHaves: q.mustHaves, query: q.query }),
  };
}

async function main() {
  loadEnv();
  const args = parseArgs(process.argv.slice(2));
  const selected = args.only
    ? BENCHMARK_QUERIES.filter((q) => args.only!.includes(q.id))
    : BENCHMARK_QUERIES;
  if (selected.length === 0) {
    console.error("No queries selected. Check --only ids.");
    process.exit(1);
  }

  const outDir = join(HERE, "runs", args.label);
  mkdirSync(join(outDir, "queries"), { recursive: true });
  console.log(
    `[eval:cached] label=${args.label} queries=${selected.length} cache=${CACHE_DIR}` +
      (args.refresh ? " (refresh)" : "")
  );

  const runs: QueryRun[] = [];
  let hits = 0;
  let fetched = 0;
  for (const q of selected) {
    let candidates: UnifiedSearchResult[] = [];
    try {
      const { entry, fromCache } = await loadOrCapturePool(
        q.id,
        { query: q.query },
        { dir: CACHE_DIR, ttlDays: args.ttlDays, now: () => new Date(), capture, refresh: args.refresh }
      );
      candidates = entry.candidates;
      if (fromCache) hits++;
      else fetched++;
    } catch (e) {
      console.log(`  ✗ ${q.id.padEnd(34)} capture failed: ${e instanceof Error ? e.message : e}`);
    }

    const run = scorePool(q, candidates);
    runs.push(run);
    writeFileSync(join(outDir, "queries", `${q.id}.json`), JSON.stringify(run, null, 2));
    const r = run.metrics;
    const src = candidates.length ? "cache/live" : "EMPTY";
    console.log(
      `  ✓ ${q.id.padEnd(28)} pool=${String(candidates.length).padStart(3)} ` +
        `recall@10=${pct(r.recallAt10).padStart(4)} ndcg@10=${pct(r.ndcgAt10).padStart(4)} ` +
        `best=${String(r.bestMustHaveRank ?? "—").padStart(2)} [${src}]`
    );
    // Only pace when we actually hit the network this iteration.
    if (candidates.length && fetched > hits) await sleep(700);
  }

  // Preserve benchmark order in the summary.
  runs.sort((a, b) => {
    const ia = BENCHMARK_QUERIES.findIndex((q) => q.id === a.id);
    const ib = BENCHMARK_QUERIES.findIndex((q) => q.id === b.id);
    return ia - ib;
  });
  writeFileSync(
    join(outDir, "summary.json"),
    JSON.stringify(buildSummaryJson(args.label, runs, new Date().toISOString()), null, 2)
  );
  writeFileSync(join(outDir, "summary.md"), buildSummaryMd(args.label, runs));
  console.log(
    `\n[eval:cached] ${hits} cache hits, ${fetched} live captures → ${outDir}/summary.{json,md}`
  );
  if (hits > 0) {
    console.log(`[eval:cached] reused ${hits} frozen pools — that many API/GPU fan-outs NOT re-spent.`);
  }
}

main().catch((err) => {
  console.error("[eval:cached] fatal:", err);
  process.exit(1);
});
