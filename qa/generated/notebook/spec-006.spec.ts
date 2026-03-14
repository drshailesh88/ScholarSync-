/**
 * Auto-generated Playwright test for notebook/spec-006
 * Source: e2e/specs/notebook/spec-006.md
 * Generated: 2026-03-14T10:50:47.829Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-006
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-006', () => {
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

  test('cp-000: 2-second confirmation shows green check for 2 seconds after copy', async ({ page }) => {
    // Checkpoint 0: 2-second confirmation — shows green check for 2 seconds after copy
    // Section: Message Actions (Copy & Feedback) > Copy Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "2-second confirmation — shows green check for 2 seconds after copy",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Copy Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "2-second confirmation — shows green check for 2 seconds after copy");
    }


    // This test validates: 2-second confirmation — shows green check for 2 seconds after copy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Tooltip Copy response', async ({ page }) => {
    // Checkpoint 1: Tooltip — "Copy response"
    // Section: Message Actions (Copy & Feedback) > Copy Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Tooltip — \"Copy response\"",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Copy Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Tooltip — \"Copy response\"");
    }


    // This test validates: Tooltip — "Copy response"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Aria label Copy response to clipboard', async ({ page }) => {
    // Checkpoint 2: Aria label — "Copy response to clipboard"
    // Section: Message Actions (Copy & Feedback) > Copy Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Aria label — \"Copy response to clipboard\"",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Copy Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Aria label — \"Copy response to clipboard\"");
    }


    // This test validates: Aria label — "Copy response to clipboard"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Toggle behavior click to activate click again to deactivate', async ({ page }) => {
    // Checkpoint 3: Toggle behavior — click to activate, click again to deactivate
    // Section: Message Actions (Copy & Feedback) > Thumbs Up Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Toggle behavior — click to activate, click again to deactivate",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Up Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Toggle behavior — click to activate, click again to deactivate");
    }


    // This test validates: Toggle behavior — click to activate, click again to deactivate
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Active state green-500 text green-50010 background filled icon', async ({ page }) => {
    // Checkpoint 4: Active state — green-500 text, green-500/10 background, filled icon
    // Section: Message Actions (Copy & Feedback) > Thumbs Up Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Active state — green-500 text, green-500/10 background, filled icon",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Up Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Active state — green-500 text, green-500/10 background, filled icon");
    }


    // This test validates: Active state — green-500 text, green-500/10 background, filled icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Inactive state ink-muted text hover shows ink color surface-raised background', async ({ page }) => {
    // Checkpoint 5: Inactive state — ink-muted text, hover shows ink color + surface-raised background
    // Section: Message Actions (Copy & Feedback) > Thumbs Up Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Inactive state — ink-muted text, hover shows ink color + surface-raised background",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Up Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Inactive state — ink-muted text, hover shows ink color + surface-raised background");
    }


    // This test validates: Inactive state — ink-muted text, hover shows ink color + surface-raised background
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Persists to DB calls submitMessageFeedback with rating 1', async ({ page }) => {
    // Checkpoint 6: Persists to DB — calls `submitMessageFeedback()` with rating `1`
    // Section: Message Actions (Copy & Feedback) > Thumbs Up Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Persists to DB — calls `submitMessageFeedback()` with rating `1`",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Up Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Persists to DB — calls `submitMessageFeedback()` with rating `1`");
    }


    // This test validates: Persists to DB — calls `submitMessageFeedback()` with rating `1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Tooltip Helpful response', async ({ page }) => {
    // Checkpoint 7: Tooltip — "Helpful response"
    // Section: Message Actions (Copy & Feedback) > Thumbs Up Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Tooltip — \"Helpful response\"",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Up Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Tooltip — \"Helpful response\"");
    }


    // This test validates: Tooltip — "Helpful response"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Toggle behavior click to activate click again to deactivate', async ({ page }) => {
    // Checkpoint 8: Toggle behavior — click to activate, click again to deactivate
    // Section: Message Actions (Copy & Feedback) > Thumbs Down Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Toggle behavior — click to activate, click again to deactivate",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Down Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Toggle behavior — click to activate, click again to deactivate");
    }


    // This test validates: Toggle behavior — click to activate, click again to deactivate
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Active state red-400 text red-50010 background filled icon', async ({ page }) => {
    // Checkpoint 9: Active state — red-400 text, red-500/10 background, filled icon
    // Section: Message Actions (Copy & Feedback) > Thumbs Down Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Active state — red-400 text, red-500/10 background, filled icon",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Down Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Active state — red-400 text, red-500/10 background, filled icon");
    }


    // This test validates: Active state — red-400 text, red-500/10 background, filled icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Inactive state ink-muted text hover shows ink color surface-raised background', async ({ page }) => {
    // Checkpoint 10: Inactive state — ink-muted text, hover shows ink color + surface-raised background
    // Section: Message Actions (Copy & Feedback) > Thumbs Down Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Inactive state — ink-muted text, hover shows ink color + surface-raised background",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Down Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Inactive state — ink-muted text, hover shows ink color + surface-raised background");
    }


    // This test validates: Inactive state — ink-muted text, hover shows ink color + surface-raised background
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Persists to DB calls submitMessageFeedback with rating -1', async ({ page }) => {
    // Checkpoint 11: Persists to DB — calls `submitMessageFeedback()` with rating `-1`
    // Section: Message Actions (Copy & Feedback) > Thumbs Down Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Persists to DB — calls `submitMessageFeedback()` with rating `-1`",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Down Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "Persists to DB — calls `submitMessageFeedback()` with rating `-1`");
    }


    // This test validates: Persists to DB — calls `submitMessageFeedback()` with rating `-1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Tooltip Unhelpful response', async ({ page }) => {
    // Checkpoint 12: Tooltip — "Unhelpful response"
    // Section: Message Actions (Copy & Feedback) > Thumbs Down Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Tooltip — \"Unhelpful response\"",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Thumbs Down Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Tooltip — \"Unhelpful response\"");
    }


    // This test validates: Tooltip — "Unhelpful response"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Selecting thumbs up while thumbs down is active clears thumbs down', async ({ page }) => {
    // Checkpoint 13: Selecting thumbs up while thumbs down is active → clears thumbs down
    // Section: Message Actions (Copy & Feedback) > Mutual Exclusion

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Selecting thumbs up while thumbs down is active → clears thumbs down",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Selecting thumbs up while thumbs down is active → clears thumbs down");
    }


    // This test validates: Selecting thumbs up while thumbs down is active → clears thumbs down
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Selecting thumbs down while thumbs up is active clears thumbs up', async ({ page }) => {
    // Checkpoint 14: Selecting thumbs down while thumbs up is active → clears thumbs up
    // Section: Message Actions (Copy & Feedback) > Mutual Exclusion

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Selecting thumbs down while thumbs up is active → clears thumbs up",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Selecting thumbs down while thumbs up is active → clears thumbs up");
    }


    // This test validates: Selecting thumbs down while thumbs up is active → clears thumbs up
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Clicking the same thumb again clears the rating sends null', async ({ page }) => {
    // Checkpoint 15: Clicking the same thumb again → clears the rating (sends `null`)
    // Section: Message Actions (Copy & Feedback) > Mutual Exclusion

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Clicking the same thumb again → clears the rating (sends `null`)",
      section: "Message Actions (Copy & Feedback)",
      subsection: "Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Clicking the same thumb again → clears the rating (sends `null`)");
    }


    // This test validates: Clicking the same thumb again → clears the rating (sends `null`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Visibility only on files with paperId status ready not yet extracted', async ({ page }) => {
    // Checkpoint 16: Visibility — only on files with `paperId`, `status === "ready"`, not yet extracted
    // Section: PICO / Fact Extraction > Extract Facts Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Visibility — only on files with `paperId`, `status === \"ready\"`, not yet extracted",
      section: "PICO / Fact Extraction",
      subsection: "Extract Facts Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Visibility — only on files with `paperId`, `status === \"ready\"`, not yet extracted");
    }


    // This test validates: Visibility — only on files with `paperId`, `status === "ready"`, not yet extracted
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Icon Table icon visible on file entry hover opacity-0 opacity-100', async ({ page }) => {
    // Checkpoint 17: Icon — Table icon, visible on file entry hover (opacity-0 → opacity-100)
    // Section: PICO / Fact Extraction > Extract Facts Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Icon — Table icon, visible on file entry hover (opacity-0 → opacity-100)",
      section: "PICO / Fact Extraction",
      subsection: "Extract Facts Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Icon — Table icon, visible on file entry hover (opacity-0 → opacity-100)");
    }


    // This test validates: Icon — Table icon, visible on file entry hover (opacity-0 → opacity-100)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Tooltip Extract PICO data', async ({ page }) => {
    // Checkpoint 18: Tooltip — "Extract PICO data"
    // Section: PICO / Fact Extraction > Extract Facts Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Tooltip — \"Extract PICO data\"",
      section: "PICO / Fact Extraction",
      subsection: "Extract Facts Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Tooltip — \"Extract PICO data\"");
    }


    // This test validates: Tooltip — "Extract PICO data"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Loading state CircleNotch spinning icon while extracting', async ({ page }) => {
    // Checkpoint 19: Loading state — CircleNotch spinning icon while extracting
    // Section: PICO / Fact Extraction > Extract Facts Button

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Loading state — CircleNotch spinning icon while extracting",
      section: "PICO / Fact Extraction",
      subsection: "Extract Facts Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Loading state — CircleNotch spinning icon while extracting");
    }


    // This test validates: Loading state — CircleNotch spinning icon while extracting
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Green checkmark CheckCircle icon replaces extract button', async ({ page }) => {
    // Checkpoint 20: Green checkmark — CheckCircle icon replaces extract button
    // Section: PICO / Fact Extraction > Extracted State

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Green checkmark — CheckCircle icon replaces extract button",
      section: "PICO / Fact Extraction",
      subsection: "Extracted State",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Green checkmark — CheckCircle icon replaces extract button");
    }


    // This test validates: Green checkmark — CheckCircle icon replaces extract button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Click to expand toggles inline extraction card below file entry', async ({ page }) => {
    // Checkpoint 21: Click to expand — toggles inline extraction card below file entry
    // Section: PICO / Fact Extraction > Extracted State

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Click to expand — toggles inline extraction card below file entry",
      section: "PICO / Fact Extraction",
      subsection: "Extracted State",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Click to expand — toggles inline extraction card below file entry");
    }


    // This test validates: Click to expand — toggles inline extraction card below file entry
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Toggle behavior click again to collapse', async ({ page }) => {
    // Checkpoint 22: Toggle behavior — click again to collapse
    // Section: PICO / Fact Extraction > Extracted State

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Toggle behavior — click again to collapse",
      section: "PICO / Fact Extraction",
      subsection: "Extracted State",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Toggle behavior — click again to collapse");
    }


    // This test validates: Toggle behavior — click again to collapse
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Header Table icon brand Structured Extraction title', async ({ page }) => {
    // Checkpoint 23: Header — Table icon (brand) + "Structured Extraction" title
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Header — Table icon (brand) + \"Structured Extraction\" title",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Header — Table icon (brand) + \"Structured Extraction\" title");
    }


    // This test validates: Header — Table icon (brand) + "Structured Extraction" title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Verification badge Verified green ShieldCheck or Verify button', async ({ page }) => {
    // Checkpoint 24: Verification badge — "Verified" (green, ShieldCheck) or "Verify" button
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Verification badge — \"Verified\" (green, ShieldCheck) or \"Verify\" button",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Verification badge — \"Verified\" (green, ShieldCheck) or \"Verify\" button");
    }


    // This test validates: Verification badge — "Verified" (green, ShieldCheck) or "Verify" button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Grid layout 2-column grid label brand text value', async ({ page }) => {
    // Checkpoint 25: Grid layout — 2-column grid: label (brand text) + value
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Grid layout — 2-column grid: label (brand text) + value",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Grid layout — 2-column grid: label (brand text) + value");
    }


    // This test validates: Grid layout — 2-column grid: label (brand text) + value
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: PICO fields displayed if non-null', async ({ page }) => {
    // Checkpoint 26: **PICO fields displayed** (if non-null):
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "**PICO fields displayed** (if non-null):",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "**PICO fields displayed** (if non-null):");
    }


    // This test validates: **PICO fields displayed** (if non-null):
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Key Findings separate section with border-t from custom_extractionskey_findings', async ({ page }) => {
    // Checkpoint 27: Key Findings — separate section with border-t (from `custom_extractions.key_findings`)
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Key Findings — separate section with border-t (from `custom_extractions.key_findings`)",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Key Findings — separate section with border-t (from `custom_extractions.key_findings`)");
    }


    // This test validates: Key Findings — separate section with border-t (from `custom_extractions.key_findings`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Limitations separate section with border-t from custom_extractionslimitations', async ({ page }) => {
    // Checkpoint 28: Limitations — separate section with border-t (from `custom_extractions.limitations`)
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Limitations — separate section with border-t (from `custom_extractions.limitations`)",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Limitations — separate section with border-t (from `custom_extractions.limitations`)");
    }


    // This test validates: Limitations — separate section with border-t (from `custom_extractions.limitations`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Empty state No structured data could be extracted if no fields have values', async ({ page }) => {
    // Checkpoint 29: Empty state — "No structured data could be extracted." if no fields have values
    // Section: PICO / Fact Extraction > Extraction Card

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Empty state — \"No structured data could be extracted.\" if no fields have values",
      section: "PICO / Fact Extraction",
      subsection: "Extraction Card",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Empty state — \"No structured data could be extracted.\" if no fields have values");
    }


    // This test validates: Empty state — "No structured data could be extracted." if no fields have values
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Verify button CheckCircle icon Verify text', async ({ page }) => {
    // Checkpoint 30: Verify button — CheckCircle icon + "Verify" text
    // Section: PICO / Fact Extraction > Verify Extraction

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Verify button — CheckCircle icon + \"Verify\" text",
      section: "PICO / Fact Extraction",
      subsection: "Verify Extraction",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Verify button — CheckCircle icon + \"Verify\" text");
    }


    // This test validates: Verify button — CheckCircle icon + "Verify" text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Calls verifyExtraction server action', async ({ page }) => {
    // Checkpoint 31: Calls `verifyExtraction()` server action
    // Section: PICO / Fact Extraction > Verify Extraction

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Calls `verifyExtraction()` server action",
      section: "PICO / Fact Extraction",
      subsection: "Verify Extraction",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "Calls `verifyExtraction()` server action");
    }


    // This test validates: Calls `verifyExtraction()` server action
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: On success updates extraction to show Verified badge ShieldCheck green', async ({ page }) => {
    // Checkpoint 32: On success: updates extraction to show "Verified" badge (ShieldCheck, green)
    // Section: PICO / Fact Extraction > Verify Extraction

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "On success: updates extraction to show \"Verified\" badge (ShieldCheck, green)",
      section: "PICO / Fact Extraction",
      subsection: "Verify Extraction",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "On success: updates extraction to show \"Verified\" badge (ShieldCheck, green)");
    }


    // This test validates: On success: updates extraction to show "Verified" badge (ShieldCheck, green)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Updates local state immediately optimistic', async ({ page }) => {
    // Checkpoint 33: Updates local state immediately (optimistic)
    // Section: PICO / Fact Extraction > Verify Extraction

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Updates local state immediately (optimistic)",
      section: "PICO / Fact Extraction",
      subsection: "Verify Extraction",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Updates local state immediately (optimistic)");
    }


    // This test validates: Updates local state immediately (optimistic)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: View Source Notes button Notebook icon text in chat header toolbar', async ({ page }) => {
    // Checkpoint 34: "View Source Notes" button — Notebook icon + text, in chat header toolbar
    // Section: Source Notes Panel > Opening

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "\"View Source Notes\" button — Notebook icon + text, in chat header toolbar",
      section: "Source Notes Panel",
      subsection: "Opening",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "\"View Source Notes\" button — Notebook icon + text, in chat header toolbar");
    }


    // This test validates: "View Source Notes" button — Notebook icon + text, in chat header toolbar
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
