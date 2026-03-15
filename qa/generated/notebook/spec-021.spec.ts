/**
 * Auto-generated Playwright test for notebook/spec-021
 * Source: e2e/specs/notebook/spec-021.md
 * Generated: 2026-03-14T10:50:58.108Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-021
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-021', () => {
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

  test('cp-000: Rate-limited via checkRateLimituserId rag-chat RATE_LIMITSai rate limit hit retu', async ({ page }) => {
    // Checkpoint 0: Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Rate-limited via `checkRateLimit(userId, \"rag-chat\", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "Rate-limited via `checkRateLimit(userId, \"rag-chat\", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly");
    }


    // This test validates: Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Validation failure returns error Invalid request Please check your input and try', async ({ page }) => {
    // Checkpoint 1: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Validation failure returns `{ error: \"Invalid request. Please check your input and try again.\" }` with status 400",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Validation failure returns `{ error: \"Invalid request. Please check your input and try again.\" }` with status 400");
    }


    // This test validates: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: When AI is not configured isAIConfigured returns a deterministic fallback via bu', async ({ page }) => {
    // Checkpoint 2: When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers");
    }


    // This test validates: When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: RAG retrieval failure is caught and logged as warning RAG retrieval failed falli', async ({ page }) => {
    // Checkpoint 3: RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "RAG retrieval failure is caught and logged as warning `\"RAG retrieval failed, falling back to no-context mode\"`; streaming continues without context chunks",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "RAG retrieval failure is caught and logged as warning `\"RAG retrieval failed, falling back to no-context mode\"`; streaming continues without context chunks");
    }


    // This test validates: RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: streamText error falls back to buildFallbackNotebookAnswer with source headers i', async ({ page }) => {
    // Checkpoint 4: `streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "`streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)");
    }


    // This test validates: `streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Outer catch returns error An error occurred while processing your request Please', async ({ page }) => {
    // Checkpoint 5: Outer catch returns `{ error: "An error occurred while processing your request. Please try again." }` with status 500
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Outer catch returns `{ error: \"An error occurred while processing your request. Please try again.\" }` with status 500",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Outer catch returns `{ error: \"An error occurred while processing your request. Please try again.\" }` with status 500");
    }


    // This test validates: Outer catch returns `{ error: "An error occurred while processing your request. Please try again." }` with status 500
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: System prompt base text is You are ScholarSync an AI research assistant for acad', async ({ page }) => {
    // Checkpoint 6: System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "System prompt base text is `\"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions.\"`",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "System prompt base text is `\"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions.\"`");
    }


    // This test validates: System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Notebook mode appends You are in Notebook mode analyzing uploaded research sourc', async ({ page }) => {
    // Checkpoint 7: Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook mode appends `\" You are in Notebook mode — analyzing uploaded research sources.\"` to the system prompt",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Notebook mode appends `\" You are in Notebook mode — analyzing uploaded research sources.\"` to the system prompt");
    }


    // This test validates: Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: System prompt includes 5 CRITICAL RULES for citation behavior when context chunk', async ({ page }) => {
    // Checkpoint 8: System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `"For EVERY factual claim, cite the source number in brackets like [1] or [1][2]."`
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `\"For EVERY factual claim, cite the source number in brackets like [1] or [1][2].\"`",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `\"For EVERY factual claim, cite the source number in brackets like [1] or [1][2].\"`");
    }


    // This test validates: System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `"For EVERY factual claim, cite the source number in brackets like [1] or [1][2]."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Default RAG pipeline config topK 8 useMultiQuery true useHyDE true useSelfQuery ', async ({ page }) => {
    // Checkpoint 9: Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`");
    }


    // This test validates: Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Fallback answer with zero chunks I couldnt retrieve grounded source passages for', async ({ page }) => {
    // Checkpoint 10: Fallback answer with zero chunks: `"I couldn't retrieve grounded source passages for that question.\n\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Fallback answer with zero chunks: `\"I couldn't retrieve grounded source passages for that question.\\n\\nTry selecting more sources or ask a narrower question tied to the uploaded papers.\"`",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Fallback answer with zero chunks: `\"I couldn't retrieve grounded source passages for that question.\\n\\nTry selecting more sources or ask a narrower question tied to the uploaded papers.\"`");
    }


    // This test validates: Fallback answer with zero chunks: `"I couldn't retrieve grounded source passages for that question.\n\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Fallback answer with chunks uses top 4 chunks as evidence lines each snippet tru', async ({ page }) => {
    // Checkpoint 11: Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters");
    }


    // This test validates: Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Coverage report unusedPapers array contains objects with id and title fields fil', async ({ page }) => {
    // Checkpoint 12: Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false");
    }


    // This test validates: Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Source metadata array entries include chunkId alongside sourceIndex paperId pape', async ({ page }) => {
    // Checkpoint 13: Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`");
    }


    // This test validates: Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Request body validated by Zod messages array max50 with no minimum unlike rag-ch', async ({ page }) => {
    // Checkpoint 14: Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)");
    }


    // This test validates: Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Authentication failure returns error Authentication required with status 401', async ({ page }) => {
    // Checkpoint 15: Authentication failure returns `{ error: "Authentication required." }` with status 401
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Authentication failure returns `{ error: \"Authentication required.\" }` with status 401",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Authentication failure returns `{ error: \"Authentication required.\" }` with status 401");
    }


    // This test validates: Authentication failure returns `{ error: "Authentication required." }` with status 401
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Rate-limited via checkRateLimituserId chat RATE_LIMITSai', async ({ page }) => {
    // Checkpoint 16: Rate-limited via `checkRateLimit(userId, "chat", RATE_LIMITS.ai)`
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Rate-limited via `checkRateLimit(userId, \"chat\", RATE_LIMITS.ai)`",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Rate-limited via `checkRateLimit(userId, \"chat\", RATE_LIMITS.ai)`");
    }


    // This test validates: Rate-limited via `checkRateLimit(userId, "chat", RATE_LIMITS.ai)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Validation failure returns error Invalid request Please check your input and try', async ({ page }) => {
    // Checkpoint 17: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Validation failure returns `{ error: \"Invalid request. Please check your input and try again.\" }` with status 400",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Validation failure returns `{ error: \"Invalid request. Please check your input and try again.\" }` with status 400");
    }


    // This test validates: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: AI not configured returns error AI service is not configured Please contact an a', async ({ page }) => {
    // Checkpoint 18: AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "AI not configured returns `{ error: \"AI service is not configured. Please contact an administrator.\" }` with status 503",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "AI not configured returns `{ error: \"AI service is not configured. Please contact an administrator.\" }` with status 503");
    }


    // This test validates: AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Mode learn in apichat triggers the Socratic guide system prompt via getGuideSyst', async ({ page }) => {
    // Checkpoint 19: Mode `"learn"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Mode `\"learn\"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Mode `\"learn\"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`");
    }


    // This test validates: Mode `"learn"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Mode notebook research mode falls through to the standard assistant prompt You a', async ({ page }) => {
    // Checkpoint 20: Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Mode `\"notebook\"` (research mode) falls through to the standard assistant prompt: `\"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.\"`",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Mode `\"notebook\"` (research mode) falls through to the standard assistant prompt: `\"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.\"`");
    }


    // This test validates: Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Server error returns error An unexpected error occurred Please try again with st', async ({ page }) => {
    // Checkpoint 21: Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500
    // Section: Quick Test Workflows > `/api/chat/route.ts` — General Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server error returns `{ error: \"An unexpected error occurred. Please try again.\" }` with status 500",
      section: "Quick Test Workflows",
      subsection: "`/api/chat/route.ts` — General Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Server error returns `{ error: \"An unexpected error occurred. Please try again.\" }` with status 500");
    }


    // This test validates: Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Max file size limit is 20MB 20 1024 1024 bytes', async ({ page }) => {
    // Checkpoint 22: Max file size limit is 20MB (`20 * 1024 * 1024` bytes)
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Max file size limit is 20MB (`20 * 1024 * 1024` bytes)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Max file size limit is 20MB (`20 * 1024 * 1024` bytes)");
    }


    // This test validates: Max file size limit is 20MB (`20 * 1024 * 1024` bytes)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Content-Type must include multipartform-data or returns 400 with error Content-T', async ({ page }) => {
    // Checkpoint 23: Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Content-Type must include `\"multipart/form-data\"` or returns 400 with `{ error: \"Content-Type must be multipart/form-data\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Content-Type must include `\"multipart/form-data\"` or returns 400 with `{ error: \"Content-Type must be multipart/form-data\" }`");
    }


    // This test validates: Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Missing file field returns 400 with error No PDF file provided Include a file fi', async ({ page }) => {
    // Checkpoint 24: Missing file field returns 400 with `{ error: "No PDF file provided. Include a 'file' field in the form data." }`
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Missing file field returns 400 with `{ error: \"No PDF file provided. Include a 'file' field in the form data.\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Missing file field returns 400 with `{ error: \"No PDF file provided. Include a 'file' field in the form data.\" }`");
    }


    // This test validates: Missing file field returns 400 with `{ error: "No PDF file provided. Include a 'file' field in the form data." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Non-PDF file returns 400 with error Uploaded file must be a PDF validated by MIM', async ({ page }) => {
    // Checkpoint 25: Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }` — validated by MIME type containing `"pdf"` OR filename ending `.pdf` case-insensitively
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Non-PDF file returns 400 with `{ error: \"Uploaded file must be a PDF\" }` — validated by MIME type containing `\"pdf\"` OR filename ending `.pdf` case-insensitively",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Non-PDF file returns 400 with `{ error: \"Uploaded file must be a PDF\" }` — validated by MIME type containing `\"pdf\"` OR filename ending `.pdf` case-insensitively");
    }


    // This test validates: Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }` — validated by MIME type containing `"pdf"` OR filename ending `.pdf` case-insensitively
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Oversized file returns 413 with error File size exceeds the 20MB limit Uploaded ', async ({ page }) => {
    // Checkpoint 26: Oversized file returns 413 with `{ error: "File size exceeds the 20MB limit. Uploaded file is X.XMB." }` showing actual size
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Oversized file returns 413 with `{ error: \"File size exceeds the 20MB limit. Uploaded file is X.XMB.\" }` showing actual size",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Oversized file returns 413 with `{ error: \"File size exceeds the 20MB limit. Uploaded file is X.XMB.\" }` showing actual size");
    }


    // This test validates: Oversized file returns 413 with `{ error: "File size exceeds the 20MB limit. Uploaded file is X.XMB." }` showing actual size
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Successful extraction returns text pages info title author where title and autho', async ({ page }) => {
    // Checkpoint 27: Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata");
    }


    // This test validates: Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Server error returns 500 with error Failed to extract text from PDF', async ({ page }) => {
    // Checkpoint 28: Server error returns 500 with `{ error: "Failed to extract text from PDF" }`
    // Section: Quick Test Workflows > `/api/extract-pdf/route.ts` — PDF Extraction API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server error returns 500 with `{ error: \"Failed to extract text from PDF\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf/route.ts` — PDF Extraction API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Server error returns 500 with `{ error: \"Failed to extract text from PDF\" }`");
    }


    // This test validates: Server error returns 500 with `{ error: "Failed to extract text from PDF" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Zod schema requires paperId to be znumberintpositive negative zero or non-intege', async ({ page }) => {
    // Checkpoint 29: Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected
    // Section: Quick Test Workflows > `/api/embed/route.ts` — Embed API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected",
      section: "Quick Test Workflows",
      subsection: "`/api/embed/route.ts` — Embed API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected");
    }


    // This test validates: Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Validation failure returns 400 with error Invalid input issues including Zod iss', async ({ page }) => {
    // Checkpoint 30: Validation failure returns 400 with `{ error: "Invalid input", issues: [...] }` including Zod issue details
    // Section: Quick Test Workflows > `/api/embed/route.ts` — Embed API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Validation failure returns 400 with `{ error: \"Invalid input\", issues: [...] }` including Zod issue details",
      section: "Quick Test Workflows",
      subsection: "`/api/embed/route.ts` — Embed API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Validation failure returns 400 with `{ error: \"Invalid input\", issues: [...] }` including Zod issue details");
    }


    // This test validates: Validation failure returns 400 with `{ error: "Invalid input", issues: [...] }` including Zod issue details
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Rate-limited via RATE_LIMITSembed a different rate limit tier than the RATE_LIMI', async ({ page }) => {
    // Checkpoint 31: Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat
    // Section: Quick Test Workflows > `/api/embed/route.ts` — Embed API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat",
      section: "Quick Test Workflows",
      subsection: "`/api/embed/route.ts` — Embed API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat");
    }


    // This test validates: Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Server error returns 500 with error Failed to embed paper', async ({ page }) => {
    // Checkpoint 32: Server error returns 500 with `{ error: "Failed to embed paper" }`
    // Section: Quick Test Workflows > `/api/embed/route.ts` — Embed API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server error returns 500 with `{ error: \"Failed to embed paper\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/embed/route.ts` — Embed API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Server error returns 500 with `{ error: \"Failed to embed paper\" }`");
    }


    // This test validates: Server error returns 500 with `{ error: "Failed to embed paper" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Supports batch extraction via paperIds array max 50 in addition to single paperI', async ({ page }) => {
    // Checkpoint 33: Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`
    // Section: Quick Test Workflows > `/api/extract-facts/route.ts` — Extract Facts API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-facts/route.ts` — Extract Facts API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`");
    }


    // This test validates: Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Missing paperId when no paperIds array provided returns 400 with error paperId n', async ({ page }) => {
    // Checkpoint 34: Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`
    // Section: Quick Test Workflows > `/api/extract-facts/route.ts` — Extract Facts API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-021');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: \"paperId (number) is required\" }`",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-facts/route.ts` — Extract Facts API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: \"paperId (number) is required\" }`");
    }


    // This test validates: Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`
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
