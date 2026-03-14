/**
 * Auto-generated Playwright test for presentation/spec-016
 * Source: e2e/specs/presentation/spec-016.md
 * Generated: 2026-03-14T10:21:24.843Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-016
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-016', () => {
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

  test('cp-000: 2814 API Key label and input with placeholder Your Zotero API key reference-impo', async ({ page }) => {
    // Checkpoint 0: **28.14** "API Key" label and input with placeholder "Your Zotero API key" (`reference-import-panel.tsx:385`, `:390`, `:391`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.14** \"API Key\" label and input with placeholder \"Your Zotero API key\" (`reference-import-panel.tsx:385`, `:390`, `:391`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 ' + "**28.14** \"API Key\" label and input with placeholder \"Your Zotero API key\" (`reference-import-panel.tsx:385`, `:390`, `:391`)");
    }


    // This test validates: **28.14** "API Key" label and input with placeholder "Your Zotero API key" (`reference-import-panel.tsx:385`, `:390`, `:391`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 2815 User ID label and input with placeholder Numeric user ID reference-import-p', async ({ page }) => {
    // Checkpoint 1: **28.15** "User ID" label and input with placeholder "Numeric user ID" (`reference-import-panel.tsx:397`, `:401`, `:402`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.15** \"User ID\" label and input with placeholder \"Numeric user ID\" (`reference-import-panel.tsx:397`, `:401`, `:402`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 ' + "**28.15** \"User ID\" label and input with placeholder \"Numeric user ID\" (`reference-import-panel.tsx:397`, `:401`, `:402`)");
    }


    // This test validates: **28.15** "User ID" label and input with placeholder "Numeric user ID" (`reference-import-panel.tsx:397`, `:401`, `:402`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: 2816 Connect Import button disabled when loading or fields empty reference-impor', async ({ page }) => {
    // Checkpoint 2: **28.16** "Connect & Import" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.16** \"Connect & Import\" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 ' + "**28.16** \"Connect & Import\" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)");
    }


    // This test validates: **28.16** "Connect & Import" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: 2817 Button shows Fetching with CircleNotch spinner while loading reference-impo', async ({ page }) => {
    // Checkpoint 3: **28.17** Button shows "Fetching..." with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.17** Button shows \"Fetching...\" with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 ' + "**28.17** Button shows \"Fetching...\" with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)");
    }


    // This test validates: **28.17** Button shows "Fetching..." with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 2818 API POST apireferenceszotero reference-import-paneltsx154', async ({ page }) => {
    // Checkpoint 4: **28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 ' + "**28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)");
    }


    // This test validates: **28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: 2819 Errors show Zotero fetch failed fallback reference-import-paneltsx181', async ({ page }) => {
    // Checkpoint 5: **28.19** Errors show "Zotero fetch failed" fallback (`reference-import-panel.tsx:181`)
    // Section: Reference Import Panel > Zotero Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.19** Errors show \"Zotero fetch failed\" fallback (`reference-import-panel.tsx:181`)",
      section: "Reference Import Panel",
      subsection: "Zotero Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 ' + "**28.19** Errors show \"Zotero fetch failed\" fallback (`reference-import-panel.tsx:181`)");
    }


    // This test validates: **28.19** Errors show "Zotero fetch failed" fallback (`reference-import-panel.tsx:181`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: 2820 Help text Look up a single reference by its DOI reference-import-paneltsx43', async ({ page }) => {
    // Checkpoint 6: **28.20** Help text: "Look up a single reference by its DOI." (`reference-import-panel.tsx:430`, `:433`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.20** Help text: \"Look up a single reference by its DOI.\" (`reference-import-panel.tsx:430`, `:433`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 ' + "**28.20** Help text: \"Look up a single reference by its DOI.\" (`reference-import-panel.tsx:430`, `:433`)");
    }


    // This test validates: **28.20** Help text: "Look up a single reference by its DOI." (`reference-import-panel.tsx:430`, `:433`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: 2821 DOI input with placeholder eg 101038nature12373 reference-import-paneltsx43', async ({ page }) => {
    // Checkpoint 7: **28.21** DOI input with placeholder "e.g., 10.1038/nature12373" (`reference-import-panel.tsx:438`, `:442`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.21** DOI input with placeholder \"e.g., 10.1038/nature12373\" (`reference-import-panel.tsx:438`, `:442`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 ' + "**28.21** DOI input with placeholder \"e.g., 10.1038/nature12373\" (`reference-import-panel.tsx:438`, `:442`)");
    }


    // This test validates: **28.21** DOI input with placeholder "e.g., 10.1038/nature12373" (`reference-import-panel.tsx:438`, `:442`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 2822 Enter key triggers lookup reference-import-paneltsx439', async ({ page }) => {
    // Checkpoint 8: **28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 ' + "**28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)");
    }


    // This test validates: **28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 2823 Lookup button with MagnifyingGlass icon disabled when loading or empty refe', async ({ page }) => {
    // Checkpoint 9: **28.23** "Lookup" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.23** \"Lookup\" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 ' + "**28.23** \"Lookup\" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)");
    }


    // This test validates: **28.23** "Lookup" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 2824 API POST apireferencesparse for DOI reference-import-paneltsx200', async ({ page }) => {
    // Checkpoint 10: **28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 ' + "**28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)");
    }


    // This test validates: **28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 2825 Errors show DOI lookup failed fallback reference-import-paneltsx222', async ({ page }) => {
    // Checkpoint 11: **28.25** Errors show "DOI lookup failed" fallback (`reference-import-panel.tsx:222`)
    // Section: Reference Import Panel > DOI Tab

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.25** Errors show \"DOI lookup failed\" fallback (`reference-import-panel.tsx:222`)",
      section: "Reference Import Panel",
      subsection: "DOI Tab",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 ' + "**28.25** Errors show \"DOI lookup failed\" fallback (`reference-import-panel.tsx:222`)");
    }


    // This test validates: **28.25** Errors show "DOI lookup failed" fallback (`reference-import-panel.tsx:222`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: 2826 Error banner with Warning icon and dismiss X button reference-import-panelt', async ({ page }) => {
    // Checkpoint 12: **28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)
    // Section: Reference Import Panel > Error & Loading

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)",
      section: "Reference Import Panel",
      subsection: "Error & Loading",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 ' + "**28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)");
    }


    // This test validates: **28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 2827 Loading state shows Processing with CircleNotch spinner reference-import-pa', async ({ page }) => {
    // Checkpoint 13: **28.27** Loading state shows "Processing..." with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)
    // Section: Reference Import Panel > Error & Loading

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.27** Loading state shows \"Processing...\" with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)",
      section: "Reference Import Panel",
      subsection: "Error & Loading",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 ' + "**28.27** Loading state shows \"Processing...\" with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)");
    }


    // This test validates: **28.27** Loading state shows "Processing..." with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: 2828 Header shows N references imported with count reference-import-paneltsx487 ', async ({ page }) => {
    // Checkpoint 14: **28.28** Header shows "N references imported" with count (`reference-import-panel.tsx:487`, `:492`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.28** Header shows \"N references imported\" with count (`reference-import-panel.tsx:487`, `:492`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 ' + "**28.28** Header shows \"N references imported\" with count (`reference-import-panel.tsx:487`, `:492`)");
    }


    // This test validates: **28.28** Header shows "N references imported" with count (`reference-import-panel.tsx:487`, `:492`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 2829 Selected count badge shown when 0 N selected reference-import-paneltsx493 4', async ({ page }) => {
    // Checkpoint 15: **28.29** Selected count badge shown when > 0: "(N selected)" (`reference-import-panel.tsx:493`, `:495`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.29** Selected count badge shown when > 0: \"(N selected)\" (`reference-import-panel.tsx:493`, `:495`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 ' + "**28.29** Selected count badge shown when > 0: \"(N selected)\" (`reference-import-panel.tsx:493`, `:495`)");
    }


    // This test validates: **28.29** Selected count badge shown when > 0: "(N selected)" (`reference-import-panel.tsx:493`, `:495`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 2830 Select all button reference-import-paneltsx508 511', async ({ page }) => {
    // Checkpoint 16: **28.30** "Select all" button (`reference-import-panel.tsx:508`, `:511`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.30** \"Select all\" button (`reference-import-panel.tsx:508`, `:511`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 ' + "**28.30** \"Select all\" button (`reference-import-panel.tsx:508`, `:511`)");
    }


    // This test validates: **28.30** "Select all" button (`reference-import-panel.tsx:508`, `:511`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: 2831 Clear button reference-import-paneltsx514 517', async ({ page }) => {
    // Checkpoint 17: **28.31** "Clear" button (`reference-import-panel.tsx:514`, `:517`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.31** \"Clear\" button (`reference-import-panel.tsx:514`, `:517`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 ' + "**28.31** \"Clear\" button (`reference-import-panel.tsx:514`, `:517`)");
    }


    // This test validates: **28.31** "Clear" button (`reference-import-panel.tsx:514`, `:517`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: 2832 Filter toggle button with Funnel icon and CaretUpCaretDown reference-import', async ({ page }) => {
    // Checkpoint 18: **28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 ' + "**28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)");
    }


    // This test validates: **28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 2833 Search input with placeholder Search references reference-import-paneltsx53', async ({ page }) => {
    // Checkpoint 19: **28.33** Search input with placeholder "Search references..." (`reference-import-panel.tsx:532-533`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.33** Search input with placeholder \"Search references...\" (`reference-import-panel.tsx:532-533`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 ' + "**28.33** Search input with placeholder \"Search references...\" (`reference-import-panel.tsx:532-533`)");
    }


    // This test validates: **28.33** Search input with placeholder "Search references..." (`reference-import-panel.tsx:532-533`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 2834 Type filter dropdown showing All types unique types reference-import-panelt', async ({ page }) => {
    // Checkpoint 20: **28.34** Type filter dropdown showing "All types" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.34** Type filter dropdown showing \"All types\" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 ' + "**28.34** Type filter dropdown showing \"All types\" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)");
    }


    // This test validates: **28.34** Type filter dropdown showing "All types" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 2835 Per-reference row clickable selected state with brand border reference-impo', async ({ page }) => {
    // Checkpoint 21: **28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 ' + "**28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)");
    }


    // This test validates: **28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: 2836 Checkbox indicator Check icon when selected empty border otherwise referenc', async ({ page }) => {
    // Checkpoint 22: **28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 ' + "**28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)");
    }


    // This test validates: **28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 2837 Reference title displayed reference-import-paneltsx587', async ({ page }) => {
    // Checkpoint 23: **28.37** Reference title displayed (`reference-import-panel.tsx:587`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.37** Reference title displayed (`reference-import-panel.tsx:587`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 ' + "**28.37** Reference title displayed (`reference-import-panel.tsx:587`)");
    }


    // This test validates: **28.37** Reference title displayed (`reference-import-panel.tsx:587`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: 2838 Authors first 3 joined or Unknown authors fallback reference-import-panelts', async ({ page }) => {
    // Checkpoint 24: **28.38** Authors: first 3 joined, or "Unknown authors" fallback (`reference-import-panel.tsx:587`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.38** Authors: first 3 joined, or \"Unknown authors\" fallback (`reference-import-panel.tsx:587`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 ' + "**28.38** Authors: first 3 joined, or \"Unknown authors\" fallback (`reference-import-panel.tsx:587`)");
    }


    // This test validates: **28.38** Authors: first 3 joined, or "Unknown authors" fallback (`reference-import-panel.tsx:587`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: 2839 Journal name shown when present reference-import-paneltsx593', async ({ page }) => {
    // Checkpoint 25: **28.39** Journal name shown when present (`reference-import-panel.tsx:593`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.39** Journal name shown when present (`reference-import-panel.tsx:593`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 ' + "**28.39** Journal name shown when present (`reference-import-panel.tsx:593`)");
    }


    // This test validates: **28.39** Journal name shown when present (`reference-import-panel.tsx:593`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: 2840 Remove button with X icon per reference reference-import-paneltsx602 608', async ({ page }) => {
    // Checkpoint 26: **28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 ' + "**28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)");
    }


    // This test validates: **28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: 2841 No references match your filter empty filter state reference-import-panelts', async ({ page }) => {
    // Checkpoint 27: **28.41** "No references match your filter." empty filter state (`reference-import-panel.tsx:613`, `:615`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.41** \"No references match your filter.\" empty filter state (`reference-import-panel.tsx:613`, `:615`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 ' + "**28.41** \"No references match your filter.\" empty filter state (`reference-import-panel.tsx:613`, `:615`)");
    }


    // This test validates: **28.41** "No references match your filter." empty filter state (`reference-import-panel.tsx:613`, `:615`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: 2842 Use N Selected Referenceplural button disabled when 0 selected reference-im', async ({ page }) => {
    // Checkpoint 28: **28.42** "Use N Selected Reference{plural}" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)
    // Section: Reference Import Panel > Reference List

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**28.42** \"Use N Selected Reference{plural}\" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)",
      section: "Reference Import Panel",
      subsection: "Reference List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 ' + "**28.42** \"Use N Selected Reference{plural}\" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)");
    }


    // This test validates: **28.42** "Use N Selected Reference{plural}" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: presentation initializes with loading true and calls getUserDecks from a client ', async ({ page }) => {
    // Checkpoint 29: `/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`",
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
      throw new Error('Unhandled presentation checkpoint: cp-029 ' + "`/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`");
    }


    // This test validates: `/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: presentation header action label is New Presentation without a leading character', async ({ page }) => {
    // Checkpoint 30: `/presentation` header action label is `New Presentation` without a leading `+` character
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`/presentation` header action label is `New Presentation` without a leading `+` character",
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
      throw new Error('Unhandled presentation checkpoint: cp-030 ' + "`/presentation` header action label is `New Presentation` without a leading `+` character");
    }


    // This test validates: `/presentation` header action label is `New Presentation` without a leading `+` character
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: List-page loading state renders exactly three pulsing aspect-video rectangles', async ({ page }) => {
    // Checkpoint 31: List-page loading state renders exactly three pulsing aspect-video rectangles
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "List-page loading state renders exactly three pulsing aspect-video rectangles",
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
      throw new Error('Unhandled presentation checkpoint: cp-031 ' + "List-page loading state renders exactly three pulsing aspect-video rectangles");
    }


    // This test validates: List-page loading state renders exactly three pulsing aspect-video rectangles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Route-level srcappapppresentationloadingtsx separately renders a skeleton headin', async ({ page }) => {
    // Checkpoint 32: Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders",
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
      throw new Error('Unhandled presentation checkpoint: cp-032 ' + "Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders");
    }


    // This test validates: Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Empty-state CTA button uses Sparkle icon and label Create Presentation', async ({ page }) => {
    // Checkpoint 33: Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`",
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
      throw new Error('Unhandled presentation checkpoint: cp-033 ' + "Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`");
    }


    // This test validates: Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Empty-state helper text explicitly says users can create from papers documents o', async ({ page }) => {
    // Checkpoint 34: Empty-state helper text explicitly says users can create from papers, documents, or start from scratch
    // Section: Reference Import Panel > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty-state helper text explicitly says users can create from papers, documents, or start from scratch",
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
      throw new Error('Unhandled presentation checkpoint: cp-034 ' + "Empty-state helper text explicitly says users can create from papers, documents, or start from scratch");
    }


    // This test validates: Empty-state helper text explicitly says users can create from papers, documents, or start from scratch
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
