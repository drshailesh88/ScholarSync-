#!/usr/bin/env npx tsx
/**
 * reporter.ts
 *
 * Generates PROGRESS.md from queue state.
 * Run: npx tsx qa/reporter.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUEUE_PATH = path.join(__dirname, "queue.jsonl");
const PROGRESS_PATH = path.join(__dirname, "PROGRESS.md");

interface QueueItem {
  id: string;
  module: string;
  spec_file: string;
  priority: number;
  status: string;
  checkpoints: number;
  pass1_agent: string | null;
  pass1_result: { pass: number; fail: number; blocked: number } | null;
  pass2_agent: string | null;
  pass2_result: { pass: number; fail: number; blocked: number } | null;
  attempts: number;
  blocked_reason: string | null;
}

function readQueue(): QueueItem[] {
  if (!fs.existsSync(QUEUE_PATH)) {
    console.error("queue.jsonl not found. Run: npx tsx qa/compile-queue.ts");
    process.exit(1);
  }
  return fs
    .readFileSync(QUEUE_PATH, "utf-8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
}

function main() {
  const queue = readQueue();
  const now = new Date().toISOString();

  // Global stats
  const totalSpecs = queue.length;
  const totalCheckpoints = queue.reduce((s, q) => s + q.checkpoints, 0);
  const pending = queue.filter((q) => q.status === "pending").length;
  const pass1Done = queue.filter((q) => q.status === "pass1_done").length;
  const pass2Done = queue.filter((q) => q.status === "pass2_done").length;
  const blocked = queue.filter((q) => q.status === "blocked").length;
  const done = pass1Done + pass2Done;

  // Per-module breakdown
  const modules = new Map<
    string,
    {
      total: number;
      pending: number;
      done: number;
      blocked: number;
      checkpoints: number;
      pass1Pass: number;
      pass1Fail: number;
      pass1Blocked: number;
    }
  >();

  for (const q of queue) {
    if (!modules.has(q.module)) {
      modules.set(q.module, {
        total: 0,
        pending: 0,
        done: 0,
        blocked: 0,
        checkpoints: 0,
        pass1Pass: 0,
        pass1Fail: 0,
        pass1Blocked: 0,
      });
    }
    const m = modules.get(q.module)!;
    m.total++;
    m.checkpoints += q.checkpoints;
    if (q.status === "pending") m.pending++;
    else if (q.status === "blocked") m.blocked++;
    else m.done++;

    if (q.pass1_result) {
      m.pass1Pass += q.pass1_result.pass;
      m.pass1Fail += q.pass1_result.fail;
      m.pass1Blocked += q.pass1_result.blocked;
    }
  }

  // Progress bar
  const pct = totalSpecs > 0 ? ((done / totalSpecs) * 100).toFixed(1) : "0.0";
  const barLen = 30;
  const filled = Math.round((done / totalSpecs) * barLen);
  const bar = "█".repeat(filled) + "░".repeat(barLen - filled);

  // Build PROGRESS.md
  const lines: string[] = [
    "# ScholarSync QA Progress",
    "",
    `Updated: ${now}`,
    "",
    "## Overall",
    "",
    `\`[${bar}] ${pct}%\``,
    "",
    `| Metric | Count |`,
    `|--------|-------|`,
    `| Total specs | ${totalSpecs} |`,
    `| Total checkpoints | ${totalCheckpoints} |`,
    `| Pending | ${pending} |`,
    `| Pass 1 done | ${pass1Done} |`,
    `| Pass 2 done | ${pass2Done} |`,
    `| Blocked | ${blocked} |`,
    "",
    "## Per Module",
    "",
    "| Module | Specs | Done | Pending | Blocked | Checkpoints | Pass1 P/F/B |",
    "|--------|-------|------|---------|---------|-------------|-------------|",
  ];

  for (const [name, m] of modules) {
    const p1 = `${m.pass1Pass}/${m.pass1Fail}/${m.pass1Blocked}`;
    lines.push(
      `| ${name} | ${m.total} | ${m.done} | ${m.pending} | ${m.blocked} | ${m.checkpoints} | ${p1} |`
    );
  }

  // Blocked items
  const blockedItems = queue.filter((q) => q.status === "blocked");
  if (blockedItems.length > 0) {
    lines.push("");
    lines.push("## Blocked Specs");
    lines.push("");
    lines.push("| Spec | Module | Reason |");
    lines.push("|------|--------|--------|");
    for (const q of blockedItems) {
      lines.push(
        `| ${q.id} | ${q.module} | ${q.blocked_reason ?? "unknown"} |`
      );
    }
  }

  lines.push("");

  fs.writeFileSync(PROGRESS_PATH, lines.join("\n"));
  console.log(`\n  Progress report: qa/PROGRESS.md`);
  console.log(`  ${done}/${totalSpecs} specs done (${pct}%)`);
  console.log(`  ${blocked} blocked, ${pending} pending\n`);
}

main();
