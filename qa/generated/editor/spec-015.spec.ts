/**
 * Auto-generated Playwright test for editor/spec-015
 * Source: e2e/specs/editor/spec-015.md
 * Generated: 2026-03-15T16:41:20.775Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-015', () => {
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

  test('cp-000: Version-history preview shows raw JSON rather than a rendered rich-text preview ', async ({ page }) => {
    // Checkpoint 0: Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document
    // Section: Error Handling & Edge Cases > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document",
      section: "Error Handling & Edge Cases",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 ' + "Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document");
    }


    // This test validates: Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: The keyboard-shortcuts dialog documents Cmd for comments while comment sidebar t', async ({ page }) => {
    // Checkpoint 1: The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring
    // Section: Error Handling & Edge Cases > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring",
      section: "Error Handling & Edge Cases",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 ' + "The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring");
    }


    // This test validates: The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: editoriderrortsx renders ErrorDisplay with title Editor unavailable', async ({ page }) => {
    // Checkpoint 2: `/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 ' + "`/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`");
    }


    // This test validates: `/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: editoriderrortsx message reads We couldnt load the editor Your work is safe plea', async ({ page }) => {
    // Checkpoint 3: `/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 ' + "`/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`");
    }


    // This test validates: `/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: editoriderrortsx passes the route reset function to ErrorDisplayonRetry', async ({ page }) => {
    // Checkpoint 4: `/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 ' + "`/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`");
    }


    // This test validates: `/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: editorid does not have a route-level loadingtsx file in the current app tree', async ({ page }) => {
    // Checkpoint 5: `/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 ' + "`/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree");
    }


    // This test validates: `/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: studioloadingtsx renders a route-level skeleton shell before the Studio workspac', async ({ page }) => {
    // Checkpoint 6: `/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 ' + "`/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates");
    }


    // This test validates: `/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: studioloadingtsx includes one square icon skeleton one title skeleton and two bu', async ({ page }) => {
    // Checkpoint 7: `/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 ' + "`/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row");
    }


    // This test validates: `/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: studioloadingtsx includes a full-width horizontal skeleton below the header row', async ({ page }) => {
    // Checkpoint 8: `/studio/loading.tsx` includes a full-width horizontal skeleton below the header row
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/loading.tsx` includes a full-width horizontal skeleton below the header row",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 ' + "`/studio/loading.tsx` includes a full-width horizontal skeleton below the header row");
    }


    // This test validates: `/studio/loading.tsx` includes a full-width horizontal skeleton below the header row
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: studioloadingtsx includes one large rounded body skeleton beneath the top chrome', async ({ page }) => {
    // Checkpoint 9: `/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 ' + "`/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome");
    }


    // This test validates: `/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: studioerrortsx renders ErrorDisplay with title Studio unavailable', async ({ page }) => {
    // Checkpoint 10: `/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 ' + "`/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`");
    }


    // This test validates: `/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: studioerrortsx uses the same safe-work message as the editor route error', async ({ page }) => {
    // Checkpoint 11: `/studio/error.tsx` uses the same safe-work message as the editor route error
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/studio/error.tsx` uses the same safe-work message as the editor route error",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 ' + "`/studio/error.tsx` uses the same safe-work message as the editor route error");
    }


    // This test validates: `/studio/error.tsx` uses the same safe-work message as the editor route error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Editor store default mode is editing', async ({ page }) => {
    // Checkpoint 12: Editor store default `mode` is `editing`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `mode` is `editing`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 ' + "Editor store default `mode` is `editing`");
    }


    // This test validates: Editor store default `mode` is `editing`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Editor store default outline is an empty array', async ({ page }) => {
    // Checkpoint 13: Editor store default `outline` is an empty array
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `outline` is an empty array",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 ' + "Editor store default `outline` is an empty array");
    }


    // This test validates: Editor store default `outline` is an empty array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Editor store default outlineVisible is false', async ({ page }) => {
    // Checkpoint 14: Editor store default `outlineVisible` is `false`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `outlineVisible` is `false`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 ' + "Editor store default `outlineVisible` is `false`");
    }


    // This test validates: Editor store default `outlineVisible` is `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Editor store default wordCount is 0', async ({ page }) => {
    // Checkpoint 15: Editor store default `wordCount` is `0`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `wordCount` is `0`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 ' + "Editor store default `wordCount` is `0`");
    }


    // This test validates: Editor store default `wordCount` is `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Editor store default saveStatusstate is saved', async ({ page }) => {
    // Checkpoint 16: Editor store default `saveStatus.state` is `saved`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `saveStatus.state` is `saved`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 ' + "Editor store default `saveStatus.state` is `saved`");
    }


    // This test validates: Editor store default `saveStatus.state` is `saved`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Editor store default activeSectionPos is null', async ({ page }) => {
    // Checkpoint 17: Editor store default `activeSectionPos` is `null`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `activeSectionPos` is `null`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 ' + "Editor store default `activeSectionPos` is `null`");
    }


    // This test validates: Editor store default `activeSectionPos` is `null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Editor store default referenceSidebarOpen is false', async ({ page }) => {
    // Checkpoint 18: Editor store default `referenceSidebarOpen` is `false`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `referenceSidebarOpen` is `false`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 ' + "Editor store default `referenceSidebarOpen` is `false`");
    }


    // This test validates: Editor store default `referenceSidebarOpen` is `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Editor store default commentSidebarOpen is false', async ({ page }) => {
    // Checkpoint 19: Editor store default `commentSidebarOpen` is `false`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `commentSidebarOpen` is `false`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 ' + "Editor store default `commentSidebarOpen` is `false`");
    }


    // This test validates: Editor store default `commentSidebarOpen` is `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Editor store default documentTitle is Untitled Manuscript', async ({ page }) => {
    // Checkpoint 20: Editor store default `documentTitle` is `Untitled Manuscript`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `documentTitle` is `Untitled Manuscript`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 ' + "Editor store default `documentTitle` is `Untitled Manuscript`");
    }


    // This test validates: Editor store default `documentTitle` is `Untitled Manuscript`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Editor store default documentType is original-article', async ({ page }) => {
    // Checkpoint 21: Editor store default `documentType` is `original-article`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `documentType` is `original-article`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 ' + "Editor store default `documentType` is `original-article`");
    }


    // This test validates: Editor store default `documentType` is `original-article`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Editor store default referenceCount is 0', async ({ page }) => {
    // Checkpoint 22: Editor store default `referenceCount` is `0`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `referenceCount` is `0`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 ' + "Editor store default `referenceCount` is `0`");
    }


    // This test validates: Editor store default `referenceCount` is `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Editor store default commentCount is 0', async ({ page }) => {
    // Checkpoint 23: Editor store default `commentCount` is `0`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor store default `commentCount` is `0`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 ' + "Editor store default `commentCount` is `0`");
    }


    // This test validates: Editor store default `commentCount` is `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Reference store default references collection is an empty Map', async ({ page }) => {
    // Checkpoint 24: Reference store default `references` collection is an empty `Map`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `references` collection is an empty `Map`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 ' + "Reference store default `references` collection is an empty `Map`");
    }


    // This test validates: Reference store default `references` collection is an empty `Map`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Reference store default citation style is vancouver', async ({ page }) => {
    // Checkpoint 25: Reference store default citation style is `vancouver`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default citation style is `vancouver`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 ' + "Reference store default citation style is `vancouver`");
    }


    // This test validates: Reference store default citation style is `vancouver`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Reference store default referenceNumberMap is an empty Map', async ({ page }) => {
    // Checkpoint 26: Reference store default `referenceNumberMap` is an empty `Map`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `referenceNumberMap` is an empty `Map`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 ' + "Reference store default `referenceNumberMap` is an empty `Map`");
    }


    // This test validates: Reference store default `referenceNumberMap` is an empty `Map`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Reference store default bibliographyEntries is an empty array', async ({ page }) => {
    // Checkpoint 27: Reference store default `bibliographyEntries` is an empty array
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `bibliographyEntries` is an empty array",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 ' + "Reference store default `bibliographyEntries` is an empty array");
    }


    // This test validates: Reference store default `bibliographyEntries` is an empty array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Reference store default citationDisplayMap is an empty Map', async ({ page }) => {
    // Checkpoint 28: Reference store default `citationDisplayMap` is an empty `Map`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `citationDisplayMap` is an empty `Map`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 ' + "Reference store default `citationDisplayMap` is an empty `Map`");
    }


    // This test validates: Reference store default `citationDisplayMap` is an empty `Map`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Reference store default sidebarOpen is false', async ({ page }) => {
    // Checkpoint 29: Reference store default `sidebarOpen` is `false`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `sidebarOpen` is `false`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 ' + "Reference store default `sidebarOpen` is `false`");
    }


    // This test validates: Reference store default `sidebarOpen` is `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Reference store default citationDialogOpen is false', async ({ page }) => {
    // Checkpoint 30: Reference store default `citationDialogOpen` is `false`
    // Section: Error Handling & Edge Cases > Route Shell, Errors, and Store Defaults

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference store default `citationDialogOpen` is `false`",
      section: "Error Handling & Edge Cases",
      subsection: "Route Shell, Errors, and Store Defaults",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 ' + "Reference store default `citationDialogOpen` is `false`");
    }


    // This test validates: Reference store default `citationDialogOpen` is `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: useEditorDocument treats urlDocumentId new as a createload flow via loadStudioDo', async ({ page }) => {
    // Checkpoint 31: `useEditorDocument` treats `urlDocumentId === "new"` as a create/load flow via `loadStudioDocument(...)`
    // Section: Error Handling & Edge Cases > Editor Route Persistence, Offline Queue, and Retry Logic

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`useEditorDocument` treats `urlDocumentId === \"new\"` as a create/load flow via `loadStudioDocument(...)`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Route Persistence, Offline Queue, and Retry Logic",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 ' + "`useEditorDocument` treats `urlDocumentId === \"new\"` as a create/load flow via `loadStudioDocument(...)`");
    }


    // This test validates: `useEditorDocument` treats `urlDocumentId === "new"` as a create/load flow via `loadStudioDocument(...)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: When the editor route creates a new document it writes the returned document tit', async ({ page }) => {
    // Checkpoint 32: When the editor route creates a new document, it writes the returned document title into the editor store
    // Section: Error Handling & Edge Cases > Editor Route Persistence, Offline Queue, and Retry Logic

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "When the editor route creates a new document, it writes the returned document title into the editor store",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Route Persistence, Offline Queue, and Retry Logic",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 ' + "When the editor route creates a new document, it writes the returned document title into the editor store");
    }


    // This test validates: When the editor route creates a new document, it writes the returned document title into the editor store
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: When the loaded document has sections the editor route binds persistence to the ', async ({ page }) => {
    // Checkpoint 33: When the loaded document has sections, the editor route binds persistence to the first section only
    // Section: Error Handling & Edge Cases > Editor Route Persistence, Offline Queue, and Retry Logic

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "When the loaded document has sections, the editor route binds persistence to the first section only",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Route Persistence, Offline Queue, and Retry Logic",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 ' + "When the loaded document has sections, the editor route binds persistence to the first section only");
    }


    // This test validates: When the loaded document has sections, the editor route binds persistence to the first section only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: When the loaded first section has no editor_content the hook returns content nul', async ({ page }) => {
    // Checkpoint 34: When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior
    // Section: Error Handling & Edge Cases > Editor Route Persistence, Offline Queue, and Retry Logic

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Route Persistence, Offline Queue, and Retry Logic",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 ' + "When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior");
    }


    // This test validates: When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior
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
