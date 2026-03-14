/**
 * Auto-generated Playwright test for analysis/spec-008
 * Source: e2e/specs/analysis/spec-008.md
 * Generated: 2026-03-14T12:58:55.428Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts analysis spec-008
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';










import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';









test.describe('analysis / spec-008', () => {
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

  test('cp-000: 503 when AI detection throws returns error AI detection service is unavailable P', async ({ page }) => {
    // Checkpoint 0: 503 when AI detection throws returns `{ error: "AI detection service is unavailable. Please try again later." }` (~line 102)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "503 when AI detection throws returns `{ error: \"AI detection service is unavailable. Please try again later.\" }` (~line 102)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-000 503 when AI detection throws returns `{ error: "AI detection service is unavailable. Please try again later." }` (~line 102)');
    }


    // This test validates: 503 when AI detection throws returns `{ error: "AI detection service is unavailable. Please try again later." }` (~line 102)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 500 catch-all returns error Failed to analyze text line 159', async ({ page }) => {
    // Checkpoint 1: 500 catch-all returns `{ error: "Failed to analyze text" }` (~line 159)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "500 catch-all returns `{ error: \"Failed to analyze text\" }` (~line 159)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-001 500 catch-all returns `{ error: "Failed to analyze text" }` (~line 159)');
    }


    // This test validates: 500 catch-all returns `{ error: "Failed to analyze text" }` (~line 159)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Rate limit exceeded returns status 429 not 503 with error Rate limit exceeded Pl', async ({ page }) => {
    // Checkpoint 2: Rate limit exceeded returns status **429** (not 503) with `{ error: "Rate limit exceeded. Please try again later." }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Rate limit exceeded returns status **429** (not 503) with `{ error: \"Rate limit exceeded. Please try again later.\" }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-002 Rate limit exceeded returns status **429** (not 503) with `{ error: "Rate limit exceeded. Please try again later." }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)');
    }


    // This test validates: Rate limit exceeded returns status **429** (not 503) with `{ error: "Rate limit exceeded. Please try again later." }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Rate limit key format is userIdintegrity-check using RATE_LIMITSanalysis config ', async ({ page }) => {
    // Checkpoint 3: Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-003 Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)');
    }


    // This test validates: Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: API checks isAIConfigured before processing and returns 503 if false line 59', async ({ page }) => {
    // Checkpoint 4: API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-004 API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)');
    }


    // This test validates: API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: API persists results to integrityChecks database table after every successful ch', async ({ page }) => {
    // Checkpoint 5: API persists results to `integrityChecks` database table after every successful check (~line 120)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "API persists results to `integrityChecks` database table after every successful check (~line 120)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-005 API persists results to `integrityChecks` database table after every successful check (~line 120)');
    }


    // This test validates: API persists results to `integrityChecks` database table after every successful check (~line 120)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Database persistence failure is non-fatal results are still returned to the clie', async ({ page }) => {
    // Checkpoint 6: Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-006 Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)');
    }


    // This test validates: Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: contentChecked field in DB is truncated to first 5000 characters of submitted te', async ({ page }) => {
    // Checkpoint 7: `contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-007 `contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)');
    }


    // This test validates: `contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Zod sources schema validates an array of objects with optional fields title doi ', async ({ page }) => {
    // Checkpoint 8: Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-008 Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)');
    }


    // This test validates: Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Paid plans are basic pro institutional the PAID_PLANS set at line 22', async ({ page }) => {
    // Checkpoint 9: Paid plans are `["basic", "pro", "institutional"]` — the `PAID_PLANS` set at ~line 22
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — Tier Gating and Response Shape

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paid plans are `[\"basic\", \"pro\", \"institutional\"]` — the `PAID_PLANS` set at ~line 22",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — Tier Gating and Response Shape",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-009 Paid plans are `["basic", "pro", "institutional"]` — the `PAID_PLANS` set at ~line 22');
    }


    // This test validates: Paid plans are `["basic", "pro", "institutional"]` — the `PAID_PLANS` set at ~line 22
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Free plan users get AI detection only plagiarism citation audit and self-plagiar', async ({ page }) => {
    // Checkpoint 10: Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — Tier Gating and Response Shape

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — Tier Gating and Response Shape",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-010 Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)');
    }


    // This test validates: Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Response includes tier field free or paid checkedAt ISO timestamp and optional s', async ({ page }) => {
    // Checkpoint 11: Response includes `tier` field ("free" or "paid"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — Tier Gating and Response Shape

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Response includes `tier` field (\"free\" or \"paid\"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — Tier Gating and Response Shape",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-011 Response includes `tier` field ("free" or "paid"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)');
    }


    // This test validates: Response includes `tier` field ("free" or "paid"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: writingQualitypassiveVoiceCount in the API response is derived from passiveVoice', async ({ page }) => {
    // Checkpoint 12: `writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — Tier Gating and Response Shape

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — Tier Gating and Response Shape",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-012 `writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)');
    }


    // This test validates: `writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: writingQualityreadabilityGrade in the API response comes from the AI detection e', async ({ page }) => {
    // Checkpoint 13: `writingQuality.readabilityGrade` in the API response comes from the AI detection engine's Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — Tier Gating and Response Shape

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`writingQuality.readabilityGrade` in the API response comes from the AI detection engine's Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — Tier Gating and Response Shape",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-013 `writingQuality.readabilityGrade` in the API response comes from the AI detection engine\'s Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)');
    }


    // This test validates: `writingQuality.readabilityGrade` in the API response comes from the AI detection engine's Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: fleschReadingEase is clamped to 0-100 range and rounded to integer with Mathroun', async ({ page }) => {
    // Checkpoint 14: `fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-014 `fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)');
    }


    // This test validates: `fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: fleschKincaidGrade is clamped to 0 and rounded to 1 decimal place MathroundrawGr', async ({ page }) => {
    // Checkpoint 15: `fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-015 `fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)');
    }


    // This test validates: `fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: gunningFogIndex is clamped to 0 and rounded to 1 decimal place Mathround 10 10 l', async ({ page }) => {
    // Checkpoint 16: `gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-016 `gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)');
    }


    // This test validates: `gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: automatedReadabilityIndex is clamped to 0 and rounded to 1 decimal Mathround 10 ', async ({ page }) => {
    // Checkpoint 17: `automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-017 `automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)');
    }


    // This test validates: `automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: colemanLiauIndex is clamped to 0 and rounded to 1 decimal Mathround 10 10 line 2', async ({ page }) => {
    // Checkpoint 18: `colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-018 `colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)');
    }


    // This test validates: `colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: vocabularyDiversity is a type-token ratio rounded to 2 decimal places Mathround ', async ({ page }) => {
    // Checkpoint 19: `vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-019 `vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)');
    }


    // This test validates: `vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: avgSyllablesPerWord is rounded to 2 decimal places Mathround 100 100 line 292', async ({ page }) => {
    // Checkpoint 20: `avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-020 `avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)');
    }


    // This test validates: `avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: avgWordsPerSentence and avgSentenceLength are identical values both Mathroundavg', async ({ page }) => {
    // Checkpoint 21: `avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-021 `avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)');
    }


    // This test validates: `avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: complexWordPercentage is rounded to 1 decimal Mathround 1000 10 line 290', async ({ page }) => {
    // Checkpoint 22: `complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Metric Formatting Precision

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Metric Formatting Precision",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-022 `complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)');
    }


    // This test validates: `complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: classifyReason maps write-good reasons passive voice type passive severity warni', async ({ page }) => {
    // Checkpoint 23: `classifyReason()` maps write-good reasons: "passive voice" → type `passive` / severity `warning`; "weasel" → type `weasel` / severity `warning`; "adverb" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Issue Generation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`classifyReason()` maps write-good reasons: \"passive voice\" → type `passive` / severity `warning`; \"weasel\" → type `weasel` / severity `warning`; \"adverb\" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Issue Generation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-023 `classifyReason()` maps write-good reasons: "passive voice" → type `passive` / severity `warning`; "weasel" → type `weasel` / severity `warning`; "adverb" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)');
    }


    // This test validates: `classifyReason()` maps write-good reasons: "passive voice" → type `passive` / severity `warning`; "weasel" → type `weasel` / severity `warning`; "adverb" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Complex sentence issues have reason This sentence has N words Consider breaking ', async ({ page }) => {
    // Checkpoint 24: Complex sentence issues have reason `"This sentence has {N} words. Consider breaking it up for clarity."` and suggestion `"Break this into shorter sentences for better readability."` (~line 241-248)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Issue Generation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Complex sentence issues have reason `\"This sentence has {N} words. Consider breaking it up for clarity.\"` and suggestion `\"Break this into shorter sentences for better readability.\"` (~line 241-248)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Issue Generation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-024 Complex sentence issues have reason `"This sentence has {N} words. Consider breaking it up for clarity."` and suggestion `"Break this into shorter sentences for better readability."` (~line 241-248)');
    }


    // This test validates: Complex sentence issues have reason `"This sentence has {N} words. Consider breaking it up for clarity."` and suggestion `"Break this into shorter sentences for better readability."` (~line 241-248)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: isComplexWord requires 3 syllables AND excludes words ending in ed es or ing lin', async ({ page }) => {
    // Checkpoint 25: `isComplexWord()` requires 3+ syllables AND excludes words ending in "ed", "es", or "ing" (~line 118-127)
    // Section: Quick Test Workflows > `src/lib/writing-analysis.ts` — Issue Generation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`isComplexWord()` requires 3+ syllables AND excludes words ending in \"ed\", \"es\", or \"ing\" (~line 118-127)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/writing-analysis.ts` — Issue Generation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-025 `isComplexWord()` requires 3+ syllables AND excludes words ending in "ed", "es", or "ing" (~line 118-127)');
    }


    // This test validates: `isComplexWord()` requires 3+ syllables AND excludes words ending in "ed", "es", or "ing" (~line 118-127)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: HEDGING_PHRASES array contains exactly 35 hedging phrases line 144-182', async ({ page }) => {
    // Checkpoint 26: `HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-026 `HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)');
    }


    // This test validates: `HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: PARAGRAPH_BATCH_SIZE for LLM analysis is 4 paragraphs per batch line 185', async ({ page }) => {
    // Checkpoint 27: `PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-027 `PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)');
    }


    // This test validates: `PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: overallRisk derivation humanScore 70 low 40 medium 40 high line 1090-1097', async ({ page }) => {
    // Checkpoint 28: `overallRisk` derivation: humanScore >= 70 → "low", >= 40 → "medium", < 40 → "high" (~line 1090-1097)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`overallRisk` derivation: humanScore >= 70 → \"low\", >= 40 → \"medium\", < 40 → \"high\" (~line 1090-1097)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-028 `overallRisk` derivation: humanScore >= 70 → "low", >= 40 → "medium", < 40 → "high" (~line 1090-1097)');
    }


    // This test validates: `overallRisk` derivation: humanScore >= 70 → "low", >= 40 → "medium", < 40 → "high" (~line 1090-1097)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: aiScore is computed as 100 - humanScore after clamping line 1088', async ({ page }) => {
    // Checkpoint 29: `aiScore` is computed as `100 - humanScore` after clamping (~line 1088)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`aiScore` is computed as `100 - humanScore` after clamping (~line 1088)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-029 `aiScore` is computed as `100 - humanScore` after clamping (~line 1088)');
    }


    // This test validates: `aiScore` is computed as `100 - humanScore` after clamping (~line 1088)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Binoculars score is mapped to human probability score threshold - 05 100 clamped', async ({ page }) => {
    // Checkpoint 30: Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-030 Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)');
    }


    // This test validates: Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Combined paid-tier score 60 Binoculars 40 LLM-heuristic rounded line 1075-1077', async ({ page }) => {
    // Checkpoint 31: Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-031 Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)');
    }


    // This test validates: Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: computeTextStatistics rounds avgSentenceLength to 2 decimal places typeTokenRati', async ({ page }) => {
    // Checkpoint 32: `computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)
    // Section: Quick Test Workflows > `src/lib/integrity/ai-detection.ts` — Detection Engine Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/ai-detection.ts` — Detection Engine Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-032 `computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)');
    }


    // This test validates: `computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Plagiarism severity Jaccard similarity 04 high 02 medium 02 low line 500-504', async ({ page }) => {
    // Checkpoint 33: Plagiarism severity: Jaccard similarity >= 0.4 → "high", >= 0.2 → "medium", < 0.2 → "low" (~line 500-504)
    // Section: Quick Test Workflows > `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism severity: Jaccard similarity >= 0.4 → \"high\", >= 0.2 → \"medium\", < 0.2 → \"low\" (~line 500-504)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-033 Plagiarism severity: Jaccard similarity >= 0.4 → "high", >= 0.2 → "medium", < 0.2 → "low" (~line 500-504)');
    }


    // This test validates: Plagiarism severity: Jaccard similarity >= 0.4 → "high", >= 0.2 → "medium", < 0.2 → "low" (~line 500-504)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Plagiarism matches below 008 Jaccard similarity are not reported line 599', async ({ page }) => {
    // Checkpoint 34: Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)
    // Section: Quick Test Workflows > `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-034 Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)');
    }


    // This test validates: Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)
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
