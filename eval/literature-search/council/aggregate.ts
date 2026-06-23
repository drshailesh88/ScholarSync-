/**
 * Aggregate the LLM-council verdicts (Opus + Codex + Grok) into a majority-vote
 * report. Reads {opus,codex,grok}.json (any subset present) and writes
 * COUNCIL-REPORT.md + council-summary.json.
 *
 * Usage: tsx eval/literature-search/council/aggregate.ts
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIMS = ["recall", "ranking", "metadata", "clinical_relevance", "explanation", "trust"] as const;

interface Scores {
  recall: number; ranking: number; metadata: number;
  clinical_relevance: number; explanation: number; trust: number;
}
interface PerQuery {
  id: string; manan: Scores; elicit: Scores;
  winner: "manan" | "elicit" | "tie"; note?: string;
}
interface Verdict { perQuery: PerQuery[]; overall: { winner: string; summary: string }; }

const JUDGES = ["opus", "codex", "grok", "gemini", "deepseek"] as const;
const runLabel = process.argv[2] ?? "fix-wildcard";
const verdicts: Record<string, Verdict> = {};
for (const j of JUDGES) {
  const p = join(HERE, `${j}.json`);
  if (existsSync(p)) verdicts[j] = JSON.parse(readFileSync(p, "utf8"));
}
const present = Object.keys(verdicts);
if (present.length === 0) {
  console.error("No judge JSONs found. Expected opus.json / codex.json / grok.json");
  process.exit(1);
}

// Collect all query ids (union).
const ids = [...new Set(present.flatMap((j) => verdicts[j].perQuery.map((q) => q.id)))];

function majority(winners: string[]): string {
  const tally: Record<string, number> = {};
  for (const w of winners) tally[w] = (tally[w] ?? 0) + 1;
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return "tie";
  return sorted[0][0];
}

function mean(nums: number[]): number {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

const rows = ids.map((id) => {
  const entries = present
    .map((j) => ({ j, q: verdicts[j].perQuery.find((q) => q.id === id) }))
    .filter((e) => e.q) as { j: string; q: PerQuery }[];
  const winners = entries.map((e) => e.q.winner);
  const mananMean = mean(entries.flatMap((e) => DIMS.map((d) => e.q.manan[d])));
  const elicitMean = mean(entries.flatMap((e) => DIMS.map((d) => e.q.elicit[d])));
  return {
    id,
    winners: Object.fromEntries(entries.map((e) => [e.j, e.q.winner])),
    majority: majority(winners),
    mananMean: Math.round(mananMean * 100) / 100,
    elicitMean: Math.round(elicitMean * 100) / 100,
  };
});

const tally = { manan: 0, elicit: 0, tie: 0 } as Record<string, number>;
for (const r of rows) tally[r.majority] = (tally[r.majority] ?? 0) + 1;

const overallWinners = present.map((j) => verdicts[j].overall.winner);

// ── Markdown ──────────────────────────────────────────────────────────
const md: string[] = [];
md.push("# LLM-Council Verdict — Manan vs Elicit", "");
md.push(`Judges: ${present.join(", ")} (cross-family: Anthropic Opus · OpenAI Codex · Google Gemini).`);
md.push(`Manan run: \`${runLabel}\` (current \`main\` HEAD, with the OpenAlex wildcard-400 fix and Cohere cross-encoder active).`, "");
md.push("## Per-query majority vote", "");
md.push(`| query | ${present.join(" | ")} | **majority** | Manan mean | Elicit mean |`);
md.push(`|---|${present.map(() => "---").join("|")}|---|---|---|`);
for (const r of rows) {
  md.push(
    `| ${r.id} | ${present.map((j) => r.winners[j] ?? "—").join(" | ")} | **${r.majority}** | ${r.mananMean} | ${r.elicitMean} |`
  );
}
md.push("");
md.push("## Tally (by per-query majority)", "");
md.push(`- **Manan wins: ${tally.manan}**`);
md.push(`- Elicit wins: ${tally.elicit}`);
md.push(`- Ties: ${tally.tie}`);
md.push("");
md.push(`Overall winner per judge: ${present.map((j) => `${j}=${verdicts[j].overall.winner}`).join(", ")}.`);
md.push("");
md.push("## Judge summaries", "");
for (const j of present) md.push(`- **${j}:** ${verdicts[j].overall.summary}`);
md.push("");
md.push("## Notes per query (first judge with a note)", "");
for (const id of ids) {
  const note = present
    .map((j) => verdicts[j].perQuery.find((q) => q.id === id)?.note)
    .find(Boolean);
  if (note) md.push(`- **${id}:** ${note}`);
}

writeFileSync(join(HERE, "COUNCIL-REPORT.md"), md.join("\n"));
writeFileSync(
  join(HERE, "council-summary.json"),
  JSON.stringify({ judges: present, tally, overallWinners, rows }, null, 2)
);
console.log(
  `[council] judges=${present.join("+")} → Manan ${tally.manan} / Elicit ${tally.elicit} / tie ${tally.tie}`
);
