/**
 * Auto-generated Playwright test for onboarding/spec-004
 * Source: e2e/specs/onboarding/spec-004.md
 * Generated: 2026-03-15T15:25:24.538Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts onboarding spec-004
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { assertOnboardingCheckpoint } from '../../module-assertions/onboarding';


















test.describe('onboarding / spec-004', () => {
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

  test('cp-000: Main container uses glass-panel rounded-2xl p-8', async ({ page }) => {
    // Checkpoint 0: Main container uses `glass-panel rounded-2xl p-8`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Main container uses `glass-panel rounded-2xl p-8`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-000 ' + "Main container uses `glass-panel rounded-2xl p-8`");
    }


    // This test validates: Main container uses `glass-panel rounded-2xl p-8`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Primary text uses text-ink', async ({ page }) => {
    // Checkpoint 1: Primary text uses `text-ink`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Primary text uses `text-ink`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-001 ' + "Primary text uses `text-ink`");
    }


    // This test validates: Primary text uses `text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Muteddescription text uses text-ink-muted', async ({ page }) => {
    // Checkpoint 2: Muted/description text uses `text-ink-muted`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Muted/description text uses `text-ink-muted`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-002 ' + "Muted/description text uses `text-ink-muted`");
    }


    // This test validates: Muted/description text uses `text-ink-muted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Brand color is applied consistently across buttons and active states', async ({ page }) => {
    // Checkpoint 3: Brand color is applied consistently across buttons and active states
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Brand color is applied consistently across buttons and active states",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-003 ' + "Brand color is applied consistently across buttons and active states");
    }


    // This test validates: Brand color is applied consistently across buttons and active states
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Input fields show focusring-2 focusring-brand40 on focus', async ({ page }) => {
    // Checkpoint 4: Input fields show `focus:ring-2 focus:ring-brand/40` on focus
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Input fields show `focus:ring-2 focus:ring-brand/40` on focus",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-004 ' + "Input fields show `focus:ring-2 focus:ring-brand/40` on focus");
    }


    // This test validates: Input fields show `focus:ring-2 focus:ring-brand/40` on focus
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Selected specialty uses bg-brand10 text-brand border-brand30', async ({ page }) => {
    // Checkpoint 5: Selected specialty uses `bg-brand/10 text-brand border-brand/30`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected specialty uses `bg-brand/10 text-brand border-brand/30`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-005 ' + "Selected specialty uses `bg-brand/10 text-brand border-brand/30`");
    }


    // This test validates: Selected specialty uses `bg-brand/10 text-brand border-brand/30`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Selected goal uses bg-brand5 border-brand30', async ({ page }) => {
    // Checkpoint 6: Selected goal uses `bg-brand/5 border-brand/30`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected goal uses `bg-brand/5 border-brand/30`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-006 ' + "Selected goal uses `bg-brand/5 border-brand/30`");
    }


    // This test validates: Selected goal uses `bg-brand/5 border-brand/30`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Unselected items use bg-surface-raised text-ink-muted border-border', async ({ page }) => {
    // Checkpoint 7: Unselected items use `bg-surface-raised text-ink-muted border-border`
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Unselected items use `bg-surface-raised text-ink-muted border-border`",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-007 ' + "Unselected items use `bg-surface-raised text-ink-muted border-border`");
    }


    // This test validates: Unselected items use `bg-surface-raised text-ink-muted border-border`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Page is responsive and centered', async ({ page }) => {
    // Checkpoint 8: Page is responsive and centered
    // Section: Styling & Theming

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Page is responsive and centered",
      section: "Styling & Theming",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-008 ' + "Page is responsive and centered");
    }


    // This test validates: Page is responsive and centered
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: step defaults to 0', async ({ page }) => {
    // Checkpoint 9: `step` defaults to `0`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`step` defaults to `0`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-009 ' + "`step` defaults to `0`");
    }


    // This test validates: `step` defaults to `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: name defaults to an empty string', async ({ page }) => {
    // Checkpoint 10: `name` defaults to an empty string
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`name` defaults to an empty string",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-010 ' + "`name` defaults to an empty string");
    }


    // This test validates: `name` defaults to an empty string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: institution defaults to an empty string', async ({ page }) => {
    // Checkpoint 11: `institution` defaults to an empty string
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`institution` defaults to an empty string",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-011 ' + "`institution` defaults to an empty string");
    }


    // This test validates: `institution` defaults to an empty string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: selectedSpecialties defaults to an empty array', async ({ page }) => {
    // Checkpoint 12: `selectedSpecialties` defaults to an empty array
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`selectedSpecialties` defaults to an empty array",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-012 ' + "`selectedSpecialties` defaults to an empty array");
    }


    // This test validates: `selectedSpecialties` defaults to an empty array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: selectedGoals defaults to an empty array', async ({ page }) => {
    // Checkpoint 13: `selectedGoals` defaults to an empty array
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`selectedGoals` defaults to an empty array",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-013 ' + "`selectedGoals` defaults to an empty array");
    }


    // This test validates: `selectedGoals` defaults to an empty array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: saving defaults to false', async ({ page }) => {
    // Checkpoint 14: `saving` defaults to `false`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`saving` defaults to `false`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-014 ' + "`saving` defaults to `false`");
    }


    // This test validates: `saving` defaults to `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: totalSteps is hard-coded to 4', async ({ page }) => {
    // Checkpoint 15: `totalSteps` is hard-coded to `4`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`totalSteps` is hard-coded to `4`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-015 ' + "`totalSteps` is hard-coded to `4`");
    }


    // This test validates: `totalSteps` is hard-coded to `4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: canNext is derived from step and current selections rather than stored independe', async ({ page }) => {
    // Checkpoint 16: `canNext` is derived from `step` and current selections rather than stored independently
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`canNext` is derived from `step` and current selections rather than stored independently",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-016 ' + "`canNext` is derived from `step` and current selections rather than stored independently");
    }


    // This test validates: `canNext` is derived from `step` and current selections rather than stored independently
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Only one step panel is rendered at a time based on the current step', async ({ page }) => {
    // Checkpoint 17: Only one step panel is rendered at a time based on the current `step`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Only one step panel is rendered at a time based on the current `step`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-017 ' + "Only one step panel is rendered at a time based on the current `step`");
    }


    // This test validates: Only one step panel is rendered at a time based on the current `step`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Progress bars and navigation controls remain mounted while step content swaps', async ({ page }) => {
    // Checkpoint 18: Progress bars and navigation controls remain mounted while step content swaps
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Progress bars and navigation controls remain mounted while step content swaps",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-018 ' + "Progress bars and navigation controls remain mounted while step content swaps");
    }


    // This test validates: Progress bars and navigation controls remain mounted while step content swaps
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Step 0 panel uses text-center at the card level while the form row itself switch', async ({ page }) => {
    // Checkpoint 19: Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-019 ' + "Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`");
    }


    // This test validates: Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Welcome icon is wrapped in a 64x64 rounded square with bg-brand10 text-brand', async ({ page }) => {
    // Checkpoint 20: Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-020 ' + "Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`");
    }


    // This test validates: Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Name input is a controlled input bound to name', async ({ page }) => {
    // Checkpoint 21: Name input is a controlled input bound to `name`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Name input is a controlled input bound to `name`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-021 ' + "Name input is a controlled input bound to `name`");
    }


    // This test validates: Name input is a controlled input bound to `name`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Institution input is a controlled input bound to institution', async ({ page }) => {
    // Checkpoint 22: Institution input is a controlled input bound to `institution`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Institution input is a controlled input bound to `institution`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-022 ' + "Institution input is a controlled input bound to `institution`");
    }


    // This test validates: Institution input is a controlled input bound to `institution`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Name input has no required maxLength or trimming behavior in the current impleme', async ({ page }) => {
    // Checkpoint 23: Name input has no `required`, `maxLength`, or trimming behavior in the current implementation
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Name input has no `required`, `maxLength`, or trimming behavior in the current implementation",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-023 ' + "Name input has no `required`, `maxLength`, or trimming behavior in the current implementation");
    }


    // This test validates: Name input has no `required`, `maxLength`, or trimming behavior in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Institution input has no required maxLength or trimming behavior in the current ', async ({ page }) => {
    // Checkpoint 24: Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-024 ' + "Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation");
    }


    // This test validates: Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Neither welcome-step input is prefilled from saved profile data', async ({ page }) => {
    // Checkpoint 25: Neither welcome-step input is prefilled from saved profile data
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Neither welcome-step input is prefilled from saved profile data",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-025 ' + "Neither welcome-step input is prefilled from saved profile data");
    }


    // This test validates: Neither welcome-step input is prefilled from saved profile data
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Step 0 has no inline validation helper text or error message area', async ({ page }) => {
    // Checkpoint 26: Step 0 has no inline validation, helper text, or error message area
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Step 0 has no inline validation, helper text, or error message area",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-026 ' + "Step 0 has no inline validation, helper text, or error message area");
    }


    // This test validates: Step 0 has no inline validation, helper text, or error message area
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Specialty choices are rendered from the SPECIALTIES constant array in source ord', async ({ page }) => {
    // Checkpoint 27: Specialty choices are rendered from the `SPECIALTIES` constant array in source order
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Specialty choices are rendered from the `SPECIALTIES` constant array in source order",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-027 ' + "Specialty choices are rendered from the `SPECIALTIES` constant array in source order");
    }


    // This test validates: Specialty choices are rendered from the `SPECIALTIES` constant array in source order
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Each specialty is rendered as a button not a checkbox input', async ({ page }) => {
    // Checkpoint 28: Each specialty is rendered as a button, not a checkbox input
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Each specialty is rendered as a button, not a checkbox input",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-028 ' + "Each specialty is rendered as a button, not a checkbox input");
    }


    // This test validates: Each specialty is rendered as a button, not a checkbox input
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Clicking an unselected specialty appends it to selectedSpecialties', async ({ page }) => {
    // Checkpoint 29: Clicking an unselected specialty appends it to `selectedSpecialties`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking an unselected specialty appends it to `selectedSpecialties`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-029 ' + "Clicking an unselected specialty appends it to `selectedSpecialties`");
    }


    // This test validates: Clicking an unselected specialty appends it to `selectedSpecialties`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Clicking a selected specialty removes it from selectedSpecialties', async ({ page }) => {
    // Checkpoint 30: Clicking a selected specialty removes it from `selectedSpecialties`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking a selected specialty removes it from `selectedSpecialties`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-030 ' + "Clicking a selected specialty removes it from `selectedSpecialties`");
    }


    // This test validates: Clicking a selected specialty removes it from `selectedSpecialties`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Specialty selection order follows click order because new selections append to t', async ({ page }) => {
    // Checkpoint 31: Specialty selection order follows click order because new selections append to the array
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Specialty selection order follows click order because new selections append to the array",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-031 ' + "Specialty selection order follows click order because new selections append to the array");
    }


    // This test validates: Specialty selection order follows click order because new selections append to the array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Selected specialty buttons show an inline Check icon before the label text', async ({ page }) => {
    // Checkpoint 32: Selected specialty buttons show an inline `Check` icon before the label text
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected specialty buttons show an inline `Check` icon before the label text",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-032 ' + "Selected specialty buttons show an inline `Check` icon before the label text");
    }


    // This test validates: Selected specialty buttons show an inline `Check` icon before the label text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Selected specialty buttons keep the text and icon on one line with inline mr-1', async ({ page }) => {
    // Checkpoint 33: Selected specialty buttons keep the text and icon on one line with `inline mr-1`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected specialty buttons keep the text and icon on one line with `inline mr-1`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-033 ' + "Selected specialty buttons keep the text and icon on one line with `inline mr-1`");
    }


    // This test validates: Selected specialty buttons keep the text and icon on one line with `inline mr-1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Unselected specialty buttons gain hovertext-ink hoverborder-border', async ({ page }) => {
    // Checkpoint 34: Unselected specialty buttons gain `hover:text-ink hover:border-border`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Unselected specialty buttons gain `hover:text-ink hover:border-border`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-034 ' + "Unselected specialty buttons gain `hover:text-ink hover:border-border`");
    }


    // This test validates: Unselected specialty buttons gain `hover:text-ink hover:border-border`
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
