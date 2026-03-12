#!/usr/bin/env npx tsx
/**
 * controller.ts — QA Pipeline Controller
 *
 * The autonomous execution loop. This is a DUMB controller —
 * it does not think, it does not hallucinate, it follows rules.
 *
 * Loop:
 *   1. Pick next pending spec from queue (module-priority order)
 *   2. Generate Playwright test from spec markdown
 *   3. Run: npx playwright test --config=qa/playwright.config.ts <spec>
 *   4. Parse JSON results (machine truth)
 *   5. Validate through proof gate (artifacts must exist)
 *   6. Update queue.jsonl with verdicts
 *   7. Update spec markdown with PASS/FAIL/BLOCKED
 *   8. Continue to next spec
 *
 * Usage:
 *   npx tsx qa/controller.ts                    # Run full queue
 *   npx tsx qa/controller.ts --module=dashboard  # Run one module
 *   npx tsx qa/controller.ts --spec=dashboard.spec-001  # Run one spec
 *   npx tsx qa/controller.ts --dry-run          # Show what would run
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validateSpecResults, summarizeVerdicts, type Verdict } from "./proof-gate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const QUEUE_PATH = path.join(__dirname, "queue.jsonl");
const RESULTS_PATH = path.join(__dirname, "progress", "results.json");
const _QA_CONFIG = path.join(__dirname, "playwright.config.ts");

interface QueueItem {
  id: string;
  module: string;
  spec_file: string;
  priority: number;
  status: string;
  checkpoints: number;
  page_url: string;
  pass1_agent: string | null;
  pass1_result: { pass: number; fail: number; blocked: number } | null;
  pass2_agent: string | null;
  pass2_result: { pass: number; fail: number; blocked: number } | null;
  attempts: number;
  max_attempts: number;
  blocked_reason: string | null;
}

export function selectRunnableQueueItems(
  queue: QueueItem[],
  {
    moduleFilter,
    specFilter,
    agentName,
  }: {
    moduleFilter?: string;
    specFilter?: string;
    agentName: string;
  }
): QueueItem[] {
  const isPass1Agent = agentName === "claude" || agentName === "codex-pass1";
  const allowedStatuses = isPass1Agent
    ? ["pending"]
    : specFilter
      ? ["pass1_done", "pass2_done", "blocked"]
      : ["pass1_done"];

  return queue.filter((item) => {
    if (!allowedStatuses.includes(item.status)) {
      return false;
    }
    if (moduleFilter && item.module !== moduleFilter) {
      return false;
    }
    if (specFilter && item.id !== specFilter) {
      return false;
    }
    return true;
  });
}

// ── Queue I/O ──

function readQueue(): QueueItem[] {
  return fs
    .readFileSync(QUEUE_PATH, "utf-8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
}

function writeQueue(queue: QueueItem[]): void {
  const jsonl = queue.map((item) => JSON.stringify(item)).join("\n") + "\n";
  fs.writeFileSync(QUEUE_PATH, jsonl);
}

// ── Spec Generation ──

function generateSpec(module: string, specId: string): string {
  const outPath = path.join(__dirname, "generated", module, `${specId}.spec.ts`);

  execSync(
    `npx tsx qa/spec-to-playwright.ts ${module} ${specId}`,
    { cwd: ROOT, stdio: "pipe" }
  );

  if (!fs.existsSync(outPath)) {
    throw new Error(`Failed to generate test: ${outPath}`);
  }

  return outPath;
}

// ── Playwright Execution ──

function runPlaywright(testPath: string): { exitCode: number; output: string } {
  const relPath = path.relative(path.join(ROOT, "qa"), testPath);

  try {
    const output = execSync(
      `npx playwright test --config=qa/playwright.config.ts "${relPath}"`,
      {
        cwd: ROOT,
        stdio: "pipe",
        timeout: 5 * 60 * 1000, // 5 min max per spec
        env: { ...process.env, FORCE_COLOR: "0" },
      }
    );
    return { exitCode: 0, output: output.toString() };
  } catch (err: unknown) {
    const error = err as { status?: number; stdout?: Buffer; stderr?: Buffer };
    return {
      exitCode: error.status ?? 1,
      output: (error.stdout?.toString() ?? "") + (error.stderr?.toString() ?? ""),
    };
  }
}

// ── Spec Markdown Update ──

function updateSpecMarkdown(
  specFile: string,
  verdicts: Verdict[]
): void {
  const specPath = path.join(ROOT, specFile);
  if (!fs.existsSync(specPath)) return;

  const content = fs.readFileSync(specPath, "utf-8");
  const lines = content.split("\n");

  // Map verdicts by index (cp-000, cp-001, etc.)
  const verdictMap = new Map<number, Verdict>();
  for (const v of verdicts) {
    const match = v.checkpoint_id.match(/cp-(\d+)/);
    if (match) verdictMap.set(parseInt(match[1]), v);
  }

  let checkboxIndex = 0;
  const updatedLines = lines.map((line) => {
    if (!line.match(/^- \[/)) return line;

    const v = verdictMap.get(checkboxIndex);
    checkboxIndex++;

    if (!v) return line;

    // Strip existing result annotation
    let cleanLine = line.replace(
      /^- \[[ x]\]\s*(PASS|FAIL|BLOCKED|NOT_ON_PAGE):\s*/,
      "- [ ] "
    );
    // Also handle bold prefix
    cleanLine = cleanLine.replace(/^- \[[ x]\]\s*/, "- [ ] ");

    switch (v.verdict) {
      case "PASS":
        return cleanLine.replace("- [ ]", "- [x] PASS:");
      case "FAIL":
        return cleanLine.replace(
          "- [ ]",
          `- [ ] FAIL: ${v.proof.error_message?.slice(0, 100) ?? "assertion failed"} —`
        );
      case "BLOCKED":
        return cleanLine.replace("- [ ]", "- [ ] BLOCKED:");
      default:
        return line; // UNTESTED — leave as is
    }
  });

  // Update header counts
  const pass = verdicts.filter((v) => v.verdict === "PASS").length;
  const fail = verdicts.filter((v) => v.verdict === "FAIL").length;
  const blocked = verdicts.filter(
    (v) => v.verdict === "BLOCKED" || v.verdict === "UNTESTED"
  ).length;
  const tested = pass + fail + blocked;
  const total = checkboxIndex;

  const updatedContent = updatedLines
    .join("\n")
    .replace(/^STATUS:\s*.+$/m, `STATUS: ${fail === 0 && blocked === 0 ? "DONE" : "PARTIAL"}`)
    .replace(/^TESTED:\s*.+$/m, `TESTED: ${tested}/${total}`)
    .replace(/^PASS:\s*.+$/m, `PASS: ${pass}`)
    .replace(/^FAIL:\s*.+$/m, `FAIL: ${fail}`)
    .replace(/^BLOCKED:\s*.+$/m, `BLOCKED: ${blocked}`);

  fs.writeFileSync(specPath, updatedContent);
}

// ── Main Loop ──

async function main() {
  const args = process.argv.slice(2);
  const moduleFilter = args.find((a) => a.startsWith("--module="))?.split("=")[1];
  const specFilter = args.find((a) => a.startsWith("--spec="))?.split("=")[1];
  const dryRun = args.includes("--dry-run");
  const agentName = args.find((a) => a.startsWith("--agent="))?.split("=")[1] ?? "claude";

  if (!fs.existsSync(QUEUE_PATH)) {
    console.error("queue.jsonl not found. Run: npx tsx qa/compile-queue.ts");
    process.exit(1);
  }

  const queue = readQueue();

  // Filter to relevant specs
  const pending = selectRunnableQueueItems(queue, {
    moduleFilter,
    specFilter,
    agentName,
  });

  if (pending.length === 0) {
    console.log("\n  No pending specs to process.\n");
    return;
  }

  console.log(`\n  QA Controller`);
  console.log(`  ${"─".repeat(50)}`);
  console.log(`  Pending specs: ${pending.length}`);
  console.log(`  Agent: ${agentName}`);
  if (moduleFilter) console.log(`  Module filter: ${moduleFilter}`);
  if (specFilter) console.log(`  Spec filter: ${specFilter}`);
  console.log();

  if (dryRun) {
    console.log("  DRY RUN — would process:");
    for (const q of pending) {
      console.log(`    ${q.id} (${q.checkpoints} checkpoints)`);
    }
    return;
  }

  let processed = 0;
  let totalPass = 0;
  let totalFail = 0;
  let totalBlocked = 0;

  for (const item of pending) {
    const [module, specId] = item.id.split(".");
    processed++;

    console.log(
      `\n  [${"=".repeat(40)}]`
    );
    console.log(
      `  [${processed}/${pending.length}] ${item.id} (${item.checkpoints} checkpoints)`
    );
    console.log(`  ${"─".repeat(50)}`);

    // Step 1: Generate Playwright test
    console.log(`  1. Generating Playwright test...`);
    let testPath: string;
    try {
      testPath = generateSpec(module, specId);
      console.log(`     ✓ Generated`);
    } catch (err) {
      console.error(`     ✗ Generation failed: ${err}`);
      item.status = "blocked";
      item.blocked_reason = `Test generation failed: ${err}`;
      writeQueue(queue);
      continue;
    }

    // Step 2: Run Playwright
    console.log(`  2. Running Playwright...`);
    const { exitCode } = runPlaywright(testPath);
    console.log(`     Exit code: ${exitCode}`);

    // Copy results.json to per-spec location before it gets overwritten
    const specResultsDir = path.join(__dirname, "artifacts", module, specId);
    if (!fs.existsSync(specResultsDir)) fs.mkdirSync(specResultsDir, { recursive: true });
    const specResultsPath = path.join(specResultsDir, "results.json");
    if (fs.existsSync(RESULTS_PATH)) {
      fs.copyFileSync(RESULTS_PATH, specResultsPath);
    }

    // Step 3: Validate through proof gate
    console.log(`  3. Validating through proof gate...`);
    const verdicts = validateSpecResults(module, specId, specResultsPath, exitCode);
    const summary = summarizeVerdicts(verdicts);
    console.log(
      `     Pass: ${summary.pass}  Fail: ${summary.fail}  Blocked: ${summary.blocked}  Untested: ${summary.untested}`
    );

    // Step 4: Update spec markdown
    console.log(`  4. Updating spec markdown...`);
    updateSpecMarkdown(item.spec_file, verdicts);

    // Step 5: Update queue
    item.attempts++;

    if (agentName === "claude" || agentName === "codex-pass1") {
      item.pass1_agent = agentName;
      item.pass1_result = {
        pass: summary.pass,
        fail: summary.fail,
        blocked: summary.blocked + summary.untested,
      };
      item.status =
        summary.fail === 0 && summary.blocked === 0 && summary.untested === 0
          ? "pass1_done"
          : item.attempts >= item.max_attempts
            ? "blocked"
            : "pending"; // Will be retried
    } else {
      item.pass2_agent = agentName;
      item.pass2_result = {
        pass: summary.pass,
        fail: summary.fail,
        blocked: summary.blocked + summary.untested,
      };
      item.status = "pass2_done";
    }

    if (item.status === "blocked" && !item.blocked_reason) {
      const failingVerdicts = verdicts
        .filter((v) => v.verdict === "FAIL")
        .map((v) => v.proof.error_message)
        .filter(Boolean)
        .slice(0, 3);
      item.blocked_reason = failingVerdicts.join("; ") || "Max attempts reached";
    }

    totalPass += summary.pass;
    totalFail += summary.fail;
    totalBlocked += summary.blocked + summary.untested;

    writeQueue(queue);

    // Save verdicts to artifact dir
    const verdictPath = path.join(
      __dirname,
      "artifacts",
      module,
      specId,
      "verdicts.json"
    );
    const verdictDir = path.dirname(verdictPath);
    if (!fs.existsSync(verdictDir)) fs.mkdirSync(verdictDir, { recursive: true });
    fs.writeFileSync(verdictPath, JSON.stringify(verdicts, null, 2));

    console.log(`  → Status: ${item.status}`);
  }

  // Final summary
  console.log(`\n  ${"═".repeat(50)}`);
  console.log(`  QA Run Complete`);
  console.log(`  ${"─".repeat(50)}`);
  console.log(`  Processed: ${processed} specs`);
  console.log(`  Pass: ${totalPass}  Fail: ${totalFail}  Blocked: ${totalBlocked}`);
  console.log();

  // Generate progress report
  try {
    execSync("npx tsx qa/reporter.ts", { cwd: ROOT, stdio: "inherit" });
  } catch {
    // Reporter is optional
  }
}

if (process.argv[1] === __filename) {
  main().catch((err) => {
    console.error("Controller error:", err);
    process.exit(1);
  });
}
