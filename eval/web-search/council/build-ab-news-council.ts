/**
 * WEB-COUNCIL-2 — blinded A/B for the news tab: ours-WITH-NewsData (treatment)
 * vs ours-WITHOUT (control), on CURRENTLY-TRENDING queries captured live.
 *
 * Why a bespoke builder: the deterministic harness is relevance-blind and the
 * frozen benchmark can't credit a recency-first source (NewsData returns fresh
 * articles, never the months-old gold). Only a council that READS the result
 * lists can judge whether NewsData's fresh on-topic rows actually help. Both arms
 * come from the SAME pipeline (identical row format) → naturally blinding-safe,
 * no Exa, no fingerprintable field-parity gap.
 *
 *   op-run -- env -u MEDCPT_RERANK_URL -u COHERE_API_KEY \
 *     npx tsx eval/web-search/council/build-ab-news-council.ts --out WEB-COUNCIL-2 --salt webcouncil2
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { federateWith, SOURCES_BY_TAB } from "@/lib/search/web/federate";
import { applyQualityLayer, toPacketRows } from "../quality";
import { diversifyForTab } from "@/lib/search/diversity";
import type { WebBenchmarkQuery, CommonRow } from "../types";
import { buildPacket, type EnginePair } from "./build-blinded-packet";

const HERE = dirname(fileURLToPath(import.meta.url));

const TRENDING: Array<{ id: string; query: string }> = [
  { id: "trend-fed-rates", query: "Federal Reserve interest rate decision" },
  { id: "trend-h5n1", query: "H5N1 bird flu outbreak" },
  { id: "trend-ai-regulation", query: "artificial intelligence regulation" },
  { id: "trend-ozempic", query: "Ozempic weight loss drug" },
  { id: "trend-gaza-ceasefire", query: "Israel Gaza ceasefire" },
  { id: "trend-scotus", query: "Supreme Court ruling" },
  { id: "trend-climate", query: "climate change policy" },
  { id: "trend-markets", query: "stock market today" },
];

const newsSources = SOURCES_BY_TAB.news;
const controlSources = newsSources.filter((s) => s.id !== "newsdata");

async function topRows(query: string, sources: typeof newsSources): Promise<{ rows: CommonRow[]; nd: number }> {
  const fed = await federateWith(query, "news", sources, { limit: 30, timeoutMs: 12000 });
  const ranked = await applyQualityLayer(query, fed.results);
  const diversified = diversifyForTab(ranked, "news");
  const nd = fed.perSource.find((s) => s.id === "newsdata")?.count ?? 0;
  return { rows: toPacketRows(diversified), nd };
}

function parseArgs(argv: string[]): { out: string; salt: string } {
  let out = "WEB-COUNCIL-2";
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

  for (const { id, query } of TRENDING) {
    const treatment = await topRows(query, newsSources);
    const control = await topRows(query, controlSources);
    queriesById.set(id, {
      id,
      tab: "news",
      queryClass: "recency",
      query,
      intent: "currently-trending news",
      recencyBiased: true,
      mustHaves: [],
    });
    // "ours" = treatment (with NewsData); "exa" = control (without). buildPacket
    // randomizes which is shown as Engine A/B per query via sha1(salt:id).
    pairs.push({ id, tab: "news", ours: treatment.rows, exa: control.rows });
    console.log(`  ✓ ${id.padEnd(22)} treatment newsdata=${treatment.nd}  (t=${treatment.rows.length} rows, c=${control.rows.length} rows)`);
  }

  const { packet, key } = buildPacket({ pairs, queriesById, salt });

  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), packet);
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify({ run: "ab-news-newsdata", salt, generatedFrom: "build-ab-news-council.ts", legend: { ours: "with-newsdata", exa: "without-newsdata" }, aIs: key }, null, 2),
  );
  writeFileSync(
    join(outDir, "queries.json"),
    JSON.stringify([...queriesById.values()], null, 2),
  );
  console.log(`\n[ab-council] wrote ${join(outDir, "PACKET.md")} (${pairs.length} queries, salt=${salt})`);
  console.log(`[ab-council] key.json legend: ours=with-newsdata, exa=without-newsdata — KEEP FROM JUDGES`);
}

main().catch((e) => {
  console.error("[ab-council] fatal:", e);
  process.exit(1);
});
