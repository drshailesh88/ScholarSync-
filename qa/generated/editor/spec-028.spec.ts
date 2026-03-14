/**
 * Auto-generated Playwright test for editor/spec-028
 * Source: e2e/specs/editor/spec-028.md
 * Generated: 2026-03-14T02:06:31.600Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-028
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-028', () => {
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

  test('cp-000: Studio chat API selects getDraftSystemPrompt only when mode draft and draftConte', async ({ page }) => {
    // Checkpoint 0: Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === \"draft\"` and `draftContext.intensity` exists",
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
      throw new Error('Unhandled editor checkpoint: cp-000 Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists');
    }


    // This test validates: Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Studio chat API falls back to getDefaultDraftPrompt when Draft mode lacks intens', async ({ page }) => {
    // Checkpoint 1: Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context",
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
      throw new Error('Unhandled editor checkpoint: cp-001 Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context');
    }


    // This test validates: Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Draft prompt builder layers the base prompt intensity overlay optional ScholarRu', async ({ page }) => {
    // Checkpoint 2: Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order",
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
      throw new Error('Unhandled editor checkpoint: cp-002 Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order');
    }


    // This test validates: Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Guide prompt builder is stage-based and document-type-based rather than a single', async ({ page }) => {
    // Checkpoint 3: Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string",
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
      throw new Error('Unhandled editor checkpoint: cp-003 Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string');
    }


    // This test validates: Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Studio chat API returns Authentication required with HTTP 401 when auth fails', async ({ page }) => {
    // Checkpoint 4: Studio chat API returns `Authentication required.` with HTTP 401 when auth fails
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API returns `Authentication required.` with HTTP 401 when auth fails",
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
      throw new Error('Unhandled editor checkpoint: cp-004 Studio chat API returns `Authentication required.` with HTTP 401 when auth fails');
    }


    // This test validates: Studio chat API returns `Authentication required.` with HTTP 401 when auth fails
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Studio chat API returns Invalid request Please check your input and try again wi', async ({ page }) => {
    // Checkpoint 5: Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails",
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
      throw new Error('Unhandled editor checkpoint: cp-005 Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails');
    }


    // This test validates: Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Studio chat API returns AI service is not configured Please contact an administr', async ({ page }) => {
    // Checkpoint 6: Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable');
    }


    // This test validates: Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Studio chat API returns An unexpected error occurred Please try again with HTTP ', async ({ page }) => {
    // Checkpoint 7: Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors');
    }


    // This test validates: Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Studio page turns non-OK chat responses into the visible chatError banner withou', async ({ page }) => {
    // Checkpoint 8: Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message');
    }


    // This test validates: Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Studio page appends an empty assistant message before streaming response chunks ', async ({ page }) => {
    // Checkpoint 9: Studio page appends an empty assistant message before streaming response chunks into it
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio page appends an empty assistant message before streaming response chunks into it",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 Studio page appends an empty assistant message before streaming response chunks into it');
    }


    // This test validates: Studio page appends an empty assistant message before streaming response chunks into it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Streaming assistant content is persisted back to conversations only after the fi', async ({ page }) => {
    // Checkpoint 10: Streaming assistant content is persisted back to conversations only after the final chunk has been received
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Streaming assistant content is persisted back to conversations only after the final chunk has been received",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 Streaming assistant content is persisted back to conversations only after the final chunk has been received');
    }


    // This test validates: Streaming assistant content is persisted back to conversations only after the final chunk has been received
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: scholarsyncai-action continue prompt starts Continue writing from where the user', async ({ page }) => {
    // Checkpoint 11: `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`');
    }


    // This test validates: `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: scholarsyncai-action outline-section prompt starts Create a concise bullet outli', async ({ page }) => {
    // Checkpoint 12: `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`');
    }


    // This test validates: `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: scholarsyncai-action check-guidelines prompt starts Review this draft against th', async ({ page }) => {
    // Checkpoint 13: `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`');
    }


    // This test validates: `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: scholarsyncai-action precision-edit prompt starts Improve the clarity precision ', async ({ page }) => {
    // Checkpoint 14: `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`');
    }


    // This test validates: `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: scholarsyncai-action summarize prompt starts Summarize the following text concis', async ({ page }) => {
    // Checkpoint 15: `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`');
    }


    // This test validates: `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: scholarsyncai-action cite prompt is the fixed question Help me add a citation fr', async ({ page }) => {
    // Checkpoint 16: `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`');
    }


    // This test validates: `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: scholarsyncai-action ask focuses the chat input and does not auto-send any messa', async ({ page }) => {
    // Checkpoint 17: `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message');
    }


    // This test validates: `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: scholarsyncai-action find-sources opens the ResearchSidebar instead of sending a', async ({ page }) => {
    // Checkpoint 18: `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message');
    }


    // This test validates: `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: find-sources seeds research query text from only the first 200 characters of edi', async ({ page }) => {
    // Checkpoint 19: `find-sources` seeds research query text from only the first 200 characters of editor context
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`find-sources` seeds research query text from only the first 200 characters of editor context",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 `find-sources` seeds research query text from only the first 200 characters of editor context');
    }


    // This test validates: `find-sources` seeds research query text from only the first 200 characters of editor context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: scholarsyncai-action integrity-check switches directly to the Checks tab and doe', async ({ page }) => {
    // Checkpoint 20: `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat');
    }


    // This test validates: `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Studio show-word-count action writes a synthetic assistant chat message instead ', async ({ page }) => {
    // Checkpoint 21: Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal');
    }


    // This test validates: Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Studio word-count assistant message starts with Section word counts when section', async ({ page }) => {
    // Checkpoint 22: Studio word-count assistant message starts with `Section word counts:` when section headings exist
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio word-count assistant message starts with `Section word counts:` when section headings exist",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 Studio word-count assistant message starts with `Section word counts:` when section headings exist');
    }


    // This test validates: Studio word-count assistant message starts with `Section word counts:` when section headings exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Studio word-count assistant message falls back to Document word count n words wh', async ({ page }) => {
    // Checkpoint 23: Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist');
    }


    // This test validates: Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Studio comment action dispatch always includes quotedText extracted from the cur', async ({ page }) => {
    // Checkpoint 24: Studio comment action dispatch always includes `quotedText` extracted from the current selection
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio comment action dispatch always includes `quotedText` extracted from the current selection",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 Studio comment action dispatch always includes `quotedText` extracted from the current selection');
    }


    // This test validates: Studio comment action dispatch always includes `quotedText` extracted from the current selection
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Studio citation insertion restores the saved text selection before inserting a c', async ({ page }) => {
    // Checkpoint 25: Studio citation insertion restores the saved text selection before inserting a citation node when possible
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio citation insertion restores the saved text selection before inserting a citation node when possible",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 Studio citation insertion restores the saved text selection before inserting a citation node when possible');
    }


    // This test validates: Studio citation insertion restores the saved text selection before inserting a citation node when possible
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Successful Studio citation insertion auto-appends a bibliography node when missi', async ({ page }) => {
    // Checkpoint 26: Successful Studio citation insertion auto-appends a bibliography node when missing
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Successful Studio citation insertion auto-appends a bibliography node when missing",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 Successful Studio citation insertion auto-appends a bibliography node when missing');
    }


    // This test validates: Successful Studio citation insertion auto-appends a bibliography node when missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Studio citation notice auto-clears after 2500 ms', async ({ page }) => {
    // Checkpoint 27: Studio citation notice auto-clears after 2500 ms
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio citation notice auto-clears after 2500 ms",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 Studio citation notice auto-clears after 2500 ms');
    }


    // This test validates: Studio citation notice auto-clears after 2500 ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Research-to-editor citation insertion creates ids in the form ref-research-stabl', async ({ page }) => {
    // Checkpoint 28: Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`');
    }


    // This test validates: Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Research quick-search button opens the ResearchSidebar only when the query is no', async ({ page }) => {
    // Checkpoint 29: Research quick-search button opens the ResearchSidebar only when the query is non-empty
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Research quick-search button opens the ResearchSidebar only when the query is non-empty",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 Research quick-search button opens the ResearchSidebar only when the query is non-empty');
    }


    // This test validates: Research quick-search button opens the ResearchSidebar only when the query is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Checks tab feeds IntegrityPanel plain text from editorRefcurrentviewdominnerText', async ({ page }) => {
    // Checkpoint 30: Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`');
    }


    // This test validates: Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Studio export dropdown items are Export as PDF and Export as Word', async ({ page }) => {
    // Checkpoint 31: Studio export dropdown items are `Export as PDF` and `Export as Word`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio export dropdown items are `Export as PDF` and `Export as Word`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 Studio export dropdown items are `Export as PDF` and `Export as Word`');
    }


    // This test validates: Studio export dropdown items are `Export as PDF` and `Export as Word`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Studio export dropdown closes immediately before either network request is start', async ({ page }) => {
    // Checkpoint 32: Studio export dropdown closes immediately before either network request is started
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio export dropdown closes immediately before either network request is started",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 Studio export dropdown closes immediately before either network request is started');
    }


    // This test validates: Studio export dropdown closes immediately before either network request is started
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Studio handleExportPDF posts title content HTML to apiexportpdf', async ({ page }) => {
    // Checkpoint 33: Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`');
    }


    // This test validates: Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Studio handleExportPDF silently returns when editor HTML content is empty', async ({ page }) => {
    // Checkpoint 34: Studio `handleExportPDF()` silently returns when editor HTML content is empty
    // Section: Error Handling & Edge Cases > Studio Chat, Prompt Construction, Research, Checks, and Export Wiring

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-028');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `handleExportPDF()` silently returns when editor HTML content is empty",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat, Prompt Construction, Research, Checks, and Export Wiring",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 Studio `handleExportPDF()` silently returns when editor HTML content is empty');
    }


    // This test validates: Studio `handleExportPDF()` silently returns when editor HTML content is empty
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
