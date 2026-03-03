/**
 * RALPH Studio — Test helpers & scoring infrastructure
 *
 * Mirrors the ralph-notebook pattern: case-based testing with scorecard tracking.
 * Tests Studio page logic, stores, hooks, actions, and API routes.
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TestCheck {
  name: string;
  passed: boolean;
  details?: string;
}

export interface TestCaseResult {
  caseId: string;
  caseName: string;
  category: string;
  timestamp: string;
  checks: TestCheck[];
  overallScore: number;
  pass: boolean;
  issues: string[];
}

export interface Scorecard {
  lastUpdated: string | null;
  currentCycle: number;
  totalCases: number;
  passing: number;
  failing: number;
  averageScore: number;
  cases: TestCaseResult[];
}

// ---------------------------------------------------------------------------
// Scorecard persistence
// ---------------------------------------------------------------------------

const SCORECARD_PATH = path.join(__dirname, "scorecard.json");

export function loadScorecard(): Scorecard {
  const raw = fs.readFileSync(SCORECARD_PATH, "utf-8");
  return JSON.parse(raw);
}

export function updateScorecard(result: TestCaseResult): void {
  const sc = loadScorecard();
  const idx = sc.cases.findIndex((c) => c.caseId === result.caseId);
  if (idx >= 0) {
    sc.cases[idx] = result;
  } else {
    sc.cases.push(result);
  }
  sc.totalCases = sc.cases.length;
  sc.passing = sc.cases.filter((c) => c.pass).length;
  sc.failing = sc.cases.filter((c) => !c.pass).length;
  sc.averageScore =
    sc.cases.length > 0
      ? Math.round(
          (sc.cases.reduce((sum, c) => sum + c.overallScore, 0) /
            sc.cases.length) *
            100
        ) / 100
      : 0;
  sc.lastUpdated = new Date().toISOString();
  fs.writeFileSync(SCORECARD_PATH, JSON.stringify(sc, null, 2) + "\n");
}

export function setCycleNumber(cycle: number): void {
  const sc = loadScorecard();
  sc.currentCycle = cycle;
  sc.lastUpdated = new Date().toISOString();
  fs.writeFileSync(SCORECARD_PATH, JSON.stringify(sc, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export function scoreChecks(checks: TestCheck[]): number {
  if (checks.length === 0) return 0;
  const passed = checks.filter((c) => c.passed).length;
  return Math.round((passed / checks.length) * 10 * 100) / 100;
}

export function buildResult(
  caseId: string,
  caseName: string,
  category: string,
  checks: TestCheck[]
): TestCaseResult {
  const score = scoreChecks(checks);
  return {
    caseId,
    caseName,
    category,
    timestamp: new Date().toISOString(),
    checks,
    overallScore: score,
    pass: score >= 7.0,
    issues: checks.filter((c) => !c.passed).map((c) => c.name + (c.details ? `: ${c.details}` : "")),
  };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatResult(result: TestCaseResult): string {
  const statusIcon = result.pass ? "✅" : "❌";
  const lines = [
    `${statusIcon} ${result.caseId}: ${result.caseName} — ${result.overallScore}/10`,
  ];
  for (const check of result.checks) {
    lines.push(`  ${check.passed ? "✓" : "✗"} ${check.name}${check.details ? ` (${check.details})` : ""}`);
  }
  if (result.issues.length > 0) {
    lines.push(`  Issues: ${result.issues.join("; ")}`);
  }
  return lines.join("\n");
}
