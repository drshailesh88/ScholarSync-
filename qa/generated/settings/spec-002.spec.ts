/**
 * Auto-generated Playwright test for settings/spec-002
 * Source: e2e/specs/settings/spec-002.md
 * Generated: 2026-03-15T15:29:05.196Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts settings spec-002
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


















import { assertSettingsCheckpoint } from '../../module-assertions/settings';

test.describe('settings / spec-002', () => {
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

  test('cp-000: Default value 16', async ({ page }) => {
    // Checkpoint 0: Default value — "16"
    // Section: Preferences Tab > Editor Font Size

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Default value — \"16\"",
      section: "Preferences Tab",
      subsection: "Editor Font Size",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-000 ' + "Default value — \"16\"");
    }


    // This test validates: Default value — "16"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Label Default Citation Format', async ({ page }) => {
    // Checkpoint 1: Label — "Default Citation Format"
    // Section: Preferences Tab > Default Citation Format

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Label — \"Default Citation Format\"",
      section: "Preferences Tab",
      subsection: "Default Citation Format",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-001 ' + "Label — \"Default Citation Format\"");
    }


    // This test validates: Label — "Default Citation Format"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Dropdown options', async ({ page }) => {
    // Checkpoint 2: **Dropdown options**:
    // Section: Preferences Tab > Default Citation Format

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "**Dropdown options**:",
      section: "Preferences Tab",
      subsection: "Default Citation Format",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-002 ' + "**Dropdown options**:");
    }


    // This test validates: **Dropdown options**:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Default value apa7', async ({ page }) => {
    // Checkpoint 3: Default value — "apa7"
    // Section: Preferences Tab > Default Citation Format

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Default value — \"apa7\"",
      section: "Preferences Tab",
      subsection: "Default Citation Format",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-003 ' + "Default value — \"apa7\"");
    }


    // This test validates: Default value — "apa7"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Label Preferred Language', async ({ page }) => {
    // Checkpoint 4: Label — "Preferred Language"
    // Section: Preferences Tab > Preferred Language

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Label — \"Preferred Language\"",
      section: "Preferences Tab",
      subsection: "Preferred Language",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-004 ' + "Label — \"Preferred Language\"");
    }


    // This test validates: Label — "Preferred Language"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Dropdown options', async ({ page }) => {
    // Checkpoint 5: **Dropdown options**:
    // Section: Preferences Tab > Preferred Language

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "**Dropdown options**:",
      section: "Preferences Tab",
      subsection: "Preferred Language",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-005 ' + "**Dropdown options**:");
    }


    // This test validates: **Dropdown options**:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Default value en', async ({ page }) => {
    // Checkpoint 6: Default value — "en"
    // Section: Preferences Tab > Preferred Language

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Default value — \"en\"",
      section: "Preferences Tab",
      subsection: "Preferred Language",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-006 ' + "Default value — \"en\"");
    }


    // This test validates: Default value — "en"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Save button text Save Preferences', async ({ page }) => {
    // Checkpoint 7: Save button — text "Save Preferences"
    // Section: Preferences Tab > Save Preferences

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Save button — text \"Save Preferences\"",
      section: "Preferences Tab",
      subsection: "Save Preferences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-007 ' + "Save button — text \"Save Preferences\"");
    }


    // This test validates: Save button — text "Save Preferences"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Saving state button text changes to Saving button disabled', async ({ page }) => {
    // Checkpoint 8: Saving state — button text changes to "Saving...", button disabled
    // Section: Preferences Tab > Save Preferences

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Saving state — button text changes to \"Saving...\", button disabled",
      section: "Preferences Tab",
      subsection: "Save Preferences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-008 ' + "Saving state — button text changes to \"Saving...\", button disabled");
    }


    // This test validates: Saving state — button text changes to "Saving...", button disabled
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Success message Preferences saved successfully in green emerald-500 auto-dismiss', async ({ page }) => {
    // Checkpoint 9: Success message — "Preferences saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
    // Section: Preferences Tab > Save Preferences

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Success message — \"Preferences saved successfully.\" in green (`emerald-500`), auto-dismisses after 3 seconds",
      section: "Preferences Tab",
      subsection: "Save Preferences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-009 ' + "Success message — \"Preferences saved successfully.\" in green (`emerald-500`), auto-dismisses after 3 seconds");
    }


    // This test validates: Success message — "Preferences saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Error message Failed to save preferences Please try again in red red-500 auto-di', async ({ page }) => {
    // Checkpoint 10: Error message — "Failed to save preferences. Please try again." in red (`red-500`), auto-dismisses after 3 seconds
    // Section: Preferences Tab > Save Preferences

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Error message — \"Failed to save preferences. Please try again.\" in red (`red-500`), auto-dismisses after 3 seconds",
      section: "Preferences Tab",
      subsection: "Save Preferences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-010 ' + "Error message — \"Failed to save preferences. Please try again.\" in red (`red-500`), auto-dismisses after 3 seconds");
    }


    // This test validates: Error message — "Failed to save preferences. Please try again." in red (`red-500`), auto-dismisses after 3 seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Rate limiting uses RATE_LIMITSanalysis', async ({ page }) => {
    // Checkpoint 11: Rate limiting — uses `RATE_LIMITS.analysis`
    // Section: Billing API & Payment Flow > POST `/api/billing/create-order`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Rate limiting — uses `RATE_LIMITS.analysis`",
      section: "Billing API & Payment Flow",
      subsection: "POST `/api/billing/create-order`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-011 ' + "Rate limiting — uses `RATE_LIMITS.analysis`");
    }


    // This test validates: Rate limiting — uses `RATE_LIMITS.analysis`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Auth failure path auth errors from getCurrentUserId fall through the generic cat', async ({ page }) => {
    // Checkpoint 12: Auth failure path — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `"Failed to create payment order"`
    // Section: Billing API & Payment Flow > POST `/api/billing/create-order`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Auth failure path — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `\"Failed to create payment order\"`",
      section: "Billing API & Payment Flow",
      subsection: "POST `/api/billing/create-order`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-012 ' + "Auth failure path — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `\"Failed to create payment order\"`");
    }


    // This test validates: Auth failure path — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `"Failed to create payment order"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Null subscription returns null for subscription if none exists', async ({ page }) => {
    // Checkpoint 13: Null subscription — returns `null` for subscription if none exists
    // Section: Billing API & Payment Flow > GET `/api/billing/subscription`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Null subscription — returns `null` for subscription if none exists",
      section: "Billing API & Payment Flow",
      subsection: "GET `/api/billing/subscription`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-013 ' + "Null subscription — returns `null` for subscription if none exists");
    }


    // This test validates: Null subscription — returns `null` for subscription if none exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Null usage returns null for usage if user not found', async ({ page }) => {
    // Checkpoint 14: Null usage — returns `null` for usage if user not found
    // Section: Billing API & Payment Flow > GET `/api/billing/subscription`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Null usage — returns `null` for usage if user not found",
      section: "Billing API & Payment Flow",
      subsection: "GET `/api/billing/subscription`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-014 ' + "Null usage — returns `null` for usage if user not found");
    }


    // This test validates: Null usage — returns `null` for usage if user not found
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Invalid signature returns 401', async ({ page }) => {
    // Checkpoint 15: Invalid signature — returns 401
    // Section: Webhook Handling > POST `/api/billing/webhook`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Invalid signature — returns 401",
      section: "Webhook Handling",
      subsection: "POST `/api/billing/webhook`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-015 ' + "Invalid signature — returns 401");
    }


    // This test validates: Invalid signature — returns 401
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Unknown event returns 200 acknowledged but no action', async ({ page }) => {
    // Checkpoint 16: Unknown event — returns 200 (acknowledged but no action)
    // Section: Webhook Handling > POST `/api/billing/webhook`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Unknown event — returns 200 (acknowledged but no action)",
      section: "Webhook Handling",
      subsection: "POST `/api/billing/webhook`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-016 ' + "Unknown event — returns 200 (acknowledged but no action)");
    }


    // This test validates: Unknown event — returns 200 (acknowledged but no action)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Returns current user data including all profile fields', async ({ page }) => {
    // Checkpoint 17: Returns current user data including all profile fields
    // Section: Server Actions > `getUser()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Returns current user data including all profile fields",
      section: "Server Actions",
      subsection: "`getUser()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-017 ' + "Returns current user data including all profile fields");
    }


    // This test validates: Returns current user data including all profile fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Returns null if user not found in DB', async ({ page }) => {
    // Checkpoint 18: Returns `null` if user not found in DB
    // Section: Server Actions > `getUser()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Returns `null` if user not found in DB",
      section: "Server Actions",
      subsection: "`getUser()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-018 ' + "Returns `null` if user not found in DB");
    }


    // This test validates: Returns `null` if user not found in DB
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Uses getCurrentUserId from Clerk auth', async ({ page }) => {
    // Checkpoint 19: Uses `getCurrentUserId()` from Clerk auth
    // Section: Server Actions > `getUser()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Uses `getCurrentUserId()` from Clerk auth",
      section: "Server Actions",
      subsection: "`getUser()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-019 ' + "Uses `getCurrentUserId()` from Clerk auth");
    }


    // This test validates: Uses `getCurrentUserId()` from Clerk auth
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Updates only provided fields partial update', async ({ page }) => {
    // Checkpoint 20: Updates only provided fields (partial update)
    // Section: Server Actions > `updateUserProfile(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Updates only provided fields (partial update)",
      section: "Server Actions",
      subsection: "`updateUserProfile(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-020 ' + "Updates only provided fields (partial update)");
    }


    // This test validates: Updates only provided fields (partial update)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Sets updated_at timestamp on save', async ({ page }) => {
    // Checkpoint 21: Sets `updated_at` timestamp on save
    // Section: Server Actions > `updateUserProfile(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sets `updated_at` timestamp on save",
      section: "Server Actions",
      subsection: "`updateUserProfile(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-021 ' + "Sets `updated_at` timestamp on save");
    }


    // This test validates: Sets `updated_at` timestamp on save
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Accepts full_name specialty country bio research_interests preferred_language de', async ({ page }) => {
    // Checkpoint 22: Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`
    // Section: Server Actions > `updateUserProfile(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`",
      section: "Server Actions",
      subsection: "`updateUserProfile(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-022 ' + "Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`");
    }


    // This test validates: Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Returns tokens_used tokens_limit searches_used plagiarism_checks exports_used pl', async ({ page }) => {
    // Checkpoint 23: Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`
    // Section: Server Actions > `getUserUsageStats()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`",
      section: "Server Actions",
      subsection: "`getUserUsageStats()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-023 ' + "Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`");
    }


    // This test validates: Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Maps from DB column names to response fields', async ({ page }) => {
    // Checkpoint 24: Maps from DB column names to response fields
    // Section: Server Actions > `getUserUsageStats()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Maps from DB column names to response fields",
      section: "Server Actions",
      subsection: "`getUserUsageStats()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-024 ' + "Maps from DB column names to response fields");
    }


    // This test validates: Maps from DB column names to response fields
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Returns subscription record for current user or null', async ({ page }) => {
    // Checkpoint 25: Returns subscription record for current user or `null`
    // Section: Server Actions > `getSubscription()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Returns subscription record for current user or `null`",
      section: "Server Actions",
      subsection: "`getSubscription()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-025 ' + "Returns subscription record for current user or `null`");
    }


    // This test validates: Returns subscription record for current user or `null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Creates or updates subscription record', async ({ page }) => {
    // Checkpoint 26: Creates or updates subscription record
    // Section: Server Actions > `createSubscription(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Creates or updates subscription record",
      section: "Server Actions",
      subsection: "`createSubscription(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-026 ' + "Creates or updates subscription record");
    }


    // This test validates: Creates or updates subscription record
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Also updates user plan field when inserting a new subscription record', async ({ page }) => {
    // Checkpoint 27: Also updates user plan field when inserting a new subscription record
    // Section: Server Actions > `createSubscription(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Also updates user plan field when inserting a new subscription record",
      section: "Server Actions",
      subsection: "`createSubscription(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-027 ' + "Also updates user plan field when inserting a new subscription record");
    }


    // This test validates: Also updates user plan field when inserting a new subscription record
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Sets status to active period start to now period end to now 30 days', async ({ page }) => {
    // Checkpoint 28: Sets status to "active", period start to now, period end to now + 30 days
    // Section: Server Actions > `createSubscription(data)`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sets status to \"active\", period start to now, period end to now + 30 days",
      section: "Server Actions",
      subsection: "`createSubscription(data)`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-028 ' + "Sets status to \"active\", period start to now, period end to now + 30 days");
    }


    // This test validates: Sets status to "active", period start to now, period end to now + 30 days
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Sets subscription status to cancelled', async ({ page }) => {
    // Checkpoint 29: Sets subscription status to "cancelled"
    // Section: Server Actions > `cancelSubscription()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sets subscription status to \"cancelled\"",
      section: "Server Actions",
      subsection: "`cancelSubscription()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-029 ' + "Sets subscription status to \"cancelled\"");
    }


    // This test validates: Sets subscription status to "cancelled"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Sets user plan to free', async ({ page }) => {
    // Checkpoint 30: Sets user plan to "free"
    // Section: Server Actions > `cancelSubscription()`

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Sets user plan to \"free\"",
      section: "Server Actions",
      subsection: "`cancelSubscription()`",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-030 ' + "Sets user plan to \"free\"");
    }


    // This test validates: Sets user plan to "free"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Skeleton layout renders animated skeleton placeholders for each section', async ({ page }) => {
    // Checkpoint 31: Skeleton layout — renders animated skeleton placeholders for each section
    // Section: Loading & Error States > Loading State (`loading.tsx`)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Skeleton layout — renders animated skeleton placeholders for each section",
      section: "Loading & Error States",
      subsection: "Loading State (`loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-031 ' + "Skeleton layout — renders animated skeleton placeholders for each section");
    }


    // This test validates: Skeleton layout — renders animated skeleton placeholders for each section
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Skeleton component uses animate-pulse with bg-surface-raised', async ({ page }) => {
    // Checkpoint 32: Skeleton component — uses `animate-pulse` with `bg-surface-raised`
    // Section: Loading & Error States > Loading State (`loading.tsx`)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Skeleton component — uses `animate-pulse` with `bg-surface-raised`",
      section: "Loading & Error States",
      subsection: "Loading State (`loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-032 ' + "Skeleton component — uses `animate-pulse` with `bg-surface-raised`");
    }


    // This test validates: Skeleton component — uses `animate-pulse` with `bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Skeletons mirror the layout of the actual settings page', async ({ page }) => {
    // Checkpoint 33: Skeletons mirror the layout of the actual settings page
    // Section: Loading & Error States > Loading State (`loading.tsx`)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Skeletons mirror the layout of the actual settings page",
      section: "Loading & Error States",
      subsection: "Loading State (`loading.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-033 ' + "Skeletons mirror the layout of the actual settings page");
    }


    // This test validates: Skeletons mirror the layout of the actual settings page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Title Settings unavailable', async ({ page }) => {
    // Checkpoint 34: Title — "Settings unavailable"
    // Section: Loading & Error States > Error State (`error.tsx`)

    // Navigate to the page
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/settings/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSettingsCheckpoint({
      page,
      description: "Title — \"Settings unavailable\"",
      section: "Loading & Error States",
      subsection: "Error State (`error.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled settings checkpoint: cp-034 ' + "Title — \"Settings unavailable\"");
    }


    // This test validates: Title — "Settings unavailable"
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
