/**
 * Literature-search eval runner.
 *
 * Runs the LOCAL Manan search (`@/lib/mcp/tools#searchPapers`) over the
 * benchmark, captures artifacts (raw response + normalized results + per-query
 * metrics), and writes an aggregate summary. Measures *this repo's* code so
 * before/after improvements are comparable. Elicit is captured separately (via
 * MCP) into `eval/literature-search/elicit/` and is never called from here.
 *
 * Usage:
 *   npm run eval:search -- --label baseline
 *   npm run eval:search -- --label improved --only tavr-low-risk-6yr,acronym-partner-3
 *   op-run -- npm run eval:search -- --label improved   # inject API keys (PubMed, Tavily…)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES, CATEGORY_COUNTS, type BenchmarkQuery } from "./queries";
import { searchPapers } from "@/lib/mcp/tools";
import { computeQueryMetrics, type EvalResultItem } from "@/lib/search/eval/metrics";
import { buildSummaryMd, buildSummaryJson, type QueryRun } from "./report";

const HERE = dirname(fileURLToPath(import.meta.url));

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
  max: number;
  sources?: ("pubmed" | "semantic_scholar" | "openalex")[];
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { label: "run", max: 10 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--label") out.label = argv[++i];
    else if (a === "--only") out.only = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--max") out.max = parseInt(argv[++i], 10) || 10;
    else if (a === "--sources")
      out.sources = argv[++i].split(",").map((s) => s.trim()) as CliArgs["sources"];
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

function toEvalItems(results: Array<Record<string, unknown>>): EvalResultItem[] {
  return results.map((r) => ({
    title: String(r.title ?? ""),
    doi: (r.doi as string) || undefined,
    pmid: (r.pmid as string) || undefined,
    year: typeof r.year === "number" ? r.year : undefined,
    journal: (r.journal as string) || undefined,
    studyType: (r.studyType as string) || undefined,
    abstract: (r.abstract as string) || (r.snippet as string) || undefined,
  }));
}

async function runQuery(q: BenchmarkQuery, args: CliArgs): Promise<QueryRun> {
  const started = Date.now();
  try {
    const res = await searchPapers({
      query: q.query,
      maxResults: args.max,
      sources: args.sources,
      includeAbstract: true,
    });
    const latencyMs = Date.now() - started;
    const items = toEvalItems(res.results as unknown as Array<Record<string, unknown>>);
    const requested = args.sources ?? res.sources;
    const zeroSources = requested.filter((s) => (res.sourceCounts?.[s] ?? 0) === 0);
    return {
      id: q.id,
      query: q.query,
      category: q.category,
      latencyMs,
      sourceCounts: res.sourceCounts ?? {},
      zeroSources,
      results: items,
      metrics: computeQueryMetrics(items, { mustHaves: q.mustHaves, query: q.query }),
    };
  } catch (err) {
    return {
      id: q.id,
      query: q.query,
      category: q.category,
      latencyMs: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
      sourceCounts: {},
      zeroSources: [],
      results: [],
      metrics: computeQueryMetrics([], { mustHaves: q.mustHaves, query: q.query }),
    };
  }
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
    `[eval] label=${args.label} queries=${selected.length} max=${args.max} sources=${
      args.sources?.join("+") ?? "default"
    }`
  );
  console.log(`[eval] categories: ${JSON.stringify(CATEGORY_COUNTS)}`);

  const runs: QueryRun[] = [];
  for (const q of selected) {
    const run = await runQuery(q, args);
    runs.push(run);
    writeFileSync(join(outDir, "queries", `${q.id}.json`), JSON.stringify(run, null, 2));
    const r = run.metrics;
    console.log(
      `  ${run.error ? "✗" : "✓"} ${q.id.padEnd(28)} n=${String(r.count).padStart(2)} ` +
        `recall@10=${pct(r.recallAt10).padStart(4)} best=${String(
          r.bestMustHaveRank ?? "—"
        ).padStart(2)} caseRep=${pct(r.caseReportRateTop10).padStart(4)} ${run.latencyMs}ms` +
        (run.zeroSources.length ? ` [0: ${run.zeroSources.join(",")}]` : "") +
        (run.error ? ` ERR: ${run.error}` : "")
    );
    // Pace between queries so a full benchmark does not SELF-throttle the shared
    // OpenAlex/PubMed quota (2-4 OpenAlex calls/query × 87 queries trips the
    // OpenAlex circuit breaker, degrading a whole batch and corrupting the
    // aggregate — observed 14/87 lanes dropped at 700ms). 1500ms lets the
    // OpenAlex token bucket refill and the breaker recover between queries.
    await sleep(1500);
  }

  writeFileSync(
    join(outDir, "summary.json"),
    JSON.stringify(buildSummaryJson(args.label, runs, new Date().toISOString()), null, 2)
  );
  writeFileSync(join(outDir, "summary.md"), buildSummaryMd(args.label, runs));
  console.log(`\n[eval] wrote ${outDir}/summary.{json,md}`);
}

main().catch((err) => {
  console.error("[eval] fatal:", err);
  process.exit(1);
});
