/**
 * Auto-generated Playwright test for systematic-review/spec-031
 * Source: e2e/specs/systematic-review/spec-031.md
 * Generated: 2026-03-14T10:25:31.502Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts systematic-review spec-031
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

















import { assertSystematicReviewCheckpoint } from '../../module-assertions/systematic-review';


test.describe('systematic-review / spec-031', () => {
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

  test('cp-000: POST apisystematic-reviewpress validates search strategy using PRESS 2015 framew', async ({ page }) => {
    // Checkpoint 0: `POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-000 ' + "`POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited");
    }


    // This test validates: `POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: GET apisystematic-reviewprisma-flowprojectIdid returns PRISMA flow data in JSON ', async ({ page }) => {
    // Checkpoint 1: `GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-001 ' + "`GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format");
    }


    // This test validates: `GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: POST apisystematic-reviewprisma-flow updates specific PRISMA flow stages', async ({ page }) => {
    // Checkpoint 2: `POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-002 ' + "`POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages");
    }


    // This test validates: `POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: GET apisystematic-reviewprisma-checklist returns static checklist items', async ({ page }) => {
    // Checkpoint 3: `GET /api/systematic-review/prisma-checklist` — returns static checklist items
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/prisma-checklist` — returns static checklist items",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-003 ' + "`GET /api/systematic-review/prisma-checklist` — returns static checklist items");
    }


    // This test validates: `GET /api/systematic-review/prisma-checklist` — returns static checklist items
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: POST apisystematic-reviewprisma-checklist verifies manuscript compliance against', async ({ page }) => {
    // Checkpoint 4: `POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-004 ' + "`POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export");
    }


    // This test validates: `POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: POST apisystematic-reviewimport imports papers from search databases pubmed sema', async ({ page }) => {
    // Checkpoint 5: `POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-005 ' + "`POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500");
    }


    // This test validates: `POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: GET apisystematic-reviewimportprojectIdid fetches papers with full details', async ({ page }) => {
    // Checkpoint 6: `GET /api/systematic-review/import?projectId={id}` — fetches papers with full details
    // Section: Quick Test Workflows > API Routes — Undocumented Endpoints

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/import?projectId={id}` — fetches papers with full details",
      section: "Quick Test Workflows",
      subsection: "API Routes — Undocumented Endpoints",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-006 ' + "`GET /api/systematic-review/import?projectId={id}` — fetches papers with full details");
    }


    // This test validates: `GET /api/systematic-review/import?projectId={id}` — fetches papers with full details
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: POST apisystematic-reviewscreen sets maxDuration 300 5-minute timeout for batch ', async ({ page }) => {
    // Checkpoint 7: `POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-007 ' + "`POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)");
    }


    // This test validates: `POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Screen API is rate-limited via checkRateLimituserId systematic-review RATE_LIMIT', async ({ page }) => {
    // Checkpoint 8: Screen API is rate-limited via `checkRateLimit(userId, "systematic-review", RATE_LIMITS.ai)`
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screen API is rate-limited via `checkRateLimit(userId, \"systematic-review\", RATE_LIMITS.ai)`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-008 ' + "Screen API is rate-limited via `checkRateLimit(userId, \"systematic-review\", RATE_LIMITS.ai)`");
    }


    // This test validates: Screen API is rate-limited via `checkRateLimit(userId, "systematic-review", RATE_LIMITS.ai)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Screen API returns 400 with message No screening criteria found Define inclusion', async ({ page }) => {
    // Checkpoint 9: Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-009 ' + "Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist");
    }


    // This test validates: Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Screen batch mode Zod validates papers array min 1 max 100 items', async ({ page }) => {
    // Checkpoint 10: Screen batch mode Zod validates papers array: min 1, max 100 items
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screen batch mode Zod validates papers array: min 1, max 100 items",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-010 ' + "Screen batch mode Zod validates papers array: min 1, max 100 items");
    }


    // This test validates: Screen batch mode Zod validates papers array: min 1, max 100 items
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Screen batch response includes summary object total included excluded conflicts', async ({ page }) => {
    // Checkpoint 11: Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-011 ' + "Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`");
    }


    // This test validates: Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: GET apisystematic-reviewscreenprojectIdid returns screening summary separate fro', async ({ page }) => {
    // Checkpoint 12: `GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)
    // Section: Quick Test Workflows > API Route — Screening Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-012 ' + "`GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)");
    }


    // This test validates: `GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Extract API supports 4 discriminated modes single single-fulltext batch batch-fu', async ({ page }) => {
    // Checkpoint 13: Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-013 ' + "Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`");
    }


    // This test validates: Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Extract schema allows max 50 fields per extraction', async ({ page }) => {
    // Checkpoint 14: Extract schema allows max 50 fields per extraction
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Extract schema allows max 50 fields per extraction",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-014 ' + "Extract schema allows max 50 fields per extraction");
    }


    // This test validates: Extract schema allows max 50 fields per extraction
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: single mode textContent Zod min 50 max 100000 characters', async ({ page }) => {
    // Checkpoint 15: `single` mode textContent Zod: min 50, max 100000 characters
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`single` mode textContent Zod: min 50, max 100000 characters",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-015 ' + "`single` mode textContent Zod: min 50, max 100000 characters");
    }


    // This test validates: `single` mode textContent Zod: min 50, max 100000 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: batch and batch-fulltext modes allow max 50 papers per request', async ({ page }) => {
    // Checkpoint 16: `batch` and `batch-fulltext` modes allow max 50 papers per request
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`batch` and `batch-fulltext` modes allow max 50 papers per request",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-016 ' + "`batch` and `batch-fulltext` modes allow max 50 papers per request");
    }


    // This test validates: `batch` and `batch-fulltext` modes allow max 50 papers per request
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: single-fulltext mode returns extractions chunks for source linking', async ({ page }) => {
    // Checkpoint 17: `single-fulltext` mode returns `{ extractions, chunks }` for source linking
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`single-fulltext` mode returns `{ extractions, chunks }` for source linking",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-017 ' + "`single-fulltext` mode returns `{ extractions, chunks }` for source linking");
    }


    // This test validates: `single-fulltext` mode returns `{ extractions, chunks }` for source linking
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: GET apisystematic-reviewextractpaperIdid returns chunks for a specific paper', async ({ page }) => {
    // Checkpoint 18: `GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-018 ' + "`GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper");
    }


    // This test validates: `GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: GET apisystematic-reviewextractprojectIdid returns the full extraction table ret', async ({ page }) => {
    // Checkpoint 19: `GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists
    // Section: Quick Test Workflows > API Route — Extraction Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists",
      section: "Quick Test Workflows",
      subsection: "API Route — Extraction Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-019 ' + "`GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists");
    }


    // This test validates: `GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Screening queue GET supports stage parameter title_abstract default or full_text', async ({ page }) => {
    // Checkpoint 20: Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-020 ' + "Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`");
    }


    // This test validates: Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Screening queue GET supports mode parameter conflicts or unblind', async ({ page }) => {
    // Checkpoint 21: Screening queue GET supports `mode` parameter: `conflicts` or `unblind`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening queue GET supports `mode` parameter: `conflicts` or `unblind`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-021 ' + "Screening queue GET supports `mode` parameter: `conflicts` or `unblind`");
    }


    // This test validates: Screening queue GET supports `mode` parameter: `conflicts` or `unblind`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Screening queue verifies project access via verifyProjectAccessprojectId userId ', async ({ page }) => {
    // Checkpoint 22: Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-022 ' + "Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)");
    }


    // This test validates: Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: modeconflicts returns conflicts total from detectConflictsprojectId stage', async ({ page }) => {
    // Checkpoint 23: `mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-023 ' + "`mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`");
    }


    // This test validates: `mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: modeunblind returns results with results summary total withBothDecisions agreeme', async ({ page }) => {
    // Checkpoint 24: `mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-024 ' + "`mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`");
    }


    // This test validates: `mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Standard queue GET returns queue progress agreement reviewerProgress from 4 para', async ({ page }) => {
    // Checkpoint 25: Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-025 ' + "Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises");
    }


    // This test validates: Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Queue POST discriminates actions via zunionresolveSchema decisionSchema', async ({ page }) => {
    // Checkpoint 26: Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-026 ' + "Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`");
    }


    // This test validates: Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Resolve action calls resolveConflictprojectId paperId stage resolution userId re', async ({ page }) => {
    // Checkpoint 27: Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-027 ' + "Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`");
    }


    // This test validates: Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Decision action calls recordHumanDecision with both userId and reviewerId set to', async ({ page }) => {
    // Checkpoint 28: Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-028 ' + "Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user");
    }


    // This test validates: Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Queue PUT recomputes priorities via updateScreeningPrioritiesprojectId from acti', async ({ page }) => {
    // Checkpoint 29: Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module
    // Section: Quick Test Workflows > API Route — Screening Queue Internals

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module",
      section: "Quick Test Workflows",
      subsection: "API Route — Screening Queue Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-029 ' + "Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module");
    }


    // This test validates: Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Liveblocks SR rooms use empty storage SRStorage Recordstring never all data pers', async ({ page }) => {
    // Checkpoint 30: Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-030 ' + "Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB");
    }


    // This test validates: Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Liveblocks auth endpoint is apiliveblocks-auth', async ({ page }) => {
    // Checkpoint 31: Liveblocks auth endpoint is `/api/liveblocks-auth`
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Liveblocks auth endpoint is `/api/liveblocks-auth`",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-031 ' + "Liveblocks auth endpoint is `/api/liveblocks-auth`");
    }


    // This test validates: Liveblocks auth endpoint is `/api/liveblocks-auth`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: SRUserMeta includes id string and info name avatar color', async ({ page }) => {
    // Checkpoint 32: `SRUserMeta` includes `id: string` and `info: { name, avatar, color }`
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`SRUserMeta` includes `id: string` and `info: { name, avatar, color }`",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-032 ' + "`SRUserMeta` includes `id: string` and `info: { name, avatar, color }`");
    }


    // This test validates: `SRUserMeta` includes `id: string` and `info: { name, avatar, color }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: SRRoomEvent is a 5-variant discriminated union on type field', async ({ page }) => {
    // Checkpoint 33: `SRRoomEvent` is a 5-variant discriminated union on `type` field
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`SRRoomEvent` is a 5-variant discriminated union on `type` field",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-033 ' + "`SRRoomEvent` is a 5-variant discriminated union on `type` field");
    }


    // This test validates: `SRRoomEvent` is a 5-variant discriminated union on `type` field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: useCollaborativeReview hook exposes 5 broadcast helpers broadcastDecision broadc', async ({ page }) => {
    // Checkpoint 34: `useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-031');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-034 ' + "`useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`");
    }


    // This test validates: `useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`
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
