/**
 * Auto-generated Playwright test for editor/spec-029
 * Source: e2e/specs/editor/spec-029.md
 * Generated: 2026-03-14T02:07:30.926Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-029
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-029', () => {
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

  test('cp-000: Studio handleExportPDF does nothing visible when the HTTP response is non-OK', async ({ page }) => {
    // Checkpoint 0: Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK');
    }


    // This test validates: Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Studio handleExportPDF writes HTML responses into a newly opened window but send', async ({ page }) => {
    // Checkpoint 1: Studio `handleExportPDF()` writes HTML responses into a newly opened window, but sends binary PDF responses to that window via blob URL navigation
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportPDF()` writes HTML responses into a newly opened window, but sends binary PDF responses to that window via blob URL navigation",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 Studio `handleExportPDF()` writes HTML responses into a newly opened window, but sends binary PDF responses to that window via blob URL navigation');
    }


    // This test validates: Studio `handleExportPDF()` writes HTML responses into a newly opened window, but sends binary PDF responses to that window via blob URL navigation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Studio handleExportDocx posts title content HTML to apiexportdocx', async ({ page }) => {
    // Checkpoint 2: Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`');
    }


    // This test validates: Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Studio handleExportDocx silently returns when editor HTML content is empty', async ({ page }) => {
    // Checkpoint 3: Studio `handleExportDocx()` silently returns when editor HTML content is empty
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportDocx()` silently returns when editor HTML content is empty",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 Studio `handleExportDocx()` silently returns when editor HTML content is empty');
    }


    // This test validates: Studio `handleExportDocx()` silently returns when editor HTML content is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Studio Word export downloads a doc filename even though the backend route return', async ({ page }) => {
    // Checkpoint 4: Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes');
    }


    // This test validates: Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Studio export failures log PDF export failed or DOCX export failed to the consol', async ({ page }) => {
    // Checkpoint 5: Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast');
    }


    // This test validates: Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: editorid still has no dedicated route-level loading file only the route-level er', async ({ page }) => {
    // Checkpoint 6: `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists');
    }


    // This test validates: `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: The editor-route DotsThree button remains visually present but unwired', async ({ page }) => {
    // Checkpoint 7: The editor-route `DotsThree` button remains visually present but unwired
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "The editor-route `DotsThree` button remains visually present but unwired",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 The editor-route `DotsThree` button remains visually present but unwired');
    }


    // This test validates: The editor-route `DotsThree` button remains visually present but unwired
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Version-history preview still renders raw JSON rather than rich text', async ({ page }) => {
    // Checkpoint 8: Version-history preview still renders raw JSON rather than rich text
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Version-history preview still renders raw JSON rather than rich text",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 Version-history preview still renders raw JSON rather than rich text');
    }


    // This test validates: Version-history preview still renders raw JSON rather than rich text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Studio export still uses a lightweight dropdown rather than the editor-route mod', async ({ page }) => {
    // Checkpoint 9: Studio export still uses a lightweight dropdown rather than the editor-route modal
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio export still uses a lightweight dropdown rather than the editor-route modal",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 Studio export still uses a lightweight dropdown rather than the editor-route modal');
    }


    // This test validates: Studio export still uses a lightweight dropdown rather than the editor-route modal
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Studio export dropdown still lacks any outside-click dismissal listener', async ({ page }) => {
    // Checkpoint 10: Studio export dropdown still lacks any outside-click dismissal listener
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio export dropdown still lacks any outside-click dismissal listener",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 Studio export dropdown still lacks any outside-click dismissal listener');
    }


    // This test validates: Studio export dropdown still lacks any outside-click dismissal listener
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: The live editor route surface is still editorid plus studio editornew is still a', async ({ page }) => {
    // Checkpoint 11: The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree');
    }


    // This test validates: The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: The keyboard-shortcuts dialog still advertises Cmd for comments while actual com', async ({ page }) => {
    // Checkpoint 12: The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring');
    }


    // This test validates: The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Track changes are still not implemented for the editor route the store comment s', async ({ page }) => {
    // Checkpoint 13: Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned');
    }


    // This test validates: Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Citation-style switching is still absent from the current reference sidebar UI', async ({ page }) => {
    // Checkpoint 14: Citation-style switching is still absent from the current reference sidebar UI
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Citation-style switching is still absent from the current reference sidebar UI",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 Citation-style switching is still absent from the current reference sidebar UI');
    }


    // This test validates: Citation-style switching is still absent from the current reference sidebar UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Math insertion is still not implemented as a custom editor extension in the curr', async ({ page }) => {
    // Checkpoint 15: Math insertion is still not implemented as a custom editor extension in the current editor stack
    // Section: Error Handling & Edge Cases > Verified Current-Behavior Corrections from Pass 1

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Math insertion is still not implemented as a custom editor extension in the current editor stack",
      section: "Error Handling & Edge Cases",
      subsection: "Verified Current-Behavior Corrections from Pass 1",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 Math insertion is still not implemented as a custom editor extension in the current editor stack');
    }


    // This test validates: Math insertion is still not implemented as a custom editor extension in the current editor stack
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: StudioPage default export wraps StudioContent inside a React Suspense boundary n', async ({ page }) => {
    // Checkpoint 16: `StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 `StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)');
    }


    // This test validates: `StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: StudioContent is a separate inner function component not the default export', async ({ page }) => {
    // Checkpoint 17: `StudioContent` is a separate inner function component, not the default export
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`StudioContent` is a separate inner function component, not the default export",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 `StudioContent` is a separate inner function component, not the default export');
    }


    // This test validates: `StudioContent` is a separate inner function component, not the default export
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Studio page root container uses h-calc100vh-7rem height vs editor pages calc100v', async ({ page }) => {
    // Checkpoint 18: Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page's `calc(100vh-4rem)`)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page's `calc(100vh-4rem)`)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page\'s `calc(100vh-4rem)`)');
    }


    // This test validates: Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page's `calc(100vh-4rem)`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Studio left sidebar has a fixed width of w-64 256px', async ({ page }) => {
    // Checkpoint 19: Studio left sidebar has a fixed width of `w-64` (256px)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio left sidebar has a fixed width of `w-64` (256px)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 Studio left sidebar has a fixed width of `w-64` (256px)');
    }


    // This test validates: Studio left sidebar has a fixed width of `w-64` (256px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Studio left-rail title input has no placeholder attribute at all empty string fa', async ({ page }) => {
    // Checkpoint 20: Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)');
    }


    // This test validates: Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Studio Write button uses bg-brand text-white styling not skyblue contradicting t', async ({ page }) => {
    // Checkpoint 21: Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc's claim of "brand purple"
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc's claim of \"brand purple\"",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc\'s claim of "brand purple"');
    }


    // This test validates: Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc's claim of "brand purple"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Studio project selector uses mousedown event for outside-click detection not cli', async ({ page }) => {
    // Checkpoint 22: Studio project selector uses `mousedown` event for outside-click detection, not `click`
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio project selector uses `mousedown` event for outside-click detection, not `click`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 Studio project selector uses `mousedown` event for outside-click detection, not `click`');
    }


    // This test validates: Studio project selector uses `mousedown` event for outside-click detection, not `click`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Studio project selector dropdown has max-h-60 overflow-y-auto for long project l', async ({ page }) => {
    // Checkpoint 23: Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists');
    }


    // This test validates: Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Studio project selector dropdown width is w-56 224px', async ({ page }) => {
    // Checkpoint 24: Studio project selector dropdown width is `w-56` (224px)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio project selector dropdown width is `w-56` (224px)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 Studio project selector dropdown width is `w-56` (224px)');
    }


    // This test validates: Studio project selector dropdown width is `w-56` (224px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Studio Current Draft is a static div not a Link confirming it is not navigable', async ({ page }) => {
    // Checkpoint 25: Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable');
    }


    // This test validates: Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Studio My Library link icon is Books size 16 Literature Search icon is GlobeHemi', async ({ page }) => {
    // Checkpoint 26: Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)');
    }


    // This test validates: Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Studio left-rail cited source rows show first author family name only not first ', async ({ page }) => {
    // Checkpoint 27: Studio left-rail cited source rows show first author family name only (not "first author + year")
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio left-rail cited source rows show first author family name only (not \"first author + year\")",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 Studio left-rail cited source rows show first author family name only (not "first author + year")');
    }


    // This test validates: Studio left-rail cited source rows show first author family name only (not "first author + year")
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Studio left-rail cited source author falls back to Unknown when refauthors0famil', async ({ page }) => {
    // Checkpoint 28: Studio left-rail cited source author falls back to `"Unknown"` when `ref.authors[0]?.family` is undefined
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio left-rail cited source author falls back to `\"Unknown\"` when `ref.authors[0]?.family` is undefined",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 Studio left-rail cited source author falls back to `"Unknown"` when `ref.authors[0]?.family` is undefined');
    }


    // This test validates: Studio left-rail cited source author falls back to `"Unknown"` when `ref.authors[0]?.family` is undefined
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Studio View all N references button opens ReferenceSidebar via setSidebarOpentru', async ({ page }) => {
    // Checkpoint 29: Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`
    // Section: Error Handling & Edge Cases > Studio Page Architecture

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Page Architecture",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`');
    }


    // This test validates: Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Studio chat message IDs are generated as msg_Datenow for user messages and msg_D', async ({ page }) => {
    // Checkpoint 30: Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages');
    }


    // This test validates: Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Studio submitAiPrompt sets the input value twice once immediately and once insid', async ({ page }) => {
    // Checkpoint 31: Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query');
    }


    // This test validates: Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Studio submitAiPrompt finds the form element with documentquerySelectorHTMLFormE', async ({ page }) => {
    // Checkpoint 32: Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>("form")`
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>(\"form\")`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>("form")`');
    }


    // This test validates: Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>("form")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Studio ask AI action focuses the chat input by querying inputplaceholderAI resea', async ({ page }) => {
    // Checkpoint 33: Studio `ask` AI action focuses the chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]`
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `ask` AI action focuses the chat input by querying `input[placeholder*=\"AI research assistant\"], input[placeholder*=\"challenge your thinking\"]`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 Studio `ask` AI action focuses the chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]`');
    }


    // This test validates: Studio `ask` AI action focuses the chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Studio ask AI action uses setTimeout 0 zero delay for the focus call', async ({ page }) => {
    // Checkpoint 34: Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-029');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call');
    }


    // This test validates: Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call
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
