/**
 * Codex council judge, CHUNKED — the full blinded packet (~93K tokens) makes
 * `codex exec` run agentic and blow past its timeout, so we split the packet
 * into batches of query sections (rubric/schema header prepended to each batch),
 * judge each batch with its own `codex exec` call, and merge the perQuery
 * verdicts into one <judge>.json. `aggregate-blinded.ts` then de-anonymizes.
 *
 * Usage: node eval/literature-search/council/codex-chunked.mjs --dir <cycle-dir> [--chunk 22] [--timeout 360] [--out codex]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));

const INSTRUCTION =
  "You are an impartial, BLINDED judge in a literature-search bake-off. The blinded comparison " +
  "packet section follows (rubric + a subset of queries). For EVERY query shown, score Engine A and " +
  "Engine B 0-5 on the six dimensions (recall, ranking, metadata, clinical_relevance, explanation, " +
  "trust), pick a per-query winner (\"A\"|\"B\"|\"tie\") with a note under 12 words. You do NOT know " +
  "which engine is which; do not guess. Do NOT read files, run commands, or use tools — judge ONLY " +
  "from the text below. Respond with ONLY a JSON object {\"perQuery\":[...]} for the queries in THIS " +
  "section. No prose, no markdown fences.";

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

function runCodex(prompt, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn("codex", ["exec", "--skip-git-repo-check"], {
      stdio: ["pipe", "pipe", "ignore"],
    });
    let out = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`codex timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    child.stdout.on("data", (d) => (out += d));
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    child.on("close", () => {
      clearTimeout(timer);
      resolve(out);
    });
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

async function main() {
  const dir = arg("dir");
  const chunkSize = parseInt(arg("chunk", "22"), 10);
  const timeoutMs = parseInt(arg("timeout", "360"), 10) * 1000;
  const outName = arg("out", "codex");
  if (!dir) {
    console.error("need --dir");
    process.exit(2);
  }
  const cycleDir = join(HERE, dir);
  const packet = readFileSync(join(cycleDir, "PACKET.md"), "utf8");

  const firstQ = packet.indexOf("\n## Query:");
  const header = packet.slice(0, firstQ);
  const blocks = packet.slice(firstQ).split(/\n(?=## Query:)/).filter((b) => b.trim());

  const chunks = [];
  for (let i = 0; i < blocks.length; i += chunkSize) {
    chunks.push(blocks.slice(i, i + chunkSize));
  }
  console.log(`[codex-chunked] ${blocks.length} queries → ${chunks.length} chunks of ≤${chunkSize}`);

  const allPerQuery = [];
  for (let c = 0; c < chunks.length; c++) {
    const prompt = `${INSTRUCTION}\n\n${header}\n${chunks[c].join("\n")}`;
    let ok = false;
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      try {
        const raw = await runCodex(prompt, timeoutMs);
        writeFileSync(join(cycleDir, `${outName}.chunk${c + 1}.raw.txt`), raw);
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

  const tally = { A: 0, B: 0, tie: 0 };
  for (const q of allPerQuery) tally[q.winner] = (tally[q.winner] ?? 0) + 1;
  const overallWinner = tally.A === tally.B ? "tie" : tally.A > tally.B ? "A" : "B";
  const verdict = {
    perQuery: allPerQuery,
    overall: {
      winner: overallWinner,
      summary: `A:${tally.A} B:${tally.B} tie:${tally.tie} across ${allPerQuery.length} queries`,
    },
  };
  writeFileSync(join(cycleDir, `${outName}.json`), JSON.stringify(verdict, null, 2));
  console.log(`[codex-chunked] wrote ${outName}.json — ${allPerQuery.length} queries, overall=${overallWinner}`);
}

main().catch((e) => {
  console.error("[codex-chunked] fatal:", e);
  process.exit(1);
});
