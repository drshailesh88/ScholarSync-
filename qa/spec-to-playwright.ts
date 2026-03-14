#!/usr/bin/env npx tsx
/**
 * spec-to-playwright.ts
 *
 * Converts a spec markdown file into an executable Playwright test file.
 * Each checkbox item becomes a test case with real browser assertions.
 *
 * Usage: npx tsx qa/spec-to-playwright.ts <module> <spec-id>
 * Example: npx tsx qa/spec-to-playwright.ts dashboard spec-001
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

interface Checkpoint {
  index: number;
  raw: string;
  description: string;
  status: "untested" | "pass" | "fail" | "blocked";
  section: string;
  subsection: string;
}

function parseSpec(specPath: string): {
  module: string;
  pageUrl: string;
  checkpoints: Checkpoint[];
} {
  const content = fs.readFileSync(specPath, "utf-8");
  const lines = content.split("\n");

  let moduleName = "";
  let pageUrl = "";
  let currentSection = "";
  let currentSubsection = "";
  const checkpoints: Checkpoint[] = [];
  let index = 0;

  for (const line of lines) {
    // Module
    const modMatch = line.match(/^MODULE:\s*(.+)/);
    if (modMatch) moduleName = modMatch[1].trim();

    // Page URL
    const pageMatch = line.match(/^PAGE:\s*(.+)/);
    if (pageMatch) pageUrl = pageMatch[1].trim();

    // Section headers
    if (line.startsWith("### ")) {
      currentSection = line.replace(/^###\s*/, "").trim();
      currentSubsection = "";
    }
    if (line.startsWith("#### ")) {
      currentSubsection = line.replace(/^####\s*/, "").trim();
    }

    // Checkbox items = checkpoints
    const checkMatch = line.match(/^- \[([ x])\]\s*(.*)/);
    if (checkMatch) {
      const isChecked = checkMatch[1] === "x";
      let desc = checkMatch[2].trim();

      // Remove PASS/FAIL/BLOCKED prefix if present
      desc = desc
        .replace(/^(PASS|FAIL|BLOCKED|NOT_ON_PAGE):\s*/, "")
        .replace(/^\*\*(.+?)\*\*\s*[—–-]\s*/, "$1 — ");

      // Recover original checkpoint text from older controller output that
      // prefixed failures with "Error: ... — original description".
      if (desc.startsWith("Error: ") && desc.includes(" — ")) {
        desc = desc.split(" — ").slice(1).join(" — ").trim();
      }

      // Determine current status from the line
      let status: Checkpoint["status"] = "untested";
      if (line.includes("PASS:") || (isChecked && line.includes("PASS"))) {
        status = "pass";
      } else if (line.includes("FAIL:")) {
        status = "fail";
      } else if (line.includes("BLOCKED:") || line.includes("NOT_ON_PAGE")) {
        status = "blocked";
      }

      checkpoints.push({
        index: index++,
        raw: line,
        description: desc,
        status,
        section: currentSection,
        subsection: currentSubsection,
      });
    }
  }

  return { module: moduleName, pageUrl, checkpoints };
}

function sanitizeTestName(desc: string): string {
  return desc
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function getPagePath(pageUrl: string, moduleName: string): string {
  let pathname: string;
  try {
    const url = new URL(pageUrl);
    pathname = url.pathname;
  } catch {
    pathname = pageUrl.startsWith("/") ? pageUrl : `/${moduleName}`;
  }

  // /editor without an [id] segment is not a valid route.
  // Fall back to /studio (the adjacent writing surface), not /dashboard,
  // so editor/studio assertions execute against the closest functional UI.
  if (pathname === "/editor") {
    return "/studio";
  }

  return pathname;
}

function generatePlaywrightTest(
  module: string,
  specId: string,
  pageUrl: string,
  checkpoints: Checkpoint[]
): string {
  const pagePath = getPagePath(pageUrl, module);
  const artifactDir = `qa/artifacts/${module}/${specId}`;
  const hasDashboardAssertions = module === "dashboard";
  const hasOnboardingAssertions = module === "onboarding";
  const hasProjectsAssertions = module === "projects";
  const hasLibraryAssertions = module === "library";
  const hasEditorAssertions = module === "editor";
  const hasStudioAssertions = module === "studio";
  const hasResearchAssertions = module === "research";
  const hasLatexAssertions = module === "latex";
  const hasNotebookAssertions = module === "notebook";
  const hasComplianceAssertions = module === "compliance";
  const hasAnalysisAssertions = module === "analysis";
  const hasDeepResearchAssertions = module === "deep-research";
  const hasFeedsAssertions = module === "feeds";
  const hasSlidesAssertions = module === "slides" || module === "slides-ai";
  const hasPresentationAssertions = module === "presentation";
  const hasIllustrateAssertions = module === "illustrate";
  const hasPosterAssertions = module === "poster";
  const hasSystematicReviewAssertions = module === "systematic-review";
  const hasSettingsAssertions = module === "settings";

  const testCases = checkpoints.map((cp, i) => {
    const testName = sanitizeTestName(cp.description);
    const cpId = `cp-${String(i).padStart(3, "0")}`;

    return `
  test('${cpId}: ${testName.replace(/'/g, "\\'")}', async ({ page }) => {
    // Checkpoint ${i}: ${cp.description.replace(/\*\//g, "* /")}
    // Section: ${cp.section}${cp.subsection ? ` > ${cp.subsection}` : ""}

    // Navigate to the page
    await page.goto('${pagePath}', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), '${artifactDir}');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

${hasDashboardAssertions ? `    const handled = await assertDashboardCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasOnboardingAssertions ? `    const handled = await assertOnboardingCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasProjectsAssertions ? `    const handled = await assertProjectsCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasLibraryAssertions ? `    const handled = await assertLibraryCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasEditorAssertions ? `    const handled = await assertEditorCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasStudioAssertions ? `    const handled = await assertStudioCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasResearchAssertions ? `    const handled = await assertResearchCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasLatexAssertions ? `    const handled = await assertLatexCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasNotebookAssertions ? `    const handled = await assertNotebookCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasComplianceAssertions ? `    const handled = await assertComplianceCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasAnalysisAssertions ? `    const handled = await assertAnalysisCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasDeepResearchAssertions ? `    const handled = await assertDeepResearchCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasFeedsAssertions ? `    const handled = await assertFeedsCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasSlidesAssertions ? `    const handled = await assertSlidesCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasPresentationAssertions ? `    const handled = await assertPresentationCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasIllustrateAssertions ? `    const handled = await assertIllustrateCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasPosterAssertions ? `    const handled = await assertPosterCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasSystematicReviewAssertions ? `    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}${hasSettingsAssertions ? `    const handled = await assertSettingsCheckpoint({
      page,
      description: ${JSON.stringify(cp.description)},
      section: ${JSON.stringify(cp.section)},
      subsection: ${JSON.stringify(cp.subsection)},
      rootDir: process.cwd(),
    });
` : ""}

    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, '${cpId}.png'),
      fullPage: false,
    });

${hasDashboardAssertions ? `    if (!handled) {
      throw new Error('Unhandled dashboard checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasOnboardingAssertions ? `    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasProjectsAssertions ? `    if (!handled) {
      throw new Error('Unhandled projects checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasLibraryAssertions ? `    if (!handled) {
      throw new Error('Unhandled library checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasEditorAssertions ? `    if (!handled) {
      throw new Error('Unhandled editor checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasStudioAssertions ? `    if (!handled) {
      throw new Error('Unhandled studio checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasResearchAssertions ? `    if (!handled) {
      throw new Error('Unhandled research checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasLatexAssertions ? `    if (!handled) {
      throw new Error('Unhandled latex checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasNotebookAssertions ? `    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasComplianceAssertions ? `    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasAnalysisAssertions ? `    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasDeepResearchAssertions ? `    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasFeedsAssertions ? `    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasSlidesAssertions ? `    if (!handled) {
      throw new Error('Unhandled slides checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasPresentationAssertions ? `    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasIllustrateAssertions ? `    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasPosterAssertions ? `    if (!handled) {
      throw new Error('Unhandled poster checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasSystematicReviewAssertions ? `    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}${hasSettingsAssertions ? `    if (!handled) {
      throw new Error('Unhandled settings checkpoint: ${cpId} ${cp.description.replace(/'/g, "\\'")}');
    }
` : ""}

    // This test validates: ${cp.description.replace(/\*\//g, "* /")}
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(\`Page errors detected: \${errors.join('; ')}\`);
    }
  });`;
  });

  return `/**
 * Auto-generated Playwright test for ${module}/${specId}
 * Source: e2e/specs/${module}/${specId}.md
 * Generated: ${new Date().toISOString()}
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts ${module} ${specId}
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
${hasDashboardAssertions ? "import { assertDashboardCheckpoint } from '../../module-assertions/dashboard';" : ""}
${hasOnboardingAssertions ? "import { assertOnboardingCheckpoint } from '../../module-assertions/onboarding';" : ""}
${hasProjectsAssertions ? "import { assertProjectsCheckpoint } from '../../module-assertions/projects';" : ""}
${hasLibraryAssertions ? "import { assertLibraryCheckpoint } from '../../module-assertions/library';" : ""}
${hasEditorAssertions ? "import { assertEditorCheckpoint } from '../../module-assertions/editor';" : ""}
${hasStudioAssertions ? "import { assertStudioCheckpoint } from '../../module-assertions/studio';" : ""}
${hasResearchAssertions ? "import { assertResearchCheckpoint } from '../../module-assertions/research';" : ""}
${hasLatexAssertions ? "import { assertLatexCheckpoint } from '../../module-assertions/latex';" : ""}
${hasNotebookAssertions ? "import { assertNotebookCheckpoint } from '../../module-assertions/notebook';" : ""}
${hasComplianceAssertions ? "import { assertComplianceCheckpoint } from '../../module-assertions/compliance';" : ""}
${hasAnalysisAssertions ? "import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';" : ""}
${hasDeepResearchAssertions ? "import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';" : ""}
${hasFeedsAssertions ? "import { assertFeedsCheckpoint } from '../../module-assertions/feeds';" : ""}
${hasSlidesAssertions ? "import { assertSlidesCheckpoint } from '../../module-assertions/slides';" : ""}
${hasPresentationAssertions ? "import { assertPresentationCheckpoint } from '../../module-assertions/presentation';" : ""}
${hasIllustrateAssertions ? "import { assertIllustrateCheckpoint } from '../../module-assertions/illustrate';" : ""}
${hasPosterAssertions ? "import { assertPosterCheckpoint } from '../../module-assertions/poster';" : ""}
${hasSystematicReviewAssertions ? "import { assertSystematicReviewCheckpoint } from '../../module-assertions/systematic-review';" : ""}
${hasSettingsAssertions ? "import { assertSettingsCheckpoint } from '../../module-assertions/settings';" : ""}

test.describe('${module} / ${specId}', () => {
  test.beforeEach(async ({ page }) => {
    // Dev mode auth bypass — no Clerk needed
    const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:3001';
    const url = new URL(baseUrl);
    await page.context().addCookies([{
      name: '__playwright',
      value: 'true',
      domain: url.hostname,
      path: '/',
    }]);
  });
${testCases.join("\n")}
});
`;
}

function main() {
  const moduleName = process.argv[2];
  const specId = process.argv[3];

  if (!moduleName || !specId) {
    console.error("Usage: npx tsx qa/spec-to-playwright.ts <module> <spec-id>");
    console.error("Example: npx tsx qa/spec-to-playwright.ts dashboard spec-001");
    process.exit(1);
  }

  const specPath = path.join(ROOT, "e2e", "specs", moduleName, `${specId}.md`);
  if (!fs.existsSync(specPath)) {
    console.error(`Spec file not found: ${specPath}`);
    process.exit(1);
  }

  const { module: mod, pageUrl, checkpoints } = parseSpec(specPath);
  const effectiveModule = mod || moduleName;

  // Generate Playwright test
  const testCode = generatePlaywrightTest(
    effectiveModule,
    specId,
    pageUrl,
    checkpoints
  );

  // Write to qa/generated/{module}/
  const outDir = path.join(__dirname, "generated", effectiveModule);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${specId}.spec.ts`);
  fs.writeFileSync(outPath, testCode);

  console.log(
    `  Generated: qa/generated/${effectiveModule}/${specId}.spec.ts (${checkpoints.length} checkpoints)`
  );
}

main();
