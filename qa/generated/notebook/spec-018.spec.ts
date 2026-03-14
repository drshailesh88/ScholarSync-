/**
 * Auto-generated Playwright test for notebook/spec-018
 * Source: e2e/specs/notebook/spec-018.md
 * Generated: 2026-03-14T10:50:56.079Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-018
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-018', () => {
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

  test('cp-000: URL temp ids use the exact format url_Datenow', async ({ page }) => {
    // Checkpoint 0: URL temp ids use the exact format `url_${Date.now()}`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "URL temp ids use the exact format `url_${Date.now()}`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "URL temp ids use the exact format `url_${Date.now()}`");
    }


    // This test validates: URL temp ids use the exact format `url_${Date.now()}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Each optimistic URL row starts with name url size URL selected true status proce', async ({ page }) => {
    // Checkpoint 1: Each optimistic URL row starts with `name: url`, `size: "URL"`, `selected: true`, `status: "processing"`, and `originalUrl: url`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Each optimistic URL row starts with `name: url`, `size: \"URL\"`, `selected: true`, `status: \"processing\"`, and `originalUrl: url`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Each optimistic URL row starts with `name: url`, `size: \"URL\"`, `selected: true`, `status: \"processing\"`, and `originalUrl: url`");
    }


    // This test validates: Each optimistic URL row starts with `name: url`, `size: "URL"`, `selected: true`, `status: "processing"`, and `originalUrl: url`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: URL submission clears urlValue and hides the composer with setShowUrlInputfalse ', async ({ page }) => {
    // Checkpoint 2: URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`");
    }


    // This test validates: URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Successful URL ingestion rewrites the temp row with name resulttitle size result', async ({ page }) => {
    // Checkpoint 3: Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \`${result.wordCount.toLocaleString()} words\``, `paperId: result.paperId`, and `status: result.status`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \\`${result.wordCount.toLocaleString()} words\\``, `paperId: result.paperId`, and `status: result.status`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \\`${result.wordCount.toLocaleString()} words\\``, `paperId: result.paperId`, and `status: result.status`");
    }


    // This test validates: Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \`${result.wordCount.toLocaleString()} words\``, `paperId: result.paperId`, and `status: result.status`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: URL-ingest failures keep the original URL as the row name and set the subtitle t', async ({ page }) => {
    // Checkpoint 4: URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`");
    }


    // This test validates: URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Ready URL rows prepend a parsed hostname only when getHostnameLabelfileoriginalU', async ({ page }) => {
    // Checkpoint 5: Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds");
    }


    // This test validates: Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: getHostnameLabel strips a leading www from parsed hosts and returns null when ne', async ({ page }) => {
    // Checkpoint 6: `getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws
    // Section: Quick Test Workflows > Upload and URL Ingestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws",
      section: "Quick Test Workflows",
      subsection: "Upload and URL Ingestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "`getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws");
    }


    // This test validates: `getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Chat routing switches to apirag-chat only when selectedPaperIdslength 0 otherwis', async ({ page }) => {
    // Checkpoint 7: Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`");
    }


    // This test validates: Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Notebook chat request bodies always include messages and mode and include paperI', async ({ page }) => {
    // Checkpoint 8: Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists");
    }


    // This test validates: Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Outbound notebook requests use a request-level AbortController that aborts after', async ({ page }) => {
    // Checkpoint 9: Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`");
    }


    // This test validates: Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Non-OK chat responses append an assistant error message with the exact text Unab', async ({ page }) => {
    // Checkpoint 10: Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`");
    }


    // This test validates: Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: X-RAG-Sources header parsing uses JSONparse inside a trycatch parse failures are', async ({ page }) => {
    // Checkpoint 11: `X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "`X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored");
    }


    // This test validates: `X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Parsed X-RAG-Sources data is copied into currentSources and the cited-sources pa', async ({ page }) => {
    // Checkpoint 12: Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`");
    }


    // This test validates: Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: X-RAG-Coverage header parsing also uses JSONparse inside a trycatch malformed JS', async ({ page }) => {
    // Checkpoint 13: `X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "`X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error");
    }


    // This test validates: `X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: When X-RAG-Coverage is absent the notebook explicitly clears coverage state with', async ({ page }) => {
    // Checkpoint 14: When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`");
    }


    // This test validates: When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Streaming starts only when resbodygetReader returns a reader a missing body exit', async ({ page }) => {
    // Checkpoint 15: Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`");
    }


    // This test validates: Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Each stream read races readerread against a second 30_000ms timeout that rejects', async ({ page }) => {
    // Checkpoint 16: Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error("Stream timeout")`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error(\"Stream timeout\")`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error(\"Stream timeout\")`");
    }


    // This test validates: Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error("Stream timeout")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: The per-read timeout clears its internal timer in both the read success and read', async ({ page }) => {
    // Checkpoint 17: The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`");
    }


    // This test validates: The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Timeout detection treats both AbortError and ErrorStream timeout as timeout-clas', async ({ page }) => {
    // Checkpoint 18: Timeout detection treats both `AbortError` and `Error("Stream timeout")` as timeout-class failures
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Timeout detection treats both `AbortError` and `Error(\"Stream timeout\")` as timeout-class failures",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Timeout detection treats both `AbortError` and `Error(\"Stream timeout\")` as timeout-class failures");
    }


    // This test validates: Timeout detection treats both `AbortError` and `Error("Stream timeout")` as timeout-class failures
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Timeout failures append The response timed out Please try again or ask a simpler', async ({ page }) => {
    // Checkpoint 19: Timeout failures append `The response timed out. Please try again or ask a simpler question.`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Timeout failures append `The response timed out. Please try again or ask a simpler question.`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Timeout failures append `The response timed out. Please try again or ask a simpler question.`");
    }


    // This test validates: Timeout failures append `The response timed out. Please try again or ask a simpler question.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Non-timeout failures append Something went wrong Please try again', async ({ page }) => {
    // Checkpoint 20: Non-timeout failures append `Something went wrong. Please try again.`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Non-timeout failures append `Something went wrong. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Non-timeout failures append `Something went wrong. Please try again.`");
    }


    // This test validates: Non-timeout failures append `Something went wrong. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Error cleanup cancels the active reader with await readercancelcatch', async ({ page }) => {
    // Checkpoint 21: Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`
    // Section: Quick Test Workflows > RAG Chat Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`",
      section: "Quick Test Workflows",
      subsection: "RAG Chat Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`");
    }


    // This test validates: Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Opening the Source Notes drawer sets animateIn on a zero-delay windowsetTimeout ', async ({ page }) => {
    // Checkpoint 22: Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`");
    }


    // This test validates: Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Source Notes stores the prior documentbodystyleoverflow value and restores it on', async ({ page }) => {
    // Checkpoint 23: Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = "hidden"`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = \"hidden\"`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = \"hidden\"`");
    }


    // This test validates: Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = "hidden"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Source Notes fetches notes only for rows where filepaperId exists and filestatus', async ({ page }) => {
    // Checkpoint 24: Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === "ready"`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === \"ready\"`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === \"ready\"`");
    }


    // This test validates: Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === "ready"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: When no ready paper ids exist Source Notes resets to paperNotes loading false an', async ({ page }) => {
    // Checkpoint 25: When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`");
    }


    // This test validates: When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Batch-note load failures show the exact panel-level error Failed to load paper n', async ({ page }) => {
    // Checkpoint 26: Batch-note load failures show the exact panel-level error `Failed to load paper notes.`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Batch-note load failures show the exact panel-level error `Failed to load paper notes.`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Batch-note load failures show the exact panel-level error `Failed to load paper notes.`");
    }


    // This test validates: Batch-note load failures show the exact panel-level error `Failed to load paper notes.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Escape-to-close is implemented with a documentaddEventListenerkeydown listener t', async ({ page }) => {
    // Checkpoint 27: Escape-to-close is implemented with a `document.addEventListener("keydown", ...)` listener that is removed on cleanup
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Escape-to-close is implemented with a `document.addEventListener(\"keydown\", ...)` listener that is removed on cleanup",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Escape-to-close is implemented with a `document.addEventListener(\"keydown\", ...)` listener that is removed on cleanup");
    }


    // This test validates: Escape-to-close is implemented with a `document.addEventListener("keydown", ...)` listener that is removed on cleanup
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Generate All targets only paperNotesfilternote noteoverview rather than regenera', async ({ page }) => {
    // Checkpoint 28: `Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "`Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers");
    }


    // This test validates: `Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Generate All processes missing overviews in sequential batches of exactly 3', async ({ page }) => {
    // Checkpoint 29: `Generate All` processes missing overviews in sequential batches of exactly `3`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`Generate All` processes missing overviews in sequential batches of exactly `3`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "`Generate All` processes missing overviews in sequential batches of exactly `3`");
    }


    // This test validates: `Generate All` processes missing overviews in sequential batches of exactly `3`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Each batch runs Promiseallbatchmapnote handleGeneratenotepaperId before moving t', async ({ page }) => {
    // Checkpoint 30: Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch");
    }


    // This test validates: Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Paper-note cards are sorted selected-first by mapping selected papers to sort we', async ({ page }) => {
    // Checkpoint 31: Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`");
    }


    // This test validates: Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Clicking a suggested Ask about this paper question calls onSendMessagequestion a', async ({ page }) => {
    // Checkpoint 32: Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer");
    }


    // This test validates: Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Per-paper note-generation failures render inline red text using generationErrors', async ({ page }) => {
    // Checkpoint 33: Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`
    // Section: Quick Test Workflows > Source Notes Panel Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`");
    }


    // This test validates: Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Audio overview auto-generation is guarded by hasTriggeredRef so automatic genera', async ({ page }) => {
    // Checkpoint 34: Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change
    // Section: Quick Test Workflows > Audio Overview Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-018');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change");
    }


    // This test validates: Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change
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
