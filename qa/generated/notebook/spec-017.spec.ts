/**
 * Auto-generated Playwright test for notebook/spec-017
 * Source: e2e/specs/notebook/spec-017.md
 * Generated: 2026-03-15T18:12:35.034Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-017
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-017', () => {
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

  test('cp-000: Share-link input is read-only and rendered only when sharing is enabled and a UR', async ({ page }) => {
    // Checkpoint 0: Share-link input is read-only and rendered only when sharing is enabled and a URL exists
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share-link input is read-only and rendered only when sharing is enabled and a URL exists",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "Share-link input is read-only and rendered only when sharing is enabled and a URL exists");
    }


    // This test validates: Share-link input is read-only and rendered only when sharing is enabled and a URL exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Copy-link success swaps button content from Copy to Copied for 2 seconds', async ({ page }) => {
    // Checkpoint 1: Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds");
    }


    // This test validates: Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Password field placeholder is Leave empty for no password', async ({ page }) => {
    // Checkpoint 2: Password field placeholder is `Leave empty for no password`
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Password field placeholder is `Leave empty for no password`",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Password field placeholder is `Leave empty for no password`");
    }


    // This test validates: Password field placeholder is `Leave empty for no password`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Expiration date input minimum is todays date based on new DatetoISOStringsplitT0', async ({ page }) => {
    // Checkpoint 3: Expiration date input minimum is today’s date based on `new Date().toISOString().split("T")[0]`
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Expiration date input minimum is today’s date based on `new Date().toISOString().split(\"T\")[0]`",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Expiration date input minimum is today’s date based on `new Date().toISOString().split(\"T\")[0]`");
    }


    // This test validates: Expiration date input minimum is today’s date based on `new Date().toISOString().split("T")[0]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Save Settings persists only password and expiration date it does not re-enable s', async ({ page }) => {
    // Checkpoint 4: Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off");
    }


    // This test validates: Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Share-dialog failures are console-only and do not display inline error banners i', async ({ page }) => {
    // Checkpoint 5: Share-dialog failures are console-only and do not display inline error banners in the dialog UI
    // Section: Quick Test Workflows > Share Dialog Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share-dialog failures are console-only and do not display inline error banners in the dialog UI",
      section: "Quick Test Workflows",
      subsection: "Share Dialog Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Share-dialog failures are console-only and do not display inline error banners in the dialog UI");
    }


    // This test validates: Share-dialog failures are console-only and do not display inline error banners in the dialog UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Shared notebook metadata title is notebooktitle - ScholarSync when the share tok', async ({ page }) => {
    // Checkpoint 6: Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully");
    }


    // This test validates: Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Missing share tokens fall through notFound', async ({ page }) => {
    // Checkpoint 7: Missing share tokens fall through `notFound()`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Missing share tokens fall through `notFound()`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Missing share tokens fall through `notFound()`");
    }


    // This test validates: Missing share tokens fall through `notFound()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Share route renders the password gate only when notebookhasPassword is true', async ({ page }) => {
    // Checkpoint 8: Share route renders the password gate only when `notebook.hasPassword` is true
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Share route renders the password gate only when `notebook.hasPassword` is true",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Share route renders the password gate only when `notebook.hasPassword` is true");
    }


    // This test validates: Share route renders the password gate only when `notebook.hasPassword` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Password gate disables submission while loading or when the password input is em', async ({ page }) => {
    // Checkpoint 9: Password gate disables submission while loading or when the password input is empty
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Password gate disables submission while loading or when the password input is empty",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Password gate disables submission while loading or when the password input is empty");
    }


    // This test validates: Password gate disables submission while loading or when the password input is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Password gate error for incorrect credentials is Incorrect password Please try a', async ({ page }) => {
    // Checkpoint 10: Password gate error for incorrect credentials is `Incorrect password. Please try again.`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Password gate error for incorrect credentials is `Incorrect password. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Password gate error for incorrect credentials is `Incorrect password. Please try again.`");
    }


    // This test validates: Password gate error for incorrect credentials is `Incorrect password. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Password gate generic failure message is Something went wrong Please try again', async ({ page }) => {
    // Checkpoint 11: Password gate generic failure message is `Something went wrong. Please try again.`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Password gate generic failure message is `Something went wrong. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "Password gate generic failure message is `Something went wrong. Please try again.`");
    }


    // This test validates: Password gate generic failure message is `Something went wrong. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Successful password verification swaps the gate directly to SharedNotebookViewer', async ({ page }) => {
    // Checkpoint 12: Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation");
    }


    // This test validates: Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Shared viewer header text is Shared by ownerName plus a long-form date and optio', async ({ page }) => {
    // Checkpoint 13: Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`");
    }


    // This test validates: Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Shared viewer empty state text is This notebook has no messages yet', async ({ page }) => {
    // Checkpoint 14: Shared viewer empty state text is `This notebook has no messages yet.`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer empty state text is `This notebook has no messages yet.`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Shared viewer empty state text is `This notebook has no messages yet.`");
    }


    // This test validates: Shared viewer empty state text is `This notebook has no messages yet.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Shared viewer citation references are rendered as non-clickable pills rather tha', async ({ page }) => {
    // Checkpoint 15: Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons");
    }


    // This test validates: Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Shared viewer footer text is Shared from ScholarSync AI-assisted research analys', async ({ page }) => {
    // Checkpoint 16: Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`
    // Section: Quick Test Workflows > Shared Notebook and Password Gate Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook and Password Gate Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`");
    }


    // This test validates: Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: The live notebook route preloads library papers from getUserPapers it does not s', async ({ page }) => {
    // Checkpoint 17: The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list");
    }


    // This test validates: The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: The upload area is clickable and wired to a hidden file input but there is no im', async ({ page }) => {
    // Checkpoint 18: The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component");
    }


    // This test validates: The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Source-row remove actions currently delete rows from local state only they do no', async ({ page }) => {
    // Checkpoint 19: Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page");
    }


    // This test validates: Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Notebook mode switching changes UI copy and API mode but does not itself persist', async ({ page }) => {
    // Checkpoint 20: Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it");
    }


    // This test validates: Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Sharing is unavailable until a conversation exists because the share button is d', async ({ page }) => {
    // Checkpoint 21: Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null");
    }


    // This test validates: Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Shared notebook citations are read-only visual labels there is no PDF jump-to-so', async ({ page }) => {
    // Checkpoint 22: Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer");
    }


    // This test validates: Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Upload temp ids use the exact format upload_Datenow_Mathrandom', async ({ page }) => {
    // Checkpoint 23: Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`");
    }


    // This test validates: Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Each optimistic upload row is appended with name filename size formatFileSizefil', async ({ page }) => {
    // Checkpoint 24: Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: "processing"` before any network request starts
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: \"processing\"` before any network request starts",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: \"processing\"` before any network request starts");
    }


    // This test validates: Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: "processing"` before any network request starts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: apiextract-pdf failure changes only the affected upload row to status error and ', async ({ page }) => {
    // Checkpoint 25: `/api/extract-pdf` failure changes only the affected upload row to `status: "error"` and preserves the original byte-size subtitle
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/api/extract-pdf` failure changes only the affected upload row to `status: \"error\"` and preserves the original byte-size subtitle",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "`/api/extract-pdf` failure changes only the affected upload row to `status: \"error\"` and preserves the original byte-size subtitle");
    }


    // This test validates: `/api/extract-pdf` failure changes only the affected upload row to `status: "error"` and preserves the original byte-size subtitle
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Successful metadata extraction plus savePaper swaps the upload subtitle from for', async ({ page }) => {
    // Checkpoint 26: Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``");
    }


    // This test validates: Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Uploaded-title fallback strips a trailing pdf case-insensitively via filenamerep', async ({ page }) => {
    // Checkpoint 27: Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\.pdf$/i, "")`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\\\.pdf$/i, \"\")`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\\\.pdf$/i, \"\")`");
    }


    // This test validates: Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\.pdf$/i, "")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Uploaded-author fallback is an empty array when extractDatainfoauthor is missing', async ({ page }) => {
    // Checkpoint 28: Uploaded-author fallback is an empty array when `extractData.info?.author` is missing
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Uploaded-author fallback is an empty array when `extractData.info?.author` is missing",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Uploaded-author fallback is an empty array when `extractData.info?.author` is missing");
    }


    // This test validates: Uploaded-author fallback is an empty array when `extractData.info?.author` is missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Raw PDF storage runs in a fire-and-forget fetchapipaperspaperIdpdf branch whose ', async ({ page }) => {
    // Checkpoint 29: Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`");
    }


    // This test validates: Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: A Docling result with chunksCreated 0 logs Docling extraction produced zero chun', async ({ page }) => {
    // Checkpoint 30: A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`");
    }


    // This test validates: A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: apiembed non-OK responses are logged with await embedRestext before the row is m', async ({ page }) => {
    // Checkpoint 31: `/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "`/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`");
    }


    // This test validates: `/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Exceptions inside the Docling or embed block log PDF extractionembedding failed ', async ({ page }) => {
    // Checkpoint 32: Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: "embed_failed"`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: \"embed_failed\"`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: \"embed_failed\"`");
    }


    // This test validates: Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: "embed_failed"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Outer upload-pipeline failures mark the row status error rather than embed_faile', async ({ page }) => {
    // Checkpoint 33: Outer upload-pipeline failures mark the row `status: "error"` rather than `embed_failed`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Outer upload-pipeline failures mark the row `status: \"error\"` rather than `embed_failed`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Outer upload-pipeline failures mark the row `status: \"error\"` rather than `embed_failed`");
    }


    // This test validates: Outer upload-pipeline failures mark the row `status: "error"` rather than `embed_failed`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: File-input reset happens once after the upload loop with fileInputRefcurrentvalu', async ({ page }) => {
    // Checkpoint 34: File-input reset happens once after the upload loop with `fileInputRef.current.value = ""`; there is no per-file `finally` reset
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "File-input reset happens once after the upload loop with `fileInputRef.current.value = \"\"`; there is no per-file `finally` reset",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "File-input reset happens once after the upload loop with `fileInputRef.current.value = \"\"`; there is no per-file `finally` reset");
    }


    // This test validates: File-input reset happens once after the upload loop with `fileInputRef.current.value = ""`; there is no per-file `finally` reset
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
