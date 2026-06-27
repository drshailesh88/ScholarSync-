/**
 * DeepSeek council judge, CHUNKED — the Grok fallback when Grok throws fits.
 *
 * The full blinded packet (~93K tokens) overflows DeepSeek's context in one shot,
 * so we split it into batches of query sections (the rubric/schema header is
 * prepended to each batch), judge each batch, and merge the perQuery verdicts into
 * one <judge>.json. Each batch is small enough to fit context AND output.
 *
 * Usage: op-run -- node eval/literature-search/council/deepseek-chunked.mjs --dir <cycle-dir> [--chunk 22] [--model deepseek-v4-flash] [--out deepseek]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

const INSTRUCTION =
  "You are an impartial, BLINDED judge in a literature-search bake-off. The blinded comparison " +
  "packet section follows (rubric + a subset of queries). For EVERY query shown, score Engine A and " +
  "Engine B 0-5 on the six dimensions (recall, ranking, metadata, clinical_relevance, explanation, " +
  "trust), pick a per-query winner (\"A\"|\"B\"|\"tie\") with a note under 12 words. You do NOT know " +
  "which engine is which; do not guess. Respond with ONLY a JSON object {\"perQuery\":[...]} for the " +
  "queries in THIS section. No prose, no markdown fences.";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
}

function extractJson(text) {
  const end = text.lastIndexOf("}");
  if (end === -1) throw new Error("no closing brace");
  let depth = 0;
  for (let i = end; i >= 0; i--) {
    if (text[i] === "}") depth++;
    else if (text[i] === "{") {
      depth--;
      if (depth === 0) return JSON.parse(text.slice(i, end + 1));
    }
  }
  throw new Error("no balanced JSON");
}

async function callDeepseek(content, model) {
  const key = process.env.DEEPSEEK_API_KEY;
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 8192,
      messages: [
        { role: "system", content: INSTRUCTION },
        { role: "user", content },
      ],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function main() {
  const dir = arg("dir");
  const chunkSize = parseInt(arg("chunk", "22"), 10);
  const model = arg("model", "deepseek-v4-flash");
  const outName = arg("out", "deepseek");
  if (!dir) {
    console.error("need --dir");
    process.exit(2);
  }
  const cycleDir = join(HERE, dir);
  const packet = readFileSync(join(cycleDir, "PACKET.md"), "utf8");

  // Split off the rubric/schema header, then the per-query sections.
  const firstQ = packet.indexOf("\n## Query:");
  const header = packet.slice(0, firstQ);
  const blocks = packet.slice(firstQ).split(/\n(?=## Query:)/).filter((b) => b.trim());

  const chunks = [];
  for (let i = 0; i < blocks.length; i += chunkSize) {
    chunks.push(blocks.slice(i, i + chunkSize));
  }
  console.log(`[deepseek-chunked] ${blocks.length} queries → ${chunks.length} chunks of ≤${chunkSize}`);

  const allPerQuery = [];
  for (let c = 0; c < chunks.length; c++) {
    const content = `${header}\n${chunks[c].join("\n")}`;
    let ok = false;
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      try {
        const raw = await callDeepseek(content, model);
        const v = extractJson(raw);
        const pq = v.perQuery ?? [];
        allPerQuery.push(...pq);
        console.log(`  chunk ${c + 1}/${chunks.length}: ${pq.length} scored`);
        ok = true;
      } catch (e) {
        console.error(`  chunk ${c + 1} attempt ${attempt} failed: ${e.message}`);
      }
    }
  }

  // Synthesize an overall from the per-query winners.
  const tally = { A: 0, B: 0, tie: 0 };
  for (const q of allPerQuery) tally[q.winner] = (tally[q.winner] ?? 0) + 1;
  const overallWinner = tally.A === tally.B ? "tie" : tally.A > tally.B ? "A" : "B";
  const verdict = {
    perQuery: allPerQuery,
    overall: { winner: overallWinner, summary: `A:${tally.A} B:${tally.B} tie:${tally.tie} across ${allPerQuery.length} queries` },
  };
  writeFileSync(join(cycleDir, `${outName}.json`), JSON.stringify(verdict, null, 2));
  console.log(`[deepseek-chunked] wrote ${outName}.json — ${allPerQuery.length} queries, overall=${overallWinner}`);
}

main().catch((e) => {
  console.error("[deepseek-chunked] fatal:", e);
  process.exit(1);
});
