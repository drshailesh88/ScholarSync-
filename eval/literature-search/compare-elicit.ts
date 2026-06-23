/**
 * Deterministic head-to-head: Manan (a completed run on disk) vs Elicit
 * (captured snapshots). Computes the GROUND-TRUTH metrics (recall@10,
 * best-must-have rank, best-in-top-3, MRR, nDCG@10) and ID fill rates for BOTH
 * engines on every benchmark query that has must-haves, and tallies a
 * deterministic per-query winner by (best-in-top-3, then best-rank, then recall).
 *
 * This is the unbiased numeric baseline that complements the blinded council:
 * it cannot judge semantic relevance, only landmark retrieval & ranking against
 * the verified must-have ground truth.
 *
 * Usage: tsx eval/literature-search/compare-elicit.ts --run <run-label>
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import {
  computeQueryMetrics,
  type EvalResultItem,
} from "@/lib/search/eval/metrics";

const HERE = dirname(fileURLToPath(import.meta.url));

interface ElicitItem {
  rank: number; title: string; year: number | null; venue: string | null;
  doi: string | null; pmid: string | null; citedByCount: number | null;
}

function parseArgs(argv: string[]): { run: string } {
  let run = "phase0-baseline";
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--run") run = argv[++i];
  return { run };
}

function mananItems(id: string, run: string): EvalResultItem[] | null {
  try {
    const p = join(HERE, "runs", run, "queries", `${id}.json`);
    const j = JSON.parse(readFileSync(p, "utf8")) as { results: EvalResultItem[] };
    return j.results.slice(0, 10);
  } catch {
    return null;
  }
}

function elicitItems(items: ElicitItem[]): EvalResultItem[] {
  return items.slice(0, 10).map((r) => ({
    title: r.title,
    doi: r.doi ?? undefined,
    pmid: r.pmid ?? undefined,
    year: r.year ?? undefined,
    journal: r.venue ?? undefined,
  }));
}

const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

function main() {
  const { run } = parseArgs(process.argv.slice(2));
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "elicit", "fixtures.json"), "utf8")
  ) as Record<string, ElicitItem[]>;

  const rows: Array<{
    id: string; cat: string;
    mRecall: number | null; mBest: number | null; mTop3: boolean | null;
    eRecall: number | null; eBest: number | null; eTop3: boolean | null;
    winner: "manan" | "elicit" | "tie";
  }> = [];

  for (const q of BENCHMARK_QUERIES) {
    if (!q.mustHaves?.length) continue; // ground-truth metrics need must-haves
    const m = mananItems(q.id, run);
    const e = fixtures[q.id] ? elicitItems(fixtures[q.id]) : null;
    if (!m || !e) continue;

    const mm = computeQueryMetrics(m, { mustHaves: q.mustHaves, query: q.query });
    const em = computeQueryMetrics(e, { mustHaves: q.mustHaves, query: q.query });

    // Deterministic winner: best-in-top-3 first, then smaller best-rank, then recall.
    let winner: "manan" | "elicit" | "tie" = "tie";
    const mTop3 = mm.bestInTop3 ? 1 : 0;
    const eTop3 = em.bestInTop3 ? 1 : 0;
    if (mTop3 !== eTop3) winner = mTop3 > eTop3 ? "manan" : "elicit";
    else {
      const mb = mm.bestMustHaveRank ?? 99;
      const eb = em.bestMustHaveRank ?? 99;
      if (mb !== eb) winner = mb < eb ? "manan" : "elicit";
      else {
        const mr = mm.recallAt10 ?? 0;
        const er = em.recallAt10 ?? 0;
        winner = mr === er ? "tie" : mr > er ? "manan" : "elicit";
      }
    }

    rows.push({
      id: q.id, cat: q.category,
      mRecall: mm.recallAt10, mBest: mm.bestMustHaveRank, mTop3: mm.bestInTop3,
      eRecall: em.recallAt10, eBest: em.bestMustHaveRank, eTop3: em.bestInTop3,
      winner,
    });
  }

  const tally = { manan: 0, elicit: 0, tie: 0 };
  for (const r of rows) tally[r.winner]++;
  const mTop3Rate = rows.filter((r) => r.mTop3).length / rows.length;
  const eTop3Rate = rows.filter((r) => r.eTop3).length / rows.length;
  const mRecallMean =
    rows.reduce((a, r) => a + (r.mRecall ?? 0), 0) / rows.length;
  const eRecallMean =
    rows.reduce((a, r) => a + (r.eRecall ?? 0), 0) / rows.length;

  const md: string[] = [];
  md.push(`# Deterministic head-to-head — Manan (\`${run}\`) vs Elicit`, "");
  md.push(`Queries with verified must-have ground truth: ${rows.length}`, "");
  md.push("| query | cat | M recall | M best | M top3 | E recall | E best | E top3 | winner |");
  md.push("|---|---|---|---|---|---|---|---|---|");
  for (const r of rows) {
    md.push(
      `| ${r.id} | ${r.cat} | ${pct(r.mRecall)} | ${r.mBest ?? "—"} | ${r.mTop3 ? "✓" : "✗"} | ${pct(
        r.eRecall
      )} | ${r.eBest ?? "—"} | ${r.eTop3 ? "✓" : "✗"} | **${r.winner}** |`
    );
  }
  md.push("");
  md.push("## Tally (deterministic, ground-truth only)", "");
  md.push(`- Manan wins: ${tally.manan} · Elicit wins: ${tally.elicit} · ties: ${tally.tie}`);
  md.push(`- best-in-top-3: Manan ${pct(mTop3Rate)} vs Elicit ${pct(eTop3Rate)}`);
  md.push(`- recall@10 mean: Manan ${pct(mRecallMean)} vs Elicit ${pct(eRecallMean)}`);

  const outPath = join(HERE, "runs", run, "compare-elicit.md");
  writeFileSync(outPath, md.join("\n"));
  console.log(md.join("\n"));
  console.log(`\n[compare] wrote ${outPath}`);
}

main();
