/**
 * Auto-generated Playwright test for analysis/spec-007
 * Source: e2e/specs/analysis/spec-007.md
 * Generated: 2026-03-14T12:57:38.017Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts analysis spec-007
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';










import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';









test.describe('analysis / spec-007', () => {
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

  test('cp-000: Results write-good issue cards show uppercase type labels', async ({ page }) => {
    // Checkpoint 0: Results write-good issue cards show uppercase type labels
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results write-good issue cards show uppercase type labels",
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
      throw new Error('Unhandled analysis checkpoint: cp-000 Results write-good issue cards show uppercase type labels');
    }


    // This test validates: Results write-good issue cards show uppercase type labels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Results write-good issue cards display the issue reason text only', async ({ page }) => {
    // Checkpoint 1: Results write-good issue cards display the issue reason text only
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results write-good issue cards display the issue reason text only",
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
      throw new Error('Unhandled analysis checkpoint: cp-001 Results write-good issue cards display the issue reason text only');
    }


    // This test validates: Results write-good issue cards display the issue reason text only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Plagiarism Indicators section renders only when resultplagiarismIndicatorslength', async ({ page }) => {
    // Checkpoint 2: Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`",
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
      throw new Error('Unhandled analysis checkpoint: cp-002 Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`');
    }


    // This test validates: Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: High-severity plagiarism cards use red textbackground styling', async ({ page }) => {
    // Checkpoint 3: High-severity plagiarism cards use red text/background styling
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "High-severity plagiarism cards use red text/background styling",
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
      throw new Error('Unhandled analysis checkpoint: cp-003 High-severity plagiarism cards use red text/background styling');
    }


    // This test validates: High-severity plagiarism cards use red text/background styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Medium-severity plagiarism cards use yellow textbackground styling', async ({ page }) => {
    // Checkpoint 4: Medium-severity plagiarism cards use yellow text/background styling
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Medium-severity plagiarism cards use yellow text/background styling",
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
      throw new Error('Unhandled analysis checkpoint: cp-004 Medium-severity plagiarism cards use yellow text/background styling');
    }


    // This test validates: Medium-severity plagiarism cards use yellow text/background styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Low-severity plagiarism cards use muted text on bg-surface-raised', async ({ page }) => {
    // Checkpoint 5: Low-severity plagiarism cards use muted text on `bg-surface-raised`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Low-severity plagiarism cards use muted text on `bg-surface-raised`",
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
      throw new Error('Unhandled analysis checkpoint: cp-005 Low-severity plagiarism cards use muted text on `bg-surface-raised`');
    }


    // This test validates: Low-severity plagiarism cards use muted text on `bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Plagiarism cards display uppercase SEVERITY Risk labels an italic excerpt and a ', async ({ page }) => {
    // Checkpoint 6: Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line",
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
      throw new Error('Unhandled analysis checkpoint: cp-006 Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line');
    }


    // This test validates: Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Detailed Metrics tab renders Readability Writing Quality and AI Detection sectio', async ({ page }) => {
    // Checkpoint 7: Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active",
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
      throw new Error('Unhandled analysis checkpoint: cp-007 Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active');
    }


    // This test validates: Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Readability section always shows Readability Grade', async ({ page }) => {
    // Checkpoint 8: Readability section always shows `Readability Grade`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Readability section always shows `Readability Grade`",
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
      throw new Error('Unhandled analysis checkpoint: cp-008 Readability section always shows `Readability Grade`');
    }


    // This test validates: Readability section always shows `Readability Grade`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Results readability section adds Flesch-Kincaid Grade Gunning Fog Index and Fles', async ({ page }) => {
    // Checkpoint 9: Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists",
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
      throw new Error('Unhandled analysis checkpoint: cp-009 Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists');
    }


    // This test validates: Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Results Avg Sentence Length row comes from resultwritingQualityaverageSentenceLe', async ({ page }) => {
    // Checkpoint 10: Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`",
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
      throw new Error('Unhandled analysis checkpoint: cp-010 Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`');
    }


    // This test validates: Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Writing Quality Passive Voice falls back to resultwritingQualitypassiveVoiceCoun', async ({ page }) => {
    // Checkpoint 11: Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable",
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
      throw new Error('Unhandled analysis checkpoint: cp-011 Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable');
    }


    // This test validates: Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Writing Quality Weasel Words Adverbs and Complex Sentences rows render only when', async ({ page }) => {
    // Checkpoint 12: Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists",
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
      throw new Error('Unhandled analysis checkpoint: cp-012 Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists');
    }


    // This test validates: Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: AI Detection section renders Human Score AI Score and Overall Risk as ToneBadge ', async ({ page }) => {
    // Checkpoint 13: AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows",
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
      throw new Error('Unhandled analysis checkpoint: cp-013 AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows');
    }


    // This test validates: AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Human Score uses emerald for 70 yellow for 40-69 and red below 40', async ({ page }) => {
    // Checkpoint 14: Human Score uses emerald for >= 70, yellow for 40-69, and red below 40
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Human Score uses emerald for >= 70, yellow for 40-69, and red below 40",
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
      throw new Error('Unhandled analysis checkpoint: cp-014 Human Score uses emerald for >= 70, yellow for 40-69, and red below 40');
    }


    // This test validates: Human Score uses emerald for >= 70, yellow for 40-69, and red below 40
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: AI Score uses emerald for 30 yellow for 31-60 and red above 60', async ({ page }) => {
    // Checkpoint 15: AI Score uses emerald for <= 30, yellow for 31-60, and red above 60
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "AI Score uses emerald for <= 30, yellow for 31-60, and red above 60",
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
      throw new Error('Unhandled analysis checkpoint: cp-015 AI Score uses emerald for <= 30, yellow for 31-60, and red above 60');
    }


    // This test validates: AI Score uses emerald for <= 30, yellow for 31-60, and red above 60
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Overall Risk uses low - emerald medium - yellow and high - red', async ({ page }) => {
    // Checkpoint 16: Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`",
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
      throw new Error('Unhandled analysis checkpoint: cp-016 Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`');
    }


    // This test validates: Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Paragraph Breakdown section renders only when resultparagraphAnalysislength 0', async ({ page }) => {
    // Checkpoint 17: Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-017 Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`');
    }


    // This test validates: Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Paragraph Breakdown rows display Paragraph n on the left and humanProbability hu', async ({ page }) => {
    // Checkpoint 18: Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-018 Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right');
    }


    // This test validates: Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: MetricBar caps bar fill width at 100 with Mathminvalue max 100 100', async ({ page }) => {
    // Checkpoint 19: `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-019 `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`');
    }


    // This test validates: `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: MetricBar appends suffix text such as words instances or sentences in the value ', async ({ page }) => {
    // Checkpoint 20: `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-020 `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided');
    }


    // This test validates: `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: IssueBadge color map is yellow orange blue and red', async ({ page }) => {
    // Checkpoint 21: `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-021 `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`');
    }


    // This test validates: `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: CircularGauge color thresholds are green 80 yellow 60 orange 40 and red below 40', async ({ page }) => {
    // Checkpoint 22: `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "`CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-022 `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40');
    }


    // This test validates: `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Results gauge readability label uses Excellent Good Needs Improvement and Poor', async ({ page }) => {
    // Checkpoint 23: Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-023 Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`');
    }


    // This test validates: Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Instant gauge readability label uses the analyzeWriting labels not the results-g', async ({ page }) => {
    // Checkpoint 24: Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-024 Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels');
    }


    // This test validates: Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: When statsavgSentenceLength 28 the API returns the suggestion Your average sente', async ({ page }) => {
    // Checkpoint 25: When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.avgSentenceLength > 28`, the API returns the suggestion: \"Your average sentence length is high. Consider breaking long sentences for readability.\" (~line 129)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-025 When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)');
    }


    // This test validates: When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: When statssentenceLengthStdDev 3 the API returns Your sentence lengths are very ', async ({ page }) => {
    // Checkpoint 26: When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.sentenceLengthStdDev < 3`, the API returns: \"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure.\" (~line 133)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-026 When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)');
    }


    // This test validates: When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: When statspassiveVoicePercent 30 the API returns N of sentences use passive voic', async ({ page }) => {
    // Checkpoint 27: When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.passiveVoicePercent > 30`, the API returns: \"{N}% of sentences use passive voice. Consider using more active voice.\" where N is `Math.round(passiveVoicePercent)` (~line 139)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-027 When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)');
    }


    // This test validates: When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: When statstypeTokenRatio 035 and 0 the API returns Vocabulary diversity is low U', async ({ page }) => {
    // Checkpoint 28: When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: \"Vocabulary diversity is low. Use more varied word choices to strengthen your writing.\" (~line 144)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-028 When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)');
    }


    // This test validates: When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: When statshedgingPhraseCount 5 the API returns Found N hedging phrases eg It is ', async ({ page }) => {
    // Checkpoint 29: When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.hedgingPhraseCount > 5`, the API returns: \"Found {N} hedging phrases (e.g. \\\"It is important to note\\\"). These are common in AI-generated text — consider being more direct.\" (~line 149)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-029 When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)');
    }


    // This test validates: When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: When statsreadabilityGrade 16 the API returns Readability grade is above 16 post', async ({ page }) => {
    // Checkpoint 30: When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When `stats.readabilityGrade > 16`, the API returns: \"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility.\" (~line 154)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-030 When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)');
    }


    // This test validates: When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: When none of the above conditions fire the suggestions array is empty and the Is', async ({ page }) => {
    // Checkpoint 31: When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)
    // Section: Quick Test Workflows > `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the \"No issues detected\" message (~line 124-159)",
      section: "Quick Test Workflows",
      subsection: "`src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-031 When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)');
    }


    // This test validates: When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: 401 response body is error Not authenticated line 47', async ({ page }) => {
    // Checkpoint 32: 401 response body is `{ error: "Not authenticated" }` (~line 47)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "401 response body is `{ error: \"Not authenticated\" }` (~line 47)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-032 401 response body is `{ error: "Not authenticated" }` (~line 47)');
    }


    // This test validates: 401 response body is `{ error: "Not authenticated" }` (~line 47)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: 400 response body is error Invalid request details fieldErrors where details com', async ({ page }) => {
    // Checkpoint 33: 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "400 response body is `{ error: \"Invalid request\", details: <fieldErrors> }` where details come from Zod validation (~line 72)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-033 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)');
    }


    // This test validates: 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: 503 when AI is not configured returns error AI service is not configured line 62', async ({ page }) => {
    // Checkpoint 34: 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)
    // Section: Quick Test Workflows > `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "503 when AI is not configured returns `{ error: \"AI service is not configured.\" }` (~line 62)",
      section: "Quick Test Workflows",
      subsection: "`src/app/api/integrity-check/route.ts` — Error Responses (exact text)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-034 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)');
    }


    // This test validates: 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)
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
