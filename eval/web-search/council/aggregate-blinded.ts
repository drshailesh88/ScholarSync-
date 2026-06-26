// eval/web-search/council/aggregate-blinded.ts
/**
 * Aggregate BLINDED web-council verdicts into a per-tab majority-vote report.
 * Judges voted on anonymous Engine A / B; key.json de-anonymizes to ours/exa.
 * Reports per-query majority, per-tab beat-or-tie %, and the overall beat-or-tie %
 * against the ≥80% stop gate (design spec §9).
 *
 * Usage:
 *   tsx eval/web-search/council/aggregate-blinded.ts --dir <cycle-dir>
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DIMS } from "./rubric";
import { parseVerdict, type Verdict } from "./judge-schema";
import { BENCHMARK_QUERIES } from "../queries";
import type { WebTab, WebBenchmarkQuery } from "../types";

const HERE = dirname(fileURLToPath(import.meta.url));
const JUDGES = ["opus", "codex", "grok", "deepseek", "gemini"] as const;
const TABS: WebTab[] = ["web", "news", "discussions"];

export function deanon(aIs: "ours" | "exa", winner: "A" | "B" | "tie"): "ours" | "exa" | "tie" {
  if (winner === "tie") return "tie";
  if (winner === "A") return aIs;
  return aIs === "ours" ? "exa" : "ours";
}

export function majority(winners: string[]): "ours" | "exa" | "tie" {
  const tally: Record<string, number> = {};
  for (const w of winners) tally[w] = (tally[w] ?? 0) + 1;
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "tie";
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return "tie";
  return sorted[0][0] as "ours" | "exa" | "tie";
}

export function aggregate(opts: {
  key: { aIs: Record<string, "ours" | "exa"> };
  verdicts: Record<string, Verdict>;
  queriesById: Map<string, WebBenchmarkQuery>;
}): {
  rows: Array<{ id: string; tab: WebTab; winners: Record<string, string>; majority: string; oursMean: number; exaMean: number }>;
  tally: Record<string, number>;
  perTab: Record<WebTab, { beatTie: number; total: number; pct: number }>;
  pctBeatTie: number;
} {
  const present = Object.keys(opts.verdicts);
  const ids = [...new Set(present.flatMap((j) => opts.verdicts[j].perQuery.map((q) => q.id)))].filter(
    (id) => opts.key.aIs[id] && opts.queriesById.has(id),
  );

  const mean = (ns: number[]) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : 0);

  const rows = ids.map((id) => {
    const aIs = opts.key.aIs[id];
    const tab = opts.queriesById.get(id)!.tab;
    const entries = present
      .map((j) => ({ j, q: opts.verdicts[j].perQuery.find((q) => q.id === id) }))
      .filter((e) => e.q) as { j: string; q: Verdict["perQuery"][number] }[];
    const voteWinners = entries.map((e) => deanon(aIs, e.q.winner));
    const oursScores: number[] = [];
    const exaScores: number[] = [];
    for (const e of entries) {
      const a = DIMS.map((d) => e.q.A[d]);
      const b = DIMS.map((d) => e.q.B[d]);
      if (aIs === "ours") { oursScores.push(...a); exaScores.push(...b); }
      else { oursScores.push(...b); exaScores.push(...a); }
    }
    return {
      id,
      tab,
      winners: Object.fromEntries(entries.map((e) => [e.j, deanon(aIs, e.q.winner)])),
      majority: majority(voteWinners),
      oursMean: Math.round(mean(oursScores) * 100) / 100,
      exaMean: Math.round(mean(exaScores) * 100) / 100,
    };
  });

  const tally = { ours: 0, exa: 0, tie: 0 } as Record<string, number>;
  for (const r of rows) tally[r.majority] = (tally[r.majority] ?? 0) + 1;

  const perTab = {} as Record<WebTab, { beatTie: number; total: number; pct: number }>;
  for (const tab of TABS) {
    const trows = rows.filter((r) => r.tab === tab);
    const beatTie = trows.filter((r) => r.majority === "ours" || r.majority === "tie").length;
    perTab[tab] = { beatTie, total: trows.length, pct: trows.length ? Math.round((beatTie / trows.length) * 100) : 0 };
  }
  const oursBeatTie = tally.ours + tally.tie;
  const pctBeatTie = rows.length ? Math.round((oursBeatTie / rows.length) * 100) : 0;
  return { rows, tally, perTab, pctBeatTie };
}

function main() {
  let dir = "baseline";
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--dir") dir = argv[++i];
  const cycleDir = join(HERE, dir);
  const key = JSON.parse(readFileSync(join(cycleDir, "key.json"), "utf8")) as {
    run: string; salt: string; aIs: Record<string, "ours" | "exa">;
  };

  const verdicts: Record<string, Verdict> = {};
  for (const j of JUDGES) {
    const p = join(cycleDir, `${j}.json`);
    if (!existsSync(p)) continue;
    try {
      verdicts[j] = parseVerdict(readFileSync(p, "utf8"));
    } catch (e) {
      console.error(`[council] skipping malformed ${j}.json: ${e instanceof Error ? e.message : e}`);
    }
  }
  const present = Object.keys(verdicts);
  if (present.length < 3) {
    console.error(`[council] need ≥3 valid judges (got ${present.length}: ${present.join(",") || "none"}). A run with <3 cross-family judges is discarded.`);
    process.exit(1);
  }

  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const { rows, tally, perTab, pctBeatTie } = aggregate({ key, verdicts, queriesById });

  const md: string[] = [];
  md.push("# BLINDED LLM-Council Verdict — Ours vs Exa (web/news/discussions)", "");
  md.push(`Cycle dir: \`${dir}\` · run: \`${key.run}\` · salt: \`${key.salt}\``);
  md.push(`Judges (isolated, blinded A/B): ${present.join(", ")}.`, "");
  md.push("## Per-query majority vote (de-anonymized)", "");
  md.push(`| query | tab | ${present.join(" | ")} | **majority** | ours mean | exa mean |`);
  md.push(`|---|---|${present.map(() => "---").join("|")}|---|---|---|`);
  for (const r of rows) {
    md.push(`| ${r.id} | ${r.tab} | ${present.map((j) => r.winners[j] ?? "—").join(" | ")} | **${r.majority}** | ${r.oursMean} | ${r.exaMean} |`);
  }
  md.push("", "## Per-tab beat-or-tie", "");
  for (const tab of TABS) md.push(`- **${tab}:** ${perTab[tab].beatTie}/${perTab[tab].total} = ${perTab[tab].pct}%`);
  md.push("", "## Overall tally (by per-query majority)", "");
  md.push(`- **Ours wins: ${tally.ours}** · Exa wins: ${tally.exa} · Ties: ${tally.tie}`);
  md.push(`- **Ours beats-or-ties: ${tally.ours + tally.tie}/${rows.length} = ${pctBeatTie}%** (Stop gate ≥ 80%)`, "");
  md.push("## Judge overall summaries (blinded — A/B)", "");
  for (const j of present) md.push(`- **${j}:** winner=${verdicts[j].overall.winner} — ${verdicts[j].overall.summary}`);
  md.push("");

  writeFileSync(join(cycleDir, "COUNCIL-REPORT.md"), md.join("\n"));
  writeFileSync(join(cycleDir, "council-summary.json"), JSON.stringify({ dir, run: key.run, salt: key.salt, judges: present, tally, perTab, pctBeatTie, rows }, null, 2));
  console.log(`[council] dir=${dir} judges=${present.join("+")} → ours ${tally.ours} / exa ${tally.exa} / tie ${tally.tie} · beat-or-tie ${pctBeatTie}%`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
