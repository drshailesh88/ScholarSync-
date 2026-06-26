/**
 * Run ONE blinded web-council judge via OpenRouter (cross-family third seat:
 * Grok → DeepSeek → Gemini). Sends the blinded packet as the user message at
 * temperature 0 and writes the raw reply; aggregate-blinded.ts validates the JSON.
 *
 * Reads OPENROUTER_API_KEY from env (inject via `op-run --`).
 *
 * Usage:
 *   op-run -- node eval/web-search/council/openrouter-judge.mjs \
 *     --model x-ai/grok-4 --packet eval/web-search/council/baseline/PACKET.md \
 *     --out eval/web-search/council/baseline/grok.json
 *   # --list → print available grok/deepseek/gemini model ids and exit
 */
import { readFileSync, writeFileSync } from "node:fs";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
}

const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) {
  console.error("OPENROUTER_API_KEY missing — run via `op-run --`.");
  process.exit(2);
}

const INSTRUCTION =
  "You are an impartial, BLINDED judge in a web-search bake-off. The blinded comparison packet follows. " +
  "It contains a per-tab scoring rubric and a STRICT JSON output format. For EVERY query in the packet, " +
  "apply that query's tab rubric, score Engine A and Engine B 0-5 on the six dimensions (relevance, " +
  "authority, recency, diversity, dedup, usefulness), pick a per-query winner (\"A\"|\"B\"|\"tie\") with a " +
  "one-sentence note, then give an overall winner. You do NOT know which engine is which; do not guess. " +
  "Respond with ONLY the JSON object exactly matching the packet schema (keys \"perQuery\" and \"overall\"). " +
  "No prose, no markdown code fences.";

async function listModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models", { headers: { Authorization: `Bearer ${KEY}` } });
  const data = await res.json();
  console.log((data.data ?? []).map((m) => m.id).filter((id) => /grok|deepseek|gemini/i.test(id)).sort().join("\n"));
}

async function judge() {
  const model = arg("model", "x-ai/grok-4");
  const packetPath = arg("packet");
  const outPath = arg("out");
  if (!packetPath || !outPath) {
    console.error("need --packet and --out");
    process.exit(2);
  }
  const packet = readFileSync(packetPath, "utf8");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 32000,
      messages: [
        { role: "system", content: INSTRUCTION },
        { role: "user", content: packet },
      ],
    }),
  });
  if (!res.ok) {
    console.error(`OpenRouter HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  if (!text) {
    console.error(`empty content; raw: ${JSON.stringify(data).slice(0, 300)}`);
    process.exit(1);
  }
  writeFileSync(outPath, text);
  console.log(`[openrouter-judge] model=${model} wrote ${outPath} (${text.length} chars)`);
}

if (process.argv.includes("--list")) await listModels();
else await judge();
