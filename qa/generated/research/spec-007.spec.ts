/**
 * Auto-generated Playwright test for research/spec-007
 * Source: e2e/specs/research/spec-007.md
 * Generated: 2026-03-14T07:45:59.497Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-007
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-007', () => {
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

  test('cp-000: AI synthesis panel auto-renders after a successful search with at least one resu', async ({ page }) => {
    // Checkpoint 0: AI synthesis panel auto-renders after a successful search with at least one result
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis panel auto-renders after a successful search with at least one result",
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
      throw new Error('Unhandled research checkpoint: cp-000 AI synthesis panel auto-renders after a successful search with at least one result');
    }


    // This test validates: AI synthesis panel auto-renders after a successful search with at least one result
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: AI synthesis panel heading reads Answer from top paperCount papers', async ({ page }) => {
    // Checkpoint 1: AI synthesis panel heading reads `Answer from top {paperCount} papers`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis panel heading reads `Answer from top {paperCount} papers`",
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
      throw new Error('Unhandled research checkpoint: cp-001 AI synthesis panel heading reads `Answer from top {paperCount} papers`');
    }


    // This test validates: AI synthesis panel heading reads `Answer from top {paperCount} papers`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: AI synthesis panel limits its citationreference map to the first 5 results', async ({ page }) => {
    // Checkpoint 2: AI synthesis panel limits its citation/reference map to the first 5 results
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis panel limits its citation/reference map to the first 5 results",
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
      throw new Error('Unhandled research checkpoint: cp-002 AI synthesis panel limits its citation/reference map to the first 5 results');
    }


    // This test validates: AI synthesis panel limits its citation/reference map to the first 5 results
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: AI synthesis request posts to apiresearchsynthesize with reportType quick_summar', async ({ page }) => {
    // Checkpoint 3: AI synthesis request posts to `/api/research/synthesize` with `reportType: "quick_summary"` and `mode: "generate"`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis request posts to `/api/research/synthesize` with `reportType: \"quick_summary\"` and `mode: \"generate\"`",
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
      throw new Error('Unhandled research checkpoint: cp-003 AI synthesis request posts to `/api/research/synthesize` with `reportType: "quick_summary"` and `mode: "generate"`');
    }


    // This test validates: AI synthesis request posts to `/api/research/synthesize` with `reportType: "quick_summary"` and `mode: "generate"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: AI synthesis reruns only when the queryresults fingerprint changes', async ({ page }) => {
    // Checkpoint 4: AI synthesis reruns only when the query/results fingerprint changes
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis reruns only when the query/results fingerprint changes",
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
      throw new Error('Unhandled research checkpoint: cp-004 AI synthesis reruns only when the query/results fingerprint changes');
    }


    // This test validates: AI synthesis reruns only when the query/results fingerprint changes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Starting a new synthesis resets synthesis failed and expanded before streaming b', async ({ page }) => {
    // Checkpoint 5: Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins",
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
      throw new Error('Unhandled research checkpoint: cp-005 Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins');
    }


    // This test validates: Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: AI synthesis panel returns null when synthesis failed or there is no text and no', async ({ page }) => {
    // Checkpoint 6: AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream",
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
      throw new Error('Unhandled research checkpoint: cp-006 AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream');
    }


    // This test validates: AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Initial synthesis state hydrates from initialSynthesis restored out of session s', async ({ page }) => {
    // Checkpoint 7: Initial synthesis state hydrates from `initialSynthesis` restored out of session storage
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Initial synthesis state hydrates from `initialSynthesis` restored out of session storage",
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
      throw new Error('Unhandled research checkpoint: cp-007 Initial synthesis state hydrates from `initialSynthesis` restored out of session storage');
    }


    // This test validates: Initial synthesis state hydrates from `initialSynthesis` restored out of session storage
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Streaming-without-text state shows four pulsing placeholder lines inside the syn', async ({ page }) => {
    // Checkpoint 8: Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card",
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
      throw new Error('Unhandled research checkpoint: cp-008 Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card');
    }


    // This test validates: Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Citation markers like 1 are transformed into clickable inline citation buttons', async ({ page }) => {
    // Checkpoint 9: Citation markers like `[1]` are transformed into clickable inline citation buttons
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Citation markers like `[1]` are transformed into clickable inline citation buttons",
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
      throw new Error('Unhandled research checkpoint: cp-009 Citation markers like `[1]` are transformed into clickable inline citation buttons');
    }


    // This test validates: Citation markers like `[1]` are transformed into clickable inline citation buttons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Clicking an inline synthesis citation scrolls to paper-result-index and adds a t', async ({ page }) => {
    // Checkpoint 10: Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds",
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
      throw new Error('Unhandled research checkpoint: cp-010 Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds');
    }


    // This test validates: Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Free-plan users get a gradient blur overlay plus Full AI analysis available on P', async ({ page }) => {
    // Checkpoint 11: Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`",
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
      throw new Error('Unhandled research checkpoint: cp-011 Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`');
    }


    // This test validates: Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Free-plan upgrade link points to settings', async ({ page }) => {
    // Checkpoint 12: Free-plan upgrade link points to `/settings`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan upgrade link points to `/settings`",
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
      throw new Error('Unhandled research checkpoint: cp-012 Free-plan upgrade link points to `/settings`');
    }


    // This test validates: Free-plan upgrade link points to `/settings`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Read More Show Less toggle is available only for non-free plans when the synthes', async ({ page }) => {
    // Checkpoint 13: `Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished",
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
      throw new Error('Unhandled research checkpoint: cp-013 `Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished');
    }


    // This test validates: `Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Route-level loadingtsx renders a title skeleton one large search-bar skeleton an', async ({ page }) => {
    // Checkpoint 14: Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders",
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
      throw new Error('Unhandled research checkpoint: cp-014 Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders');
    }


    // This test validates: Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Route-level error boundary title reads Research unavailable', async ({ page }) => {
    // Checkpoint 15: Route-level error boundary title reads `Research unavailable`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Route-level error boundary title reads `Research unavailable`",
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
      throw new Error('Unhandled research checkpoint: cp-015 Route-level error boundary title reads `Research unavailable`');
    }


    // This test validates: Route-level error boundary title reads `Research unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Route-level error boundary message reads We couldnt load the research page Pleas', async ({ page }) => {
    // Checkpoint 16: Route-level error boundary message reads `We couldn't load the research page. Please try again.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Route-level error boundary message reads `We couldn't load the research page. Please try again.`",
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
      throw new Error('Unhandled research checkpoint: cp-016 Route-level error boundary message reads `We couldn\'t load the research page. Please try again.`');
    }


    // This test validates: Route-level error boundary message reads `We couldn't load the research page. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: The live research route does not currently render the checkbox-driven results ta', async ({ page }) => {
    // Checkpoint 17: The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`');
    }


    // This test validates: The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: The live research route does not currently render per-row selection checkboxes o', async ({ page }) => {
    // Checkpoint 18: The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox');
    }


    // This test validates: The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: The live research route does not currently render the Build Evidence Table actio', async ({ page }) => {
    // Checkpoint 19: The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack');
    }


    // This test validates: The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: The live research route does not currently render the PaperDetailPanel flow desc', async ({ page }) => {
    // Checkpoint 20: The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document');
    }


    // This test validates: The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: The live research route does not currently render the VerificationBadge-based re', async ({ page }) => {
    // Checkpoint 21: The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`');
    }


    // This test validates: The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: The live research route does not currently render a separate Insert Citation act', async ({ page }) => {
    // Checkpoint 22: The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead');
    }


    // This test validates: The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: The live research route does not currently use a Load more results button it use', async ({ page }) => {
    // Checkpoint 23: The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls');
    }


    // This test validates: The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: The live research route does not currently expose the SearchInput ResearchPlan E', async ({ page }) => {
    // Checkpoint 24: The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack');
    }


    // This test validates: The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: The live search backend uses 45-second per-source timeouts in apisearchunified n', async ({ page }) => {
    // Checkpoint 25: The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc');
    }


    // This test validates: The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: The live search backend fans out to four sources including OpenAlex and Clinical', async ({ page }) => {
    // Checkpoint 26: The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar');
    }


    // This test validates: The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: apisearchunified rejects unauthenticated requests with Authentication required', async ({ page }) => {
    // Checkpoint 27: `/api/search/unified` rejects unauthenticated requests with `Authentication required`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` rejects unauthenticated requests with `Authentication required`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 `/api/search/unified` rejects unauthenticated requests with `Authentication required`');
    }


    // This test validates: `/api/search/unified` rejects unauthenticated requests with `Authentication required`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: apisearchunified applies checkRateLimituserId search RATE_LIMITSsearch before pa', async ({ page }) => {
    // Checkpoint 28: `/api/search/unified` applies `checkRateLimit(userId, "search", RATE_LIMITS.search)` before parsing query params
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` applies `checkRateLimit(userId, \"search\", RATE_LIMITS.search)` before parsing query params",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 `/api/search/unified` applies `checkRateLimit(userId, "search", RATE_LIMITS.search)` before parsing query params');
    }


    // This test validates: `/api/search/unified` applies `checkRateLimit(userId, "search", RATE_LIMITS.search)` before parsing query params
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: apisearchunified returns HTTP 400 with Query parameter q is required when q is m', async ({ page }) => {
    // Checkpoint 29: `/api/search/unified` returns HTTP 400 with `Query parameter 'q' is required` when `q` is missing
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` returns HTTP 400 with `Query parameter 'q' is required` when `q` is missing",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 `/api/search/unified` returns HTTP 400 with `Query parameter \'q\' is required` when `q` is missing');
    }


    // This test validates: `/api/search/unified` returns HTTP 400 with `Query parameter 'q' is required` when `q` is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: apisearchunified returns HTTP 400 with Query parameter q must not exceed 500 cha', async ({ page }) => {
    // Checkpoint 30: `/api/search/unified` returns HTTP 400 with `Query parameter 'q' must not exceed 500 characters` when `q.length > 500`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` returns HTTP 400 with `Query parameter 'q' must not exceed 500 characters` when `q.length > 500`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 `/api/search/unified` returns HTTP 400 with `Query parameter \'q\' must not exceed 500 characters` when `q.length > 500`');
    }


    // This test validates: `/api/search/unified` returns HTTP 400 with `Query parameter 'q' must not exceed 500 characters` when `q.length > 500`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: apisearchunified defaults page to 0 when the query param is absent', async ({ page }) => {
    // Checkpoint 31: `/api/search/unified` defaults `page` to `0` when the query param is absent
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` defaults `page` to `0` when the query param is absent",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 `/api/search/unified` defaults `page` to `0` when the query param is absent');
    }


    // This test validates: `/api/search/unified` defaults `page` to `0` when the query param is absent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: apisearchunified defaults perPage to 20 when the query param is absent', async ({ page }) => {
    // Checkpoint 32: `/api/search/unified` defaults `perPage` to `20` when the query param is absent
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` defaults `perPage` to `20` when the query param is absent",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 `/api/search/unified` defaults `perPage` to `20` when the query param is absent');
    }


    // This test validates: `/api/search/unified` defaults `perPage` to `20` when the query param is absent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: apisearchunified caps perPage at 100 even if a larger value is requested', async ({ page }) => {
    // Checkpoint 33: `/api/search/unified` caps `perPage` at `100` even if a larger value is requested
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` caps `perPage` at `100` even if a larger value is requested",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 `/api/search/unified` caps `perPage` at `100` even if a larger value is requested');
    }


    // This test validates: `/api/search/unified` caps `perPage` at `100` even if a larger value is requested
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: apisearchunified defaults sort to relevance when the query param is absent', async ({ page }) => {
    // Checkpoint 34: `/api/search/unified` defaults `sort` to `relevance` when the query param is absent
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` defaults `sort` to `relevance` when the query param is absent",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 `/api/search/unified` defaults `sort` to `relevance` when the query param is absent');
    }


    // This test validates: `/api/search/unified` defaults `sort` to `relevance` when the query param is absent
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
