/**
 * Build a BLINDED LLM-council comparison packet.
 *
 * Unlike `build-packets.ts` (which labels the engines "Manan" / "Elicit" and
 * shows engine-distinguishing fields), this builder enforces strict blinding so
 * no judge can tell which engine is the system under test:
 *
 *  1. Per query, Manan is randomly-but-deterministically assigned to "Engine A"
 *     or "Engine B" via a stable hash of (salt + id). The assignment is logged
 *     to `key.json` (which judges NEVER see) so the aggregator can de-anonymize.
 *  2. BOTH engines are rendered in an IDENTICAL format using only the fields
 *     they have in common (rank, title, year, venue, PMID, DOI). Manan-only
 *     fields (studyType) and Elicit-only fields (citedByCount) are dropped so
 *     the two lists are visually indistinguishable.
 *  3. The rubric never names Manan or Elicit; it only refers to Engine A / B.
 *
 * Judges read PACKET.md, score each engine, and pick a per-query winner
 * "A" | "B" | "tie". `aggregate-blinded.ts` maps A/B back to manan/elicit.
 *
 * Usage:
 *   tsx eval/literature-search/council/build-blinded-packet.ts \
 *     --run <run-label> --out <cycle-dir> [--salt <salt>]
 *
 * Example:
 *   tsx .../build-blinded-packet.ts --run phase0-baseline --out phase0-baseline --salt phase0
 *   → writes eval/literature-search/council/<out>/{PACKET.md,key.json}
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { BENCHMARK_QUERIES } from "../queries";

const HERE = dirname(fileURLToPath(import.meta.url));

interface CommonRow {
  title: string;
  year: number | null;
  venue: string | null;
  doi: string | null;
  pmid: string | null;
}

interface MananResult {
  title?: string;
  year?: number;
  journal?: string;
  doi?: string;
  pmid?: string;
}

interface ElicitItem {
  rank: number;
  title: string;
  year: number | null;
  venue: string | null;
  doi: string | null;
  pmid: string | null;
  citedByCount: number | null;
}

function parseArgs(argv: string[]): { run: string; out: string; salt: string } {
  let run = "phase0-baseline";
  let out = "phase0-baseline";
  let salt = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--run") run = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--salt") salt = argv[++i];
  }
  return { run, out, salt: salt || out };
}

/** Deterministic, reproducible coin flip: is Manan shown as Engine A for this id? */
function mananIsEngineA(salt: string, id: string): boolean {
  const h = createHash("sha1").update(`${salt}:${id}`).digest("hex");
  return parseInt(h.slice(0, 8), 16) % 2 === 0;
}

function idLabel(r: { doi: string | null; pmid: string | null }): string {
  return (
    [r.pmid ? `PMID:${r.pmid}` : "", r.doi ? `DOI:${r.doi}` : ""].filter(Boolean).join(" ") ||
    "— no id —"
  );
}

function renderEngine(rows: CommonRow[]): string[] {
  if (rows.length === 0) return ["_(no results)_"];
  return rows.map(
    (r, i) => `${i + 1}. ${r.title} — ${r.year ?? "?"}, ${r.venue ?? "?"} (${idLabel(r)})`
  );
}

function mananCommon(id: string, runLabel: string): CommonRow[] {
  const path = join(HERE, "..", "runs", runLabel, "queries", `${id}.json`);
  const run = JSON.parse(readFileSync(path, "utf8")) as { results: MananResult[] };
  return run.results.slice(0, 10).map((r) => ({
    title: r.title ?? "",
    year: typeof r.year === "number" ? r.year : null,
    venue: r.journal ?? null,
    doi: r.doi ?? null,
    pmid: r.pmid ?? null,
  }));
}

function elicitCommon(items: ElicitItem[]): CommonRow[] {
  return items.slice(0, 10).map((r) => ({
    title: r.title,
    year: r.year,
    venue: r.venue,
    doi: r.doi,
    pmid: r.pmid,
  }));
}

const RUBRIC = `## Scoring rubric — BLINDED comparison

You are an impartial judge comparing TWO anonymous literature-search engines,
**Engine A** and **Engine B**, on the SAME biomedical query. You do NOT know
which engine is which, and you must not guess or speculate about their identity.
Judge ONLY the result lists shown.

Score EACH engine 0–5 (5 = best) on these six dimensions:
1. **recall** — are the landmark / must-have papers present in the top 10?
2. **ranking** — is the best / most-relevant paper near the top; is the evidence
   hierarchy respected (systematic reviews/meta-analyses & RCTs above weaker designs)?
3. **metadata** — DOI/PMID/year/venue completeness and plausibility.
4. **clinical_relevance** — usefulness of the top 10 to a clinician/researcher; few irrelevant items.
5. **explanation** — would the list be easy to trust/act on (clear identifiers, no junk)?
6. **trust** — absence of dubious/predatory/irrelevant/duplicate entries.

Then pick a **winner** per query: "A", "B", or "tie".

Use the listed must-have papers as ground truth for landmark recall. Penalize a
missing landmark RCT and penalize irrelevant items in the top 10. For queries
tagged recency-sensitive, favor newer high-quality evidence.`;

const OUTPUT_SCHEMA = `## Output format (STRICT)

Return ONLY a JSON object, no prose, no markdown fences, of EXACTLY this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "A": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "B": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "winner": "A" | "B" | "tie",
      "note": "<one sentence justification, no identity guessing>"
    }
  ],
  "overall": {"winner":"A"|"B"|"tie","summary":"<2-3 sentences>"}
}`;

function main() {
  const { run, out, salt } = parseArgs(process.argv.slice(2));
  const byId = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "..", "elicit", "fixtures.json"), "utf8")
  ) as Record<string, ElicitItem[]>;

  const sections: string[] = [];
  sections.push("# Blinded LLM-Council packet — Engine A vs Engine B", "");
  sections.push(
    "Two anonymous engines are compared on identical queries. Engine assignment is",
    "randomized per query; you cannot infer identity from position or formatting.",
    ""
  );
  sections.push(RUBRIC, "");
  sections.push(OUTPUT_SCHEMA, "");
  sections.push("---", "");

  const key: Record<string, "manan" | "elicit"> = {}; // key[id] = which engine is "A"
  let n = 0;

  for (const id of Object.keys(fixtures)) {
    const bq = byId.get(id);
    if (!bq) continue;
    // Skip ids with no Elicit data OR no Manan run (keep the comparison fair).
    if (!fixtures[id] || fixtures[id].length === 0) continue;

    let manan: CommonRow[];
    try {
      manan = mananCommon(id, run);
    } catch {
      continue; // Manan run missing this id — skip
    }
    const elicit = elicitCommon(fixtures[id]);

    const mananA = mananIsEngineA(salt, id);
    key[id] = mananA ? "manan" : "elicit";
    const engineA = mananA ? manan : elicit;
    const engineB = mananA ? elicit : manan;

    sections.push(`## Query: \`${id}\` — "${bq.query}"`);
    sections.push(`Category: ${bq.category}. Intent: ${bq.intent}`);
    if (bq.recencyBiased) sections.push("_Recency-sensitive: newer high-quality evidence is better._");
    if (bq.mustHaves?.length) {
      sections.push("", "**Must-have landmark papers (ground truth):**");
      for (const m of bq.mustHaves) sections.push(`- ${m.label}`);
    }
    sections.push("", "### Engine A — top 10");
    sections.push(...renderEngine(engineA));
    sections.push("", "### Engine B — top 10");
    sections.push(...renderEngine(engineB));
    sections.push("", "---", "");
    n++;
  }

  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), sections.join("\n"));
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify({ run, salt, generatedFrom: "build-blinded-packet.ts", aIs: key }, null, 2)
  );
  console.log(
    `[blinded-packet] wrote ${join(outDir, "PACKET.md")} (${n} queries, run=${run}, salt=${salt})`
  );
  console.log(`[blinded-packet] wrote ${join(outDir, "key.json")} — KEEP THIS AWAY FROM JUDGES`);
}

main();
