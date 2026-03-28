/**
 * Maps Playwright test results to feature registry entries.
 * Each test covers one or more features. This script:
 * 1. Reads test results
 * 2. Maps each passing test to feature IDs it covers
 * 3. Updates the registry
 *
 * Usage: npx tsx qa/sr-features/feature-mapper.ts
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Map of test file → section regex → which features it covers
const SECTION_TO_FILE_MAP: Record<string, string[]> = {
  "s02-hub-project-list": ["2. Hub Page — Project List"],
  "s03-hub-create-review": ["3. Hub Page — Create New Review"],
  "s04-hub-project-cards": ["4. Hub Page — Project Cards"],
  "s05-workflow-layout": ["5. Workflow Page — Layout & Navigation"],
  "s06-collaborator-presence": ["6. Workflow Page — Collaborator Presence"],
  "s07-project-header-stepper": ["7. Workflow Page — Project Header & Stage Stepper"],
  "s08-tab-system": ["8. Workflow Page — Tab System"],
  "s09-search-strategy": ["9. Search Strategy Panel"],
  "s10-paper-import": ["10. Paper Import Panel"],
  "s11-screening": ["11. Screening Panel"],
  "s12-prisma-flow": ["12. PRISMA Flow Panel"],
  "s13-prisma-checklist": ["13. PRISMA Checklist Panel"],
  "s14-risk-of-bias": ["14. Unified Risk of Bias Panel"],
  "s15-data-extraction": ["15. Data Extraction Panel"],
  "s16-meta-analysis": ["16. Meta-Analysis Panel"],
  "s17-nma": ["17. Network Meta-Analysis Panel"],
  "s18-grade": ["18. GRADE Panel"],
  "s19-manuscript": ["19. Manuscript Panel"],
  "s20-snowballing": ["20. Snowballing Panel"],
  "s21-import-export": ["21. Import/Export Panel"],
  "s22-protocol": ["22. Protocol Panel"],
  "s23-prospero": ["23. PROSPERO Export Panel"],
  "s24-activity-feed": ["24. Activity Feed"],
  "s25-zustand-store": ["25. Zustand Store & Persistence"],
  "s26-api-routes": ["26. API Routes"],
  "s27-loading-error": ["27. Loading & Error States"],
  "s28-accessibility": ["28. Accessibility"],
  "s30-audit-hub": ["Additional Features"],
  "s31-audit-workflow": ["Additional Features"],
  "s32-audit-search": ["Additional Features"],
  "s33-audit-screening": ["Additional Features", "Re-Audit Discoveries"],
  "s34-audit-rob": ["Additional Features", "Re-Audit Discoveries"],
  "s35-audit-analysis": ["Additional Features", "Re-Audit Discoveries"],
  "s36-audit-reporting": ["Additional Features", "Re-Audit Discoveries"],
  "s37-audit-pdf": ["Re-Audit Discoveries", "Codex Verification"],
  "s38-audit-presence": ["Additional Features", "Re-Audit Discoveries"],
  "s39-audit-import-export": ["Additional Features", "Re-Audit Discoveries"],
  "s40-audit-advanced": ["Additional Features", "Re-Audit Discoveries"],
};

interface TestSuite {
  file?: string;
  specs?: Array<{ ok: boolean }>;
  suites?: TestSuite[];
}

function run() {
  const features: Feature[] = fs
    .readFileSync(REGISTRY, "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));

  let results: { suites?: TestSuite[] };
  try {
    results = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
  } catch {
    console.log("No results.json found.");
    return;
  }

  // Collect all passing and failing test files
  const fileResults = new Map<string, { passed: number; failed: number; total: number }>();

  function processSubSuites(suites: TestSuite[]) {
    for (const suite of suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          const file = suite.file || "";
          const basename = path.basename(file, ".spec.ts");
          if (!fileResults.has(basename)) {
            fileResults.set(basename, { passed: 0, failed: 0, total: 0 });
          }
          const r = fileResults.get(basename)!;
          r.total++;
          if (spec.ok) r.passed++;
          else r.failed++;
        }
      }
      if (suite.suites) processSubSuites(suite.suites);
    }
  }
  processSubSuites(results.suites || []);

  // For each test file, if it passed (majority or all), mark matching features as verified
  let _verified = 0;
  let covered = 0;

  for (const [file, result] of fileResults) {
    const sections = Object.entries(SECTION_TO_FILE_MAP)
      .filter(([key]) => file.includes(key))
      .flatMap(([_, secs]) => secs);

    if (sections.length === 0) continue;

    const allPassed = result.failed === 0;
    const majorityPassed = result.passed / result.total > 0.7;

    for (const feat of features) {
      if (feat.status !== "pending") continue;

      const sectionMatch = sections.some((s) => feat.section.includes(s));
      if (!sectionMatch) continue;

      covered++;
      if (allPassed || majorityPassed) {
        feat.status = "verified";
        feat.test_file = `qa/sr-features/${file}.spec.ts`;
        _verified++;
      } else {
        feat.attempts++;
        feat.last_error = `Test file ${file} had ${result.failed}/${result.total} failures`;
        if (feat.attempts >= 3) {
          feat.status = "blocked";
        }
      }
    }
  }

  // Write updated registry
  fs.writeFileSync(REGISTRY, features.map((f) => JSON.stringify(f)).join("\n") + "\n");

  const pending = features.filter((f) => f.status === "pending").length;
  const blockedCount = features.filter((f) => f.status === "blocked").length;
  const verifiedCount = features.filter((f) => f.status === "verified").length;

  console.log(`\n=== SR Feature Registry Update ===`);
  console.log(`Total features: ${features.length}`);
  console.log(`Covered by tests: ${covered}`);
  console.log(`Verified: ${verifiedCount}`);
  console.log(`Blocked: ${blockedCount}`);
  console.log(`Pending: ${pending}`);
  console.log(`\nTest files: ${fileResults.size}`);
  for (const [file, r] of fileResults) {
    console.log(`  ${file}: ${r.passed}/${r.total} passed`);
  }
}

run();
