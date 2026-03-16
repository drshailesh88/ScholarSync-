/**
 * Auto-generated Playwright test for presentation/spec-026
 * Source: e2e/specs/presentation/spec-026.md
 * Generated: 2026-03-14T22:19:09.008Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-026
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-026', () => {
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

  test('cp-000: Drag active border-brand bg-brand5 idle border-border hoverborder-brand40', async ({ page }) => {
    // Checkpoint 0: Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`');
    }


    // This test validates: Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: File read via FileReaderreadAsText input reset after select POST to apireference', async ({ page }) => {
    // Checkpoint 1: File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`');
    }


    // This test validates: File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Empty parse No references found in filename Check the file format deduplicates b', async ({ page }) => {
    // Checkpoint 2: Empty parse: `"No references found in {filename}. Check the file format."`; deduplicates by DOI or title
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty parse: `\"No references found in {filename}. Check the file format.\"`; deduplicates by DOI or title",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 Empty parse: `"No references found in {filename}. Check the file format."`; deduplicates by DOI or title');
    }


    // This test validates: Empty parse: `"No references found in {filename}. Check the file format."`; deduplicates by DOI or title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Link to zoteroorgsettingskeys with target_blank relnoopener noreferrer', async ({ page }) => {
    // Checkpoint 3: Link to `zotero.org/settings/keys` with `target="_blank" rel="noopener noreferrer"`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Link to `zotero.org/settings/keys` with `target=\"_blank\" rel=\"noopener noreferrer\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 Link to `zotero.org/settings/keys` with `target="_blank" rel="noopener noreferrer"`');
    }


    // This test validates: Link to `zotero.org/settings/keys` with `target="_blank" rel="noopener noreferrer"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: API Key typepassword placeholder Your Zotero API key User ID placeholder Numeric', async ({ page }) => {
    // Checkpoint 4: API Key `type="password"` placeholder `"Your Zotero API key"`; User ID placeholder `"Numeric user ID"`; `grid grid-cols-2`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "API Key `type=\"password\"` placeholder `\"Your Zotero API key\"`; User ID placeholder `\"Numeric user ID\"`; `grid grid-cols-2`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 API Key `type="password"` placeholder `"Your Zotero API key"`; User ID placeholder `"Numeric user ID"`; `grid grid-cols-2`');
    }


    // This test validates: API Key `type="password"` placeholder `"Your Zotero API key"`; User ID placeholder `"Numeric user ID"`; `grid grid-cols-2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Button Connect Import Fetching with ArrowsClockwiseCircleNotch disabled when loa', async ({ page }) => {
    // Checkpoint 5: Button: `"Connect & Import"` / `"Fetching..."` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Button: `\"Connect & Import\"` / `\"Fetching...\"` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 Button: `"Connect & Import"` / `"Fetching..."` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty');
    }


    // This test validates: Button: `"Connect & Import"` / `"Fetching..."` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Validation Both API Key and User ID are required POST apireferenceszotero empty ', async ({ page }) => {
    // Checkpoint 6: Validation: `"Both API Key and User ID are required"`; POST `/api/references/zotero`; empty: `"No items found in this Zotero library."`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Validation: `\"Both API Key and User ID are required\"`; POST `/api/references/zotero`; empty: `\"No items found in this Zotero library.\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 Validation: `"Both API Key and User ID are required"`; POST `/api/references/zotero`; empty: `"No items found in this Zotero library."`');
    }


    // This test validates: Validation: `"Both API Key and User ID are required"`; POST `/api/references/zotero`; empty: `"No items found in this Zotero library."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Text Look up a single reference by its DOI placeholder eg 101038nature12373', async ({ page }) => {
    // Checkpoint 7: Text: `"Look up a single reference by its DOI."`; placeholder `"e.g., 10.1038/nature12373"`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Text: `\"Look up a single reference by its DOI.\"`; placeholder `\"e.g., 10.1038/nature12373\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 Text: `"Look up a single reference by its DOI."`; placeholder `"e.g., 10.1038/nature12373"`');
    }


    // This test validates: Text: `"Look up a single reference by its DOI."`; placeholder `"e.g., 10.1038/nature12373"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Enter key triggers lookup button MagnifyingGlass icon Lookup CircleNotch disable', async ({ page }) => {
    // Checkpoint 8: Enter key triggers lookup; button: `MagnifyingGlass` icon + `"Lookup"` / CircleNotch; disabled when loading or empty
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Enter key triggers lookup; button: `MagnifyingGlass` icon + `\"Lookup\"` / CircleNotch; disabled when loading or empty",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 Enter key triggers lookup; button: `MagnifyingGlass` icon + `"Lookup"` / CircleNotch; disabled when loading or empty');
    }


    // This test validates: Enter key triggers lookup; button: `MagnifyingGlass` icon + `"Lookup"` / CircleNotch; disabled when loading or empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Empty DOI error Enter a DOI to look up POST apireferencesparse with doi success ', async ({ page }) => {
    // Checkpoint 9: Empty DOI error: `"Enter a DOI to look up"`; POST `/api/references/parse` with `{ doi }`; success clears input
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty DOI error: `\"Enter a DOI to look up\"`; POST `/api/references/parse` with `{ doi }`; success clears input",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 Empty DOI error: `"Enter a DOI to look up"`; POST `/api/references/parse` with `{ doi }`; success clears input');
    }


    // This test validates: Empty DOI error: `"Enter a DOI to look up"`; POST `/api/references/parse` with `{ doi }`; success clears input
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Header count references imported selectedIdssize selected in brand Select all Cl', async ({ page }) => {
    // Checkpoint 10: Header: `"{count} reference(s) imported"` + `"({selectedIds.size} selected)"` in brand; `Select all` / `Clear` links
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Header: `\"{count} reference(s) imported\"` + `\"({selectedIds.size} selected)\"` in brand; `Select all` / `Clear` links",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 Header: `"{count} reference(s) imported"` + `"({selectedIds.size} selected)"` in brand; `Select all` / `Clear` links');
    }


    // This test validates: Header: `"{count} reference(s) imported"` + `"({selectedIds.size} selected)"` in brand; `Select all` / `Clear` links
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Filter Funnel icon toggle search placeholder Search references filters by title ', async ({ page }) => {
    // Checkpoint 11: Filter: `Funnel` icon toggle; search placeholder `"Search references..."`; filters by title, authors, journal (case-insensitive)
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Filter: `Funnel` icon toggle; search placeholder `\"Search references...\"`; filters by title, authors, journal (case-insensitive)",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 Filter: `Funnel` icon toggle; search placeholder `"Search references..."`; filters by title, authors, journal (case-insensitive)');
    }


    // This test validates: Filter: `Funnel` icon toggle; search placeholder `"Search references..."`; filters by title, authors, journal (case-insensitive)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Type dropdown only when refTypeslength 1 with All types default', async ({ page }) => {
    // Checkpoint 12: Type dropdown only when `refTypes.length > 1` with `"All types"` default
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Type dropdown only when `refTypes.length > 1` with `\"All types\"` default",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 Type dropdown only when `refTypes.length > 1` with `"All types"` default');
    }


    // This test validates: Type dropdown only when `refTypes.length > 1` with `"All types"` default
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Items in max-h-64 overflow-y-auto selected bg-brand5 border-brand30 checkbox w-4', async ({ page }) => {
    // Checkpoint 13: Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`');
    }


    // This test validates: Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Title text-xs font-medium line-clamp-2 authors first 3 et al when 3 year in pare', async ({ page }) => {
    // Checkpoint 14: Title `text-xs font-medium line-clamp-2`; authors: first 3 + `" et al."` when >3; year in parens; journal italic
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Title `text-xs font-medium line-clamp-2`; authors: first 3 + `\" et al.\"` when >3; year in parens; journal italic",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 Title `text-xs font-medium line-clamp-2`; authors: first 3 + `" et al."` when >3; year in parens; journal italic');
    }


    // This test validates: Title `text-xs font-medium line-clamp-2`; authors: first 3 + `" et al."` when >3; year in parens; journal italic
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Remove X uses stopPropagation empty filter No references match your filter', async ({ page }) => {
    // Checkpoint 15: Remove X uses `stopPropagation`; empty filter: `"No references match your filter."`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Remove X uses `stopPropagation`; empty filter: `\"No references match your filter.\"`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 Remove X uses `stopPropagation`; empty filter: `"No references match your filter."`');
    }


    // This test validates: Remove X uses `stopPropagation`; empty filter: `"No references match your filter."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Use button Use count Selected Referenceplural with Check disabled at 0 selected', async ({ page }) => {
    // Checkpoint 16: Use button: `"Use {count} Selected Reference{plural}"` with Check; disabled at 0 selected
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Use button: `\"Use {count} Selected Reference{plural}\"` with Check; disabled at 0 selected",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 Use button: `"Use {count} Selected Reference{plural}"` with Check; disabled at 0 selected');
    }


    // This test validates: Use button: `"Use {count} Selected Reference{plural}"` with Check; disabled at 0 selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Loading Processing with CircleNotch in bg-brand5 border-brand20', async ({ page }) => {
    // Checkpoint 17: Loading: `"Processing..."` with CircleNotch in `bg-brand/5 border-brand/20`
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Loading: `\"Processing...\"` with CircleNotch in `bg-brand/5 border-brand/20`",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 Loading: `"Processing..."` with CircleNotch in `bg-brand/5 border-brand/20`');
    }


    // This test validates: Loading: `"Processing..."` with CircleNotch in `bg-brand/5 border-brand/20`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Error bg-red-50010 border-red-50020 text-red-500 with Warning X dismiss', async ({ page }) => {
    // Checkpoint 18: Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss
    // Section: Reference Import Panel > ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss",
      section: "Reference Import Panel",
      subsection: "ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss');
    }


    // This test validates: Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 5 types none 0 duration fade 03s opacity slide spring stiffness300 damping32 dir', async ({ page }) => {
    // Checkpoint 19: 5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)');
    }


    // This test validates: 5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Per-slide transition overrides global AnimatePresence uses modesync for morph mo', async ({ page }) => {
    // Checkpoint 20: Per-slide `transition` overrides global; `AnimatePresence` uses `mode="sync"` for morph, `mode="wait"` for others
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Per-slide `transition` overrides global; `AnimatePresence` uses `mode=\"sync\"` for morph, `mode=\"wait\"` for others",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 Per-slide `transition` overrides global; `AnimatePresence` uses `mode="sync"` for morph, `mode="wait"` for others');
    }


    // This test validates: Per-slide `transition` overrides global; `AnimatePresence` uses `mode="sync"` for morph, `mode="wait"` for others
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Morph computeMorphIds MORPH_TITLE_ID MORPH_SUBTITLE_ID from morph-matcher', async ({ page }) => {
    // Checkpoint 21: Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`');
    }


    // This test validates: Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Hidden slides filtered via slidehidden total count visible only', async ({ page }) => {
    // Checkpoint 22: Hidden slides filtered via `slide.hidden`; total count = visible only
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Hidden slides filtered via `slide.hidden`; total count = visible only",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 Hidden slides filtered via `slide.hidden`; total count = visible only');
    }


    // This test validates: Hidden slides filtered via `slide.hidden`; total count = visible only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Empty No visible slides to present Exit Presentation button on black bg', async ({ page }) => {
    // Checkpoint 23: Empty: `"No visible slides to present."` + `"Exit Presentation"` button on black bg
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Empty: `\"No visible slides to present.\"` + `\"Exit Presentation\"` button on black bg",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 Empty: `"No visible slides to present."` + `"Exit Presentation"` button on black bg');
    }


    // This test validates: Empty: `"No visible slides to present."` + `"Exit Presentation"` button on black bg
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Auto-starts updates every 250ms format MMSS zero-padded PausePlay icons with ari', async ({ page }) => {
    // Checkpoint 24: Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels');
    }


    // This test validates: Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Pause preserves elapsed via offset tracking', async ({ page }) => {
    // Checkpoint 25: Pause preserves elapsed via offset tracking
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Pause preserves elapsed via offset tracking",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 Pause preserves elapsed via offset tracking');
    }


    // This test validates: Pause preserves elapsed via offset tracking
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: w-30 min-w-320px bg 090b12 border-l border-white10', async ({ page }) => {
    // Checkpoint 26: `w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "`w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 `w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`');
    }


    // This test validates: `w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Slide counter Slide X Y Audience button Monitor icon popup presentationaudience ', async ({ page }) => {
    // Checkpoint 27: Slide counter: `"Slide {X} / {Y}"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Slide counter: `\"Slide {X} / {Y}\"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 Slide counter: `"Slide {X} / {Y}"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720');
    }


    // This test validates: Slide counter: `"Slide {X} / {Y}"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Timer Clock icon text-emerald-400 Timer label value font-mono tabular-nums', async ({ page }) => {
    // Checkpoint 28: Timer: `Clock` icon `text-emerald-400` + `"Timer"` label; value `font-mono tabular-nums`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Timer: `Clock` icon `text-emerald-400` + `\"Timer\"` label; value `font-mono tabular-nums`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 Timer: `Clock` icon `text-emerald-400` + `"Timer"` label; value `font-mono tabular-nums`');
    }


    // This test validates: Timer: `Clock` icon `text-emerald-400` + `"Timer"` label; value `font-mono tabular-nums`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Screen buttons Black B Moon icon White W Sun icon active bg-white text-black', async ({ page }) => {
    // Checkpoint 29: Screen buttons: `"Black (B)"` Moon icon, `"White (W)"` Sun icon; active: `bg-white text-black`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Screen buttons: `\"Black (B)\"` Moon icon, `\"White (W)\"` Sun icon; active: `bg-white text-black`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 Screen buttons: `"Black (B)"` Moon icon, `"White (W)"` Sun icon; active: `bg-white text-black`');
    }


    // This test validates: Screen buttons: `"Black (B)"` Moon icon, `"White (W)"` Sun icon; active: `bg-white text-black`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Header Speaker Notes uppercase progress Build current of total optional clickaut', async ({ page }) => {
    // Checkpoint 30: Header `"Speaker Notes"` uppercase; progress `"Build {current} of {total}"` + optional click/auto counts + `" • Next click advances slide"`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Header `\"Speaker Notes\"` uppercase; progress `\"Build {current} of {total}\"` + optional click/auto counts + `\" • Next click advances slide\"`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 Header `"Speaker Notes"` uppercase; progress `"Build {current} of {total}"` + optional click/auto counts + `" • Next click advances slide"`');
    }


    // This test validates: Header `"Speaker Notes"` uppercase; progress `"Build {current} of {total}"` + optional click/auto counts + `" • Next click advances slide"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Rendered via ReactMarkdown remark-gfm links target_blank bold text-white empty N', async ({ page }) => {
    // Checkpoint 31: Rendered via `ReactMarkdown` + `remark-gfm`; links `target="_blank"`; bold `text-white`; empty: `"No speaker notes for this slide."` italic
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Rendered via `ReactMarkdown` + `remark-gfm`; links `target=\"_blank\"`; bold `text-white`; empty: `\"No speaker notes for this slide.\"` italic",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 Rendered via `ReactMarkdown` + `remark-gfm`; links `target="_blank"`; bold `text-white`; empty: `"No speaker notes for this slide."` italic');
    }


    // This test validates: Rendered via `ReactMarkdown` + `remark-gfm`; links `target="_blank"`; bold `text-white`; empty: `"No speaker notes for this slide."` italic
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Auto-scroll to top on slide change font size SML toggle text-smbaselg active bg-', async ({ page }) => {
    // Checkpoint 32: Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`');
    }


    // This test validates: Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Header Next Slide shows title or Slide n1 SlideRenderer at scale042 last slide E', async ({ page }) => {
    // Checkpoint 33: Header `"Next Slide"`; shows title or `"Slide {n+1}"`; `SlideRenderer` at `scale={0.42}`; last slide: `"End of presentation"`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Header `\"Next Slide\"`; shows title or `\"Slide {n+1}\"`; `SlideRenderer` at `scale={0.42}`; last slide: `\"End of presentation\"`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 Header `"Next Slide"`; shows title or `"Slide {n+1}"`; `SlideRenderer` at `scale={0.42}`; last slide: `"End of presentation"`');
    }


    // This test validates: Header `"Next Slide"`; shows title or `"Slide {n+1}"`; `SlideRenderer` at `scale={0.42}`; last slide: `"End of presentation"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Prev disabled at index 0 Next disabled at last slide when maxRevealOrder 0 revea', async ({ page }) => {
    // Checkpoint 34: Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`
    // Section: Reference Import Panel > PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-026');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`",
      section: "Reference Import Panel",
      subsection: "PresenterMode — Presentation Delivery (`presenter-mode.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`');
    }


    // This test validates: Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`
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
