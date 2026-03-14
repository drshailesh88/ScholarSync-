/**
 * Auto-generated Playwright test for studio/spec-015
 * Source: e2e/specs/studio/spec-015.md
 * Generated: 2026-03-14T01:17:03.042Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts studio spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';





import { assertStudioCheckpoint } from '../../module-assertions/studio';














test.describe('studio / spec-015', () => {
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

  test('cp-000: guideContext payload from client includes documentType stage and optionally proj', async ({ page }) => {
    // Checkpoint 0: `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `\"Untitled Document\"`)",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-000 `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)');
    }


    // This test validates: `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: draftContext payload from client includes intensity and optionally projectTitle ', async ({ page }) => {
    // Checkpoint 1: `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `\"Untitled Document\"`)",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-001 `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)');
    }


    // This test validates: `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: AI model obtained via dynamic import getModel from libaimodels', async ({ page }) => {
    // Checkpoint 2: AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-002 AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`');
    }


    // This test validates: AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: User message ID format msg_Datenow assistant message ID msg_Datenow 1', async ({ page }) => {
    // Checkpoint 3: User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-003 User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`');
    }


    // This test validates: User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Streaming uses new TextDecoder with decodevalue stream true', async ({ page }) => {
    // Checkpoint 4: Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-004 Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`');
    }


    // This test validates: Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: During streaming assistant content accumulated via local variable mutation assis', async ({ page }) => {
    // Checkpoint 5: During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-005 During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map');
    }


    // This test validates: During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: After streaming completes assistant message persisted via addMessage only if con', async ({ page }) => {
    // Checkpoint 6: After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-006 After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty');
    }


    // This test validates: After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Messages rendered as plain text in p classNamewhitespace-pre-wrap text-xs leadin', async ({ page }) => {
    // Checkpoint 7: Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Messages rendered as plain text in `<p className=\"whitespace-pre-wrap text-xs leading-relaxed\">` — NOT rendered as markdown",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-007 Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown');
    }


    // This test validates: Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: User messages styled bg-surface-raised text-ink max-width 85', async ({ page }) => {
    // Checkpoint 8: User messages styled: `bg-surface-raised text-ink`, max-width 85%
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "User messages styled: `bg-surface-raised text-ink`, max-width 85%",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-008 User messages styled: `bg-surface-raised text-ink`, max-width 85%');
    }


    // This test validates: User messages styled: `bg-surface-raised text-ink`, max-width 85%
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Assistant messages styled bg-brand5 text-ink max-width 85', async ({ page }) => {
    // Checkpoint 9: Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-009 Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%');
    }


    // This test validates: Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Assistant avatar 24px circle w-6 h-6 rounded-full bg-brand20 with Sparkle 12px i', async ({ page }) => {
    // Checkpoint 10: Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-010 Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`');
    }


    // This test validates: Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Loading placeholder appears only when isLoading messagesmessageslength-1role ass', async ({ page }) => {
    // Checkpoint 11: Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== \"assistant\"` (disappears once streaming starts)",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-011 Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)');
    }


    // This test validates: Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Loading placeholder Sparkle icon uses animate-spin class', async ({ page }) => {
    // Checkpoint 12: Loading placeholder Sparkle icon uses `animate-spin` class
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Loading placeholder Sparkle icon uses `animate-spin` class",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-012 Loading placeholder Sparkle icon uses `animate-spin` class');
    }


    // This test validates: Loading placeholder Sparkle icon uses `animate-spin` class
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Three bouncing dots are 6px circles w-15 h-15 rounded-full bg-brand40 animate-bo', async ({ page }) => {
    // Checkpoint 13: Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-013 Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms');
    }


    // This test validates: Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Send button uses PaperPlaneRight icon 16px styled bg-brand text-white hoverbg-br', async ({ page }) => {
    // Checkpoint 14: Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-014 Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`');
    }


    // This test validates: Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Chat error renders above messages p-3 rounded-lg bg-amber-50010 text-amber-500 t', async ({ page }) => {
    // Checkpoint 15: Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-015 Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`');
    }


    // This test validates: Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Chat input has focusring-2 focusring-brand40 focus ring', async ({ page }) => {
    // Checkpoint 16: Chat input has `focus:ring-2 focus:ring-brand/40` focus ring
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Chat input has `focus:ring-2 focus:ring-brand/40` focus ring",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-016 Chat input has `focus:ring-2 focus:ring-brand/40` focus ring');
    }


    // This test validates: Chat input has `focus:ring-2 focus:ring-brand/40` focus ring
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: submitAiPrompt calls setInputprompt twice once immediately and once inside the 1', async ({ page }) => {
    // Checkpoint 17: `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission
    // Section: Quick Test Workflows > Chat Panel Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission",
      section: "Quick Test Workflows",
      subsection: "Chat Panel Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-017 `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission');
    }


    // This test validates: `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Comment sidebar width w-80 320px bg-surface border-l border-border', async ({ page }) => {
    // Checkpoint 18: Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-018 Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`');
    }


    // This test validates: Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Header shows ChatCircle 16px icon Comments title text-sm font-semibold text-ink', async ({ page }) => {
    // Checkpoint 19: Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Header shows `ChatCircle` 16px icon + \"Comments\" title (text-sm font-semibold text-ink)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-019 Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)');
    }


    // This test validates: Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Unresolved comment count badge bg-amber-50015 text-amber-500 rounded-full text-1', async ({ page }) => {
    // Checkpoint 20: Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-020 Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`');
    }


    // This test validates: Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Close button X 16px icon in header p-1 rounded hoverbg-surface-raised text-ink-m', async ({ page }) => {
    // Checkpoint 21: Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-021 Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`');
    }


    // This test validates: Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Filter bar with FunnelSimple 12px icon and three filter buttons all unresolved r', async ({ page }) => {
    // Checkpoint 22: Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-022 Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)');
    }


    // This test validates: Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Active filter styled bg-brand10 text-brand inactive text-ink-muted hoverbg-surfa', async ({ page }) => {
    // Checkpoint 23: Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-023 Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`');
    }


    // This test validates: Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Empty state no comments no pending inline ChatCircle 32px icon text-ink-muted30 ', async ({ page }) => {
    // Checkpoint 24: Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text \"No comments yet\", subtext \"Select text and click the comment button to start\"",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-024 Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"');
    }


    // This test validates: Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Inline comment creation shows Commenting on selection with TextB 12px icon in br', async ({ page }) => {
    // Checkpoint 25: Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Inline comment creation shows \"Commenting on selection\" with `TextB` 12px icon in brand, uppercase text-[10px]",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-025 Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]');
    }


    // This test validates: Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Inline comment quoted text blockquote with border-l-2 border-brand30 pl-2 curly ', async ({ page }) => {
    // Checkpoint 26: Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-026 Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic');
    }


    // This test validates: Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Inline comment form has Cancel button text-ink-muted hoverbg-surface-raised and ', async ({ page }) => {
    // Checkpoint 27: Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Inline comment form has \"Cancel\" button (`text-ink-muted hover:bg-surface-raised`) and \"Add Comment\" button (`bg-brand text-white disabled:opacity-50`)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-027 Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)');
    }


    // This test validates: Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Comment bubbles show user avatar first letter of userName default U uppercase in', async ({ page }) => {
    // Checkpoint 28: Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Comment bubbles show: user avatar (first letter of `userName`, default `\"U\"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `\"User\"`), relative timestamp",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-028 Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp');
    }


    // This test validates: Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Relative timestamps Just now 1m Nm ago 1h Nh ago 24h Yesterday 1d Nd ago 7d loca', async ({ page }) => {
    // Checkpoint 29: Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-029 Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)');
    }


    // This test validates: Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Resolved comments Resolved emerald badge bg-emerald-50010 text-emerald-500 line-', async ({ page }) => {
    // Checkpoint 30: Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Resolved comments: `\"Resolved\"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-030 Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container');
    }


    // This test validates: Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Comment actions visible on hover only opacity-0 group-hoveropacity-100 Resolve C', async ({ page }) => {
    // Checkpoint 31: Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + \"Resolve\") / Unresolve (`ArrowClockwise` icon + \"Unresolve\"), Reply (`ArrowBendDownRight` icon + \"Reply\"), Delete (`Trash` icon + \"Delete\" in red, owner-only)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-031 Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)');
    }


    // This test validates: Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: ResolveUnresolve only shown on top-level comments not replies', async ({ page }) => {
    // Checkpoint 32: Resolve/Unresolve only shown on top-level comments, not replies
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Resolve/Unresolve only shown on top-level comments, not replies",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-032 Resolve/Unresolve only shown on top-level comments, not replies');
    }


    // This test validates: Resolve/Unresolve only shown on top-level comments, not replies
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Reply button only shown on top-level comments', async ({ page }) => {
    // Checkpoint 33: Reply button only shown on top-level comments
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Reply button only shown on top-level comments",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-033 Reply button only shown on top-level comments');
    }


    // This test validates: Reply button only shown on top-level comments
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Reply input placeholder Write a reply', async ({ page }) => {
    // Checkpoint 34: Reply input placeholder: `Write a reply...`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Reply input placeholder: `Write a reply...`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-034 Reply input placeholder: `Write a reply...`');
    }


    // This test validates: Reply input placeholder: `Write a reply...`
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
