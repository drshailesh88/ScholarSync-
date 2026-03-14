/**
 * Auto-generated Playwright test for systematic-review/spec-032
 * Source: e2e/specs/systematic-review/spec-032.md
 * Generated: 2026-03-14T10:25:34.623Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts systematic-review spec-032
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

















import { assertSystematicReviewCheckpoint } from '../../module-assertions/systematic-review';


test.describe('systematic-review / spec-032', () => {
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

  test('cp-000: Activity feed entry ID format activity-timestamp-incrementingCounter', async ({ page }) => {
    // Checkpoint 0: Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`
    // Section: Quick Test Workflows > Liveblocks Configuration Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`",
      section: "Quick Test Workflows",
      subsection: "Liveblocks Configuration Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-000 ' + "Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`");
    }


    // This test validates: Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: clearProject also resets criteria to type inclusion description screeningResults', async ({ page }) => {
    // Checkpoint 1: `clearProject()` also resets `criteria` to `[{ type: "inclusion", description: "" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`
    // Section: Quick Test Workflows > Zustand Store — Additional Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`clearProject()` also resets `criteria` to `[{ type: \"inclusion\", description: \"\" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-001 ' + "`clearProject()` also resets `criteria` to `[{ type: \"inclusion\", description: \"\" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`");
    }


    // This test validates: `clearProject()` also resets `criteria` to `[{ type: "inclusion", description: "" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: setProject sets reviewStage from config pico from configpico falls back to DEFAU', async ({ page }) => {
    // Checkpoint 2: `setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`
    // Section: Quick Test Workflows > Zustand Store — Additional Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-002 ' + "`setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`");
    }


    // This test validates: `setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: WorkflowTab union type includes both rob2 and rob as valid tab keys', async ({ page }) => {
    // Checkpoint 3: `WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys
    // Section: Quick Test Workflows > Zustand Store — Additional Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "`WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-003 ' + "`WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys");
    }


    // This test validates: `WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Store persistence keeps only projectId projectTitle activeTab reviewStage and pi', async ({ page }) => {
    // Checkpoint 4: Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset
    // Section: Quick Test Workflows > Zustand Store — Additional Details

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-004 ' + "Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset");
    }


    // This test validates: Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Shared Tabs renders plain button elements with no roletablist roletab aria-selec', async ({ page }) => {
    // Checkpoint 5: Shared `Tabs` renders plain `<button>` elements with no `role="tablist"`, `role="tab"`, `aria-selected`, or arrow-key handlers in the current workflow shell
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Shared `Tabs` renders plain `<button>` elements with no `role=\"tablist\"`, `role=\"tab\"`, `aria-selected`, or arrow-key handlers in the current workflow shell",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-005 ' + "Shared `Tabs` renders plain `<button>` elements with no `role=\"tablist\"`, `role=\"tab\"`, `aria-selected`, or arrow-key handlers in the current workflow shell");
    }


    // This test validates: Shared `Tabs` renders plain `<button>` elements with no `role="tablist"`, `role="tab"`, `aria-selected`, or arrow-key handlers in the current workflow shell
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: The inner workflow-page useEffect still contains an isNaNprojectId redirect bran', async ({ page }) => {
    // Checkpoint 6: The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-006 ' + "The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run");
    }


    // This test validates: The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Screening PDF viewer chunk loading uses fetchapisystematic-reviewpaper-chunks in', async ({ page }) => {
    // Checkpoint 7: Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-007 ' + "Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard");
    }


    // This test validates: Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Screening PDF viewer active-chunk clearing uses a bare setTimeout setActiveChunk', async ({ page }) => {
    // Checkpoint 8: Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-008 ' + "Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts");
    }


    // This test validates: Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Screening panel best-effort PDF hydration calls apisystematic-reviewpaper-pdfpap', async ({ page }) => {
    // Checkpoint 9: Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-009 ' + "Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree");
    }


    // This test validates: Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Screening PDF viewer fetches apisystematic-reviewpaper-chunkspaperIdpaperIdproje', async ({ page }) => {
    // Checkpoint 10: Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-010 ' + "Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree");
    }


    // This test validates: Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Screening PDF viewer resolves stored PDFs through apipdfservepathencodedPath but', async ({ page }) => {
    // Checkpoint 11: Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-011 ' + "Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree");
    }


    // This test validates: Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Screening PDF viewer keeps the hard-coded w-70 w-30 split at all breakpoints the', async ({ page }) => {
    // Checkpoint 12: Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-012 ' + "Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout");
    }


    // This test validates: Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Activity feed openclose behavior has no explicit focus management or focus resto', async ({ page }) => {
    // Checkpoint 13: Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-013 ' + "Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button");
    }


    // This test validates: Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Route error recovery delegates only to ErrorDisplays retry callback it does not ', async ({ page }) => {
    // Checkpoint 14: Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/systematic-review', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/systematic-review/spec-032');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSystematicReviewCheckpoint({
      page,
      description: "Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled systematic-review checkpoint: cp-014 ' + "Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page");
    }


    // This test validates: Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page
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
