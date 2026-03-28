/**
 * Updates the sr-feature-registry.jsonl based on Playwright test results.
 * Maps test names back to feature IDs and updates status.
 *
 * Usage: npx tsx qa/sr-features/update-registry.ts
 */
import * as fs from "fs";
import * as path from "path";

const REGISTRY = path.join(__dirname, "../sr-feature-registry.jsonl");
const RESULTS = path.join(__dirname, "results.json");

interface Feature {
  id: string;
  section: string;
  subsection: string;
  description: string;
  status: string;
  test_file: string | null;
  attempts: number;
  last_error: string | null;
}

interface TestSuite {
  title: string;
  file: string;
  specs: Array<{
    title: string;
    ok: boolean;
    tests: Array<{
      results: Array<{
        status: string;
        error?: { message: string };
      }>;
    }>;
  }>;
  suites?: TestSuite[];
}

interface TestResult {
  suites: TestSuite[];
}

function run() {
  const features: Feature[] = fs
    .readFileSync(REGISTRY, "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));

  let results: TestResult;
  try {
    results = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
  } catch {
    console.log("No results.json found. Run tests first.");
    return;
  }

  // Build a map of passing/failing test titles
  const testResults = new Map<string, { ok: boolean; error?: string; file: string }>();

  function processSubSuites(suites: TestResult["suites"]) {
    for (const suite of suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          testResults.set(spec.title, {
            ok: spec.ok,
            error: spec.tests?.[0]?.results?.[0]?.error?.message,
            file: suite.file,
          });
        }
      }
      if (suite.suites) {
        processSubSuites(suite.suites);
      }
    }
  }
  processSubSuites(results.suites);

  // Map test results back to features
  let verified = 0;
  let tested = 0;
  let blocked = 0;

  for (const feat of features) {
    // Check if any test title contains this feature ID
    for (const [title, result] of testResults) {
      if (title.includes(feat.id)) {
        tested++;
        if (result.ok) {
          feat.status = "verified";
          feat.test_file = result.file;
          verified++;
        } else {
          feat.attempts++;
          feat.last_error = result.error ?? "unknown";
          if (feat.attempts >= 3) {
            feat.status = "blocked";
            blocked++;
          }
        }
        break;
      }
    }
  }

  // Write updated registry
  fs.writeFileSync(REGISTRY, features.map((f) => JSON.stringify(f)).join("\n") + "\n");

  const pending = features.filter((f) => f.status === "pending").length;
  console.log(`\n=== SR Feature Registry Update ===`);
  console.log(`Total: ${features.length}`);
  console.log(`Verified: ${verified}`);
  console.log(`Tested: ${tested}`);
  console.log(`Blocked: ${blocked}`);
  console.log(`Pending: ${pending}`);
  console.log(`Tests found: ${testResults.size}`);
}

run();
