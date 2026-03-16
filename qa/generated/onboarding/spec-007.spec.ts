/**
 * Auto-generated Playwright test for onboarding/spec-007
 * Source: e2e/specs/onboarding/spec-007.md
 * Generated: 2026-03-15T15:27:23.354Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts onboarding spec-007
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { assertOnboardingCheckpoint } from '../../module-assertions/onboarding';


















test.describe('onboarding / spec-007', () => {
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

  test('cp-000: errortsx has its own use client directive', async ({ page }) => {
    // Checkpoint 0: `error.tsx` has its own `"use client"` directive
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`error.tsx` has its own `\"use client\"` directive",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-000 ' + "`error.tsx` has its own `\"use client\"` directive");
    }


    // This test validates: `error.tsx` has its own `"use client"` directive
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: ErrorDisplay calls SentrycaptureExceptionerror in useEffect', async ({ page }) => {
    // Checkpoint 1: `ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-001 ' + "`ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`");
    }


    // This test validates: `ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Error retry button text is Try Again', async ({ page }) => {
    // Checkpoint 2: Error retry button text is `Try Again`
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error retry button text is `Try Again`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-002 ' + "Error retry button text is `Try Again`");
    }


    // This test validates: Error retry button text is `Try Again`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Error retry button uses bg-brand text-white rounded-xl hoverbg-brand-hover trans', async ({ page }) => {
    // Checkpoint 3: Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-003 ' + "Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`");
    }


    // This test validates: Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: ErrorDisplay only renders the retry button when onRetry is provided', async ({ page }) => {
    // Checkpoint 4: `ErrorDisplay` only renders the retry button when `onRetry` is provided
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`ErrorDisplay` only renders the retry button when `onRetry` is provided",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-004 ' + "`ErrorDisplay` only renders the retry button when `onRetry` is provided");
    }


    // This test validates: `ErrorDisplay` only renders the retry button when `onRetry` is provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Error icon wrapper uses w-16 h-16 rounded-2xl bg-red-50010 text-red-500', async ({ page }) => {
    // Checkpoint 5: Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`
    // Section: Codex Verification Pass Discoveries > Error Display Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Error Display Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-005 ' + "Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`");
    }


    // This test validates: Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Goal-card check icon uses weightbold', async ({ page }) => {
    // Checkpoint 6: Goal-card check icon uses `weight="bold"`
    // Section: Codex Verification Pass Discoveries > Goal Selection Details

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Goal-card check icon uses `weight=\"bold\"`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Goal Selection Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-006 ' + "Goal-card check icon uses `weight=\"bold\"`");
    }


    // This test validates: Goal-card check icon uses `weight="bold"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Goal icon container uses w-10 h-10 rounded-lg with conditional background stylin', async ({ page }) => {
    // Checkpoint 7: Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling
    // Section: Codex Verification Pass Discoveries > Goal Selection Details

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling",
      section: "Codex Verification Pass Discoveries",
      subsection: "Goal Selection Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-007 ' + "Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling");
    }


    // This test validates: Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Selected goal icon container changes to bg-brand10 text-brand unselected uses bg', async ({ page }) => {
    // Checkpoint 8: Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`
    // Section: Codex Verification Pass Discoveries > Goal Selection Details

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Goal Selection Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-008 ' + "Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`");
    }


    // This test validates: Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Goal cards use text-left so label and description alignment stay left-aligned', async ({ page }) => {
    // Checkpoint 9: Goal cards use `text-left` so label and description alignment stay left-aligned
    // Section: Codex Verification Pass Discoveries > Goal Selection Details

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Goal cards use `text-left` so label and description alignment stay left-aligned",
      section: "Codex Verification Pass Discoveries",
      subsection: "Goal Selection Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-009 ' + "Goal cards use `text-left` so label and description alignment stay left-aligned");
    }


    // This test validates: Goal cards use `text-left` so label and description alignment stay left-aligned
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: handleComplete is wrapped in useCallback with deps name institution selectedSpec', async ({ page }) => {
    // Checkpoint 10: `handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-010 ' + "`handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`");
    }


    // This test validates: `handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: selectedGoals is excluded from the dependency array because handleComplete does ', async ({ page }) => {
    // Checkpoint 11: `selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-011 ' + "`selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it");
    }


    // This test validates: `selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Successful completion writes updated_at twice once in updateUserProfile and once', async ({ page }) => {
    // Checkpoint 12: Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-012 ' + "Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`");
    }


    // This test validates: Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: HTTP error responses from apionboardingcomplete do not enter the client catch un', async ({ page }) => {
    // Checkpoint 13: HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-013 ' + "HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws");
    }


    // This test validates: HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: updateUserProfile accepts 8 optional profile fields but onboarding sends only fu', async ({ page }) => {
    // Checkpoint 14: `updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-014 ' + "`updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`");
    }


    // This test validates: `updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: updateUserProfile builds a sparse payload and only sets columns whose values are', async ({ page }) => {
    // Checkpoint 15: `updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`
    // Section: Codex Verification Pass Discoveries > Completion Flow Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Completion Flow Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-015 ' + "`updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`");
    }


    // This test validates: `updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Step panels swap via conditional rendering with no animation wrapper around the ', async ({ page }) => {
    // Checkpoint 16: Step panels swap via conditional rendering with no animation wrapper around the content
    // Section: Codex Verification Pass Discoveries > Step Transitions & Persistence

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Step panels swap via conditional rendering with no animation wrapper around the content",
      section: "Codex Verification Pass Discoveries",
      subsection: "Step Transitions & Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-016 ' + "Step panels swap via conditional rendering with no animation wrapper around the content");
    }


    // This test validates: Step panels swap via conditional rendering with no animation wrapper around the content
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Progress bar state changes animate via transition-all', async ({ page }) => {
    // Checkpoint 17: Progress bar state changes animate via `transition-all`
    // Section: Codex Verification Pass Discoveries > Step Transitions & Persistence

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Progress bar state changes animate via `transition-all`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Step Transitions & Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-017 ' + "Progress bar state changes animate via `transition-all`");
    }


    // This test validates: Progress bar state changes animate via `transition-all`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Wizard progress and form state reset on page refresh', async ({ page }) => {
    // Checkpoint 18: Wizard progress and form state reset on page refresh
    // Section: Codex Verification Pass Discoveries > Step Transitions & Persistence

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Wizard progress and form state reset on page refresh",
      section: "Codex Verification Pass Discoveries",
      subsection: "Step Transitions & Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-018 ' + "Wizard progress and form state reset on page refresh");
    }


    // This test validates: Wizard progress and form state reset on page refresh
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Onboarding state is useState only there is no localStorage sessionStorage or mou', async ({ page }) => {
    // Checkpoint 19: Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore
    // Section: Codex Verification Pass Discoveries > Step Transitions & Persistence

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore",
      section: "Codex Verification Pass Discoveries",
      subsection: "Step Transitions & Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-019 ' + "Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore");
    }


    // This test validates: Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Continue and Complete buttons both use hoverbg-brand-hover transition-colors', async ({ page }) => {
    // Checkpoint 20: Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-020 ' + "Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`");
    }


    // This test validates: Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Complete button uses disabledopacity-50 while saving', async ({ page }) => {
    // Checkpoint 21: Complete button uses `disabled:opacity-50` while saving
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Complete button uses `disabled:opacity-50` while saving",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-021 ' + "Complete button uses `disabled:opacity-50` while saving");
    }


    // This test validates: Complete button uses `disabled:opacity-50` while saving
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Back button uses hovertext-ink transition-colors', async ({ page }) => {
    // Checkpoint 22: Back button uses `hover:text-ink transition-colors`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Back button uses `hover:text-ink transition-colors`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-022 ' + "Back button uses `hover:text-ink transition-colors`");
    }


    // This test validates: Back button uses `hover:text-ink transition-colors`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Loading navigation skeletons include rounded-xl', async ({ page }) => {
    // Checkpoint 23: Loading navigation skeletons include `rounded-xl`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Loading navigation skeletons include `rounded-xl`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-023 ' + "Loading navigation skeletons include `rounded-xl`");
    }


    // This test validates: Loading navigation skeletons include `rounded-xl`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Welcome-step inputs use rounded-xl distinct from the cards rounded-2xl', async ({ page }) => {
    // Checkpoint 24: Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-024 ' + "Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`");
    }


    // This test validates: Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Welcome-step inputs use px-4 py-3 bg-surface-raised border border-border text-sm', async ({ page }) => {
    // Checkpoint 25: Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-025 ' + "Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`");
    }


    // This test validates: Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Welcome-step labels use block text-xs font-medium text-ink-muted mb-15', async ({ page }) => {
    // Checkpoint 26: Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`
    // Section: Codex Verification Pass Discoveries > Button & Input Styling

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Button & Input Styling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-026 ' + "Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`");
    }


    // This test validates: Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Skeleton base classes are animate-pulse rounded-lg bg-surface-raised', async ({ page }) => {
    // Checkpoint 27: `Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`
    // Section: Codex Verification Pass Discoveries > Skeleton Component Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "`Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Skeleton Component Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-027 ' + "`Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`");
    }


    // This test validates: `Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Loading placeholders use Tailwind animate-pulse not a shimmer gradient', async ({ page }) => {
    // Checkpoint 28: Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient
    // Section: Codex Verification Pass Discoveries > Skeleton Component Internals

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient",
      section: "Codex Verification Pass Discoveries",
      subsection: "Skeleton Component Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-028 ' + "Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient");
    }


    // This test validates: Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: In production without valid Clerk keys getCurrentUserId throws a configuration e', async ({ page }) => {
    // Checkpoint 29: In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error
    // Section: Codex Verification Pass Discoveries > Auth Edge Cases

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error",
      section: "Codex Verification Pass Discoveries",
      subsection: "Auth Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-029 ' + "In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error");
    }


    // This test validates: In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: In development a missing session falls back to DEV_USER_ID dev_user_001', async ({ page }) => {
    // Checkpoint 30: In development, a missing session falls back to `DEV_USER_ID = "dev_user_001"`
    // Section: Codex Verification Pass Discoveries > Auth Edge Cases

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "In development, a missing session falls back to `DEV_USER_ID = \"dev_user_001\"`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Auth Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-030 ' + "In development, a missing session falls back to `DEV_USER_ID = \"dev_user_001\"`");
    }


    // This test validates: In development, a missing session falls back to `DEV_USER_ID = "dev_user_001"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Feature tour constants use title desc while goal constants use label description', async ({ page }) => {
    // Checkpoint 31: Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`
    // Section: Codex Verification Pass Discoveries > Naming Inconsistency

    // Navigate to the page
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/onboarding/spec-007');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertOnboardingCheckpoint({
      page,
      description: "Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`",
      section: "Codex Verification Pass Discoveries",
      subsection: "Naming Inconsistency",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled onboarding checkpoint: cp-031 ' + "Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`");
    }


    // This test validates: Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`
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
