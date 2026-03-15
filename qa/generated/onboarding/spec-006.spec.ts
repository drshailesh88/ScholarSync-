/**
 * Auto-generated Playwright test for onboarding/spec-006
 * Source: e2e/specs/onboarding/spec-006.md
 * Generated: 2026-03-15T15:26:43.379Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts onboarding spec-006
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { assertOnboardingCheckpoint } from '../../module-assertions/onboarding';


















test.describe('onboarding / spec-006', () => {
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

  test('cp-000: Completion button text changes to Setting up while saving is true', async ({ page }) => {
    // Checkpoint 0: Completion button text changes to `Setting up...` while `saving` is true
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion button text changes to `Setting up...` while `saving` is true",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-000 ' + "Completion button text changes to `Setting up...` while `saving` is true");
    }


    // This test validates: Completion button text changes to `Setting up...` while `saving` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Completion button remains rendered with the ArrowRight icon even while saving', async ({ page }) => {
    // Checkpoint 1: Completion button remains rendered with the `ArrowRight` icon even while saving
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion button remains rendered with the `ArrowRight` icon even while saving",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-001 ' + "Completion button remains rendered with the `ArrowRight` icon even while saving");
    }


    // This test validates: Completion button remains rendered with the `ArrowRight` icon even while saving
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Completion button is disabled only while saving is true', async ({ page }) => {
    // Checkpoint 2: Completion button is disabled only while `saving` is true
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion button is disabled only while `saving` is true",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-002 ' + "Completion button is disabled only while `saving` is true");
    }


    // This test validates: Completion button is disabled only while `saving` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Clicking completion sets saving to true before any async work begins', async ({ page }) => {
    // Checkpoint 3: Clicking completion sets `saving` to `true` before any async work begins
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Clicking completion sets `saving` to `true` before any async work begins",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-003 ' + "Clicking completion sets `saving` to `true` before any async work begins");
    }


    // This test validates: Clicking completion sets `saving` to `true` before any async work begins
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Completion payload sends full_name only when name is non-empty', async ({ page }) => {
    // Checkpoint 4: Completion payload sends `full_name` only when `name` is non-empty
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion payload sends `full_name` only when `name` is non-empty",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-004 ' + "Completion payload sends `full_name` only when `name` is non-empty");
    }


    // This test validates: Completion payload sends `full_name` only when `name` is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Completion payload sends specialty only when at least one specialty is selected', async ({ page }) => {
    // Checkpoint 5: Completion payload sends `specialty` only when at least one specialty is selected
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion payload sends `specialty` only when at least one specialty is selected",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-005 ' + "Completion payload sends `specialty` only when at least one specialty is selected");
    }


    // This test validates: Completion payload sends `specialty` only when at least one specialty is selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Completion payload sends bio only when institution is non-empty', async ({ page }) => {
    // Checkpoint 6: Completion payload sends `bio` only when `institution` is non-empty
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion payload sends `bio` only when `institution` is non-empty",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-006 ' + "Completion payload sends `bio` only when `institution` is non-empty");
    }


    // This test validates: Completion payload sends `bio` only when `institution` is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Selected specialties are serialized as selectedSpecialtiesjoin', async ({ page }) => {
    // Checkpoint 7: Selected specialties are serialized as `selectedSpecialties.join(", ")`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected specialties are serialized as `selectedSpecialties.join(\", \")`",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-007 ' + "Selected specialties are serialized as `selectedSpecialties.join(\", \")`");
    }


    // This test validates: Selected specialties are serialized as `selectedSpecialties.join(", ")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Institution is stored in the bio field in the current implementation', async ({ page }) => {
    // Checkpoint 8: Institution is stored in the `bio` field in the current implementation
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Institution is stored in the `bio` field in the current implementation",
      section: "Styling & Theming",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-008 ' + "Institution is stored in the `bio` field in the current implementation");
    }


    // This test validates: Institution is stored in the `bio` field in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Completion flow does not persist selectedGoals', async ({ page }) => {
    // Checkpoint 9: Completion flow does not persist `selectedGoals`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion flow does not persist `selectedGoals`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-009 ' + "Completion flow does not persist `selectedGoals`");
    }


    // This test validates: Completion flow does not persist `selectedGoals`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Completion flow calls updateUserProfile before posting to apionboardingcomplete', async ({ page }) => {
    // Checkpoint 10: Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-010 ' + "Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`");
    }


    // This test validates: Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Completion flow posts to apionboardingcomplete with method POST and no request b', async ({ page }) => {
    // Checkpoint 11: Completion flow posts to `/api/onboarding/complete` with `method: "POST"` and no request body
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Completion flow posts to `/api/onboarding/complete` with `method: \"POST\"` and no request body",
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
      throw new Error('Unhandled onboarding checkpoint: cp-011 ' + "Completion flow posts to `/api/onboarding/complete` with `method: \"POST\"` and no request body");
    }


    // This test validates: Completion flow posts to `/api/onboarding/complete` with `method: "POST"` and no request body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Successful completion redirects to dashboard', async ({ page }) => {
    // Checkpoint 12: Successful completion redirects to `/dashboard`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Successful completion redirects to `/dashboard`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-012 ' + "Successful completion redirects to `/dashboard`");
    }


    // This test validates: Successful completion redirects to `/dashboard`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Failed completion logs Onboarding save failed to the console', async ({ page }) => {
    // Checkpoint 13: Failed completion logs `Onboarding save failed:` to the console
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Failed completion logs `Onboarding save failed:` to the console",
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
      throw new Error('Unhandled onboarding checkpoint: cp-013 ' + "Failed completion logs `Onboarding save failed:` to the console");
    }


    // This test validates: Failed completion logs `Onboarding save failed:` to the console
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Failed completion still redirects to dashboard', async ({ page }) => {
    // Checkpoint 14: Failed completion still redirects to `/dashboard`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Failed completion still redirects to `/dashboard`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-014 ' + "Failed completion still redirects to `/dashboard`");
    }


    // This test validates: Failed completion still redirects to `/dashboard`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: saving is reset to false in finally even after navigation is triggered', async ({ page }) => {
    // Checkpoint 15: `saving` is reset to `false` in `finally`, even after navigation is triggered
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`saving` is reset to `false` in `finally`, even after navigation is triggered",
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
      throw new Error('Unhandled onboarding checkpoint: cp-015 ' + "`saving` is reset to `false` in `finally`, even after navigation is triggered");
    }


    // This test validates: `saving` is reset to `false` in `finally`, even after navigation is triggered
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: POST apionboardingcomplete returns success true on success', async ({ page }) => {
    // Checkpoint 16: `POST /api/onboarding/complete` returns `{ success: true }` on success
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`POST /api/onboarding/complete` returns `{ success: true }` on success",
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
      throw new Error('Unhandled onboarding checkpoint: cp-016 ' + "`POST /api/onboarding/complete` returns `{ success: true }` on success");
    }


    // This test validates: `POST /api/onboarding/complete` returns `{ success: true }` on success
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: API route updates usersonboarding_completed to true', async ({ page }) => {
    // Checkpoint 17: API route updates `users.onboarding_completed` to `true`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "API route updates `users.onboarding_completed` to `true`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-017 ' + "API route updates `users.onboarding_completed` to `true`");
    }


    // This test validates: API route updates `users.onboarding_completed` to `true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: API route updates usersupdated_at to new Date', async ({ page }) => {
    // Checkpoint 18: API route updates `users.updated_at` to `new Date()`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "API route updates `users.updated_at` to `new Date()`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-018 ' + "API route updates `users.updated_at` to `new Date()`");
    }


    // This test validates: API route updates `users.updated_at` to `new Date()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: API route catches all thrown errors and returns 500 error Failed to complete onb', async ({ page }) => {
    // Checkpoint 19: API route catches all thrown errors and returns `500 { error: "Failed to complete onboarding" }`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "API route catches all thrown errors and returns `500 { error: \"Failed to complete onboarding\" }`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-019 ' + "API route catches all thrown errors and returns `500 { error: \"Failed to complete onboarding\" }`");
    }


    // This test validates: API route catches all thrown errors and returns `500 { error: "Failed to complete onboarding" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: API route logs Onboarding complete error to the server console on failure', async ({ page }) => {
    // Checkpoint 20: API route logs `Onboarding complete error:` to the server console on failure
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "API route logs `Onboarding complete error:` to the server console on failure",
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
      throw new Error('Unhandled onboarding checkpoint: cp-020 ' + "API route logs `Onboarding complete error:` to the server console on failure");
    }


    // This test validates: API route logs `Onboarding complete error:` to the server console on failure
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Unauthenticated failures are caught by the generic catch and return 500 not a de', async ({ page }) => {
    // Checkpoint 21: Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation",
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
      throw new Error('Unhandled onboarding checkpoint: cp-021 ' + "Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation");
    }


    // This test validates: Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: API route exports only POST unsupported methods rely on Nextjs route handling ra', async ({ page }) => {
    // Checkpoint 22: API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic",
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
      throw new Error('Unhandled onboarding checkpoint: cp-022 ' + "API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic");
    }


    // This test validates: API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Loading skeleton wrapper uses the same min-h-calc100vh-7rem flex items-center ju', async ({ page }) => {
    // Checkpoint 23: Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page",
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
      throw new Error('Unhandled onboarding checkpoint: cp-023 ' + "Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page");
    }


    // This test validates: Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Loading skeleton container uses w-full max-w-2xl mx-auto', async ({ page }) => {
    // Checkpoint 24: Loading skeleton container uses `w-full max-w-2xl mx-auto`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Loading skeleton container uses `w-full max-w-2xl mx-auto`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-024 ' + "Loading skeleton container uses `w-full max-w-2xl mx-auto`");
    }


    // This test validates: Loading skeleton container uses `w-full max-w-2xl mx-auto`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Loading state renders exactly four progress skeleton bars using Arrayfrom length', async ({ page }) => {
    // Checkpoint 25: Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-025 ' + "Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`");
    }


    // This test validates: Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Error state delegates to ErrorDisplay with title Onboarding unavailable', async ({ page }) => {
    // Checkpoint 26: Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-026 ' + "Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`");
    }


    // This test validates: Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Error state message is We couldnt load the onboarding flow Please try again', async ({ page }) => {
    // Checkpoint 27: Error state message is `We couldn't load the onboarding flow. Please try again.`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error state message is `We couldn't load the onboarding flow. Please try again.`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-027 ' + "Error state message is `We couldn't load the onboarding flow. Please try again.`");
    }


    // This test validates: Error state message is `We couldn't load the onboarding flow. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Error boundary passes both error and reset through to ErrorDisplay', async ({ page }) => {
    // Checkpoint 28: Error boundary passes both `error` and `reset` through to `ErrorDisplay`
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error boundary passes both `error` and `reset` through to `ErrorDisplay`",
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
      throw new Error('Unhandled onboarding checkpoint: cp-028 ' + "Error boundary passes both `error` and `reset` through to `ErrorDisplay`");
    }


    // This test validates: Error boundary passes both `error` and `reset` through to `ErrorDisplay`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Route should be documented as onboarding not as the source file path', async ({ page }) => {
    // Checkpoint 29: Route should be documented as `/onboarding`, not as the source file path
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Route should be documented as `/onboarding`, not as the source file path",
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
      throw new Error('Unhandled onboarding checkpoint: cp-029 ' + "Route should be documented as `/onboarding`, not as the source file path");
    }


    // This test validates: Route should be documented as `/onboarding`, not as the source file path
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Unauthenticated onboarding-complete requests currently surface as generic 500 fa', async ({ page }) => {
    // Checkpoint 30: Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response
    // Section: Styling & Theming > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response",
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
      throw new Error('Unhandled onboarding checkpoint: cp-030 ' + "Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response");
    }


    // This test validates: Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: applayouttsx authenticates onboarding with getCurrentUserId and redirects failur', async ({ page }) => {
    // Checkpoint 31: `(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`
    // Section: Codex Verification Pass Discoveries > App Shell & Auth Context

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`",
      section: "Codex Verification Pass Discoveries",
      subsection: "App Shell & Auth Context",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-031 ' + "`(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`");
    }


    // This test validates: `(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Onboarding content is rendered inside AppShell main classNameflex-1 overflow-y-a', async ({ page }) => {
    // Checkpoint 32: Onboarding content is rendered inside `AppShell` `<main className="flex-1 overflow-y-auto p-6">`
    // Section: Codex Verification Pass Discoveries > App Shell & Auth Context

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Onboarding content is rendered inside `AppShell` `<main className=\"flex-1 overflow-y-auto p-6\">`",
      section: "Codex Verification Pass Discoveries",
      subsection: "App Shell & Auth Context",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-032 ' + "Onboarding content is rendered inside `AppShell` `<main className=\"flex-1 overflow-y-auto p-6\">`");
    }


    // This test validates: Onboarding content is rendered inside `AppShell` `<main className="flex-1 overflow-y-auto p-6">`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: AppHeader and CommandPalette are mounted by AppShell during onboarding', async ({ page }) => {
    // Checkpoint 33: `AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding
    // Section: Codex Verification Pass Discoveries > App Shell & Auth Context

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding",
      section: "Codex Verification Pass Discoveries",
      subsection: "App Shell & Auth Context",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-033 ' + "`AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding");
    }


    // This test validates: `AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Desktop sidebar chrome is part of onboarding at md breakpoints mobile sidebar st', async ({ page }) => {
    // Checkpoint 34: Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened
    // Section: Codex Verification Pass Discoveries > App Shell & Auth Context

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened",
      section: "Codex Verification Pass Discoveries",
      subsection: "App Shell & Auth Context",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-034 ' + "Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened");
    }


    // This test validates: Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened
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
