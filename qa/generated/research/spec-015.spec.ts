/**
 * Auto-generated Playwright test for research/spec-015
 * Source: e2e/specs/research/spec-015.md
 * Generated: 2026-03-15T17:33:20.458Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-015', () => {
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

  test('cp-000: AISynthesisPanel outer container uses a gradient background bg-gradient-to-br fr', async ({ page }) => {
    // Checkpoint 0: AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ' + "AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`");
    }


    // This test validates: AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: onSynthesisChange callback is called progressively during streaming with each ac', async ({ page }) => {
    // Checkpoint 1: `onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ' + "`onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end");
    }


    // This test validates: `onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Skeleton placeholder during initial streaming shows exactly 4 lines with widths ', async ({ page }) => {
    // Checkpoint 2: Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ' + "Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`");
    }


    // This test validates: Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: GET handler requires authentication returns 401 error Authentication required wh', async ({ page }) => {
    // Checkpoint 3: GET handler requires authentication, returns 401 `{ error: "Authentication required" }` when unauthenticated
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler requires authentication, returns 401 `{ error: \"Authentication required\" }` when unauthenticated",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 ' + "GET handler requires authentication, returns 401 `{ error: \"Authentication required\" }` when unauthenticated");
    }


    // This test validates: GET handler requires authentication, returns 401 `{ error: "Authentication required" }` when unauthenticated
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: GET handler applies rate limit with key search and RATE_LIMITSsearch 120 reqhour', async ({ page }) => {
    // Checkpoint 4: GET handler applies rate limit with key `"search"` and `RATE_LIMITS.search` (120 req/hour)
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler applies rate limit with key `\"search\"` and `RATE_LIMITS.search` (120 req/hour)",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 ' + "GET handler applies rate limit with key `\"search\"` and `RATE_LIMITS.search` (120 req/hour)");
    }


    // This test validates: GET handler applies rate limit with key `"search"` and `RATE_LIMITS.search` (120 req/hour)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: GET handler returns 400 error Query parameter paperId is required when paperId q', async ({ page }) => {
    // Checkpoint 5: GET handler returns 400 `{ error: "Query parameter 'paperId' is required" }` when `paperId` query param is missing
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler returns 400 `{ error: \"Query parameter 'paperId' is required\" }` when `paperId` query param is missing",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 ' + "GET handler returns 400 `{ error: \"Query parameter 'paperId' is required\" }` when `paperId` query param is missing");
    }


    // This test validates: GET handler returns 400 `{ error: "Query parameter 'paperId' is required" }` when `paperId` query param is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: GET handler accepts optional paperTitle query parameter used as fallback for tit', async ({ page }) => {
    // Checkpoint 6: GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 ' + "GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search");
    }


    // This test validates: GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: GET handler defaults limit to 10 and caps it at 100 via MathminparseInt 100', async ({ page }) => {
    // Checkpoint 7: GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 ' + "GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`");
    }


    // This test validates: GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: GET handler returns 500 error S2 recommendations failed on unhandled errors', async ({ page }) => {
    // Checkpoint 8: GET handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "GET handler returns 500 `{ error: \"S2 recommendations failed\" }` on unhandled errors",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 ' + "GET handler returns 500 `{ error: \"S2 recommendations failed\" }` on unhandled errors");
    }


    // This test validates: GET handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: POST handler exists on the same endpoint for list-based recommendations using po', async ({ page }) => {
    // Checkpoint 9: POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 ' + "POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs");
    }


    // This test validates: POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: POST handler requires a non-empty positivePaperIds array returns 400 error posit', async ({ page }) => {
    // Checkpoint 10: POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: "positivePaperIds is required" }` when empty or missing
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: \"positivePaperIds is required\" }` when empty or missing",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 ' + "POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: \"positivePaperIds is required\" }` when empty or missing");
    }


    // This test validates: POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: "positivePaperIds is required" }` when empty or missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: POST handler accepts optional negativePaperIds array defaults to and optional li', async ({ page }) => {
    // Checkpoint 11: POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 ' + "POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)");
    }


    // This test validates: POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: POST handler returns 500 error S2 recommendations failed on unhandled errors', async ({ page }) => {
    // Checkpoint 12: POST handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
    // Section: Quick Test Workflows > S2 Recommendations API (`/api/search/s2-recommendations`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "POST handler returns 500 `{ error: \"S2 recommendations failed\" }` on unhandled errors",
      section: "Quick Test Workflows",
      subsection: "S2 Recommendations API (`/api/search/s2-recommendations`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 ' + "POST handler returns 500 `{ error: \"S2 recommendations failed\" }` on unhandled errors");
    }


    // This test validates: POST handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Research-agent rate limit uses key research-agent with RATE_LIMITSai 60 reqhour ', async ({ page }) => {
    // Checkpoint 13: Research-agent rate limit uses key `"research-agent"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent rate limit uses key `\"research-agent\"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 ' + "Research-agent rate limit uses key `\"research-agent\"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`");
    }


    // This test validates: Research-agent rate limit uses key `"research-agent"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Research-agent uses getModel main model for streaming not getSmallModel', async ({ page }) => {
    // Checkpoint 14: Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 ' + "Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`");
    }


    // This test validates: Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Research-agent response is streamed via resulttoTextStreamResponse', async ({ page }) => {
    // Checkpoint 15: Research-agent response is streamed via `result.toTextStreamResponse()`
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Research-agent response is streamed via `result.toTextStreamResponse()`",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 ' + "Research-agent response is streamed via `result.toTextStreamResponse()`");
    }


    // This test validates: Research-agent response is streamed via `result.toTextStreamResponse()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: System prompt defines the agent role as a medical research librarian AI that con', async ({ page }) => {
    // Checkpoint 16: System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 ' + "System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`");
    }


    // This test validates: System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: System prompt specifies a 4-phase search strategy BROAD SWEEP 3-4 tool calls ASS', async ({ page }) => {
    // Checkpoint 17: System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 ' + "System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE");
    }


    // This test validates: System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: System prompt instructs Try at least 2 different query formulations per source', async ({ page }) => {
    // Checkpoint 18: System prompt instructs "Try at least 2 different query formulations per source"
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt instructs \"Try at least 2 different query formulations per source\"",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 ' + "System prompt instructs \"Try at least 2 different query formulations per source\"");
    }


    // This test validates: System prompt instructs "Try at least 2 different query formulations per source"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: System prompt instructs to ALWAYS include the openAccessUrl if one is available ', async ({ page }) => {
    // Checkpoint 19: System prompt instructs to "ALWAYS include the openAccessUrl if one is available" when saving papers to the library
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt instructs to \"ALWAYS include the openAccessUrl if one is available\" when saving papers to the library",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 ' + "System prompt instructs to \"ALWAYS include the openAccessUrl if one is available\" when saving papers to the library");
    }


    // This test validates: System prompt instructs to "ALWAYS include the openAccessUrl if one is available" when saving papers to the library
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: System prompt stopping criterion new searches return mostly papers already found', async ({ page }) => {
    // Checkpoint 20: System prompt stopping criterion: "new searches return mostly papers already found, OR all key aspects covered"
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt stopping criterion: \"new searches return mostly papers already found, OR all key aspects covered\"",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 ' + "System prompt stopping criterion: \"new searches return mostly papers already found, OR all key aspects covered\"");
    }


    // This test validates: System prompt stopping criterion: "new searches return mostly papers already found, OR all key aspects covered"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: System prompt instructs to Always cite paper titles and key findings when discus', async ({ page }) => {
    // Checkpoint 21: System prompt instructs to "Always cite paper titles and key findings when discussing results"
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "System prompt instructs to \"Always cite paper titles and key findings when discussing results\"",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 ' + "System prompt instructs to \"Always cite paper titles and key findings when discussing results\"");
    }


    // This test validates: System prompt instructs to "Always cite paper titles and key findings when discussing results"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: When contextsavedPaperIds is provided and non-empty the system prompt appends on', async ({ page }) => {
    // Checkpoint 22: When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles
    // Section: Quick Test Workflows > Research Agent API (`/api/research-agent`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles",
      section: "Quick Test Workflows",
      subsection: "Research Agent API (`/api/research-agent`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 ' + "When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles");
    }


    // This test validates: When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Unhandled synthesis errors return 500 error Synthesis failed error is logged via', async ({ page }) => {
    // Checkpoint 23: Unhandled synthesis errors return 500 `{ error: "Synthesis failed" }` — error is logged via `console.error`, not the structured `logger`
    // Section: Quick Test Workflows > Synthesize API (`/api/research/synthesize`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Unhandled synthesis errors return 500 `{ error: \"Synthesis failed\" }` — error is logged via `console.error`, not the structured `logger`",
      section: "Quick Test Workflows",
      subsection: "Synthesize API (`/api/research/synthesize`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 ' + "Unhandled synthesis errors return 500 `{ error: \"Synthesis failed\" }` — error is logged via `console.error`, not the structured `logger`");
    }


    // This test validates: Unhandled synthesis errors return 500 `{ error: "Synthesis failed" }` — error is logged via `console.error`, not the structured `logger`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Synthesize request body also accepts optional customInstructions string and targ', async ({ page }) => {
    // Checkpoint 24: Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`
    // Section: Quick Test Workflows > Synthesize API (`/api/research/synthesize`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`",
      section: "Quick Test Workflows",
      subsection: "Synthesize API (`/api/research/synthesize`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 ' + "Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`");
    }


    // This test validates: Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Synthesize streaming response for generate mode is returned via resulttoTextStre', async ({ page }) => {
    // Checkpoint 25: Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`
    // Section: Quick Test Workflows > Synthesize API (`/api/research/synthesize`)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`",
      section: "Quick Test Workflows",
      subsection: "Synthesize API (`/api/research/synthesize`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 ' + "Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`");
    }


    // This test validates: Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Rate limit error response body is exactly error Rate limit exceeded Please try a', async ({ page }) => {
    // Checkpoint 26: Rate limit error response body is exactly `{ error: "Rate limit exceeded. Please try again later." }` with HTTP 429 status
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Rate limit error response body is exactly `{ error: \"Rate limit exceeded. Please try again later.\" }` with HTTP 429 status",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 ' + "Rate limit error response body is exactly `{ error: \"Rate limit exceeded. Please try again later.\" }` with HTTP 429 status");
    }


    // This test validates: Rate limit error response body is exactly `{ error: "Rate limit exceeded. Please try again later." }` with HTTP 429 status
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Rate limit response includes X-RateLimit-Remaining header with the remaining req', async ({ page }) => {
    // Checkpoint 27: Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 ' + "Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string");
    }


    // This test validates: Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Rate limit key format is userIdendpoint eg user_123search', async ({ page }) => {
    // Checkpoint 28: Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 ' + "Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`");
    }


    // This test validates: Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: RATE_LIMITSsearch allows 120 requests per 3600 seconds 120hour', async ({ page }) => {
    // Checkpoint 29: `RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 ' + "`RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)");
    }


    // This test validates: `RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: RATE_LIMITSai allows 60 requests per 3600 seconds 60hour', async ({ page }) => {
    // Checkpoint 30: `RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 ' + "`RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)");
    }


    // This test validates: `RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: In-memory rate limiter developmentUpstash-unavailable fallback uses a fixed-wind', async ({ page }) => {
    // Checkpoint 31: In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 ' + "In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store");
    }


    // This test validates: In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: In-memory rate limiter cleans up expired entries every 60 seconds via a setInter', async ({ page }) => {
    // Checkpoint 32: In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 ' + "In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop");
    }


    // This test validates: In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Production rate limiter uses Upstash Redis with upstashratelimit sliding window ', async ({ page }) => {
    // Checkpoint 33: Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `"scholarsync"`
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `\"scholarsync\"`",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 ' + "Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `\"scholarsync\"`");
    }


    // This test validates: Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `"scholarsync"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Rate limiter falls through to in-memory when Upstash Redis env vars UPSTASH_REDI', async ({ page }) => {
    // Checkpoint 34: Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws
    // Section: Quick Test Workflows > Rate Limiting Module

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws",
      section: "Quick Test Workflows",
      subsection: "Rate Limiting Module",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 ' + "Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws");
    }


    // This test validates: Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws
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
