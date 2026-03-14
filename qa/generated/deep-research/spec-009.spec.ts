/**
 * Auto-generated Playwright test for deep-research/spec-009
 * Source: e2e/specs/deep-research/spec-009.md
 * Generated: 2026-03-14T10:16:06.231Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts deep-research spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';











import { assertDeepResearchCheckpoint } from '../../module-assertions/deep-research';








test.describe('deep-research / spec-009', () => {
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

  test('cp-000: The shared SSE reader only processes lines that start with data', async ({ page }) => {
    // Checkpoint 0: The shared SSE reader only processes lines that start with `data: `.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The shared SSE reader only processes lines that start with `data: `.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-000 ' + "The shared SSE reader only processes lines that start with `data: `.");
    }


    // This test validates: The shared SSE reader only processes lines that start with `data: `.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: The shared SSE reader ignores empty SSE payloads and the literal payload DONE', async ({ page }) => {
    // Checkpoint 1: The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-001 ' + "The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.");
    }


    // This test validates: The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: The shared SSE reader recognizes progress perspectives section report and error ', async ({ page }) => {
    // Checkpoint 2: The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-002 ' + "The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.");
    }


    // This test validates: The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: The shared SSE reader swallows JSON SyntaxErrors and continues reading the strea', async ({ page }) => {
    // Checkpoint 3: The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-003 ' + "The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.");
    }


    // This test validates: The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: The handlersonError callback exists in the reader signature but is never invoked', async ({ page }) => {
    // Checkpoint 4: The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-004 ' + "The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.");
    }


    // This test validates: The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: executeResearch resets error null report null streamingSections seenStageIdsRefc', async ({ page }) => {
    // Checkpoint 5: `executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = "Starting research..."`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = \"Starting research...\"`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-005 ' + "`executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = \"Starting research...\"`.");
    }


    // This test validates: `executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = "Starting research..."`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: executeResearch posts POST apideep-researchexecute with JSON topic topictrim mod', async ({ page }) => {
    // Checkpoint 6: `executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-006 ' + "`executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.");
    }


    // This test validates: `executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: A non-OK execute response becomes dataerror or Research failed status', async ({ page }) => {
    // Checkpoint 7: A non-OK execute response becomes `data.error` or `Research failed ({status})`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "A non-OK execute response becomes `data.error` or `Research failed ({status})`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-007 ' + "A non-OK execute response becomes `data.error` or `Research failed ({status})`.");
    }


    // This test validates: A non-OK execute response becomes `data.error` or `Research failed ({status})`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Execute-phase onProgress updates progressMessage on every server progress event', async ({ page }) => {
    // Checkpoint 8: Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-008 ' + "Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.");
    }


    // This test validates: Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Execute-phase onProgress updates progressPercent only when the incoming progress', async ({ page }) => {
    // Checkpoint 9: Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-009 ' + "Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.");
    }


    // This test validates: Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: The current execute route never sends a numeric progress field so progressPercen', async ({ page }) => {
    // Checkpoint 10: The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-010 ' + "The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.");
    }


    // This test validates: The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Because the running-state progress bar only renders when progress 0 the percenta', async ({ page }) => {
    // Checkpoint 11: Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-011 ' + "Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.");
    }


    // This test validates: Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Stage completion is tracked by pushing the previously active stage into seenStag', async ({ page }) => {
    // Checkpoint 12: Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-012 ' + "Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.");
    }


    // This test validates: Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: The report SSE event sets report sets pageState done sets progressPercent 100 an', async ({ page }) => {
    // Checkpoint 13: The `report` SSE event sets `report`, sets `pageState = "done"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The `report` SSE event sets `report`, sets `pageState = \"done\"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-013 ' + "The `report` SSE event sets `report`, sets `pageState = \"done\"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.");
    }


    // This test validates: The `report` SSE event sets `report`, sets `pageState = "done"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: After the stream closes the page still runs setPageStateprev prev running done p', async ({ page }) => {
    // Checkpoint 14: After the stream closes, the page still runs `setPageState(prev => prev === "running" ? "done" : prev)` as a fallback.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "After the stream closes, the page still runs `setPageState(prev => prev === \"running\" ? \"done\" : prev)` as a fallback.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-014 ' + "After the stream closes, the page still runs `setPageState(prev => prev === \"running\" ? \"done\" : prev)` as a fallback.");
    }


    // This test validates: After the stream closes, the page still runs `setPageState(prev => prev === "running" ? "done" : prev)` as a fallback.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: The red header action during plan-preview and running is labeled exactly Stop', async ({ page }) => {
    // Checkpoint 15: The red header action during plan-preview and running is labeled exactly `Stop`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The red header action during plan-preview and running is labeled exactly `Stop`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-015 ' + "The red header action during plan-preview and running is labeled exactly `Stop`.");
    }


    // This test validates: The red header action during plan-preview and running is labeled exactly `Stop`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: handleAbort aborts the current controller if present clears planPerspectives and', async ({ page }) => {
    // Checkpoint 16: `handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = "idle"`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = \"idle\"`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-016 ' + "`handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = \"idle\"`.");
    }


    // This test validates: `handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = "idle"`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: handleAbort does not clear topic mode report progressStages progressPercent prog', async ({ page }) => {
    // Checkpoint 17: `handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-017 ' + "`handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.");
    }


    // This test validates: `handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: An aborted plan or execute request returns the page to idle without entering the', async ({ page }) => {
    // Checkpoint 18: An aborted plan or execute request returns the page to `idle` without entering the error view.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "An aborted plan or execute request returns the page to `idle` without entering the error view.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-018 ' + "An aborted plan or execute request returns the page to `idle` without entering the error view.");
    }


    // This test validates: An aborted plan or execute request returns the page to `idle` without entering the error view.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: The running-state fallback line is exactly Researching topic', async ({ page }) => {
    // Checkpoint 19: The running-state fallback line is exactly `Researching: {topic}`.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The running-state fallback line is exactly `Researching: {topic}`.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-019 ' + "The running-state fallback line is exactly `Researching: {topic}`.");
    }


    // This test validates: The running-state fallback line is exactly `Researching: {topic}`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: The running-state microscope icon uses animate-pulse not a spinning rotation cla', async ({ page }) => {
    // Checkpoint 20: The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.
    // Section: Quick Test Workflows > Research Execution and SSE

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.",
      section: "Quick Test Workflows",
      subsection: "Research Execution and SSE",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-020 ' + "The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.");
    }


    // This test validates: The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: ProgressStepper only renders the progress-bar block when typeof progress number ', async ({ page }) => {
    // Checkpoint 21: `ProgressStepper` only renders the progress-bar block when `typeof progress === "number" && progress > 0`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`ProgressStepper` only renders the progress-bar block when `typeof progress === \"number\" && progress > 0`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-021 ' + "`ProgressStepper` only renders the progress-bar block when `typeof progress === \"number\" && progress > 0`.");
    }


    // This test validates: `ProgressStepper` only renders the progress-bar block when `typeof progress === "number" && progress > 0`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: The progress-bar label is exactly Progress', async ({ page }) => {
    // Checkpoint 22: The progress-bar label is exactly `Progress`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The progress-bar label is exactly `Progress`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-022 ' + "The progress-bar label is exactly `Progress`.");
    }


    // This test validates: The progress-bar label is exactly `Progress`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: The progress-bar percentage text is Mathroundprogress', async ({ page }) => {
    // Checkpoint 23: The progress-bar percentage text is `Math.round(progress)%`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The progress-bar percentage text is `Math.round(progress)%`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-023 ' + "The progress-bar percentage text is `Math.round(progress)%`.");
    }


    // This test validates: The progress-bar percentage text is `Math.round(progress)%`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: The completed-stage icon is CheckCircle2 with class text-blue-400', async ({ page }) => {
    // Checkpoint 24: The completed-stage icon is `CheckCircle2` with class `text-blue-400`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The completed-stage icon is `CheckCircle2` with class `text-blue-400`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-024 ' + "The completed-stage icon is `CheckCircle2` with class `text-blue-400`.");
    }


    // This test validates: The completed-stage icon is `CheckCircle2` with class `text-blue-400`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: The active-stage icon is Loader2 with animate-spin', async ({ page }) => {
    // Checkpoint 25: The active-stage icon is `Loader2` with `animate-spin`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The active-stage icon is `Loader2` with `animate-spin`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-025 ' + "The active-stage icon is `Loader2` with `animate-spin`.");
    }


    // This test validates: The active-stage icon is `Loader2` with `animate-spin`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: The pending-stage icon is Circle', async ({ page }) => {
    // Checkpoint 26: The pending-stage icon is `Circle`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The pending-stage icon is `Circle`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-026 ' + "The pending-stage icon is `Circle`.");
    }


    // This test validates: The pending-stage icon is `Circle`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: ProgressStagestatus includes an error variant but buildStagesFromEvents never re', async ({ page }) => {
    // Checkpoint 27: `ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-027 ' + "`ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.");
    }


    // This test validates: `ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: STAGE_LABELS maps the visible labels exactly to Searching papers Traversing cita', async ({ page }) => {
    // Checkpoint 28: `STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.
    // Section: Quick Test Workflows > Progress Stepper

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.",
      section: "Quick Test Workflows",
      subsection: "Progress Stepper",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-028 ' + "`STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.");
    }


    // This test validates: `STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: The done-state metadata line renders reportmode mode reporttotalSources sources ', async ({ page }) => {
    // Checkpoint 29: The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-029 ' + "The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.");
    }


    // This test validates: The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: The page chooses ResearchDocument only when report has a truthy markdownReport o', async ({ page }) => {
    // Checkpoint 30: The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-030 ' + "The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.");
    }


    // This test validates: The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: The done-state reset button label is exactly Start New Research', async ({ page }) => {
    // Checkpoint 31: The done-state reset button label is exactly `Start New Research`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The done-state reset button label is exactly `Start New Research`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-031 ' + "The done-state reset button label is exactly `Start New Research`.");
    }


    // This test validates: The done-state reset button label is exactly `Start New Research`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Start New Research sets pageState idle report null streamingSections progressSta', async ({ page }) => {
    // Checkpoint 32: `Start New Research` sets `pageState = "idle"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = ""`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`Start New Research` sets `pageState = \"idle\"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = \"\"`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-032 ' + "`Start New Research` sets `pageState = \"idle\"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = \"\"`.");
    }


    // This test validates: `Start New Research` sets `pageState = "idle"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = ""`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Start New Research does not reset mode progressMessage progressPercent or error', async ({ page }) => {
    // Checkpoint 33: `Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "`Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-033 ' + "`Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.");
    }


    // This test validates: `Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: The error-state title is exactly Research Failed', async ({ page }) => {
    // Checkpoint 34: The error-state title is exactly `Research Failed`.
    // Section: Quick Test Workflows > Done State, Error State, and Session Resume

    // Navigate to the page
    await page.goto('/deep-research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/deep-research/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertDeepResearchCheckpoint({
      page,
      description: "The error-state title is exactly `Research Failed`.",
      section: "Quick Test Workflows",
      subsection: "Done State, Error State, and Session Resume",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled deep-research checkpoint: cp-034 ' + "The error-state title is exactly `Research Failed`.");
    }


    // This test validates: The error-state title is exactly `Research Failed`.
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
