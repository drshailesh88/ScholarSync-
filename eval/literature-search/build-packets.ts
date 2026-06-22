/**
 * Build the LLM-council comparison packet: for each council query, pair Manan's
 * top-10 (from a completed run on disk) with the captured Elicit snapshot, and
 * emit a single PACKET.md plus the rubric. Judges read PACKET.md and score —
 * they never call Elicit (reproducible, snapshot-based).
 *
 * Usage: tsx eval/literature-search/build-packets.ts [<run-label, default improved>]
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import type { EvalResultItem } from "@/lib/search/eval/metrics";

const HERE = dirname(fileURLToPath(import.meta.url));
const runLabel = process.argv[2] ?? "improved";
const byId = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));

interface ElicitItem {
  rank: number;
  title: string;
  year: number;
  venue: string;
  doi: string | null;
  pmid: string | null;
  citedByCount: number;
}

const fixtures = JSON.parse(
  readFileSync(join(HERE, "elicit", "fixtures.json"), "utf8")
) as Record<string, ElicitItem[]>;

function mananRows(id: string): EvalResultItem[] {
  const path = join(HERE, "runs", runLabel, "queries", `${id}.json`);
  const run = JSON.parse(readFileSync(path, "utf8")) as { results: EvalResultItem[] };
  return run.results.slice(0, 10);
}

function idLabel(r: { doi?: string; pmid?: string }): string {
  return [r.pmid ? `PMID:${r.pmid}` : "", r.doi ? `DOI:${r.doi}` : ""]
    .filter(Boolean)
    .join(" ") || "— no id —";
}

const RUBRIC = `## Scoring rubric

You are comparing two literature-search systems on the SAME query:
- **Manan** (system under test) vs **Elicit** (the benchmark target).

Score EACH system 0–5 (5 = best) on these six dimensions:
1. **recall** — are the landmark/must-have papers present in the top 10?
2. **ranking** — is the best/most-relevant paper near the top; is the evidence hierarchy respected (SR/MA & RCT above case reports)?
3. **metadata** — DOI/PMID/year/journal completeness and correctness.
4. **clinical_relevance** — usefulness of the top 10 to a clinician/researcher; few irrelevant items.
5. **explanation** — would the result list be easy to trust/act on (clear identifiers, no junk)?
6. **trust** — reproducibility and absence of dubious/predatory/irrelevant entries.

Then pick a **winner** per query: "manan", "elicit", or "tie".

Use the must-have list as ground truth for landmark recall. Penalize missing landmark RCTs and irrelevant case reports in the top 10. Recency-tagged queries should favor newer high-quality evidence.`;

const OUTPUT_SCHEMA = `## Output format (STRICT)

Return ONLY a JSON object, no prose, of this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "manan": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "elicit": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "winner": "manan" | "elicit" | "tie",
      "note": "<one sentence justification>"
    }
  ],
  "overall": {"winner":"manan"|"elicit"|"tie","summary":"<2-3 sentences>"}
}`;

const sections: string[] = [];
sections.push("# LLM-Council comparison packet — Manan vs Elicit");
sections.push("");
sections.push(`Manan results are from run \`${runLabel}\`. Elicit results are snapshots (benchmark only).`);
sections.push("");
sections.push(RUBRIC, "");
sections.push(OUTPUT_SCHEMA, "");
sections.push("---", "");

for (const id of Object.keys(fixtures)) {
  const bq = byId.get(id);
  if (!bq) continue;
  sections.push(`## Query: \`${id}\` — "${bq.query}"`);
  sections.push(`Category: ${bq.category}. Intent: ${bq.intent}`);
  if (bq.mustHaves?.length) {
    sections.push("");
    sections.push("**Must-have landmark papers:**");
    for (const m of bq.mustHaves) sections.push(`- ${m.label}`);
  }
  sections.push("");
  sections.push("### Manan top 10");
  const manan = mananRows(id);
  if (manan.length === 0) sections.push("_(no results)_");
  manan.forEach((r, i) => {
    sections.push(
      `${i + 1}. ${r.title} — ${r.year ?? "?"}, ${r.journal ?? "?"} [${r.studyType ?? "?"}] (${idLabel(r)})`
    );
  });
  sections.push("");
  sections.push("### Elicit top 10");
  fixtures[id].forEach((r) => {
    sections.push(
      `${r.rank}. ${r.title} — ${r.year}, ${r.venue} (${idLabel({
        doi: r.doi ?? undefined,
        pmid: r.pmid ?? undefined,
      })}, ${r.citedByCount} cites)`
    );
  });
  sections.push("", "---", "");
}

const outDir = join(HERE, "council");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "PACKET.md"), sections.join("\n"));
console.log(
  `[packets] wrote ${join(outDir, "PACKET.md")} for ${Object.keys(fixtures).length} queries (run=${runLabel})`
);
