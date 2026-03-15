/**
 * Auto-generated Playwright test for research/spec-008
 * Source: e2e/specs/research/spec-008.md
 * Generated: 2026-03-14T07:47:30.267Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-008
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-008', () => {
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

  test('cp-000: apisearchunified treats query augmentation as enabled unless the request explici', async ({ page }) => {
    // Checkpoint 0: `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`');
    }


    // This test validates: `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: apisearchunified only attempts AI query augmentation when augment false and the ', async ({ page }) => {
    // Checkpoint 1: `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`/api/search/unified` only attempts AI query augmentation when `augment !== \"false\"` and the raw query length is greater than `20`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`');
    }


    // This test validates: `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Query-augmentation failures fall back silently to the raw user query without sur', async ({ page }) => {
    // Checkpoint 2: Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response');
    }


    // This test validates: Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: augmentQuery aborts its AI call after exactly 5000ms', async ({ page }) => {
    // Checkpoint 3: `augmentQuery()` aborts its AI call after exactly `5000ms`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`augmentQuery()` aborts its AI call after exactly `5000ms`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 `augmentQuery()` aborts its AI call after exactly `5000ms`');
    }


    // This test validates: `augmentQuery()` aborts its AI call after exactly `5000ms`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: augmentQuery asks for three source-specific query strings plus optional yearStar', async ({ page }) => {
    // Checkpoint 4: `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions');
    }


    // This test validates: `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Unified-search source fan-out computes neededPerSource as Mathminpage 1 perPage ', async ({ page }) => {
    // Checkpoint 5: Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`');
    }


    // This test validates: Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Unified-search PubMed fan-out always requests page 0 and uses maxResults neededP', async ({ page }) => {
    // Checkpoint 6: Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`');
    }


    // This test validates: Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Unified-search Semantic Scholar fan-out always requests offset 0 and uses limit ', async ({ page }) => {
    // Checkpoint 7: Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`');
    }


    // This test validates: Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Unified-search OpenAlex fan-out always requests page 1 and uses limit neededPerS', async ({ page }) => {
    // Checkpoint 8: Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`');
    }


    // This test validates: Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Unified-search ClinicalTrials fan-out requests only limit perPage not neededPerS', async ({ page }) => {
    // Checkpoint 9: Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`');
    }


    // This test validates: Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Each source fan-out call is wrapped in withTimeout 4500 with per-source timeout ', async ({ page }) => {
    // Checkpoint 10: Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`');
    }


    // This test validates: Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Unified search uses PromiseallSettled so one degraded source does not abort the ', async ({ page }) => {
    // Checkpoint 11: Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response');
    }


    // This test validates: Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Unified search logs per-source degradation warnings instead of surfacing source-', async ({ page }) => {
    // Checkpoint 12: Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page');
    }


    // This test validates: Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: When all four source result sets are empty in development mode unified search at', async ({ page }) => {
    // Checkpoint 13: When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`');
    }


    // This test validates: When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Development fallback is completely disabled when NODE_ENV development', async ({ page }) => {
    // Checkpoint 14: Development fallback is completely disabled when `NODE_ENV !== "development"`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Development fallback is completely disabled when `NODE_ENV !== \"development\"`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 Development fallback is completely disabled when `NODE_ENV !== "development"`');
    }


    // This test validates: Development fallback is completely disabled when `NODE_ENV !== "development"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Development fallback ignores fixtures whose normalized query-match score is belo', async ({ page }) => {
    // Checkpoint 15: Development fallback ignores fixtures whose normalized query-match score is below `0.55`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Development fallback ignores fixtures whose normalized query-match score is below `0.55`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 Development fallback ignores fixtures whose normalized query-match score is below `0.55`');
    }


    // This test validates: Development fallback ignores fixtures whose normalized query-match score is below `0.55`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Reciprocal-rank fusion uses k 60 when combining source lists', async ({ page }) => {
    // Checkpoint 16: Reciprocal-rank fusion uses `k = 60` when combining source lists
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Reciprocal-rank fusion uses `k = 60` when combining source lists",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 Reciprocal-rank fusion uses `k = 60` when combining source lists');
    }


    // This test validates: Reciprocal-rank fusion uses `k = 60` when combining source lists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Duplicate papers merged during reciprocal-rank fusion accumulate rrfScore contri', async ({ page }) => {
    // Checkpoint 17: Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source');
    }


    // This test validates: Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Reciprocal-rank fusion appends the new source name into sources only if that sou', async ({ page }) => {
    // Checkpoint 18: Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper');
    }


    // This test validates: Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Cohere reranking is skipped entirely when COHERE_API_KEY is missing', async ({ page }) => {
    // Checkpoint 19: Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing');
    }


    // This test validates: Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Cohere reranking is skipped entirely when the fused results array is empty', async ({ page }) => {
    // Checkpoint 20: Cohere reranking is skipped entirely when the fused results array is empty
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranking is skipped entirely when the fused results array is empty",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 Cohere reranking is skipped entirely when the fused results array is empty');
    }


    // This test validates: Cohere reranking is skipped entirely when the fused results array is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Cohere reranking posts to httpsapicoherecomv2rerank with model rerank-v35', async ({ page }) => {
    // Checkpoint 21: Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`');
    }


    // This test validates: Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Cohere reranking truncates top_n to Mathminresultslength 50 when no explicit top', async ({ page }) => {
    // Checkpoint 22: Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed');
    }


    // This test validates: Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Cohere reranking falls back to the original fused order when the Cohere request ', async ({ page }) => {
    // Checkpoint 23: Cohere reranking falls back to the original fused order when the Cohere request throws
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Cohere reranking falls back to the original fused order when the Cohere request throws",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 Cohere reranking falls back to the original fused order when the Cohere request throws');
    }


    // This test validates: Cohere reranking falls back to the original fused order when the Cohere request throws
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Unified search infers a missing evidenceLevel only when a result already has stu', async ({ page }) => {
    // Checkpoint 24: Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade');
    }


    // This test validates: Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Unified search enriches each result with journalQuartile and journalImpactProxy ', async ({ page }) => {
    // Checkpoint 25: Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match');
    }


    // This test validates: Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Study-type filtering is applied after rank fusion and reranking not at the per-s', async ({ page }) => {
    // Checkpoint 26: Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level",
      section: "Quick Test Workflows",
      subsection: "Unified Search API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level');
    }


    // This test validates: Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Open-access filtering is applied after rank fusion and reranking by checking ris', async ({ page }) => {
    // Checkpoint 27: Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`",
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
      throw new Error('Unhandled research checkpoint: cp-027 Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`');
    }


    // This test validates: Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Sort mode citations orders results by citationCount 0 descending', async ({ page }) => {
    // Checkpoint 28: Sort mode `citations` orders results by `(citationCount || 0)` descending
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort mode `citations` orders results by `(citationCount || 0)` descending",
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
      throw new Error('Unhandled research checkpoint: cp-028 Sort mode `citations` orders results by `(citationCount || 0)` descending');
    }


    // This test validates: Sort mode `citations` orders results by `(citationCount || 0)` descending
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Sort mode year orders results by year 0 descending', async ({ page }) => {
    // Checkpoint 29: Sort mode `year` orders results by `(year || 0)` descending
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort mode `year` orders results by `(year || 0)` descending",
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
      throw new Error('Unhandled research checkpoint: cp-029 Sort mode `year` orders results by `(year || 0)` descending');
    }


    // This test validates: Sort mode `year` orders results by `(year || 0)` descending
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Sort mode evidence orders results by evidence map I1 II2 III3 IV4 V5', async ({ page }) => {
    // Checkpoint 30: Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`",
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
      throw new Error('Unhandled research checkpoint: cp-030 Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`');
    }


    // This test validates: Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Results with missing or unrecognized evidence level are treated as Level V durin', async ({ page }) => {
    // Checkpoint 31: Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting",
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
      throw new Error('Unhandled research checkpoint: cp-031 Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting');
    }


    // This test validates: Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Unified search still contains a backend-only impact sort branch even though the ', async ({ page }) => {
    // Checkpoint 32: Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`",
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
      throw new Error('Unhandled research checkpoint: cp-032 Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`');
    }


    // This test validates: Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Unified-search pagination slices the filtered array with start page perPage and ', async ({ page }) => {
    // Checkpoint 33: Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`",
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
      throw new Error('Unhandled research checkpoint: cp-033 Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`');
    }


    // This test validates: Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Unified-search hasMore becomes true only when start perPage total', async ({ page }) => {
    // Checkpoint 34: Unified-search `hasMore` becomes `true` only when `start + perPage < total`
    // Section: Quick Test Workflows > Unified Search API Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unified-search `hasMore` becomes `true` only when `start + perPage < total`",
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
      throw new Error('Unhandled research checkpoint: cp-034 Unified-search `hasMore` becomes `true` only when `start + perPage < total`');
    }


    // This test validates: Unified-search `hasMore` becomes `true` only when `start + perPage < total`
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
