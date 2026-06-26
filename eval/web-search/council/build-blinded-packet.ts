// eval/web-search/council/build-blinded-packet.ts
/**
 * Build a BLINDED LLM-council packet for web/news/discussions: Engine A vs Engine B.
 * BENCHMARK/CALIBRATION ONLY — neither Exa nor any judge is a runtime dependency.
 *
 * Hardening over the academic packet (design spec §6.2):
 *  1. mustHaves printed as the ground-truth relevance anchor.
 *  2. per-tab objective rubric (./rubric).
 *  3. rich rows: title · domain · date · snippet (not bare titles).
 *  4. strong tab-matched Exa opponent (captured in Plan 1).
 * Both engines render in IDENTICAL format; A/B is randomized per query via sha1(salt:id);
 * key.json (withheld from judges) lets the aggregator de-anonymize.
 *
 * Usage:
 *   tsx eval/web-search/council/build-blinded-packet.ts --run <run-label> --out <cycle-dir> [--salt <salt>]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { BENCHMARK_QUERIES } from "../queries";
import type { WebTab, WebBenchmarkQuery, CommonRow, ExaFixtureItem } from "../types";
import { RUBRIC_BY_TAB, SCORING_PREAMBLE, OUTPUT_SCHEMA } from "./rubric";
import { councilStrengthCheck } from "./preflight";

const HERE = dirname(fileURLToPath(import.meta.url));

export interface EnginePair {
  id: string;
  tab: WebTab;
  ours: CommonRow[];
  exa: CommonRow[];
}

function parseArgs(argv: string[]): { run: string; out: string; salt: string; judges: string[] } {
  let run = "baseline";
  let out = "baseline";
  let salt = "";
  let judges = "opus,codex,grok";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--run") run = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--salt") salt = argv[++i];
    else if (argv[i] === "--judges") judges = argv[++i];
  }
  return { run, out, salt: salt || out, judges: judges.split(",").map((s) => s.trim()).filter(Boolean) };
}

/** Deterministic per-query coin flip: is OUR engine shown as Engine A for this id? */
export function oursIsEngineA(salt: string, id: string): boolean {
  const h = createHash("sha1").update(`${salt}:${id}`).digest("hex");
  return parseInt(h.slice(0, 8), 16) % 2 === 0;
}

export function renderRows(rows: CommonRow[]): string[] {
  if (rows.length === 0) return ["_(no results)_"];
  return rows.map((r, i) => {
    const date = r.publishedDate ?? "no date";
    const dom = r.domain ?? "no domain";
    const snip = r.snippet ? ` — ${r.snippet.slice(0, 160)}` : "";
    return `${i + 1}. ${r.title || "(untitled)"} · ${dom} · ${date}${snip}`;
  });
}

export function buildPacket(opts: {
  pairs: EnginePair[];
  queriesById: Map<string, WebBenchmarkQuery>;
  salt: string;
}): { packet: string; key: Record<string, "ours" | "exa"> } {
  const sections: string[] = [];
  sections.push("# Blinded LLM-Council packet — Engine A vs Engine B (web/news/discussions)", "");
  sections.push(
    "Two anonymous engines are compared on identical queries. Engine assignment is randomized",
    "per query; you cannot infer identity from position or formatting. Each tab has its own rubric.",
    "",
  );
  sections.push(SCORING_PREAMBLE, "");
  sections.push("### Per-tab rubric", "");
  for (const tab of ["web", "news", "discussions"] as WebTab[]) sections.push(`- ${RUBRIC_BY_TAB[tab]}`, "");
  sections.push(OUTPUT_SCHEMA, "", "---", "");

  const key: Record<string, "ours" | "exa"> = {};
  for (const pair of opts.pairs) {
    const bq = opts.queriesById.get(pair.id);
    if (!bq) continue;
    const oursA = oursIsEngineA(opts.salt, pair.id);
    key[pair.id] = oursA ? "ours" : "exa";
    const engineA = oursA ? pair.ours : pair.exa;
    const engineB = oursA ? pair.exa : pair.ours;

    sections.push(`## Query: \`${pair.id}\` — "${bq.query}"`);
    sections.push(`Tab: ${bq.tab}. Class: ${bq.queryClass}. Intent: ${bq.intent}`);
    sections.push(`_Apply the **Tab = ${bq.tab}** rubric above._`);
    if (bq.recencyBiased) sections.push("_Recency-sensitive: newer high-quality results are better._");
    if (bq.mustHaves?.length) {
      sections.push("", "**Must-have results (ground truth — relevance anchor):**");
      for (const m of bq.mustHaves) sections.push(`- ${m.label}${m.domain ? ` (${m.domain})` : ""}`);
    }
    sections.push("", "### Engine A — top 10");
    sections.push(...renderRows(engineA));
    sections.push("", "### Engine B — top 10");
    sections.push(...renderRows(engineB));
    sections.push("", "---", "");
  }
  return { packet: sections.join("\n"), key };
}

function loadOursRows(runLabel: string, id: string): CommonRow[] {
  const path = join(HERE, "..", "runs", runLabel, "queries", `${id}.json`);
  const data = JSON.parse(readFileSync(path, "utf8")) as { rows: CommonRow[] };
  return data.rows.slice(0, 10);
}

function exaToCommon(items: ExaFixtureItem[]): CommonRow[] {
  return items.slice(0, 10).map((r) => ({
    title: r.title,
    url: r.url,
    domain: r.domain,
    publishedDate: r.publishedDate,
    snippet: r.snippet,
  }));
}

function main() {
  const { run, out, salt, judges } = parseArgs(process.argv.slice(2));
  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "..", "exa", "fixtures.json"), "utf8"),
  ) as Record<string, ExaFixtureItem[]>;

  const pairs: EnginePair[] = [];
  for (const q of BENCHMARK_QUERIES) {
    const exa = fixtures[q.id];
    if (!Array.isArray(exa) || exa.length === 0) continue; // no opponent → skip (fair comparison)
    const oursPath = join(HERE, "..", "runs", run, "queries", `${q.id}.json`);
    if (!existsSync(oursPath)) continue; // no run output → skip
    pairs.push({ id: q.id, tab: q.tab, ours: loadOursRows(run, q.id), exa: exaToCommon(exa) });
  }

  const { packet, key } = buildPacket({ pairs, queriesById, salt });

  // §6.3 council-strength gate at the build choke point: refuse to emit a packet that
  // would be discarded (missing ground truth, fingerprintable field-parity, lopsided A/B,
  // <3 intended judges, or nothing to compare). key here is the flat in-memory map.
  const strength = councilStrengthCheck({ pairs, key, queriesById, judgesPresent: judges });
  if (!strength.ok) {
    console.error("[council] COUNCIL-STRENGTH CHECK FAILED — packet not written (this run would be discarded):");
    for (const f of strength.failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  for (const p of strength.passes) console.log(`[council] ✓ ${p}`);

  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), packet);
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify({ run, salt, generatedFrom: "build-blinded-packet.ts", aIs: key }, null, 2),
  );
  console.log(`[blinded-packet] wrote ${join(outDir, "PACKET.md")} (${pairs.length} queries, run=${run}, salt=${salt})`);
  console.log(`[blinded-packet] wrote ${join(outDir, "key.json")} — KEEP THIS AWAY FROM JUDGES`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
