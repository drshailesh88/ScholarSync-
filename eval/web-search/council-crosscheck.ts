/**
 * Blinded council semantic cross-check (IMPROVEMENT-PLAN §6).
 *
 * The deterministic gate (score-gold.ts) scores our LIVE ranking against the ratified
 * gold labels — fast, cheap, but only as good as the labels. This is the semantic
 * cross-check: an ENSEMBLE of independent-family judges (different model providers, to
 * dodge self-preference bias) independently grade our live top-k per gold query. High
 * ensemble median = our ranking surfaces genuinely relevant results; high inter-judge
 * agreement = the verdict is trustworthy. Run AFTER ratification, as a sanity layer over
 * the deterministic gate — not every commit.
 *
 *   op-run -- npx tsx eval/web-search/council-crosscheck.ts   # needs OpenRouter credits
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { federateNonAcademic, type FederatedTab } from "@/lib/search/web/federate";
import { buildLabelingPrompt, parseLabels, type LabelDoc } from "./prelabel";

export interface JudgeResult {
  model: string;
  grades: number[];
}

export function aggregateJudgeGrades(
  perJudge: JudgeResult[],
  topK?: number
): { medianByDoc: number[]; meanTopGrade: number } {
  const nDocs = perJudge[0]?.grades.length ?? 0;
  const medianByDoc: number[] = [];
  for (let i = 0; i < nDocs; i++) {
    const votes = perJudge.map((p) => p.grades[i] ?? 0).sort((a, b) => a - b);
    medianByDoc.push(votes.length ? votes[Math.floor(votes.length / 2)] : 0);
  }
  const top = topK ? medianByDoc.slice(0, topK) : medianByDoc;
  const meanTopGrade = top.length ? top.reduce((s, g) => s + g, 0) / top.length : 0;
  return { medianByDoc, meanTopGrade };
}

/** Inter-judge agreement: 1 − mean normalized pairwise grade distance (0-3 → /3). */
export function judgeAgreement(perJudge: JudgeResult[]): number {
  if (perJudge.length < 2) return 1;
  const nDocs = perJudge[0]?.grades.length ?? 0;
  if (nDocs === 0) return 1;
  let totalDist = 0;
  let comparisons = 0;
  for (let i = 0; i < perJudge.length; i++) {
    for (let j = i + 1; j < perJudge.length; j++) {
      for (let d = 0; d < nDocs; d++) {
        totalDist += Math.abs((perJudge[i].grades[d] ?? 0) - (perJudge[j].grades[d] ?? 0)) / 3;
        comparisons++;
      }
    }
  }
  return comparisons ? 1 - totalDist / comparisons : 1;
}

const JUDGES = [
  "deepseek/deepseek-v3.2",
  "google/gemini-2.5-flash-lite-preview-09-2025",
  "meta-llama/llama-3.3-70b-instruct",
];

async function gradeWithJudge(query: string, docs: LabelDoc[], model: string): Promise<number[]> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY missing — run via op-run --");
  const { system, user } = buildLabelingPrompt(query, docs);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
  if (!res.ok) throw new Error(`OpenRouter HTTP ${res.status} (${model})`);
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return parseLabels(json.choices?.[0]?.message?.content ?? "", docs).map((l) => l.grade);
}

async function main() {
  const goldDir = join(process.cwd(), "eval/web-search/gold");
  const tabs: FederatedTab[] = ["web", "news", "discussions"];

  for (const tab of tabs) {
    const file = join(goldDir, `labeled-${tab}.json`);
    if (!existsSync(file)) {
      console.warn(`[council] no labeled set for ${tab}; skipping`);
      continue;
    }
    const rows = JSON.parse(readFileSync(file, "utf-8")) as { id: string; query: string }[];
    const tabScores: number[] = [];

    for (const row of rows) {
      const fed = await federateNonAcademic(row.query, tab, { limit: 10 });
      const docs: LabelDoc[] = fed.results
        .slice(0, 10)
        .map((r) => ({ url: r.url ?? "", title: r.title }))
        .filter((d) => d.url);
      if (docs.length === 0) {
        console.log(`[council] ${tab}/${row.id}: no live results`);
        continue;
      }
      const perJudge: JudgeResult[] = [];
      for (const model of JUDGES) {
        try {
          perJudge.push({ model, grades: await gradeWithJudge(row.query, docs, model) });
        } catch (e) {
          console.warn(`[council]   judge ${model} failed: ${e instanceof Error ? e.message : e}`);
        }
      }
      if (perJudge.length < 2) {
        console.log(`[council] ${tab}/${row.id}: <2 judges succeeded — discarded`);
        continue;
      }
      const { meanTopGrade } = aggregateJudgeGrades(perJudge, docs.length);
      const agreement = judgeAgreement(perJudge);
      tabScores.push(meanTopGrade);
      console.log(
        `[council] ${tab}/${row.id}: panel meanGrade=${meanTopGrade.toFixed(2)}/3 agreement=${(agreement * 100).toFixed(0)}% (${perJudge.length} judges)`
      );
    }
    const avg = tabScores.length ? (tabScores.reduce((s, x) => s + x, 0) / tabScores.length).toFixed(2) : "n/a";
    console.log(`[council] ${tab} AVG panel grade: ${avg}/3\n`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("council-crosscheck.ts")) {
  main().then(() => process.exit(0)).catch((e) => {
    console.error("[council] fatal:", e);
    process.exit(1);
  });
}
