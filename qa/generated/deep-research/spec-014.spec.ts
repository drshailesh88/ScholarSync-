/**
 * Auto-generated Playwright test for deep-research/spec-014
 * Source: e2e/specs/deep-research/spec-014.md
 * Generated: 2026-03-14T18:46:28.334Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts deep-research spec-014
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';











import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';








test.describe('deep-research / spec-014', () => {
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

  test('cp-000: pagetsx defines streamingSections renders streaming ResearchDocument previews an', async ({ page }) => {
    // Checkpoint 0: `page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-000 `page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.');
    }


    // This test validates: `page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: The section branch in the shared SSE parser exists but no currently used deep-re', async ({ page }) => {
    // Checkpoint 1: The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: "section"`.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: \"section\"`.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-001 The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: "section"`.');
    }


    // This test validates: The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: "section"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: The _streamingMarkdown variable in pagetsx is computed and never used', async ({ page }) => {
    // Checkpoint 2: The `_streamingMarkdown` variable in `page.tsx` is computed and never used.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The `_streamingMarkdown` variable in `page.tsx` is computed and never used.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-002 The `_streamingMarkdown` variable in `page.tsx` is computed and never used.');
    }


    // This test validates: The `_streamingMarkdown` variable in `page.tsx` is computed and never used.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: The page passes onError into readSSEStream during plan generation but the reader', async ({ page }) => {
    // Checkpoint 3: The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-003 The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.');
    }


    // This test validates: The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: The preview component supports isRegenerating but the page never passes that pro', async ({ page }) => {
    // Checkpoint 4: The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-004 The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.');
    }


    // This test validates: The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: SaveToLibraryButton supports isLoggedIn false but the page never passes a false ', async ({ page }) => {
    // Checkpoint 5: `SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-005 `SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.');
    }


    // This test validates: `SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: ProgressStagestatus error exists in the component contract but the deep-research', async ({ page }) => {
    // Checkpoint 6: `ProgressStage.status = "error"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`ProgressStage.status = \"error\"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-006 `ProgressStage.status = "error"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.');
    }


    // This test validates: `ProgressStage.status = "error"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: The legacy single-endpoint route POST apideep-research still exists but the curr', async ({ page }) => {
    // Checkpoint 7: The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-007 The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.');
    }


    // This test validates: The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Even if section SSE events were added later the current streaming-preview path w', async ({ page }) => {
    // Checkpoint 8: Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.
    // Section: Quick Test Workflows > Dead Code (exists but never executes)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.",
      section: "Quick Test Workflows",
      subsection: "Dead Code (exists but never executes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-008 Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.');
    }


    // This test validates: Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: STAGE_MAP maps engine stages validating generating-perspectives building-tree an', async ({ page }) => {
    // Checkpoint 9: `STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-009 `STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.');
    }


    // This test validates: `STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Engine stage search-round-3 maps to frontend search-round-2 no separate round-3 ', async ({ page }) => {
    // Checkpoint 10: Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-010 Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).');
    }


    // This test validates: Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Engine stages deduplicating and unpaywall-lookup both map to frontend full-text-', async ({ page }) => {
    // Checkpoint 11: Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-011 Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.');
    }


    // This test validates: Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Engine stage synthesizing maps to synthesis-perspectives engine stage complete m', async ({ page }) => {
    // Checkpoint 12: Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-012 Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.');
    }


    // This test validates: Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Engine stages citation-traversal full-text-extraction and data-extraction are NO', async ({ page }) => {
    // Checkpoint 13: Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-013 Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.');
    }


    // This test validates: Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Frontend stages synthesis-summary and synthesis-tables DO receive individual SSE', async ({ page }) => {
    // Checkpoint 14: Frontend stages `synthesis-summary` and `synthesis-tables` DO receive individual SSE progress events because synthesis progress is bridged through the execute route and unmapped stage IDs pass through unchanged.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Frontend stages `synthesis-summary` and `synthesis-tables` DO receive individual SSE progress events because synthesis progress is bridged through the execute route and unmapped stage IDs pass through unchanged.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-014 Frontend stages `synthesis-summary` and `synthesis-tables` DO receive individual SSE progress events because synthesis progress is bridged through the execute route and unmapped stage IDs pass through unchanged.');
    }


    // This test validates: Frontend stages `synthesis-summary` and `synthesis-tables` DO receive individual SSE progress events because synthesis progress is bridged through the execute route and unmapped stage IDs pass through unchanged.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: During a live research execution the progress stepper can activate synthesis-per', async ({ page }) => {
    // Checkpoint 15: During a live research execution, the progress stepper can activate `synthesis-perspectives` → `synthesis-summary` → `synthesis-tables` → `synthesis-critique` in sequence before the final `report` event completes all stages.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "During a live research execution, the progress stepper can activate `synthesis-perspectives` → `synthesis-summary` → `synthesis-tables` → `synthesis-critique` in sequence before the final `report` event completes all stages.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-015 During a live research execution, the progress stepper can activate `synthesis-perspectives` → `synthesis-summary` → `synthesis-tables` → `synthesis-critique` in sequence before the final `report` event completes all stages.');
    }


    // This test validates: During a live research execution, the progress stepper can activate `synthesis-perspectives` → `synthesis-summary` → `synthesis-tables` → `synthesis-critique` in sequence before the final `report` event completes all stages.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: The execute route does NOT call validateTopic it only checks topic typeof topic ', async ({ page }) => {
    // Checkpoint 16: The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== "string"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it).
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== \"string\"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it).",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-016 The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== "string"`. A topic of 2 characters would pass the execute route\'s validation (but the plan route would have already rejected it).');
    }


    // This test validates: The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== "string"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: The execute route accepts an optional config field in the request body config Pa', async ({ page }) => {
    // Checkpoint 17: The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective.
    // Section: Quick Test Workflows > Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective.",
      section: "Quick Test Workflows",
      subsection: "Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-017 The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page\'s perspective.');
    }


    // This test validates: The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: validateTopic runs inside the SSE stream after the 200 response is already sent ', async ({ page }) => {
    // Checkpoint 18: `validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: "error", error: "Topic must be at least 5 characters long" }`, not as an HTTP 400 response.
    // Section: Quick Test Workflows > Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: \"error\", error: \"Topic must be at least 5 characters long\" }`, not as an HTTP 400 response.",
      section: "Quick Test Workflows",
      subsection: "Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-018 `validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: "error", error: "Topic must be at least 5 characters long" }`, not as an HTTP 400 response.');
    }


    // This test validates: `validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: "error", error: "Topic must be at least 5 characters long" }`, not as an HTTP 400 response.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: The plan route emits the first progress message as stage generating-perspectives', async ({ page }) => {
    // Checkpoint 19: The plan route emits the first progress message as `{ stage: "generating-perspectives", message: "Generating research perspectives..." }` before calling `generatePerspectives()`.
    // Section: Quick Test Workflows > Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The plan route emits the first progress message as `{ stage: \"generating-perspectives\", message: \"Generating research perspectives...\" }` before calling `generatePerspectives()`.",
      section: "Quick Test Workflows",
      subsection: "Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-019 The plan route emits the first progress message as `{ stage: "generating-perspectives", message: "Generating research perspectives..." }` before calling `generatePerspectives()`.');
    }


    // This test validates: The plan route emits the first progress message as `{ stage: "generating-perspectives", message: "Generating research perspectives..." }` before calling `generatePerspectives()`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: After perspective generation completes the plan route emits stage generating-per', async ({ page }) => {
    // Checkpoint 20: After perspective generation completes, the plan route emits `{ stage: "generating-perspectives", message: "Generated {N} perspectives" }` before the perspectives event.
    // Section: Quick Test Workflows > Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "After perspective generation completes, the plan route emits `{ stage: \"generating-perspectives\", message: \"Generated {N} perspectives\" }` before the perspectives event.",
      section: "Quick Test Workflows",
      subsection: "Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-020 After perspective generation completes, the plan route emits `{ stage: "generating-perspectives", message: "Generated {N} perspectives" }` before the perspectives event.');
    }


    // This test validates: After perspective generation completes, the plan route emits `{ stage: "generating-perspectives", message: "Generated {N} perspectives" }` before the perspectives event.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Missing or non-string topic returns 400 error Topic is required', async ({ page }) => {
    // Checkpoint 21: Missing or non-string `topic` returns `400 { "error": "Topic is required" }`.
    // Section: Quick Test Workflows > Save Route Validation (`src/app/api/deep-research/save/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Missing or non-string `topic` returns `400 { \"error\": \"Topic is required\" }`.",
      section: "Quick Test Workflows",
      subsection: "Save Route Validation (`src/app/api/deep-research/save/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-021 Missing or non-string `topic` returns `400 { "error": "Topic is required" }`.');
    }


    // This test validates: Missing or non-string `topic` returns `400 { "error": "Topic is required" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Auth failure returns 401 error Not authenticated', async ({ page }) => {
    // Checkpoint 22: Auth failure returns `401 { "error": "Not authenticated" }`.
    // Section: Quick Test Workflows > Save Route Validation (`src/app/api/deep-research/save/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Auth failure returns `401 { \"error\": \"Not authenticated\" }`.",
      section: "Quick Test Workflows",
      subsection: "Save Route Validation (`src/app/api/deep-research/save/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-022 Auth failure returns `401 { "error": "Not authenticated" }`.');
    }


    // This test validates: Auth failure returns `401 { "error": "Not authenticated" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Unexpected errors return 500 error Failed to save research session', async ({ page }) => {
    // Checkpoint 23: Unexpected errors return `500 { "error": "Failed to save research session" }`.
    // Section: Quick Test Workflows > Save Route Validation (`src/app/api/deep-research/save/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Unexpected errors return `500 { \"error\": \"Failed to save research session\" }`.",
      section: "Quick Test Workflows",
      subsection: "Save Route Validation (`src/app/api/deep-research/save/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-023 Unexpected errors return `500 { "error": "Failed to save research session" }`.');
    }


    // This test validates: Unexpected errors return `500 { "error": "Failed to save research session" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Mode is extracted from researchPlan JSON via sresearchPlan as mode string mode w', async ({ page }) => {
    // Checkpoint 24: Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `"standard"`.
    // Section: Quick Test Workflows > Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `\"standard\"`.",
      section: "Quick Test Workflows",
      subsection: "Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-024 Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `"standard"`.');
    }


    // This test validates: Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `"standard"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: completedAt for each session falls back to startedAttoISOString when completedAt', async ({ page }) => {
    // Checkpoint 25: `completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.
    // Section: Quick Test Workflows > Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.",
      section: "Quick Test Workflows",
      subsection: "Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-025 `completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.');
    }


    // This test validates: `completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Unexpected errors return 500 error Failed to fetch sessions', async ({ page }) => {
    // Checkpoint 26: Unexpected errors return `500 { "error": "Failed to fetch sessions" }`.
    // Section: Quick Test Workflows > Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Unexpected errors return `500 { \"error\": \"Failed to fetch sessions\" }`.",
      section: "Quick Test Workflows",
      subsection: "Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-026 Unexpected errors return `500 { "error": "Failed to fetch sessions" }`.');
    }


    // This test validates: Unexpected errors return `500 { "error": "Failed to fetch sessions" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Auth failure returns 401 error Not authenticated the client handles 401 silently', async ({ page }) => {
    // Checkpoint 27: Auth failure returns `401 { "error": "Not authenticated" }` (the client handles 401 silently by hiding the section).
    // Section: Quick Test Workflows > Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Auth failure returns `401 { \"error\": \"Not authenticated\" }` (the client handles 401 silently by hiding the section).",
      section: "Quick Test Workflows",
      subsection: "Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-027 Auth failure returns `401 { "error": "Not authenticated" }` (the client handles 401 silently by hiding the section).');
    }


    // This test validates: Auth failure returns `401 { "error": "Not authenticated" }` (the client handles 401 silently by hiding the section).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Mode defaults to standard when researchPlanmode is absent from the stored JSON', async ({ page }) => {
    // Checkpoint 28: Mode defaults to `"standard"` when `researchPlan.mode` is absent from the stored JSON.
    // Section: Quick Test Workflows > Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Mode defaults to `\"standard\"` when `researchPlan.mode` is absent from the stored JSON.",
      section: "Quick Test Workflows",
      subsection: "Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-028 Mode defaults to `"standard"` when `researchPlan.mode` is absent from the stored JSON.');
    }


    // This test validates: Mode defaults to `"standard"` when `researchPlan.mode` is absent from the stored JSON.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: markdownReport defaults to sessionfinalReport an empty string not nullundefined', async ({ page }) => {
    // Checkpoint 29: `markdownReport` defaults to `session.finalReport || ""` — an empty string, not null/undefined.
    // Section: Quick Test Workflows > Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`markdownReport` defaults to `session.finalReport || \"\"` — an empty string, not null/undefined.",
      section: "Quick Test Workflows",
      subsection: "Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-029 `markdownReport` defaults to `session.finalReport || ""` — an empty string, not null/undefined.');
    }


    // This test validates: `markdownReport` defaults to `session.finalReport || ""` — an empty string, not null/undefined.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Unexpected errors return 500 error Failed to fetch session', async ({ page }) => {
    // Checkpoint 30: Unexpected errors return `500 { "error": "Failed to fetch session" }`.
    // Section: Quick Test Workflows > Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Unexpected errors return `500 { \"error\": \"Failed to fetch session\" }`.",
      section: "Quick Test Workflows",
      subsection: "Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-030 Unexpected errors return `500 { "error": "Failed to fetch session" }`.');
    }


    // This test validates: Unexpected errors return `500 { "error": "Failed to fetch session" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Auth failure returns 401 error Not authenticated', async ({ page }) => {
    // Checkpoint 31: Auth failure returns `401 { "error": "Not authenticated" }`.
    // Section: Quick Test Workflows > Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Auth failure returns `401 { \"error\": \"Not authenticated\" }`.",
      section: "Quick Test Workflows",
      subsection: "Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-031 Auth failure returns `401 { "error": "Not authenticated" }`.');
    }


    // This test validates: Auth failure returns `401 { "error": "Not authenticated" }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Project title format Literature Review topic with topic truncated to 77 chars wh', async ({ page }) => {
    // Checkpoint 32: Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `"..."` when `topic.length > 80`.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `\"...\"` when `topic.length > 80`.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-032 Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `"..."` when `topic.length > 80`.');
    }


    // This test validates: Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `"..."` when `topic.length > 80`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Project description Deep research report on topic', async ({ page }) => {
    // Checkpoint 33: Project description: `Deep research report on: {topic}`.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Project description: `Deep research report on: {topic}`.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-033 Project description: `Deep research report on: {topic}`.');
    }


    // This test validates: Project description: `Deep research report on: {topic}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Document title is the same truncated string as the project title', async ({ page }) => {
    // Checkpoint 34: Document title is the same truncated string as the project title.
    // Section: Quick Test Workflows > Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Document title is the same truncated string as the project title.",
      section: "Quick Test Workflows",
      subsection: "Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-034 Document title is the same truncated string as the project title.');
    }


    // This test validates: Document title is the same truncated string as the project title.
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
