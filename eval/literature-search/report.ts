/**
 * Shared reporting for the eval harness: the per-query run shape, aggregate
 * computation, and the markdown summary. Used by both the live runner (run.ts)
 * and the offline rescorer (rescore.ts) so metrics stay consistent.
 */

import {
  meanOf,
  type EvalResultItem,
  type QueryMetrics,
} from "@/lib/search/eval/metrics";

export interface QueryRun {
  id: string;
  query: string;
  category: string;
  latencyMs: number;
  error?: string;
  sourceCounts: Record<string, number>;
  zeroSources: string[];
  results: EvalResultItem[];
  metrics: QueryMetrics;
}

export function aggregate(runs: QueryRun[]) {
  const m = runs.map((r) => r.metrics);
  return {
    recallAt10: meanOf(m, (x) => x.recallAt10),
    bestInTop3: meanOf(m, (x) => x.bestInTop3),
    ndcgAt10: meanOf(m, (x) => x.ndcgAt10),
    mrr: meanOf(m, (x) => x.mrr),
    doiFillRate: meanOf(m, (x) => x.doiFillRate),
    pmidFillRate: meanOf(m, (x) => x.pmidFillRate),
    yearFillRate: meanOf(m, (x) => x.yearFillRate),
    journalFillRate: meanOf(m, (x) => x.journalFillRate),
    duplicateRate: meanOf(m, (x) => x.duplicateRate),
    caseReportRateTop10: meanOf(m, (x) => x.caseReportRateTop10),
    lexicalCoverageTop10: meanOf(m, (x) => x.lexicalCoverageTop10),
  };
}

const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);
const num = (v: number | null) => (v === null ? "—" : v.toFixed(2));

export function buildSummaryMd(label: string, runs: QueryRun[]): string {
  const m = runs.map((r) => r.metrics);
  const withGT = runs.filter((r) => r.metrics.recallAt10 !== null);
  const lat = runs.map((r) => r.latencyMs).sort((a, b) => a - b);
  const p50 = lat[Math.floor(lat.length * 0.5)] ?? 0;
  const p95 = lat[Math.floor(lat.length * 0.95)] ?? 0;
  const failures = runs.filter((r) => r.error).length;
  const emptyRuns = runs.filter((r) => !r.error && r.results.length === 0).length;

  const lines: string[] = [];
  lines.push(`# Eval run: \`${label}\``, "");
  lines.push(`Queries: ${runs.length} · with ground-truth must-haves: ${withGT.length}`, "");
  lines.push("## Aggregate", "");
  lines.push("| metric | value |", "|---|---|");
  lines.push(`| recall@10 (must-haves found) | ${pct(meanOf(m, (x) => x.recallAt10))} |`);
  lines.push(`| best-must-have in top 3 | ${pct(meanOf(m, (x) => x.bestInTop3))} |`);
  lines.push(`| nDCG@10 | ${num(meanOf(m, (x) => x.ndcgAt10))} |`);
  lines.push(`| MRR | ${num(meanOf(m, (x) => x.mrr))} |`);
  lines.push(`| DOI fill rate | ${pct(meanOf(m, (x) => x.doiFillRate))} |`);
  lines.push(`| PMID fill rate | ${pct(meanOf(m, (x) => x.pmidFillRate))} |`);
  lines.push(`| year fill rate | ${pct(meanOf(m, (x) => x.yearFillRate))} |`);
  lines.push(`| journal fill rate | ${pct(meanOf(m, (x) => x.journalFillRate))} |`);
  lines.push(`| duplicate rate | ${pct(meanOf(m, (x) => x.duplicateRate))} |`);
  lines.push(`| case-report rate (top 10) | ${pct(meanOf(m, (x) => x.caseReportRateTop10))} |`);
  lines.push(`| lexical coverage (top 10) | ${pct(meanOf(m, (x) => x.lexicalCoverageTop10))} |`);
  lines.push(`| latency p50 / p95 | ${p50}ms / ${p95}ms |`);
  lines.push(`| query errors | ${failures} |`);
  lines.push(`| empty result sets | ${emptyRuns} |`, "");
  lines.push("## Per-query", "");
  lines.push("| id | cat | n | recall@10 | best-rank | nDCG | dups | caseRep | lexCov | DOI | latency |");
  lines.push("|---|---|---|---|---|---|---|---|---|---|---|");
  for (const r of runs) {
    const x = r.metrics;
    lines.push(
      `| ${r.id} | ${r.category} | ${x.count} | ${pct(x.recallAt10)} | ${
        x.bestMustHaveRank ?? "—"
      } | ${num(x.ndcgAt10)} | ${pct(x.duplicateRate)} | ${pct(x.caseReportRateTop10)} | ${pct(
        x.lexicalCoverageTop10
      )} | ${pct(x.doiFillRate)} | ${r.latencyMs}ms |`
    );
  }
  return lines.join("\n");
}

export function buildSummaryJson(label: string, runs: QueryRun[], generatedAt: string) {
  return { label, generatedAt, queryCount: runs.length, aggregate: aggregate(runs), runs };
}

export type { EvalResultItem };
