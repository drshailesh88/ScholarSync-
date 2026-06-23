/**
 * Freeze the upstream candidate POOL per benchmark query, ONCE, so ranking-stage
 * changes can be evaluated deterministically (offline, no network) and councils
 * can be PAIRED (old ranker vs new ranker on the identical pool).
 *
 * Why this exists: the live eval (`run.ts`) hits PubMed/OpenAlex/Cohere, so two
 * runs differ even on queries a code change never touches (transient throttling,
 * pool drift). That makes per-cycle keep/revert on the aggregate unsound (a
 * cycle-3 run showed ±8pt phantom swings that recovered on re-run). Capturing the
 * enriched pre-ranking pool removes the retrieval noise for ranking cycles.
 *
 * Usage:
 *   op-run -- npx tsx eval/literature-search/capture-candidates.ts --label pool-A
 *   op-run -- npx tsx eval/literature-search/capture-candidates.ts --label pool-A --only acronym-sprint,broad-hfref-management
 *   → writes eval/literature-search/runs/<label>/candidates/<id>.json
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BENCHMARK_QUERIES } from "./queries";
import { runLiteratureSearch } from "@/lib/search/run-search";

const HERE = dirname(fileURLToPath(import.meta.url));
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function loadEnv(): void {
  for (const f of [".env.local", ".env"]) {
    try {
      (process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile(
        join(process.cwd(), f)
      );
    } catch {
      /* env file absent — providers fall back to keyless/public access */
    }
  }
}

function parseArgs(argv: string[]): { label: string; only?: string[] } {
  let label = "pool";
  let only: string[] | undefined;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--label") label = argv[++i];
    else if (argv[i] === "--only") only = argv[++i].split(",").map((s) => s.trim());
  }
  return { label, only };
}

async function main() {
  loadEnv();
  const { label, only } = parseArgs(process.argv.slice(2));
  const selected = only
    ? BENCHMARK_QUERIES.filter((q) => only.includes(q.id))
    : BENCHMARK_QUERIES;
  if (selected.length === 0) {
    console.error("No queries selected. Check --only ids.");
    process.exit(1);
  }

  const outDir = join(HERE, "runs", label, "candidates");
  mkdirSync(outDir, { recursive: true });
  console.log(`[capture] label=${label} queries=${selected.length}`);

  let ok = 0;
  for (const q of selected) {
    try {
      const res = await runLiteratureSearch({
        query: q.query,
        perPage: 10,
        includeRawCandidates: true,
      });
      const candidates = res.rawCandidates ?? [];
      writeFileSync(
        join(outDir, `${q.id}.json`),
        JSON.stringify(
          { id: q.id, query: q.query, recency: res.plan.recency, candidates },
          null,
          2
        )
      );
      ok++;
      const zero = candidates.length === 0 ? " [EMPTY POOL]" : "";
      console.log(`  ✓ ${q.id.padEnd(34)} pool=${String(candidates.length).padStart(3)}${zero}`);
    } catch (e) {
      console.log(`  ✗ ${q.id.padEnd(34)} ${e instanceof Error ? e.message : e}`);
    }
    await sleep(700); // be gentle on keyless PubMed (3 req/s)
  }
  console.log(`\n[capture] froze ${ok}/${selected.length} pools → ${outDir}`);
}

main().catch((err) => {
  console.error("[capture] fatal:", err);
  process.exit(1);
});
