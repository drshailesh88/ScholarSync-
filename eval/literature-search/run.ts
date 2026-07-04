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
import { BENCHMARK_QUERIES, CATEGORY_COUNTS, type MustHave } from "./queries";
import { HELDOUT_QUERIES, HELDOUT_DOMAIN_COUNTS } from "./queries-heldout";
import { searchPapers } from "@/lib/mcp/tools";
import type { SearchSourceId } from "@/lib/search/run-search";
import { computeQueryMetrics, type EvalResultItem } from "@/lib/search/eval/metrics";
import { buildSummaryMd, buildSummaryJson, type QueryRun } from "./report";

/** The minimal shape the runner needs — satisfied by both the clinical training
 * benchmark (queries.ts) and the held-out set (queries-heldout.ts). */
interface EvalQuery {
  id: string;
  query: string;
  category: string;
  mustHaves?: MustHave[];
  domain?: string;
}

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
  sources?: SearchSourceId[];
  heldout: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { label: "", max: 10, heldout: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--label") out.label = argv[++i];
    else if (a === "--only") out.only = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--max") out.max = parseInt(argv[++i], 10) || 10;
    else if (a === "--heldout") out.heldout = true;
    else if (a === "--sources")
      out.sources = argv[++i].split(",").map((s) => s.trim()) as CliArgs["sources"];
  }
  // Default label differs by set so a held-out run never overwrites a training run.
  if (!out.label) out.label = out.heldout ? "heldout" : "run";
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

async function runQuery(q: EvalQuery, args: CliArgs): Promise<QueryRun> {
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

  // Held-out set is measured SEPARATELY — never mixed into the training aggregate.
  const pool: EvalQuery[] = args.heldout ? HELDOUT_QUERIES : BENCHMARK_QUERIES;
  if (args.heldout) {
    const overlap = HELDOUT_QUERIES.filter((q) =>
      BENCHMARK_QUERIES.some((t) => t.id === q.id)
    );
    if (overlap.length) {
      console.error(
        `[eval] FATAL: held-out ids overlap training set: ${overlap.map((o) => o.id).join(", ")}`
      );
      process.exit(1);
    }
  }
  const selected = args.only ? pool.filter((q) => args.only!.includes(q.id)) : pool;

  if (selected.length === 0) {
    console.error("No queries selected. Check --only ids.");
    process.exit(1);
  }

  const outDir = join(HERE, "runs", args.label);
  mkdirSync(join(outDir, "queries"), { recursive: true });

  console.log(
    `[eval] label=${args.label}${args.heldout ? " (HELD-OUT — reported separately)" : ""} ` +
      `queries=${selected.length} max=${args.max} sources=${args.sources?.join("+") ?? "default"}`
  );
  console.log(
    args.heldout
      ? `[eval] domains: ${JSON.stringify(HELDOUT_DOMAIN_COUNTS)}`
      : `[eval] categories: ${JSON.stringify(CATEGORY_COUNTS)}`
  );

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

  // Held-out: also break generalization down BY DOMAIN, since the whole point of
  // this set is to expose where the (clinically-tuned) heuristics have no priors.
  if (args.heldout) {
    const domainOf = new Map(HELDOUT_QUERIES.map((q) => [q.id, q.domain]));
    const byDomain = new Map<string, { recall: number[]; ndcg: number[] }>();
    for (const r of runs) {
      const d = domainOf.get(r.id) ?? "unknown";
      if (!byDomain.has(d)) byDomain.set(d, { recall: [], ndcg: [] });
      const bucket = byDomain.get(d)!;
      if (r.metrics.recallAt10 !== null) bucket.recall.push(r.metrics.recallAt10);
      if (r.metrics.ndcgAt10 !== null) bucket.ndcg.push(r.metrics.ndcgAt10);
    }
    const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
    const perDomain = [...byDomain.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([domain, b]) => ({
        domain,
        queries: b.recall.length,
        recallAt10: avg(b.recall),
        ndcgAt10: avg(b.ndcg),
      }));
    writeFileSync(
      join(outDir, "by-domain.json"),
      JSON.stringify({ label: args.label, perDomain }, null, 2)
    );
    console.log("\n[eval] held-out generalization by domain:");
    for (const d of perDomain) {
      console.log(
        `  ${d.domain.padEnd(18)} n=${String(d.queries).padStart(2)} ` +
          `recall@10=${pct(d.recallAt10).padStart(4)} nDCG@10=${
            d.ndcgAt10 === null ? "—" : d.ndcgAt10.toFixed(2)
          }`
      );
    }
  }
}

main().catch((err) => {
  console.error("[eval] fatal:", err);
  process.exit(1);
});
