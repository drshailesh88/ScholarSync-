/**
 * LIVE-tab off-topic PRECISION capture for the NICHE/BROAD benchmark.
 *
 * WHAT IT MEASURES (and why it is different from every prior council)
 * ------------------------------------------------------------------
 * Prior evals scored landmark RECALL on FROZEN warm candidate pools — never the
 * live tab, never top-of-list precision, never broad/niche "management of X"
 * queries. This script closes all three gaps at once: it runs each
 * `PRECISION_QUERIES` query through the SAME `runLiteratureSearch` the live
 * search tab calls (`src/app/api/research/search/route.ts`), takes the final
 * ranked top-10 the user would actually see, and scores it with the off-topic
 * precision metric (precision@10, top-3 precision, off-topic-intrusion rate).
 *
 * It is the live, end-to-end complement to the unit-tested pure metric — so the
 * "citation-dominant config that aces recall while pulling PRISMA / broad
 * guidelines / wrong-subtype blockbusters to the top of a niche query" failure
 * can no longer hide behind a green recall scorecard.
 *
 * SECRETS: this hits real PubMed / OpenAlex / rerank APIs, so it MUST be run via
 * op-run so keys are injected from the Dev vault (never pasted, never on disk).
 * It is intentionally NOT wired into CI and writes only to the git-ignored
 * `runs/` directory.
 *
 * USAGE (run later, with real keys — NOT during the harness build):
 *
 *   op-run -- npm run eval:search:precision -- --label baseline
 *   op-run -- npm run eval:search:precision -- --label citation-heavy --only prec-hfpef-management,prec-contrast-nephropathy-advances
 *
 * Writes eval/literature-search/runs/precision-<label>/summary.{json,md} plus
 * per-query JSON (the ranked top-10 with each result's on/off-topic label).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runLiteratureSearch } from "@/lib/search/run-search";
import type { UnifiedSearchResult } from "@/types/search";
import type { EvalResultItem } from "@/lib/search/eval/metrics";
import { PRECISION_QUERIES, PRECISION_SPECIALTY_COUNTS, type PrecisionQuery } from "./precision-queries";
import {
  classifyResults,
  computePrecisionMetrics,
  meanPrecision,
  type PrecisionMetrics,
} from "./precision-metric";

const HERE = dirname(fileURLToPath(import.meta.url));
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

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
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { label: "baseline" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--label") out.label = argv[++i];
    else if (a === "--only") out.only = argv[++i].split(",").map((s) => s.trim());
  }
  return out;
}

function toEvalItems(results: UnifiedSearchResult[]): EvalResultItem[] {
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

interface PrecisionRun {
  id: string;
  query: string;
  specialty: string;
  latencyMs: number;
  error?: string;
  sourceCounts: Record<string, number>;
  results: Array<EvalResultItem & { label: string; intruder?: string }>;
  metrics: PrecisionMetrics;
}

async function runQuery(q: PrecisionQuery): Promise<PrecisionRun> {
  const started = Date.now();
  try {
    // Same call the live tab makes (see api/research/search/route.ts) — the
    // FINAL ranked `.results`, not the raw candidate pool.
    const res = await runLiteratureSearch({ query: q.query, perPage: 10 });
    const latencyMs = Date.now() - started;
    const items = toEvalItems(res.results.slice(0, 10));
    const labels = classifyResults(items, q, 10);
    return {
      id: q.id,
      query: q.query,
      specialty: q.specialty,
      latencyMs,
      sourceCounts: res.sourceCounts ?? {},
      results: items.map((item, i) => ({
        ...item,
        label: labels[i].label,
        ...(labels[i].intruder ? { intruder: labels[i].intruder } : {}),
      })),
      metrics: computePrecisionMetrics(items, q, 10),
    };
  } catch (err) {
    return {
      id: q.id,
      query: q.query,
      specialty: q.specialty,
      latencyMs: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
      sourceCounts: {},
      results: [],
      metrics: computePrecisionMetrics([], q, 10),
    };
  }
}

function buildSummaryMd(label: string, runs: PrecisionRun[]): string {
  const m = runs.map((r) => r.metrics);
  const lines: string[] = [];
  lines.push(`# Precision eval: \`${label}\``, "");
  lines.push(`Niche/broad queries: ${runs.length} · specialties: ${Object.keys(PRECISION_SPECIALTY_COUNTS).length}`, "");
  lines.push("## Aggregate (top-of-list precision — the recall-blind failure class)", "");
  lines.push("| metric | value |", "|---|---|");
  lines.push(`| precision@10 (on-topic share) | ${pct(meanPrecision(m, (x) => x.precisionAtK))} |`);
  lines.push(`| precision@3 (top-of-list) | ${pct(meanPrecision(m, (x) => x.precisionAt3))} |`);
  lines.push(`| off-topic intrusion rate | ${pct(meanPrecision(m, (x) => x.offTopicIntrusionRate))} |`);
  lines.push(`| labeled precision (on / on+off) | ${pct(meanPrecision(m, (x) => x.labeledPrecision))} |`);
  lines.push(
    `| queries with a top-3 intrusion | ${runs.filter((r) => r.metrics.firstIntruderRank !== null && r.metrics.firstIntruderRank <= 3).length}/${runs.length} |`,
    ""
  );
  lines.push("## Per-query", "");
  lines.push("| id | specialty | n | P@10 | P@3 | intrusion | 1st-intruder-rank | top intruders |");
  lines.push("|---|---|---|---|---|---|---|---|");
  for (const r of runs) {
    const x = r.metrics;
    const intruders = x.intruders.map((i) => `#${i.rank} ${i.label}`).join("; ") || "—";
    lines.push(
      `| ${r.id} | ${r.specialty} | ${x.count} | ${pct(x.precisionAtK)} | ${pct(x.precisionAt3)} | ${pct(
        x.offTopicIntrusionRate
      )} | ${x.firstIntruderRank ?? "—"} | ${intruders} |${r.error ? ` ERR: ${r.error}` : ""}`
    );
  }
  return lines.join("\n");
}

async function main() {
  loadEnv();
  const args = parseArgs(process.argv.slice(2));
  const selected = args.only
    ? PRECISION_QUERIES.filter((q) => args.only!.includes(q.id))
    : PRECISION_QUERIES;
  if (selected.length === 0) {
    console.error("No queries selected. Check --only ids.");
    process.exit(1);
  }

  const outDir = join(HERE, "runs", `precision-${args.label}`);
  mkdirSync(join(outDir, "queries"), { recursive: true });
  console.log(
    `[precision] label=${args.label} queries=${selected.length} (LIVE runLiteratureSearch — real APIs)`
  );
  console.log(`[precision] specialties: ${JSON.stringify(PRECISION_SPECIALTY_COUNTS)}`);

  const runs: PrecisionRun[] = [];
  for (const q of selected) {
    const run = await runQuery(q);
    runs.push(run);
    writeFileSync(join(outDir, "queries", `${q.id}.json`), JSON.stringify(run, null, 2));
    const x = run.metrics;
    console.log(
      `  ${run.error ? "✗" : "✓"} ${q.id.padEnd(36)} n=${String(x.count).padStart(2)} ` +
        `P@10=${pct(x.precisionAtK).padStart(4)} P@3=${pct(x.precisionAt3).padStart(4)} ` +
        `intrusion=${pct(x.offTopicIntrusionRate).padStart(4)} 1st=${String(
          x.firstIntruderRank ?? "—"
        ).padStart(2)}` +
        (run.error ? ` ERR: ${run.error}` : "")
    );
    // Pace between live queries so the shared OpenAlex/PubMed quota recovers
    // (mirrors run.ts: a tight fan-out trips the OpenAlex circuit breaker).
    await sleep(1500);
  }

  writeFileSync(
    join(outDir, "summary.json"),
    JSON.stringify(
      {
        label: args.label,
        generatedAt: new Date().toISOString(),
        queryCount: runs.length,
        aggregate: {
          precisionAt10: meanPrecision(runs.map((r) => r.metrics), (x) => x.precisionAtK),
          precisionAt3: meanPrecision(runs.map((r) => r.metrics), (x) => x.precisionAt3),
          offTopicIntrusionRate: meanPrecision(
            runs.map((r) => r.metrics),
            (x) => x.offTopicIntrusionRate
          ),
          labeledPrecision: meanPrecision(runs.map((r) => r.metrics), (x) => x.labeledPrecision),
        },
        runs,
      },
      null,
      2
    )
  );
  writeFileSync(join(outDir, "summary.md"), buildSummaryMd(args.label, runs));
  console.log(`\n[precision] wrote ${outDir}/summary.{json,md}`);
}

main().catch((err) => {
  console.error("[precision] fatal:", err);
  process.exit(1);
});
