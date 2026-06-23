/**
 * Capture Elicit `search` snapshots for the benchmark queries into
 * `elicit/fixtures.json` — BENCHMARK/CALIBRATION ONLY. Elicit is never a Manan
 * runtime dependency; this script lives in `eval/` and is run by hand with the
 * key injected (`op-run -- npx tsx eval/literature-search/capture-elicit.ts`).
 *
 * Elicit API: POST https://elicit.com/api/v1/search  (Bearer ELICIT_API_KEY).
 * We store the compact fixture shape the council packet builder expects:
 *   { rank, title, year, venue, doi, pmid, citedByCount }
 *
 * Usage:
 *   op-run -- npx tsx eval/literature-search/capture-elicit.ts            # all queries
 *   op-run -- npx tsx eval/literature-search/capture-elicit.ts --only id1,id2
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(HERE, "elicit", "fixtures.json");
const ENDPOINT = "https://elicit.com/api/v1/search";

interface ElicitPaper {
  title: string;
  year: number | null;
  venue: string | null;
  doi: string | null;
  pmid: string | null;
  citedByCount: number | null;
}
interface FixtureItem {
  rank: number;
  title: string;
  year: number | null;
  venue: string | null;
  doi: string | null;
  pmid: string | null;
  citedByCount: number | null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function captureOne(query: string, key: string): Promise<FixtureItem[]> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, maxResults: 10 }),
  });
  if (!res.ok) {
    throw new Error(`Elicit HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
  }
  const data = (await res.json()) as { results?: ElicitPaper[]; papers?: ElicitPaper[] };
  const papers = data.results ?? data.papers ?? [];
  return papers.slice(0, 10).map((p, i) => ({
    rank: i + 1,
    title: p.title,
    year: p.year ?? null,
    venue: p.venue ?? null,
    doi: p.doi ?? null,
    pmid: p.pmid ?? null,
    citedByCount: p.citedByCount ?? null,
  }));
}

async function main() {
  const key = process.env.ELICIT_API_KEY;
  if (!key) throw new Error("ELICIT_API_KEY missing — run via `op-run --`.");

  const argv = process.argv.slice(2);
  const onlyIdx = argv.indexOf("--only");
  const only =
    onlyIdx >= 0 ? argv[onlyIdx + 1].split(",").map((s) => s.trim()) : null;

  const existing = JSON.parse(readFileSync(FIXTURES, "utf8")) as Record<string, unknown>;
  const out: Record<string, unknown> = { ...existing };
  out._note =
    "Elicit search snapshots (compact: rank,title,year,venue,doi,pmid,citedByCount). " +
    "Benchmark/calibration only — Elicit is never a Manan runtime dependency. " +
    "Captured via the Elicit API by eval/literature-search/capture-elicit.ts.";

  const queries = only
    ? BENCHMARK_QUERIES.filter((q) => only.includes(q.id))
    : BENCHMARK_QUERIES;

  let ok = 0;
  for (const q of queries) {
    try {
      const rows = await captureOne(q.query, key);
      out[q.id] = rows;
      ok++;
      console.log(`  ✓ ${q.id.padEnd(30)} ${rows.length} results`);
    } catch (e) {
      console.log(`  ✗ ${q.id.padEnd(30)} ${e instanceof Error ? e.message : e}`);
    }
    await sleep(1200); // be gentle on the Elicit API
  }

  writeFileSync(FIXTURES, JSON.stringify(out, null, 2));
  console.log(`\n[elicit] captured ${ok}/${queries.length} → ${FIXTURES}`);
}

main().catch((e) => {
  console.error("[elicit] fatal:", e);
  process.exit(1);
});
