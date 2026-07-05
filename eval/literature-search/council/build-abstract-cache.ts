/**
 * Build a NEUTRAL abstract cache for the blinded council packet.
 *
 * The blinded packet shows an abstract under every result so judges score
 * clinical relevance/trust from what a user actually sees. To keep engine
 * blinding intact, the abstract must NOT come from the engine's own payload
 * (Manan carries abstracts; the Elicit fixtures do not — that asymmetry would
 * leak identity). Instead every abstract is fetched from ONE neutral provider,
 * Europe PMC, keyed only by the paper's PMID/DOI. Papers with no id, or that
 * Europe PMC has no abstract for, get an identical placeholder in the packet.
 *
 * Output: `abstract-cache.json` = { byPmid, byDoi, meta }. The packet builder
 * reads it and renders abstracts from it alone. Re-runnable and idempotent.
 *
 * Usage:
 *   op-run -- tsx eval/literature-search/council/build-abstract-cache.ts \
 *     --run <run-label> [--out abstract-cache.json] [--concurrency 6]
 *
 * (No secret is strictly required — Europe PMC is keyless — but running under
 *  op-run keeps it consistent with the rest of the eval tooling.)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EUROPE_PMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";

function normalizeDoi(doi: string | undefined | null): string | undefined {
  if (!doi) return undefined;
  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .replace(/\s+/g, "");
}

interface Ref {
  pmid?: string;
  doi?: string;
}

function collectIds(runLabel: string): Ref[] {
  const seen = new Set<string>();
  const refs: Ref[] = [];
  const add = (pmid?: string, doi?: string) => {
    const nd = normalizeDoi(doi);
    const key = `${pmid ?? ""}|${nd ?? ""}`;
    if (key === "|" || seen.has(key)) return;
    seen.add(key);
    refs.push({ pmid: pmid || undefined, doi: nd });
  };

  // Manan run (top 10 per query).
  const runDir = join(HERE, "..", "runs", runLabel, "queries");
  if (existsSync(runDir)) {
    for (const f of readdirSync(runDir).filter((x) => x.endsWith(".json"))) {
      const j = JSON.parse(readFileSync(join(runDir, f), "utf8")) as {
        results?: { pmid?: string; doi?: string }[];
      };
      for (const r of (j.results ?? []).slice(0, 10)) add(r.pmid, r.doi);
    }
  }

  // Elicit fixtures (top 10 per query).
  const fixtures = JSON.parse(
    readFileSync(join(HERE, "..", "elicit", "fixtures.json"), "utf8")
  ) as Record<string, { pmid?: string; doi?: string }[]>;
  for (const [id, items] of Object.entries(fixtures)) {
    if (!Array.isArray(items)) continue; // skip _note
    void id;
    for (const r of items.slice(0, 10)) add(r.pmid, r.doi);
  }

  return refs;
}

async function fetchAbstract(ref: Ref): Promise<string | undefined> {
  const queries: string[] = [];
  if (ref.pmid) queries.push(`EXT_ID:${ref.pmid} AND SRC:MED`);
  if (ref.doi) queries.push(`DOI:"${ref.doi}"`);
  for (const q of queries) {
    const url = `${EUROPE_PMC}?query=${encodeURIComponent(q)}&resultType=core&format=json&pageSize=1`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = (await res.json()) as {
        resultList?: { result?: { abstractText?: string }[] };
      };
      const abstract = json.resultList?.result?.[0]?.abstractText;
      if (abstract && abstract.trim()) return abstract.trim();
    } catch {
      // network hiccup — try the next query form / leave uncached (placeholder).
    }
  }
  return undefined;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, i: number) => Promise<R>
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

function parseArgs(argv: string[]) {
  let run = "council-current";
  let out = "abstract-cache.json";
  let concurrency = 6;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--run") run = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--concurrency") concurrency = Number(argv[++i]) || 6;
  }
  return { run, out, concurrency };
}

async function main() {
  const { run, out, concurrency } = parseArgs(process.argv.slice(2));
  const refs = collectIds(run);
  console.log(`[abstract-cache] ${refs.length} unique ids across Manan(${run}) + Elicit fixtures`);

  let found = 0;
  const abstracts = await mapWithConcurrency(refs, concurrency, async (ref, i) => {
    const a = await fetchAbstract(ref);
    if (a) found++;
    if ((i + 1) % 50 === 0) console.log(`[abstract-cache]   ${i + 1}/${refs.length} (${found} found)`);
    return a;
  });

  const byPmid: Record<string, string> = {};
  const byDoi: Record<string, string> = {};
  refs.forEach((ref, i) => {
    const a = abstracts[i];
    if (!a) return;
    if (ref.pmid) byPmid[ref.pmid] = a;
    if (ref.doi) byDoi[ref.doi] = a;
  });

  const outPath = join(HERE, out);
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        meta: {
          source: "europepmc",
          run,
          uniqueIds: refs.length,
          abstractsFound: found,
          generatedAt: new Date().toISOString(),
        },
        byPmid,
        byDoi,
      },
      null,
      2
    )
  );
  console.log(
    `[abstract-cache] wrote ${outPath} — ${found}/${refs.length} abstracts (${Math.round((100 * found) / Math.max(refs.length, 1))}%)`
  );
}

main();
