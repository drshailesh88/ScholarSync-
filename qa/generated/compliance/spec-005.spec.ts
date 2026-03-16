/**
 * Auto-generated Playwright test for compliance/spec-005
 * Source: e2e/specs/compliance/spec-005.md
 * Generated: 2026-03-15T18:27:52.939Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-005
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-005', () => {
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

  test('cp-000: Citation Audit section with issues list if paid', async ({ page }) => {
    // Checkpoint 0: Citation Audit section with issues list (if paid)
    // Section: Download Report > Report Contents

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Citation Audit section with issues list (if paid)",
      section: "Download Report",
      subsection: "Report Contents",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "Citation Audit section with issues list (if paid)");
    }


    // This test validates: Citation Audit section with issues list (if paid)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Writing Quality section with metrics table and suggestions', async ({ page }) => {
    // Checkpoint 1: Writing Quality section with metrics table and suggestions
    // Section: Download Report > Report Contents

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Writing Quality section with metrics table and suggestions",
      section: "Download Report",
      subsection: "Report Contents",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "Writing Quality section with metrics table and suggestions");
    }


    // This test validates: Writing Quality section with metrics table and suggestions
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Footer with generation timestamp', async ({ page }) => {
    // Checkpoint 2: Footer with generation timestamp
    // Section: Download Report > Report Contents

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Footer with generation timestamp",
      section: "Download Report",
      subsection: "Report Contents",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "Footer with generation timestamp");
    }


    // This test validates: Footer with generation timestamp
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: History loaded on tab switch fetches GET apiintegrity-checkhistorylimit20', async ({ page }) => {
    // Checkpoint 3: History loaded on tab switch — fetches `GET /api/integrity-check/history?limit=20`
    // Section: History Tab

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "History loaded on tab switch — fetches `GET /api/integrity-check/history?limit=20`",
      section: "History Tab",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "History loaded on tab switch — fetches `GET /api/integrity-check/history?limit=20`");
    }


    // This test validates: History loaded on tab switch — fetches `GET /api/integrity-check/history?limit=20`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Loading state CircleNotch spinner 24px brand centered', async ({ page }) => {
    // Checkpoint 4: Loading state — CircleNotch spinner (24px brand), centered
    // Section: History Tab

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Loading state — CircleNotch spinner (24px brand), centered",
      section: "History Tab",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "Loading state — CircleNotch spinner (24px brand), centered");
    }


    // This test validates: Loading state — CircleNotch spinner (24px brand), centered
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Empty state No integrity checks found Run your first check to see history here', async ({ page }) => {
    // Checkpoint 5: Empty state — "No integrity checks found. Run your first check to see history here."
    // Section: History Tab

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Empty state — \"No integrity checks found. Run your first check to see history here.\"",
      section: "History Tab",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "Empty state — \"No integrity checks found. Run your first check to see history here.\"");
    }


    // This test validates: Empty state — "No integrity checks found. Run your first check to see history here."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Visible only when 2 history entries exist', async ({ page }) => {
    // Checkpoint 6: Visible only when `>=2` history entries exist
    // Section: History Tab > Sparkline Trend

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Visible only when `>=2` history entries exist",
      section: "History Tab",
      subsection: "Sparkline Trend",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "Visible only when `>=2` history entries exist");
    }


    // This test validates: Visible only when `>=2` history entries exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: SVG polyline showing AI score trend over recent checks', async ({ page }) => {
    // Checkpoint 7: SVG polyline showing AI score trend over recent checks
    // Section: History Tab > Sparkline Trend

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "SVG polyline showing AI score trend over recent checks",
      section: "History Tab",
      subsection: "Sparkline Trend",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "SVG polyline showing AI score trend over recent checks");
    }


    // This test validates: SVG polyline showing AI score trend over recent checks
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Dots at each data point 3px radius brand fill', async ({ page }) => {
    // Checkpoint 8: Dots at each data point (3px radius, brand fill)
    // Section: History Tab > Sparkline Trend

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Dots at each data point (3px radius, brand fill)",
      section: "History Tab",
      subsection: "Sparkline Trend",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "Dots at each data point (3px radius, brand fill)");
    }


    // This test validates: Dots at each data point (3px radius, brand fill)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Label AI Score Trend recent checks', async ({ page }) => {
    // Checkpoint 9: Label: "AI Score Trend (recent checks)"
    // Section: History Tab > Sparkline Trend

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Label: \"AI Score Trend (recent checks)\"",
      section: "History Tab",
      subsection: "Sparkline Trend",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "Label: \"AI Score Trend (recent checks)\"");
    }


    // This test validates: Label: "AI Score Trend (recent checks)"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Data displayed in chronological order reversed from APIs desc order', async ({ page }) => {
    // Checkpoint 10: Data displayed in chronological order (reversed from API's desc order)
    // Section: History Tab > Sparkline Trend

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Data displayed in chronological order (reversed from API's desc order)",
      section: "History Tab",
      subsection: "Sparkline Trend",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Data displayed in chronological order (reversed from API's desc order)");
    }


    // This test validates: Data displayed in chronological order (reversed from API's desc order)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Header Integrity Report label Re-run link ArrowClockwise icon', async ({ page }) => {
    // Checkpoint 11: Header — "Integrity Report" label + "Re-run" link (ArrowClockwise icon)
    // Section: IntegrityPanel Component (Studio Embed) > Results Layout

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Header — \"Integrity Report\" label + \"Re-run\" link (ArrowClockwise icon)",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Results Layout",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Header — \"Integrity Report\" label + \"Re-run\" link (ArrowClockwise icon)");
    }


    // This test validates: Header — "Integrity Report" label + "Re-run" link (ArrowClockwise icon)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: CircularGauge 90px shows humanScore', async ({ page }) => {
    // Checkpoint 12: CircularGauge — 90px, shows `humanScore`
    // Section: IntegrityPanel Component (Studio Embed) > Results Layout

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "CircularGauge — 90px, shows `humanScore`",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Results Layout",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "CircularGauge — 90px, shows `humanScore`");
    }


    // This test validates: CircularGauge — 90px, shows `humanScore`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Free tier notice amber banner with Lock icon Free tier -- AI detection only Upgr', async ({ page }) => {
    // Checkpoint 13: Free tier notice — amber banner with Lock icon: "Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification."
    // Section: IntegrityPanel Component (Studio Embed) > Results Layout

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Free tier notice — amber banner with Lock icon: \"Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification.\"",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Results Layout",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "Free tier notice — amber banner with Lock icon: \"Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification.\"");
    }


    // This test validates: Free tier notice — amber banner with Lock icon: "Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Shows Lock icon 14px in header instead of summary', async ({ page }) => {
    // Checkpoint 14: Shows Lock icon (14px) in header instead of summary
    // Section: IntegrityPanel Component (Studio Embed) > Locked Section State

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Shows Lock icon (14px) in header instead of summary",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Locked Section State",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "Shows Lock icon (14px) in header instead of summary");
    }


    // This test validates: Shows Lock icon (14px) in header instead of summary
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Expanded content Lock icon 14px Available on paid plans Upgrade to unlock link', async ({ page }) => {
    // Checkpoint 15: Expanded content: Lock icon (14px) + "Available on paid plans" + "Upgrade to unlock" link
    // Section: IntegrityPanel Component (Studio Embed) > Locked Section State

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Expanded content: Lock icon (14px) + \"Available on paid plans\" + \"Upgrade to unlock\" link",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Locked Section State",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "Expanded content: Lock icon (14px) + \"Available on paid plans\" + \"Upgrade to unlock\" link");
    }


    // This test validates: Expanded content: Lock icon (14px) + "Available on paid plans" + "Upgrade to unlock" link
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: CaretDown 10px when expanded CaretRight 10px when collapsed', async ({ page }) => {
    // Checkpoint 16: CaretDown (10px) when expanded, CaretRight (10px) when collapsed
    // Section: IntegrityPanel Component (Studio Embed) > Collapsible Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "CaretDown (10px) when expanded, CaretRight (10px) when collapsed",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Collapsible Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "CaretDown (10px) when expanded, CaretRight (10px) when collapsed");
    }


    // This test validates: CaretDown (10px) when expanded, CaretRight (10px) when collapsed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Click header to toggle', async ({ page }) => {
    // Checkpoint 17: Click header to toggle
    // Section: IntegrityPanel Component (Studio Embed) > Collapsible Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Click header to toggle",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Collapsible Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "Click header to toggle");
    }


    // This test validates: Click header to toggle
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: All four sections default to expanded', async ({ page }) => {
    // Checkpoint 18: All four sections default to expanded
    // Section: IntegrityPanel Component (Studio Embed) > Collapsible Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "All four sections default to expanded",
      section: "IntegrityPanel Component (Studio Embed)",
      subsection: "Collapsible Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "All four sections default to expanded");
    }


    // This test validates: All four sections default to expanded
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Uses useRef for leftright panels', async ({ page }) => {
    // Checkpoint 19: Uses `useRef` for left/right panels
    // Section: DiffView Component > Synchronized Scrolling

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Uses `useRef` for left/right panels",
      section: "DiffView Component",
      subsection: "Synchronized Scrolling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Uses `useRef` for left/right panels");
    }


    // This test validates: Uses `useRef` for left/right panels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: isSyncing guard prevents infinite scroll loops', async ({ page }) => {
    // Checkpoint 20: `isSyncing` guard prevents infinite scroll loops
    // Section: DiffView Component > Synchronized Scrolling

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`isSyncing` guard prevents infinite scroll loops",
      section: "DiffView Component",
      subsection: "Synchronized Scrolling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "`isSyncing` guard prevents infinite scroll loops");
    }


    // This test validates: `isSyncing` guard prevents infinite scroll loops
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Scroll sync uses requestAnimationFrame', async ({ page }) => {
    // Checkpoint 21: Scroll sync uses `requestAnimationFrame`
    // Section: DiffView Component > Synchronized Scrolling

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Scroll sync uses `requestAnimationFrame`",
      section: "DiffView Component",
      subsection: "Synchronized Scrolling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "Scroll sync uses `requestAnimationFrame`");
    }


    // This test validates: Scroll sync uses `requestAnimationFrame`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: When aiAnalysissentences array exists and is non-empty renders sentence-by-sente', async ({ page }) => {
    // Checkpoint 22: When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence
    // Section: DiffView Component > Sentence-Level Rendering

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence",
      section: "DiffView Component",
      subsection: "Sentence-Level Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence");
    }


    // This test validates: When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Each sentence gets background based on paragraphs humanProbability', async ({ page }) => {
    // Checkpoint 23: Each sentence gets background based on paragraph's `humanProbability`
    // Section: DiffView Component > Sentence-Level Rendering

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Each sentence gets background based on paragraph's `humanProbability`",
      section: "DiffView Component",
      subsection: "Sentence-Level Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "Each sentence gets background based on paragraph's `humanProbability`");
    }


    // This test validates: Each sentence gets background based on paragraph's `humanProbability`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Gaps between sentences non-analyzed text rendered plain', async ({ page }) => {
    // Checkpoint 24: Gaps between sentences (non-analyzed text) rendered plain
    // Section: DiffView Component > Sentence-Level Rendering

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Gaps between sentences (non-analyzed text) rendered plain",
      section: "DiffView Component",
      subsection: "Sentence-Level Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "Gaps between sentences (non-analyzed text) rendered plain");
    }


    // This test validates: Gaps between sentences (non-analyzed text) rendered plain
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Plagiarism overlap check sentenceTextincludesmexcerpt mexcerptincludessentenceTe', async ({ page }) => {
    // Checkpoint 25: Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`
    // Section: DiffView Component > Sentence-Level Rendering

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`",
      section: "DiffView Component",
      subsection: "Sentence-Level Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`");
    }


    // This test validates: Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Used when no sentence breakdown available', async ({ page }) => {
    // Checkpoint 26: Used when no sentence breakdown available
    // Section: DiffView Component > Paragraph-Level Rendering (fallback)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Used when no sentence breakdown available",
      section: "DiffView Component",
      subsection: "Paragraph-Level Rendering (fallback)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "Used when no sentence breakdown available");
    }


    // This test validates: Used when no sentence breakdown available
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Plagiarism highlights applied via applyPlagiarismHighlights finds excerpt substr', async ({ page }) => {
    // Checkpoint 27: Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans
    // Section: DiffView Component > Paragraph-Level Rendering (fallback)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans",
      section: "DiffView Component",
      subsection: "Paragraph-Level Rendering (fallback)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans");
    }


    // This test validates: Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Ranges sorted by start position non-overlapping', async ({ page }) => {
    // Checkpoint 28: Ranges sorted by start position, non-overlapping
    // Section: DiffView Component > Paragraph-Level Rendering (fallback)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Ranges sorted by start position, non-overlapping",
      section: "DiffView Component",
      subsection: "Paragraph-Level Rendering (fallback)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "Ranges sorted by start position, non-overlapping");
    }


    // This test validates: Ranges sorted by start position, non-overlapping
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Returns score number null loading boolean error string null', async ({ page }) => {
    // Checkpoint 29: Returns `{ score: number | null, loading: boolean, error: string | null }`
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Returns `{ score: number | null, loading: boolean, error: string | null }`",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "Returns `{ score: number | null, loading: boolean, error: string | null }`");
    }


    // This test validates: Returns `{ score: number | null, loading: boolean, error: string | null }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Calls POST apiintegrity-check with mode ai_detection', async ({ page }) => {
    // Checkpoint 30: Calls `POST /api/integrity-check` with `mode: "ai_detection"`
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Calls `POST /api/integrity-check` with `mode: \"ai_detection\"`",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "Calls `POST /api/integrity-check` with `mode: \"ai_detection\"`");
    }


    // This test validates: Calls `POST /api/integrity-check` with `mode: "ai_detection"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Extracts aiDetectionhumanScore from response', async ({ page }) => {
    // Checkpoint 31: Extracts `aiDetection.humanScore` from response
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Extracts `aiDetection.humanScore` from response",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "Extracts `aiDetection.humanScore` from response");
    }


    // This test validates: Extracts `aiDetection.humanScore` from response
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Cancels in-flight requests via AbortController when new check starts', async ({ page }) => {
    // Checkpoint 32: Cancels in-flight requests via `AbortController` when new check starts
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Cancels in-flight requests via `AbortController` when new check starts",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "Cancels in-flight requests via `AbortController` when new check starts");
    }


    // This test validates: Cancels in-flight requests via `AbortController` when new check starts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Ignores AbortError not treated as error', async ({ page }) => {
    // Checkpoint 33: Ignores `AbortError` (not treated as error)
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Ignores `AbortError` (not treated as error)",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "Ignores `AbortError` (not treated as error)");
    }


    // This test validates: Ignores `AbortError` (not treated as error)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Cleans up on unmount aborts controller clears timer', async ({ page }) => {
    // Checkpoint 34: Cleans up on unmount (aborts controller, clears timer)
    // Section: Realtime Integrity Hook > Behavior

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Cleans up on unmount (aborts controller, clears timer)",
      section: "Realtime Integrity Hook",
      subsection: "Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "Cleans up on unmount (aborts controller, clears timer)");
    }


    // This test validates: Cleans up on unmount (aborts controller, clears timer)
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
