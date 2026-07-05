/**
 * LLM pre-labeling of the pooled candidates — the "I do the heavy lifting, you spot-check"
 * step of the honest gold set (IMPROVEMENT-PLAN §6). For each query, an LLM grades every
 * pooled document's relevance on a TREC 0-3 scale (0 not / 1 marginal / 2 relevant /
 * 3 highly relevant). Output is a PROVISIONAL gold set a human then ratifies — the labels
 * are a starting point, not the oracle.
 *
 * Uses a DIFFERENT model family than the one that ranks our results (self-preference-bias
 * guard). Reads gold/pool-<tab>.json (from pool-panel.ts); writes gold/labeled-<tab>.json.
 *   op-run -- npx tsx eval/web-search/prelabel.ts [--model x-ai/grok-4]
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export interface LabelDoc {
  url: string;
  title: string;
}

export interface LabeledDoc extends LabelDoc {
  grade: number;
  reason: string;
}

export function buildLabelingPrompt(
  query: string,
  docs: LabelDoc[]
): { system: string; user: string } {
  const system =
    "You grade the relevance of web search results to a query on a 0-3 scale: " +
    "0 = not relevant, 1 = marginally relevant, 2 = relevant, 3 = highly relevant and authoritative. " +
    "Judge each document ONLY by how well its title/URL answers the query. " +
    "Respond with a JSON array of {index, grade, reason}, one entry per document, reason <= 12 words. " +
    "Output JSON only, no prose.";
  const list = docs.map((d, i) => `${i}. ${d.title} — ${d.url}`).join("\n");
  const user = `Query: ${query}\n\nDocuments:\n${list}`;
  return { system, user };
}

/** Tolerant JSON-array extraction: bare array, or one wrapped in prose / ```json fences. */
function tolerantJsonArray(raw: string): unknown[] {
  const trimmed = raw.trim();
  try {
    const v = JSON.parse(trimmed);
    if (Array.isArray(v)) return v;
  } catch {
    // fall through to substring extraction
  }
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start !== -1 && end > start) {
    try {
      const v = JSON.parse(trimmed.slice(start, end + 1));
      if (Array.isArray(v)) return v;
    } catch {
      return [];
    }
  }
  return [];
}

export function parseLabels(raw: string, docs: LabelDoc[]): LabeledDoc[] {
  const arr = tolerantJsonArray(raw);
  const byIndex = new Map<number, { grade: number; reason: string }>();
  for (const item of arr) {
    const rec = item as { index?: unknown; grade?: unknown; reason?: unknown };
    const idx = Number(rec?.index);
    const grade = Number(rec?.grade);
    if (Number.isInteger(idx) && Number.isFinite(grade) && grade >= 0 && grade <= 3) {
      byIndex.set(idx, { grade: Math.round(grade), reason: String(rec?.reason ?? "") });
    }
  }
  return docs.map((d, i) => ({
    url: d.url,
    title: d.title,
    grade: byIndex.get(i)?.grade ?? 0,
    reason: byIndex.get(i)?.reason ?? "unlabeled",
  }));
}

// DeepSeek direct (OpenAI-compatible) is the labeling backend: reliable + very cheap
// (~$0.001/call), and an independent family from anything that ranks our results
// (self-preference-bias guard). Swap via --model / DEEPSEEK_BASE_URL if desired.
async function gradeWithLlm(query: string, docs: LabelDoc[], model: string): Promise<LabeledDoc[]> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY missing — run via op-run --");
  const baseUrl = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";
  const { system, user } = buildLabelingPrompt(query, docs);
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}`);
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = json.choices?.[0]?.message?.content ?? "";
  return parseLabels(raw, docs);
}

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function main() {
  const model = arg("model", "deepseek-chat");
  const goldDir = join(process.cwd(), "eval/web-search/gold");
  const onlyTab = arg("tab", "");
  const tabs = (onlyTab ? [onlyTab] : ["web", "news", "discussions"]).filter(Boolean);

  for (const tab of tabs) {
    const poolFile = join(goldDir, `pool-${tab}.json`);
    if (!existsSync(poolFile)) {
      console.warn(`[prelabel] no pool for ${tab} — run pool-panel.ts first; skipping`);
      continue;
    }
    const rows = JSON.parse(readFileSync(poolFile, "utf-8")) as {
      id: string;
      query: string;
      tab: string;
      pool: LabelDoc[];
    }[];
    const out: unknown[] = [];
    for (const row of rows) {
      const labeled = await gradeWithLlm(row.query, row.pool, model);
      const positives = labeled.filter((l) => l.grade >= 2).length;
      out.push({ id: row.id, query: row.query, tab: row.tab, labeled });
      console.log(`[prelabel] ${tab}/${row.id}: ${labeled.length} graded, ${positives} relevant (grade>=2)`);
    }
    const file = join(goldDir, `labeled-${tab}.json`);
    writeFileSync(file, JSON.stringify(out, null, 2));
    console.log(`[prelabel] wrote ${out.length} queries → ${file}`);
  }
  console.log(`\n[prelabel] provisional gold set ready (model=${model}). Spot-check the grades, then adjust.`);
}

if (process.argv[1] && process.argv[1].endsWith("prelabel.ts")) {
  main().then(() => process.exit(0)).catch((e) => {
    console.error("[prelabel] fatal:", e);
    process.exit(1);
  });
}
