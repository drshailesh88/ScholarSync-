/**
 * Auto-generated Playwright test for compliance/spec-012
 * Source: e2e/specs/compliance/spec-012.md
 * Generated: 2026-03-15T18:36:16.946Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-012', () => {
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

  test('cp-000: Humanize loading copy reads Humanizing and failed humanize requests stay silent ', async ({ page }) => {
    // Checkpoint 0: Humanize loading copy reads `Humanizing...`, and failed humanize requests stay silent in the UI
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize loading copy reads `Humanizing...`, and failed humanize requests stay silent in the UI",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "Humanize loading copy reads `Humanizing...`, and failed humanize requests stay silent in the UI");
    }


    // This test validates: Humanize loading copy reads `Humanizing...`, and failed humanize requests stay silent in the UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Successful humanize output starts with Humanized Version and renders one green c', async ({ page }) => {
    // Checkpoint 1: Successful humanize output starts with `Humanized Version:` and renders one green change chip per `changes[]` entry
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Successful humanize output starts with `Humanized Version:` and renders one green change chip per `changes[]` entry",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "Successful humanize output starts with `Humanized Version:` and renders one green change chip per `changes[]` entry");
    }


    // This test validates: Successful humanize output starts with `Humanized Version:` and renders one green change chip per `changes[]` entry
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Paraphrase requests post text text sourceTitle sourceTitle sourceDoi sourceDoi f', async ({ page }) => {
    // Checkpoint 2: Paraphrase requests post `{"text": text, "sourceTitle": sourceTitle, "sourceDoi": sourceDoi}` from the page layer
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase requests post `{\"text\": text, \"sourceTitle\": sourceTitle, \"sourceDoi\": sourceDoi}` from the page layer",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "Paraphrase requests post `{\"text\": text, \"sourceTitle\": sourceTitle, \"sourceDoi\": sourceDoi}` from the page layer");
    }


    // This test validates: Paraphrase requests post `{"text": text, "sourceTitle": sourceTitle, "sourceDoi": sourceDoi}` from the page layer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Paraphrase loading copy reads Paraphrasing and failed paraphrase requests stay s', async ({ page }) => {
    // Checkpoint 3: Paraphrase loading copy reads `Paraphrasing...`, and failed paraphrase requests stay silent in the UI
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase loading copy reads `Paraphrasing...`, and failed paraphrase requests stay silent in the UI",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "Paraphrase loading copy reads `Paraphrasing...`, and failed paraphrase requests stay silent in the UI");
    }


    // This test validates: Paraphrase loading copy reads `Paraphrasing...`, and failed paraphrase requests stay silent in the UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Citation Audit is omitted when resultcitationAudit is missing truncates to issue', async ({ page }) => {
    // Checkpoint 4: Citation Audit is omitted when `result.citationAudit` is missing, truncates to `issues.slice(0, 8)`, and only shows `Ref: ...` when `issue.reference` exists
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Citation Audit is omitted when `result.citationAudit` is missing, truncates to `issues.slice(0, 8)`, and only shows `Ref: ...` when `issue.reference` exists",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "Citation Audit is omitted when `result.citationAudit` is missing, truncates to `issues.slice(0, 8)`, and only shows `Ref: ...` when `issue.reference` exists");
    }


    // This test validates: Citation Audit is omitted when `result.citationAudit` is missing, truncates to `issues.slice(0, 8)`, and only shows `Ref: ...` when `issue.reference` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Add Citation uses navigatorclipboardwriteText and Copied feedback resets after 2', async ({ page }) => {
    // Checkpoint 5: `Add Citation` uses `navigator.clipboard.writeText(...)`, and `Copied!` feedback resets after `2000` ms
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`Add Citation` uses `navigator.clipboard.writeText(...)`, and `Copied!` feedback resets after `2000` ms",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "`Add Citation` uses `navigator.clipboard.writeText(...)`, and `Copied!` feedback resets after `2000` ms");
    }


    // This test validates: `Add Citation` uses `navigator.clipboard.writeText(...)`, and `Copied!` feedback resets after `2000` ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: History fetches apiintegrity-checkhistorylimit20 and the sparkline renders only ', async ({ page }) => {
    // Checkpoint 6: History fetches `/api/integrity-check/history?limit=20`, and the sparkline renders only when there are at least `2` entries using `h.aiScore ?? 50`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "History fetches `/api/integrity-check/history?limit=20`, and the sparkline renders only when there are at least `2` entries using `h.aiScore ?? 50`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "History fetches `/api/integrity-check/history?limit=20`, and the sparkline renders only when there are at least `2` entries using `h.aiScore ?? 50`");
    }


    // This test validates: History fetches `/api/integrity-check/history?limit=20`, and the sparkline renders only when there are at least `2` entries using `h.aiScore ?? 50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: History AI scores use orange text only above 50 plagiarism scores use red text o', async ({ page }) => {
    // Checkpoint 7: History AI scores use orange text only above `50`, plagiarism scores use red text only above `15`, and the empty state reads `No integrity checks found. Run your first check to see history here.`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "History AI scores use orange text only above `50`, plagiarism scores use red text only above `15`, and the empty state reads `No integrity checks found. Run your first check to see history here.`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "History AI scores use orange text only above `50`, plagiarism scores use red text only above `15`, and the empty state reads `No integrity checks found. Run your first check to see history here.`");
    }


    // This test validates: History AI scores use orange text only above `50`, plagiarism scores use red text only above `15`, and the empty state reads `No integrity checks found. Run your first check to see history here.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Writing Quality always renders the Passive Voice Avg WordsSentence and Grade met', async ({ page }) => {
    // Checkpoint 8: Writing Quality always renders the `Passive Voice`, `Avg Words/Sentence`, and `Grade` metric cards; numeric sentence-length and readability values use `toFixed(1)`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Writing Quality always renders the `Passive Voice`, `Avg Words/Sentence`, and `Grade` metric cards; numeric sentence-length and readability values use `toFixed(1)`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "Writing Quality always renders the `Passive Voice`, `Avg Words/Sentence`, and `Grade` metric cards; numeric sentence-length and readability values use `toFixed(1)`");
    }


    // This test validates: Writing Quality always renders the `Passive Voice`, `Avg Words/Sentence`, and `Grade` metric cards; numeric sentence-length and readability values use `toFixed(1)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Writing suggestions stay hidden when resultwritingQualitysuggestionslength 0', async ({ page }) => {
    // Checkpoint 9: Writing suggestions stay hidden when `result.writingQuality.suggestions.length === 0`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Writing suggestions stay hidden when `result.writingQuality.suggestions.length === 0`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "Writing suggestions stay hidden when `result.writingQuality.suggestions.length === 0`");
    }


    // This test validates: Writing suggestions stay hidden when `result.writingQuality.suggestions.length === 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Download Report posts the current result the page inputText as the text field an', async ({ page }) => {
    // Checkpoint 10: Download Report posts the current `result`, the page `inputText` as the `text` field, and the optional `documentTitle`; the downloaded filename is `integrity-report-YYYY-MM-DD.md`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Download Report posts the current `result`, the page `inputText` as the `text` field, and the optional `documentTitle`; the downloaded filename is `integrity-report-YYYY-MM-DD.md`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Download Report posts the current `result`, the page `inputText` as the `text` field, and the optional `documentTitle`; the downloaded filename is `integrity-report-YYYY-MM-DD.md`");
    }


    // This test validates: Download Report posts the current `result`, the page `inputText` as the `text` field, and the optional `documentTitle`; the downloaded filename is `integrity-report-YYYY-MM-DD.md`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Download Report failures are silent and do not render a toast or inline error', async ({ page }) => {
    // Checkpoint 11: Download Report failures are silent and do not render a toast or inline error
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Download Report failures are silent and do not render a toast or inline error",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Download Report failures are silent and do not render a toast or inline error");
    }


    // This test validates: Download Report failures are silent and do not render a toast or inline error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: DiffView scroll sync uses a requestAnimationFrame release guard plagiarism highl', async ({ page }) => {
    // Checkpoint 12: `DiffView` scroll sync uses a `requestAnimationFrame` release guard, plagiarism highlights require an exact matched excerpt in the paragraph text, citation `Warning` icons use severity colors, and the legend reads `AI (high)`, `AI (med)`, `Plagiarism`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`DiffView` scroll sync uses a `requestAnimationFrame` release guard, plagiarism highlights require an exact matched excerpt in the paragraph text, citation `Warning` icons use severity colors, and the legend reads `AI (high)`, `AI (med)`, `Plagiarism`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "`DiffView` scroll sync uses a `requestAnimationFrame` release guard, plagiarism highlights require an exact matched excerpt in the paragraph text, citation `Warning` icons use severity colors, and the legend reads `AI (high)`, `AI (med)`, `Plagiarism`");
    }


    // This test validates: `DiffView` scroll sync uses a `requestAnimationFrame` release guard, plagiarism highlights require an exact matched excerpt in the paragraph text, citation `Warning` icons use severity colors, and the legend reads `AI (high)`, `AI (med)`, `Plagiarism`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Check New Text clears result paragraphs copyleaksResult copyleaksScanId copyleak', async ({ page }) => {
    // Checkpoint 13: `Check New Text` clears `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`, but preserves `inputText`, `sourceMode`, `pageTab`, `viewMode`, and `copiedCitation`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`Check New Text` clears `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`, but preserves `inputText`, `sourceMode`, `pageTab`, `viewMode`, and `copiedCitation`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "`Check New Text` clears `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`, but preserves `inputText`, `sourceMode`, `pageTab`, `viewMode`, and `copiedCitation`");
    }


    // This test validates: `Check New Text` clears `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`, but preserves `inputText`, `sourceMode`, `pageTab`, `viewMode`, and `copiedCitation`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: CORRECTION Codex Pass 2 incorrectly stated loadingtsx and errortsx do not exist ', async ({ page }) => {
    // Checkpoint 14: **CORRECTION**: Codex Pass 2 incorrectly stated `loading.tsx` and `error.tsx` do not exist. Both files exist at `src/app/(app)/compliance/loading.tsx` and `src/app/(app)/compliance/error.tsx`. The Pass 1 checks for these files (lines 924-926) are CORRECT.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "**CORRECTION**: Codex Pass 2 incorrectly stated `loading.tsx` and `error.tsx` do not exist. Both files exist at `src/app/(app)/compliance/loading.tsx` and `src/app/(app)/compliance/error.tsx`. The Pass 1 checks for these files (lines 924-926) are CORRECT.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "**CORRECTION**: Codex Pass 2 incorrectly stated `loading.tsx` and `error.tsx` do not exist. Both files exist at `src/app/(app)/compliance/loading.tsx` and `src/app/(app)/compliance/error.tsx`. The Pass 1 checks for these files (lines 924-926) are CORRECT.");
    }


    // This test validates: **CORRECTION**: Codex Pass 2 incorrectly stated `loading.tsx` and `error.tsx` do not exist. Both files exist at `src/app/(app)/compliance/loading.tsx` and `src/app/(app)/compliance/error.tsx`. The Pass 1 checks for these files (lines 924-926) are CORRECT.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: CORRECTION Add Citation format is NOT Title Year DOI doi with static parts The a', async ({ page }) => {
    // Checkpoint 15: **CORRECTION**: `Add Citation` format is NOT `"{Title} ({Year}). DOI: {doi}"` with static parts. The actual template is `` `${match.source.title}${match.source.year ? ` (${match.source.year})` : ""}${match.source.doi ? `. DOI: ${match.source.doi}` : ""}` `` — year and DOI are both conditional, and there are no surrounding quotes in the copied string.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "**CORRECTION**: `Add Citation` format is NOT `\"{Title} ({Year}). DOI: {doi}\"` with static parts. The actual template is `` `${match.source.title}${match.source.year ? ` (${match.source.year})` : \"\"}${match.source.doi ? `. DOI: ${match.source.doi}` : \"\"}` `` — year and DOI are both conditional, and there are no surrounding quotes in the copied string.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "**CORRECTION**: `Add Citation` format is NOT `\"{Title} ({Year}). DOI: {doi}\"` with static parts. The actual template is `` `${match.source.title}${match.source.year ? ` (${match.source.year})` : \"\"}${match.source.doi ? `. DOI: ${match.source.doi}` : \"\"}` `` — year and DOI are both conditional, and there are no surrounding quotes in the copied string.");
    }


    // This test validates: **CORRECTION**: `Add Citation` format is NOT `"{Title} ({Year}). DOI: {doi}"` with static parts. The actual template is `` `${match.source.title}${match.source.year ? ` (${match.source.year})` : ""}${match.source.doi ? `. DOI: ${match.source.doi}` : ""}` `` — year and DOI are both conditional, and there are no surrounding quotes in the copied string.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Color thresholds value 80 22c55e green 60 eab308 yellow 40 f97316 orange 40 ef44', async ({ page }) => {
    // Checkpoint 16: Color thresholds: value `>= 80` → `#22c55e` (green), `>= 60` → `#eab308` (yellow), `>= 40` → `#f97316` (orange), `< 40` → `#ef4444` (red)
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Color thresholds: value `>= 80` → `#22c55e` (green), `>= 60` → `#eab308` (yellow), `>= 40` → `#f97316` (orange), `< 40` → `#ef4444` (red)",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "Color thresholds: value `>= 80` → `#22c55e` (green), `>= 60` → `#eab308` (yellow), `>= 40` → `#f97316` (orange), `< 40` → `#ef4444` (red)");
    }


    // This test validates: Color thresholds: value `>= 80` → `#22c55e` (green), `>= 60` → `#eab308` (yellow), `>= 40` → `#f97316` (orange), `< 40` → `#ef4444` (red)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Default size prop is 140 compliance page passes 110 IntegrityPanel passes 90', async ({ page }) => {
    // Checkpoint 17: Default `size` prop is `140`; compliance page passes `110`, IntegrityPanel passes `90`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Default `size` prop is `140`; compliance page passes `110`, IntegrityPanel passes `90`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "Default `size` prop is `140`; compliance page passes `110`, IntegrityPanel passes `90`");
    }


    // This test validates: Default `size` prop is `140`; compliance page passes `110`, IntegrityPanel passes `90`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: strokeWidth hardcoded to 10 radius calculated as size - strokeWidth 2', async ({ page }) => {
    // Checkpoint 18: `strokeWidth` hardcoded to `10`; radius calculated as `(size - strokeWidth) / 2`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`strokeWidth` hardcoded to `10`; radius calculated as `(size - strokeWidth) / 2`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "`strokeWidth` hardcoded to `10`; radius calculated as `(size - strokeWidth) / 2`");
    }


    // This test validates: `strokeWidth` hardcoded to `10`; radius calculated as `(size - strokeWidth) / 2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Arc fill offset computed as circumference - value 100 circumference where circum', async ({ page }) => {
    // Checkpoint 19: Arc fill offset computed as `circumference - (value / 100) * circumference` where `circumference = 2 * Math.PI * radius`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Arc fill offset computed as `circumference - (value / 100) * circumference` where `circumference = 2 * Math.PI * radius`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Arc fill offset computed as `circumference - (value / 100) * circumference` where `circumference = 2 * Math.PI * radius`");
    }


    // This test validates: Arc fill offset computed as `circumference - (value / 100) * circumference` where `circumference = 2 * Math.PI * radius`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: SVG element has className-rotate-90 so the arc starts from 12 oclock position', async ({ page }) => {
    // Checkpoint 20: SVG element has `className="-rotate-90"` so the arc starts from 12 o'clock position
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "SVG element has `className=\"-rotate-90\"` so the arc starts from 12 o'clock position",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "SVG element has `className=\"-rotate-90\"` so the arc starts from 12 o'clock position");
    }


    // This test validates: SVG element has `className="-rotate-90"` so the arc starts from 12 o'clock position
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Active arc has strokeLinecapround for rounded cap ends', async ({ page }) => {
    // Checkpoint 21: Active arc has `strokeLinecap="round"` for rounded cap ends
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Active arc has `strokeLinecap=\"round\"` for rounded cap ends",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "Active arc has `strokeLinecap=\"round\"` for rounded cap ends");
    }


    // This test validates: Active arc has `strokeLinecap="round"` for rounded cap ends
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Active arc has classNametransition-all duration-1000 for animated fill on value ', async ({ page }) => {
    // Checkpoint 22: Active arc has `className="transition-all duration-1000"` for animated fill on value change
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Active arc has `className=\"transition-all duration-1000\"` for animated fill on value change",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "Active arc has `className=\"transition-all duration-1000\"` for animated fill on value change");
    }


    // This test validates: Active arc has `className="transition-all duration-1000"` for animated fill on value change
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Background track circle uses strokevar--surface-raised and fillnone', async ({ page }) => {
    // Checkpoint 23: Background track circle uses `stroke="var(--surface-raised)"` and `fill="none"`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Background track circle uses `stroke=\"var(--surface-raised)\"` and `fill=\"none\"`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "Background track circle uses `stroke=\"var(--surface-raised)\"` and `fill=\"none\"`");
    }


    // This test validates: Background track circle uses `stroke="var(--surface-raised)"` and `fill="none"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Center value text styled text-2xl font-bold text-ink', async ({ page }) => {
    // Checkpoint 24: Center value text styled `text-2xl font-bold text-ink`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Center value text styled `text-2xl font-bold text-ink`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "Center value text styled `text-2xl font-bold text-ink`");
    }


    // This test validates: Center value text styled `text-2xl font-bold text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Label text below gauge styled text-sm font-medium text-ink-muted', async ({ page }) => {
    // Checkpoint 25: Label text below gauge styled `text-sm font-medium text-ink-muted`
    // Section: Quick Test Workflows > CircularGauge Component (`src/components/ui/circular-gauge.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Label text below gauge styled `text-sm font-medium text-ink-muted`",
      section: "Quick Test Workflows",
      subsection: "CircularGauge Component (`src/components/ui/circular-gauge.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "Label text below gauge styled `text-sm font-medium text-ink-muted`");
    }


    // This test validates: Label text below gauge styled `text-sm font-medium text-ink-muted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: showText prop defaults to true compliance page passes showTextfalse for paragrap', async ({ page }) => {
    // Checkpoint 26: `showText` prop defaults to `true`; compliance page passes `showText={false}` for paragraph and Copyleaks bars
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`showText` prop defaults to `true`; compliance page passes `showText={false}` for paragraph and Copyleaks bars",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "`showText` prop defaults to `true`; compliance page passes `showText={false}` for paragraph and Copyleaks bars");
    }


    // This test validates: `showText` prop defaults to `true`; compliance page passes `showText={false}` for paragraph and Copyleaks bars
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Fill percentage is capped at 100 Mathminvalue max 100 100', async ({ page }) => {
    // Checkpoint 27: Fill percentage is capped at 100: `Math.min((value / max) * 100, 100)`
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Fill percentage is capped at 100: `Math.min((value / max) * 100, 100)`",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "Fill percentage is capped at 100: `Math.min((value / max) * 100, 100)`");
    }


    // This test validates: Fill percentage is capped at 100: `Math.min((value / max) * 100, 100)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Handles unlimited mode when max 0 renders 30 fill width and appends Unlimited to', async ({ page }) => {
    // Checkpoint 28: Handles unlimited mode when `max < 0` — renders 30% fill width and appends `" (Unlimited)"` to the text label
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Handles unlimited mode when `max < 0` — renders 30% fill width and appends `\" (Unlimited)\"` to the text label",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "Handles unlimited mode when `max < 0` — renders 30% fill width and appends `\" (Unlimited)\"` to the text label");
    }


    // This test validates: Handles unlimited mode when `max < 0` — renders 30% fill width and appends `" (Unlimited)"` to the text label
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Default bar color is var--brand when no color prop is provided', async ({ page }) => {
    // Checkpoint 29: Default bar color is `var(--brand)` when no `color` prop is provided
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Default bar color is `var(--brand)` when no `color` prop is provided",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "Default bar color is `var(--brand)` when no `color` prop is provided");
    }


    // This test validates: Default bar color is `var(--brand)` when no `color` prop is provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Fill element has classNametransition-all duration-500 for animated width changes', async ({ page }) => {
    // Checkpoint 30: Fill element has `className="transition-all duration-500"` for animated width changes
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Fill element has `className=\"transition-all duration-500\"` for animated width changes",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "Fill element has `className=\"transition-all duration-500\"` for animated width changes");
    }


    // This test validates: Fill element has `className="transition-all duration-500"` for animated width changes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Track element h-2 rounded-full bg-surface-raised overflow-hidden', async ({ page }) => {
    // Checkpoint 31: Track element: `h-2 rounded-full bg-surface-raised overflow-hidden`
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Track element: `h-2 rounded-full bg-surface-raised overflow-hidden`",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "Track element: `h-2 rounded-full bg-surface-raised overflow-hidden`");
    }


    // This test validates: Track element: `h-2 rounded-full bg-surface-raised overflow-hidden`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Fill element h-full rounded-full with inline backgroundColor and width styles', async ({ page }) => {
    // Checkpoint 32: Fill element: `h-full rounded-full` with inline `backgroundColor` and `width` styles
    // Section: Quick Test Workflows > ProgressBar Component (`src/components/ui/progress-bar.tsx`)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Fill element: `h-full rounded-full` with inline `backgroundColor` and `width` styles",
      section: "Quick Test Workflows",
      subsection: "ProgressBar Component (`src/components/ui/progress-bar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "Fill element: `h-full rounded-full` with inline `backgroundColor` and `width` styles");
    }


    // This test validates: Fill element: `h-full rounded-full` with inline `backgroundColor` and `width` styles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: contentChecked persisted to DB is truncated to first 5000 characters parseddatat', async ({ page }) => {
    // Checkpoint 33: `contentChecked` persisted to DB is truncated to first 5000 characters: `parsed.data.text.slice(0, 5000)`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`contentChecked` persisted to DB is truncated to first 5000 characters: `parsed.data.text.slice(0, 5000)`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "`contentChecked` persisted to DB is truncated to first 5000 characters: `parsed.data.text.slice(0, 5000)`");
    }


    // This test validates: `contentChecked` persisted to DB is truncated to first 5000 characters: `parsed.data.text.slice(0, 5000)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: checkType persisted as both when resultplagiarism exists ai_detection otherwise', async ({ page }) => {
    // Checkpoint 34: `checkType` persisted as `"both"` when `result.plagiarism` exists, `"ai_detection"` otherwise
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`checkType` persisted as `\"both\"` when `result.plagiarism` exists, `\"ai_detection\"` otherwise",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "`checkType` persisted as `\"both\"` when `result.plagiarism` exists, `\"ai_detection\"` otherwise");
    }


    // This test validates: `checkType` persisted as `"both"` when `result.plagiarism` exists, `"ai_detection"` otherwise
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });
});
