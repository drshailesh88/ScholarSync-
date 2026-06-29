/**
 * WEB-COUNCIL-5 (CYCLE 7) — blinded A/B that reframes the Exa comparison now that
 * Exa is IN our pool: ours-FUSION (full federation incl. Exa → quality + web
 * reranker + diversity, the production web/news arm) vs RAW standalone Exa. The
 * question is no longer "do we match Exa" but "does our fusion + dedup + rerank
 * ADD VALUE over just reselling Exa" — if treatment can't beat raw Exa, the
 * keyword engines are diluting Exa and Exa's weight (or our blend) is wrong.
 *
 * Live capture: Exa is new, so there is no frozen pool — both arms hit the live
 * sources. Treatment runs the SAME pipeline production serves with the key flipped
 * (WEB_RERANK_URL on; MEDCPT/COHERE off so the only reranker is the web
 * cross-encoder). Control is Exa's raw top-10 order, untouched. buildPacket
 * randomizes Engine A/B per query via sha1(salt:id); key.json is withheld.
 *
 *   op-run -- env -u MEDCPT_RERANK_URL -u COHERE_API_KEY \
 *     npx tsx eval/web-search/council/build-exa-council.ts --out WEB-COUNCIL-5 --salt webcouncil5
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "../queries";
import { federateWith, SOURCES_BY_TAB } from "@/lib/search/web/federate";
import { searchExa } from "@/lib/search/sources/exa";
import { applyQualityLayer, toPacketRows } from "../quality";
import { diversifyForTab } from "@/lib/search/diversity";
import type { WebBenchmarkQuery, CommonRow } from "../types";
import { buildPacket, type EnginePair } from "./build-blinded-packet";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_RERANK_URL = "https://shailesh-greatest--manan-web-reranker-webreranker-rerank.modal.run";

/** Production web/news arm: federate everything → trust + web rerank → diversify. */
async function fusionRows(query: string, tab: "web" | "news"): Promise<{ rows: CommonRow[]; exaCount: number; poolSize: number }> {
  const fed = await federateWith(query, tab, SOURCES_BY_TAB[tab], { limit: 30, timeoutMs: 15000 });
  process.env.WEB_RERANK_URL = WEB_RERANK_URL;
  const ranked = await applyQualityLayer(query, fed.results);
  delete process.env.WEB_RERANK_URL;
  const diversified = diversifyForTab(ranked, tab);
  const exaCount = fed.perSource.find((s) => s.id === "exa")?.count ?? 0;
  return { rows: toPacketRows(diversified), exaCount, poolSize: fed.results.length };
}

/** Control: raw standalone Exa, exactly as Exa ranks it. */
async function rawExaRows(query: string, tab: "web" | "news"): Promise<CommonRow[]> {
  const { results } = await searchExa(query, { tab, limit: 10 });
  return toPacketRows(results);
}

function parseArgs(argv: string[]): { out: string; salt: string } {
  let out = "WEB-COUNCIL-5";
  let salt = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") out = argv[++i];
    else if (argv[i] === "--salt") salt = argv[++i];
  }
  return { out, salt: salt || out };
}

async function main() {
  const { out, salt } = parseArgs(process.argv.slice(2));
  const queriesById = new Map<string, WebBenchmarkQuery>();
  const pairs: EnginePair[] = [];

  const targets = BENCHMARK_QUERIES.filter((q) => q.tab === "web" || q.tab === "news");
  for (const q of targets) {
    const tab = q.tab as "web" | "news";
    const treatment = await fusionRows(q.query, tab);
    const control = await rawExaRows(q.query, tab);
    if (treatment.rows.length === 0 || control.length === 0) {
      console.log(`  ✗ ${q.id.padEnd(30)} ${tab}  empty arm (t=${treatment.rows.length} c=${control.length}) — skipped`);
      continue;
    }
    queriesById.set(q.id, q);
    // "ours" = fusion incl. Exa (treatment); "exa" = raw standalone Exa (control).
    pairs.push({ id: q.id, tab: q.tab, ours: treatment.rows, exa: control });
    console.log(
      `  ✓ ${q.id.padEnd(30)} ${tab}  exaInPool=${treatment.exaCount} pool=${treatment.poolSize}  (t=${treatment.rows.length} c=${control.length})`,
    );
  }

  const { packet, key } = buildPacket({ pairs, queriesById, salt });
  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), packet);
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify(
      { run: "exa-ab", salt, generatedFrom: "build-exa-council.ts", legend: { ours: "fusion+rerank (incl exa)", exa: "raw exa" }, aIs: key },
      null,
      2,
    ),
  );
  writeFileSync(join(outDir, "queries.json"), JSON.stringify([...queriesById.values()], null, 2));
  console.log(`\n[exa-council] wrote ${join(outDir, "PACKET.md")} (${pairs.length} queries, salt=${salt})`);
  console.log(`[exa-council] key.json legend: ours=fusion+rerank(incl exa), exa=raw exa — KEEP FROM JUDGES`);
}

main().catch((e) => {
  console.error("[exa-council] fatal:", e);
  process.exit(1);
});
