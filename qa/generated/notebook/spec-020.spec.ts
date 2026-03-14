/**
 * Auto-generated Playwright test for notebook/spec-020
 * Source: e2e/specs/notebook/spec-020.md
 * Generated: 2026-03-14T10:50:57.438Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-020
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-020', () => {
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

  test('cp-000: File rows without paperId are forced to selected false when stored paper_ids are', async ({ page }) => {
    // Checkpoint 0: File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored
    // Section: Quick Test Workflows > Conversation History Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored",
      section: "Quick Test Workflows",
      subsection: "Conversation History Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored");
    }


    // This test validates: File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Conversation-mode restoration uses strict learn-mode detection convomode learn m', async ({ page }) => {
    // Checkpoint 1: Conversation-mode restoration uses strict learn-mode detection: `convo.mode === "learn"` maps to learn, everything else maps to research
    // Section: Quick Test Workflows > Conversation History Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Conversation-mode restoration uses strict learn-mode detection: `convo.mode === \"learn\"` maps to learn, everything else maps to research",
      section: "Quick Test Workflows",
      subsection: "Conversation History Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "Conversation-mode restoration uses strict learn-mode detection: `convo.mode === \"learn\"` maps to learn, everything else maps to research");
    }


    // This test validates: Conversation-mode restoration uses strict learn-mode detection: `convo.mode === "learn"` maps to learn, everything else maps to research
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Loading an existing conversation closes the history dropdown via setShowHistoryf', async ({ page }) => {
    // Checkpoint 2: Loading an existing conversation closes the history dropdown via `setShowHistory(false)`
    // Section: Quick Test Workflows > Conversation History Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Loading an existing conversation closes the history dropdown via `setShowHistory(false)`",
      section: "Quick Test Workflows",
      subsection: "Conversation History Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Loading an existing conversation closes the history dropdown via `setShowHistory(false)`");
    }


    // This test validates: Loading an existing conversation closes the history dropdown via `setShowHistory(false)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Server-side follow-up generation returns immediately when responseTextlength 100', async ({ page }) => {
    // Checkpoint 3: Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`");
    }


    // This test validates: Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Client-side follow-up generation also gates on assistantMsgcontenttrimlength 100', async ({ page }) => {
    // Checkpoint 4: Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`");
    }


    // This test validates: Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Sending a new message increments suggestionRequestIdRefcurrent before any networ', async ({ page }) => {
    // Checkpoint 5: Sending a new message increments `suggestionRequestIdRef.current` before any network work starts
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Sending a new message increments `suggestionRequestIdRef.current` before any network work starts",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Sending a new message increments `suggestionRequestIdRef.current` before any network work starts");
    }


    // This test validates: Sending a new message increments `suggestionRequestIdRef.current` before any network work starts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Suggestion generation records the owning assistant message with setSuggestionsFo', async ({ page }) => {
    // Checkpoint 6: Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`");
    }


    // This test validates: Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: then catch and finally all reject stale suggestion results by comparing against ', async ({ page }) => {
    // Checkpoint 7: `.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "`.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`");
    }


    // This test validates: `.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Follow-up chips render only when msgid suggestionsForMessageId the message is th', async ({ page }) => {
    // Checkpoint 8: Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`");
    }


    // This test validates: Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Learn-mode follow-up chips use amber classes while research-mode chips use neutr', async ({ page }) => {
    // Checkpoint 9: Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes");
    }


    // This test validates: Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Previous follow-up requests are not actually aborted stale completions are ignor', async ({ page }) => {
    // Checkpoint 10: Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`
    // Section: Quick Test Workflows > Follow-Up Suggestion Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`",
      section: "Quick Test Workflows",
      subsection: "Follow-Up Suggestion Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`");
    }


    // This test validates: Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: The main message list uses rolelog with aria-livepolite and aria-labelChat messa', async ({ page }) => {
    // Checkpoint 11: The main message list uses `role="log"` with `aria-live="polite"` and `aria-label="Chat messages"`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "The main message list uses `role=\"log\"` with `aria-live=\"polite\"` and `aria-label=\"Chat messages\"`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "The main message list uses `role=\"log\"` with `aria-live=\"polite\"` and `aria-label=\"Chat messages\"`");
    }


    // This test validates: The main message list uses `role="log"` with `aria-live="polite"` and `aria-label="Chat messages"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Interactive citation pills render a FilePdf icon with size10 and weightbold', async ({ page }) => {
    // Checkpoint 12: Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight="bold"`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight=\"bold\"`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight=\"bold\"`");
    }


    // This test validates: Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight="bold"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Citation short-title logic prefers text before the first colon only when that co', async ({ page }) => {
    // Checkpoint 13: Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters");
    }


    // This test validates: Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Colon-less long titles are shortened to 28 characters plus the single-character ', async ({ page }) => {
    // Checkpoint 14: Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`");
    }


    // This test validates: Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Copy-to-clipboard removes bracketed citation markers with dg and collapses repea', async ({ page }) => {
    // Checkpoint 15: Copy-to-clipboard removes bracketed citation markers with `/\\[\\d+\\]/g` and collapses repeated spaces with `/\\s{2,}/g`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Copy-to-clipboard removes bracketed citation markers with `/\\\\[\\\\d+\\\\]/g` and collapses repeated spaces with `/\\\\s{2,}/g`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "Copy-to-clipboard removes bracketed citation markers with `/\\\\[\\\\d+\\\\]/g` and collapses repeated spaces with `/\\\\s{2,}/g`");
    }


    // This test validates: Copy-to-clipboard removes bracketed citation markers with `/\\[\\d+\\]/g` and collapses repeated spaces with `/\\s{2,}/g`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Copy success resets copiedMessageId after exactly 2000ms', async ({ page }) => {
    // Checkpoint 16: Copy success resets `copiedMessageId` after exactly `2000ms`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Copy success resets `copiedMessageId` after exactly `2000ms`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Copy success resets `copiedMessageId` after exactly `2000ms`");
    }


    // This test validates: Copy success resets `copiedMessageId` after exactly `2000ms`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Re-clicking an already selected feedback thumb toggles that rating back off by s', async ({ page }) => {
    // Checkpoint 17: Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`");
    }


    // This test validates: Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Helpful feedback uses green styling plus weightfill on ThumbsUp', async ({ page }) => {
    // Checkpoint 18: Helpful feedback uses green styling plus `weight="fill"` on `ThumbsUp`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Helpful feedback uses green styling plus `weight=\"fill\"` on `ThumbsUp`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Helpful feedback uses green styling plus `weight=\"fill\"` on `ThumbsUp`");
    }


    // This test validates: Helpful feedback uses green styling plus `weight="fill"` on `ThumbsUp`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Unhelpful feedback uses red styling plus weightfill on ThumbsDown', async ({ page }) => {
    // Checkpoint 19: Unhelpful feedback uses red styling plus `weight="fill"` on `ThumbsDown`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Unhelpful feedback uses red styling plus `weight=\"fill\"` on `ThumbsDown`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Unhelpful feedback uses red styling plus `weight=\"fill\"` on `ThumbsDown`");
    }


    // This test validates: Unhelpful feedback uses red styling plus `weight="fill"` on `ThumbsDown`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Feedback persistence runs only when parseIntmessageIdreplacemsg_ 10 yields a num', async ({ page }) => {
    // Checkpoint 20: Feedback persistence runs only when `parseInt(messageId.replace("msg_", ""), 10)` yields a numeric id greater than `0`
    // Section: Quick Test Workflows > Chat Message Rendering Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Feedback persistence runs only when `parseInt(messageId.replace(\"msg_\", \"\"), 10)` yields a numeric id greater than `0`",
      section: "Quick Test Workflows",
      subsection: "Chat Message Rendering Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "Feedback persistence runs only when `parseInt(messageId.replace(\"msg_\", \"\"), 10)` yields a numeric id greater than `0`");
    }


    // This test validates: Feedback persistence runs only when `parseInt(messageId.replace("msg_", ""), 10)` yields a numeric id greater than `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: ExtractionCard does not return null when no fields are truthy it renders the mut', async ({ page }) => {
    // Checkpoint 21: ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`");
    }


    // This test validates: ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Extraction header text is exactly Structured Extraction', async ({ page }) => {
    // Checkpoint 22: Extraction header text is exactly `Structured Extraction`
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Extraction header text is exactly `Structured Extraction`",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Extraction header text is exactly `Structured Extraction`");
    }


    // This test validates: Extraction header text is exactly `Structured Extraction`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Human-verified extractions show a green ShieldCheck badge labeled Verified', async ({ page }) => {
    // Checkpoint 23: Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`");
    }


    // This test validates: Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Unverified extractions show a Verify button instead of a badge', async ({ page }) => {
    // Checkpoint 24: Unverified extractions show a `Verify` button instead of a badge
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Unverified extractions show a `Verify` button instead of a badge",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Unverified extractions show a `Verify` button instead of a badge");
    }


    // This test validates: Unverified extractions show a `Verify` button instead of a badge
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Evidence level rows render as Level extractionevidence_level when an evidence le', async ({ page }) => {
    // Checkpoint 25: Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists");
    }


    // This test validates: Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: custom_extractionskey_findings and custom_extractionslimitations each render in ', async ({ page }) => {
    // Checkpoint 26: `custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "`custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section");
    }


    // This test validates: `custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: While a paper is being extracted the file-row action slot shows only a spinning ', async ({ page }) => {
    // Checkpoint 27: While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button
    // Section: Quick Test Workflows > Extraction Card Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button",
      section: "Quick Test Workflows",
      subsection: "Extraction Card Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button");
    }


    // This test validates: While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Section 14 says previous follow-up suggestion requests are cancelled the live no', async ({ page }) => {
    // Checkpoint 28: Section 14 says previous follow-up suggestion requests are "cancelled" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Section 14 says previous follow-up suggestion requests are \"cancelled\" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "Section 14 says previous follow-up suggestion requests are \"cancelled\" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`");
    }


    // This test validates: Section 14 says previous follow-up suggestion requests are "cancelled" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Section 25 claims the close controls include aria-labelClose audio overview the ', async ({ page }) => {
    // Checkpoint 29: Section 25 claims the close controls include `aria-label="Close audio overview"` — the audio panel close button currently has `title="Close audio overview"` but no `aria-label`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Section 25 claims the close controls include `aria-label=\"Close audio overview\"` — the audio panel close button currently has `title=\"Close audio overview\"` but no `aria-label`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Section 25 claims the close controls include `aria-label=\"Close audio overview\"` — the audio panel close button currently has `title=\"Close audio overview\"` but no `aria-label`");
    }


    // This test validates: Section 25 claims the close controls include `aria-label="Close audio overview"` — the audio panel close button currently has `title="Close audio overview"` but no `aria-label`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: The file picker accepts pdf txt and md but handleFileUpload routes every uploade', async ({ page }) => {
    // Checkpoint 30: The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`");
    }


    // This test validates: The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: None every file under srccomponentsnotebook is imported by notebook sharenoteboo', async ({ page }) => {
    // Checkpoint 31: None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component");
    }


    // This test validates: None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Request body validated by Zod messages array min1 max50 each with role enum user', async ({ page }) => {
    // Checkpoint 32: Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `["user","assistant","system"]` and `content` string max(50000)
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `[\"user\",\"assistant\",\"system\"]` and `content` string max(50000)",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `[\"user\",\"assistant\",\"system\"]` and `content` string max(50000)");
    }


    // This test validates: Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `["user","assistant","system"]` and `content` string max(50000)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: paperIds validated as optional array of numbers max50 mode optional string ragCo', async ({ page }) => {
    // Checkpoint 33: `paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record",
      section: "Quick Test Workflows",
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "`paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record");
    }


    // This test validates: `paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Authentication failure returns error Authentication required with status 401', async ({ page }) => {
    // Checkpoint 34: Authentication failure returns `{ error: "Authentication required." }` with status 401
    // Section: Quick Test Workflows > `/api/rag-chat/route.ts` — RAG Chat API Internals

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-020');
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
      subsection: "`/api/rag-chat/route.ts` — RAG Chat API Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "Authentication failure returns `{ error: \"Authentication required.\" }` with status 401");
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
});
