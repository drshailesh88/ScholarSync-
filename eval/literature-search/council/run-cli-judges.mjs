/**
 * Run the BLINDED council judges via LOCAL subscriptions instead of OpenRouter:
 *   - codex   : `codex exec` (Codex subscription), prompt on stdin
 *   - grok    : `grok -p`     (SuperGrok OAuth),    prompt as arg
 *   - deepseek: api.deepseek.com (vault key) — also the Grok fallback judge
 *
 * Each judge sees ONLY the blinded PACKET.md (Engine A vs Engine B), returns the
 * strict {perQuery, overall} JSON. We extract + validate it and write
 * <dir>/<judge>.json, which `aggregate-blinded.ts` then de-anonymizes via key.json.
 *
 * Usage: op-run -- node eval/literature-search/council/run-cli-judges.mjs --dir <cycle-dir> [--judges codex,grok,deepseek]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));

const INSTRUCTION =
  "You are an impartial, BLINDED judge in a literature-search bake-off. The blinded comparison " +
  "packet follows. It contains a scoring rubric and a STRICT JSON output format. For EVERY query " +
  "in the packet, score Engine A and Engine B 0-5 on the six dimensions (recall, ranking, metadata, " +
  "clinical_relevance, explanation, trust), pick a per-query winner (\"A\"|\"B\"|\"tie\") with a " +
  "one-sentence note, then give an overall winner. You do NOT know which engine is which; do not guess. " +
  "Respond with ONLY the JSON object exactly matching the packet schema (keys \"perQuery\" and " +
  "\"overall\"). No prose, no markdown code fences. Keep each note under 12 words.";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
}

/** Extract the last balanced top-level JSON object from noisy CLI output. */
function extractJson(text) {
  const end = text.lastIndexOf("}");
  if (end === -1) throw new Error("no closing brace");
  let depth = 0;
  for (let i = end; i >= 0; i--) {
    const c = text[i];
    if (c === "}") depth++;
    else if (c === "{") {
      depth--;
      if (depth === 0) return JSON.parse(text.slice(i, end + 1));
    }
  }
  throw new Error("no balanced JSON object");
}

function run(cmd, args, { input, timeoutMs = 900000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "ignore"] });
    let out = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`${cmd} timed out after ${timeoutMs}ms`));
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
    if (input !== undefined) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
}

async function judgeCodex(prompt) {
  return run("codex", ["exec", "--skip-git-repo-check"], { input: prompt });
}

async function judgeGrok(prompt) {
  return run("grok", ["-p", prompt, "--disable-web-search"]);
}

async function judgeDeepseek(packet, model = "deepseek-v4-pro") {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY missing (run via op-run)");
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 8192,
      messages: [
        { role: "system", content: INSTRUCTION },
        { role: "user", content: packet },
      ],
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function main() {
  const dir = arg("dir");
  if (!dir) {
    console.error("need --dir <cycle-dir>");
    process.exit(2);
  }
  const judges = (arg("judges", "codex,grok,deepseek")).split(",").map((s) => s.trim());
  const cycleDir = join(HERE, dir);
  const packet = readFileSync(join(cycleDir, "PACKET.md"), "utf8");
  const prompt = `${INSTRUCTION}\n\n${packet}`;

  const runners = {
    codex: () => judgeCodex(prompt),
    grok: () => judgeGrok(prompt),
    deepseek: () => judgeDeepseek(packet),
  };

  await Promise.all(
    judges.map(async (j) => {
      const t0 = Date.now();
      try {
        const raw = await runners[j]();
        writeFileSync(join(cycleDir, `${j}.raw.txt`), raw);
        const verdict = extractJson(raw);
        const n = verdict.perQuery?.length ?? 0;
        writeFileSync(join(cycleDir, `${j}.json`), JSON.stringify(verdict, null, 2));
        console.log(
          `[judge:${j}] OK — ${n} queries scored, overall=${verdict.overall?.winner ?? "?"} (${Math.round((Date.now() - t0) / 1000)}s)`
        );
      } catch (e) {
        console.error(`[judge:${j}] FAILED: ${e.message} (${Math.round((Date.now() - t0) / 1000)}s)`);
      }
    })
  );
  console.log(`[council] judges done → ${cycleDir}/{judge}.json`);
}

main().catch((e) => {
  console.error("[council] fatal:", e);
  process.exit(1);
});
