/**
 * Auto-generated Playwright test for analysis/spec-002
 * Source: e2e/specs/analysis/spec-002.md
 * Generated: 2026-03-14T12:51:23.822Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts analysis spec-002
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';










import { assertAnalysisCheckpoint } from '../../module-assertions/analysis';









test.describe('analysis / spec-002', () => {
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

  test('cp-000: Active tab Tabs component applies bg-surface-raised text-ink border border-borde', async ({ page }) => {
    // Checkpoint 0: Active tab — Tabs component applies `bg-surface-raised text-ink border border-border-subtle` to the active tab key, verified in src/components/ui/tabs.tsx:35-36
    // Section: Results Mode — Issues Tab (Right Side) > Tab Header

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Active tab — Tabs component applies `bg-surface-raised text-ink border border-border-subtle` to the active tab key, verified in src/components/ui/tabs.tsx:35-36",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Tab Header",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-000 Active tab — Tabs component applies `bg-surface-raised text-ink border border-border-subtle` to the active tab key, verified in src/components/ui/tabs.tsx:35-36');
    }


    // This test validates: Active tab — Tabs component applies `bg-surface-raised text-ink border border-border-subtle` to the active tab key, verified in src/components/ui/tabs.tsx:35-36
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Styling suggestions rendered with bg-purple-50010 class and Sparkle icon size14 ', async ({ page }) => {
    // Checkpoint 1: Styling — suggestions rendered with `bg-purple-500/10` class and Sparkle icon (size=14, text-purple-500), verified in page.tsx:558-560
    // Section: Results Mode — Issues Tab (Right Side) > API Suggestions

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Styling — suggestions rendered with `bg-purple-500/10` class and Sparkle icon (size=14, text-purple-500), verified in page.tsx:558-560",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "API Suggestions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-001 Styling — suggestions rendered with `bg-purple-500/10` class and Sparkle icon (size=14, text-purple-500), verified in page.tsx:558-560');
    }


    // This test validates: Styling — suggestions rendered with `bg-purple-500/10` class and Sparkle icon (size=14, text-purple-500), verified in page.tsx:558-560
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Label each suggestion labeled Suggestion i 1 via template literal verified in pa', async ({ page }) => {
    // Checkpoint 2: Label — each suggestion labeled `Suggestion {i + 1}` via template literal, verified in page.tsx:562
    // Section: Results Mode — Issues Tab (Right Side) > API Suggestions

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Label — each suggestion labeled `Suggestion {i + 1}` via template literal, verified in page.tsx:562",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "API Suggestions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-002 Label — each suggestion labeled `Suggestion {i + 1}` via template literal, verified in page.tsx:562');
    }


    // This test validates: Label — each suggestion labeled `Suggestion {i + 1}` via template literal, verified in page.tsx:562
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Content displays AI-generated improvement suggestions from resultwritingQualitys', async ({ page }) => {
    // Checkpoint 3: Content — displays AI-generated improvement suggestions from `result.writingQuality.suggestions` array, verified in page.tsx:565
    // Section: Results Mode — Issues Tab (Right Side) > API Suggestions

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Content — displays AI-generated improvement suggestions from `result.writingQuality.suggestions` array, verified in page.tsx:565",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "API Suggestions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-003 Content — displays AI-generated improvement suggestions from `result.writingQuality.suggestions` array, verified in page.tsx:565');
    }


    // This test validates: Content — displays AI-generated improvement suggestions from `result.writingQuality.suggestions` array, verified in page.tsx:565
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Max 15 issues clientIssuesslice0 15 limits display to 15 with N more issues over', async ({ page }) => {
    // Checkpoint 4: Max 15 issues — `clientIssues.slice(0, 15)` limits display to 15, with "+N more issues" overflow text, verified in page.tsx:578,606-609
    // Section: Results Mode — Issues Tab (Right Side) > Writing Issues (from write-good)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Max 15 issues — `clientIssues.slice(0, 15)` limits display to 15, with \"+N more issues\" overflow text, verified in page.tsx:578,606-609",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Writing Issues (from write-good)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-004 Max 15 issues — `clientIssues.slice(0, 15)` limits display to 15, with "+N more issues" overflow text, verified in page.tsx:578,606-609');
    }


    // This test validates: Max 15 issues — `clientIssues.slice(0, 15)` limits display to 15, with "+N more issues" overflow text, verified in page.tsx:578,606-609
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Color coding by type passiveyellow-50010 weaselorange-50010 complexred-50010 adv', async ({ page }) => {
    // Checkpoint 5: Color coding by type — passive=yellow-500/10, weasel=orange-500/10, complex=red-500/10, adverb/readability=blue-500/10, verified in page.tsx:579-586
    // Section: Results Mode — Issues Tab (Right Side) > Writing Issues (from write-good)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Color coding by type — passive=yellow-500/10, weasel=orange-500/10, complex=red-500/10, adverb/readability=blue-500/10, verified in page.tsx:579-586",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Writing Issues (from write-good)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-005 Color coding by type — passive=yellow-500/10, weasel=orange-500/10, complex=red-500/10, adverb/readability=blue-500/10, verified in page.tsx:579-586');
    }


    // This test validates: Color coding by type — passive=yellow-500/10, weasel=orange-500/10, complex=red-500/10, adverb/readability=blue-500/10, verified in page.tsx:579-586
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Issue details shows reason and suggestion if available Fixed added conditional s', async ({ page }) => {
    // Checkpoint 6: Issue details — shows reason and suggestion (if available). Fixed: added conditional suggestion rendering below reason text. Verified in page.tsx:602-605
    // Section: Results Mode — Issues Tab (Right Side) > Writing Issues (from write-good)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Issue details — shows reason and suggestion (if available). Fixed: added conditional suggestion rendering below reason text. Verified in page.tsx:602-605",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Writing Issues (from write-good)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-006 Issue details — shows reason and suggestion (if available). Fixed: added conditional suggestion rendering below reason text. Verified in page.tsx:602-605');
    }


    // This test validates: Issue details — shows reason and suggestion (if available). Fixed: added conditional suggestion rendering below reason text. Verified in page.tsx:602-605
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Severity badges displays severitytoUpperCase Risk for each match eg HIGH Risk wi', async ({ page }) => {
    // Checkpoint 7: Severity badges — displays `{severity.toUpperCase()} Risk` for each match (e.g. "HIGH Risk"), with color-coded backgrounds. Verified in page.tsx:643
    // Section: Results Mode — Issues Tab (Right Side) > Plagiarism Indicators

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Severity badges — displays `{severity.toUpperCase()} Risk` for each match (e.g. \"HIGH Risk\"), with color-coded backgrounds. Verified in page.tsx:643",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Plagiarism Indicators",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-007 Severity badges — displays `{severity.toUpperCase()} Risk` for each match (e.g. "HIGH Risk"), with color-coded backgrounds. Verified in page.tsx:643');
    }


    // This test validates: Severity badges — displays `{severity.toUpperCase()} Risk` for each match (e.g. "HIGH Risk"), with color-coded backgrounds. Verified in page.tsx:643
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Match details shows excerpt in italics with quotes and source information title ', async ({ page }) => {
    // Checkpoint 8: Match details — shows excerpt in italics with quotes and source information (title, authors, year). Fixed: mapped PlagiarismMatch.source fields into concern string. Verified in page.tsx:646-649
    // Section: Results Mode — Issues Tab (Right Side) > Plagiarism Indicators

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Match details — shows excerpt in italics with quotes and source information (title, authors, year). Fixed: mapped PlagiarismMatch.source fields into concern string. Verified in page.tsx:646-649",
      section: "Results Mode — Issues Tab (Right Side)",
      subsection: "Plagiarism Indicators",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-008 Match details — shows excerpt in italics with quotes and source information (title, authors, year). Fixed: mapped PlagiarismMatch.source fields into concern string. Verified in page.tsx:646-649');
    }


    // This test validates: Match details — shows excerpt in italics with quotes and source information (title, authors, year). Fixed: mapped PlagiarismMatch.source fields into concern string. Verified in page.tsx:646-649
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Per-paragraph scores renders each paragraph with phumanProbability human badge v', async ({ page }) => {
    // Checkpoint 9: Per-paragraph scores — renders each paragraph with `{p.humanProbability}% human` badge via paragraphAnalysis array, verified in page.tsx:758-776
    // Section: Results Mode — Detailed Metrics Tab (Right Side) > 4. Paragraph Breakdown

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Per-paragraph scores — renders each paragraph with `{p.humanProbability}% human` badge via paragraphAnalysis array, verified in page.tsx:758-776",
      section: "Results Mode — Detailed Metrics Tab (Right Side)",
      subsection: "4. Paragraph Breakdown",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-009 Per-paragraph scores — renders each paragraph with `{p.humanProbability}% human` badge via paragraphAnalysis array, verified in page.tsx:758-776');
    }


    // This test validates: Per-paragraph scores — renders each paragraph with `{p.humanProbability}% human` badge via paragraphAnalysis array, verified in page.tsx:758-776
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Color-coded uses same thresholds 40 red-50010 40-70 yellow-50010 70 emerald-5001', async ({ page }) => {
    // Checkpoint 10: Color-coded — uses same thresholds: <40% = red-500/10, 40-70% = yellow-500/10, >70% = emerald-500/10, matching left panel's getParagraphBg(), verified in page.tsx:765-770
    // Section: Results Mode — Detailed Metrics Tab (Right Side) > 4. Paragraph Breakdown

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Color-coded — uses same thresholds: <40% = red-500/10, 40-70% = yellow-500/10, >70% = emerald-500/10, matching left panel's getParagraphBg(), verified in page.tsx:765-770",
      section: "Results Mode — Detailed Metrics Tab (Right Side)",
      subsection: "4. Paragraph Breakdown",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-010 Color-coded — uses same thresholds: <40% = red-500/10, 40-70% = yellow-500/10, >70% = emerald-500/10, matching left panel\'s getParagraphBg(), verified in page.tsx:765-770');
    }


    // This test validates: Color-coded — uses same thresholds: <40% = red-500/10, 40-70% = yellow-500/10, >70% = emerald-500/10, matching left panel's getParagraphBg(), verified in page.tsx:765-770
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: write-good imported as writeGood from write-good on line 1 used for passive voic', async ({ page }) => {
    // Checkpoint 11: write-good — imported as `writeGood` from "write-good" on line 1, used for passive voice, weasel word, adverb detection via classifyReason(). Verified in src/lib/writing-analysis.ts:1,205-228
    // Section: Writing Analysis Library > Library Dependencies

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "write-good — imported as `writeGood` from \"write-good\" on line 1, used for passive voice, weasel word, adverb detection via classifyReason(). Verified in src/lib/writing-analysis.ts:1,205-228",
      section: "Writing Analysis Library",
      subsection: "Library Dependencies",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-011 write-good — imported as `writeGood` from "write-good" on line 1, used for passive voice, weasel word, adverb detection via classifyReason(). Verified in src/lib/writing-analysis.ts:1,205-228');
    }


    // This test validates: write-good — imported as `writeGood` from "write-good" on line 1, used for passive voice, weasel word, adverb detection via classifyReason(). Verified in src/lib/writing-analysis.ts:1,205-228
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Complex sentence detection sentences with more than 35 words flagged if sentence', async ({ page }) => {
    // Checkpoint 12: Complex sentence detection — sentences with more than 35 words flagged: `if (sentenceWordCount > 35)` pushes a "complex" type issue. Verified in src/lib/writing-analysis.ts:237
    // Section: Writing Analysis Library > Library Dependencies

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Complex sentence detection — sentences with more than 35 words flagged: `if (sentenceWordCount > 35)` pushes a \"complex\" type issue. Verified in src/lib/writing-analysis.ts:237",
      section: "Writing Analysis Library",
      subsection: "Library Dependencies",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-012 Complex sentence detection — sentences with more than 35 words flagged: `if (sentenceWordCount > 35)` pushes a "complex" type issue. Verified in src/lib/writing-analysis.ts:237');
    }


    // This test validates: Complex sentence detection — sentences with more than 35 words flagged: `if (sentenceWordCount > 35)` pushes a "complex" type issue. Verified in src/lib/writing-analysis.ts:237
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Multiple readability formulas all 5 implemented Flesch Reading Ease line 170 Fle', async ({ page }) => {
    // Checkpoint 13: Multiple readability formulas — all 5 implemented: Flesch Reading Ease (line 170), Flesch-Kincaid Grade (line 182), Gunning Fog Index (line 191), Automated Readability Index (line 259), Coleman-Liau Index (line 268). Verified in src/lib/writing-analysis.ts
    // Section: Writing Analysis Library > Library Dependencies

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Multiple readability formulas — all 5 implemented: Flesch Reading Ease (line 170), Flesch-Kincaid Grade (line 182), Gunning Fog Index (line 191), Automated Readability Index (line 259), Coleman-Liau Index (line 268). Verified in src/lib/writing-analysis.ts",
      section: "Writing Analysis Library",
      subsection: "Library Dependencies",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-013 Multiple readability formulas — all 5 implemented: Flesch Reading Ease (line 170), Flesch-Kincaid Grade (line 182), Gunning Fog Index (line 191), Automated Readability Index (line 259), Coleman-Liau Index (line 268). Verified in src/lib/writing-analysis.ts');
    }


    // This test validates: Multiple readability formulas — all 5 implemented: Flesch Reading Ease (line 170), Flesch-Kincaid Grade (line 182), Gunning Fog Index (line 191), Automated Readability Index (line 259), Coleman-Liau Index (line 268). Verified in src/lib/writing-analysis.ts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Limit 20 requests per hour per user RATE_LIMITSanalysis limit 20 windowSeconds 3', async ({ page }) => {
    // Checkpoint 14: Limit — 20 requests per hour per user: `RATE_LIMITS.analysis = { limit: 20, windowSeconds: 3600 }`. Verified in src/lib/rate-limit.ts:117
    // Section: API — POST /api/integrity-check > Rate Limiting

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Limit — 20 requests per hour per user: `RATE_LIMITS.analysis = { limit: 20, windowSeconds: 3600 }`. Verified in src/lib/rate-limit.ts:117",
      section: "API — POST /api/integrity-check",
      subsection: "Rate Limiting",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-014 Limit — 20 requests per hour per user: `RATE_LIMITS.analysis = { limit: 20, windowSeconds: 3600 }`. Verified in src/lib/rate-limit.ts:117');
    }


    // This test validates: Limit — 20 requests per hour per user: `RATE_LIMITS.analysis = { limit: 20, windowSeconds: 3600 }`. Verified in src/lib/rate-limit.ts:117
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Exceeded returns 429 status via checkRateLimit which returns NextResponsejson er', async ({ page }) => {
    // Checkpoint 15: Exceeded — returns 429 status via `checkRateLimit()` which returns `NextResponse.json({ error: "Rate limit exceeded..." }, { status: 429 })`. Verified in src/lib/rate-limit.ts:80,97
    // Section: API — POST /api/integrity-check > Rate Limiting

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Exceeded — returns 429 status via `checkRateLimit()` which returns `NextResponse.json({ error: \"Rate limit exceeded...\" }, { status: 429 })`. Verified in src/lib/rate-limit.ts:80,97",
      section: "API — POST /api/integrity-check",
      subsection: "Rate Limiting",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-015 Exceeded — returns 429 status via `checkRateLimit()` which returns `NextResponse.json({ error: "Rate limit exceeded..." }, { status: 429 })`. Verified in src/lib/rate-limit.ts:80,97');
    }


    // This test validates: Exceeded — returns 429 status via `checkRateLimit()` which returns `NextResponse.json({ error: "Rate limit exceeded..." }, { status: 429 })`. Verified in src/lib/rate-limit.ts:80,97
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Model const BINOCULARS_MODEL drshailesh88binoculars-ai-detection as const Verifi', async ({ page }) => {
    // Checkpoint 16: Model — `const BINOCULARS_MODEL = "drshailesh88/binoculars-ai-detection" as const;` Verified in src/lib/integrity/ai-detection.ts:26
    // Section: AI Detection Engine > Binoculars Model

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Model — `const BINOCULARS_MODEL = \"drshailesh88/binoculars-ai-detection\" as const;` Verified in src/lib/integrity/ai-detection.ts:26",
      section: "AI Detection Engine",
      subsection: "Binoculars Model",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-016 Model — `const BINOCULARS_MODEL = "drshailesh88/binoculars-ai-detection" as const;` Verified in src/lib/integrity/ai-detection.ts:26');
    }


    // This test validates: Model — `const BINOCULARS_MODEL = "drshailesh88/binoculars-ai-detection" as const;` Verified in src/lib/integrity/ai-detection.ts:26
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Threshold const BINOCULARS_FPR_THRESHOLD 08536432310785527 Verified in srclibint', async ({ page }) => {
    // Checkpoint 17: Threshold — `const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;` Verified in src/lib/integrity/ai-detection.ts:27
    // Section: AI Detection Engine > Binoculars Model

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Threshold — `const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;` Verified in src/lib/integrity/ai-detection.ts:27",
      section: "AI Detection Engine",
      subsection: "Binoculars Model",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-017 Threshold — `const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;` Verified in src/lib/integrity/ai-detection.ts:27');
    }


    // This test validates: Threshold — `const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;` Verified in src/lib/integrity/ai-detection.ts:27
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Weighting binocularsResulthumanScore 06 llmResulthumanScore 04 60 Binoculars 40 ', async ({ page }) => {
    // Checkpoint 18: Weighting — `binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4` = 60% Binoculars, 40% LLM. Verified in src/lib/integrity/ai-detection.ts:1076
    // Section: AI Detection Engine > Binoculars Model

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Weighting — `binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4` = 60% Binoculars, 40% LLM. Verified in src/lib/integrity/ai-detection.ts:1076",
      section: "AI Detection Engine",
      subsection: "Binoculars Model",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-018 Weighting — `binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4` = 60% Binoculars, 40% LLM. Verified in src/lib/integrity/ai-detection.ts:1076');
    }


    // This test validates: Weighting — `binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4` = 60% Binoculars, 40% LLM. Verified in src/lib/integrity/ai-detection.ts:1076
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Count exactly 35 hedging phrases in the HEDGING_PHRASES array lines 144-182 veri', async ({ page }) => {
    // Checkpoint 19: Count — exactly 35 hedging phrases in the HEDGING_PHRASES array (lines 144-182), verified by programmatic count
    // Section: AI Detection Engine > Hedging Phrases

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Count — exactly 35 hedging phrases in the HEDGING_PHRASES array (lines 144-182), verified by programmatic count",
      section: "AI Detection Engine",
      subsection: "Hedging Phrases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-019 Count — exactly 35 hedging phrases in the HEDGING_PHRASES array (lines 144-182), verified by programmatic count');
    }


    // This test validates: Count — exactly 35 hedging phrases in the HEDGING_PHRASES array (lines 144-182), verified by programmatic count
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Detection computeTextStatistics counts hedging phrases and reports in statshedgi', async ({ page }) => {
    // Checkpoint 20: Detection — `computeTextStatistics()` counts hedging phrases and reports in `stats.hedgingPhraseCount`, used in AI detection prompt and writing suggestions. Verified in src/lib/integrity/ai-detection.ts
    // Section: AI Detection Engine > Hedging Phrases

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Detection — `computeTextStatistics()` counts hedging phrases and reports in `stats.hedgingPhraseCount`, used in AI detection prompt and writing suggestions. Verified in src/lib/integrity/ai-detection.ts",
      section: "AI Detection Engine",
      subsection: "Hedging Phrases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-020 Detection — `computeTextStatistics()` counts hedging phrases and reports in `stats.hedgingPhraseCount`, used in AI detection prompt and writing suggestions. Verified in src/lib/integrity/ai-detection.ts');
    }


    // This test validates: Detection — `computeTextStatistics()` counts hedging phrases and reports in `stats.hedgingPhraseCount`, used in AI detection prompt and writing suggestions. Verified in src/lib/integrity/ai-detection.ts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Paid feature only const runPlagiarism isPaid mode full mode plagiarism where isP', async ({ page }) => {
    // Checkpoint 21: Paid feature only — `const runPlagiarism = isPaid && (mode === "full" || mode === "plagiarism")` where `isPaid = PAID_PLANS.has(input.plan)` and PAID_PLANS = Set(["basic", "pro", "institutional"]). Verified in src/lib/integrity/index.ts:33,38
    // Section: Plagiarism Engine

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Paid feature only — `const runPlagiarism = isPaid && (mode === \"full\" || mode === \"plagiarism\")` where `isPaid = PAID_PLANS.has(input.plan)` and PAID_PLANS = Set([\"basic\", \"pro\", \"institutional\"]). Verified in src/lib/integrity/index.ts:33,38",
      section: "Plagiarism Engine",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-021 Paid feature only — `const runPlagiarism = isPaid && (mode === "full" || mode === "plagiarism")` where `isPaid = PAID_PLANS.has(input.plan)` and PAID_PLANS = Set(["basic", "pro", "institutional"]). Verified in src/lib/integrity/index.ts:33,38');
    }


    // This test validates: Paid feature only — `const runPlagiarism = isPaid && (mode === "full" || mode === "plagiarism")` where `isPaid = PAID_PLANS.has(input.plan)` and PAID_PLANS = Set(["basic", "pro", "institutional"]). Verified in src/lib/integrity/index.ts:33,38
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Similarity score similarityScore 0-100 computed via computeOverallScore from par', async ({ page }) => {
    // Checkpoint 22: Similarity score — `similarityScore` (0-100) computed via `computeOverallScore()` from paragraph-level Jaccard similarities. Verified in src/lib/integrity/plagiarism-engine.ts:630-633
    // Section: Plagiarism Engine

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Similarity score — `similarityScore` (0-100) computed via `computeOverallScore()` from paragraph-level Jaccard similarities. Verified in src/lib/integrity/plagiarism-engine.ts:630-633",
      section: "Plagiarism Engine",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-022 Similarity score — `similarityScore` (0-100) computed via `computeOverallScore()` from paragraph-level Jaccard similarities. Verified in src/lib/integrity/plagiarism-engine.ts:630-633');
    }


    // This test validates: Similarity score — `similarityScore` (0-100) computed via `computeOverallScore()` from paragraph-level Jaccard similarities. Verified in src/lib/integrity/plagiarism-engine.ts:630-633
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Source matching queries Crossref API and Semantic Scholar API in parallel to ide', async ({ page }) => {
    // Checkpoint 23: Source matching — queries Crossref API and Semantic Scholar API in parallel to identify potential source documents. Verified in src/lib/integrity/plagiarism-engine.ts:553-558
    // Section: Plagiarism Engine

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Source matching — queries Crossref API and Semantic Scholar API in parallel to identify potential source documents. Verified in src/lib/integrity/plagiarism-engine.ts:553-558",
      section: "Plagiarism Engine",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-023 Source matching — queries Crossref API and Semantic Scholar API in parallel to identify potential source documents. Verified in src/lib/integrity/plagiarism-engine.ts:553-558');
    }


    // This test validates: Source matching — queries Crossref API and Semantic Scholar API in parallel to identify potential source documents. Verified in src/lib/integrity/plagiarism-engine.ts:553-558
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Severity levels high 04 medium 02 low 02 via classifySeverity Verified in srclib', async ({ page }) => {
    // Checkpoint 24: Severity levels — high (>=0.4), medium (>=0.2), low (<0.2) via `classifySeverity()`. Verified in src/lib/integrity/plagiarism-engine.ts:500-503
    // Section: Plagiarism Engine

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Severity levels — high (>=0.4), medium (>=0.2), low (<0.2) via `classifySeverity()`. Verified in src/lib/integrity/plagiarism-engine.ts:500-503",
      section: "Plagiarism Engine",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-024 Severity levels — high (>=0.4), medium (>=0.2), low (<0.2) via `classifySeverity()`. Verified in src/lib/integrity/plagiarism-engine.ts:500-503');
    }


    // This test validates: Severity levels — high (>=0.4), medium (>=0.2), low (<0.2) via `classifySeverity()`. Verified in src/lib/integrity/plagiarism-engine.ts:500-503
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Match excerpts each match includes excerpt paragraph text truncated to 120 chars', async ({ page }) => {
    // Checkpoint 25: Match excerpts — each match includes `excerpt` (paragraph text truncated to 120 chars) and `source` object with title, authors, doi, url, year. Verified in src/lib/integrity/plagiarism-engine.ts:540-541,606-620
    // Section: Plagiarism Engine

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Match excerpts — each match includes `excerpt` (paragraph text truncated to 120 chars) and `source` object with title, authors, doi, url, year. Verified in src/lib/integrity/plagiarism-engine.ts:540-541,606-620",
      section: "Plagiarism Engine",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-025 Match excerpts — each match includes `excerpt` (paragraph text truncated to 120 chars) and `source` object with title, authors, doi, url, year. Verified in src/lib/integrity/plagiarism-engine.ts:540-541,606-620');
    }


    // This test validates: Match excerpts — each match includes `excerpt` (paragraph text truncated to 120 chars) and `source` object with title, authors, doi, url, year. Verified in src/lib/integrity/plagiarism-engine.ts:540-541,606-620
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Skeleton loaders uses Skeleton components for header icon h-8 w-8 title h-6 w-40', async ({ page }) => {
    // Checkpoint 26: Skeleton loaders — uses `<Skeleton>` components for header icon (h-8 w-8), title (h-6 w-40), main content area (flex-1), and footer button (h-12 w-40). Verified in src/app/(app)/analysis/loading.tsx:1-17
    // Section: Loading & Error States > Loading State (`loading.tsx`)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Skeleton loaders — uses `<Skeleton>` components for header icon (h-8 w-8), title (h-6 w-40), main content area (flex-1), and footer button (h-12 w-40). Verified in src/app/(app)/analysis/loading.tsx:1-17",
      section: "Loading & Error States",
      subsection: "Loading State (`loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-026 Skeleton loaders — uses `<Skeleton>` components for header icon (h-8 w-8), title (h-6 w-40), main content area (flex-1), and footer button (h-12 w-40). Verified in src/app/(app)/analysis/loading.tsx:1-17');
    }


    // This test validates: Skeleton loaders — uses `<Skeleton>` components for header icon (h-8 w-8), title (h-6 w-40), main content area (flex-1), and footer button (h-12 w-40). Verified in src/app/(app)/analysis/loading.tsx:1-17
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Title titleAnalysis unavailable passed to ErrorDisplay component Verified in src', async ({ page }) => {
    // Checkpoint 27: Title — `title="Analysis unavailable"` passed to ErrorDisplay component. Verified in src/app/(app)/analysis/error.tsx:8
    // Section: Loading & Error States > Error State (`error.tsx`)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Title — `title=\"Analysis unavailable\"` passed to ErrorDisplay component. Verified in src/app/(app)/analysis/error.tsx:8",
      section: "Loading & Error States",
      subsection: "Error State (`error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-027 Title — `title="Analysis unavailable"` passed to ErrorDisplay component. Verified in src/app/(app)/analysis/error.tsx:8');
    }


    // This test validates: Title — `title="Analysis unavailable"` passed to ErrorDisplay component. Verified in src/app/(app)/analysis/error.tsx:8
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Message messageWe couldnt load the writing analysis tool Please try again Verifi', async ({ page }) => {
    // Checkpoint 28: Message — `message="We couldn't load the writing analysis tool. Please try again."` Verified in src/app/(app)/analysis/error.tsx:9
    // Section: Loading & Error States > Error State (`error.tsx`)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Message — `message=\"We couldn't load the writing analysis tool. Please try again.\"` Verified in src/app/(app)/analysis/error.tsx:9",
      section: "Loading & Error States",
      subsection: "Error State (`error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-028 Message — `message="We couldn\'t load the writing analysis tool. Please try again."` Verified in src/app/(app)/analysis/error.tsx:9');
    }


    // This test validates: Message — `message="We couldn't load the writing analysis tool. Please try again."` Verified in src/app/(app)/analysis/error.tsx:9
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Retry option onRetryreset passes Nextjs error boundary reset function to ErrorDi', async ({ page }) => {
    // Checkpoint 29: Retry option — `onRetry={reset}` passes Next.js error boundary reset function to ErrorDisplay. Verified in src/app/(app)/analysis/error.tsx:11
    // Section: Loading & Error States > Error State (`error.tsx`)

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Retry option — `onRetry={reset}` passes Next.js error boundary reset function to ErrorDisplay. Verified in src/app/(app)/analysis/error.tsx:11",
      section: "Loading & Error States",
      subsection: "Error State (`error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-029 Retry option — `onRetry={reset}` passes Next.js error boundary reset function to ErrorDisplay. Verified in src/app/(app)/analysis/error.tsx:11');
    }


    // This test validates: Retry option — `onRetry={reset}` passes Next.js error boundary reset function to ErrorDisplay. Verified in src/app/(app)/analysis/error.tsx:11
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Empty text analyze button disabledloading effectiveTexttrimlength 50 empty text ', async ({ page }) => {
    // Checkpoint 30: Empty text — analyze button `disabled={loading || effectiveText.trim().length < 50}`, empty text = length 0 < 50 = disabled. No API call made. Verified in page.tsx:366
    // Section: Error Handling & Edge Cases > Input Validation

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Empty text — analyze button `disabled={loading || effectiveText.trim().length < 50}`, empty text = length 0 < 50 = disabled. No API call made. Verified in page.tsx:366",
      section: "Error Handling & Edge Cases",
      subsection: "Input Validation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-030 Empty text — analyze button `disabled={loading || effectiveText.trim().length < 50}`, empty text = length 0 < 50 = disabled. No API call made. Verified in page.tsx:366');
    }


    // This test validates: Empty text — analyze button `disabled={loading || effectiveText.trim().length < 50}`, empty text = length 0 < 50 = disabled. No API call made. Verified in page.tsx:366
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Text 50 characters same disabled check trimlength 50 disables button with disabl', async ({ page }) => {
    // Checkpoint 31: Text < 50 characters — same disabled check: `trim().length < 50` disables button with `disabled:opacity-50` visual indication. Verified in page.tsx:366-367
    // Section: Error Handling & Edge Cases > Input Validation

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Text < 50 characters — same disabled check: `trim().length < 50` disables button with `disabled:opacity-50` visual indication. Verified in page.tsx:366-367",
      section: "Error Handling & Edge Cases",
      subsection: "Input Validation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-031 Text < 50 characters — same disabled check: `trim().length < 50` disables button with `disabled:opacity-50` visual indication. Verified in page.tsx:366-367');
    }


    // This test validates: Text < 50 characters — same disabled check: `trim().length < 50` disables button with `disabled:opacity-50` visual indication. Verified in page.tsx:366-367
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Only whitespace effectiveTextsplitsfilterBooleanlength shows 0 words trimlength ', async ({ page }) => {
    // Checkpoint 32: Only whitespace — `effectiveText.split(/\s+/).filter(Boolean).length` shows 0 words; `trim().length` is 0 so button disabled. Verified in page.tsx:362,366
    // Section: Error Handling & Edge Cases > Input Validation

    // Navigate to the page
    await page.goto('/analysis', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/analysis/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertAnalysisCheckpoint({
      page,
      description: "Only whitespace — `effectiveText.split(/\\s+/).filter(Boolean).length` shows 0 words; `trim().length` is 0 so button disabled. Verified in page.tsx:362,366",
      section: "Error Handling & Edge Cases",
      subsection: "Input Validation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled analysis checkpoint: cp-032 Only whitespace — `effectiveText.split(/\s+/).filter(Boolean).length` shows 0 words; `trim().length` is 0 so button disabled. Verified in page.tsx:362,366');
    }


    // This test validates: Only whitespace — `effectiveText.split(/\s+/).filter(Boolean).length` shows 0 words; `trim().length` is 0 so button disabled. Verified in page.tsx:362,366
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
