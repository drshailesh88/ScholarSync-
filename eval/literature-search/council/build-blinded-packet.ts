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

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { BENCHMARK_QUERIES } from "../queries";
import { normalizeAbstract, ABSTRACT_UNAVAILABLE } from "./abstract-format";

const HERE = dirname(fileURLToPath(import.meta.url));

function normalizeDoi(doi: string | undefined | null): string | undefined {
  if (!doi) return undefined;
  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .replace(/\s+/g, "");
}

interface AbstractCache {
  byPmid: Record<string, string>;
  byDoi: Record<string, string>;
}

/** Load the neutral abstract cache (built by build-abstract-cache.ts). Missing →
 * empty cache: the packet still builds, every row shows the identical placeholder. */
function loadAbstractCache(file: string): AbstractCache {
  const path = join(HERE, file);
  if (!existsSync(path)) {
    console.warn(
      `[blinded-packet] no abstract cache at ${path} — abstracts will show as "${ABSTRACT_UNAVAILABLE}". Run build-abstract-cache.ts first.`
    );
    return { byPmid: {}, byDoi: {} };
  }
  const j = JSON.parse(readFileSync(path, "utf8")) as Partial<AbstractCache>;
  return { byPmid: j.byPmid ?? {}, byDoi: j.byDoi ?? {} };
}

/** Abstract for a row from the NEUTRAL cache only (never the engine's payload) —
 * keeps the two engines' abstracts from differing in provenance/style. */
function abstractFor(
  cache: AbstractCache,
  pmid: string | null,
  doi: string | null
): string {
  const nd = normalizeDoi(doi);
  const raw = (pmid && cache.byPmid[pmid]) || (nd && cache.byDoi[nd]) || "";
  const norm = normalizeAbstract(raw);
  return norm || ABSTRACT_UNAVAILABLE;
}

interface CommonRow {
  title: string;
  year: number | null;
  venue: string | null;
  doi: string | null;
  pmid: string | null;
  abstract: string;
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

function parseArgs(argv: string[]): { run: string; out: string; salt: string; cache: string } {
  let run = "phase0-baseline";
  let out = "phase0-baseline";
  let salt = "";
  let cache = "abstract-cache.json";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--run") run = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--salt") salt = argv[++i];
    else if (argv[i] === "--cache") cache = argv[++i];
  }
  return { run, out, salt: salt || out, cache };
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
  return rows.flatMap((r, i) => [
    `${i + 1}. ${r.title} — ${r.year ?? "?"}, ${r.venue ?? "?"} (${idLabel(r)})`,
    `   ${r.abstract}`,
  ]);
}

function mananCommon(id: string, runLabel: string, cache: AbstractCache): CommonRow[] {
  const path = join(HERE, "..", "runs", runLabel, "queries", `${id}.json`);
  const run = JSON.parse(readFileSync(path, "utf8")) as { results: MananResult[] };
  return run.results.slice(0, 10).map((r) => {
    const pmid = r.pmid ?? null;
    const doi = r.doi ?? null;
    return {
      title: r.title ?? "",
      year: typeof r.year === "number" ? r.year : null,
      venue: r.journal ?? null,
      doi,
      pmid,
      abstract: abstractFor(cache, pmid, doi),
    };
  });
}

function elicitCommon(items: ElicitItem[], cache: AbstractCache): CommonRow[] {
  return items.slice(0, 10).map((r) => ({
    title: r.title,
    year: r.year,
    venue: r.venue,
    doi: r.doi,
    pmid: r.pmid,
    abstract: abstractFor(cache, r.pmid, r.doi),
  }));
}

const RUBRIC = `## Scoring rubric — BLINDED comparison

You are an impartial judge comparing TWO anonymous literature-search engines,
**Engine A** and **Engine B**, on the SAME biomedical query. You do NOT know
which engine is which, and you must not guess or speculate about their identity.
Judge ONLY the result lists shown.

Each result shows its title, year, venue, identifiers, AND its abstract — judge
clinical relevance and trust from the abstract, i.e. from what a user actually reads.

Score EACH engine 0–5 (5 = best) on these six dimensions, using YOUR OWN domain
knowledge of the query — you are NOT given an answer key of expected papers:
1. **recall** — from your knowledge of this topic, does the top 10 comprehensively
   cover the key evidence a domain expert would expect (landmark trials, pivotal
   reviews, the seminal paper)? Judge coverage independently — no list is provided.
2. **ranking** — is the best / most-relevant paper near the top; is the evidence
   hierarchy respected (systematic reviews/meta-analyses & RCTs above weaker designs)?
3. **metadata** — DOI/PMID/year/venue completeness and plausibility.
4. **clinical_relevance** — usefulness of the top 10 to a clinician/researcher, judged
   from the abstracts; few irrelevant items.
5. **explanation** — would the list be easy to trust/act on (clear identifiers, no junk)?
6. **trust** — absence of dubious/predatory/irrelevant/duplicate entries.

Then pick a **winner** per query: "A", "B", or "tie".

Penalize an obviously missing landmark paper and penalize irrelevant items in the
top 10. For queries tagged recency-sensitive, favor newer high-quality evidence.`;

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
  const { run, out, salt, cache: cacheFile } = parseArgs(process.argv.slice(2));
  const byId = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  const cache = loadAbstractCache(cacheFile);
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "..", "elicit", "fixtures.json"), "utf8")
  ) as Record<string, ElicitItem[]>;

  const sections: string[] = [];
  sections.push("# Blinded LLM-Council packet — Engine A vs Engine B", "");
  sections.push(
    "Two anonymous engines are compared on identical queries. Engine assignment is",
    "randomized per query; you cannot infer identity from position or formatting.",
    "Each result is shown with its abstract (sourced identically for both engines),",
    "so relevance and trust are judged from what a user actually reads.",
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
      manan = mananCommon(id, run, cache);
    } catch {
      continue; // Manan run missing this id — skip
    }
    const elicit = elicitCommon(fixtures[id], cache);

    const mananA = mananIsEngineA(salt, id);
    key[id] = mananA ? "manan" : "elicit";
    const engineA = mananA ? manan : elicit;
    const engineB = mananA ? elicit : manan;

    sections.push(`## Query: \`${id}\` — "${bq.query}"`);
    sections.push(`Category: ${bq.category}. Intent: ${bq.intent}`);
    if (bq.recencyBiased) sections.push("_Recency-sensitive: newer high-quality evidence is better._");
    // NOTE: the must-have landmark list is deliberately NOT printed here. Handing
    // judges the answer key made the council's "recall" score re-derive the
    // deterministic recall@k metric instead of contributing independent judgment.
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
