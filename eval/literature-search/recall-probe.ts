/**
 * UNFROZEN first-stage recall probe.
 *
 * The frozen 87-query harness (candidate-cache.ts) freezes the candidate pool and
 * only measures RE-RANKING — it can never tell us whether a landmark paper was even
 * RETRIEVED. This probe measures exactly that, with LIVE retrieval (no frozen
 * cache), and attributes each hit to the lane that produced it.
 *
 * For every ground-truth query (those with `mustHaves`), for N runs:
 *   1. Clear the in-process result cache → force a fresh live fan-out (no Redis in
 *      dev/eval, so this guarantees fresh retrieval, beating throttle noise over N).
 *   2. Call runLiteratureSearch({ includeRawCandidates: true }) — `rawCandidates`
 *      is the FULL fused pool BEFORE rankAndAnnotate / study-type / OA filters / paging.
 *   3. For each must-have record: in_pool (anywhere in the fused pool), in_top10
 *      (final ranked page), and source_lane provenance (which lanes retrieved it).
 *
 * Reads the live path but changes NOTHING in it. Run under op-run for API keys:
 *   op-run -- npx tsx eval/literature-search/recall-probe.ts --runs 3 --label unfrozen
 *   op-run -- npx tsx eval/literature-search/recall-probe.ts --only tavr-low-risk-6yr --runs 1
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES, type BenchmarkQuery, type MustHave } from "./queries";
import { runLiteratureSearch } from "@/lib/search/run-search";
import { searchResultCache } from "@/lib/search/result-cache";
import { matchesMustHave, type EvalResultItem } from "@/lib/search/eval/metrics";
import type { UnifiedSearchResult } from "@/types/search";
import type { SourceStatus } from "@/lib/search/source-status";
import {
  aggregateMustHave,
  classifyDenseLiveness,
  summarizeOverall,
  laneAttribution,
  nonOkStatuses,
  type MustHaveRunObservation,
  type MustHaveAggregate,
  type DenseLiveness,
} from "./recall-probe-lib";

const HERE = dirname(fileURLToPath(import.meta.url));

function loadEnv(): void {
  for (const f of [".env.local", ".env"]) {
    try {
      (process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile(
        join(process.cwd(), f)
      );
    } catch {
      /* env file absent — op-run injects secrets, and lanes fail-open without keys */
    }
  }
}

interface CliArgs {
  label: string;
  runs: number;
  only?: string[];
  topK: number;
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { label: "unfrozen", runs: 3, topK: 10 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--label") out.label = argv[++i];
    else if (a === "--runs") out.runs = Math.max(1, parseInt(argv[++i], 10) || 3);
    else if (a === "--only") out.only = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--topK" || a === "--max") out.topK = parseInt(argv[++i], 10) || 10;
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pct = (v: number) => `${Math.round(v * 100)}%`;

function toItem(r: UnifiedSearchResult): EvalResultItem {
  return { title: r.title, doi: r.doi, pmid: r.pmid, year: r.year };
}

function mustHaveKind(m: MustHave): "id" | "title" {
  return (m.pmids?.length || 0) + (m.dois?.length || 0) > 0 ? "id" : "title";
}

/** Lanes in the fused pool that retrieved a specific must-have (dedup). */
function lanesForMustHave(pool: UnifiedSearchResult[], m: MustHave): string[] {
  const lanes = new Set<string>();
  for (const p of pool) {
    if (matchesMustHave(toItem(p), m)) {
      for (const s of p.sources ?? []) lanes.add(s);
    }
  }
  return [...lanes].sort();
}

interface PerRunRecord {
  poolSize: number;
  top10Size: number;
  denseStatus?: SourceStatus;
  denseCount: number;
  nonOk: Array<{ lane: string; status: string; message?: string }>;
  sourceCounts: Record<string, number>;
}

interface MustHaveResult {
  label: string;
  kind: "id" | "title";
  ids: string; // human-readable pmids/dois/titleIncludes
  agg: MustHaveAggregate;
}

interface QueryResult {
  id: string;
  query: string;
  category: string;
  perRun: PerRunRecord[];
  mustHaves: MustHaveResult[];
}

function idsOf(m: MustHave): string {
  const parts: string[] = [];
  if (m.pmids?.length) parts.push(`PMID ${m.pmids.join("/")}`);
  if (m.dois?.length) parts.push(`DOI ${m.dois.join("/")}`);
  if (m.titleIncludes?.length) parts.push(`title~[${m.titleIncludes.join(" | ")}]`);
  return parts.join("; ");
}

async function probeQuery(q: BenchmarkQuery, args: CliArgs): Promise<QueryResult> {
  const perRun: PerRunRecord[] = [];
  // observations[mustHaveIndex] = per-run observations
  const observations: MustHaveRunObservation[][] = (q.mustHaves ?? []).map(() => []);

  for (let run = 0; run < args.runs; run++) {
    // Force a FRESH live fan-out: clear the in-process result cache (no Redis in
    // dev/eval, so this is sufficient to bypass all caching and re-fan-out live).
    searchResultCache._mem.clear();

    let res;
    try {
      res = await runLiteratureSearch({
        query: q.query,
        perPage: args.topK,
        includeRawCandidates: true,
      });
    } catch (err) {
      perRun.push({
        poolSize: 0,
        top10Size: 0,
        denseCount: 0,
        nonOk: [{ lane: "ALL", status: "error", message: err instanceof Error ? err.message : String(err) }],
        sourceCounts: {},
      });
      (q.mustHaves ?? []).forEach((_, i) =>
        observations[i].push({ inPool: false, inTop10: false, lanes: [] })
      );
      continue;
    }

    const pool = res.rawCandidates ?? [];
    const top = res.results ?? [];
    perRun.push({
      poolSize: pool.length,
      top10Size: top.length,
      denseStatus: res.sourceStatuses["medcpt_dense"],
      denseCount: res.sourceCounts["medcpt_dense"] ?? 0,
      nonOk: nonOkStatuses(res.sourceStatuses),
      sourceCounts: res.sourceCounts,
    });

    (q.mustHaves ?? []).forEach((m, i) => {
      const inPool = pool.some((p) => matchesMustHave(toItem(p), m));
      const inTop10 = top.some((r) => matchesMustHave(toItem(r), m));
      observations[i].push({ inPool, inTop10, lanes: lanesForMustHave(pool, m) });
    });

    // Small spacing between runs to let throttled lanes recover between attempts.
    if (run < args.runs - 1) await sleep(1500);
  }

  const mustHaves: MustHaveResult[] = (q.mustHaves ?? []).map((m, i) => ({
    label: m.label,
    kind: mustHaveKind(m),
    ids: idsOf(m),
    agg: aggregateMustHave(observations[i]),
  }));

  return { id: q.id, query: q.query, category: q.category, perRun, mustHaves };
}

function buildReport(results: QueryResult[], args: CliArgs) {
  const allAggs = results.flatMap((r) => r.mustHaves.map((m) => m.agg));
  const overall = summarizeOverall(allAggs);
  const attribution = laneAttribution(allAggs);

  // Dense liveness across every query-run.
  const densePerRun = results.flatMap((r) =>
    r.perRun.map((pr) => ({ status: pr.denseStatus, count: pr.denseCount }))
  );
  const denseLiveness: DenseLiveness = classifyDenseLiveness(densePerRun);
  const denseRunsWithResults = densePerRun.filter((d) => d.count > 0).length;

  const missed = results.flatMap((r) =>
    r.mustHaves
      .filter((m) => m.agg.missedByAllLanes)
      .map((m) => ({ queryId: r.id, query: r.query, label: m.label, kind: m.kind, ids: m.ids }))
  );

  // Ranking-loss: in the pool but NOT reliably surfaced (in_pool > in_top10).
  const rankingLosses = results.flatMap((r) =>
    r.mustHaves
      .filter((m) => m.agg.inPoolRate > 0 && m.agg.inTop10Rate < m.agg.inPoolRate)
      .map((m) => ({
        queryId: r.id,
        label: m.label,
        inPoolRate: m.agg.inPoolRate,
        inTop10Rate: m.agg.inTop10Rate,
        lanes: m.agg.lanesUnion,
      }))
  );

  return {
    meta: {
      label: args.label,
      runs: args.runs,
      topK: args.topK,
      queryCount: results.length,
      generatedAt: new Date().toISOString(),
      note: "UNFROZEN live first-stage recall. rawCandidates = full fused pool BEFORE ranking/filter/paging.",
    },
    overall,
    denseLane: {
      liveness: denseLiveness,
      runsMeasured: densePerRun.length,
      runsWithResults: denseRunsWithResults,
    },
    laneAttribution: attribution,
    missedByAllLanes: missed,
    rankingLosses,
    perQuery: results,
  };
}

function renderSummaryMd(report: ReturnType<typeof buildReport>): string {
  const { overall, denseLane, laneAttribution: attr, missedByAllLanes, rankingLosses, perQuery, meta } =
    report;
  const lines: string[] = [];
  lines.push(`# Unfrozen first-stage recall probe — ${meta.label}`);
  lines.push("");
  lines.push(
    `Live retrieval, ${meta.runs} run(s)/query, top-${meta.topK}. ${meta.queryCount} ground-truth queries, ${overall.mustHaveCount} must-haves.`
  );
  lines.push(`Generated ${meta.generatedAt}.`);
  lines.push("");
  lines.push("## Headline");
  lines.push("");
  lines.push(`- **In pool (retrieval recall):** ${pct(overall.meanInPoolRate)}`);
  lines.push(`- **In top-10 (end-to-end recall):** ${pct(overall.meanInTop10Rate)}`);
  lines.push(
    `- **GAP (retrieval − ranking):** ${pct(overall.gap)}  ← in the pool but not surfaced = a RANKING problem`
  );
  lines.push(
    `- **Missed by ALL lanes (true retrieval failures):** ${overall.missedByAllLanesCount} / ${overall.mustHaveCount}`
  );
  lines.push("");
  const problem =
    overall.missedByAllLanesCount / Math.max(1, overall.mustHaveCount) > overall.gap
      ? "PRIMARILY RETRIEVAL (landmarks never enter the pool)"
      : "PRIMARILY RANKING (landmarks are in the pool but not surfaced)";
  lines.push(`**Conclusion:** the problem is ${problem}.`);
  lines.push("");
  lines.push("## MedCPT dense lane (owned corpus backbone)");
  lines.push("");
  lines.push(`- **Status:** \`${denseLane.liveness}\``);
  lines.push(
    `- Returned results on ${denseLane.runsWithResults} / ${denseLane.runsMeasured} query-runs.`
  );
  if (denseLane.liveness !== "alive") {
    lines.push(
      `- ⚠️  Dense backbone is NOT carrying recall — the pool is effectively lexical-only.`
    );
  }
  lines.push("");
  lines.push("## Per-lane attribution (who carries first-stage recall)");
  lines.push("");
  lines.push(
    `Of ${overall.mustHaveCount - overall.missedByAllLanesCount} must-haves found in the pool:`
  );
  lines.push(`- Found by the **owned dense** corpus (any medcpt_dense lane): ${attr.denseFoundCount}`);
  lines.push(`- Found by **federated APIs** (pubmed/europepmc/scopus/springer/…): ${attr.federatedFoundCount}`);
  lines.push(`- Found by **dense ONLY** (federated missed it): ${attr.foundByDenseOnly}`);
  lines.push(`- Found by **federated ONLY** (dense missed it): ${attr.foundByFederatedOnly}`);
  lines.push("");
  lines.push("| lane | must-haves it retrieved |");
  lines.push("| --- | --- |");
  for (const [lane, count] of Object.entries(attr.perLane).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${lane} | ${count} |`);
  }
  lines.push("");
  lines.push("## Missed by ALL lanes (true first-stage recall failures)");
  lines.push("");
  if (missedByAllLanes.length === 0) {
    lines.push("_None — every must-have was retrieved into the pool on at least one run._");
  } else {
    lines.push("| query | must-have | ground truth | kind |");
    lines.push("| --- | --- | --- | --- |");
    for (const m of missedByAllLanes) {
      lines.push(`| \`${m.queryId}\` | ${m.label} | ${m.ids} | ${m.kind} |`);
    }
  }
  lines.push("");
  lines.push("## Ranking losses (in the pool, not reliably in top-10)");
  lines.push("");
  if (rankingLosses.length === 0) {
    lines.push("_None — every pooled must-have that was retrieved also surfaced in the top-10._");
  } else {
    lines.push("| query | must-have | in_pool | in_top10 | lanes |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const m of rankingLosses) {
      lines.push(
        `| \`${m.queryId}\` | ${m.label} | ${pct(m.inPoolRate)} | ${pct(m.inTop10Rate)} | ${m.lanes.join(", ")} |`
      );
    }
  }
  lines.push("");
  lines.push("## Per-query detail");
  lines.push("");
  lines.push("| query | must-have | in_pool | in_top10 | lane(s) that found it |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const q of perQuery) {
    for (const m of q.mustHaves) {
      const lanes = m.agg.missedByAllLanes ? "**MISSED BY ALL LANES**" : m.agg.lanesUnion.join(", ");
      lines.push(
        `| \`${q.id}\` | ${m.label} | ${pct(m.agg.inPoolRate)} | ${pct(m.agg.inTop10Rate)} | ${lanes} |`
      );
    }
  }
  lines.push("");
  lines.push("## Per-run pool + lane health");
  lines.push("");
  lines.push("| query | run | pool | top10 | dense count | degraded lanes |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const q of perQuery) {
    q.perRun.forEach((pr, i) => {
      const degraded = pr.nonOk.map((n) => `${n.lane}:${n.status}`).join(", ") || "—";
      lines.push(
        `| \`${q.id}\` | ${i + 1} | ${pr.poolSize} | ${pr.top10Size} | ${pr.denseCount} | ${degraded} |`
      );
    });
  }
  lines.push("");
  return lines.join("\n");
}

async function main(): Promise<void> {
  loadEnv();
  const args = parseArgs(process.argv.slice(2));
  const queries = BENCHMARK_QUERIES.filter((q) => q.mustHaves && q.mustHaves.length).filter(
    (q) => !args.only || args.only.includes(q.id)
  );

  console.error(
    `[recall-probe] ${queries.length} ground-truth queries × ${args.runs} run(s), top-${args.topK}`
  );

  const results: QueryResult[] = [];
  for (const q of queries) {
    const started = Date.now();
    const r = await probeQuery(q, args);
    results.push(r);
    const poolAvg =
      r.perRun.reduce((a, pr) => a + pr.poolSize, 0) / Math.max(1, r.perRun.length);
    const inPool = r.mustHaves.filter((m) => m.agg.inPoolRate > 0).length;
    const inTop = r.mustHaves.filter((m) => m.agg.inTop10Rate > 0).length;
    console.error(
      `[recall-probe] ${q.id}: pool~${Math.round(poolAvg)} | must-haves in_pool ${inPool}/${r.mustHaves.length} in_top10 ${inTop}/${r.mustHaves.length} (${Date.now() - started}ms)`
    );
  }

  const report = buildReport(results, args);
  const outDir = join(HERE, "runs", `recall-probe-${args.label}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "report.json"), JSON.stringify(report, null, 2));
  writeFileSync(join(outDir, "summary.md"), renderSummaryMd(report));

  console.error("");
  console.error(`[recall-probe] in_pool ${pct(report.overall.meanInPoolRate)} | in_top10 ${pct(report.overall.meanInTop10Rate)} | gap ${pct(report.overall.gap)}`);
  console.error(`[recall-probe] dense lane: ${report.denseLane.liveness} (${report.denseLane.runsWithResults}/${report.denseLane.runsMeasured} runs with results)`);
  console.error(`[recall-probe] missed by all lanes: ${report.overall.missedByAllLanesCount}`);
  console.error(`[recall-probe] report → ${outDir}`);
}

main().catch((err) => {
  console.error("[recall-probe] fatal:", err);
  process.exit(1);
});
