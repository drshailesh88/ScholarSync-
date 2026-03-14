/**
 * Auto-generated Playwright test for presentation/spec-008
 * Source: e2e/specs/presentation/spec-008.md
 * Generated: 2026-03-14T19:50:22.000Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-008
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-008', () => {
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

  test('cp-000: 122 Clicking Run Coach triggers evaluation API call', async ({ page }) => {
    // Checkpoint 0: **12.2** Clicking "Run Coach" triggers evaluation API call
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.2** Clicking \"Run Coach\" triggers evaluation API call",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 **12.2** Clicking "Run Coach" triggers evaluation API call');
    }


    // This test validates: **12.2** Clicking "Run Coach" triggers evaluation API call
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 123 Overall score displays as X10', async ({ page }) => {
    // Checkpoint 1: **12.3** Overall score displays as X/10
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.3** Overall score displays as X/10",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 **12.3** Overall score displays as X/10');
    }


    // This test validates: **12.3** Overall score displays as X/10
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: 124 Structure dimension bar renders with score', async ({ page }) => {
    // Checkpoint 2: **12.4** Structure dimension bar renders with score
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.4** Structure dimension bar renders with score",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 **12.4** Structure dimension bar renders with score');
    }


    // This test validates: **12.4** Structure dimension bar renders with score
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: 125 Evidence dimension bar renders with score', async ({ page }) => {
    // Checkpoint 3: **12.5** Evidence dimension bar renders with score
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.5** Evidence dimension bar renders with score",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 **12.5** Evidence dimension bar renders with score');
    }


    // This test validates: **12.5** Evidence dimension bar renders with score
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 126 Narrative dimension bar renders with score', async ({ page }) => {
    // Checkpoint 4: **12.6** Narrative dimension bar renders with score
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.6** Narrative dimension bar renders with score",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 **12.6** Narrative dimension bar renders with score');
    }


    // This test validates: **12.6** Narrative dimension bar renders with score
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: 127 Design dimension bar renders with score', async ({ page }) => {
    // Checkpoint 5: **12.7** Design dimension bar renders with score
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.7** Design dimension bar renders with score",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 **12.7** Design dimension bar renders with score');
    }


    // This test validates: **12.7** Design dimension bar renders with score
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: 128 Audience Fit dimension bar renders with score', async ({ page }) => {
    // Checkpoint 6: **12.8** Audience Fit dimension bar renders with score
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.8** Audience Fit dimension bar renders with score",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 **12.8** Audience Fit dimension bar renders with score');
    }


    // This test validates: **12.8** Audience Fit dimension bar renders with score
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: 129 Suggestions are grouped per slide', async ({ page }) => {
    // Checkpoint 7: **12.9** Suggestions are grouped per slide
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.9** Suggestions are grouped per slide",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 **12.9** Suggestions are grouped per slide');
    }


    // This test validates: **12.9** Suggestions are grouped per slide
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 1210 Each suggestion is actionablereadable', async ({ page }) => {
    // Checkpoint 8: **12.10** Each suggestion is actionable/readable
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.10** Each suggestion is actionable/readable",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 **12.10** Each suggestion is actionable/readable');
    }


    // This test validates: **12.10** Each suggestion is actionable/readable
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 1211 Re-running coach updates the scores', async ({ page }) => {
    // Checkpoint 9: **12.11** Re-running coach updates the scores
    // Section: Coach Panel

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**12.11** Re-running coach updates the scores",
      section: "Coach Panel",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 **12.11** Re-running coach updates the scores');
    }


    // This test validates: **12.11** Re-running coach updates the scores
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 131 DefensePrepPanel renders', async ({ page }) => {
    // Checkpoint 10: **13.1** DefensePrepPanel renders
    // Section: Defense Prep Panel > Configuration

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.1** DefensePrepPanel renders",
      section: "Defense Prep Panel",
      subsection: "Configuration",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 **13.1** DefensePrepPanel renders');
    }


    // This test validates: **13.1** DefensePrepPanel renders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 1312 Multiple focus areas can be selected simultaneously', async ({ page }) => {
    // Checkpoint 11: **13.12** Multiple focus areas can be selected simultaneously
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.12** Multiple focus areas can be selected simultaneously",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 **13.12** Multiple focus areas can be selected simultaneously');
    }


    // This test validates: **13.12** Multiple focus areas can be selected simultaneously
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: 1313 Starting a session generates a question', async ({ page }) => {
    // Checkpoint 12: **13.13** Starting a session generates a question
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.13** Starting a session generates a question",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 **13.13** Starting a session generates a question');
    }


    // This test validates: **13.13** Starting a session generates a question
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 1314 User can submit an answer to the question', async ({ page }) => {
    // Checkpoint 13: **13.14** User can submit an answer to the question
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.14** User can submit an answer to the question",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 **13.14** User can submit an answer to the question');
    }


    // This test validates: **13.14** User can submit an answer to the question
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: 1315 Evaluation of the answer is returned', async ({ page }) => {
    // Checkpoint 14: **13.15** Evaluation of the answer is returned
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.15** Evaluation of the answer is returned",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 **13.15** Evaluation of the answer is returned');
    }


    // This test validates: **13.15** Evaluation of the answer is returned
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 1316 Follow-up questions are generated based on conversation', async ({ page }) => {
    // Checkpoint 15: **13.16** Follow-up questions are generated based on conversation
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.16** Follow-up questions are generated based on conversation",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 **13.16** Follow-up questions are generated based on conversation');
    }


    // This test validates: **13.16** Follow-up questions are generated based on conversation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 1317 Session summary is available after ending the session', async ({ page }) => {
    // Checkpoint 16: **13.17** Session summary is available after ending the session
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.17** Session summary is available after ending the session",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 **13.17** Session summary is available after ending the session');
    }


    // This test validates: **13.17** Session summary is available after ending the session
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: 1318 Conversation history is maintained during the session', async ({ page }) => {
    // Checkpoint 17: **13.18** Conversation history is maintained during the session
    // Section: Defense Prep Panel > Focus Areas

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.18** Conversation history is maintained during the session",
      section: "Defense Prep Panel",
      subsection: "Focus Areas",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 **13.18** Conversation history is maintained during the session');
    }


    // This test validates: **13.18** Conversation history is maintained during the session
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: 1319 Panel header shows Defense Prep with GraduationCap icon defense-prep-panelt', async ({ page }) => {
    // Checkpoint 18: **13.19** Panel header shows "Defense Prep" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.19** Panel header shows \"Defense Prep\" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 **13.19** Panel header shows "Defense Prep" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)');
    }


    // This test validates: **13.19** Panel header shows "Defense Prep" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 1320 Descriptive help text below header defense-prep-paneltsx288', async ({ page }) => {
    // Checkpoint 19: **13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 **13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)');
    }


    // This test validates: **13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 1321 Difficulty section labeled Difficulty defense-prep-paneltsx295', async ({ page }) => {
    // Checkpoint 20: **13.21** Difficulty section labeled "Difficulty" (`defense-prep-panel.tsx:295`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.21** Difficulty section labeled \"Difficulty\" (`defense-prep-panel.tsx:295`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 **13.21** Difficulty section labeled "Difficulty" (`defense-prep-panel.tsx:295`)');
    }


    // This test validates: **13.21** Difficulty section labeled "Difficulty" (`defense-prep-panel.tsx:295`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 1322 Difficulty buttons rendered from DIFFICULTIES array defense-prep-paneltsx29', async ({ page }) => {
    // Checkpoint 21: **13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 **13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)');
    }


    // This test validates: **13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: 1323 Selected difficulty shows border-brand bg-brand5 defense-prep-paneltsx304', async ({ page }) => {
    // Checkpoint 22: **13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 **13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)');
    }


    // This test validates: **13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 1324 Focus areas labeled Focus Areas optional defense-prep-paneltsx319', async ({ page }) => {
    // Checkpoint 23: **13.24** Focus areas labeled "Focus Areas (optional)" (`defense-prep-panel.tsx:319`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.24** Focus areas labeled \"Focus Areas (optional)\" (`defense-prep-panel.tsx:319`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 **13.24** Focus areas labeled "Focus Areas (optional)" (`defense-prep-panel.tsx:319`)');
    }


    // This test validates: **13.24** Focus areas labeled "Focus Areas (optional)" (`defense-prep-panel.tsx:319`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: 1325 Focus area buttons rendered from FOCUS_AREAS array defense-prep-paneltsx322', async ({ page }) => {
    // Checkpoint 24: **13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 **13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)');
    }


    // This test validates: **13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: 1326 Selected focus area shows border-brand bg-brand10 text-brand defense-prep-p', async ({ page }) => {
    // Checkpoint 25: **13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 **13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)');
    }


    // This test validates: **13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: 1327 Start Session button with Play icon defense-prep-paneltsx343 352 353', async ({ page }) => {
    // Checkpoint 26: **13.27** "Start Session" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.27** \"Start Session\" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 **13.27** "Start Session" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)');
    }


    // This test validates: **13.27** "Start Session" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: 1328 Start button disabled when slideslength 0 defense-prep-paneltsx344 347', async ({ page }) => {
    // Checkpoint 27: **13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 **13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)');
    }


    // This test validates: **13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: 1329 Default difficulty is moderate defense-prep-paneltsx95', async ({ page }) => {
    // Checkpoint 28: **13.29** Default difficulty is "moderate" (`defense-prep-panel.tsx:95`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.29** Default difficulty is \"moderate\" (`defense-prep-panel.tsx:95`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 **13.29** Default difficulty is "moderate" (`defense-prep-panel.tsx:95`)');
    }


    // This test validates: **13.29** Default difficulty is "moderate" (`defense-prep-panel.tsx:95`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: 1330 Default focus areas is empty array defense-prep-paneltsx96', async ({ page }) => {
    // Checkpoint 29: **13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 **13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)');
    }


    // This test validates: **13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: 1331 Session summary screen shows Trophy icon and Session Complete header defens', async ({ page }) => {
    // Checkpoint 30: **13.31** Session summary screen shows Trophy icon and "Session Complete" header (`defense-prep-panel.tsx:365`, `:366`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.31** Session summary screen shows Trophy icon and \"Session Complete\" header (`defense-prep-panel.tsx:365`, `:366`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 **13.31** Session summary screen shows Trophy icon and "Session Complete" header (`defense-prep-panel.tsx:365`, `:366`)');
    }


    // This test validates: **13.31** Session summary screen shows Trophy icon and "Session Complete" header (`defense-prep-panel.tsx:365`, `:366`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: 1332 Summary score displays a large numeric score with separate out of 10 label ', async ({ page }) => {
    // Checkpoint 31: **13.32** Summary score displays a large numeric score with separate "out of 10" label (`defense-prep-panel.tsx:371-374`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.32** Summary score displays a large numeric score with separate \"out of 10\" label (`defense-prep-panel.tsx:371-374`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 **13.32** Summary score displays a large numeric score with separate "out of 10" label (`defense-prep-panel.tsx:371-374`)');
    }


    // This test validates: **13.32** Summary score displays a large numeric score with separate "out of 10" label (`defense-prep-panel.tsx:371-374`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: 1333 Strengths list with Target icon defense-prep-paneltsx379 381 385', async ({ page }) => {
    // Checkpoint 32: **13.33** "Strengths" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.33** \"Strengths\" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 **13.33** "Strengths" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)');
    }


    // This test validates: **13.33** "Strengths" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: 1334 Areas for Improvement list with Lightning icon defense-prep-paneltsx399 401', async ({ page }) => {
    // Checkpoint 33: **13.34** "Areas for Improvement" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.34** \"Areas for Improvement\" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 **13.34** "Areas for Improvement" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)');
    }


    // This test validates: **13.34** "Areas for Improvement" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: 1335 Suggested Talking Points list shown when talkingPoints 0 defense-prep-panel', async ({ page }) => {
    // Checkpoint 34: **13.35** "Suggested Talking Points" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)
    // Section: Defense Prep Panel > Defense Prep Panel UI Details

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-008');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**13.35** \"Suggested Talking Points\" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)",
      section: "Defense Prep Panel",
      subsection: "Defense Prep Panel UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 **13.35** "Suggested Talking Points" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)');
    }


    // This test validates: **13.35** "Suggested Talking Points" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)
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
