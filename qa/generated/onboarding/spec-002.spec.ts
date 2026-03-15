/**
 * Auto-generated Playwright test for onboarding/spec-002
 * Source: e2e/specs/onboarding/spec-002.md
 * Generated: 2026-03-15T15:24:05.363Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts onboarding spec-002
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { assertOnboardingCheckpoint } from '../../module-assertions/onboarding';


















test.describe('onboarding / spec-002', () => {
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

  test('cp-000: Search Literature goal has GlobeHemisphereWest icon 20px correct label and descr', async ({ page }) => {
    // Checkpoint 0: "Search Literature" goal has GlobeHemisphereWest icon (20px), correct label and description
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "\"Search Literature\" goal has GlobeHemisphereWest icon (20px), correct label and description",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-000 ' + "\"Search Literature\" goal has GlobeHemisphereWest icon (20px), correct label and description");
    }


    // This test validates: "Search Literature" goal has GlobeHemisphereWest icon (20px), correct label and description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Check Plagiarism AI goal has ShieldCheck icon 20px correct label and description', async ({ page }) => {
    // Checkpoint 1: "Check Plagiarism & AI" goal has ShieldCheck icon (20px), correct label and description
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "\"Check Plagiarism & AI\" goal has ShieldCheck icon (20px), correct label and description",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-001 ' + "\"Check Plagiarism & AI\" goal has ShieldCheck icon (20px), correct label and description");
    }


    // This test validates: "Check Plagiarism & AI" goal has ShieldCheck icon (20px), correct label and description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Create Presentations goal has Presentation icon 20px correct label and descripti', async ({ page }) => {
    // Checkpoint 2: "Create Presentations" goal has Presentation icon (20px), correct label and description
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "\"Create Presentations\" goal has Presentation icon (20px), correct label and description",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-002 ' + "\"Create Presentations\" goal has Presentation icon (20px), correct label and description");
    }


    // This test validates: "Create Presentations" goal has Presentation icon (20px), correct label and description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Learn Research Methods goal has BookOpen icon 20px correct label and description', async ({ page }) => {
    // Checkpoint 3: "Learn Research Methods" goal has BookOpen icon (20px), correct label and description
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "\"Learn Research Methods\" goal has BookOpen icon (20px), correct label and description",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-003 ' + "\"Learn Research Methods\" goal has BookOpen icon (20px), correct label and description");
    }


    // This test validates: "Learn Research Methods" goal has BookOpen icon (20px), correct label and description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Each goal card shows icon label description', async ({ page }) => {
    // Checkpoint 4: Each goal card shows icon + label + description
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Each goal card shows icon + label + description",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-004 ' + "Each goal card shows icon + label + description");
    }


    // This test validates: Each goal card shows icon + label + description
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Clicking a goal toggles it to selected state', async ({ page }) => {
    // Checkpoint 5: Clicking a goal toggles it to selected state
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking a goal toggles it to selected state",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-005 ' + "Clicking a goal toggles it to selected state");
    }


    // This test validates: Clicking a goal toggles it to selected state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Selected goal shows bg-brand5 border-brand30 styling', async ({ page }) => {
    // Checkpoint 6: Selected goal shows `bg-brand/5 border-brand/30` styling
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected goal shows `bg-brand/5 border-brand/30` styling",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-006 ' + "Selected goal shows `bg-brand/5 border-brand/30` styling");
    }


    // This test validates: Selected goal shows `bg-brand/5 border-brand/30` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Selected goal shows Check icon 18px on the right side', async ({ page }) => {
    // Checkpoint 7: Selected goal shows Check icon (18px) on the right side
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected goal shows Check icon (18px) on the right side",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-007 ' + "Selected goal shows Check icon (18px) on the right side");
    }


    // This test validates: Selected goal shows Check icon (18px) on the right side
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Clicking a selected goal deselects it', async ({ page }) => {
    // Checkpoint 8: Clicking a selected goal deselects it
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking a selected goal deselects it",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-008 ' + "Clicking a selected goal deselects it");
    }


    // This test validates: Clicking a selected goal deselects it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Multiple goals can be selected simultaneously', async ({ page }) => {
    // Checkpoint 9: Multiple goals can be selected simultaneously
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Multiple goals can be selected simultaneously",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-009 ' + "Multiple goals can be selected simultaneously");
    }


    // This test validates: Multiple goals can be selected simultaneously
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Continue button is disabled when 0 goals are selected', async ({ page }) => {
    // Checkpoint 10: Continue button is disabled when 0 goals are selected
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue button is disabled when 0 goals are selected",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-010 ' + "Continue button is disabled when 0 goals are selected");
    }


    // This test validates: Continue button is disabled when 0 goals are selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Continue button is enabled when 1 or more goals are selected', async ({ page }) => {
    // Checkpoint 11: Continue button is enabled when 1 or more goals are selected
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue button is enabled when 1 or more goals are selected",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-011 ' + "Continue button is enabled when 1 or more goals are selected");
    }


    // This test validates: Continue button is enabled when 1 or more goals are selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Selecting all 5 goals works correctly', async ({ page }) => {
    // Checkpoint 12: Selecting all 5 goals works correctly
    // Section: Step 2 — Goals > Goals List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selecting all 5 goals works correctly",
      section: "Step 2 — Goals",
      subsection: "Goals List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-012 ' + "Selecting all 5 goals works correctly");
    }


    // This test validates: Selecting all 5 goals works correctly
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Heading text matches Heres what you can do', async ({ page }) => {
    // Checkpoint 13: Heading text matches: "Here's what you can do"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Heading text matches: \"Here's what you can do\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-013 ' + "Heading text matches: \"Here's what you can do\"");
    }


    // This test validates: Heading text matches: "Here's what you can do"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Description text matches exactly', async ({ page }) => {
    // Checkpoint 14: Description text matches exactly
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Description text matches exactly",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-014 ' + "Description text matches exactly");
    }


    // This test validates: Description text matches exactly
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 5 feature rows are rendered from the FEATURES array with numbered badges', async ({ page }) => {
    // Checkpoint 15: 5 feature rows are rendered from the `FEATURES` array with numbered badges
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "5 feature rows are rendered from the `FEATURES` array with numbered badges",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-015 ' + "5 feature rows are rendered from the `FEATURES` array with numbered badges");
    }


    // This test validates: 5 feature rows are rendered from the `FEATURES` array with numbered badges
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Feature 1 Literature Search with description Search 282M papers across PubMed Se', async ({ page }) => {
    // Checkpoint 16: Feature 1: "Literature Search" with description "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature 1: \"Literature Search\" with description \"Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-016 ' + "Feature 1: \"Literature Search\" with description \"Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex\"");
    }


    // This test validates: Feature 1: "Literature Search" with description "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Feature 2 The Studio with description AI-powered editor with Learn Mode and Draf', async ({ page }) => {
    // Checkpoint 17: Feature 2: "The Studio" with description "AI-powered editor with Learn Mode and Draft Mode"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature 2: \"The Studio\" with description \"AI-powered editor with Learn Mode and Draft Mode\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-017 ' + "Feature 2: \"The Studio\" with description \"AI-powered editor with Learn Mode and Draft Mode\"");
    }


    // This test validates: Feature 2: "The Studio" with description "AI-powered editor with Learn Mode and Draft Mode"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Feature 3 Citation Manager with description Auto-format citations in 10000 style', async ({ page }) => {
    // Checkpoint 18: Feature 3: "Citation Manager" with description "Auto-format citations in 10,000+ styles"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature 3: \"Citation Manager\" with description \"Auto-format citations in 10,000+ styles\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-018 ' + "Feature 3: \"Citation Manager\" with description \"Auto-format citations in 10,000+ styles\"");
    }


    // This test validates: Feature 3: "Citation Manager" with description "Auto-format citations in 10,000+ styles"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Feature 4 Final Checks with description Plagiarism detection and AI content anal', async ({ page }) => {
    // Checkpoint 19: Feature 4: "Final Checks" with description "Plagiarism detection and AI content analysis"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature 4: \"Final Checks\" with description \"Plagiarism detection and AI content analysis\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-019 ' + "Feature 4: \"Final Checks\" with description \"Plagiarism detection and AI content analysis\"");
    }


    // This test validates: Feature 4: "Final Checks" with description "Plagiarism detection and AI content analysis"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Feature 5 Slides Generator with description Turn your paper into a presentation ', async ({ page }) => {
    // Checkpoint 20: Feature 5: "Slides Generator" with description "Turn your paper into a presentation in minutes"
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature 5: \"Slides Generator\" with description \"Turn your paper into a presentation in minutes\"",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-020 ' + "Feature 5: \"Slides Generator\" with description \"Turn your paper into a presentation in minutes\"");
    }


    // This test validates: Feature 5: "Slides Generator" with description "Turn your paper into a presentation in minutes"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Features are numbered 1-5', async ({ page }) => {
    // Checkpoint 21: Features are numbered 1-5
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Features are numbered 1-5",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-021 ' + "Features are numbered 1-5");
    }


    // This test validates: Features are numbered 1-5
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Complete button is always enabled no validation required', async ({ page }) => {
    // Checkpoint 22: Complete button is always enabled (no validation required)
    // Section: Step 3 — Feature Tour > Features List

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Complete button is always enabled (no validation required)",
      section: "Step 3 — Feature Tour",
      subsection: "Features List",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-022 ' + "Complete button is always enabled (no validation required)");
    }


    // This test validates: Complete button is always enabled (no validation required)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Back button shows Back text with ArrowLeft icon 16px', async ({ page }) => {
    // Checkpoint 23: Back button shows "Back" text with ArrowLeft icon (16px)
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Back button shows \"Back\" text with ArrowLeft icon (16px)",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-023 ' + "Back button shows \"Back\" text with ArrowLeft icon (16px)");
    }


    // This test validates: Back button shows "Back" text with ArrowLeft icon (16px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Back button is disabled on step 0', async ({ page }) => {
    // Checkpoint 24: Back button is disabled on step 0
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Back button is disabled on step 0",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-024 ' + "Back button is disabled on step 0");
    }


    // This test validates: Back button is disabled on step 0
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Back button has opacity-0 when disabled hidden but present in DOM', async ({ page }) => {
    // Checkpoint 25: Back button has `opacity-0` when disabled (hidden but present in DOM)
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Back button has `opacity-0` when disabled (hidden but present in DOM)",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-025 ' + "Back button has `opacity-0` when disabled (hidden but present in DOM)");
    }


    // This test validates: Back button has `opacity-0` when disabled (hidden but present in DOM)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Back button is enabled on steps 1 2 3', async ({ page }) => {
    // Checkpoint 26: Back button is enabled on steps 1, 2, 3
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Back button is enabled on steps 1, 2, 3",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-026 ' + "Back button is enabled on steps 1, 2, 3");
    }


    // This test validates: Back button is enabled on steps 1, 2, 3
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Clicking Back on step 1 navigates to step 0', async ({ page }) => {
    // Checkpoint 27: Clicking Back on step 1 navigates to step 0
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking Back on step 1 navigates to step 0",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-027 ' + "Clicking Back on step 1 navigates to step 0");
    }


    // This test validates: Clicking Back on step 1 navigates to step 0
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Clicking Back on step 2 navigates to step 1', async ({ page }) => {
    // Checkpoint 28: Clicking Back on step 2 navigates to step 1
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking Back on step 2 navigates to step 1",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-028 ' + "Clicking Back on step 2 navigates to step 1");
    }


    // This test validates: Clicking Back on step 2 navigates to step 1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Clicking Back on step 3 navigates to step 2', async ({ page }) => {
    // Checkpoint 29: Clicking Back on step 3 navigates to step 2
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking Back on step 3 navigates to step 2",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-029 ' + "Clicking Back on step 3 navigates to step 2");
    }


    // This test validates: Clicking Back on step 3 navigates to step 2
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Selections are preserved when navigating back and forward', async ({ page }) => {
    // Checkpoint 30: Selections are preserved when navigating back and forward
    // Section: Navigation Controls > Back Button

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selections are preserved when navigating back and forward",
      section: "Navigation Controls",
      subsection: "Back Button",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-030 ' + "Selections are preserved when navigating back and forward");
    }


    // This test validates: Selections are preserved when navigating back and forward
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Continue button shows Continue text with ArrowRight icon 16px', async ({ page }) => {
    // Checkpoint 31: Continue button shows "Continue" text with ArrowRight icon (16px)
    // Section: Navigation Controls > Continue Button (Steps 0-2)

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue button shows \"Continue\" text with ArrowRight icon (16px)",
      section: "Navigation Controls",
      subsection: "Continue Button (Steps 0-2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-031 ' + "Continue button shows \"Continue\" text with ArrowRight icon (16px)");
    }


    // This test validates: Continue button shows "Continue" text with ArrowRight icon (16px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Continue button uses bg-brand text-white styling', async ({ page }) => {
    // Checkpoint 32: Continue button uses `bg-brand text-white` styling
    // Section: Navigation Controls > Continue Button (Steps 0-2)

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue button uses `bg-brand text-white` styling",
      section: "Navigation Controls",
      subsection: "Continue Button (Steps 0-2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-032 ' + "Continue button uses `bg-brand text-white` styling");
    }


    // This test validates: Continue button uses `bg-brand text-white` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Continue button is disabled with opacity-50 when canNext is false', async ({ page }) => {
    // Checkpoint 33: Continue button is disabled with `opacity-50` when canNext is false
    // Section: Navigation Controls > Continue Button (Steps 0-2)

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue button is disabled with `opacity-50` when canNext is false",
      section: "Navigation Controls",
      subsection: "Continue Button (Steps 0-2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-033 ' + "Continue button is disabled with `opacity-50` when canNext is false");
    }


    // This test validates: Continue button is disabled with `opacity-50` when canNext is false
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: On step 0 Continue is always enabled', async ({ page }) => {
    // Checkpoint 34: On step 0: Continue is always enabled
    // Section: Navigation Controls > Continue Button (Steps 0-2)

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "On step 0: Continue is always enabled",
      section: "Navigation Controls",
      subsection: "Continue Button (Steps 0-2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-034 ' + "On step 0: Continue is always enabled");
    }


    // This test validates: On step 0: Continue is always enabled
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
