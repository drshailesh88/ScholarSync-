/**
 * Aggregate WEB-COUNCIL-2 (A/B news council) verdicts. Reuses the proven
 * de-anon/majority/tally from aggregate-blinded.ts, but keyed on this council's
 * own trending queries (queries.json) rather than BENCHMARK_QUERIES.
 * "ours" = with-NewsData (treatment); "exa" = without-NewsData (control).
 *
 *   tsx eval/web-search/council/aggregate-ab-news.ts --dir WEB-COUNCIL-2
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { aggregate } from "./aggregate-blinded";
import { parseVerdict, type Verdict } from "./judge-schema";
import type { WebBenchmarkQuery } from "../types";

const HERE = dirname(fileURLToPath(import.meta.url));
const JUDGES = ["opus", "codex", "deepseek", "grok", "gemini"];

function main() {
  const di = process.argv.indexOf("--dir");
  const dir = di >= 0 ? process.argv[di + 1] : "WEB-COUNCIL-2";
  const root = join(HERE, dir);

  const key = JSON.parse(readFileSync(join(root, "key.json"), "utf8")) as {
    salt: string;
    legend?: Record<string, string>;
    aIs: Record<string, "ours" | "exa">;
  };
  const queries = JSON.parse(readFileSync(join(root, "queries.json"), "utf8")) as WebBenchmarkQuery[];
  const queriesById = new Map(queries.map((q) => [q.id, q]));

  const verdicts: Record<string, Verdict> = {};
  for (const j of JUDGES) {
    const p = join(root, `${j}.json`);
    if (!existsSync(p)) continue;
    try {
      verdicts[j] = parseVerdict(readFileSync(p, "utf8"));
    } catch (e) {
      console.warn(`[ab-agg] ${j}.json failed to parse — skipped: ${(e as Error).message}`);
    }
  }
  const judges = Object.keys(verdicts);
  if (judges.length < 3) throw new Error(`need >=3 valid judges, got ${judges.length} (${judges.join(",")})`);

  const result = aggregate({ key, verdicts, queriesById });
  // Relabel ours/exa → treatment/control for the report.
  const T = "treatment(+newsdata)";
  const C = "control(no-newsdata)";
  const relabel = (s: string) => (s === "ours" ? T : s === "exa" ? C : s);

  console.log(`\n=== WEB-COUNCIL-2 — NewsData A/B (${judges.length} judges: ${judges.join(", ")}) ===\n`);
  for (const r of result.rows) {
    const w = result.rows.find((x) => x.id === r.id)!;
    console.log(
      `${r.id.padEnd(22)} ${Object.entries(r.winners).map(([j, v]) => `${j}:${relabel(v)}`).join("  ")}  →  MAJORITY ${relabel(r.majority).toUpperCase()}` +
        `   (mean t=${w.oursMean.toFixed(2)} c=${w.exaMean.toFixed(2)})`,
    );
  }
  const tally = result.tally;
  const beatTie = (tally["ours"] ?? 0) + (tally["tie"] ?? 0);
  const total = result.rows.length;
  console.log(
    `\nTALLY  ${T}=${tally["ours"] ?? 0}  ${C}=${tally["exa"] ?? 0}  tie=${tally["tie"] ?? 0}` +
      `   → NewsData beat-or-tie: ${beatTie}/${total} = ${Math.round((beatTie / total) * 100)}%`,
  );

  const summary = {
    dir,
    run: "newsdata-ab",
    judges,
    tally,
    beatOrTiePctForNewsData: Math.round((beatTie / total) * 100),
    rows: result.rows.map((r) => ({ id: r.id, winners: r.winners, majority: relabel(r.majority), tMean: r.oursMean, cMean: r.exaMean })),
  };
  writeFileSync(join(root, "council-summary.json"), JSON.stringify(summary, null, 2));
  console.log(`\n[ab-agg] wrote ${join(root, "council-summary.json")}`);
}

main();
