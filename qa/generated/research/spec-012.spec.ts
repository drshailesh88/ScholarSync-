/**
 * Auto-generated Playwright test for research/spec-012
 * Source: e2e/specs/research/spec-012.md
 * Generated: 2026-03-14T08:50:11.196Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-012', () => {
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

  test('cp-000: getRecentSearches serializes searchedAt as an ISO string and falls back to when ', async ({ page }) => {
    // Checkpoint 0: `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `\"\"` when no timestamp is present",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present');
    }


    // This test validates: `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: getUserPaperscollection returns paper metadata plus refId isFavorite collection ', async ({ page }) => {
    // Checkpoint 1: `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`');
    }


    // This test validates: `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: savePaper de-duplicates in this order DOI PMID Semantic Scholar ID then normaliz', async ({ page }) => {
    // Checkpoint 2: `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year');
    }


    // This test validates: `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: savePaper only enriches an existing paper with missing metadata fields or higher', async ({ page }) => {
    // Checkpoint 3: `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values');
    }


    // This test validates: `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: New-paper inserts default authors to when the caller omits them', async ({ page }) => {
    // Checkpoint 4: New-paper inserts default `authors` to `[]` when the caller omits them
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "New-paper inserts default `authors` to `[]` when the caller omits them",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 New-paper inserts default `authors` to `[]` when the caller omits them');
    }


    // This test validates: New-paper inserts default `authors` to `[]` when the caller omits them
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: New-paper inserts copy open_access_url into pdf_url', async ({ page }) => {
    // Checkpoint 5: New-paper inserts copy `open_access_url` into `pdf_url`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "New-paper inserts copy `open_access_url` into `pdf_url`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 New-paper inserts copy `open_access_url` into `pdf_url`');
    }


    // This test validates: New-paper inserts copy `open_access_url` into `pdf_url`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: savePaper creates the user-reference row in collection All Papers with isFavorit', async ({ page }) => {
    // Checkpoint 6: `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` creates the user-reference row in collection `\"All Papers\"` with `isFavorite: false`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`');
    }


    // This test validates: `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: User-reference creation uses onConflictDoNothing so duplicate saves do not throw', async ({ page }) => {
    // Checkpoint 7: User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library');
    }


    // This test validates: User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: savePaper always calls revalidatePathlibrary after the user-reference insert pat', async ({ page }) => {
    // Checkpoint 8: `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` always calls `revalidatePath(\"/library\")` after the user-reference insert path",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path');
    }


    // This test validates: `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: savePaper only queues chunkingembedding work when the saved paper has an abstrac', async ({ page }) => {
    // Checkpoint 9: `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR');
    }


    // This test validates: `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: savePaper only queues PDF processing when the saved paper has a DOI or open_acce', async ({ page }) => {
    // Checkpoint 10: `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`');
    }


    // This test validates: `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: handleSaveresult chooses the outgoing source field as pubmed first semantic_scho', async ({ page }) => {
    // Checkpoint 11: `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` chooses the outgoing `source` field as `\"pubmed\"` first, `\"semantic_scholar\"` second, and `\"openalex\"` otherwise based on `result.sources`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`');
    }


    // This test validates: `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: handleSaveresult forwards open_access_url resultopenAccessPdfUrl undefined to th', async ({ page }) => {
    // Checkpoint 12: `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action');
    }


    // This test validates: `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Save Cite writes only citation metadata into scholarsync_pending_citation it doe', async ({ page }) => {
    // Checkpoint 13: `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`');
    }


    // This test validates: `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: When resultdoi or resultpmid is undefined JSONstringify omits that key from the ', async ({ page }) => {
    // Checkpoint 14: When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload');
    }


    // This test validates: When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Result author rows still render an empty p when authors is empty', async ({ page }) => {
    // Checkpoint 15: Result author rows still render an empty `<p>` when `authors[]` is empty
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result author rows still render an empty `<p>` when `authors[]` is empty",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 Result author rows still render an empty `<p>` when `authors[]` is empty');
    }


    // This test validates: Result author rows still render an empty `<p>` when `authors[]` is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Result metadata rows still render the separator format journal year even when jo', async ({ page }) => {
    // Checkpoint 16: Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`');
    }


    // This test validates: Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Result citation text is omitted when citationCount is 0 because the render branc', async ({ page }) => {
    // Checkpoint 17: Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability');
    }


    // This test validates: Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Result cards omit the abstract block completely when abstract is falsy', async ({ page }) => {
    // Checkpoint 18: Result cards omit the abstract block completely when `abstract` is falsy
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result cards omit the abstract block completely when `abstract` is falsy",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 Result cards omit the abstract block completely when `abstract` is falsy');
    }


    // This test validates: Result cards omit the abstract block completely when `abstract` is falsy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Result cards omit the TLDR block completely when tldr is falsy', async ({ page }) => {
    // Checkpoint 19: Result cards omit the TL;DR block completely when `tldr` is falsy
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result cards omit the TL;DR block completely when `tldr` is falsy",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 Result cards omit the TL;DR block completely when `tldr` is falsy');
    }


    // This test validates: Result cards omit the TL;DR block completely when `tldr` is falsy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Result cards omit the DOI metadata link completely when doi is falsy', async ({ page }) => {
    // Checkpoint 20: Result cards omit the DOI metadata link completely when `doi` is falsy
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result cards omit the DOI metadata link completely when `doi` is falsy",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 Result cards omit the DOI metadata link completely when `doi` is falsy');
    }


    // This test validates: Result cards omit the DOI metadata link completely when `doi` is falsy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Result cards omit the Similar button completely when s2Id is falsy', async ({ page }) => {
    // Checkpoint 21: Result cards omit the Similar button completely when `s2Id` is falsy
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result cards omit the Similar button completely when `s2Id` is falsy",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Result cards omit the Similar button completely when `s2Id` is falsy');
    }


    // This test validates: Result cards omit the Similar button completely when `s2Id` is falsy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Similar-result save buttons do not have a disabled visual state even when handle', async ({ page }) => {
    // Checkpoint 22: Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving');
    }


    // This test validates: Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Similar-result cards omit authors DOI abstract TLDR evidence badges open-access ', async ({ page }) => {
    // Checkpoint 23: Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper
    // Section: Quick Test Workflows > Save, Cite, History, And Result Edge Cases

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper",
      section: "Quick Test Workflows",
      subsection: "Save, Cite, History, And Result Edge Cases",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper');
    }


    // This test validates: Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: The live research route does not render a before-search empty-state string like ', async ({ page }) => {
    // Checkpoint 24: The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper');
    }


    // This test validates: The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: The live research route does not disable the main Search button when the query i', async ({ page }) => {
    // Checkpoint 25: The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true');
    }


    // This test validates: The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: The live research route does not support ShiftEnter multiline query entry becaus', async ({ page }) => {
    // Checkpoint 26: The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`');
    }


    // This test validates: The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: The live research route does not apply explicit min or max attributes to the Fro', async ({ page }) => {
    // Checkpoint 27: The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs');
    }


    // This test validates: The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: The live copilot sidebar does not auto-scroll to the newest message in the curre', async ({ page }) => {
    // Checkpoint 28: The live copilot sidebar does not auto-scroll to the newest message in the current implementation
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live copilot sidebar does not auto-scroll to the newest message in the current implementation",
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
      throw new Error('Unhandled research checkpoint: cp-028 The live copilot sidebar does not auto-scroll to the newest message in the current implementation');
    }


    // This test validates: The live copilot sidebar does not auto-scroll to the newest message in the current implementation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: The live copilot request path does not send current search results filters or sa', async ({ page }) => {
    // Checkpoint 29: The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page",
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
      throw new Error('Unhandled research checkpoint: cp-029 The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page');
    }


    // This test validates: The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: The live AI synthesis panel does not show an inline failure banner or retry butt', async ({ page }) => {
    // Checkpoint 30: The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear",
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
      throw new Error('Unhandled research checkpoint: cp-030 The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear');
    }


    // This test validates: The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: The live augmented-query disclosure labels the Semantic Scholar variant as S2 no', async ({ page }) => {
    // Checkpoint 31: The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`');
    }


    // This test validates: The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: srccomponentsresearchSearchInputtsx exists in the codebase but is not imported b', async ({ page }) => {
    // Checkpoint 32: `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: srccomponentsresearchResultsTabletsx exists in the codebase but is not imported ', async ({ page }) => {
    // Checkpoint 33: `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: srccomponentsresearchResultRowtsx exists in the codebase but is not imported by ', async ({ page }) => {
    // Checkpoint 34: `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`');
    }


    // This test validates: `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
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
