/**
 * Auto-generated Playwright test for research/spec-014
 * Source: e2e/specs/research/spec-014.md
 * Generated: 2026-03-14T08:07:29.174Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-014
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-014', () => {
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

  test('cp-000: Recent search result-count suffix is formatted with toLocaleString so numbers in', async ({ page }) => {
    // Checkpoint 0: Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators
    // Section: Quick Test Workflows > Empty-State UI Details

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators",
      section: "Quick Test Workflows",
      subsection: "Empty-State UI Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators');
    }


    // This test validates: Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Last 5 Years filter dynamically computes yearStart as new DategetFullYear - 5 it', async ({ page }) => {
    // Checkpoint 1: `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year');
    }


    // This test validates: `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Filtersort auto-re-search useEffect dependency array is exactly filters sort cha', async ({ page }) => {
    // Checkpoint 2: Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search');
    }


    // This test validates: Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: When the API returns a non-OK status and no JSON error body can be parsed the er', async ({ page }) => {
    // Checkpoint 3: When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`');
    }


    // This test validates: When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: The fallback Search failed Please try again only appears for non-Error exception', async ({ page }) => {
    // Checkpoint 4: The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)');
    }


    // This test validates: The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: highImpact filter overrides sort in the URL by calling paramssetsort citations a', async ({ page }) => {
    // Checkpoint 5: `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`highImpact` filter overrides `sort` in the URL by calling `params.set(\"sort\", \"citations\")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option');
    }


    // This test validates: `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: buildSearchUrl includes perPage as perPagetoString always 20 in every search req', async ({ page }) => {
    // Checkpoint 6: `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`buildSearchUrl` includes `perPage` as `perPage.toString()` (always `\"20\"`) in every search request URL",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL');
    }


    // This test validates: `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: handleSearch clears aiSummary to null before each new search forcing the AISynth', async ({ page }) => {
    // Checkpoint 7: `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun');
    }


    // This test validates: `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: The search-history saveSearchQuery call uses catch so history-save failures are ', async ({ page }) => {
    // Checkpoint 8: The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking
    // Section: Quick Test Workflows > Search Mechanics

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking",
      section: "Quick Test Workflows",
      subsection: "Search Mechanics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking');
    }


    // This test validates: The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: DOI link in the metadata row calls estopPropagation on click to prevent triggeri', async ({ page }) => {
    // Checkpoint 9: DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers');
    }


    // This test validates: DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Result card wrapper includes idpaper-result-idx as a DOM id for scroll-to target', async ({ page }) => {
    // Checkpoint 10: Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result card wrapper includes `id=\"paper-result-{idx}\"` as a DOM id for scroll-to targeting from synthesis citations",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations');
    }


    // This test validates: Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Result card wrapper has transition-box-shadow duration-500 enabling smooth 500ms', async ({ page }) => {
    // Checkpoint 11: Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it');
    }


    // This test validates: Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Result card React key attribute is identityKey-idx the array index is appended f', async ({ page }) => {
    // Checkpoint 12: Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist');
    }


    // This test validates: Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: When citationCount is exactly 0 the N citations suffix is omitted because the re', async ({ page }) => {
    // Checkpoint 13: When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "When `citationCount` is exactly `0`, the \" · N citations\" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)');
    }


    // This test validates: When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Saving state button uses cursor-wait class to show the wait cursor while a save ', async ({ page }) => {
    // Checkpoint 14: Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress');
    }


    // This test validates: Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Similar-paper lookup key uses rs2Id rdoi rtitle which differs from the save key ', async ({ page }) => {
    // Checkpoint 15: Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`');
    }


    // This test validates: Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Similar-paper section header reads Similar Papers in text-10px text-ink-muted up', async ({ page }) => {
    // Checkpoint 16: Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`');
    }


    // This test validates: Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Result author row renders rauthorsslice0 3join if the original authors array is ', async ({ page }) => {
    // Checkpoint 17: Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders
    // Section: Quick Test Workflows > Result Card Rendering

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Result author row renders `r.authors.slice(0, 3).join(\", \")` — if the original `authors` array is empty, an empty `<p>` element still renders",
      section: "Quick Test Workflows",
      subsection: "Result Card Rendering",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders');
    }


    // This test validates: Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Copilot sidebar is rendered as an aside HTML element not a div', async ({ page }) => {
    // Checkpoint 18: Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`');
    }


    // This test validates: Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Copilot sidebar width is exactly w-96 384px 24rem', async ({ page }) => {
    // Checkpoint 19: Copilot sidebar width is exactly `w-96` (384px / 24rem)
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot sidebar width is exactly `w-96` (384px / 24rem)",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 Copilot sidebar width is exactly `w-96` (384px / 24rem)');
    }


    // This test validates: Copilot sidebar width is exactly `w-96` (384px / 24rem)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Copilot sidebar close button uses the X icon from Phosphor Icons size 16', async ({ page }) => {
    // Checkpoint 20: Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)');
    }


    // This test validates: Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Copilot send button uses the PaperPlaneTilt icon from Phosphor Icons size 16', async ({ page }) => {
    // Checkpoint 21: Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)');
    }


    // This test validates: Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: User chat messages are styled with bg-brand10 text-ink ml-8 indented from left', async ({ page }) => {
    // Checkpoint 22: User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)');
    }


    // This test validates: User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Assistant chat messages are styled with bg-surface-raised text-ink mr-4 indented', async ({ page }) => {
    // Checkpoint 23: Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)');
    }


    // This test validates: Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Chat message text renders with whitespace-pre-wrap preserving line breaks and wh', async ({ page }) => {
    // Checkpoint 24: Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses');
    }


    // This test validates: Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Copilot welcome card shows a Sparkle icon size 14 with uppercase Research Assist', async ({ page }) => {
    // Checkpoint 25: Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text');
    }


    // This test validates: Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Copilot welcome message body reads exactly Ask me to find papers on any topic Il', async ({ page }) => {
    // Checkpoint 26: Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 Copilot welcome message body reads exactly `Ask me to find papers on any topic. I\'ll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`');
    }


    // This test validates: Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Copilot AI status indicator shows a pulsing emerald dot w-15 h-15 rounded-full b', async ({ page }) => {
    // Checkpoint 27: Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`');
    }


    // This test validates: Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Copilot header uses Brain icon size 18 in text-brand color', async ({ page }) => {
    // Checkpoint 28: Copilot header uses `Brain` icon (size 18) in `text-brand` color
    // Section: Quick Test Workflows > Copilot Sidebar

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot header uses `Brain` icon (size 18) in `text-brand` color",
      section: "Quick Test Workflows",
      subsection: "Copilot Sidebar",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 Copilot header uses `Brain` icon (size 18) in `text-brand` color');
    }


    // This test validates: Copilot header uses `Brain` icon (size 18) in `text-brand` color
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Synthesis streaming uses ReadableStreamgetReader with TextDecoder stream true op', async ({ page }) => {
    // Checkpoint 29: Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding');
    }


    // This test validates: Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Generating indicator text appears next to the header during streaming shown as a', async ({ page }) => {
    // Checkpoint 30: "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "\"Generating...\" indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label');
    }


    // This test validates: "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Citation et al suffix is added when a paper has more than 1 author pauthorslengt', async ({ page }) => {
    // Checkpoint 31: Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase');
    }


    // This test validates: Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: AISynthesisPanel paperCount is computed as Mathminresultslength 5 if fewer than ', async ({ page }) => {
    // Checkpoint 32: AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`');
    }


    // This test validates: AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Free-plan blur overlay gradient direction is bg-gradient-to-t from-surface via-s', async ({ page }) => {
    // Checkpoint 33: Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)');
    }


    // This test validates: Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Free-plan upgrade link text reads Upgrade to Pro with text-brand hovertext-brand', async ({ page }) => {
    // Checkpoint 34: Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling
    // Section: Quick Test Workflows > AISynthesisPanel Internals

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling",
      section: "Quick Test Workflows",
      subsection: "AISynthesisPanel Internals",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling');
    }


    // This test validates: Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling
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
