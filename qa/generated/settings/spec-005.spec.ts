/**
 * Auto-generated Playwright test for settings/spec-005
 * Source: e2e/specs/settings/spec-005.md
 * Generated: 2026-03-15T15:32:19.498Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts settings spec-005
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


















import { assertSettingsCheckpoint } from '../../module-assertions/settings';

test.describe('settings / spec-005', () => {
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

  test('cp-000: Country input uses the shared focusring-2 focusring-brand40 focus style', async ({ page }) => {
    // Checkpoint 0: Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-000 ' + "Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style");
    }


    // This test validates: Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Bio label is rendered above the textarea', async ({ page }) => {
    // Checkpoint 1: `Bio` label is rendered above the textarea
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`Bio` label is rendered above the textarea",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-001 ' + "`Bio` label is rendered above the textarea");
    }


    // This test validates: `Bio` label is rendered above the textarea
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Bio textarea placeholder is A short bio about your research background', async ({ page }) => {
    // Checkpoint 2: Bio textarea placeholder is `A short bio about your research background...`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea placeholder is `A short bio about your research background...`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-002 ' + "Bio textarea placeholder is `A short bio about your research background...`");
    }


    // This test validates: Bio textarea placeholder is `A short bio about your research background...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Bio textarea is prefilled from userbio when profile data exists', async ({ page }) => {
    // Checkpoint 3: Bio textarea is prefilled from `user.bio` when profile data exists
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea is prefilled from `user.bio` when profile data exists",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-003 ' + "Bio textarea is prefilled from `user.bio` when profile data exists");
    }


    // This test validates: Bio textarea is prefilled from `user.bio` when profile data exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Bio textarea falls back to an empty string when userbio is null', async ({ page }) => {
    // Checkpoint 4: Bio textarea falls back to an empty string when `user.bio` is null
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea falls back to an empty string when `user.bio` is null",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-004 ' + "Bio textarea falls back to an empty string when `user.bio` is null");
    }


    // This test validates: Bio textarea falls back to an empty string when `user.bio` is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Bio textarea uses rows3', async ({ page }) => {
    // Checkpoint 5: Bio textarea uses `rows={3}`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea uses `rows={3}`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-005 ' + "Bio textarea uses `rows={3}`");
    }


    // This test validates: Bio textarea uses `rows={3}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Bio textarea is a controlled field bound to bio', async ({ page }) => {
    // Checkpoint 6: Bio textarea is a controlled field bound to `bio`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea is a controlled field bound to `bio`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-006 ' + "Bio textarea is a controlled field bound to `bio`");
    }


    // This test validates: Bio textarea is a controlled field bound to `bio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Bio textarea is resize-none in the current implementation', async ({ page }) => {
    // Checkpoint 7: Bio textarea is `resize-none` in the current implementation
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea is `resize-none` in the current implementation",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-007 ' + "Bio textarea is `resize-none` in the current implementation");
    }


    // This test validates: Bio textarea is `resize-none` in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Bio textarea uses the shared focusring-2 focusring-brand40 focus style', async ({ page }) => {
    // Checkpoint 8: Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-008 ' + "Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style");
    }


    // This test validates: Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Research Interests label is rendered above the chip area and entry controls', async ({ page }) => {
    // Checkpoint 9: `Research Interests` label is rendered above the chip area and entry controls
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`Research Interests` label is rendered above the chip area and entry controls",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-009 ' + "`Research Interests` label is rendered above the chip area and entry controls");
    }


    // This test validates: `Research Interests` label is rendered above the chip area and entry controls
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Existing research interests render as chips before the add-interest input', async ({ page }) => {
    // Checkpoint 10: Existing research interests render as chips before the add-interest input
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Existing research interests render as chips before the add-interest input",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-010 ' + "Existing research interests render as chips before the add-interest input");
    }


    // This test validates: Existing research interests render as chips before the add-interest input
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Each existing chip renders the interest text plus an X remove button', async ({ page }) => {
    // Checkpoint 11: Each existing chip renders the interest text plus an `X` remove button
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Each existing chip renders the interest text plus an `X` remove button",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-011 ' + "Each existing chip renders the interest text plus an `X` remove button");
    }


    // This test validates: Each existing chip renders the interest text plus an `X` remove button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Add-interest input placeholder is Type an interest and press Enter', async ({ page }) => {
    // Checkpoint 12: Add-interest input placeholder is `Type an interest and press Enter`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Add-interest input placeholder is `Type an interest and press Enter`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-012 ' + "Add-interest input placeholder is `Type an interest and press Enter`");
    }


    // This test validates: Add-interest input placeholder is `Type an interest and press Enter`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Add-interest control row contains one text input and one icon-only Plus button', async ({ page }) => {
    // Checkpoint 13: Add-interest control row contains one text input and one icon-only `Plus` button
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Add-interest control row contains one text input and one icon-only `Plus` button",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-013 ' + "Add-interest control row contains one text input and one icon-only `Plus` button");
    }


    // This test validates: Add-interest control row contains one text input and one icon-only `Plus` button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Pressing Enter inside the interest input prevents default form submission', async ({ page }) => {
    // Checkpoint 14: Pressing `Enter` inside the interest input prevents default form submission
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Pressing `Enter` inside the interest input prevents default form submission",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-014 ' + "Pressing `Enter` inside the interest input prevents default form submission");
    }


    // This test validates: Pressing `Enter` inside the interest input prevents default form submission
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Pressing Enter with a non-empty value adds a new chip immediately in local state', async ({ page }) => {
    // Checkpoint 15: Pressing `Enter` with a non-empty value adds a new chip immediately in local state
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Pressing `Enter` with a non-empty value adds a new chip immediately in local state",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-015 ' + "Pressing `Enter` with a non-empty value adds a new chip immediately in local state");
    }


    // This test validates: Pressing `Enter` with a non-empty value adds a new chip immediately in local state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Clicking the Plus button with a non-empty value adds a new chip immediately in l', async ({ page }) => {
    // Checkpoint 16: Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-016 ' + "Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state");
    }


    // This test validates: Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Interest values are trimmed before duplicateblank checks run', async ({ page }) => {
    // Checkpoint 17: Interest values are trimmed before duplicate/blank checks run
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Interest values are trimmed before duplicate/blank checks run",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-017 ' + "Interest values are trimmed before duplicate/blank checks run");
    }


    // This test validates: Interest values are trimmed before duplicate/blank checks run
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Blank or whitespace-only interest values are ignored', async ({ page }) => {
    // Checkpoint 18: Blank or whitespace-only interest values are ignored
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Blank or whitespace-only interest values are ignored",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-018 ' + "Blank or whitespace-only interest values are ignored");
    }


    // This test validates: Blank or whitespace-only interest values are ignored
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Duplicate interest values are ignored', async ({ page }) => {
    // Checkpoint 19: Duplicate interest values are ignored
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Duplicate interest values are ignored",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-019 ' + "Duplicate interest values are ignored");
    }


    // This test validates: Duplicate interest values are ignored
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Adding a new interest clears the interest input back to an empty string', async ({ page }) => {
    // Checkpoint 20: Adding a new interest clears the interest input back to an empty string
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Adding a new interest clears the interest input back to an empty string",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-020 ' + "Adding a new interest clears the interest input back to an empty string");
    }


    // This test validates: Adding a new interest clears the interest input back to an empty string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Removing a chip updates the chip row immediately without waiting for a save', async ({ page }) => {
    // Checkpoint 21: Removing a chip updates the chip row immediately without waiting for a save
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Removing a chip updates the chip row immediately without waiting for a save",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-021 ' + "Removing a chip updates the chip row immediately without waiting for a save");
    }


    // This test validates: Removing a chip updates the chip row immediately without waiting for a save
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Chip changes are not persisted until Save Changes is clicked', async ({ page }) => {
    // Checkpoint 22: Chip changes are not persisted until `Save Changes` is clicked
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Chip changes are not persisted until `Save Changes` is clicked",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-022 ' + "Chip changes are not persisted until `Save Changes` is clicked");
    }


    // This test validates: Chip changes are not persisted until `Save Changes` is clicked
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: ORCID iD label is rendered above the ORCID text input', async ({ page }) => {
    // Checkpoint 23: `ORCID iD` label is rendered above the ORCID text input
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`ORCID iD` label is rendered above the ORCID text input",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-023 ' + "`ORCID iD` label is rendered above the ORCID text input");
    }


    // This test validates: `ORCID iD` label is rendered above the ORCID text input
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: ORCID input placeholder is 0000-0002-1825-0097', async ({ page }) => {
    // Checkpoint 24: ORCID input placeholder is `0000-0002-1825-0097`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input placeholder is `0000-0002-1825-0097`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-024 ' + "ORCID input placeholder is `0000-0002-1825-0097`");
    }


    // This test validates: ORCID input placeholder is `0000-0002-1825-0097`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: ORCID input is prefilled from userorcid_id when profile data exists', async ({ page }) => {
    // Checkpoint 25: ORCID input is prefilled from `user.orcid_id` when profile data exists
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input is prefilled from `user.orcid_id` when profile data exists",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-025 ' + "ORCID input is prefilled from `user.orcid_id` when profile data exists");
    }


    // This test validates: ORCID input is prefilled from `user.orcid_id` when profile data exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: ORCID input falls back to an empty string when userorcid_id is null', async ({ page }) => {
    // Checkpoint 26: ORCID input falls back to an empty string when `user.orcid_id` is null
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input falls back to an empty string when `user.orcid_id` is null",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-026 ' + "ORCID input falls back to an empty string when `user.orcid_id` is null");
    }


    // This test validates: ORCID input falls back to an empty string when `user.orcid_id` is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: ORCID input helper text reads Your unique researcher identifier from orcidorg', async ({ page }) => {
    // Checkpoint 27: ORCID input helper text reads `Your unique researcher identifier from orcid.org`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input helper text reads `Your unique researcher identifier from orcid.org`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-027 ' + "ORCID input helper text reads `Your unique researcher identifier from orcid.org`");
    }


    // This test validates: ORCID input helper text reads `Your unique researcher identifier from orcid.org`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: ORCID input is a controlled input bound to orcidId', async ({ page }) => {
    // Checkpoint 28: ORCID input is a controlled input bound to `orcidId`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input is a controlled input bound to `orcidId`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-028 ' + "ORCID input is a controlled input bound to `orcidId`");
    }


    // This test validates: ORCID input is a controlled input bound to `orcidId`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: ORCID input has no required attribute in the current implementation', async ({ page }) => {
    // Checkpoint 29: ORCID input has no `required` attribute in the current implementation
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input has no `required` attribute in the current implementation",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-029 ' + "ORCID input has no `required` attribute in the current implementation");
    }


    // This test validates: ORCID input has no `required` attribute in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: ORCID input uses the shared focusring-2 focusring-brand40 focus style', async ({ page }) => {
    // Checkpoint 30: ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-030 ' + "ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style");
    }


    // This test validates: ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Save Changes button is rendered only on the My Account tab', async ({ page }) => {
    // Checkpoint 31: `Save Changes` button is rendered only on the `My Account` tab
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`Save Changes` button is rendered only on the `My Account` tab",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-031 ' + "`Save Changes` button is rendered only on the `My Account` tab");
    }


    // This test validates: `Save Changes` button is rendered only on the `My Account` tab
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Save Changes is enabled on initial render even when no fields have changed', async ({ page }) => {
    // Checkpoint 32: `Save Changes` is enabled on initial render even when no fields have changed
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`Save Changes` is enabled on initial render even when no fields have changed",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-032 ' + "`Save Changes` is enabled on initial render even when no fields have changed");
    }


    // This test validates: `Save Changes` is enabled on initial render even when no fields have changed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Save Changes is disabled only while saving is true', async ({ page }) => {
    // Checkpoint 33: `Save Changes` is disabled only while `saving` is true
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "`Save Changes` is disabled only while `saving` is true",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-033 ' + "`Save Changes` is disabled only while `saving` is true");
    }


    // This test validates: `Save Changes` is disabled only while `saving` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: While saving the button label changes from Save Changes to Saving', async ({ page }) => {
    // Checkpoint 34: While saving, the button label changes from `Save Changes` to `Saving...`
    // Section: Quick Test Workflow > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "While saving, the button label changes from `Save Changes` to `Saving...`",
      section: "Quick Test Workflow",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-034 ' + "While saving, the button label changes from `Save Changes` to `Saving...`");
    }


    // This test validates: While saving, the button label changes from `Save Changes` to `Saving...`
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
