/**
 * Auto-generated Playwright test for library/spec-008
 * Source: e2e/specs/library/spec-008.md
 * Generated: 2026-03-15T15:55:36.566Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-008
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-008', () => {
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

  test('cp-000: Zoom out is disabled at the lower bound of 50', async ({ page }) => {
    // Checkpoint 0: Zoom out is disabled at the lower bound of `50%`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Zoom out is disabled at the lower bound of `50%`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Zoom out is disabled at the lower bound of `50%`");
    }


    // This test validates: Zoom out is disabled at the lower bound of `50%`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Zoom in is disabled at the upper bound of 300', async ({ page }) => {
    // Checkpoint 1: Zoom in is disabled at the upper bound of `300%`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Zoom in is disabled at the upper bound of `300%`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Zoom in is disabled at the upper bound of `300%`");
    }


    // This test validates: Zoom in is disabled at the upper bound of `300%`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Fit width resets zoom to exactly 100', async ({ page }) => {
    // Checkpoint 2: `Fit width` resets zoom to exactly `100%`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`Fit width` resets zoom to exactly `100%`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "`Fit width` resets zoom to exactly `100%`");
    }


    // This test validates: `Fit width` resets zoom to exactly `100%`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Escape key closes the PDF viewer overlay', async ({ page }) => {
    // Checkpoint 3: `Escape` key closes the PDF viewer overlay
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`Escape` key closes the PDF viewer overlay",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "`Escape` key closes the PDF viewer overlay");
    }


    // This test validates: `Escape` key closes the PDF viewer overlay
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Close icon button unmounts the PDF viewer overlay', async ({ page }) => {
    // Checkpoint 4: Close icon button unmounts the PDF viewer overlay
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Close icon button unmounts the PDF viewer overlay",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Close icon button unmounts the PDF viewer overlay");
    }


    // This test validates: Close icon button unmounts the PDF viewer overlay
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: PDFViewer returns null if neither url nor file is provided', async ({ page }) => {
    // Checkpoint 5: `PDFViewer` returns `null` if neither `url` nor `file` is provided
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`PDFViewer` returns `null` if neither `url` nor `file` is provided",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "`PDFViewer` returns `null` if neither `url` nor `file` is provided");
    }


    // This test validates: `PDFViewer` returns `null` if neither `url` nor `file` is provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Document-level loading UI shows a spinner plus the text Loading PDF', async ({ page }) => {
    // Checkpoint 6: Document-level loading UI shows a spinner plus the text `Loading PDF...`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Document-level loading UI shows a spinner plus the text `Loading PDF...`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Document-level loading UI shows a spinner plus the text `Loading PDF...`");
    }


    // This test validates: Document-level loading UI shows a spinner plus the text `Loading PDF...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Page-level loading UI shows a spinner with no extra text', async ({ page }) => {
    // Checkpoint 7: Page-level loading UI shows a spinner with no extra text
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Page-level loading UI shows a spinner with no extra text",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Page-level loading UI shows a spinner with no extra text");
    }


    // This test validates: Page-level loading UI shows a spinner with no extra text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Generic document error slot renders Failed to load PDF document', async ({ page }) => {
    // Checkpoint 8: Generic document error slot renders `Failed to load PDF document.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Generic document error slot renders `Failed to load PDF document.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Generic document error slot renders `Failed to load PDF document.`");
    }


    // This test validates: Generic document error slot renders `Failed to load PDF document.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 404 Not Found Missing load errors are normalized to the unavailable-PDF explanat', async ({ page }) => {
    // Checkpoint 9: 404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text");
    }


    // This test validates: 404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Non-404 PDF load errors show top line Failed to load PDF with the raw error mess', async ({ page }) => {
    // Checkpoint 10: Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it");
    }


    // This test validates: Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Arrow-key page navigation is not implemented in the current PDFViewer', async ({ page }) => {
    // Checkpoint 11: Arrow-key page navigation is not implemented in the current `PDFViewer`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Arrow-key page navigation is not implemented in the current `PDFViewer`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Arrow-key page navigation is not implemented in the current `PDFViewer`");
    }


    // This test validates: Arrow-key page navigation is not implemented in the current `PDFViewer`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Route-level loadingtsx renders a sidebar skeleton a search skeleton a sort skele', async ({ page }) => {
    // Checkpoint 12: Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders");
    }


    // This test validates: Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Route-level error boundary title reads Library unavailable', async ({ page }) => {
    // Checkpoint 13: Route-level error boundary title reads `Library unavailable`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Route-level error boundary title reads `Library unavailable`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "Route-level error boundary title reads `Library unavailable`");
    }


    // This test validates: Route-level error boundary title reads `Library unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Route-level error boundary message reads We couldnt load your paper library Plea', async ({ page }) => {
    // Checkpoint 14: Route-level error boundary message reads `We couldn't load your paper library. Please try again.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Route-level error boundary message reads `We couldn't load your paper library. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "Route-level error boundary message reads `We couldn't load your paper library. Please try again.`");
    }


    // This test validates: Route-level error boundary message reads `We couldn't load your paper library. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: A client-side fetch failure in fetchPapers logs an error and drops back to non-l', async ({ page }) => {
    // Checkpoint 15: A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself");
    }


    // This test validates: A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Library results are rendered as a simple scrolling column infinite scroll is not', async ({ page }) => {
    // Checkpoint 16: Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component");
    }


    // This test validates: Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Shared Citation Dialog and Reference Store UI described later in the original do', async ({ page }) => {
    // Checkpoint 17: Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation");
    }


    // This test validates: Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Paper title uses font-medium class not font-bold original section 5 says bold bu', async ({ page }) => {
    // Checkpoint 18: Paper title uses `font-medium` class, not `font-bold` — original section 5 says "bold" but code renders `<h3 className="font-medium ...">` (page.tsx:539)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper title uses `font-medium` class, not `font-bold` — original section 5 says \"bold\" but code renders `<h3 className=\"font-medium ...\">` (page.tsx:539)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "Paper title uses `font-medium` class, not `font-bold` — original section 5 says \"bold\" but code renders `<h3 className=\"font-medium ...\">` (page.tsx:539)");
    }


    // This test validates: Paper title uses `font-medium` class, not `font-bold` — original section 5 says "bold" but code renders `<h3 className="font-medium ...">` (page.tsx:539)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Paper title has NO truncation original says truncated to 1 line but the h3 has n', async ({ page }) => {
    // Checkpoint 19: Paper title has NO truncation — original says "truncated to 1 line" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper title has NO truncation — original says \"truncated to 1 line\" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "Paper title has NO truncation — original says \"truncated to 1 line\" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)");
    }


    // This test validates: Paper title has NO truncation — original says "truncated to 1 line" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Error boundary retry button reads Try Again with ArrowCounterClockwise icon not ', async ({ page }) => {
    // Checkpoint 20: Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says "Retry" (error-display.tsx:43)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says \"Retry\" (error-display.tsx:43)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says \"Retry\" (error-display.tsx:43)");
    }


    // This test validates: Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says "Retry" (error-display.tsx:43)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Clear Filters uses translucent red styling bg-red-50010 hoverbg-red-50020 not so', async ({ page }) => {
    // Checkpoint 21: Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says "Red background/hover" (page.tsx:503)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says \"Red background/hover\" (page.tsx:503)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says \"Red background/hover\" (page.tsx:503)");
    }


    // This test validates: Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says "Red background/hover" (page.tsx:503)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Cite button icon is BookOpen size 14 not a clipboard or citation-specific icon p', async ({ page }) => {
    // Checkpoint 22: Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-022 ' + "Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)");
    }


    // This test validates: Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Sidebar heading source text is Collections first-letter capitalized transformed ', async ({ page }) => {
    // Checkpoint 23: Sidebar heading source text is `Collections` (first-letter capitalized), transformed to "COLLECTIONS" by the CSS `uppercase` class — not a literal "COLLECTIONS" string in markup (page.tsx:334)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sidebar heading source text is `Collections` (first-letter capitalized), transformed to \"COLLECTIONS\" by the CSS `uppercase` class — not a literal \"COLLECTIONS\" string in markup (page.tsx:334)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-023 ' + "Sidebar heading source text is `Collections` (first-letter capitalized), transformed to \"COLLECTIONS\" by the CSS `uppercase` class — not a literal \"COLLECTIONS\" string in markup (page.tsx:334)");
    }


    // This test validates: Sidebar heading source text is `Collections` (first-letter capitalized), transformed to "COLLECTIONS" by the CSS `uppercase` class — not a literal "COLLECTIONS" string in markup (page.tsx:334)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: toPaperData only passes title authors journal year doi to the citation formatter', async ({ page }) => {
    // Checkpoint 24: `toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-024 ' + "`toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)");
    }


    // This test validates: `toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: View PDF button condition does NOT check open_access_url only source user_upload', async ({ page }) => {
    // Checkpoint 25: `View PDF` button condition does NOT check `open_access_url`, only `source === "user_upload" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`View PDF` button condition does NOT check `open_access_url`, only `source === \"user_upload\" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-025 ' + "`View PDF` button condition does NOT check `open_access_url`, only `source === \"user_upload\" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)");
    }


    // This test validates: `View PDF` button condition does NOT check `open_access_url`, only `source === "user_upload" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Escape key closes the citation modal inherited from Modal component keydown list', async ({ page }) => {
    // Checkpoint 26: Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-026 ' + "Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)");
    }


    // This test validates: Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Clicking the dark backdrop overlay closes the citation modal backdrop div has on', async ({ page }) => {
    // Checkpoint 27: Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-027 ' + "Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)");
    }


    // This test validates: Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Body scroll is locked when citation modal is open documentbodystyleoverflow hidd', async ({ page }) => {
    // Checkpoint 28: Body scroll is locked when citation modal is open — `document.body.style.overflow = "hidden"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Body scroll is locked when citation modal is open — `document.body.style.overflow = \"hidden\"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-028 ' + "Body scroll is locked when citation modal is open — `document.body.style.overflow = \"hidden\"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)");
    }


    // This test validates: Body scroll is locked when citation modal is open — `document.body.style.overflow = "hidden"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Modal header renders a close X button Phosphor X icon size 18 on the right side ', async ({ page }) => {
    // Checkpoint 29: Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-029 ' + "Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)");
    }


    // This test validates: Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Modal max width is max-w-lg with mx-4 horizontal margin modaltsx43-45', async ({ page }) => {
    // Checkpoint 30: Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-030 ' + "Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)");
    }


    // This test validates: Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Citation formatted text uses whitespace-pre-wrap class preserves line breaks in ', async ({ page }) => {
    // Checkpoint 31: Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)
    // Section: Quick Test Workflows > Citation Modal — Modal Component Behaviors

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)",
      section: "Quick Test Workflows",
      subsection: "Citation Modal — Modal Component Behaviors",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-031 ' + "Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)");
    }


    // This test validates: Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Search input renders a MagnifyingGlass icon size 18 absolutely positioned on the', async ({ page }) => {
    // Checkpoint 32: Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)
    // Section: Quick Test Workflows > Search Input Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)",
      section: "Quick Test Workflows",
      subsection: "Search Input Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-032 ' + "Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)");
    }


    // This test validates: Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Search input has pl-10 left padding to accommodate the icon search-inputtsx30', async ({ page }) => {
    // Checkpoint 33: Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)
    // Section: Quick Test Workflows > Search Input Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)",
      section: "Quick Test Workflows",
      subsection: "Search Input Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-033 ' + "Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)");
    }


    // This test validates: Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Search input shows focus ring focusring-2 focusring-brand40 search-inputtsx30', async ({ page }) => {
    // Checkpoint 34: Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)
    // Section: Quick Test Workflows > Search Input Component Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)",
      section: "Quick Test Workflows",
      subsection: "Search Input Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-034 ' + "Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)");
    }


    // This test validates: Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)
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
