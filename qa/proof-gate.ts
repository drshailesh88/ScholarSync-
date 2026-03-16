/**
 * proof-gate.ts
 *
 * Validates that every verdict has real proof artifacts.
 * No artifact on disk = verdict rejected (UNTESTED, not PASS).
 *
 * This is the anti-hallucination layer. The agent cannot claim
 * a feature passed without Playwright having actually run and
 * produced files on disk.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface PlaywrightTestResult {
  title: string;
  status: "passed" | "failed" | "timedOut" | "skipped";
  duration: number;
  errors: string[];
}

export interface Verdict {
  checkpoint_id: string;
  spec_id: string;
  module: string;
  verdict: "PASS" | "FAIL" | "BLOCKED" | "UNTESTED";
  proof: {
    playwright_status: string;
    playwright_exit_code: number;
    screenshot_exists: boolean;
    screenshot_path: string;
    trace_exists: boolean;
    trace_path: string;
    error_message: string | null;
    duration_ms: number;
  };
  timestamp: string;
}

const ARTIFACTS_DIR = path.join(__dirname, "artifacts");

/**
 * Validate a single checkpoint verdict.
 * Returns a verified Verdict object — agent opinion is irrelevant.
 */
export function validateVerdict(
  module: string,
  specId: string,
  checkpointId: string,
  playwrightResult: PlaywrightTestResult,
  playwrightExitCode: number
): Verdict {
  const artifactDir = path.join(ARTIFACTS_DIR, module, specId);
  const screenshotPath = path.join(artifactDir, `${checkpointId}.png`);
  const tracePath = path.join(artifactDir, "trace.zip");

  const screenshotExists = fs.existsSync(screenshotPath);
  const traceExists = fs.existsSync(tracePath);

  // Determine verdict strictly from Playwright output
  let verdict: Verdict["verdict"];

  if (playwrightResult.status === "passed" && screenshotExists) {
    // Playwright says passed AND screenshot exists on disk
    verdict = "PASS";
  } else if (playwrightResult.status === "passed" && !screenshotExists) {
    // Playwright says passed but no screenshot — suspicious, reject
    verdict = "UNTESTED";
  } else if (playwrightResult.status === "timedOut") {
    verdict = "BLOCKED";
  } else if (playwrightResult.status === "skipped") {
    verdict = "UNTESTED";
  } else {
    verdict = "FAIL";
  }

  return {
    checkpoint_id: checkpointId,
    spec_id: specId,
    module,
    verdict,
    proof: {
      playwright_status: playwrightResult.status,
      playwright_exit_code: playwrightExitCode,
      screenshot_exists: screenshotExists,
      screenshot_path: screenshotExists
        ? path.relative(process.cwd(), screenshotPath)
        : "",
      trace_exists: traceExists,
      trace_path: traceExists
        ? path.relative(process.cwd(), tracePath)
        : "",
      error_message:
        playwrightResult.errors.length > 0
          ? playwrightResult.errors.join("; ")
          : null,
      duration_ms: playwrightResult.duration,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Validate an entire spec's results from Playwright JSON output.
 */
export function validateSpecResults(
  module: string,
  specId: string,
  playwrightJsonPath: string,
  exitCode: number
): Verdict[] {
  if (!fs.existsSync(playwrightJsonPath)) {
    // No JSON output = nothing ran
    return [
      {
        checkpoint_id: "all",
        spec_id: specId,
        module,
        verdict: "UNTESTED",
        proof: {
          playwright_status: "no_output",
          playwright_exit_code: exitCode,
          screenshot_exists: false,
          screenshot_path: "",
          trace_exists: false,
          trace_path: "",
          error_message: "Playwright JSON output file not found",
          duration_ms: 0,
        },
        timestamp: new Date().toISOString(),
      },
    ];
  }

  const raw = JSON.parse(fs.readFileSync(playwrightJsonPath, "utf-8"));
  const verdicts: Verdict[] = [];

  // Playwright JSON reporter nests test.describe as sub-suites:
  // { suites: [{ suites: [{ specs: [{ tests: [...] }] }] }] }
  // We need to recursively collect all specs from all nesting levels.
  function collectSpecs(suiteObj: Record<string, unknown>): Record<string, unknown>[] {
    const directSpecs = (suiteObj.specs ?? []) as Record<string, unknown>[];
    const nestedSuites = (suiteObj.suites ?? []) as Record<string, unknown>[];
    let all = [...directSpecs];
    for (const nested of nestedSuites) {
      all = all.concat(collectSpecs(nested));
    }
    return all;
  }

  const topSuites = (raw.suites ?? []) as Record<string, unknown>[];
  for (const suite of topSuites) {
    const allSpecs = collectSpecs(suite);
    for (const spec of allSpecs) {
      const tests = (spec.tests ?? []) as Record<string, unknown>[];
      for (const testEntry of tests) {
        const results = (testEntry.results ?? []) as Record<string, unknown>[];
        const lastResult = results[results.length - 1];
        if (!lastResult) continue;

        // Extract checkpoint ID from test title (format: "cp-000: description")
        const cpMatch = (spec.title as string)?.match(/^(cp-\d+)/);
        const cpId = cpMatch ? cpMatch[1] : `cp-unknown`;

        const rawErrors = (lastResult.errors ?? []) as { message?: string }[];
        const errors = rawErrors.map(
          (e) => e.message ?? "unknown error"
        );

        const playwrightResult: PlaywrightTestResult = {
          title: (spec.title as string) ?? "",
          status: (lastResult.status as PlaywrightTestResult["status"]) ?? "failed",
          duration: (lastResult.duration as number) ?? 0,
          errors,
        };

        verdicts.push(
          validateVerdict(module, specId, cpId, playwrightResult, exitCode)
        );
      }
    }
  }

  return verdicts;
}

/**
 * Summary statistics from verdicts.
 */
export function summarizeVerdicts(verdicts: Verdict[]) {
  return {
    total: verdicts.length,
    pass: verdicts.filter((v) => v.verdict === "PASS").length,
    fail: verdicts.filter((v) => v.verdict === "FAIL").length,
    blocked: verdicts.filter((v) => v.verdict === "BLOCKED").length,
    untested: verdicts.filter((v) => v.verdict === "UNTESTED").length,
  };
}
