/**
 * Auto-generated Playwright test for presentation/spec-018
 * Source: e2e/specs/presentation/spec-018.md
 * Generated: 2026-03-14T10:21:31.136Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-018
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-018', () => {
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

  test('cp-000: Step-0 From URL path is considered valid only when at least one URL exists and a', async ({ page }) => {
    // Checkpoint 0: Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 ' + "Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully");
    }


    // This test validates: Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Step-0 imported-deck path becomes valid as soon as importedDeck is non-null', async ({ page }) => {
    // Checkpoint 1: Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 ' + "Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null");
    }


    // This test validates: Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: URL source allows adding at most three URLs before the input is replaced by Maxi', async ({ page }) => {
    // Checkpoint 2: URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 ' + "URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`");
    }


    // This test validates: URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: URL add button stays disabled until inputValue passes http or https URL validati', async ({ page }) => {
    // Checkpoint 3: URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 ' + "URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation");
    }


    // This test validates: URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Pressing Enter in the URL input triggers the same addUrl path as clicking Add', async ({ page }) => {
    // Checkpoint 4: Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 ' + "Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`");
    }


    // This test validates: Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Each URL row shows Fetch Preview until fetched then swaps to fetched metadata an', async ({ page }) => {
    // Checkpoint 5: Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 ' + "Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button");
    }


    // This test validates: Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: URL fetch failures render inline red text per-source instead of a global wizard ', async ({ page }) => {
    // Checkpoint 6: URL fetch failures render inline red text per-source instead of a global wizard error
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "URL fetch failures render inline red text per-source instead of a global wizard error",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 ' + "URL fetch failures render inline red text per-source instead of a global wizard error");
    }


    // This test validates: URL fetch failures render inline red text per-source instead of a global wizard error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Step-0 imported-reference summary shows Clear re-import only after references ex', async ({ page }) => {
    // Checkpoint 7: Step-0 imported-reference summary shows `Clear & re-import` only after references exist
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-0 imported-reference summary shows `Clear & re-import` only after references exist",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 ' + "Step-0 imported-reference summary shows `Clear & re-import` only after references exist");
    }


    // This test validates: Step-0 imported-reference summary shows `Clear & re-import` only after references exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Imported-reference rows show the first two authors and append et al when more th', async ({ page }) => {
    // Checkpoint 8: Imported-reference rows show the first two authors and append `et al.` when more than two authors exist
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Imported-reference rows show the first two authors and append `et al.` when more than two authors exist",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 ' + "Imported-reference rows show the first two authors and append `et al.` when more than two authors exist");
    }


    // This test validates: Imported-reference rows show the first two authors and append `et al.` when more than two authors exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Step-0 imported deck copies decktitle into the wizard title only if the title fi', async ({ page }) => {
    // Checkpoint 9: Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 ' + "Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank");
    }


    // This test validates: Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Deep Research source exposes a numeric input only while that source is selected', async ({ page }) => {
    // Checkpoint 10: Deep Research source exposes a numeric input only while that source is selected
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Deep Research source exposes a numeric input only while that source is selected",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 ' + "Deep Research source exposes a numeric input only while that source is selected");
    }


    // This test validates: Deep Research source exposes a numeric input only while that source is selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Step 1 opens with templateId null and audienceType general', async ({ page }) => {
    // Checkpoint 11: Step 1 opens with `templateId = null` and `audienceType = "general"`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step 1 opens with `templateId = null` and `audienceType = \"general\"`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 ' + "Step 1 opens with `templateId = null` and `audienceType = \"general\"`");
    }


    // This test validates: Step 1 opens with `templateId = null` and `audienceType = "general"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Step 1 template grid includes a No Template Custom card in addition to academic ', async ({ page }) => {
    // Checkpoint 12: Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 ' + "Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates");
    }


    // This test validates: Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Selecting No Template Custom clears templateId without changing audience type', async ({ page }) => {
    // Checkpoint 13: Selecting `No Template (Custom)` clears `templateId` without changing audience type
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Selecting `No Template (Custom)` clears `templateId` without changing audience type",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 ' + "Selecting `No Template (Custom)` clears `templateId` without changing audience type");
    }


    // This test validates: Selecting `No Template (Custom)` clears `templateId` without changing audience type
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Selecting a template forces audienceType to the templates configured audience ty', async ({ page }) => {
    // Checkpoint 14: Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 ' + "Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`");
    }


    // This test validates: Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Template cards show default slide count and optional estimated duration in their', async ({ page }) => {
    // Checkpoint 15: Template cards show default slide count and optional estimated duration in their top-right metadata
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Template cards show default slide count and optional estimated duration in their top-right metadata",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 ' + "Template cards show default slide count and optional estimated duration in their top-right metadata");
    }


    // This test validates: Template cards show default slide count and optional estimated duration in their top-right metadata
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Step-1 audience choices are rendered as pill buttons rather than cards', async ({ page }) => {
    // Checkpoint 16: Step-1 audience choices are rendered as pill buttons rather than cards
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-1 audience choices are rendered as pill buttons rather than cards",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 ' + "Step-1 audience choices are rendered as pill buttons rather than cards");
    }


    // This test validates: Step-1 audience choices are rendered as pill buttons rather than cards
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Step-1 Next is always enabled and does not require a template selection', async ({ page }) => {
    // Checkpoint 17: Step-1 `Next` is always enabled and does not require a template selection
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-1 `Next` is always enabled and does not require a template selection",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 ' + "Step-1 `Next` is always enabled and does not require a template selection");
    }


    // This test validates: Step-1 `Next` is always enabled and does not require a template selection
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Step-1 Back returns to source selection without clearing imported source state', async ({ page }) => {
    // Checkpoint 18: Step-1 `Back` returns to source selection without clearing imported source state
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-1 `Back` returns to source selection without clearing imported source state",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 ' + "Step-1 `Back` returns to source selection without clearing imported source state");
    }


    // This test validates: Step-1 `Back` returns to source selection without clearing imported source state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Step 2 heading text is Configure Presentation', async ({ page }) => {
    // Checkpoint 19: Step 2 heading text is `Configure Presentation`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step 2 heading text is `Configure Presentation`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 ' + "Step 2 heading text is `Configure Presentation`");
    }


    // This test validates: Step 2 heading text is `Configure Presentation`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Step-2 title input placeholder is Presentation title not the blank-mode example ', async ({ page }) => {
    // Checkpoint 20: Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 ' + "Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder");
    }


    // This test validates: Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Step-2 title input is autofocus-enabled when the step mounts', async ({ page }) => {
    // Checkpoint 21: Step-2 title input is autofocus-enabled when the step mounts
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 title input is autofocus-enabled when the step mounts",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 ' + "Step-2 title input is autofocus-enabled when the step mounts");
    }


    // This test validates: Step-2 title input is autofocus-enabled when the step mounts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Step-2 title is required only by titletrimlength 0', async ({ page }) => {
    // Checkpoint 22: Step-2 title is required only by `title.trim().length > 0`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 title is required only by `title.trim().length > 0`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 ' + "Step-2 title is required only by `title.trim().length > 0`");
    }


    // This test validates: Step-2 title is required only by `title.trim().length > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Step-2 target slide count uses a range slider not a numeric text field', async ({ page }) => {
    // Checkpoint 23: Step-2 target slide count uses a range slider, not a numeric text field
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 target slide count uses a range slider, not a numeric text field",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 ' + "Step-2 target slide count uses a range slider, not a numeric text field");
    }


    // This test validates: Step-2 target slide count uses a range slider, not a numeric text field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Range slider minimum is 5 and maximum is 30', async ({ page }) => {
    // Checkpoint 24: Range slider minimum is 5 and maximum is 30
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Range slider minimum is 5 and maximum is 30",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 ' + "Range slider minimum is 5 and maximum is 30");
    }


    // This test validates: Range slider minimum is 5 and maximum is 30
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Step-2 citation style defaults to apa', async ({ page }) => {
    // Checkpoint 25: Step-2 citation style defaults to `apa`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 citation style defaults to `apa`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 ' + "Step-2 citation style defaults to `apa`");
    }


    // This test validates: Step-2 citation style defaults to `apa`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Citation style selector renders as flat pill buttons for APA MLA Chicago Vancouv', async ({ page }) => {
    // Checkpoint 26: Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 ' + "Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard");
    }


    // This test validates: Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Step-2 theme picker renders a 7-column grid of all preset themes', async ({ page }) => {
    // Checkpoint 27: Step-2 theme picker renders a 7-column grid of all preset themes
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step-2 theme picker renders a 7-column grid of all preset themes",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 ' + "Step-2 theme picker renders a 7-column grid of all preset themes");
    }


    // This test validates: Step-2 theme picker renders a 7-column grid of all preset themes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Template structure preview is hidden until a template is selected', async ({ page }) => {
    // Checkpoint 28: Template structure preview is hidden until a template is selected
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Template structure preview is hidden until a template is selected",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 ' + "Template structure preview is hidden until a template is selected");
    }


    // This test validates: Template structure preview is hidden until a template is selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Template structure preview toggle label reads Template Structure Preview templat', async ({ page }) => {
    // Checkpoint 29: Template structure preview toggle label reads `Template Structure Preview ({template name})`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Template structure preview toggle label reads `Template Structure Preview ({template name})`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 ' + "Template structure preview toggle label reads `Template Structure Preview ({template name})`");
    }


    // This test validates: Template structure preview toggle label reads `Template Structure Preview ({template name})`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Expanded structure preview shows slot title optional marker one-line guidance an', async ({ page }) => {
    // Checkpoint 30: Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 ' + "Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot");
    }


    // This test validates: Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Additional instructions textarea is optional and uses exactly three rows', async ({ page }) => {
    // Checkpoint 31: Additional instructions textarea is optional and uses exactly three rows
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Additional instructions textarea is optional and uses exactly three rows",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 ' + "Additional instructions textarea is optional and uses exactly three rows");
    }


    // This test validates: Additional instructions textarea is optional and uses exactly three rows
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Empty additional instructions are sent to the generate API as undefined', async ({ page }) => {
    // Checkpoint 32: Empty additional instructions are sent to the generate API as `undefined`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty additional instructions are sent to the generate API as `undefined`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 ' + "Empty additional instructions are sent to the generate API as `undefined`");
    }


    // This test validates: Empty additional instructions are sent to the generate API as `undefined`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Generate button on step 2 uses Sparkle icon and moves to step 3 before preproces', async ({ page }) => {
    // Checkpoint 33: `Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 ' + "`Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes");
    }


    // This test validates: `Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Step 3 heading text is Generating Presentation', async ({ page }) => {
    // Checkpoint 34: Step 3 heading text is `Generating Presentation`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Step 3 heading text is `Generating Presentation`",
      section: "Reference Import Panel",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 ' + "Step 3 heading text is `Generating Presentation`");
    }


    // This test validates: Step 3 heading text is `Generating Presentation`
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
