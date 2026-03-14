/**
 * Auto-generated Playwright test for editor/spec-030
 * Source: e2e/specs/editor/spec-030.md
 * Generated: 2026-03-14T02:08:30.444Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-030
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-030', () => {
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

  test('cp-000: Studio conversation mode is draft when in Write mode not write', async ({ page }) => {
    // Checkpoint 0: Studio conversation mode is `"draft"` when in Write mode (not `"write"`)
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio conversation mode is `\"draft\"` when in Write mode (not `\"write\"`)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 Studio conversation mode is `"draft"` when in Write mode (not `"write"`)');
    }


    // This test validates: Studio conversation mode is `"draft"` when in Write mode (not `"write"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Studio conversation mode is learn when in Learn mode', async ({ page }) => {
    // Checkpoint 1: Studio conversation mode is `"learn"` when in Learn mode
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio conversation mode is `\"learn\"` when in Learn mode",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 Studio conversation mode is `"learn"` when in Learn mode');
    }


    // This test validates: Studio conversation mode is `"learn"` when in Learn mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Studio chat streaming uses TextDecoder with stream true option for incremental d', async ({ page }) => {
    // Checkpoint 2: Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding');
    }


    // This test validates: Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Studio chat streaming mutates the assistantMsgcontent string directly before cal', async ({ page }) => {
    // Checkpoint 3: Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state');
    }


    // This test validates: Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Studio chat sends assistant message content to addMessage only after the entire ', async ({ page }) => {
    // Checkpoint 4: Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)');
    }


    // This test validates: Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Studio chat addMessage calls for both user and assistant messages use catch to s', async ({ page }) => {
    // Checkpoint 5: Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors
    // Section: Error Handling & Edge Cases > Studio Chat Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors');
    }


    // This test validates: Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Studio Checks tab feeds IntegrityPanel the document text from editorRefcurrentvi', async ({ page }) => {
    // Checkpoint 6: Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`');
    }


    // This test validates: Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Studio passes sorted cited references to IntegrityPanel as sources prop includin', async ({ page }) => {
    // Checkpoint 7: Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year');
    }


    // This test validates: Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: IntegrityPanel sources author formatting handles both string and given family ob', async ({ page }) => {
    // Checkpoint 8: IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats');
    }


    // This test validates: IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: IntegrityPanel API request body truncates document text to first 50000 character', async ({ page }) => {
    // Checkpoint 9: IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`');
    }


    // This test validates: IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: IntegrityPanel API endpoint is apiintegrity-check POST', async ({ page }) => {
    // Checkpoint 10: IntegrityPanel API endpoint is `/api/integrity-check` (POST)
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "IntegrityPanel API endpoint is `/api/integrity-check` (POST)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 IntegrityPanel API endpoint is `/api/integrity-check` (POST)');
    }


    // This test validates: IntegrityPanel API endpoint is `/api/integrity-check` (POST)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: IntegrityPanel error message for short documents is exactly Document must have a', async ({ page }) => {
    // Checkpoint 11: IntegrityPanel error message for short documents is exactly `"Document must have at least 50 characters to check."`
    // Section: Error Handling & Edge Cases > Studio Integrity Panel Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "IntegrityPanel error message for short documents is exactly `\"Document must have at least 50 characters to check.\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Integrity Panel Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 IntegrityPanel error message for short documents is exactly `"Document must have at least 50 characters to check."`');
    }


    // This test validates: IntegrityPanel error message for short documents is exactly `"Document must have at least 50 characters to check."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Studio getEditorContent reads the raw HTML from documentquerySelectorProseMirror', async ({ page }) => {
    // Checkpoint 12: Studio `getEditorContent()` reads the raw HTML from `document.querySelector(".ProseMirror")?.innerHTML`
    // Section: Error Handling & Edge Cases > Studio Export Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `getEditorContent()` reads the raw HTML from `document.querySelector(\".ProseMirror\")?.innerHTML`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 Studio `getEditorContent()` reads the raw HTML from `document.querySelector(".ProseMirror")?.innerHTML`');
    }


    // This test validates: Studio `getEditorContent()` reads the raw HTML from `document.querySelector(".ProseMirror")?.innerHTML`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Studio PDF export writes HTML responses into a new window via documentwrite but ', async ({ page }) => {
    // Checkpoint 13: Studio PDF export writes HTML responses into a new window via `document.write()`, but sends binary PDF responses to that window via blob URL navigation
    // Section: Error Handling & Edge Cases > Studio Export Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio PDF export writes HTML responses into a new window via `document.write()`, but sends binary PDF responses to that window via blob URL navigation",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 Studio PDF export writes HTML responses into a new window via `document.write()`, but sends binary PDF responses to that window via blob URL navigation');
    }


    // This test validates: Studio PDF export writes HTML responses into a new window via `document.write()`, but sends binary PDF responses to that window via blob URL navigation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Studio Word export filename regex replaces ALL non-alphanumeric characters inclu', async ({ page }) => {
    // Checkpoint 14: Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores
    // Section: Error Handling & Edge Cases > Studio Export Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores');
    }


    // This test validates: Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Studio Word export creates a temporary a element appends it to documentbody prog', async ({ page }) => {
    // Checkpoint 15: Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL
    // Section: Error Handling & Edge Cases > Studio Export Internals

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL');
    }


    // This test validates: Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Studio TiptapEditor editor content CSS class is academic-editor-content max-w-no', async ({ page }) => {
    // Checkpoint 16: Studio `TiptapEditor` editor content CSS class is `"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4"` — does NOT include `prose prose-lg`
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `TiptapEditor` editor content CSS class is `\"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4\"` — does NOT include `prose prose-lg`",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 Studio `TiptapEditor` editor content CSS class is `"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4"` — does NOT include `prose prose-lg`');
    }


    // This test validates: Studio `TiptapEditor` editor content CSS class is `"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4"` — does NOT include `prose prose-lg`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: AcademicEditor editor content CSS class includes prose prose-lg which Studios ve', async ({ page }) => {
    // Checkpoint 17: AcademicEditor editor content CSS class includes `"prose prose-lg"` which Studio's version omits, resulting in different default typography styles
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor editor content CSS class includes `\"prose prose-lg\"` which Studio's version omits, resulting in different default typography styles",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 AcademicEditor editor content CSS class includes `"prose prose-lg"` which Studio\'s version omits, resulting in different default typography styles');
    }


    // This test validates: AcademicEditor editor content CSS class includes `"prose prose-lg"` which Studio's version omits, resulting in different default typography styles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Studio TiptapEditor vertical padding is py-4 16px vs AcademicEditors py-8 32px', async ({ page }) => {
    // Checkpoint 18: Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor's `py-8` (32px)
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor's `py-8` (32px)",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor\'s `py-8` (32px)');
    }


    // This test validates: Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor's `py-8` (32px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Both editors set immediatelyRender false on useEditor disabling server-side rend', async ({ page }) => {
    // Checkpoint 19: Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content');
    }


    // This test validates: Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: AcademicEditor wrapper max width is max-w-720px with mx-auto px-6', async ({ page }) => {
    // Checkpoint 20: AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`');
    }


    // This test validates: AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Studio TiptapEditor supports heading levels 1 2 3 4 5 6 vs AcademicEditors 1 2 3', async ({ page }) => {
    // Checkpoint 21: Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor's `[1, 2, 3, 4]`
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor's `[1, 2, 3, 4]`",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor\'s `[1, 2, 3, 4]`');
    }


    // This test validates: Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor's `[1, 2, 3, 4]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Both editors load CharacterCount extension but neither exposes a character count', async ({ page }) => {
    // Checkpoint 22: Both editors load `CharacterCount` extension but neither exposes a character count value in the UI
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Both editors load `CharacterCount` extension but neither exposes a character count value in the UI",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 Both editors load `CharacterCount` extension but neither exposes a character count value in the UI');
    }


    // This test validates: Both editors load `CharacterCount` extension but neither exposes a character count value in the UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Both editors load Typography extension for automatic smart quote and typographic', async ({ page }) => {
    // Checkpoint 23: Both editors load `Typography` extension for automatic smart quote and typographic substitution
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Both editors load `Typography` extension for automatic smart quote and typographic substitution",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 Both editors load `Typography` extension for automatic smart quote and typographic substitution');
    }


    // This test validates: Both editors load `Typography` extension for automatic smart quote and typographic substitution
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: AcademicEditor configures Highlightconfigure multicolor true enabling multi-colo', async ({ page }) => {
    // Checkpoint 24: AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support');
    }


    // This test validates: AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: AcademicEditor configures TiptapImageconfigure inline false allowBase64 true mak', async ({ page }) => {
    // Checkpoint 25: AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements');
    }


    // This test validates: AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: AcademicEditor configures Placeholderconfigure showOnlyCurrent true includeChild', async ({ page }) => {
    // Checkpoint 26: AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block');
    }


    // This test validates: AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: AcademicEditor Table extension applies academic-table class via HTMLAttributescl', async ({ page }) => {
    // Checkpoint 27: AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)');
    }


    // This test validates: AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: AcademicEditor returns null renders nothing when the useEditor hook has not yet ', async ({ page }) => {
    // Checkpoint 28: AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized
    // Section: Error Handling & Edge Cases > TiptapEditor (Studio) vs AcademicEditor Differences

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor (Studio) vs AcademicEditor Differences",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized');
    }


    // This test validates: AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: EDITOR_SHORTCUTS constant in editor-configts defines clearFormatting Mod- but th', async ({ page }) => {
    // Checkpoint 29: `EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: "Mod-\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: \"Mod-\\\\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 `EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: "Mod-\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`');
    }


    // This test validates: `EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: "Mod-\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: EDITOR_SHORTCUTS defines heading shortcuts as Mod-Alt-1 through Mod-Alt-4 but th', async ({ page }) => {
    // Checkpoint 30: `EDITOR_SHORTCUTS` defines heading shortcuts as `"Mod-Alt-1"` through `"Mod-Alt-4"` but the actual `AcademicKeyboardShortcuts` extension registers them as `"Mod-Shift-1"` through `"Mod-Shift-4"`
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` defines heading shortcuts as `\"Mod-Alt-1\"` through `\"Mod-Alt-4\"` but the actual `AcademicKeyboardShortcuts` extension registers them as `\"Mod-Shift-1\"` through `\"Mod-Shift-4\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 `EDITOR_SHORTCUTS` defines heading shortcuts as `"Mod-Alt-1"` through `"Mod-Alt-4"` but the actual `AcademicKeyboardShortcuts` extension registers them as `"Mod-Shift-1"` through `"Mod-Shift-4"`');
    }


    // This test validates: `EDITOR_SHORTCUTS` defines heading shortcuts as `"Mod-Alt-1"` through `"Mod-Alt-4"` but the actual `AcademicKeyboardShortcuts` extension registers them as `"Mod-Shift-1"` through `"Mod-Shift-4"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: EDITOR_SHORTCUTS defines documentOutline Mod-Shift-o but this shortcut is NOT wi', async ({ page }) => {
    // Checkpoint 31: `EDITOR_SHORTCUTS` defines `documentOutline: "Mod-Shift-o"` but this shortcut is NOT wired in any extension or event listener
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` defines `documentOutline: \"Mod-Shift-o\"` but this shortcut is NOT wired in any extension or event listener",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 `EDITOR_SHORTCUTS` defines `documentOutline: "Mod-Shift-o"` but this shortcut is NOT wired in any extension or event listener');
    }


    // This test validates: `EDITOR_SHORTCUTS` defines `documentOutline: "Mod-Shift-o"` but this shortcut is NOT wired in any extension or event listener
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: EDITOR_SHORTCUTS defines find Mod-f and findReplace Mod-Shift-h but neither find', async ({ page }) => {
    // Checkpoint 32: `EDITOR_SHORTCUTS` defines `find: "Mod-f"` and `findReplace: "Mod-Shift-h"` but neither find nor find-replace functionality is implemented
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` defines `find: \"Mod-f\"` and `findReplace: \"Mod-Shift-h\"` but neither find nor find-replace functionality is implemented",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 `EDITOR_SHORTCUTS` defines `find: "Mod-f"` and `findReplace: "Mod-Shift-h"` but neither find nor find-replace functionality is implemented');
    }


    // This test validates: `EDITOR_SHORTCUTS` defines `find: "Mod-f"` and `findReplace: "Mod-Shift-h"` but neither find nor find-replace functionality is implemented
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: EDITOR_SHORTCUTS defines insertComment Mod-Shift-m but the actual comment shortc', async ({ page }) => {
    // Checkpoint 33: `EDITOR_SHORTCUTS` defines `insertComment: "Mod-Shift-m"` but the actual comment shortcut is `"Mod-/"` via `AcademicKeyboardShortcuts`
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` defines `insertComment: \"Mod-Shift-m\"` but the actual comment shortcut is `\"Mod-/\"` via `AcademicKeyboardShortcuts`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 `EDITOR_SHORTCUTS` defines `insertComment: "Mod-Shift-m"` but the actual comment shortcut is `"Mod-/"` via `AcademicKeyboardShortcuts`');
    }


    // This test validates: `EDITOR_SHORTCUTS` defines `insertComment: "Mod-Shift-m"` but the actual comment shortcut is `"Mod-/"` via `AcademicKeyboardShortcuts`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: EDITOR_SHORTCUTS defines suggestingMode Mod-Shift-s but suggestingtrack-changes ', async ({ page }) => {
    // Checkpoint 34: `EDITOR_SHORTCUTS` defines `suggestingMode: "Mod-Shift-s"` but suggesting/track-changes mode is not implemented
    // Section: Error Handling & Edge Cases > Editor Config Constants (Defined But Not All Wired)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-030');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS` defines `suggestingMode: \"Mod-Shift-s\"` but suggesting/track-changes mode is not implemented",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Config Constants (Defined But Not All Wired)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 `EDITOR_SHORTCUTS` defines `suggestingMode: "Mod-Shift-s"` but suggesting/track-changes mode is not implemented');
    }


    // This test validates: `EDITOR_SHORTCUTS` defines `suggestingMode: "Mod-Shift-s"` but suggesting/track-changes mode is not implemented
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
