/**
 * Auto-generated Playwright test for feeds/spec-019
 * Source: e2e/specs/feeds/spec-019.md
 * Generated: 2026-03-14T14:54:08.811Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts feeds spec-019
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';












import { assertFeedsCheckpoint } from '../../module-assertions/feeds';







test.describe('feeds / spec-019', () => {
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

  test('cp-000: loadJournals failure is silent', async ({ page }) => {
    // Checkpoint 0: `loadJournals` failure is silent
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`loadJournals` failure is silent",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-000 `loadJournals` failure is silent');
    }


    // This test validates: `loadJournals` failure is silent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: setSelectedArticle also loads article note via loadArticleNotearticleId', async ({ page }) => {
    // Checkpoint 1: `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`setSelectedArticle` also loads article note via `loadArticleNote(articleId)`",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-001 `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`');
    }


    // This test validates: `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: clearCopilot sets copilotOpen false changing articles auto-closes copilot panel', async ({ page }) => {
    // Checkpoint 2: `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-002 `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel');
    }


    // This test validates: `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Chat history filters out system role messages before sending to API', async ({ page }) => {
    // Checkpoint 3: Chat history filters out `system` role messages before sending to API
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Chat history filters out `system` role messages before sending to API",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-003 Chat history filters out `system` role messages before sending to API');
    }


    // This test validates: Chat history filters out `system` role messages before sending to API
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Chat sends prior messages minus the just-added user message historyslice0 -1', async ({ page }) => {
    // Checkpoint 4: Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-004 Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`');
    }


    // This test validates: Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: sendCopilotMessage clears copilotSuggestions to when user sends any message', async ({ page }) => {
    // Checkpoint 5: `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-005 `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message');
    }


    // This test validates: `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Related-papers intent fallthrough if related fetch fails chat endpoint still fir', async ({ page }) => {
    // Checkpoint 6: Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-006 Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires');
    }


    // This test validates: Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: RELATED_PAPERS_INTENT regex brelated paperssimilar paperssimilar articlesmore li', async ({ page }) => {
    // Checkpoint 7: `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`RELATED_PAPERS_INTENT` regex: `/\\b(related papers|similar papers|similar articles|more like this|find related)\\b/i`",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-007 `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`');
    }


    // This test validates: `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: withRelatedSuggestion only appends Find related papers if no existing suggestion', async ({ page }) => {
    // Checkpoint 8: `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`withRelatedSuggestion()` only appends \"Find related papers\" if no existing suggestion matches the intent regex",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-008 `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex');
    }


    // This test validates: `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: formatRelatedPapersSummary with papers I found n related papers via sourceLabel', async ({ page }) => {
    // Checkpoint 9: `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`formatRelatedPapersSummary()` with papers: \"I found {n} related papers via {sourceLabel}.\"",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-009 `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."');
    }


    // This test validates: `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: formatRelatedPapersSummary without papers I couldnt find related papers for this', async ({ page }) => {
    // Checkpoint 10: `formatRelatedPapersSummary()` without papers: "I couldn't find related papers for this article. Try a broader topic search."
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`formatRelatedPapersSummary()` without papers: \"I couldn't find related papers for this article. Try a broader topic search.\"",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-010 `formatRelatedPapersSummary()` without papers: "I couldn\'t find related papers for this article. Try a broader topic search."');
    }


    // This test validates: `formatRelatedPapersSummary()` without papers: "I couldn't find related papers for this article. Try a broader topic search."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Source label map s2_recommendations Semantic Scholar recommendations s2_search S', async ({ page }) => {
    // Checkpoint 11: Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Source label map: `s2_recommendations` → \"Semantic Scholar recommendations\", `s2_search` → \"Semantic Scholar search\", else \"PubMed search\"",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-011 Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"');
    }


    // This test validates: Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: summarizeArticle sends full article metadata title authors abstractSnippet doi p', async ({ page }) => {
    // Checkpoint 12: `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-012 `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link');
    }


    // This test validates: `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: summarizeArticle error sets store error global banner not copilot-local', async ({ page }) => {
    // Checkpoint 13: `summarizeArticle` error sets store `error` (global banner, not copilot-local)
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`summarizeArticle` error sets store `error` (global banner, not copilot-local)",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-013 `summarizeArticle` error sets store `error` (global banner, not copilot-local)');
    }


    // This test validates: `summarizeArticle` error sets store `error` (global banner, not copilot-local)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Standard chat error sets store error global banner not copilot-local', async ({ page }) => {
    // Checkpoint 14: Standard chat error sets store `error` (global banner, not copilot-local)
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Standard chat error sets store `error` (global banner, not copilot-local)",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-014 Standard chat error sets store `error` (global banner, not copilot-local)');
    }


    // This test validates: Standard chat error sets store `error` (global banner, not copilot-local)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: findRelatedPapers failure does NOT set store error silent clear of loading state', async ({ page }) => {
    // Checkpoint 15: `findRelatedPapers` failure does NOT set store error (silent clear of loading state)
    // Section: Quick Test Workflows > Feed Store — Additional Details (feed-store.ts)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`findRelatedPapers` failure does NOT set store error (silent clear of loading state)",
      section: "Quick Test Workflows",
      subsection: "Feed Store — Additional Details (feed-store.ts)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-015 `findRelatedPapers` failure does NOT set store error (silent clear of loading state)');
    }


    // This test validates: `findRelatedPapers` failure does NOT set store error (silent clear of loading state)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: j does nothing when at last article currentIndex articleslength - 1', async ({ page }) => {
    // Checkpoint 16: `j` does nothing when at last article (`currentIndex >= articles.length - 1`)
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`j` does nothing when at last article (`currentIndex >= articles.length - 1`)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-016 `j` does nothing when at last article (`currentIndex >= articles.length - 1`)');
    }


    // This test validates: `j` does nothing when at last article (`currentIndex >= articles.length - 1`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: k does nothing when at first article currentIndex 0', async ({ page }) => {
    // Checkpoint 17: `k` does nothing when at first article (`currentIndex <= 0`)
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`k` does nothing when at first article (`currentIndex <= 0`)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-017 `k` does nothing when at first article (`currentIndex <= 0`)');
    }


    // This test validates: `k` does nothing when at first article (`currentIndex <= 0`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: o does nothing when selectedArticleId is falsy no article selected', async ({ page }) => {
    // Checkpoint 18: `o` does nothing when `selectedArticleId` is falsy (no article selected)
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`o` does nothing when `selectedArticleId` is falsy (no article selected)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-018 `o` does nothing when `selectedArticleId` is falsy (no article selected)');
    }


    // This test validates: `o` does nothing when `selectedArticleId` is falsy (no article selected)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: s accesses toggleStar via useFeedStoregetState not from destructured state', async ({ page }) => {
    // Checkpoint 19: `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-019 `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)');
    }


    // This test validates: `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: c does nothing if article not found in articles array for selectedArticleId', async ({ page }) => {
    // Checkpoint 20: `c` does nothing if article not found in `articles` array for `selectedArticleId`
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`c` does nothing if article not found in `articles` array for `selectedArticleId`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-020 `c` does nothing if article not found in `articles` array for `selectedArticleId`');
    }


    // This test validates: `c` does nothing if article not found in `articles` array for `selectedArticleId`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: a reads live copilotOpen state via useFeedStoregetState to toggle', async ({ page }) => {
    // Checkpoint 21: `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle
    // Section: Quick Test Workflows > Keyboard Shortcuts — Additional Edge Cases (page.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — Additional Edge Cases (page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-021 `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle');
    }


    // This test validates: `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Shared EmptyState wraps the icon in a w-16 h-16 rounded-2xl bg-surface-raised co', async ({ page }) => {
    // Checkpoint 22: Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px
    // Section: Quick Test Workflows > Shared UI Details

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px",
      section: "Quick Test Workflows",
      subsection: "Shared UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-022 Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px');
    }


    // This test validates: Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Feed muteunmute button starts hidden with opacity-0 and only becomes visible on ', async ({ page }) => {
    // Checkpoint 23: Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`
    // Section: Quick Test Workflows > Feed Sidebar

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`",
      section: "Quick Test Workflows",
      subsection: "Feed Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-023 Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`');
    }


    // This test validates: Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Magazine-view favicons hide broken images with onError currentTargetstyledisplay', async ({ page }) => {
    // Checkpoint 24: Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons
    // Section: Quick Test Workflows > Feed Sidebar

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = \"none\"}` just like sidebar and card-view favicons",
      section: "Quick Test Workflows",
      subsection: "Feed Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-024 Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons');
    }


    // This test validates: Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: unsubscribe removes the subscription from local state only after the DELETE requ', async ({ page }) => {
    // Checkpoint 25: `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic
    // Section: Quick Test Workflows > Feed Store

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic",
      section: "Quick Test Workflows",
      subsection: "Feed Store",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-025 `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic');
    }


    // This test validates: `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Closing Copilot through closeCopilot only sets copilotOpen false and preserves m', async ({ page }) => {
    // Checkpoint 26: Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article
    // Section: Quick Test Workflows > Feed Store

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article",
      section: "Quick Test Workflows",
      subsection: "Feed Store",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-026 Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article');
    }


    // This test validates: Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Re-selecting the same article id does not clear Copilot state because clearCopil', async ({ page }) => {
    // Checkpoint 27: Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`
    // Section: Quick Test Workflows > Feed Store

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-019');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`",
      section: "Quick Test Workflows",
      subsection: "Feed Store",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-027 Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`');
    }


    // This test validates: Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`
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
