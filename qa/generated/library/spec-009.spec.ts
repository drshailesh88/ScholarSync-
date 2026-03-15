/**
 * Auto-generated Playwright test for library/spec-009
 * Source: e2e/specs/library/spec-009.md
 * Generated: 2026-03-15T13:14:56.849Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-009', () => {
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

  test('cp-000: Search input uses rounded-xl bg-surface-raised border border-border base styling', async ({ page }) => {
    // Checkpoint 0: Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)
    // Section: Quick Test Workflows > Search Input Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)",
      section: "Quick Test Workflows",
      subsection: "Search Input Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)");
    }


    // This test validates: Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: ErrorDisplay reports the error to Sentry via SentrycaptureExceptionerror on moun', async ({ page }) => {
    // Checkpoint 1: ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)
    // Section: Quick Test Workflows > Error Display Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)",
      section: "Quick Test Workflows",
      subsection: "Error Display Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)");
    }


    // This test validates: ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: ErrorDisplay renders a WarningCircle icon red size 32 in a bg-red-50010 rounded ', async ({ page }) => {
    // Checkpoint 2: ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` rounded container (error-display.tsx:35-36)
    // Section: Quick Test Workflows > Error Display Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` rounded container (error-display.tsx:35-36)",
      section: "Quick Test Workflows",
      subsection: "Error Display Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` rounded container (error-display.tsx:35-36)");
    }


    // This test validates: ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` rounded container (error-display.tsx:35-36)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: ErrorDisplay retry button shows ArrowCounterClockwise icon size 16 next to Try A', async ({ page }) => {
    // Checkpoint 3: ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to "Try Again" text, styled as `bg-brand text-white` (error-display.tsx:41-45)
    // Section: Quick Test Workflows > Error Display Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to \"Try Again\" text, styled as `bg-brand text-white` (error-display.tsx:41-45)",
      section: "Quick Test Workflows",
      subsection: "Error Display Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to \"Try Again\" text, styled as `bg-brand text-white` (error-display.tsx:41-45)");
    }


    // This test validates: ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to "Try Again" text, styled as `bg-brand text-white` (error-display.tsx:41-45)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Cite in Editor button uses ClipboardText icon size 14 and has titleCite in Edito', async ({ page }) => {
    // Checkpoint 4: Cite in Editor button uses `ClipboardText` icon (size 14) and has `title="Cite in Editor"` tooltip attribute (page.tsx:576-577)
    // Section: Quick Test Workflows > Paper Card Action Button Icons

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Cite in Editor button uses `ClipboardText` icon (size 14) and has `title=\"Cite in Editor\"` tooltip attribute (page.tsx:576-577)",
      section: "Quick Test Workflows",
      subsection: "Paper Card Action Button Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Cite in Editor button uses `ClipboardText` icon (size 14) and has `title=\"Cite in Editor\"` tooltip attribute (page.tsx:576-577)");
    }


    // This test validates: Cite in Editor button uses `ClipboardText` icon (size 14) and has `title="Cite in Editor"` tooltip attribute (page.tsx:576-577)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: View PDF button uses Eye icon size 14 from Phosphor icons pagetsx586', async ({ page }) => {
    // Checkpoint 5: View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)
    // Section: Quick Test Workflows > Paper Card Action Button Icons

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)",
      section: "Quick Test Workflows",
      subsection: "Paper Card Action Button Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)");
    }


    // This test validates: View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: DOI link uses GlobeSimple icon size 14 same icon as the non-upload paper card le', async ({ page }) => {
    // Checkpoint 6: DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)
    // Section: Quick Test Workflows > Paper Card Action Button Icons

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)",
      section: "Quick Test Workflows",
      subsection: "Paper Card Action Button Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)");
    }


    // This test validates: DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Favorite button uses Star with weightfill when favorited weightregular outlined ', async ({ page }) => {
    // Checkpoint 7: Favorite button uses `Star` with `weight="fill"` when favorited, `weight="regular"` (outlined) when not (page.tsx:610)
    // Section: Quick Test Workflows > Paper Card Action Button Icons

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Favorite button uses `Star` with `weight=\"fill\"` when favorited, `weight=\"regular\"` (outlined) when not (page.tsx:610)",
      section: "Quick Test Workflows",
      subsection: "Paper Card Action Button Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Favorite button uses `Star` with `weight=\"fill\"` when favorited, `weight=\"regular\"` (outlined) when not (page.tsx:610)");
    }


    // This test validates: Favorite button uses `Star` with `weight="fill"` when favorited, `weight="regular"` (outlined) when not (page.tsx:610)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Delete button uses Trash icon size 16 with hovertext-red-500 hoverbg-red-50010 p', async ({ page }) => {
    // Checkpoint 8: Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)
    // Section: Quick Test Workflows > Paper Card Action Button Icons

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)",
      section: "Quick Test Workflows",
      subsection: "Paper Card Action Button Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)");
    }


    // This test validates: Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: PDF viewer aria-label is PDF Viewer when no title prop is passed Library does no', async ({ page }) => {
    // Checkpoint 9: PDF viewer `aria-label` is `"PDF Viewer"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF viewer `aria-label` is `\"PDF Viewer\"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "PDF viewer `aria-label` is `\"PDF Viewer\"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)");
    }


    // This test validates: PDF viewer `aria-label` is `"PDF Viewer"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: PDF viewer accepts initialPage prop to set starting page clamped to 1numPages ra', async ({ page }) => {
    // Checkpoint 10: PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)");
    }


    // This test validates: PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: PDF viewer close button only renders when onClose prop is provided pdf-viewertsx', async ({ page }) => {
    // Checkpoint 11: PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)");
    }


    // This test validates: PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: PDF content area uses overflow-auto for scrolling when zoomed beyond viewport pd', async ({ page }) => {
    // Checkpoint 12: PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)");
    }


    // This test validates: PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: PDF page element rendered with shadow-xl rounded-lg class pdf-viewertsx228', async ({ page }) => {
    // Checkpoint 13: PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)");
    }


    // This test validates: PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: PDF viewer uses pdfjs-distbuildpdfworkerminmjs as the PDFjs web worker pdf-viewe', async ({ page }) => {
    // Checkpoint 14: PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)");
    }


    // This test validates: PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: PDF viewer toolbar background is bg-surface border-b border-border pdf-viewertsx', async ({ page }) => {
    // Checkpoint 15: PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)");
    }


    // This test validates: PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: PreviousNext page buttons use disabledopacity-30 disabledcursor-not-allowed styl', async ({ page }) => {
    // Checkpoint 16: Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)");
    }


    // This test validates: Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Page counter uses tabular-nums min-w-5rem text-center for fixed-width numeric di', async ({ page }) => {
    // Checkpoint 17: Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)");
    }


    // This test validates: Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Zoom percentage uses tabular-nums min-w-3rem text-center for fixed-width display', async ({ page }) => {
    // Checkpoint 18: Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)
    // Section: Quick Test Workflows > PDF Viewer Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)");
    }


    // This test validates: Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: loadingtsx sidebar skeleton one h-4 w-20 heading placeholder 5 h-9 w-full rounde', async ({ page }) => {
    // Checkpoint 19: `loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)
    // Section: Quick Test Workflows > Skeleton Loading Composition Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)",
      section: "Quick Test Workflows",
      subsection: "Skeleton Loading Composition Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "`loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)");
    }


    // This test validates: `loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: loadingtsx search skeleton h-11 flex-1 rounded-xl placeholder loadingtsx16', async ({ page }) => {
    // Checkpoint 20: `loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)
    // Section: Quick Test Workflows > Skeleton Loading Composition Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)",
      section: "Quick Test Workflows",
      subsection: "Skeleton Loading Composition Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "`loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)");
    }


    // This test validates: `loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: loadingtsx sort skeleton h-11 w-40 rounded-xl placeholder loadingtsx17', async ({ page }) => {
    // Checkpoint 21: `loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)
    // Section: Quick Test Workflows > Skeleton Loading Composition Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)",
      section: "Quick Test Workflows",
      subsection: "Skeleton Loading Composition Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "`loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)");
    }


    // This test validates: `loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: SkeletonCard composition glass-panel rounded-2xl p-6 container with h-12 w-12 ro', async ({ page }) => {
    // Checkpoint 22: `SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)
    // Section: Quick Test Workflows > Skeleton Loading Composition Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)",
      section: "Quick Test Workflows",
      subsection: "Skeleton Loading Composition Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-022 ' + "`SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)");
    }


    // This test validates: `SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: SkeletonText last line renders at 60 width all others at 100 skeletontsx19', async ({ page }) => {
    // Checkpoint 23: `SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)
    // Section: Quick Test Workflows > Skeleton Loading Composition Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)",
      section: "Quick Test Workflows",
      subsection: "Skeleton Loading Composition Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-023 ' + "`SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)");
    }


    // This test validates: `SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Filter row uses flex-wrap so filter controls wrap to next line on narrow viewpor', async ({ page }) => {
    // Checkpoint 24: Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-024 ' + "Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)");
    }


    // This test validates: Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Paper card hover effect uses hoverbg-surface-raised30 transition-all pagetsx529', async ({ page }) => {
    // Checkpoint 25: Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-025 ' + "Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)");
    }


    // This test validates: Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Sidebar bottom section has border-t border-border-subtle divider above UploadNew', async ({ page }) => {
    // Checkpoint 26: Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-026 ' + "Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)");
    }


    // This test validates: Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Sidebar nav uses space-y-05 for minimal gap between collection items pagetsx336', async ({ page }) => {
    // Checkpoint 27: Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-027 ' + "Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)");
    }


    // This test validates: Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Upload button disabled styling uses disabledopacity-50 pagetsx392', async ({ page }) => {
    // Checkpoint 28: Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-028 ' + "Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)");
    }


    // This test validates: Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Sort dropdown styling rounded-xl bg-surface-raised border border-border text-ink', async ({ page }) => {
    // Checkpoint 29: Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-029 ' + "Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)");
    }


    // This test validates: Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Paper card left icon container w-10 h-10 rounded-lg bg-surface-raised pagetsx531', async ({ page }) => {
    // Checkpoint 30: Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-030 ' + "Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)");
    }


    // This test validates: Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: All Papers active state bg-surface-raised text-ink font-medium inactive text-ink', async ({ page }) => {
    // Checkpoint 31: `All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)
    // Section: Quick Test Workflows > Layout & Styling Extras

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)",
      section: "Quick Test Workflows",
      subsection: "Layout & Styling Extras",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-031 ' + "`All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)");
    }


    // This test validates: `All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Requires authentication returns 401 Authentication required if unauthenticated e', async ({ page }) => {
    // Checkpoint 32: Requires authentication; returns 401 `"Authentication required"` if unauthenticated (extract-pdf/route.ts:27-29)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Requires authentication; returns 401 `\"Authentication required\"` if unauthenticated (extract-pdf/route.ts:27-29)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-032 ' + "Requires authentication; returns 401 `\"Authentication required\"` if unauthenticated (extract-pdf/route.ts:27-29)");
    }


    // This test validates: Requires authentication; returns 401 `"Authentication required"` if unauthenticated (extract-pdf/route.ts:27-29)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Applies rate limiting with RATE_LIMITSai bucket extract-pdfroutets34', async ({ page }) => {
    // Checkpoint 33: Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-033 ' + "Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)");
    }


    // This test validates: Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Validates Content-Type header must include multipartform-data returns 400 Conten', async ({ page }) => {
    // Checkpoint 34: Validates Content-Type header must include `multipart/form-data`; returns 400 `"Content-Type must be multipart/form-data"` (extract-pdf/route.ts:41-46)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Validates Content-Type header must include `multipart/form-data`; returns 400 `\"Content-Type must be multipart/form-data\"` (extract-pdf/route.ts:41-46)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-034 ' + "Validates Content-Type header must include `multipart/form-data`; returns 400 `\"Content-Type must be multipart/form-data\"` (extract-pdf/route.ts:41-46)");
    }


    // This test validates: Validates Content-Type header must include `multipart/form-data`; returns 400 `"Content-Type must be multipart/form-data"` (extract-pdf/route.ts:41-46)
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
