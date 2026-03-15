/**
 * Auto-generated Playwright test for analysis/spec-009
 * Source: e2e/specs/analysis/spec-009.md
 * Generated: 2026-03-14T20:47:34.609Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts analysis spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';










import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';









test.describe('analysis / spec-009', () => {
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

  test('cp-000: Scholarly API searches have a 12-second abort timeout line 547', async ({ page }) => {
    // Checkpoint 0: Scholarly API searches have a 12-second abort timeout (~line 547)
    // Section: Quick Test Workflows > `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Scholarly API searches have a 12-second abort timeout (~line 547)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-000 Scholarly API searches have a 12-second abort timeout (~line 547)');
    }


    // This test validates: Scholarly API searches have a 12-second abort timeout (~line 547)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Paragraph excerpts in plagiarism results are truncated to 120 characters with su', async ({ page }) => {
    // Checkpoint 1: Paragraph excerpts in plagiarism results are truncated to 120 characters with "..." suffix (~line 540-541)
    // Section: Quick Test Workflows > `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paragraph excerpts in plagiarism results are truncated to 120 characters with \"...\" suffix (~line 540-541)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-001 Paragraph excerpts in plagiarism results are truncated to 120 characters with "..." suffix (~line 540-541)');
    }


    // This test validates: Paragraph excerpts in plagiarism results are truncated to 120 characters with "..." suffix (~line 540-541)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Gauge SVG stroke width is 10 pixels line 26', async ({ page }) => {
    // Checkpoint 2: Gauge SVG stroke width is 10 pixels (~line 26)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Gauge SVG stroke width is 10 pixels (~line 26)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-002 Gauge SVG stroke width is 10 pixels (~line 26)');
    }


    // This test validates: Gauge SVG stroke width is 10 pixels (~line 26)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Gauge SVG is rotated with -rotate-90 class so arc starts at 12 oclock position l', async ({ page }) => {
    // Checkpoint 3: Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o'clock position (~line 38)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o'clock position (~line 38)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-003 Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o\'clock position (~line 38)');
    }


    // This test validates: Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o'clock position (~line 38)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Active arc uses strokeLinecapround for rounded ends line 55', async ({ page }) => {
    // Checkpoint 4: Active arc uses `strokeLinecap="round"` for rounded ends (~line 55)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Active arc uses `strokeLinecap=\"round\"` for rounded ends (~line 55)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-004 Active arc uses `strokeLinecap="round"` for rounded ends (~line 55)');
    }


    // This test validates: Active arc uses `strokeLinecap="round"` for rounded ends (~line 55)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Arc fill animates with transition-all duration-1000 line 58', async ({ page }) => {
    // Checkpoint 5: Arc fill animates with `transition-all duration-1000` (~line 58)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Arc fill animates with `transition-all duration-1000` (~line 58)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-005 Arc fill animates with `transition-all duration-1000` (~line 58)');
    }


    // This test validates: Arc fill animates with `transition-all duration-1000` (~line 58)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Gauge color hex values green 22c55e 80 yellow eab308 60 orange f97316 40 red ef4', async ({ page }) => {
    // Checkpoint 6: Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-006 Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)');
    }


    // This test validates: Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Center value text uses text-2xl font-bold text-ink line 62', async ({ page }) => {
    // Checkpoint 7: Center value text uses `text-2xl font-bold text-ink` (~line 62)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Center value text uses `text-2xl font-bold text-ink` (~line 62)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-007 Center value text uses `text-2xl font-bold text-ink` (~line 62)');
    }


    // This test validates: Center value text uses `text-2xl font-bold text-ink` (~line 62)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Label text below gauge uses text-sm font-medium text-ink-muted line 65', async ({ page }) => {
    // Checkpoint 8: Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)
    // Section: Quick Test Workflows > `src/components/ui/circular-gauge.tsx` — Implementation Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/circular-gauge.tsx` — Implementation Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-008 Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)');
    }


    // This test validates: Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Active tab button style bg-surface-raised text-ink border border-border-subtle l', async ({ page }) => {
    // Checkpoint 9: Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)
    // Section: Quick Test Workflows > `src/components/ui/tabs.tsx` — Tabs Component Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/tabs.tsx` — Tabs Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-009 Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)');
    }


    // This test validates: Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Inactive tab button style text-ink-muted hovertext-ink hoverbg-surface-raised50 ', async ({ page }) => {
    // Checkpoint 10: Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)
    // Section: Quick Test Workflows > `src/components/ui/tabs.tsx` — Tabs Component Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/tabs.tsx` — Tabs Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-010 Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)');
    }


    // This test validates: Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Active tab count badge bg-brand10 text-brand line 48', async ({ page }) => {
    // Checkpoint 11: Active tab count badge: `bg-brand/10 text-brand` (~line 48)
    // Section: Quick Test Workflows > `src/components/ui/tabs.tsx` — Tabs Component Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Active tab count badge: `bg-brand/10 text-brand` (~line 48)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/tabs.tsx` — Tabs Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-011 Active tab count badge: `bg-brand/10 text-brand` (~line 48)');
    }


    // This test validates: Active tab count badge: `bg-brand/10 text-brand` (~line 48)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Inactive tab count badge bg-surface-raised text-ink-muted line 49', async ({ page }) => {
    // Checkpoint 12: Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)
    // Section: Quick Test Workflows > `src/components/ui/tabs.tsx` — Tabs Component Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/tabs.tsx` — Tabs Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-012 Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)');
    }


    // This test validates: Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Count badge is rendered only when tabcount undefined line 41', async ({ page }) => {
    // Checkpoint 13: Count badge is rendered only when `tab.count !== undefined` (~line 41)
    // Section: Quick Test Workflows > `src/components/ui/tabs.tsx` — Tabs Component Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Count badge is rendered only when `tab.count !== undefined` (~line 41)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/tabs.tsx` — Tabs Component Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-013 Count badge is rendered only when `tab.count !== undefined` (~line 41)');
    }


    // This test validates: Count badge is rendered only when `tab.count !== undefined` (~line 41)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Error page reports errors to Sentry via SentrycaptureExceptionerror in a useEffe', async ({ page }) => {
    // Checkpoint 14: Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)
    // Section: Quick Test Workflows > `src/components/ui/error-display.tsx` — Error Page Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/error-display.tsx` — Error Page Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-014 Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)');
    }


    // This test validates: Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Error page displays a WarningCircle icon size 32 inside a red-tinted rounded con', async ({ page }) => {
    // Checkpoint 15: Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)
    // Section: Quick Test Workflows > `src/components/ui/error-display.tsx` — Error Page Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/error-display.tsx` — Error Page Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-015 Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)');
    }


    // This test validates: Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Retry button text is Try Again with an ArrowCounterClockwise icon size 16 line 4', async ({ page }) => {
    // Checkpoint 16: Retry button text is "Try Again" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)
    // Section: Quick Test Workflows > `src/components/ui/error-display.tsx` — Error Page Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Retry button text is \"Try Again\" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)",
      section: "Quick Test Workflows",
      subsection: "`src/components/ui/error-display.tsx` — Error Page Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-016 Retry button text is "Try Again" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)');
    }


    // This test validates: Retry button text is "Try Again" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Loading skeleton renders exactly 4 Skeleton elements back-button placeholder h-8', async ({ page }) => {
    // Checkpoint 17: Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-017 Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)');
    }


    // This test validates: Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Loading skeleton mirrors the page layout height h-calc100vh-7rem line 5', async ({ page }) => {
    // Checkpoint 18: Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-018 Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)');
    }


    // This test validates: Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Page container uses h-calc100vh-7rem for viewport height minus header line 203', async ({ page }) => {
    // Checkpoint 19: Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-019 Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)');
    }


    // This test validates: Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Analyze button uses rounded-xl px-6 py-3 not rounded-lg line 344', async ({ page }) => {
    // Checkpoint 20: Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-020 Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)');
    }


    // This test validates: Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Legend swatches in results mode use w-3 h-3 rounded with both bg-color-50030 AND', async ({ page }) => {
    // Checkpoint 21: Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-021 Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)');
    }


    // This test validates: Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Results-mode reset button text is Analyze New Text using larr HTML entity not Ba', async ({ page }) => {
    // Checkpoint 22: Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not "Back to Analyze New Text" (~line 464)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not \"Back to Analyze New Text\" (~line 464)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-022 Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not "Back to Analyze New Text" (~line 464)');
    }


    // This test validates: Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not "Back to Analyze New Text" (~line 464)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Results-mode reset button is styled as text link text-xs text-brand hovertext-br', async ({ page }) => {
    // Checkpoint 23: Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-023 Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)');
    }


    // This test validates: Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Results gauge value comes from resultwritingQualityreadabilityGrade APIs Flesch-', async ({ page }) => {
    // Checkpoint 24: Results gauge value comes from `result.writingQuality.readabilityGrade` (API's Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results gauge value comes from `result.writingQuality.readabilityGrade` (API's Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-024 Results gauge value comes from `result.writingQuality.readabilityGrade` (API\'s Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)');
    }


    // This test validates: Results gauge value comes from `result.writingQuality.readabilityGrade` (API's Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Results-mode Writing Quality Passive Voice MetricBar uses dynamic max Mathmaxval', async ({ page }) => {
    // Checkpoint 25: Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-025 Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)');
    }


    // This test validates: Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Results-mode Weasel Words and Adverbs MetricBars use dynamic max Mathmaxvalue 10', async ({ page }) => {
    // Checkpoint 26: Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-026 Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)');
    }


    // This test validates: Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Results-mode Complex Sentences MetricBar uses dynamic max Mathmaxvalue 5 line 69', async ({ page }) => {
    // Checkpoint 27: Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-027 Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)');
    }


    // This test validates: Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Results-mode Readability Grade MetricBar has max of 100 line 642', async ({ page }) => {
    // Checkpoint 28: Results-mode Readability Grade MetricBar has max of `100` (~line 642)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode Readability Grade MetricBar has max of `100` (~line 642)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-028 Results-mode Readability Grade MetricBar has max of `100` (~line 642)');
    }


    // This test validates: Results-mode Readability Grade MetricBar has max of `100` (~line 642)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Results-mode Overall Risk is capitalized from raw value resultoverallRiskcharAt0', async ({ page }) => {
    // Checkpoint 29: Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays "Low", "Medium", or "High" (~line 723)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays \"Low\", \"Medium\", or \"High\" (~line 723)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-029 Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays "Low", "Medium", or "High" (~line 723)');
    }


    // This test validates: Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays "Low", "Medium", or "High" (~line 723)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Paragraph breakdown score pills use px-2 py-05 rounded-full text-xs font-medium ', async ({ page }) => {
    // Checkpoint 30: Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-030 Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)');
    }


    // This test validates: Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Plagiarism indicator cards include a Sparkle icon before the severity label usin', async ({ page }) => {
    // Checkpoint 31: Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-031 Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)');
    }


    // This test validates: Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Plagiarism indicator concern line is plain text text-xs text-ink-muted line 623', async ({ page }) => {
    // Checkpoint 32: Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-032 Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)');
    }


    // This test validates: Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Issues tab count in input mode before results shows clientIssueslength when clie', async ({ page }) => {
    // Checkpoint 33: Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-033 Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)');
    }


    // This test validates: Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: ToneBadge helper renders label left colored badge right with three color options', async ({ page }) => {
    // Checkpoint 34: `ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)
    // Section: Quick Test Workflows > `src/app/(app)/analysis/page.tsx` — Additional UI Details

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)",
      section: "Quick Test Workflows",
      subsection: "`src/app/(app)/analysis/page.tsx` — Additional UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-034 `ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)');
    }


    // This test validates: `ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)
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
