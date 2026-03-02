/**
 * RALPH Loop Test Runner — Integrity Check Hardening
 *
 * Usage:
 *   npx tsx src/lib/integrity/__tests__/ralph-integrity/runner.ts --cycle 1
 *   npx tsx src/lib/integrity/__tests__/ralph-integrity/runner.ts --cycle 2
 *   npx tsx src/lib/integrity/__tests__/ralph-integrity/runner.ts --score
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env.local") });
dotenv.config({ path: join(process.cwd(), ".env") });
process.env.AI_PROVIDER = "zhipu";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CASES_DIR = join(__dirname, "cases");
const SCORECARD_PATH = join(__dirname, "scorecard.json");

// ── Types ────────────────────────────────────────────────────────────

interface TestCase {
  id: string;
  name: string;
  input: { mode: string; textKey: string; generatePrompt?: string };
  expectedResult: Record<string, unknown>;
  qualityCriteria: string[];
}

interface CycleResult {
  testId: string;
  name: string;
  humanScore: number;
  overallRisk: string;
  paragraphScores: number[];
  flags: string[];
  pass: boolean;
  notes: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────

function loadCases(start: number, end: number): TestCase[] {
  return readdirSync(CASES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(CASES_DIR, f), "utf-8")) as TestCase)
    .filter((tc) => {
      const num = parseInt(tc.id.replace("ralph-ic-", ""), 10);
      return num >= start && num <= end;
    });
}

function header(t: string) { console.log("\n" + "═".repeat(70) + "\n  " + t + "\n" + "═".repeat(70)); }
function sub(t: string) { console.log("\n" + "─".repeat(60) + "\n  " + t + "\n" + "─".repeat(60)); }
function bar(score: number, max = 10): string {
  const f = Math.round((score / max) * 20);
  const c = score >= 7 ? "\x1b[32m" : score >= 5 ? "\x1b[33m" : "\x1b[31m";
  return `${c}${"█".repeat(f)}${"░".repeat(20 - f)}\x1b[0m ${score.toFixed(1)}/${max}`;
}

function loadScorecard(): Record<string, unknown> & { cycles: Record<string, unknown>[] } {
  if (existsSync(SCORECARD_PATH)) return JSON.parse(readFileSync(SCORECARD_PATH, "utf-8"));
  return { lastUpdated: "", totalCycles: 12, completedCycles: 0, cycles: [] };
}

function saveScorecard(sc: Record<string, unknown>) {
  writeFileSync(SCORECARD_PATH, JSON.stringify(sc, null, 2));
}

// ── Cycle 1: Specificity (Human Text) ────────────────────────────────

async function runCycle1(): Promise<void> {
  header("RALPH Cycle 1: Baseline Specificity — Human Medical Text");
  console.log("Testing: Does the detector correctly PASS human-written text?\n");

  const { computeTextStatistics, runAIDetection } = await import("../../ai-detection");
  const { HUMAN_TEXTS } = await import("./test-texts/human-texts");

  const cases = loadCases(1, 5);
  const results: CycleResult[] = [];

  for (const tc of cases) {
    sub(`${tc.id}: ${tc.name}`);
    const text = HUMAN_TEXTS[tc.input.textKey];
    if (!text) { console.error("  Missing text"); continue; }

    const stats = computeTextStatistics(text);
    console.log(`  Words: ${text.split(/\s+/).length} | StdDev: ${stats.sentenceLengthStdDev} | TTR: ${stats.typeTokenRatio} | Passive: ${stats.passiveVoicePercent}% | Hedging: ${stats.hedgingPhraseCount}`);

    console.log("  Running AI detection...");
    const ai = await runAIDetection(text, false);
    const flagged = ai.paragraphs.filter((p) => p.humanProbability < 50);
    const minExpected = tc.expectedResult.humanScore_min as number;
    const pass = ai.humanScore >= minExpected && ai.overallRisk === "low" && flagged.length <= (tc.expectedResult.flaggedParagraphs_max as number);

    console.log(`  Human: ${ai.humanScore}% | Risk: ${ai.overallRisk} | Flagged: ${flagged.length}/${ai.paragraphs.length}`);
    for (const p of ai.paragraphs) {
      const icon = p.humanProbability >= 70 ? "✓" : p.humanProbability >= 50 ? "~" : "✗";
      console.log(`    [${icon}] P${p.paragraphIndex}: ${p.humanProbability}% — "${p.excerpt.slice(0, 45)}..."`);
    }
    console.log(`  ${pass ? "\x1b[32m✓ PASS\x1b[0m" : "\x1b[31m✗ FAIL\x1b[0m"}`);

    const notes: string[] = [];
    if (ai.humanScore < minExpected) notes.push(`humanScore ${ai.humanScore}% < expected ${minExpected}%`);
    if (ai.overallRisk !== "low") notes.push(`Risk "${ai.overallRisk}" should be "low"`);

    results.push({
      testId: tc.id, name: tc.name, humanScore: ai.humanScore, overallRisk: ai.overallRisk,
      paragraphScores: ai.paragraphs.map((p) => p.humanProbability),
      flags: ai.paragraphs.flatMap((p) => p.flags), pass, notes,
    });
  }

  printSummary("cycle-1", "Baseline Specificity — Human Medical Text", results, "specificity");
}

// ── Cycle 2: Sensitivity (AI Text) ───────────────────────────────────

async function runCycle2(): Promise<void> {
  header("RALPH Cycle 2: Baseline Sensitivity — AI-Generated Medical Text");
  console.log("Testing: Does the detector correctly FLAG AI-generated text?");
  console.log("AI text will be generated LIVE using GLM-5.\n");

  const { generateText } = await import("ai");
  const { getModel } = await import("@/lib/ai/models");
  const { computeTextStatistics, runAIDetection } = await import("../../ai-detection");

  const cases = loadCases(6, 10);
  const results: CycleResult[] = [];

  for (const tc of cases) {
    sub(`${tc.id}: ${tc.name}`);

    // Step 1: Generate AI text live
    const prompt = tc.input.generatePrompt;
    if (!prompt) { console.error("  No generatePrompt"); continue; }

    console.log("  Generating AI text with GLM-5...");
    const { text: aiText } = await generateText({
      model: getModel(),
      prompt,
    });

    const wordCount = aiText.split(/\s+/).length;
    console.log(`  Generated ${wordCount} words`);
    console.log(`  Preview: "${aiText.slice(0, 120)}..."\n`);

    // Step 2: Run statistical analysis
    const stats = computeTextStatistics(aiText);
    console.log(`  Stats: StdDev=${stats.sentenceLengthStdDev} | TTR=${stats.typeTokenRatio} | Passive=${stats.passiveVoicePercent}% | Hedging=${stats.hedgingPhraseCount}`);

    // Step 3: Run AI detection
    console.log("  Running AI detection...");
    const ai = await runAIDetection(aiText, false);
    const maxExpected = tc.expectedResult.humanScore_max as number;
    const minFlagged = tc.expectedResult.flaggedParagraphs_min as number;
    const flagged = ai.paragraphs.filter((p) => p.humanProbability < 50);
    const pass = ai.humanScore <= maxExpected && ai.overallRisk === "high" && flagged.length >= minFlagged;

    console.log(`  Human: ${ai.humanScore}% | Risk: ${ai.overallRisk} | Flagged: ${flagged.length}/${ai.paragraphs.length}`);
    for (const p of ai.paragraphs) {
      const icon = p.humanProbability < 30 ? "✓" : p.humanProbability < 50 ? "~" : "✗";
      console.log(`    [${icon}] P${p.paragraphIndex}: ${p.humanProbability}% — "${p.excerpt.slice(0, 45)}..."`);
      if (p.flags.length > 0) console.log(`          Flags: ${p.flags.join(", ")}`);
    }
    console.log(`  ${pass ? "\x1b[32m✓ PASS\x1b[0m" : "\x1b[31m✗ FAIL\x1b[0m"}`);

    const notes: string[] = [];
    if (ai.humanScore > maxExpected) notes.push(`humanScore ${ai.humanScore}% > max ${maxExpected}% — AI text not detected`);
    if (ai.overallRisk !== "high") notes.push(`Risk "${ai.overallRisk}" should be "high"`);
    if (flagged.length < minFlagged) notes.push(`Only ${flagged.length} paras flagged, need >= ${minFlagged}`);

    results.push({
      testId: tc.id, name: tc.name, humanScore: ai.humanScore, overallRisk: ai.overallRisk,
      paragraphScores: ai.paragraphs.map((p) => p.humanProbability),
      flags: ai.paragraphs.flatMap((p) => p.flags), pass, notes,
    });
  }

  printSummary("cycle-2", "Baseline Sensitivity — AI-Generated Medical Text", results, "sensitivity");
}

// ── Summary + Scorecard ──────────────────────────────────────────────

function printSummary(cycleId: string, name: string, results: CycleResult[], dimension: string): void {
  header(`${cycleId.replace("-", " ").toUpperCase()} Summary`);

  const passing = results.filter((r) => r.pass).length;
  const avgHuman = results.reduce((s, r) => s + r.humanScore, 0) / results.length;

  // Score on 1-10 scale
  let dimScore: number;
  if (dimension === "specificity") {
    // Higher humanScore = better specificity
    dimScore = avgHuman >= 85 ? 10 : avgHuman >= 75 ? 8 : avgHuman >= 65 ? 6 : avgHuman >= 50 ? 4 : 2;
  } else {
    // Lower humanScore = better sensitivity
    dimScore = avgHuman <= 15 ? 10 : avgHuman <= 25 ? 8 : avgHuman <= 35 ? 6 : avgHuman <= 50 ? 4 : 2;
  }

  console.log(`\n  Cases: ${results.length} | Pass: ${passing} | Fail: ${results.length - passing}`);
  console.log(`  Avg humanScore: ${avgHuman.toFixed(1)}%`);
  console.log(`  ${dimension}: ${bar(dimScore)}`);

  // Table
  console.log("\n  ┌────────────────┬──────────────────────────────────────┬────────┬────────┬────────┐");
  console.log("  │ ID             │ Name                                 │ Human% │ Risk   │ Result │");
  console.log("  ├────────────────┼──────────────────────────────────────┼────────┼────────┼────────┤");
  for (const r of results) {
    const n = r.name.length > 36 ? r.name.slice(0, 33) + "..." : r.name.padEnd(36);
    const p = r.pass ? "\x1b[32m PASS \x1b[0m" : "\x1b[31m FAIL \x1b[0m";
    console.log(`  │ ${r.testId.padEnd(14)} │ ${n} │ ${String(r.humanScore).padStart(5)}% │ ${r.overallRisk.padEnd(6)} │${p}│`);
  }
  console.log("  └────────────────┴──────────────────────────────────────┴────────┴────────┴────────┘");

  // Notes
  const failNotes = results.filter((r) => !r.pass);
  if (failNotes.length > 0) {
    console.log("\n  Failure notes:");
    for (const r of failNotes) {
      for (const n of r.notes) console.log(`    • ${r.testId}: ${n}`);
    }
  }

  // Save scorecard
  const sc = loadScorecard();
  const entry = {
    cycleId, name, timestamp: new Date().toISOString(),
    casesRun: results.length, casesPassing: passing,
    avgHumanScore: avgHuman, dimensionScore: dimScore,
    results,
  };
  const idx = sc.cycles.findIndex((c) => (c as Record<string, unknown>).cycleId === cycleId);
  if (idx >= 0) sc.cycles[idx] = entry; else sc.cycles.push(entry);
  sc.lastUpdated = new Date().toISOString();
  sc.completedCycles = sc.cycles.length;
  saveScorecard(sc);
  console.log(`\n  Scorecard saved.`);
}

// ── Show Scorecard ───────────────────────────────────────────────────

function showScorecard(): void {
  const sc = loadScorecard();
  header("RALPH Integrity Scorecard");
  console.log(`  Last updated: ${sc.lastUpdated}\n  Cycles: ${sc.completedCycles}/12\n`);
  for (const c of sc.cycles) {
    const cy = c as Record<string, unknown>;
    const ok = (cy.casesPassing as number) === (cy.casesRun as number);
    console.log(`  ${ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} ${cy.cycleId}: ${cy.name} — ${cy.casesPassing}/${cy.casesRun} pass, score: ${(cy.dimensionScore as number).toFixed(1)}/10`);
  }
}

// ── CLI ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes("--score")) { showScorecard(); return; }

  const ci = args.indexOf("--cycle");
  const cycle = ci >= 0 ? parseInt(args[ci + 1], 10) : 1;

  switch (cycle) {
    case 1: await runCycle1(); break;
    case 2: await runCycle2(); break;
    default: console.error(`Cycle ${cycle} not yet implemented.`); process.exit(1);
  }
}

main().catch((err) => { console.error("RALPH failed:", err); process.exit(1); });
