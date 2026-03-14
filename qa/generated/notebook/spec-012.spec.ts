/**
 * Auto-generated Playwright test for notebook/spec-012
 * Source: e2e/specs/notebook/spec-012.md
 * Generated: 2026-03-14T10:50:51.934Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-012', () => {
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

  test('cp-000: Share button aria-labelShare notebook', async ({ page }) => {
    // Checkpoint 0: Share button — `aria-label="Share notebook"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share button — `aria-label=\"Share notebook\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "Share button — `aria-label=\"Share notebook\"`");
    }


    // This test validates: Share button — `aria-label="Share notebook"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Close buttons aria-labelClose source notes and aria-labelClose share dialog are ', async ({ page }) => {
    // Checkpoint 1: Close buttons — `aria-label="Close source notes"` and `aria-label="Close share dialog"` are present; the audio overview close control uses only `title="Close audio overview"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Close buttons — `aria-label=\"Close source notes\"` and `aria-label=\"Close share dialog\"` are present; the audio overview close control uses only `title=\"Close audio overview\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Close buttons — `aria-label=\"Close source notes\"` and `aria-label=\"Close share dialog\"` are present; the audio overview close control uses only `title=\"Close audio overview\"`");
    }


    // This test validates: Close buttons — `aria-label="Close source notes"` and `aria-label="Close share dialog"` are present; the audio overview close control uses only `title="Close audio overview"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Remove file aria-labelRemove filename', async ({ page }) => {
    // Checkpoint 2: Remove file — `aria-label="Remove {filename}"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Remove file — `aria-label=\"Remove {filename}\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Remove file — `aria-label=\"Remove {filename}\"`");
    }


    // This test validates: Remove file — `aria-label="Remove {filename}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Extract PICO aria-labelExtract PICO data from filename', async ({ page }) => {
    // Checkpoint 3: Extract PICO — `aria-label="Extract PICO data from {filename}"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Extract PICO — `aria-label=\"Extract PICO data from {filename}\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Extract PICO — `aria-label=\"Extract PICO data from {filename}\"`");
    }


    // This test validates: Extract PICO — `aria-label="Extract PICO data from {filename}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: View extraction aria-labelView extraction for filename', async ({ page }) => {
    // Checkpoint 4: View extraction — `aria-label="View extraction for {filename}"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "View extraction — `aria-label=\"View extraction for {filename}\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "View extraction — `aria-label=\"View extraction for {filename}\"`");
    }


    // This test validates: View extraction — `aria-label="View extraction for {filename}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Retry embed aria-labelRetry embedding for filename', async ({ page }) => {
    // Checkpoint 5: Retry embed — `aria-label="Retry embedding for {filename}"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Retry embed — `aria-label=\"Retry embedding for {filename}\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Retry embed — `aria-label=\"Retry embedding for {filename}\"`");
    }


    // This test validates: Retry embed — `aria-label="Retry embedding for {filename}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Copy response aria-labelCopy response to clipboard', async ({ page }) => {
    // Checkpoint 6: Copy response — `aria-label="Copy response to clipboard"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Copy response — `aria-label=\"Copy response to clipboard\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Copy response — `aria-label=\"Copy response to clipboard\"`");
    }


    // This test validates: Copy response — `aria-label="Copy response to clipboard"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Feedback aria-labelMark response as helpful Mark response as unhelpful', async ({ page }) => {
    // Checkpoint 7: Feedback — `aria-label="Mark response as helpful"` / `"Mark response as unhelpful"`
    // Section: Accessibility

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Feedback — `aria-label=\"Mark response as helpful\"` / `\"Mark response as unhelpful\"`",
      section: "Accessibility",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Feedback — `aria-label=\"Mark response as helpful\"` / `\"Mark response as unhelpful\"`");
    }


    // This test validates: Feedback — `aria-label="Mark response as helpful"` / `"Mark response as unhelpful"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: notebook has a dedicated route-level loading skeleton with a w-72 sidebar placeh', async ({ page }) => {
    // Checkpoint 8: `/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder
    // Section: Quick Test Workflows > Route-Level Loading and Error States

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading and Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "`/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder");
    }


    // This test validates: `/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Notebook loading skeleton does not render the real upload button history list or', async ({ page }) => {
    // Checkpoint 9: Notebook loading skeleton does not render the real upload button, history list, or chat input while loading
    // Section: Quick Test Workflows > Route-Level Loading and Error States

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook loading skeleton does not render the real upload button, history list, or chat input while loading",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading and Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Notebook loading skeleton does not render the real upload button, history list, or chat input while loading");
    }


    // This test validates: Notebook loading skeleton does not render the real upload button, history list, or chat input while loading
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: notebook route-level error display title is Notebook unavailable', async ({ page }) => {
    // Checkpoint 10: `/notebook` route-level error display title is `Notebook unavailable`
    // Section: Quick Test Workflows > Route-Level Loading and Error States

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/notebook` route-level error display title is `Notebook unavailable`",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading and Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "`/notebook` route-level error display title is `Notebook unavailable`");
    }


    // This test validates: `/notebook` route-level error display title is `Notebook unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: notebook route-level error display message is We couldnt load your notebook Plea', async ({ page }) => {
    // Checkpoint 11: `/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`
    // Section: Quick Test Workflows > Route-Level Loading and Error States

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading and Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "`/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`");
    }


    // This test validates: `/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Notebook route-level error screen relies on shared ErrorDisplay retry behavior r', async ({ page }) => {
    // Checkpoint 12: Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback
    // Section: Quick Test Workflows > Route-Level Loading and Error States

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading and Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback");
    }


    // This test validates: Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Notebook sources are hydrated from getUserPapers on first client mount before an', async ({ page }) => {
    // Checkpoint 13: Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen");
    }


    // This test validates: Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Library-backed source rows default to selected true', async ({ page }) => {
    // Checkpoint 14: Library-backed source rows default to `selected: true`
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Library-backed source rows default to `selected: true`",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Library-backed source rows default to `selected: true`");
    }


    // This test validates: Library-backed source rows default to `selected: true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Library-backed source rows show size Library until replaced by upload or URL-spe', async ({ page }) => {
    // Checkpoint 15: Library-backed source rows show `size: "Library"` until replaced by upload or URL-specific metadata
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Library-backed source rows show `size: \"Library\"` until replaced by upload or URL-specific metadata",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Library-backed source rows show `size: \"Library\"` until replaced by upload or URL-specific metadata");
    }


    // This test validates: Library-backed source rows show `size: "Library"` until replaced by upload or URL-specific metadata
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Library-backed source rows set status ready immediately on mount', async ({ page }) => {
    // Checkpoint 16: Library-backed source rows set `status: "ready"` immediately on mount
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Library-backed source rows set `status: \"ready\"` immediately on mount",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Library-backed source rows set `status: \"ready\"` immediately on mount");
    }


    // This test validates: Library-backed source rows set `status: "ready"` immediately on mount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Library-backed source rows set isExtracted from paperis_extracted', async ({ page }) => {
    // Checkpoint 17: Library-backed source rows set `isExtracted` from `paper.is_extracted`
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Library-backed source rows set `isExtracted` from `paper.is_extracted`",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Library-backed source rows set `isExtracted` from `paper.is_extracted`");
    }


    // This test validates: Library-backed source rows set `isExtracted` from `paper.is_extracted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Library-backed source rows preserve source URLs via metadatasourceUrl when prese', async ({ page }) => {
    // Checkpoint 18: Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present");
    }


    // This test validates: Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Existing extraction records are fetched only for papers where is_extracted is tr', async ({ page }) => {
    // Checkpoint 19: Existing extraction records are fetched only for papers where `is_extracted` is true
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Existing extraction records are fetched only for papers where `is_extracted` is true",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Existing extraction records are fetched only for papers where `is_extracted` is true");
    }


    // This test validates: Existing extraction records are fetched only for papers where `is_extracted` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Failed initial paper hydration is swallowed silently in the UI', async ({ page }) => {
    // Checkpoint 20: Failed initial paper hydration is swallowed silently in the UI
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Failed initial paper hydration is swallowed silently in the UI",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Failed initial paper hydration is swallowed silently in the UI");
    }


    // This test validates: Failed initial paper hydration is swallowed silently in the UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Past conversations are loaded with getConversationsnotebook and trimmed to 20 it', async ({ page }) => {
    // Checkpoint 21: Past conversations are loaded with `getConversations("notebook")` and trimmed to 20 items
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Past conversations are loaded with `getConversations(\"notebook\")` and trimmed to 20 items",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Past conversations are loaded with `getConversations(\"notebook\")` and trimmed to 20 items");
    }


    // This test validates: Past conversations are loaded with `getConversations("notebook")` and trimmed to 20 items
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Conversation summary rows persist mode and updatedAt in state even though only t', async ({ page }) => {
    // Checkpoint 22: Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list
    // Section: Quick Test Workflows > Initial Library and Conversation Hydration

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list",
      section: "Quick Test Workflows",
      subsection: "Initial Library and Conversation Hydration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list");
    }


    // This test validates: Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Sidebar title is Notebook Sources', async ({ page }) => {
    // Checkpoint 23: Sidebar title is `Notebook Sources`
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Sidebar title is `Notebook Sources`",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Sidebar title is `Notebook Sources`");
    }


    // This test validates: Sidebar title is `Notebook Sources`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Sidebar paper-count pill always shows the total fileslength including unselected', async ({ page }) => {
    // Checkpoint 24: Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources");
    }


    // This test validates: Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Back arrow is a link to dashboard not a button with imperative navigation', async ({ page }) => {
    // Checkpoint 25: Back arrow is a link to `/dashboard`, not a button with imperative navigation
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Back arrow is a link to `/dashboard`, not a button with imperative navigation",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Back arrow is a link to `/dashboard`, not a button with imperative navigation");
    }


    // This test validates: Back arrow is a link to `/dashboard`, not a button with imperative navigation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Notebook mode defaults to research on first render', async ({ page }) => {
    // Checkpoint 26: Notebook mode defaults to `research` on first render
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook mode defaults to `research` on first render",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Notebook mode defaults to `research` on first render");
    }


    // This test validates: Notebook mode defaults to `research` on first render
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Mode toggle container has roletablist with aria-labelNotebook mode', async ({ page }) => {
    // Checkpoint 27: Mode toggle container has `role="tablist"` with `aria-label="Notebook mode"`
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Mode toggle container has `role=\"tablist\"` with `aria-label=\"Notebook mode\"`",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Mode toggle container has `role=\"tablist\"` with `aria-label=\"Notebook mode\"`");
    }


    // This test validates: Mode toggle container has `role="tablist"` with `aria-label="Notebook mode"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Each mode button uses roletab and toggles only aria-selected not tabIndex', async ({ page }) => {
    // Checkpoint 28: Each mode button uses `role="tab"` and toggles only `aria-selected`, not `tabIndex`
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Each mode button uses `role=\"tab\"` and toggles only `aria-selected`, not `tabIndex`",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Each mode button uses `role=\"tab\"` and toggles only `aria-selected`, not `tabIndex`");
    }


    // This test validates: Each mode button uses `role="tab"` and toggles only `aria-selected`, not `tabIndex`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Learn mode uses the same brand-colored active background as Research mode in the', async ({ page }) => {
    // Checkpoint 29: Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle");
    }


    // This test validates: Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Switching notebook mode does not clear existing messages or reset the current co', async ({ page }) => {
    // Checkpoint 30: Switching notebook mode does not clear existing messages or reset the current conversation by itself
    // Section: Quick Test Workflows > Sidebar Header and Mode Switch Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Switching notebook mode does not clear existing messages or reset the current conversation by itself",
      section: "Quick Test Workflows",
      subsection: "Sidebar Header and Mode Switch Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Switching notebook mode does not clear existing messages or reset the current conversation by itself");
    }


    // This test validates: Switching notebook mode does not clear existing messages or reset the current conversation by itself
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: History button label is Past conversations', async ({ page }) => {
    // Checkpoint 31: History button label is `Past conversations`
    // Section: Quick Test Workflows > Conversation History Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "History button label is `Past conversations`",
      section: "Quick Test Workflows",
      subsection: "Conversation History Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "History button label is `Past conversations`");
    }


    // This test validates: History button label is `Past conversations`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: History toggle is a full-width button with the caret pushed to the far right by ', async ({ page }) => {
    // Checkpoint 32: History toggle is a full-width button with the caret pushed to the far right by `ml-auto`
    // Section: Quick Test Workflows > Conversation History Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "History toggle is a full-width button with the caret pushed to the far right by `ml-auto`",
      section: "Quick Test Workflows",
      subsection: "Conversation History Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "History toggle is a full-width button with the caret pushed to the far right by `ml-auto`");
    }


    // This test validates: History toggle is a full-width button with the caret pushed to the far right by `ml-auto`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: History dropdown max height is max-h-32', async ({ page }) => {
    // Checkpoint 33: History dropdown max height is `max-h-32`
    // Section: Quick Test Workflows > Conversation History Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "History dropdown max height is `max-h-32`",
      section: "Quick Test Workflows",
      subsection: "Conversation History Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "History dropdown max height is `max-h-32`");
    }


    // This test validates: History dropdown max height is `max-h-32`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: New conversation action appears as the first row inside the expanded history lis', async ({ page }) => {
    // Checkpoint 34: New conversation action appears as the first row inside the expanded history list
    // Section: Quick Test Workflows > Conversation History Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "New conversation action appears as the first row inside the expanded history list",
      section: "Quick Test Workflows",
      subsection: "Conversation History Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "New conversation action appears as the first row inside the expanded history list");
    }


    // This test validates: New conversation action appears as the first row inside the expanded history list
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
