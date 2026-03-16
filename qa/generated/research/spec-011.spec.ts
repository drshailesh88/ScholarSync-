/**
 * Auto-generated Playwright test for research/spec-011
 * Source: e2e/specs/research/spec-011.md
 * Generated: 2026-03-15T17:27:47.711Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-011
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-011', () => {
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

  test('cp-000: AI synthesis does not rerun when only non-title metadata changes on the same top', async ({ page }) => {
    // Checkpoint 0: AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ' + "AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles");
    }


    // This test validates: AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: AI synthesis request body includes only title authors year journal abstract pmid', async ({ page }) => {
    // Checkpoint 1: AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ' + "AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers");
    }


    // This test validates: AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: AI synthesis sends an empty string for abstract when a result has no abstract', async ({ page }) => {
    // Checkpoint 2: AI synthesis sends an empty string for `abstract` when a result has no abstract
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis sends an empty string for `abstract` when a result has no abstract",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ' + "AI synthesis sends an empty string for `abstract` when a result has no abstract");
    }


    // This test validates: AI synthesis sends an empty string for `abstract` when a result has no abstract
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: AI synthesis aborts any previous streaming request before starting a new one', async ({ page }) => {
    // Checkpoint 3: AI synthesis aborts any previous streaming request before starting a new one
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis aborts any previous streaming request before starting a new one",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 ' + "AI synthesis aborts any previous streaming request before starting a new one");
    }


    // This test validates: AI synthesis aborts any previous streaming request before starting a new one
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: AI synthesis marks the panel as failed and hides it when apiresearchsynthesize r', async ({ page }) => {
    // Checkpoint 4: AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 ' + "AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body");
    }


    // This test validates: AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: AI synthesis treats AbortError as a silent cancellation and does not mark the pa', async ({ page }) => {
    // Checkpoint 5: AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 ' + "AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed");
    }


    // This test validates: AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: AI synthesis useEffect cleanup aborts the in-flight synthesis request on unmount', async ({ page }) => {
    // Checkpoint 6: AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 ' + "AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change");
    }


    // This test validates: AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Citation parsing uses the exact regex dg', async ({ page }) => {
    // Checkpoint 7: Citation parsing uses the exact regex `/\\[(\\d+)\\]/g`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Citation parsing uses the exact regex `/\\\\[(\\\\d+)\\\\]/g`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 ' + "Citation parsing uses the exact regex `/\\\\[(\\\\d+)\\\\]/g`");
    }


    // This test validates: Citation parsing uses the exact regex `/\\[(\\d+)\\]/g`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Citation markers that do not map to one of the top 5 results remain literal brac', async ({ page }) => {
    // Checkpoint 8: Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 ' + "Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body");
    }


    // This test validates: Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Citation labels are built from the last token of the first author string plus op', async ({ page }) => {
    // Checkpoint 9: Citation labels are built from the last token of the first author string plus optional ` et al.` and the year
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Citation labels are built from the last token of the first author string plus optional ` et al.` and the year",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 ' + "Citation labels are built from the last token of the first author string plus optional ` et al.` and the year");
    }


    // This test validates: Citation labels are built from the last token of the first author string plus optional ` et al.` and the year
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: A paper with no authors in the top 5 citation map renders the fallback label pre', async ({ page }) => {
    // Checkpoint 10: A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 ' + "A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`");
    }


    // This test validates: A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Inline synthesis citation buttons set a title attribute of Scroll to paper title', async ({ page }) => {
    // Checkpoint 11: Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 ' + "Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`");
    }


    // This test validates: Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Clicking a synthesis citation applies ring-2 ring-brand50 to the target result c', async ({ page }) => {
    // Checkpoint 12: Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 ' + "Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`");
    }


    // This test validates: Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Overflow detection uses contentRefcurrentscrollHeight 96 after render and falls ', async ({ page }) => {
    // Checkpoint 13: Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 ' + "Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured");
    }


    // This test validates: Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Read-more clamping uses max-h-24 overflow-hidden', async ({ page }) => {
    // Checkpoint 14: Read-more clamping uses `max-h-24 overflow-hidden`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Read-more clamping uses `max-h-24 overflow-hidden`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 ' + "Read-more clamping uses `max-h-24 overflow-hidden`");
    }


    // This test validates: Read-more clamping uses `max-h-24 overflow-hidden`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Free-plan overlay is not shown while the synthesis is still streaming and synthe', async ({ page }) => {
    // Checkpoint 15: Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 ' + "Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty");
    }


    // This test validates: Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Free-plan users never receive the Read More Show Less toggle even when the synth', async ({ page }) => {
    // Checkpoint 16: Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 ' + "Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows");
    }


    // This test validates: Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: The current AI synthesis panel has no retry button error copy or recovery CTA af', async ({ page }) => {
    // Checkpoint 17: The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 ' + "The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request");
    }


    // This test validates: The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: apiresearchsynthesize requires authentication through getCurrentUserId', async ({ page }) => {
    // Checkpoint 18: `/api/research/synthesize` requires authentication through `getCurrentUserId()`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/research/synthesize` requires authentication through `getCurrentUserId()`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 ' + "`/api/research/synthesize` requires authentication through `getCurrentUserId()`");
    }


    // This test validates: `/api/research/synthesize` requires authentication through `getCurrentUserId()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: apiresearchsynthesize rate-limits with key research and RATE_LIMITSai', async ({ page }) => {
    // Checkpoint 19: `/api/research/synthesize` rate-limits with key `"research"` and `RATE_LIMITS.ai`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/research/synthesize` rate-limits with key `\"research\"` and `RATE_LIMITS.ai`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 ' + "`/api/research/synthesize` rate-limits with key `\"research\"` and `RATE_LIMITS.ai`");
    }


    // This test validates: `/api/research/synthesize` rate-limits with key `"research"` and `RATE_LIMITS.ai`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: apiresearchsynthesize returns HTTP 400 with Missing required field papers when p', async ({ page }) => {
    // Checkpoint 20: `/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 ' + "`/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array");
    }


    // This test validates: `/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: apiresearchsynthesize returns HTTP 503 with AI not configured when no model is a', async ({ page }) => {
    // Checkpoint 21: `/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 ' + "`/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available");
    }


    // This test validates: `/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: mode plan uses getSmallModel with temperature 03', async ({ page }) => {
    // Checkpoint 22: `mode === "plan"` uses `getSmallModel()` with temperature `0.3`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mode === \"plan\"` uses `getSmallModel()` with temperature `0.3`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 ' + "`mode === \"plan\"` uses `getSmallModel()` with temperature `0.3`");
    }


    // This test validates: `mode === "plan"` uses `getSmallModel()` with temperature `0.3`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: mode plan uses getModel with temperature 04', async ({ page }) => {
    // Checkpoint 23: `mode !== "plan"` uses `getModel()` with temperature `0.4`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`mode !== \"plan\"` uses `getModel()` with temperature `0.4`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 ' + "`mode !== \"plan\"` uses `getModel()` with temperature `0.4`");
    }


    // This test validates: `mode !== "plan"` uses `getModel()` with temperature `0.4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Plan-mode fenced JSON is stripped with jsonssS before parsing', async ({ page }) => {
    // Checkpoint 24: Plan-mode fenced JSON is stripped with `/```(?:json)?\\s*([\\s\\S]*?)```/` before parsing
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Plan-mode fenced JSON is stripped with `/```(?:json)?\\\\s*([\\\\s\\\\S]*?)```/` before parsing",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 ' + "Plan-mode fenced JSON is stripped with `/```(?:json)?\\\\s*([\\\\s\\\\S]*?)```/` before parsing");
    }


    // This test validates: Plan-mode fenced JSON is stripped with `/```(?:json)?\\s*([\\s\\S]*?)```/` before parsing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Invalid plan-mode JSON falls back to sections estimatedWordCount 0', async ({ page }) => {
    // Checkpoint 25: Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 ' + "Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`");
    }


    // This test validates: Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: buildSynthesisPrompt uses default word targets of 250 for quick_summary 800 for ', async ({ page }) => {
    // Checkpoint 26: `buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 ' + "`buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`");
    }


    // This test validates: `buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: buildSynthesisPrompt uses the fallback instruction Generate a literature synthes', async ({ page }) => {
    // Checkpoint 27: `buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === "custom"` and `customInstructions` is missing
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === \"custom\"` and `customInstructions` is missing",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 ' + "`buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === \"custom\"` and `customInstructions` is missing");
    }


    // This test validates: `buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === "custom"` and `customInstructions` is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: buildPaperContext truncates author display to the first 3 authors plus optional ', async ({ page }) => {
    // Checkpoint 28: `buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 ' + "`buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`");
    }


    // This test validates: `buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: buildPaperContext substitutes Unknown NA and No abstract available fallback stri', async ({ page }) => {
    // Checkpoint 29: `buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing
    // Section: Quick Test Workflows > AI Synthesis Panel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing",
      section: "Quick Test Workflows",
      subsection: "AI Synthesis Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 ' + "`buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing");
    }


    // This test validates: `buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: saveSearchQuery stores queryType as user by default when the caller does not pro', async ({ page }) => {
    // Checkpoint 30: `saveSearchQuery()` stores `queryType` as `"user"` by default when the caller does not provide one
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`saveSearchQuery()` stores `queryType` as `\"user\"` by default when the caller does not provide one",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 ' + "`saveSearchQuery()` stores `queryType` as `\"user\"` by default when the caller does not provide one");
    }


    // This test validates: `saveSearchQuery()` stores `queryType` as `"user"` by default when the caller does not provide one
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: saveSearchQuery stores source as all by default when the caller does not provide', async ({ page }) => {
    // Checkpoint 31: `saveSearchQuery()` stores `source` as `"all"` by default when the caller does not provide one
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`saveSearchQuery()` stores `source` as `\"all\"` by default when the caller does not provide one",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 ' + "`saveSearchQuery()` stores `source` as `\"all\"` by default when the caller does not provide one");
    }


    // This test validates: `saveSearchQuery()` stores `source` as `"all"` by default when the caller does not provide one
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: saveSearchQuery stores augmentedQueries filtersApplied and parentQueryId as null', async ({ page }) => {
    // Checkpoint 32: `saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 ' + "`saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them");
    }


    // This test validates: `saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: getRecentSearches first selects up to 20 history rows then de-duplicates on lowe', async ({ page }) => {
    // Checkpoint 33: `getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 ' + "`getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries");
    }


    // This test validates: `getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: getRecentSearches returns rows shaped as query resultCount searchedAt', async ({ page }) => {
    // Checkpoint 34: `getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 ' + "`getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`");
    }


    // This test validates: `getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`
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
