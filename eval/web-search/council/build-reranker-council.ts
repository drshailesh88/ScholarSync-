/**
 * WEB-COUNCIL-3 — blinded A/B for the semantic reranker: ours-WITH-reranker
 * (bge-reranker-v2-m3 via WEB_RERANK_URL) vs ours-WITHOUT, on the SAME frozen
 * web+news pools. Identical input pool → the only difference is the cross-encoder
 * reorder, so the A/B isolates the reranker exactly. Blinding-safe (both arms from
 * the identical pipeline + row format).
 *
 * The deterministic gate is set-based and ordering-blind (a reorder can only evict
 * gold from the top-10 in its eyes), so it CANNOT credit a better ordering — only a
 * council that reads the lists can. WEB_RERANK_URL is toggled in-process (it is a
 * non-secret public Modal endpoint); run with COHERE/MEDCPT unset so the ONLY
 * reranker in play is the self-hosted web cross-encoder.
 *
 *   env -u COHERE_API_KEY -u MEDCPT_RERANK_URL \
 *     npx tsx eval/web-search/council/build-reranker-council.ts --out WEB-COUNCIL-3 --salt webcouncil3
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "../queries";
import { cacheKey } from "../capture-searxng";
import { applyQualityLayer, toPacketRows } from "../quality";
import { diversifyForTab } from "@/lib/search/diversity";
import type { WebBenchmarkQuery, CommonRow } from "../types";
import type { UnifiedSearchResult } from "@/types/search";
import { buildPacket, type EnginePair } from "./build-blinded-packet";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, "..", "cache");
const WEB_RERANK_URL = "https://shailesh-greatest--manan-web-reranker-webreranker-rerank.modal.run";

async function pipeline(query: string, pool: UnifiedSearchResult[], tab: "web" | "news"): Promise<CommonRow[]> {
  const ranked = await applyQualityLayer(query, pool);
  const diversified = diversifyForTab(ranked, tab);
  return toPacketRows(diversified);
}

function parseArgs(argv: string[]): { out: string; salt: string } {
  let out = "WEB-COUNCIL-3";
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
    const path = join(CACHE, cacheKey(q.tab, q.query));
    if (!existsSync(path)) {
      console.log(`  ✗ ${q.id} — no frozen pool, skipped`);
      continue;
    }
    const pool = (JSON.parse(readFileSync(path, "utf8")) as { results: UnifiedSearchResult[] }).results;
    const tab = q.tab as "web" | "news";

    // Control: no reranker in play.
    delete process.env.WEB_RERANK_URL;
    const control = await pipeline(q.query, pool, tab);

    // Treatment: self-hosted web cross-encoder ON.
    process.env.WEB_RERANK_URL = WEB_RERANK_URL;
    const treatment = await pipeline(q.query, pool, tab);
    delete process.env.WEB_RERANK_URL;

    const changed = treatment.some((r, i) => r.url !== control[i]?.url);
    queriesById.set(q.id, q);
    // "ours" = with-reranker (treatment); "exa" = without (control).
    pairs.push({ id: q.id, tab: q.tab, ours: treatment, exa: control });
    console.log(`  ✓ ${q.id.padEnd(30)} ${tab}  reorder=${changed ? "YES" : "none"}`);
  }

  const { packet, key } = buildPacket({ pairs, queriesById, salt });
  const outDir = join(HERE, out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "PACKET.md"), packet);
  writeFileSync(
    join(outDir, "key.json"),
    JSON.stringify({ run: "reranker-ab", salt, generatedFrom: "build-reranker-council.ts", legend: { ours: "with-reranker", exa: "without-reranker" }, aIs: key }, null, 2),
  );
  writeFileSync(join(outDir, "queries.json"), JSON.stringify([...queriesById.values()], null, 2));
  console.log(`\n[reranker-council] wrote ${join(outDir, "PACKET.md")} (${pairs.length} queries, salt=${salt})`);
  console.log(`[reranker-council] key.json legend: ours=with-reranker, exa=without-reranker — KEEP FROM JUDGES`);
}

main().catch((e) => {
  console.error("[reranker-council] fatal:", e);
  process.exit(1);
});
