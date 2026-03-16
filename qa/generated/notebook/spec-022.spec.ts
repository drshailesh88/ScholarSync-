/**
 * Auto-generated Playwright test for notebook/spec-022
 * Source: e2e/specs/notebook/spec-022.md
 * Generated: 2026-03-15T18:18:40.339Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-022
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-022', () => {
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

  test('cp-000: Optional projectId parameter accepted in request body', async ({ page }) => {
    // Checkpoint 0: Optional `projectId` parameter accepted in request body
    // Section: Quick Test Workflows > `/api/extract-facts/route.ts` — Extract Facts API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Optional `projectId` parameter accepted in request body",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-facts/route.ts` — Extract Facts API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "Optional `projectId` parameter accepted in request body");
    }


    // This test validates: Optional `projectId` parameter accepted in request body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Server error returns 500 with error Extraction failed', async ({ page }) => {
    // Checkpoint 1: Server error returns 500 with `{ error: "Extraction failed" }`
    // Section: Quick Test Workflows > `/api/extract-facts/route.ts` — Extract Facts API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server error returns 500 with `{ error: \"Extraction failed\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-facts/route.ts` — Extract Facts API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Server error returns 500 with `{ error: \"Extraction failed\" }`");
    }


    // This test validates: Server error returns 500 with `{ error: "Extraction failed" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Zod schema conversationId positive int paperIds positive int array min1 max25 mo', async ({ page }) => {
    // Checkpoint 2: Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `["research","learn"]` optional; `customPrompt` string max(500) optional; `length` enum `["brief","default","detailed"]` optional
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `[\"research\",\"learn\"]` optional; `customPrompt` string max(500) optional; `length` enum `[\"brief\",\"default\",\"detailed\"]` optional",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `[\"research\",\"learn\"]` optional; `customPrompt` string max(500) optional; `length` enum `[\"brief\",\"default\",\"detailed\"]` optional");
    }


    // This test validates: Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `["research","learn"]` optional; `customPrompt` string max(500) optional; `length` enum `["brief","default","detailed"]` optional
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Validation error returns the first Zod issue message as error message with statu', async ({ page }) => {
    // Checkpoint 3: Validation error returns the first Zod issue message as `{ error: message }` with status 400
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Validation error returns the first Zod issue message as `{ error: message }` with status 400",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Validation error returns the first Zod issue message as `{ error: message }` with status 400");
    }


    // This test validates: Validation error returns the first Zod issue message as `{ error: message }` with status 400
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Conversation not found or not owned by user returns 404 with error Conversation ', async ({ page }) => {
    // Checkpoint 4: Conversation not found or not owned by user returns 404 with `{ error: "Conversation not found" }`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Conversation not found or not owned by user returns 404 with `{ error: \"Conversation not found\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Conversation not found or not owned by user returns 404 with `{ error: \"Conversation not found\" }`");
    }


    // This test validates: Conversation not found or not owned by user returns 404 with `{ error: "Conversation not found" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Cache key format modelengthcustomPromptslice050sorted paperIdsjoin customPrompt ', async ({ page }) => {
    // Checkpoint 5: Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(",")}` — customPrompt changes invalidate the cache
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(\",\")}` — customPrompt changes invalidate the cache",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(\",\")}` — customPrompt changes invalidate the cache");
    }


    // This test validates: Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(",")}` — customPrompt changes invalidate the cache
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: No paper overviews available returns 400 with error No source notes available Ge', async ({ page }) => {
    // Checkpoint 6: No paper overviews available returns 400 with `{ error: "No source notes available. Generate source notes first (View Source Notes panel)." }`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "No paper overviews available returns 400 with `{ error: \"No source notes available. Generate source notes first (View Source Notes panel).\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "No paper overviews available returns 400 with `{ error: \"No source notes available. Generate source notes first (View Source Notes panel).\" }`");
    }


    // This test validates: No paper overviews available returns 400 with `{ error: "No source notes available. Generate source notes first (View Source Notes panel)." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Server error returns 500 with error Failed to generate audio overview Please try', async ({ page }) => {
    // Checkpoint 7: Server error returns 500 with `{ error: "Failed to generate audio overview. Please try again." }`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server error returns 500 with `{ error: \"Failed to generate audio overview. Please try again.\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Server error returns 500 with `{ error: \"Failed to generate audio overview. Please try again.\" }`");
    }


    // This test validates: Server error returns 500 with `{ error: "Failed to generate audio overview. Please try again." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: GET endpoint streams stored audio files requires stream query parameter with pat', async ({ page }) => {
    // Checkpoint 8: GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`");
    }


    // This test validates: GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: GET validates conversation ownership via user auth and conversation user_id matc', async ({ page }) => {
    // Checkpoint 9: GET validates conversation ownership via user auth and conversation `user_id` match
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET validates conversation ownership via user auth and conversation `user_id` match",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "GET validates conversation ownership via user auth and conversation `user_id` match");
    }


    // This test validates: GET validates conversation ownership via user auth and conversation `user_id` match
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: GET returns audio with Cache-Control private max-age3600 and Content-Length head', async ({ page }) => {
    // Checkpoint 10: GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers");
    }


    // This test validates: GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: GET MIME type detection mp3audiompeg wavaudiowav opusaudioopus aacaudioaac flaca', async ({ page }) => {
    // Checkpoint 11: GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`");
    }


    // This test validates: GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: TTS uses OpenAI provider with voice nova and format mp3', async ({ page }) => {
    // Checkpoint 12: TTS uses OpenAI provider with voice `"nova"` and format `"mp3"`
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "TTS uses OpenAI provider with voice `\"nova\"` and format `\"mp3\"`",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "TTS uses OpenAI provider with voice `\"nova\"` and format `\"mp3\"`");
    }


    // This test validates: TTS uses OpenAI provider with voice `"nova"` and format `"mp3"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Audio stored via uploadAudioOverviewconversationId audioId buffer extension from', async ({ page }) => {
    // Checkpoint 13: Audio stored via `uploadAudioOverview(conversationId, audioId, buffer, extension)` from `@/lib/storage/r2` — R2 in Workers, `.data/audio-overviews` on the local Node fallback
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Audio stored via `uploadAudioOverview(conversationId, audioId, buffer, extension)` from `@/lib/storage/r2` — R2 in Workers, `.data/audio-overviews` on the local Node fallback",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Audio stored via `uploadAudioOverview(conversationId, audioId, buffer, extension)` from `@/lib/storage/r2` — R2 in Workers, `.data/audio-overviews` on the local Node fallback");
    }


    // This test validates: Audio stored via `uploadAudioOverview(conversationId, audioId, buffer, extension)` from `@/lib/storage/r2` — R2 in Workers, `.data/audio-overviews` on the local Node fallback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Paper authors normalized supports string values objects with namefull_nameauthor', async ({ page }) => {
    // Checkpoint 14: Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5
    // Section: Quick Test Workflows > `/api/audio-overview/route.ts` — Audio Overview API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5",
      section: "Quick Test Workflows",
      subsection: "`/api/audio-overview/route.ts` — Audio Overview API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5");
    }


    // This test validates: Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: GET direct stream headers Content-Type applicationpdf Content-Disposition inline', async ({ page }) => {
    // Checkpoint 15: GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename="paper-{id}.pdf"`, `Cache-Control: private, max-age=3600`
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename=\"paper-{id}.pdf\"`, `Cache-Control: private, max-age=3600`",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename=\"paper-{id}.pdf\"`, `Cache-Control: private, max-age=3600`");
    }


    // This test validates: GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename="paper-{id}.pdf"`, `Cache-Control: private, max-age=3600`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: GET 404 when no PDF found error PDF not found for this paper', async ({ page }) => {
    // Checkpoint 16: GET 404 when no PDF found: `{ error: "PDF not found for this paper" }`
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET 404 when no PDF found: `{ error: \"PDF not found for this paper\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "GET 404 when no PDF found: `{ error: \"PDF not found for this paper\" }`");
    }


    // This test validates: GET 404 when no PDF found: `{ error: "PDF not found for this paper" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: GET calls getSignedPdfUrlpaperId first and redirects only if it returns a URL th', async ({ page }) => {
    // Checkpoint 17: GET calls `getSignedPdfUrl(paperId)` first and redirects only if it returns a URL; the current storage helper returns `null`, so the route normally falls through to direct streaming or `pdf_url` / `open_access_url` redirects
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "GET calls `getSignedPdfUrl(paperId)` first and redirects only if it returns a URL; the current storage helper returns `null`, so the route normally falls through to direct streaming or `pdf_url` / `open_access_url` redirects",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "GET calls `getSignedPdfUrl(paperId)` first and redirects only if it returns a URL; the current storage helper returns `null`, so the route normally falls through to direct streaming or `pdf_url` / `open_access_url` redirects");
    }


    // This test validates: GET calls `getSignedPdfUrl(paperId)` first and redirects only if it returns a URL; the current storage helper returns `null`, so the route normally falls through to direct streaming or `pdf_url` / `open_access_url` redirects
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: POST stores PDF via uploadPdfpaperId buffer from libstorager2 R2 in Workers data', async ({ page }) => {
    // Checkpoint 18: POST stores PDF via `uploadPdf(paperId, buffer)` from `@/lib/storage/r2` — R2 in Workers, `.data/pdfs` on the local Node fallback — then updates `pdf_storage_path`, sets `full_text_available: true`, and queues background processing
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "POST stores PDF via `uploadPdf(paperId, buffer)` from `@/lib/storage/r2` — R2 in Workers, `.data/pdfs` on the local Node fallback — then updates `pdf_storage_path`, sets `full_text_available: true`, and queues background processing",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "POST stores PDF via `uploadPdf(paperId, buffer)` from `@/lib/storage/r2` — R2 in Workers, `.data/pdfs` on the local Node fallback — then updates `pdf_storage_path`, sets `full_text_available: true`, and queues background processing");
    }


    // This test validates: POST stores PDF via `uploadPdf(paperId, buffer)` from `@/lib/storage/r2` — R2 in Workers, `.data/pdfs` on the local Node fallback — then updates `pdf_storage_path`, sets `full_text_available: true`, and queues background processing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: POST success returns success true paperId storagePath', async ({ page }) => {
    // Checkpoint 19: POST success returns `{ success: true, paperId, storagePath }`
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "POST success returns `{ success: true, paperId, storagePath }`",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "POST success returns `{ success: true, paperId, storagePath }`");
    }


    // This test validates: POST success returns `{ success: true, paperId, storagePath }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: POST failure returns 500 with error Failed to store PDF file', async ({ page }) => {
    // Checkpoint 20: POST failure returns 500 with `{ error: "Failed to store PDF file" }`
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "POST failure returns 500 with `{ error: \"Failed to store PDF file\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "POST failure returns 500 with `{ error: \"Failed to store PDF file\" }`");
    }


    // This test validates: POST failure returns 500 with `{ error: "Failed to store PDF file" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Both GET and POST validate paper ID as digits-only via regex d', async ({ page }) => {
    // Checkpoint 21: Both GET and POST validate paper ID as digits-only via regex `/^\d+$/`
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Both GET and POST validate paper ID as digits-only via regex `/^\\d+$/`",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Both GET and POST validate paper ID as digits-only via regex `/^\\d+$/`");
    }


    // This test validates: Both GET and POST validate paper ID as digits-only via regex `/^\d+$/`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Toolbar page navigation CaretLeftCaretRight page display zoom controls Magnifyin', async ({ page }) => {
    // Checkpoint 22: Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)");
    }


    // This test validates: Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Page display format pageNumber numPages when loaded while loading', async ({ page }) => {
    // Checkpoint 23: Page display format: `"{pageNumber} / {numPages}"` when loaded, `"..."` while loading
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Page display format: `\"{pageNumber} / {numPages}\"` when loaded, `\"...\"` while loading",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Page display format: `\"{pageNumber} / {numPages}\"` when loaded, `\"...\"` while loading");
    }


    // This test validates: Page display format: `"{pageNumber} / {numPages}"` when loaded, `"..."` while loading
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Zoom range minimum 05x 50 maximum 30x 300 step 025 per click', async ({ page }) => {
    // Checkpoint 24: Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click");
    }


    // This test validates: Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Zoom display Mathroundscale 100 eg 100 125', async ({ page }) => {
    // Checkpoint 25: Zoom display: `"{Math.round(scale * 100)}%"` — e.g., "100%", "125%"
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zoom display: `\"{Math.round(scale * 100)}%\"` — e.g., \"100%\", \"125%\"",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Zoom display: `\"{Math.round(scale * 100)}%\"` — e.g., \"100%\", \"125%\"");
    }


    // This test validates: Zoom display: `"{Math.round(scale * 100)}%"` — e.g., "100%", "125%"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Fit-width button resets scale to 10 not a responsive width calculation', async ({ page }) => {
    // Checkpoint 26: Fit-width button resets scale to 1.0 (not a responsive width calculation)
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Fit-width button resets scale to 1.0 (not a responsive width calculation)",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Fit-width button resets scale to 1.0 (not a responsive width calculation)");
    }


    // This test validates: Fit-width button resets scale to 1.0 (not a responsive width calculation)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Previous page button disabled when pageNumber 1 next page disabled when pageNumb', async ({ page }) => {
    // Checkpoint 27: Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`");
    }


    // This test validates: Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Zoom out disabled when scale 05 zoom in disabled when scale 30', async ({ page }) => {
    // Checkpoint 28: Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`");
    }


    // This test validates: Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: initialPage clamped to valid range on document load must be 1 and total out-of-r', async ({ page }) => {
    // Checkpoint 29: `initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "`initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1");
    }


    // This test validates: `initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Document load error with 404 Not Found or Missing in message shows specific text', async ({ page }) => {
    // Checkpoint 30: Document load error with "404", "Not Found", or "Missing" in message shows specific text: `"The original PDF is not available for this paper. It may have been imported from search without a PDF upload."`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Document load error with \"404\", \"Not Found\", or \"Missing\" in message shows specific text: `\"The original PDF is not available for this paper. It may have been imported from search without a PDF upload.\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Document load error with \"404\", \"Not Found\", or \"Missing\" in message shows specific text: `\"The original PDF is not available for this paper. It may have been imported from search without a PDF upload.\"`");
    }


    // This test validates: Document load error with "404", "Not Found", or "Missing" in message shows specific text: `"The original PDF is not available for this paper. It may have been imported from search without a PDF upload."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Other document load errors show the raw errmessage falling back to Failed to loa', async ({ page }) => {
    // Checkpoint 31: Other document load errors show the raw `err.message`, falling back to `"Failed to load PDF"`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Other document load errors show the raw `err.message`, falling back to `\"Failed to load PDF\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "Other document load errors show the raw `err.message`, falling back to `\"Failed to load PDF\"`");
    }


    // This test validates: Other document load errors show the raw `err.message`, falling back to `"Failed to load PDF"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Error display red circle bg-red-50010 with X icon text-red-500 Failed to load PD', async ({ page }) => {
    // Checkpoint 32: Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `"Failed to load PDF"` heading + error detail text
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `\"Failed to load PDF\"` heading + error detail text",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `\"Failed to load PDF\"` heading + error detail text");
    }


    // This test validates: Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `"Failed to load PDF"` heading + error detail text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Document loading state spinner border-brand border-t-transparent animate-spin Lo', async ({ page }) => {
    // Checkpoint 33: Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `"Loading PDF..."` text
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `\"Loading PDF...\"` text",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `\"Loading PDF...\"` text");
    }


    // This test validates: Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `"Loading PDF..."` text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Document component error fallback react-pdf internal error Failed to load PDF do', async ({ page }) => {
    // Checkpoint 34: Document component error fallback (react-pdf internal error): `"Failed to load PDF document."`
    // Section: Quick Test Workflows > PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-022');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Document component error fallback (react-pdf internal error): `\"Failed to load PDF document.\"`",
      section: "Quick Test Workflows",
      subsection: "PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "Document component error fallback (react-pdf internal error): `\"Failed to load PDF document.\"`");
    }


    // This test validates: Document component error fallback (react-pdf internal error): `"Failed to load PDF document."`
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
