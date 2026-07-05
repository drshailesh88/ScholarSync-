/**
 * The honest deterministic gate: score our LIVE ranking against the ratified graded gold
 * set with ordering-aware metrics (IMPROVEMENT-PLAN §6). No LLM, no single-opponent
 * tautology — just our results vs human-ratified 0-3 labels pooled across an engine panel.
 *
 *   op-run -- npx tsx eval/web-search/score-gold.ts
 *
 * Run pool-panel.ts + prelabel.ts (and ratify) first. Numbers are only meaningful once
 * the gold set is ratified; before that this reports against the provisional labels.
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { federateNonAcademic, type FederatedTab } from "@/lib/search/web/federate";
import { canonicalUrl } from "./metrics";
import { gradedNdcgAtK, err, rbp, goldMapFromLabeled } from "./graded-metrics";

interface LabeledRow {
  id: string;
  query: string;
  tab: string;
  labeled: { url: string; grade: number }[];
}

async function main() {
  const goldDir = join(process.cwd(), "eval/web-search/gold");
  const tabs: FederatedTab[] = ["web", "news", "discussions"];

  for (const tab of tabs) {
    const file = join(goldDir, `labeled-${tab}.json`);
    if (!existsSync(file)) {
      console.warn(`[gold] no labeled set for ${tab} — run prelabel.ts first; skipping`);
      continue;
    }
    const rows = JSON.parse(readFileSync(file, "utf-8")) as LabeledRow[];
    const per: { ndcg: number; err: number; rbp: number }[] = [];

    for (const row of rows) {
      const fed = await federateNonAcademic(row.query, tab, { limit: 20 });
      const ranked = fed.results
        .map((r) => (r.url ? canonicalUrl(r.url) : ""))
        .filter(Boolean);
      const gold = goldMapFromLabeled(row.labeled);
      const ndcg = gradedNdcgAtK(ranked, gold, 10);
      const e = err(ranked, gold, 10);
      const r = rbp(ranked, gold, 0.8);
      per.push({ ndcg, err: e, rbp: r });
      console.log(`[gold] ${tab}/${row.id}: nDCG@10=${ndcg.toFixed(3)} ERR=${e.toFixed(3)} RBP=${r.toFixed(3)}`);
    }

    const avg = (k: "ndcg" | "err" | "rbp") =>
      per.length ? (per.reduce((s, x) => s + x[k], 0) / per.length).toFixed(3) : "n/a";
    console.log(`[gold] ${tab} AVG: nDCG@10=${avg("ndcg")} ERR=${avg("err")} RBP=${avg("rbp")}\n`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("score-gold.ts")) {
  main().then(() => process.exit(0)).catch((e) => {
    console.error("[gold] fatal:", e);
    process.exit(1);
  });
}
