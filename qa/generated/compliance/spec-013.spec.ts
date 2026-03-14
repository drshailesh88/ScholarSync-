/**
 * Auto-generated Playwright test for compliance/spec-013
 * Source: e2e/specs/compliance/spec-013.md
 * Generated: 2026-03-14T10:50:36.813Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts compliance spec-013
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';









import { assertComplianceCheckpoint } from '../../module-assertions/compliance';










test.describe('compliance / spec-013', () => {
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

  test('cp-000: flaggedPassages DB filter uses humanProbability 50 threshold different from Inte', async ({ page }) => {
    // Checkpoint 0: `flaggedPassages` DB filter uses `humanProbability < 50` threshold (different from IntegrityPanel's `< 40` and the Humanize button's `< 40`)
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`flaggedPassages` DB filter uses `humanProbability < 50` threshold (different from IntegrityPanel's `< 40` and the Humanize button's `< 40`)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-000 ' + "`flaggedPassages` DB filter uses `humanProbability < 50` threshold (different from IntegrityPanel's `< 40` and the Humanize button's `< 40`)");
    }


    // This test validates: `flaggedPassages` DB filter uses `humanProbability < 50` threshold (different from IntegrityPanel's `< 40` and the Humanize button's `< 40`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: aiDetectionDetails persisted as object with keys humanScore overallRisk engine s', async ({ page }) => {
    // Checkpoint 1: `aiDetectionDetails` persisted as object with keys `humanScore`, `overallRisk`, `engine`, `stats`, and `paragraphCount` (count, not the full paragraphs array)
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`aiDetectionDetails` persisted as object with keys `humanScore`, `overallRisk`, `engine`, `stats`, and `paragraphCount` (count, not the full paragraphs array)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-001 ' + "`aiDetectionDetails` persisted as object with keys `humanScore`, `overallRisk`, `engine`, `stats`, and `paragraphCount` (count, not the full paragraphs array)");
    }


    // This test validates: `aiDetectionDetails` persisted as object with keys `humanScore`, `overallRisk`, `engine`, `stats`, and `paragraphCount` (count, not the full paragraphs array)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: aiDetectionEngine stored as a separate DB column in addition to aiDetectionDetai', async ({ page }) => {
    // Checkpoint 2: `aiDetectionEngine` stored as a separate DB column in addition to `aiDetectionDetails.engine`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`aiDetectionEngine` stored as a separate DB column in addition to `aiDetectionDetails.engine`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-002 ' + "`aiDetectionEngine` stored as a separate DB column in addition to `aiDetectionDetails.engine`");
    }


    // This test validates: `aiDetectionEngine` stored as a separate DB column in addition to `aiDetectionDetails.engine`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Exact error when AI engine throws at runtime AI detection service is unavailable', async ({ page }) => {
    // Checkpoint 3: Exact error when AI engine throws at runtime: `"AI detection service is unavailable. Please try again later."` (status 503)
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact error when AI engine throws at runtime: `\"AI detection service is unavailable. Please try again later.\"` (status 503)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-003 ' + "Exact error when AI engine throws at runtime: `\"AI detection service is unavailable. Please try again later.\"` (status 503)");
    }


    // This test validates: Exact error when AI engine throws at runtime: `"AI detection service is unavailable. Please try again later."` (status 503)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Exact error when isAIConfigured returns false AI service is not configured statu', async ({ page }) => {
    // Checkpoint 4: Exact error when `isAIConfigured()` returns false: `"AI service is not configured."` (status 503)
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Exact error when `isAIConfigured()` returns false: `\"AI service is not configured.\"` (status 503)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-004 ' + "Exact error when `isAIConfigured()` returns false: `\"AI service is not configured.\"` (status 503)");
    }


    // This test validates: Exact error when `isAIConfigured()` returns false: `"AI service is not configured."` (status 503)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: sourceMatches DB field duplicates resultplagiarismmatches null alongside plagiar', async ({ page }) => {
    // Checkpoint 5: `sourceMatches` DB field duplicates `result.plagiarism?.matches ?? null` alongside `plagiarismMatches`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check` (main route, additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "`sourceMatches` DB field duplicates `result.plagiarism?.matches ?? null` alongside `plagiarismMatches`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check` (main route, additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-005 ' + "`sourceMatches` DB field duplicates `result.plagiarism?.matches ?? null` alongside `plagiarismMatches`");
    }


    // This test validates: `sourceMatches` DB field duplicates `result.plagiarism?.matches ?? null` alongside `plagiarismMatches`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Report Zod validation for stats only validates 6 of 10 TextStatistics fields avg', async ({ page }) => {
    // Checkpoint 6: Report Zod validation for `stats` only validates 6 of 10 `TextStatistics` fields: `avgSentenceLength`, `sentenceLengthStdDev`, `typeTokenRatio`, `passiveVoicePercent`, `readabilityGrade`, `hedgingPhraseCount` — the 4 newer fields (`formulaicTransitionDensity`, `paragraphLengthStdDev`, `repetitiveSentenceOpeningRatio`, `markdownHeadingCount`) are not validated
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report Zod validation for `stats` only validates 6 of 10 `TextStatistics` fields: `avgSentenceLength`, `sentenceLengthStdDev`, `typeTokenRatio`, `passiveVoicePercent`, `readabilityGrade`, `hedgingPhraseCount` — the 4 newer fields (`formulaicTransitionDensity`, `paragraphLengthStdDev`, `repetitiveSentenceOpeningRatio`, `markdownHeadingCount`) are not validated",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-006 ' + "Report Zod validation for `stats` only validates 6 of 10 `TextStatistics` fields: `avgSentenceLength`, `sentenceLengthStdDev`, `typeTokenRatio`, `passiveVoicePercent`, `readabilityGrade`, `hedgingPhraseCount` — the 4 newer fields (`formulaicTransitionDensity`, `paragraphLengthStdDev`, `repetitiveSentenceOpeningRatio`, `markdownHeadingCount`) are not validated");
    }


    // This test validates: Report Zod validation for `stats` only validates 6 of 10 `TextStatistics` fields: `avgSentenceLength`, `sentenceLengthStdDev`, `typeTokenRatio`, `passiveVoicePercent`, `readabilityGrade`, `hedgingPhraseCount` — the 4 newer fields (`formulaicTransitionDensity`, `paragraphLengthStdDev`, `repetitiveSentenceOpeningRatio`, `markdownHeadingCount`) are not validated
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Report date formatted with en-US locale using year numeric month long day numeri', async ({ page }) => {
    // Checkpoint 7: Report date formatted with `en-US` locale using `{ year: "numeric", month: "long", day: "numeric" }`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report date formatted with `en-US` locale using `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-007 ' + "Report date formatted with `en-US` locale using `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`");
    }


    // This test validates: Report date formatted with `en-US` locale using `{ year: "numeric", month: "long", day: "numeric" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Report documentTitle defaults to Untitled server-side when the optional field is', async ({ page }) => {
    // Checkpoint 8: Report `documentTitle` defaults to `"Untitled"` server-side when the optional field is absent
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report `documentTitle` defaults to `\"Untitled\"` server-side when the optional field is absent",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-008 ' + "Report `documentTitle` defaults to `\"Untitled\"` server-side when the optional field is absent");
    }


    // This test validates: Report `documentTitle` defaults to `"Untitled"` server-side when the optional field is absent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Report tier displayed as Premium for tier paid Free for tier free', async ({ page }) => {
    // Checkpoint 9: Report tier displayed as `"Premium"` for `tier === "paid"`, `"Free"` for `tier === "free"`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report tier displayed as `\"Premium\"` for `tier === \"paid\"`, `\"Free\"` for `tier === \"free\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-009 ' + "Report tier displayed as `\"Premium\"` for `tier === \"paid\"`, `\"Free\"` for `tier === \"free\"`");
    }


    // This test validates: Report tier displayed as `"Premium"` for `tier === "paid"`, `"Free"` for `tier === "free"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Report footer exact text Generated by ScholarSync Integrity Check on date', async ({ page }) => {
    // Checkpoint 10: Report footer exact text: `*Generated by ScholarSync Integrity Check on {date}.*`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report footer exact text: `*Generated by ScholarSync Integrity Check on {date}.*`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-010 ' + "Report footer exact text: `*Generated by ScholarSync Integrity Check on {date}.*`");
    }


    // This test validates: Report footer exact text: `*Generated by ScholarSync Integrity Check on {date}.*`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Report plagiarism match table columns Excerpt Source Year Similarity Severity DO', async ({ page }) => {
    // Checkpoint 11: Report plagiarism match table columns: `Excerpt | Source | Year | Similarity | Severity | DOI`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report plagiarism match table columns: `Excerpt | Source | Year | Similarity | Severity | DOI`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-011 ' + "Report plagiarism match table columns: `Excerpt | Source | Year | Similarity | Severity | DOI`");
    }


    // This test validates: Report plagiarism match table columns: `Excerpt | Source | Year | Similarity | Severity | DOI`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Report AI paragraph table columns Excerpt Human Prob Flags Suggestion', async ({ page }) => {
    // Checkpoint 12: Report AI paragraph table columns: `# | Excerpt | Human Prob. | Flags | Suggestion`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report AI paragraph table columns: `# | Excerpt | Human Prob. | Flags | Suggestion`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-012 ' + "Report AI paragraph table columns: `# | Excerpt | Human Prob. | Flags | Suggestion`");
    }


    // This test validates: Report AI paragraph table columns: `# | Excerpt | Human Prob. | Flags | Suggestion`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Report table sanitizes AIplagiarism excerpts and suggestions with replaceg repla', async ({ page }) => {
    // Checkpoint 13: Report table sanitizes AI/plagiarism excerpts and suggestions with `.replace(/\|/g, "\\|").replace(/\n/g, " ")`; flags and source titles escape pipe characters only
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report table sanitizes AI/plagiarism excerpts and suggestions with `.replace(/\\|/g, \"\\\\|\").replace(/\\n/g, \" \")`; flags and source titles escape pipe characters only",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-013 ' + "Report table sanitizes AI/plagiarism excerpts and suggestions with `.replace(/\\|/g, \"\\\\|\").replace(/\\n/g, \" \")`; flags and source titles escape pipe characters only");
    }


    // This test validates: Report table sanitizes AI/plagiarism excerpts and suggestions with `.replace(/\|/g, "\\|").replace(/\n/g, " ")`; flags and source titles escape pipe characters only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Report plagiarism no-matches text No plagiarism matches found', async ({ page }) => {
    // Checkpoint 14: Report plagiarism no-matches text: `"No plagiarism matches found."`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report plagiarism no-matches text: `\"No plagiarism matches found.\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-014 ' + "Report plagiarism no-matches text: `\"No plagiarism matches found.\"`");
    }


    // This test validates: Report plagiarism no-matches text: `"No plagiarism matches found."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Report citation no-issues text No citation issues found', async ({ page }) => {
    // Checkpoint 15: Report citation no-issues text: `"No citation issues found."`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report citation no-issues text: `\"No citation issues found.\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-015 ' + "Report citation no-issues text: `\"No citation issues found.\"`");
    }


    // This test validates: Report citation no-issues text: `"No citation issues found."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Report citation issues formatted as - SEVERITY message ref reference', async ({ page }) => {
    // Checkpoint 16: Report citation issues formatted as: `- **[{SEVERITY}]** {message}{ (ref: {reference})}`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report citation issues formatted as: `- **[{SEVERITY}]** {message}{ (ref: {reference})}`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-016 ' + "Report citation issues formatted as: `- **[{SEVERITY}]** {message}{ (ref: {reference})}`");
    }


    // This test validates: Report citation issues formatted as: `- **[{SEVERITY}]** {message}{ (ref: {reference})}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Report DOI links use markdown format doihttpsdoiorgdoi', async ({ page }) => {
    // Checkpoint 17: Report DOI links use markdown format: `[{doi}](https://doi.org/{doi})`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report DOI links use markdown format: `[{doi}](https://doi.org/{doi})`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-017 ' + "Report DOI links use markdown format: `[{doi}](https://doi.org/{doi})`");
    }


    // This test validates: Report DOI links use markdown format: `[{doi}](https://doi.org/{doi})`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Report plagiarism similarity formatted as Mathroundmsimilarity 100 severity as t', async ({ page }) => {
    // Checkpoint 18: Report plagiarism similarity formatted as `Math.round(m.similarity * 100)%`, severity as `.toUpperCase()`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/report` (detailed structure)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Report plagiarism similarity formatted as `Math.round(m.similarity * 100)%`, severity as `.toUpperCase()`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/report` (detailed structure)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-018 ' + "Report plagiarism similarity formatted as `Math.round(m.similarity * 100)%`, severity as `.toUpperCase()`");
    }


    // This test validates: Report plagiarism similarity formatted as `Math.round(m.similarity * 100)%`, severity as `.toUpperCase()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Paraphrase Zod schema also accepts optional sourceYear as znumberintpositive not', async ({ page }) => {
    // Checkpoint 19: Paraphrase Zod schema also accepts optional `sourceYear` as `z.number().int().positive()` (not sent by the page client, but accepted by the API)
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase Zod schema also accepts optional `sourceYear` as `z.number().int().positive()` (not sent by the page client, but accepted by the API)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-019 ' + "Paraphrase Zod schema also accepts optional `sourceYear` as `z.number().int().positive()` (not sent by the page client, but accepted by the API)");
    }


    // This test validates: Paraphrase Zod schema also accepts optional `sourceYear` as `z.number().int().positive()` (not sent by the page client, but accepted by the API)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Paraphrase builds source info by joining filtered non-null parts Title sourceTit', async ({ page }) => {
    // Checkpoint 20: Paraphrase builds source info by joining filtered non-null parts: `Title: "{sourceTitle}"`, optional `DOI: {sourceDoi}`, optional `Year: {sourceYear}` — comma-space separated
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase builds source info by joining filtered non-null parts: `Title: \"{sourceTitle}\"`, optional `DOI: {sourceDoi}`, optional `Year: {sourceYear}` — comma-space separated",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-020 ' + "Paraphrase builds source info by joining filtered non-null parts: `Title: \"{sourceTitle}\"`, optional `DOI: {sourceDoi}`, optional `Year: {sourceYear}` — comma-space separated");
    }


    // This test validates: Paraphrase builds source info by joining filtered non-null parts: `Title: "{sourceTitle}"`, optional `DOI: {sourceDoi}`, optional `Year: {sourceYear}` — comma-space separated
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Paraphrase uses generateObject from Vercel AI SDK with a structured paraphraseRe', async ({ page }) => {
    // Checkpoint 21: Paraphrase uses `generateObject` from Vercel AI SDK with a structured `paraphraseResponseSchema`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase uses `generateObject` from Vercel AI SDK with a structured `paraphraseResponseSchema`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-021 ' + "Paraphrase uses `generateObject` from Vercel AI SDK with a structured `paraphraseResponseSchema`");
    }


    // This test validates: Paraphrase uses `generateObject` from Vercel AI SDK with a structured `paraphraseResponseSchema`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Paraphrase traces generation with tier small modelId claude-haiku-4-5-20251001 f', async ({ page }) => {
    // Checkpoint 22: Paraphrase traces generation with `{ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "integrity-paraphrase" }`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase traces generation with `{ tier: \"small\", modelId: \"claude-haiku-4-5-20251001\", feature: \"integrity-paraphrase\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-022 ' + "Paraphrase traces generation with `{ tier: \"small\", modelId: \"claude-haiku-4-5-20251001\", feature: \"integrity-paraphrase\" }`");
    }


    // This test validates: Paraphrase traces generation with `{ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "integrity-paraphrase" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Paraphrase exact system prompt Rewrite this passage to express the same ideas in', async ({ page }) => {
    // Checkpoint 23: Paraphrase exact system prompt: `"Rewrite this passage to express the same ideas in original language. Add a proper citation to the source. The goal is to reduce plagiarism similarity while maintaining academic integrity. Output both the paraphrased text and a suggested citation string."`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase exact system prompt: `\"Rewrite this passage to express the same ideas in original language. Add a proper citation to the source. The goal is to reduce plagiarism similarity while maintaining academic integrity. Output both the paraphrased text and a suggested citation string.\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-023 ' + "Paraphrase exact system prompt: `\"Rewrite this passage to express the same ideas in original language. Add a proper citation to the source. The goal is to reduce plagiarism similarity while maintaining academic integrity. Output both the paraphrased text and a suggested citation string.\"`");
    }


    // This test validates: Paraphrase exact system prompt: `"Rewrite this passage to express the same ideas in original language. Add a proper citation to the source. The goal is to reduce plagiarism similarity while maintaining academic integrity. Output both the paraphrased text and a suggested citation string."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Paraphrase returns 503 with AI service is not configured if AI not configured', async ({ page }) => {
    // Checkpoint 24: Paraphrase returns 503 with `"AI service is not configured."` if AI not configured
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase returns 503 with `\"AI service is not configured.\"` if AI not configured",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-024 ' + "Paraphrase returns 503 with `\"AI service is not configured.\"` if AI not configured");
    }


    // This test validates: Paraphrase returns 503 with `"AI service is not configured."` if AI not configured
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Paraphrase 500 error body error Failed to paraphrase text', async ({ page }) => {
    // Checkpoint 25: Paraphrase 500 error body: `{ error: "Failed to paraphrase text" }`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/paraphrase` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Paraphrase 500 error body: `{ error: \"Failed to paraphrase text\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/paraphrase` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-025 ' + "Paraphrase 500 error body: `{ error: \"Failed to paraphrase text\" }`");
    }


    // This test validates: Paraphrase 500 error body: `{ error: "Failed to paraphrase text" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Humanize Zod schema accepts optional context field zstringmax2000 Context must n', async ({ page }) => {
    // Checkpoint 26: Humanize Zod schema accepts optional `context` field: `z.string().max(2000, "Context must not exceed 2000 characters")`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize Zod schema accepts optional `context` field: `z.string().max(2000, \"Context must not exceed 2000 characters\")`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-026 ' + "Humanize Zod schema accepts optional `context` field: `z.string().max(2000, \"Context must not exceed 2000 characters\")`");
    }


    // This test validates: Humanize Zod schema accepts optional `context` field: `z.string().max(2000, "Context must not exceed 2000 characters")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: When context is provided it is appended to the user prompt as nnSurrounding cont', async ({ page }) => {
    // Checkpoint 27: When `context` is provided, it is appended to the user prompt as `\n\nSurrounding context for tone matching:\n{context}`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "When `context` is provided, it is appended to the user prompt as `\\n\\nSurrounding context for tone matching:\\n{context}`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-027 ' + "When `context` is provided, it is appended to the user prompt as `\\n\\nSurrounding context for tone matching:\\n{context}`");
    }


    // This test validates: When `context` is provided, it is appended to the user prompt as `\n\nSurrounding context for tone matching:\n{context}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Humanize uses generateObject from Vercel AI SDK with a structured humanizeRespon', async ({ page }) => {
    // Checkpoint 28: Humanize uses `generateObject` from Vercel AI SDK with a structured `humanizeResponseSchema`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize uses `generateObject` from Vercel AI SDK with a structured `humanizeResponseSchema`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-028 ' + "Humanize uses `generateObject` from Vercel AI SDK with a structured `humanizeResponseSchema`");
    }


    // This test validates: Humanize uses `generateObject` from Vercel AI SDK with a structured `humanizeResponseSchema`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Humanize traces generation with tier small modelId claude-haiku-4-5-20251001 fea', async ({ page }) => {
    // Checkpoint 29: Humanize traces generation with `{ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "integrity-humanize" }`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize traces generation with `{ tier: \"small\", modelId: \"claude-haiku-4-5-20251001\", feature: \"integrity-humanize\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-029 ' + "Humanize traces generation with `{ tier: \"small\", modelId: \"claude-haiku-4-5-20251001\", feature: \"integrity-humanize\" }`");
    }


    // This test validates: Humanize traces generation with `{ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "integrity-humanize" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Humanize exact system prompt Rewrite this academic paragraph to sound more natur', async ({ page }) => {
    // Checkpoint 30: Humanize exact system prompt: `"Rewrite this academic paragraph to sound more naturally human-written. Vary sentence lengths, reduce hedging phrases, use active voice where appropriate, and maintain academic rigor. Do NOT change the meaning or remove citations."`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize exact system prompt: `\"Rewrite this academic paragraph to sound more naturally human-written. Vary sentence lengths, reduce hedging phrases, use active voice where appropriate, and maintain academic rigor. Do NOT change the meaning or remove citations.\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-030 ' + "Humanize exact system prompt: `\"Rewrite this academic paragraph to sound more naturally human-written. Vary sentence lengths, reduce hedging phrases, use active voice where appropriate, and maintain academic rigor. Do NOT change the meaning or remove citations.\"`");
    }


    // This test validates: Humanize exact system prompt: `"Rewrite this academic paragraph to sound more naturally human-written. Vary sentence lengths, reduce hedging phrases, use active voice where appropriate, and maintain academic rigor. Do NOT change the meaning or remove citations."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Humanize returns 503 with AI service is not configured if AI not configured', async ({ page }) => {
    // Checkpoint 31: Humanize returns 503 with `"AI service is not configured."` if AI not configured
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize returns 503 with `\"AI service is not configured.\"` if AI not configured",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-031 ' + "Humanize returns 503 with `\"AI service is not configured.\"` if AI not configured");
    }


    // This test validates: Humanize returns 503 with `"AI service is not configured."` if AI not configured
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Humanize 500 error body error Failed to humanize text', async ({ page }) => {
    // Checkpoint 32: Humanize 500 error body: `{ error: "Failed to humanize text" }`
    // Section: Quick Test Workflows > API Route — `/api/integrity-check/humanize` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Humanize 500 error body: `{ error: \"Failed to humanize text\" }`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/integrity-check/humanize` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-032 ' + "Humanize 500 error body: `{ error: \"Failed to humanize text\" }`");
    }


    // This test validates: Humanize 500 error body: `{ error: "Failed to humanize text" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Copyleaks exact error for missing credentials Plagiarism checking service is not', async ({ page }) => {
    // Checkpoint 33: Copyleaks exact error for missing credentials: `"Plagiarism checking service is not configured. Please contact your administrator."` (checks `COPYLEAKS_EMAIL` and `COPYLEAKS_API_KEY` env vars)
    // Section: Quick Test Workflows > API Route — `/api/copyleaks` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks exact error for missing credentials: `\"Plagiarism checking service is not configured. Please contact your administrator.\"` (checks `COPYLEAKS_EMAIL` and `COPYLEAKS_API_KEY` env vars)",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/copyleaks` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-033 ' + "Copyleaks exact error for missing credentials: `\"Plagiarism checking service is not configured. Please contact your administrator.\"` (checks `COPYLEAKS_EMAIL` and `COPYLEAKS_API_KEY` env vars)");
    }


    // This test validates: Copyleaks exact error for missing credentials: `"Plagiarism checking service is not configured. Please contact your administrator."` (checks `COPYLEAKS_EMAIL` and `COPYLEAKS_API_KEY` env vars)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Copyleaks scan action without text returns 400 with Text is required for scan ac', async ({ page }) => {
    // Checkpoint 34: Copyleaks `scan` action without `text` returns 400 with `"Text is required for scan action"`
    // Section: Quick Test Workflows > API Route — `/api/copyleaks` (additional details)

    // Navigate to the page
    await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/compliance/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertComplianceCheckpoint({
      page,
      description: "Copyleaks `scan` action without `text` returns 400 with `\"Text is required for scan action\"`",
      section: "Quick Test Workflows",
      subsection: "API Route — `/api/copyleaks` (additional details)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled compliance checkpoint: cp-034 ' + "Copyleaks `scan` action without `text` returns 400 with `\"Text is required for scan action\"`");
    }


    // This test validates: Copyleaks `scan` action without `text` returns 400 with `"Text is required for scan action"`
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
