/**
 * Auto-generated Playwright test for systematic-review/spec-030
 * Source: e2e/specs/systematic-review/spec-030.md
 * Generated: 2026-03-14T10:25:28.392Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts systematic-review spec-030
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

















import { assertSystematicReviewCheckpoint } from '../../module-assertions/systematic-review';


test.describe('systematic-review / spec-030', () => {
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

  test('cp-000: Exclude in full-text mode opens exclusion reason form in title-abstract mode sub', async ({ page }) => {
    // Checkpoint 0: Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-000 ' + "Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason");
    }


    // This test validates: Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 11 predefined exclusion reasons Wrong study design Wrong population Wrong interv', async ({ page }) => {
    // Checkpoint 1: 11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-001 ' + "11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`");
    }


    // This test validates: 11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Exclusion form dropdown selector free-text textarea with placeholder Additional ', async ({ page }) => {
    // Checkpoint 2: Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-002 ' + "Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`");
    }


    // This test validates: Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Exclusion reason format when free text provided dropdown freeText', async ({ page }) => {
    // Checkpoint 3: Exclusion reason format when free text provided: `{dropdown}: {freeText}`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Exclusion reason format when free text provided: `{dropdown}: {freeText}`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-003 ' + "Exclusion reason format when free text provided: `{dropdown}: {freeText}`");
    }


    // This test validates: Exclusion reason format when free text provided: `{dropdown}: {freeText}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Confirm Exclusion button in red bg-red-500', async ({ page }) => {
    // Checkpoint 4: `Confirm Exclusion` button in red (bg-red-500)
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`Confirm Exclusion` button in red (bg-red-500)",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-004 ' + "`Confirm Exclusion` button in red (bg-red-500)");
    }


    // This test validates: `Confirm Exclusion` button in red (bg-red-500)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: AI Assessment section Robot icon weight duotone heading AI Assessment', async ({ page }) => {
    // Checkpoint 5: AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-005 ' + "AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`");
    }


    // This test validates: AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: AI decision badge color-coded same as screening decisions emeraldredamber', async ({ page }) => {
    // Checkpoint 6: AI decision badge color-coded same as screening decisions (emerald/red/amber)
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "AI decision badge color-coded same as screening decisions (emerald/red/amber)",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-006 ' + "AI decision badge color-coded same as screening decisions (emerald/red/amber)");
    }


    // This test validates: AI decision badge color-coded same as screening decisions (emerald/red/amber)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: AI decision text Decision aiDecision', async ({ page }) => {
    // Checkpoint 7: AI decision text: `Decision: {aiDecision}`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "AI decision text: `Decision: {aiDecision}`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-007 ' + "AI decision text: `Decision: {aiDecision}`");
    }


    // This test validates: AI decision text: `Decision: {aiDecision}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Relevant Sections heading Crosshair icon weight duotone Relevant Sections', async ({ page }) => {
    // Checkpoint 8: Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-008 ' + "Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`");
    }


    // This test validates: Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Screening reasons shown as bordered cards inclusion emerald exclusion red', async ({ page }) => {
    // Checkpoint 9: Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-009 ' + "Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)");
    }


    // This test validates: Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Jump-to-chunk buttons ArrowFatLineRight icon sectionType ppageNumber label text ', async ({ page }) => {
    // Checkpoint 10: Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || "p."}{pageNumber ?? "?"}` label text with no inserted separator
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || \"p.\"}{pageNumber ?? \"?\"}` label text with no inserted separator",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-010 ' + "Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || \"p.\"}{pageNumber ?? \"?\"}` label text with no inserted separator");
    }


    // This test validates: Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || "p."}{pageNumber ?? "?"}` label text with no inserted separator
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: High-relevance passages label High-relevance passages with Highlighter icon', async ({ page }) => {
    // Checkpoint 11: High-relevance passages: label `High-relevance passages` with Highlighter icon
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "High-relevance passages: label `High-relevance passages` with Highlighter icon",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-011 ' + "High-relevance passages: label `High-relevance passages` with Highlighter icon");
    }


    // This test validates: High-relevance passages: label `High-relevance passages` with Highlighter icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: High-priority chunks those with highlightPriority 07 sorted by priority descendi', async ({ page }) => {
    // Checkpoint 12: High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-012 ' + "High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown");
    }


    // This test validates: High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Priority badge 09 renders in brand styling 09 in amber styling', async ({ page }) => {
    // Checkpoint 13: Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-013 ' + "Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling");
    }


    // This test validates: Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Chunk text preview truncated at 150 characters', async ({ page }) => {
    // Checkpoint 14: Chunk text preview truncated at 150 characters
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Chunk text preview truncated at 150 characters",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-014 ' + "Chunk text preview truncated at 150 characters");
    }


    // This test validates: Chunk text preview truncated at 150 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Section overview fallback when no reasonshighlights Jump to section with section', async ({ page }) => {
    // Checkpoint 15: Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-015 ' + "Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons");
    }


    // This test validates: Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Paper metadata footer shows Previous reason when screeningReason exists', async ({ page }) => {
    // Checkpoint 16: Paper metadata footer: shows `Previous reason:` when `screeningReason` exists
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Paper metadata footer: shows `Previous reason:` when `screeningReason` exists",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-016 ' + "Paper metadata footer: shows `Previous reason:` when `screeningReason` exists");
    }


    // This test validates: Paper metadata footer: shows `Previous reason:` when `screeningReason` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Keyboard shortcuts hint Esc Close I Include E Exclude U Uncertain', async ({ page }) => {
    // Checkpoint 17: Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-017 ' + "Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain");
    }


    // This test validates: Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Chunks loaded from apisystematic-reviewpaper-chunkspaperIdprojectId', async ({ page }) => {
    // Checkpoint 18: Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-018 ' + "Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`");
    }


    // This test validates: Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Chunk load failure is silent does not block viewer', async ({ page }) => {
    // Checkpoint 19: Chunk load failure is silent (does not block viewer)
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Chunk load failure is silent (does not block viewer)",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-019 ' + "Chunk load failure is silent (does not block viewer)");
    }


    // This test validates: Chunk load failure is silent (does not block viewer)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: PDF served via apipdfservepathencodedPath for stored PDFs', async ({ page }) => {
    // Checkpoint 20: PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs
    // Section: Quick Test Workflows > Screening PDF Viewer — Full Component Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs",
      section: "Quick Test Workflows",
      subsection: "Screening PDF Viewer — Full Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-020 ' + "PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs");
    }


    // This test validates: PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: GET apisystematic-reviewalertsprojectIdid lists search alerts for a project', async ({ page }) => {
    // Checkpoint 21: `GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-021 ' + "`GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project");
    }


    // This test validates: `GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: POST apisystematic-reviewalerts creates search alert Zod validates searchString ', async ({ page }) => {
    // Checkpoint 22: `POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-022 ' + "`POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars");
    }


    // This test validates: `POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: PUT apisystematic-reviewalerts updates alert action enum pause resume update_fre', async ({ page }) => {
    // Checkpoint 23: `PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-023 ' + "`PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`");
    }


    // This test validates: `PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: PUT apisystematic-reviewalerts with update_frequency requires frequency field or', async ({ page }) => {
    // Checkpoint 24: `PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-024 ' + "`PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400");
    }


    // This test validates: `PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: DELETE apisystematic-reviewalertsalertIdid deletes alert by query param', async ({ page }) => {
    // Checkpoint 25: `DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-025 ' + "`DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param");
    }


    // This test validates: `DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Alerts POSTGET verify project ownership via user_id check returns 404 if not fou', async ({ page }) => {
    // Checkpoint 26: Alerts POST/GET verify project ownership via user_id check; returns 404 if not found
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Alerts POST/GET verify project ownership via user_id check; returns 404 if not found",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-026 ' + "Alerts POST/GET verify project ownership via user_id check; returns 404 if not found");
    }


    // This test validates: Alerts POST/GET verify project ownership via user_id check; returns 404 if not found
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: GET apisystematic-reviewscreening-criteriaprojectIdid loads criteria for a proje', async ({ page }) => {
    // Checkpoint 27: `GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-027 ' + "`GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project");
    }


    // This test validates: `GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: POST apisystematic-reviewscreening-criteria replaces all criteria using delete-t', async ({ page }) => {
    // Checkpoint 28: `POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-028 ' + "`POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction");
    }


    // This test validates: `POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: GET apisystematic-reviewexport-referencesprojectIdidformatrisbibtexendnotecsvfil', async ({ page }) => {
    // Checkpoint 29: `GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-029 ' + "`GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references");
    }


    // This test validates: `GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: POST apisystematic-reviewmanuscript-export generates DOCX with academic formatti', async ({ page }) => {
    // Checkpoint 30: `POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-030 ' + "`POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers");
    }


    // This test validates: `POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: POST apisystematic-reviewpdf-retrieval triggers open-access PDF retrieval for sp', async ({ page }) => {
    // Checkpoint 31: `POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-031 ' + "`POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`");
    }


    // This test validates: `POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: GET apisystematic-reviewpdf-retrievalprojectIdid returns retrieval status for al', async ({ page }) => {
    // Checkpoint 32: `GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-032 ' + "`GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers");
    }


    // This test validates: `GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: GET apisystematic-reviewrevman-exportprojectIdid generates RevMan CSV package wi', async ({ page }) => {
    // Checkpoint 33: `GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-033 ' + "`GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files");
    }


    // This test validates: `GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: POST apisystematic-reviewupload uploads PDF file creates paper record uploads to', async ({ page }) => {
    // Checkpoint 34: `POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-034 ' + "`POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing");
    }


    // This test validates: `POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing
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
