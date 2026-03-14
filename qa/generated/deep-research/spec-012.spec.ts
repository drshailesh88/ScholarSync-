/**
 * Auto-generated Playwright test for deep-research/spec-012
 * Source: e2e/specs/deep-research/spec-012.md
 * Generated: 2026-03-14T14:25:37.768Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts deep-research spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';











import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';








test.describe('deep-research / spec-012', () => {
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

  test('cp-000: BibTeX keys are derived from the first segment of the first author name then yea', async ({ page }) => {
    // Checkpoint 0: BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.
    // Section: Quick Test Workflows > Export, Copy, and Open in Studio

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.",
      section: "Quick Test Workflows",
      subsection: "Export, Copy, and Open in Studio",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-000 BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.');
    }


    // This test validates: BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: RIS export writes AN - PMIDpmid when a PubMed ID exists', async ({ page }) => {
    // Checkpoint 1: RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.
    // Section: Quick Test Workflows > Export, Copy, and Open in Studio

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.",
      section: "Quick Test Workflows",
      subsection: "Export, Copy, and Open in Studio",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-001 RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.');
    }


    // This test validates: RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: SaveToLibraryButton initializes state idle and errorMessage', async ({ page }) => {
    // Checkpoint 2: `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`SaveToLibraryButton` initializes `state = \"idle\"` and `errorMessage = \"\"`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-002 `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.');
    }


    // This test validates: `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: SaveToLibraryButton defaults isLoggedIn true the page never passes a different v', async ({ page }) => {
    // Checkpoint 3: `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-003 `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.');
    }


    // This test validates: `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Save-to-library clicks are ignored when isComplete or isLoggedIn', async ({ page }) => {
    // Checkpoint 4: Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-004 Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.');
    }


    // This test validates: Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Save-to-library posts POST apideep-researchsave with topic mode markdownReport s', async ({ page }) => {
    // Checkpoint 5: Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-005 Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.');
    }


    // This test validates: Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Save-to-library success sets state saved and leaves the button disabled thereaft', async ({ page }) => {
    // Checkpoint 6: Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Save-to-library success sets `state = \"saved\"` and leaves the button disabled thereafter.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-006 Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.');
    }


    // This test validates: Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Save-to-library failure sets state error and sets errorMessage to errmessage or ', async ({ page }) => {
    // Checkpoint 7: Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Save-to-library failure sets `state = \"error\"` and sets `errorMessage` to `err.message` or `Failed to save`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-007 Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.');
    }


    // This test validates: Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: The error-state save button label is exactly Retry', async ({ page }) => {
    // Checkpoint 8: The error-state save button label is exactly `Retry`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The error-state save button label is exactly `Retry`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-008 The error-state save button label is exactly `Retry`.');
    }


    // This test validates: The error-state save button label is exactly `Retry`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: The saved-state save button label is exactly Saved', async ({ page }) => {
    // Checkpoint 9: The saved-state save button label is exactly `Saved`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The saved-state save button label is exactly `Saved`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-009 The saved-state save button label is exactly `Saved`.');
    }


    // This test validates: The saved-state save button label is exactly `Saved`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: The save button tooltip text is one of Sign in to save Research must be complete', async ({ page }) => {
    // Checkpoint 10: The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-010 The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.');
    }


    // This test validates: The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Save-to-library error tooltips do not auto-clear clicking the button again retri', async ({ page }) => {
    // Checkpoint 11: Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-011 Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.');
    }


    // This test validates: Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: PastResearchSessions fetches GET apideep-researchsessions on mount inside a useE', async ({ page }) => {
    // Checkpoint 12: `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-012 `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.');
    }


    // This test validates: `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: The past-research loading message is exactly Loading past research', async ({ page }) => {
    // Checkpoint 13: The past-research loading message is exactly `Loading past research...`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The past-research loading message is exactly `Loading past research...`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-013 The past-research loading message is exactly `Loading past research...`.');
    }


    // This test validates: The past-research loading message is exactly `Loading past research...`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: A non-401 past-research fetch failure stores the exact error string Could not lo', async ({ page }) => {
    // Checkpoint 14: A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-014 A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.');
    }


    // This test validates: A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: A 401 past-research response does not set an error and simply hides the section', async ({ page }) => {
    // Checkpoint 15: A `401` past-research response does not set an error and simply hides the section.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "A `401` past-research response does not set an error and simply hides the section.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-015 A `401` past-research response does not set an error and simply hides the section.');
    }


    // This test validates: A `401` past-research response does not set an error and simply hides the section.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: The visible section title is exactly Past Research', async ({ page }) => {
    // Checkpoint 16: The visible section title is exactly `Past Research`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The visible section title is exactly `Past Research`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-016 The visible section title is exactly `Past Research`.');
    }


    // This test validates: The visible section title is exactly `Past Research`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Each past-session row shows Capitalized mode papersFound papers relativeDate', async ({ page }) => {
    // Checkpoint 17: Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-017 Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.');
    }


    // This test validates: Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Relative dates are exactly just now mm ago hh ago dd ago or an en-US short month', async ({ page }) => {
    // Checkpoint 18: Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-018 Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.');
    }


    // This test validates: Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: The page tree has no session-delete control and no session-delete API call', async ({ page }) => {
    // Checkpoint 19: The page tree has no session-delete control and no session-delete API call.
    // Section: Quick Test Workflows > Save to Library and Session History

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The page tree has no session-delete control and no session-delete API call.",
      section: "Quick Test Workflows",
      subsection: "Save to Library and Session History",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-019 The page tree has no session-delete control and no session-delete API call.');
    }


    // This test validates: The page tree has no session-delete control and no session-delete API call.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: POST apideep-researchplan requires getCurrentUserId and returns 401 errorNot aut', async ({ page }) => {
    // Checkpoint 20: `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {\"error\":\"Not authenticated\"}` JSON if auth fails before streaming.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-020 `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.');
    }


    // This test validates: `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: POST apideep-researchplan has maxDuration 30', async ({ page }) => {
    // Checkpoint 21: `POST /api/deep-research/plan` has `maxDuration = 30`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` has `maxDuration = 30`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-021 `POST /api/deep-research/plan` has `maxDuration = 30`.');
    }


    // This test validates: `POST /api/deep-research/plan` has `maxDuration = 30`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: POST apideep-researchplan manually parses JSON invalid JSON returns 400 errorInv', async ({ page }) => {
    // Checkpoint 22: `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {\"error\":\"Invalid JSON body\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-022 `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.');
    }


    // This test validates: `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: POST apideep-researchplan requires a string topic missing or non-string topic re', async ({ page }) => {
    // Checkpoint 23: `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {\"error\":\"topic is required\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-023 `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.');
    }


    // This test validates: `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: POST apideep-researchplan defaults mode to standard when omitted', async ({ page }) => {
    // Checkpoint 24: `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` defaults `mode` to `\"standard\"` when omitted.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-024 `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.');
    }


    // This test validates: `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: POST apideep-researchplan uses validateTopictopic so server-side topic validatio', async ({ page }) => {
    // Checkpoint 25: `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-025 `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.');
    }


    // This test validates: `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: POST apideep-researchplan streams progress perspectives done and error events it', async ({ page }) => {
    // Checkpoint 26: `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-026 `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.');
    }


    // This test validates: `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: POST apideep-researchplan streams one perspectives event whose payload items inc', async ({ page }) => {
    // Checkpoint 27: `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-027 `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.');
    }


    // This test validates: `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: POST apideep-researchexecute requires getCurrentUserId and returns 401 errorNot ', async ({ page }) => {
    // Checkpoint 28: `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {\"error\":\"Not authenticated\"}` JSON if auth fails before streaming.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-028 `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.');
    }


    // This test validates: `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: POST apideep-researchexecute has maxDuration 300', async ({ page }) => {
    // Checkpoint 29: `POST /api/deep-research/execute` has `maxDuration = 300`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` has `maxDuration = 300`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-029 `POST /api/deep-research/execute` has `maxDuration = 300`.');
    }


    // This test validates: `POST /api/deep-research/execute` has `maxDuration = 300`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: POST apideep-researchexecute manually parses JSON invalid JSON returns 400 error', async ({ page }) => {
    // Checkpoint 30: `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {\"error\":\"Invalid JSON body\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-030 `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.');
    }


    // This test validates: `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: POST apideep-researchexecute requires a string topic missing or non-string topic', async ({ page }) => {
    // Checkpoint 31: `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {\"error\":\"topic is required\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-031 `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.');
    }


    // This test validates: `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: POST apideep-researchexecute requires a non-empty perspectives array otherwise i', async ({ page }) => {
    // Checkpoint 32: `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {\"error\":\"perspectives array is required\"}`.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-032 `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.');
    }


    // This test validates: `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: POST apideep-researchexecute converts plan perspectives into engine perspectives', async ({ page }) => {
    // Checkpoint 33: `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-033 `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.');
    }


    // This test validates: `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: POST apideep-researchexecute emits only progress report done and error SSE event', async ({ page }) => {
    // Checkpoint 34: `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.
    // Section: Quick Test Workflows > API Routes Called by the Page

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.",
      section: "Quick Test Workflows",
      subsection: "API Routes Called by the Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-034 `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.');
    }


    // This test validates: `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.
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
