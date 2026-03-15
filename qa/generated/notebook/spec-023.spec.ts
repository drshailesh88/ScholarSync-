/**
 * Auto-generated Playwright test for notebook/spec-023
 * Source: e2e/specs/notebook/spec-023.md
 * Generated: 2026-03-15T18:19:53.430Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-023
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-023', () => {
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

  test('cp-000: Per-page loading state smaller spinner within the page render area', async ({ page }) => {
    // Checkpoint 0: Per-page loading state: smaller spinner within the page render area
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Per-page loading state: smaller spinner within the page render area",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "Per-page loading state: smaller spinner within the page render area");
    }


    // This test validates: Per-page loading state: smaller spinner within the page render area
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Escape key listener registered only when onClose prop is provided removed on cle', async ({ page }) => {
    // Checkpoint 1: Escape key listener registered only when `onClose` prop is provided; removed on cleanup
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Escape key listener registered only when `onClose` prop is provided; removed on cleanup",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Escape key listener registered only when `onClose` prop is provided; removed on cleanup");
    }


    // This test validates: Escape key listener registered only when `onClose` prop is provided; removed on cleanup
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: roledialog aria-modaltrue aria-label includes title when provided PDF Viewer tit', async ({ page }) => {
    // Checkpoint 2: `role="dialog"`, `aria-modal="true"`, `aria-label` includes title when provided: `"PDF Viewer: {title}"`, otherwise `"PDF Viewer"`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`role=\"dialog\"`, `aria-modal=\"true\"`, `aria-label` includes title when provided: `\"PDF Viewer: {title}\"`, otherwise `\"PDF Viewer\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "`role=\"dialog\"`, `aria-modal=\"true\"`, `aria-label` includes title when provided: `\"PDF Viewer: {title}\"`, otherwise `\"PDF Viewer\"`");
    }


    // This test validates: `role="dialog"`, `aria-modal="true"`, `aria-label` includes title when provided: `"PDF Viewer: {title}"`, otherwise `"PDF Viewer"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Navigation aria-labels Previous page Next page', async ({ page }) => {
    // Checkpoint 3: Navigation aria-labels: `"Previous page"`, `"Next page"`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Navigation aria-labels: `\"Previous page\"`, `\"Next page\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Navigation aria-labels: `\"Previous page\"`, `\"Next page\"`");
    }


    // This test validates: Navigation aria-labels: `"Previous page"`, `"Next page"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Zoom aria-labels Zoom out Zoom in Fit width', async ({ page }) => {
    // Checkpoint 4: Zoom aria-labels: `"Zoom out"`, `"Zoom in"`, `"Fit width"`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zoom aria-labels: `\"Zoom out\"`, `\"Zoom in\"`, `\"Fit width\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Zoom aria-labels: `\"Zoom out\"`, `\"Zoom in\"`, `\"Fit width\"`");
    }


    // This test validates: Zoom aria-labels: `"Zoom out"`, `"Zoom in"`, `"Fit width"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Close button aria-labelClose PDF viewer', async ({ page }) => {
    // Checkpoint 5: Close button `aria-label="Close PDF viewer"`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Close button `aria-label=\"Close PDF viewer\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Close button `aria-label=\"Close PDF viewer\"`");
    }


    // This test validates: Close button `aria-label="Close PDF viewer"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Title shown in toolbar truncated with max-w-40 hidden on small screens via hidde', async ({ page }) => {
    // Checkpoint 6: Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`");
    }


    // This test validates: Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: PDF page rendered with shadow-xl rounded-lg content area has bg-surface50 backgr', async ({ page }) => {
    // Checkpoint 7: PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background");
    }


    // This test validates: PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Returns null when neither url nor file prop is provided', async ({ page }) => {
    // Checkpoint 8: Returns `null` when neither `url` nor `file` prop is provided
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Returns `null` when neither `url` nor `file` prop is provided",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Returns `null` when neither `url` nor `file` prop is provided");
    }


    // This test validates: Returns `null` when neither `url` nor `file` prop is provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Learn mode empty state subtitle is exactly Select your papers and start explorin', async ({ page }) => {
    // Checkpoint 9: Learn mode empty state subtitle is exactly `"Select your papers and start exploring"`
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Learn mode empty state subtitle is exactly `\"Select your papers and start exploring\"`",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Learn mode empty state subtitle is exactly `\"Select your papers and start exploring\"`");
    }


    // This test validates: Learn mode empty state subtitle is exactly `"Select your papers and start exploring"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Research mode empty state uses conditional plural without parentheses Ready to a', async ({ page }) => {
    // Checkpoint 10: Research mode empty state uses conditional plural without parentheses: `"Ready to analyze 1 source"` (singular) vs `"Ready to analyze 2 sources"` (plural)
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Research mode empty state uses conditional plural without parentheses: `\"Ready to analyze 1 source\"` (singular) vs `\"Ready to analyze 2 sources\"` (plural)",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Research mode empty state uses conditional plural without parentheses: `\"Ready to analyze 1 source\"` (singular) vs `\"Ready to analyze 2 sources\"` (plural)");
    }


    // This test validates: Research mode empty state uses conditional plural without parentheses: `"Ready to analyze 1 source"` (singular) vs `"Ready to analyze 2 sources"` (plural)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Suggestion-loading bouncing dots are w-15 h-15 bg-brand30 with delays 0ms100ms20', async ({ page }) => {
    // Checkpoint 11: Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms");
    }


    // This test validates: Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: handleOpenAudioOverview auto-creates a conversation with title Audio Overview if', async ({ page }) => {
    // Checkpoint 12: `handleOpenAudioOverview` auto-creates a conversation with title `"Audio Overview"` if no conversation exists yet
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`handleOpenAudioOverview` auto-creates a conversation with title `\"Audio Overview\"` if no conversation exists yet",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "`handleOpenAudioOverview` auto-creates a conversation with title `\"Audio Overview\"` if no conversation exists yet");
    }


    // This test validates: `handleOpenAudioOverview` auto-creates a conversation with title `"Audio Overview"` if no conversation exists yet
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Audio overview auto-creation prepends the new conversation to pastConversations ', async ({ page }) => {
    // Checkpoint 13: Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum");
    }


    // This test validates: Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: handleOpenAudioOverview failure logs Failed to open audio overview to console wi', async ({ page }) => {
    // Checkpoint 14: `handleOpenAudioOverview` failure logs `"Failed to open audio overview:"` to console with no inline UI error
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`handleOpenAudioOverview` failure logs `\"Failed to open audio overview:\"` to console with no inline UI error",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "`handleOpenAudioOverview` failure logs `\"Failed to open audio overview:\"` to console with no inline UI error");
    }


    // This test validates: `handleOpenAudioOverview` failure logs `"Failed to open audio overview:"` to console with no inline UI error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Conversation history entries with null titles display Untitled as both visible t', async ({ page }) => {
    // Checkpoint 15: Conversation history entries with null titles display `"Untitled"` as both visible text and HTML `title` attribute
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Conversation history entries with null titles display `\"Untitled\"` as both visible text and HTML `title` attribute",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Conversation history entries with null titles display `\"Untitled\"` as both visible text and HTML `title` attribute");
    }


    // This test validates: Conversation history entries with null titles display `"Untitled"` as both visible text and HTML `title` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Send button disabled state uses disabledopacity-50 audioshare disabled buttons u', async ({ page }) => {
    // Checkpoint 16: Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`");
    }


    // This test validates: Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: handleCitationClick sets highlightedSource BEFORE checking if source exists a mi', async ({ page }) => {
    // Checkpoint 17: `handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "`handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index");
    }


    // This test validates: `handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Copy and feedback action buttons appear on ALL assistant messages including erro', async ({ page }) => {
    // Checkpoint 18: Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing");
    }


    // This test validates: Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Coverage badge unused-paper title truncation has no length limit for colon trunc', async ({ page }) => {
    // Checkpoint 19: Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `"…"`
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `\"…\"`",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `\"…\"`");
    }


    // This test validates: Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `"…"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Coverage badge not referenced suffix unused paper titles are joined with and fol', async ({ page }) => {
    // Checkpoint 20: Coverage badge "not referenced" suffix: unused paper titles are joined with `", "` and followed by literal text `" not referenced"`
    // Section: Quick Test Workflows > Notebook Page — Additional Rendering Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Coverage badge \"not referenced\" suffix: unused paper titles are joined with `\", \"` and followed by literal text `\" not referenced\"`",
      section: "Quick Test Workflows",
      subsection: "Notebook Page — Additional Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Coverage badge \"not referenced\" suffix: unused paper titles are joined with `\", \"` and followed by literal text `\" not referenced\"`");
    }


    // This test validates: Coverage badge "not referenced" suffix: unused paper titles are joined with `", "` and followed by literal text `" not referenced"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: enableNotebookSharing reuses existing share_token if present only generates new ', async ({ page }) => {
    // Checkpoint 21: `enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "`enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists");
    }


    // This test validates: `enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: disableNotebookSharing preserves the existing share token only sets share_enable', async ({ page }) => {
    // Checkpoint 22: `disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "`disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`");
    }


    // This test validates: `disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: updateNotebookShareSettings hashes passwords via hashPassword before storing nul', async ({ page }) => {
    // Checkpoint 23: `updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "`updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)");
    }


    // This test validates: `updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: verifyNotebookSharePassword supports both hashed passwords detected via isHashed', async ({ page }) => {
    // Checkpoint 24: `verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "`verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison");
    }


    // This test validates: `verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: verifyNotebookSharePassword returns true without comparison when sharePassword i', async ({ page }) => {
    // Checkpoint 25: `verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "`verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)");
    }


    // This test validates: `verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: getNotebookByShareToken returns null for expired shares by checking new Date con', async ({ page }) => {
    // Checkpoint 26: `getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "`getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`");
    }


    // This test validates: `getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: getNotebookByShareToken falls back to Untitled Notebook for null conversation ti', async ({ page }) => {
    // Checkpoint 27: `getNotebookByShareToken` falls back to `"Untitled Notebook"` for null conversation titles
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getNotebookByShareToken` falls back to `\"Untitled Notebook\"` for null conversation titles",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "`getNotebookByShareToken` falls back to `\"Untitled Notebook\"` for null conversation titles");
    }


    // This test validates: `getNotebookByShareToken` falls back to `"Untitled Notebook"` for null conversation titles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: getNotebookByShareToken falls back to A researcher for missing owner names', async ({ page }) => {
    // Checkpoint 28: `getNotebookByShareToken` falls back to `"A researcher"` for missing owner names
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getNotebookByShareToken` falls back to `\"A researcher\"` for missing owner names",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "`getNotebookByShareToken` falls back to `\"A researcher\"` for missing owner names");
    }


    // This test validates: `getNotebookByShareToken` falls back to `"A researcher"` for missing owner names
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: getNotebookByShareToken orders messages by created_at ascending', async ({ page }) => {
    // Checkpoint 29: `getNotebookByShareToken` orders messages by `created_at` ascending
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getNotebookByShareToken` orders messages by `created_at` ascending",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "`getNotebookByShareToken` orders messages by `created_at` ascending");
    }


    // This test validates: `getNotebookByShareToken` orders messages by `created_at` ascending
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Share URL constructed from processenvNEXT_PUBLIC_APP_URL falling back to httploc', async ({ page }) => {
    // Checkpoint 30: Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `"http://localhost:3001"`
    // Section: Quick Test Workflows > Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `\"http://localhost:3001\"`",
      section: "Quick Test Workflows",
      subsection: "Notebook Share Actions (`notebook-share.ts`) — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `\"http://localhost:3001\"`");
    }


    // This test validates: Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `"http://localhost:3001"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Password field in share dialog uses typetext visible while typing NOT typepasswo', async ({ page }) => {
    // Checkpoint 31: Password field in share dialog uses `type="text"` (visible while typing), NOT `type="password"` — different from the password gate which uses `type="password"`
    // Section: Quick Test Workflows > Share Dialog — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Password field in share dialog uses `type=\"text\"` (visible while typing), NOT `type=\"password\"` — different from the password gate which uses `type=\"password\"`",
      section: "Quick Test Workflows",
      subsection: "Share Dialog — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "Password field in share dialog uses `type=\"text\"` (visible while typing), NOT `type=\"password\"` — different from the password gate which uses `type=\"password\"`");
    }


    // This test validates: Password field in share dialog uses `type="text"` (visible while typing), NOT `type="password"` — different from the password gate which uses `type="password"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Share toggle has aria-labelToggle notebook sharing', async ({ page }) => {
    // Checkpoint 32: Share toggle has `aria-label="Toggle notebook sharing"`
    // Section: Quick Test Workflows > Share Dialog — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share toggle has `aria-label=\"Toggle notebook sharing\"`",
      section: "Quick Test Workflows",
      subsection: "Share Dialog — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Share toggle has `aria-label=\"Toggle notebook sharing\"`");
    }


    // This test validates: Share toggle has `aria-label="Toggle notebook sharing"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Toggle and Save Settings share the same saving state toggling disables Save and ', async ({ page }) => {
    // Checkpoint 33: Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle
    // Section: Quick Test Workflows > Share Dialog — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle",
      section: "Quick Test Workflows",
      subsection: "Share Dialog — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle");
    }


    // This test validates: Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: handleCopy is a no-op when shareUrl is null guard before clipboard write', async ({ page }) => {
    // Checkpoint 34: `handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)
    // Section: Quick Test Workflows > Share Dialog — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)",
      section: "Quick Test Workflows",
      subsection: "Share Dialog — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "`handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)");
    }


    // This test validates: `handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)
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
