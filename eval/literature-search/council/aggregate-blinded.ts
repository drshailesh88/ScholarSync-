/**
 * Aggregate BLINDED council verdicts into a majority-vote report.
 *
 * Judges voted on anonymous Engine A / Engine B (see build-blinded-packet.ts).
 * This script reads each judge's JSON (winner "A"|"B"|"tie", plus per-engine
 * scores), de-anonymizes via `key.json` (aIs[id] = which engine was "A"), and
 * reports the per-query majority winner as manan/elicit/tie plus mean scores.
 *
 * Judge files live in the same cycle dir as <judge>.json (opus/codex/gemini/
 * grok/deepseek). Each was produced by an isolated judge that saw ONLY PACKET.md.
 *
 * Usage:
 *   tsx eval/literature-search/council/aggregate-blinded.ts --dir <cycle-dir>
 *   → writes <cycle-dir>/COUNCIL-REPORT.md + council-summary.json
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIMS = ["recall", "ranking", "metadata", "clinical_relevance", "explanation", "trust"] as const;
const JUDGES = ["opus", "codex", "gemini", "grok", "deepseek"] as const;

interface Scores {
  recall: number; ranking: number; metadata: number;
  clinical_relevance: number; explanation: number; trust: number;
}
interface PerQuery { id: string; A: Scores; B: Scores; winner: "A" | "B" | "tie"; note?: string }
interface Verdict { perQuery: PerQuery[]; overall: { winner: string; summary: string } }

function parseArgs(argv: string[]): { dir: string } {
  let dir = "phase0-baseline";
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--dir") dir = argv[++i];
  return { dir };
}

function mean(nums: number[]): number {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function majority(winners: string[]): string {
  const tally: Record<string, number> = {};
  for (const w of winners) tally[w] = (tally[w] ?? 0) + 1;
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return "tie";
  return sorted[0][0];
}

function main() {
  const { dir } = parseArgs(process.argv.slice(2));
  const cycleDir = join(HERE, dir);
  const key = JSON.parse(readFileSync(join(cycleDir, "key.json"), "utf8")) as {
    run: string; salt: string; aIs: Record<string, "manan" | "elicit">;
  };

  const verdicts: Record<string, Verdict> = {};
  for (const j of JUDGES) {
    const p = join(cycleDir, `${j}.json`);
    if (existsSync(p)) {
      try {
        verdicts[j] = JSON.parse(readFileSync(p, "utf8")) as Verdict;
      } catch (e) {
        console.error(`[council] skipping malformed ${j}.json: ${e instanceof Error ? e.message : e}`);
      }
    }
  }
  const present = Object.keys(verdicts);
  if (present.length === 0) {
    console.error(`No judge JSONs found in ${cycleDir}. Expected ${JUDGES.join("/")}.json`);
    process.exit(1);
  }

  // Map a blinded winner (A/B/tie) for an id to manan/elicit/tie.
  const deanon = (id: string, w: "A" | "B" | "tie"): "manan" | "elicit" | "tie" => {
    if (w === "tie") return "tie";
    const aIs = key.aIs[id];
    if (!aIs) return "tie";
    if (w === "A") return aIs;
    return aIs === "manan" ? "elicit" : "manan";
  };

  const ids = [...new Set(present.flatMap((j) => verdicts[j].perQuery.map((q) => q.id)))].filter(
    (id) => key.aIs[id]
  );

  const rows = ids.map((id) => {
    const entries = present
      .map((j) => ({ j, q: verdicts[j].perQuery.find((q) => q.id === id) }))
      .filter((e) => e.q) as { j: string; q: PerQuery }[];
    const winners = entries.map((e) => deanon(id, e.q.winner));
    // De-anonymize per-engine scores into manan/elicit for mean computation.
    const mananScores: number[] = [];
    const elicitScores: number[] = [];
    for (const e of entries) {
      const aIs = key.aIs[id];
      const aScores = DIMS.map((d) => e.q.A[d]);
      const bScores = DIMS.map((d) => e.q.B[d]);
      if (aIs === "manan") {
        mananScores.push(...aScores);
        elicitScores.push(...bScores);
      } else {
        mananScores.push(...bScores);
        elicitScores.push(...aScores);
      }
    }
    return {
      id,
      winners: Object.fromEntries(entries.map((e) => [e.j, deanon(id, e.q.winner)])),
      majority: majority(winners),
      mananMean: Math.round(mean(mananScores) * 100) / 100,
      elicitMean: Math.round(mean(elicitScores) * 100) / 100,
    };
  });

  const tally = { manan: 0, elicit: 0, tie: 0 } as Record<string, number>;
  for (const r of rows) tally[r.majority] = (tally[r.majority] ?? 0) + 1;
  const mananBeatsOrTies = tally.manan + tally.tie;
  const pctBeatTie = rows.length ? Math.round((mananBeatsOrTies / rows.length) * 100) : 0;

  // The project's own stop gate: Manan must beat-or-tie Elicit on ≥ 80% of
  // queries. This is the HONEST headline — a raw win count (e.g. "47 wins")
  // flatters the system by hiding the ties and losses the gate is defined over.
  const STOP_GATE_PCT = 80;
  const gatePass = pctBeatTie >= STOP_GATE_PCT;
  const verdictLine = `${gatePass ? "PASS" : "FAIL"} — Manan beats-or-ties Elicit on ${mananBeatsOrTies}/${rows.length} queries (${pctBeatTie}%), gate ≥ ${STOP_GATE_PCT}%`;

  const md: string[] = [];
  md.push("# BLINDED LLM-Council Verdict — Manan vs Elicit", "");
  md.push(`## ${gatePass ? "✅ PASS" : "❌ FAIL"} — ${pctBeatTie}% beat-or-tie vs ${STOP_GATE_PCT}% gate`, "");
  md.push(
    `Manan beats-or-ties Elicit on **${mananBeatsOrTies} of ${rows.length}** queries ` +
      `(**${pctBeatTie}%**). Stop gate is **≥ ${STOP_GATE_PCT}%** → **${gatePass ? "PASS" : "FAIL"}**.`,
    "",
    `_Raw split (wins are NOT the gate): Manan ${tally.manan} · Elicit ${tally.elicit} · tie ${tally.tie}._`,
    ""
  );
  md.push(`Cycle dir: \`${dir}\` · Manan run: \`${key.run}\` · blinding salt: \`${key.salt}\``);
  md.push(`Judges (isolated, blinded A/B): ${present.join(", ")}.`, "");
  md.push("## Per-query majority vote (de-anonymized)", "");
  md.push(`| query | ${present.join(" | ")} | **majority** | Manan mean | Elicit mean |`);
  md.push(`|---|${present.map(() => "---").join("|")}|---|---|---|`);
  for (const r of rows) {
    md.push(
      `| ${r.id} | ${present.map((j) => r.winners[j] ?? "—").join(" | ")} | **${r.majority}** | ${r.mananMean} | ${r.elicitMean} |`
    );
  }
  md.push("");
  md.push("## Tally (by per-query majority)", "");
  md.push(`- **Manan beats-or-ties: ${mananBeatsOrTies}/${rows.length} = ${pctBeatTie}% → ${gatePass ? "PASS" : "FAIL"}** (stop gate ≥ ${STOP_GATE_PCT}%)`);
  md.push(`- Manan wins: ${tally.manan}`);
  md.push(`- Elicit wins: ${tally.elicit}`);
  md.push(`- Ties: ${tally.tie}`, "");
  md.push("## Judge overall summaries (blinded — A/B)", "");
  for (const j of present) md.push(`- **${j}:** winner=${verdicts[j].overall.winner} — ${verdicts[j].overall.summary}`);
  md.push("");

  writeFileSync(join(cycleDir, "COUNCIL-REPORT.md"), md.join("\n"));
  writeFileSync(
    join(cycleDir, "council-summary.json"),
    JSON.stringify(
      {
        dir,
        run: key.run,
        salt: key.salt,
        judges: present,
        gate: { metric: "pctBeatTie", threshold: STOP_GATE_PCT, value: pctBeatTie, pass: gatePass },
        tally,
        mananBeatsOrTies,
        pctBeatTie,
        rows,
      },
      null,
      2
    )
  );
  console.log(`[council] ${verdictLine}`);
  console.log(
    `[council]   raw split — Manan ${tally.manan} / Elicit ${tally.elicit} / tie ${tally.tie} (dir=${dir}, judges=${present.join("+")})`
  );
}

main();
