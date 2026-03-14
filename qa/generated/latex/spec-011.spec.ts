/**
 * Auto-generated Playwright test for latex/spec-011
 * Source: e2e/specs/latex/spec-011.md
 * Generated: 2026-03-14T10:04:47.166Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-011
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-011', () => {
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

  test('cp-000: Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths', async ({ page }) => {
    // Checkpoint 0: Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths
    // Section: Quick Test Workflows > Mobile and Overlay Behavior

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths",
      section: "Quick Test Workflows",
      subsection: "Mobile and Overlay Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths");
    }


    // This test validates: Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Desktop left-edge file-tree toggle tab remains visible whenever isMobile', async ({ page }) => {
    // Checkpoint 1: Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`
    // Section: Quick Test Workflows > Mobile and Overlay Behavior

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`",
      section: "Quick Test Workflows",
      subsection: "Mobile and Overlay Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`");
    }


    // This test validates: Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Live preview debounces HTML conversion by 150 ms', async ({ page }) => {
    // Checkpoint 2: Live preview debounces HTML conversion by 150 ms
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Live preview debounces HTML conversion by 150 ms",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "Live preview debounces HTML conversion by 150 ms");
    }


    // This test validates: Live preview debounces HTML conversion by 150 ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Live preview renders from store-backed documentContent not directly from the edi', async ({ page }) => {
    // Checkpoint 3: Live preview renders from store-backed `documentContent`, not directly from the editor DOM
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Live preview renders from store-backed `documentContent`, not directly from the editor DOM",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Live preview renders from store-backed `documentContent`, not directly from the editor DOM");
    }


    // This test validates: Live preview renders from store-backed `documentContent`, not directly from the editor DOM
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: PDF preview renders only when previewMode pdf and a compiledPdfUrl exists', async ({ page }) => {
    // Checkpoint 4: PDF preview renders only when `previewMode === "pdf"` and a `compiledPdfUrl` exists
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "PDF preview renders only when `previewMode === \"pdf\"` and a `compiledPdfUrl` exists",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "PDF preview renders only when `previewMode === \"pdf\"` and a `compiledPdfUrl` exists");
    }


    // This test validates: PDF preview renders only when `previewMode === "pdf"` and a `compiledPdfUrl` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: If preview mode is pdf but there is no compiled PDF URL yet the panel falls back', async ({ page }) => {
    // Checkpoint 5: If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer");
    }


    // This test validates: If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Live preview imports KaTeX CSS from a CDN inside a global style jsx block', async ({ page }) => {
    // Checkpoint 6: Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block");
    }


    // This test validates: Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Math-rendering failures show escaped source inside latex-math-error elements ins', async ({ page }) => {
    // Checkpoint 7: Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview");
    }


    // This test validates: Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Preview scroll sync targets the last element whose data-line is less than or equ', async ({ page }) => {
    // Checkpoint 8: Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line
    // Section: Quick Test Workflows > Preview Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line",
      section: "Quick Test Workflows",
      subsection: "Preview Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line");
    }


    // This test validates: Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: CmdCtrlK opens inline AI only when the current CodeMirror selection contains non', async ({ page }) => {
    // Checkpoint 9: `Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "`Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text");
    }


    // This test validates: `Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Inline AI starts with four preset chips Improve Formalize Shorten and Fix gramma', async ({ page }) => {
    // Checkpoint 10: Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`");
    }


    // This test validates: Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Clicking a preset chip both fills the instruction input and immediately submits ', async ({ page }) => {
    // Checkpoint 11: Clicking a preset chip both fills the instruction input and immediately submits that instruction
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Clicking a preset chip both fills the instruction input and immediately submits that instruction",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "Clicking a preset chip both fills the instruction input and immediately submits that instruction");
    }


    // This test validates: Clicking a preset chip both fills the instruction input and immediately submits that instruction
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Inline AI input placeholder is Edit instruction', async ({ page }) => {
    // Checkpoint 12: Inline AI input placeholder is `Edit instruction...`
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Inline AI input placeholder is `Edit instruction...`",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "Inline AI input placeholder is `Edit instruction...`");
    }


    // This test validates: Inline AI input placeholder is `Edit instruction...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Inline AI submit button swaps from a send icon to a spinning loader while stream', async ({ page }) => {
    // Checkpoint 13: Inline AI submit button swaps from a send icon to a spinning loader while streaming
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Inline AI submit button swaps from a send icon to a spinning loader while streaming",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "Inline AI submit button swaps from a send icon to a spinning loader while streaming");
    }


    // This test validates: Inline AI submit button swaps from a send icon to a spinning loader while streaming
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Inline AI error responses are rendered inline as plain text beginning with Error', async ({ page }) => {
    // Checkpoint 14: Inline AI error responses are rendered inline as plain text beginning with `Error:`
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Inline AI error responses are rendered inline as plain text beginning with `Error:`",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Inline AI error responses are rendered inline as plain text beginning with `Error:`");
    }


    // This test validates: Inline AI error responses are rendered inline as plain text beginning with `Error:`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Accept is only meaningful when the streamed result does not begin with Error', async ({ page }) => {
    // Checkpoint 15: `Accept` is only meaningful when the streamed result does not begin with `Error:`
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`Accept` is only meaningful when the streamed result does not begin with `Error:`",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "`Accept` is only meaningful when the streamed result does not begin with `Error:`");
    }


    // This test validates: `Accept` is only meaningful when the streamed result does not begin with `Error:`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Pressing Escape while a result is visible triggers the local revertreset flow be', async ({ page }) => {
    // Checkpoint 16: Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar");
    }


    // This test validates: Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Pressing Enter accepts the result only when a suggestion exists streaming is fin', async ({ page }) => {
    // Checkpoint 17: Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus");
    }


    // This test validates: Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Slash-command menu options are table figure equation tikz cite bib fix and templ', async ({ page }) => {
    // Checkpoint 18: Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`");
    }


    // This test validates: Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Slash-command rows show a model badge only for AI-backed commands Claude or Nano', async ({ page }) => {
    // Checkpoint 19: Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)");
    }


    // This test validates: Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Slash-command keyboard navigation always starts from index 0 because the menu re', async ({ page }) => {
    // Checkpoint 20: Slash-command keyboard navigation always starts from index 0 because the menu remounts each time
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Slash-command keyboard navigation always starts from index 0 because the menu remounts each time",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "Slash-command keyboard navigation always starts from index 0 because the menu remounts each time");
    }


    // This test validates: Slash-command keyboard navigation always starts from index 0 because the menu remounts each time
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Slash-command menu returns null instead of showing an empty-state row when the f', async ({ page }) => {
    // Checkpoint 21: Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing
    // Section: Quick Test Workflows > Inline AI and Slash Menu Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing",
      section: "Quick Test Workflows",
      subsection: "Inline AI and Slash Menu Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing");
    }


    // This test validates: Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Agent-panel tabs are exactly draft learn cite and check', async ({ page }) => {
    // Checkpoint 22: Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`");
    }


    // This test validates: Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Agent-panel default tab is draft', async ({ page }) => {
    // Checkpoint 23: Agent-panel default tab is `draft`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Agent-panel default tab is `draft`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "Agent-panel default tab is `draft`");
    }


    // This test validates: Agent-panel default tab is `draft`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Draft tab empty state copy is Ask Claude to help with your paper structure argum', async ({ page }) => {
    // Checkpoint 24: Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`");
    }


    // This test validates: Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Draft-tab composer placeholder is Help me strengthen my methods section', async ({ page }) => {
    // Checkpoint 25: Draft-tab composer placeholder is `Help me strengthen my methods section...`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Draft-tab composer placeholder is `Help me strengthen my methods section...`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "Draft-tab composer placeholder is `Help me strengthen my methods section...`");
    }


    // This test validates: Draft-tab composer placeholder is `Help me strengthen my methods section...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Draft-tab send button is disabled while loading or when the prompt is blank', async ({ page }) => {
    // Checkpoint 26: Draft-tab send button is disabled while loading or when the prompt is blank
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Draft-tab send button is disabled while loading or when the prompt is blank",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "Draft-tab send button is disabled while loading or when the prompt is blank");
    }


    // This test validates: Draft-tab send button is disabled while loading or when the prompt is blank
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: File-tree latexdraft-section auto-send flow forces draft-chat intensity to accel', async ({ page }) => {
    // Checkpoint 27: File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`");
    }


    // This test validates: File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Manual draft-chat sends use intensity collaborate', async ({ page }) => {
    // Checkpoint 28: Manual draft-chat sends use intensity `collaborate`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Manual draft-chat sends use intensity `collaborate`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "Manual draft-chat sends use intensity `collaborate`");
    }


    // This test validates: Manual draft-chat sends use intensity `collaborate`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Draft-tab failures are silent in the current implementation and do not render an', async ({ page }) => {
    // Checkpoint 29: Draft-tab failures are silent in the current implementation and do not render an error banner
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Draft-tab failures are silent in the current implementation and do not render an error banner",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "Draft-tab failures are silent in the current implementation and do not render an error banner");
    }


    // This test validates: Draft-tab failures are silent in the current implementation and do not render an error banner
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Learn-tab search placeholder is Search concepts', async ({ page }) => {
    // Checkpoint 30: Learn-tab search placeholder is `Search concepts...`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Learn-tab search placeholder is `Search concepts...`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "Learn-tab search placeholder is `Search concepts...`");
    }


    // This test validates: Learn-tab search placeholder is `Search concepts...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Learn-tab category list shows the total concept count beside LaTeX Concepts', async ({ page }) => {
    // Checkpoint 31: Learn-tab category list shows the total concept count beside `LaTeX Concepts`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Learn-tab category list shows the total concept count beside `LaTeX Concepts`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "Learn-tab category list shows the total concept count beside `LaTeX Concepts`");
    }


    // This test validates: Learn-tab category list shows the total concept count beside `LaTeX Concepts`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Learn-tab copy-code button flips to a green check state for 15 seconds after cop', async ({ page }) => {
    // Checkpoint 32: Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying");
    }


    // This test validates: Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Cite-tab search placeholder is Search papers', async ({ page }) => {
    // Checkpoint 33: Cite-tab search placeholder is `Search papers...`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Cite-tab search placeholder is `Search papers...`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "Cite-tab search placeholder is `Search papers...`");
    }


    // This test validates: Cite-tab search placeholder is `Search papers...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Cite-tab empty state explicitly says Search PubMed Semantic Scholar then click t', async ({ page }) => {
    // Checkpoint 34: Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\cite{key}`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\\\cite{key}`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\\\cite{key}`");
    }


    // This test validates: Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\cite{key}`
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
