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
process.env.AI_PROVIDER = "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CASES_DIR = join(__dirname, "cases");
const SCORECARD_PATH = join(__dirname, "scorecard.json");

// ── Types ────────────────────────────────────────────────────────────

interface TestCase {
  id: string;
  name: string;
  phase: number;
  category: string;
  difficulty: string;
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
  dimensions: import("./scorer").DimensionScores;
  weighted: number;
  details: import("./scorer").ScoreDetail[];
}

interface ScorecardEntry {
  cycleId: string;
  name: string;
  phase: number;
  timestamp: string;
  casesRun: number;
  casesPassing: number;
  avgHumanScore: number;
  dimensionScores: import("./scorer").DimensionScores;
  weightedScore: number;
  results: CycleResult[];
}

interface Scorecard {
  lastUpdated: string;
  totalCycles: number;
  completedCycles: number;
  phaseAverages: { phase1: number; phase2: number; phase3: number };
  cycles: ScorecardEntry[];
}

// ── Helpers ──────────────────────────────────────────────────────────

function loadCases(start: number, end: number): TestCase[] {
  if (!existsSync(CASES_DIR)) return [];
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

function loadScorecard(): Scorecard {
  if (existsSync(SCORECARD_PATH)) return JSON.parse(readFileSync(SCORECARD_PATH, "utf-8"));
  return { lastUpdated: "", totalCycles: 12, completedCycles: 0, phaseAverages: { phase1: 0, phase2: 0, phase3: 0 }, cycles: [] };
}

function saveScorecard(sc: Scorecard) {
  // Recompute phase averages
  const p1 = sc.cycles.filter((c) => c.phase === 1);
  const p2 = sc.cycles.filter((c) => c.phase === 2);
  const p3 = sc.cycles.filter((c) => c.phase === 3);
  sc.phaseAverages = {
    phase1: p1.length ? Math.round((p1.reduce((s, c) => s + c.weightedScore, 0) / p1.length) * 10) / 10 : 0,
    phase2: p2.length ? Math.round((p2.reduce((s, c) => s + c.weightedScore, 0) / p2.length) * 10) / 10 : 0,
    phase3: p3.length ? Math.round((p3.reduce((s, c) => s + c.weightedScore, 0) / p3.length) * 10) / 10 : 0,
  };
  writeFileSync(SCORECARD_PATH, JSON.stringify(sc, null, 2));
}

// ── Cycle 1: Specificity (Human Text) ────────────────────────────────

async function runCycle1(): Promise<void> {
  header("RALPH Cycle 1: Baseline Specificity — Human Medical Text");
  console.log("Testing: Does the detector correctly PASS human-written text?\n");

  const { computeTextStatistics, runAIDetection } = await import("../../ai-detection");
  const { HUMAN_TEXTS } = await import("./test-texts/human-texts");
  const { scoreSpecificityCase, computeWeighted } = await import("./scorer");

  const cases = loadCases(1, 5);
  if (cases.length === 0) {
    console.error("  No test cases found for Cycle 1 (ralph-ic-001 through ralph-ic-005).");
    process.exit(1);
  }

  const results: CycleResult[] = [];

  for (const tc of cases) {
    sub(`${tc.id}: ${tc.name}`);
    const text = HUMAN_TEXTS[tc.input.textKey];
    if (!text) { console.error(`  Missing text key: ${tc.input.textKey}`); continue; }

    // Step 1: Statistical analysis
    const stats = computeTextStatistics(text);
    const wordCount = text.split(/\s+/).length;
    console.log(`  Words: ${wordCount} | Sentences: ~${Math.round(wordCount / stats.avgSentenceLength)}`);
    console.log(`  StdDev: ${stats.sentenceLengthStdDev} | TTR: ${stats.typeTokenRatio} | Passive: ${stats.passiveVoicePercent}% | Hedging: ${stats.hedgingPhraseCount} | FK Grade: ${stats.readabilityGrade}`);

    // Flag statistical risks
    if (stats.sentenceLengthStdDev < 3.0) console.log("  ⚠ StdDev < 3.0 — will trigger -10 heuristic penalty");
    if (stats.typeTokenRatio < 0.35 && wordCount > 500) console.log("  ⚠ Low TTR on long text — will trigger -5 penalty");
    const hedgingDensity = (stats.hedgingPhraseCount / wordCount) * 500;
    if (hedgingDensity > 2) console.log(`  ⚠ High hedging density (${hedgingDensity.toFixed(1)}/500w) — will trigger -10 penalty`);

    // Step 2: Run AI detection (free tier — no Binoculars)
    console.log("  Running AI detection (LLM-heuristic)...");
    const ai = await runAIDetection(text, false);
    const flagged = ai.paragraphs.filter((p) => p.humanProbability < 50);

    // Step 3: Score with the proper scorer
    const minExpected = tc.expectedResult.humanScore_min as number;
    const maxFlagged = tc.expectedResult.flaggedParagraphs_max as number;
    const scored = scoreSpecificityCase({
      result: ai,
      expectedMinHuman: minExpected,
      expectedMaxFlagged: maxFlagged,
    });
    const weighted = computeWeighted(scored.dimensions);
    const expectedRisk = tc.expectedResult.overallRisk as string;
    const acceptableRisks = expectedRisk === "low" ? ["low", "medium"] : [expectedRisk];
    const pass = ai.humanScore >= minExpected && acceptableRisks.includes(ai.overallRisk) && flagged.length <= maxFlagged;

    // Step 4: Display results
    console.log(`\n  Human Score: ${ai.humanScore}% | AI Score: ${ai.aiScore}% | Risk: ${ai.overallRisk} | Flagged: ${flagged.length}/${ai.paragraphs.length}`);
    console.log(`  Specificity: ${bar(scored.dimensions.specificity)} | Actionability: ${bar(scored.dimensions.actionability)}`);
    console.log(`  Weighted: ${bar(weighted)}`);

    for (const p of ai.paragraphs) {
      const icon = p.humanProbability >= 70 ? "✓" : p.humanProbability >= 50 ? "~" : "✗";
      const colour = p.humanProbability >= 70 ? "\x1b[32m" : p.humanProbability >= 50 ? "\x1b[33m" : "\x1b[31m";
      console.log(`    ${colour}[${icon}] P${p.paragraphIndex}: ${p.humanProbability}%\x1b[0m — "${p.excerpt.slice(0, 50)}..."`);
      if (p.flags.length > 0) console.log(`          Flags: ${p.flags.join(", ")}`);
      if (p.suggestion) console.log(`          Suggestion: ${p.suggestion}`);
    }
    console.log(`  ${pass ? "\x1b[32m✓ PASS\x1b[0m" : "\x1b[31m✗ FAIL\x1b[0m"}`);

    const notes: string[] = [];
    if (ai.humanScore < minExpected) notes.push(`humanScore ${ai.humanScore}% < expected ${minExpected}%`);
    if (!acceptableRisks.includes(ai.overallRisk)) notes.push(`Risk "${ai.overallRisk}" not in [${acceptableRisks.join(", ")}]`);
    if (flagged.length > maxFlagged) notes.push(`${flagged.length} paras flagged, max allowed ${maxFlagged}`);

    results.push({
      testId: tc.id, name: tc.name, humanScore: ai.humanScore, overallRisk: ai.overallRisk,
      paragraphScores: ai.paragraphs.map((p) => p.humanProbability),
      flags: ai.paragraphs.flatMap((p) => p.flags), pass, notes,
      dimensions: scored.dimensions, weighted,
      details: scored.details,
    });
  }

  // ── Summary ───────────────────────────────────────────────────────
  await printCycleSummary("cycle-1", "Baseline Specificity — Human Medical Text", 1, results);
}

// ── Cycle 2: Sensitivity (AI Text) ───────────────────────────────────

async function runCycle2(): Promise<void> {
  header("RALPH Cycle 2: Baseline Sensitivity — AI-Generated Medical Text");
  console.log("Testing: Does the detector correctly FLAG AI-generated text?");
  console.log(`AI text will be generated LIVE using ${process.env.AI_PROVIDER} provider.\n`);

  const { generateText } = await import("ai");
  const { getModel } = await import("@/lib/ai/models");
  const { computeTextStatistics, runAIDetection } = await import("../../ai-detection");
  const { scoreSensitivityCase, computeWeighted } = await import("./scorer");

  const cases = loadCases(6, 10);
  if (cases.length === 0) {
    console.error("  No test cases found for Cycle 2 (ralph-ic-006 through ralph-ic-010).");
    process.exit(1);
  }

  const results: CycleResult[] = [];

  for (const tc of cases) {
    sub(`${tc.id}: ${tc.name}`);

    const prompt = tc.input.generatePrompt;
    if (!prompt) { console.error("  No generatePrompt"); continue; }

    console.log(`  Generating AI text with ${process.env.AI_PROVIDER}...`);
    const { text: aiText } = await generateText({
      model: getModel(),
      prompt,
    });

    const wordCount = aiText.split(/\s+/).length;
    console.log(`  Generated ${wordCount} words`);
    console.log(`  Preview: "${aiText.slice(0, 120)}..."\n`);

    const stats = computeTextStatistics(aiText);
    console.log(`  Stats: StdDev=${stats.sentenceLengthStdDev} | TTR=${stats.typeTokenRatio} | Passive=${stats.passiveVoicePercent}% | Hedging=${stats.hedgingPhraseCount}`);

    console.log("  Running AI detection...");
    const ai = await runAIDetection(aiText, false);
    const maxExpected = tc.expectedResult.humanScore_max as number;
    const minFlagged = tc.expectedResult.flaggedParagraphs_min as number;
    const flagged = ai.paragraphs.filter((p) => p.humanProbability < 50);

    const scored = scoreSensitivityCase({
      result: ai,
      expectedMaxHuman: maxExpected,
      expectedMinFlagged: minFlagged,
    });
    const weighted = computeWeighted(scored.dimensions);
    const pass = ai.humanScore <= maxExpected && ai.overallRisk === "high" && flagged.length >= minFlagged;

    console.log(`\n  Human: ${ai.humanScore}% | Risk: ${ai.overallRisk} | Flagged: ${flagged.length}/${ai.paragraphs.length}`);
    console.log(`  Sensitivity: ${bar(scored.dimensions.sensitivity)} | Actionability: ${bar(scored.dimensions.actionability)}`);
    console.log(`  Weighted: ${bar(weighted)}`);

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
      dimensions: scored.dimensions, weighted,
      details: scored.details,
    });
  }

  await printCycleSummary("cycle-2", "Baseline Sensitivity — AI-Generated Medical Text", 1, results);
}

// ── Summary + Scorecard ──────────────────────────────────────────────

async function printCycleSummary(cycleId: string, name: string, phase: number, results: CycleResult[]): Promise<void> {
  const { aggregateDimensions, computeWeighted } = await import("./scorer");

  header(`${cycleId.replace("-", " ").toUpperCase()} Summary`);

  const passing = results.filter((r) => r.pass).length;
  const avgHuman = results.reduce((s, r) => s + r.humanScore, 0) / results.length;
  const avgDims = aggregateDimensions(results.map((r) => r.dimensions));
  const avgWeighted = computeWeighted(avgDims);

  console.log(`\n  Cases: ${results.length} | Pass: ${passing} | Fail: ${results.length - passing}`);
  console.log(`  Avg humanScore: ${avgHuman.toFixed(1)}%\n`);

  // Dimension scores
  console.log("  Dimension Scores:");
  console.log(`    Sensitivity  (30%): ${bar(avgDims.sensitivity)}`);
  console.log(`    Specificity  (30%): ${bar(avgDims.specificity)}`);
  console.log(`    Actionability (15%): ${bar(avgDims.actionability)}`);
  console.log(`    Citation Acc (15%): ${bar(avgDims.citationAccuracy)}`);
  console.log(`    Robustness   (10%): ${bar(avgDims.robustness)}`);
  console.log(`    ─────────────────────`);
  console.log(`    Weighted Avg:       ${bar(avgWeighted)}`);

  // Table
  console.log("\n  ┌────────────────┬──────────────────────────────────────┬────────┬────────┬──────────┬────────┐");
  console.log("  │ ID             │ Name                                 │ Human% │ Risk   │ Weighted │ Result │");
  console.log("  ├────────────────┼──────────────────────────────────────┼────────┼────────┼──────────┼────────┤");
  for (const r of results) {
    const n = r.name.length > 36 ? r.name.slice(0, 33) + "..." : r.name.padEnd(36);
    const p = r.pass ? "\x1b[32m PASS \x1b[0m" : "\x1b[31m FAIL \x1b[0m";
    console.log(`  │ ${r.testId.padEnd(14)} │ ${n} │ ${String(r.humanScore).padStart(5)}% │ ${r.overallRisk.padEnd(6)} │ ${r.weighted.toFixed(1).padStart(8)} │${p}│`);
  }
  console.log("  └────────────────┴──────────────────────────────────────┴────────┴────────┴──────────┴────────┘");

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
  const entry: ScorecardEntry = {
    cycleId, name, phase, timestamp: new Date().toISOString(),
    casesRun: results.length, casesPassing: passing,
    avgHumanScore: Math.round(avgHuman * 10) / 10,
    dimensionScores: avgDims,
    weightedScore: Math.round(avgWeighted * 10) / 10,
    results,
  };
  const idx = sc.cycles.findIndex((c) => c.cycleId === cycleId);
  if (idx >= 0) sc.cycles[idx] = entry; else sc.cycles.push(entry);
  sc.lastUpdated = new Date().toISOString();
  sc.completedCycles = sc.cycles.length;
  saveScorecard(sc);
  console.log(`\n  Scorecard saved → scorecard.json`);

  // Phase gate check
  if (phase === 1) {
    const p1Cycles = sc.cycles.filter((c) => c.phase === 1);
    const p1Avg = p1Cycles.reduce((s, c) => s + c.weightedScore, 0) / (p1Cycles.length || 1);
    console.log(`\n  Phase 1 average: ${p1Avg.toFixed(1)}/10 (need ≥7.0 to unlock Phase 2)`);
    if (p1Avg >= 7.0) console.log("  \x1b[32m✓ Phase 2 UNLOCKED\x1b[0m");
    else console.log("  \x1b[33m⏳ Phase 2 locked — improve AI detection accuracy\x1b[0m");
  }
}

// ── Show Scorecard ───────────────────────────────────────────────────

function showScorecard(): void {
  const sc = loadScorecard();
  header("RALPH Integrity Scorecard");
  console.log(`  Last updated: ${sc.lastUpdated}\n  Cycles: ${sc.completedCycles}/12\n`);

  for (const c of sc.cycles) {
    const ok = c.casesPassing === c.casesRun;
    const icon = ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
    console.log(`  ${icon} ${c.cycleId}: ${c.name}`);
    console.log(`      ${c.casesPassing}/${c.casesRun} pass | weighted: ${bar(c.weightedScore)}`);
    console.log(`      spec=${c.dimensionScores.specificity.toFixed(1)} sens=${c.dimensionScores.sensitivity.toFixed(1)} act=${c.dimensionScores.actionability.toFixed(1)} cit=${c.dimensionScores.citationAccuracy.toFixed(1)} rob=${c.dimensionScores.robustness.toFixed(1)}`);
  }

  console.log("\n  Phase Averages:");
  console.log(`    Phase 1 (AI Detection):     ${bar(sc.phaseAverages.phase1)} ${sc.phaseAverages.phase1 >= 7.0 ? "✓ P2 unlocked" : "⏳ P2 locked"}`);
  console.log(`    Phase 2 (Citation/Integrity): ${bar(sc.phaseAverages.phase2)} ${sc.phaseAverages.phase2 >= 7.5 ? "✓ P3 unlocked" : "⏳ P3 locked"}`);
  console.log(`    Phase 3 (Integration):       ${bar(sc.phaseAverages.phase3)}`);
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
