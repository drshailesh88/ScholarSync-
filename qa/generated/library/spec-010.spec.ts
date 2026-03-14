/**
 * Auto-generated Playwright test for library/spec-010
 * Source: e2e/specs/library/spec-010.md
 * Generated: 2026-03-14T09:47:22.908Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-010
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-010', () => {
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

  test('cp-000: Validates file field exists and is a File instance returns 400 No PDF file provi', async ({ page }) => {
    // Checkpoint 0: Validates file field exists and is a File instance; returns 400 `"No PDF file provided. Include a 'file' field in the form data."` (extract-pdf/route.ts:51-56)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Validates file field exists and is a File instance; returns 400 `\"No PDF file provided. Include a 'file' field in the form data.\"` (extract-pdf/route.ts:51-56)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Validates file field exists and is a File instance; returns 400 `\"No PDF file provided. Include a 'file' field in the form data.\"` (extract-pdf/route.ts:51-56)");
    }


    // This test validates: Validates file field exists and is a File instance; returns 400 `"No PDF file provided. Include a 'file' field in the form data."` (extract-pdf/route.ts:51-56)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Validates file has PDF MIME type or pdf extension returns 400 Uploaded file must', async ({ page }) => {
    // Checkpoint 1: Validates file has PDF MIME type or `.pdf` extension; returns 400 `"Uploaded file must be a PDF"` (extract-pdf/route.ts:58-63)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Validates file has PDF MIME type or `.pdf` extension; returns 400 `\"Uploaded file must be a PDF\"` (extract-pdf/route.ts:58-63)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Validates file has PDF MIME type or `.pdf` extension; returns 400 `\"Uploaded file must be a PDF\"` (extract-pdf/route.ts:58-63)");
    }


    // This test validates: Validates file has PDF MIME type or `.pdf` extension; returns 400 `"Uploaded file must be a PDF"` (extract-pdf/route.ts:58-63)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Enforces 20 MB max file size returns 413 with message File size exceeds the 20MB', async ({ page }) => {
    // Checkpoint 2: Enforces 20 MB max file size; returns 413 with message `"File size exceeds the 20MB limit. Uploaded file is {N}MB."` including actual file size (extract-pdf/route.ts:65-72)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Enforces 20 MB max file size; returns 413 with message `\"File size exceeds the 20MB limit. Uploaded file is {N}MB.\"` including actual file size (extract-pdf/route.ts:65-72)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "Enforces 20 MB max file size; returns 413 with message `\"File size exceeds the 20MB limit. Uploaded file is {N}MB.\"` including actual file size (extract-pdf/route.ts:65-72)");
    }


    // This test validates: Enforces 20 MB max file size; returns 413 with message `"File size exceeds the 20MB limit. Uploaded file is {N}MB."` including actual file size (extract-pdf/route.ts:65-72)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Response shape on success text string pages number info title string author stri', async ({ page }) => {
    // Checkpoint 3: Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)");
    }


    // This test validates: Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Returns 500 Failed to extract text from PDF on parse errors extract-pdfroutets10', async ({ page }) => {
    // Checkpoint 4: Returns 500 `"Failed to extract text from PDF"` on parse errors (extract-pdf/route.ts:100-103)
    // Section: Quick Test Workflows > `/api/extract-pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 500 `\"Failed to extract text from PDF\"` on parse errors (extract-pdf/route.ts:100-103)",
      section: "Quick Test Workflows",
      subsection: "`/api/extract-pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Returns 500 `\"Failed to extract text from PDF\"` on parse errors (extract-pdf/route.ts:100-103)");
    }


    // This test validates: Returns 500 `"Failed to extract text from PDF"` on parse errors (extract-pdf/route.ts:100-103)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Validates request body with Zod schema title string min 1 required source enum s', async ({ page }) => {
    // Checkpoint 5: Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `"semantic_scholar" | "pubmed"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)
    // Section: Quick Test Workflows > `/api/papers/save` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `\"semantic_scholar\" | \"pubmed\"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/save` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `\"semantic_scholar\" | \"pubmed\"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)");
    }


    // This test validates: Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `"semantic_scholar" | "pubmed"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Returns 400 error Invalid paper payload details flattened Zod errors on validati', async ({ page }) => {
    // Checkpoint 6: Returns 400 `{ error: "Invalid paper payload", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)
    // Section: Quick Test Workflows > `/api/papers/save` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 400 `{ error: \"Invalid paper payload\", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/save` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Returns 400 `{ error: \"Invalid paper payload\", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)");
    }


    // This test validates: Returns 400 `{ error: "Invalid paper payload", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Applies rate limiting with RATE_LIMITSwrite bucket paperssaveroutets43-48', async ({ page }) => {
    // Checkpoint 7: Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)
    // Section: Quick Test Workflows > `/api/papers/save` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/save` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)");
    }


    // This test validates: Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Returns paperId number on success paperssaveroutets79', async ({ page }) => {
    // Checkpoint 8: Returns `{ paperId: number }` on success (papers/save/route.ts:79)
    // Section: Quick Test Workflows > `/api/papers/save` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns `{ paperId: number }` on success (papers/save/route.ts:79)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/save` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Returns `{ paperId: number }` on success (papers/save/route.ts:79)");
    }


    // This test validates: Returns `{ paperId: number }` on success (papers/save/route.ts:79)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Returns 500 Failed to save paper on server errors paperssaveroutets82-86', async ({ page }) => {
    // Checkpoint 9: Returns 500 `"Failed to save paper"` on server errors (papers/save/route.ts:82-86)
    // Section: Quick Test Workflows > `/api/papers/save` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 500 `\"Failed to save paper\"` on server errors (papers/save/route.ts:82-86)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/save` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Returns 500 `\"Failed to save paper\"` on server errors (papers/save/route.ts:82-86)");
    }


    // This test validates: Returns 500 `"Failed to save paper"` on server errors (papers/save/route.ts:82-86)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: GET validates id param as numeric d returns 400 Invalid paper ID papersidpdfrout', async ({ page }) => {
    // Checkpoint 10: GET validates `id` param as numeric (`/^\d+$/`); returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:22-23)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET validates `id` param as numeric (`/^\\d+$/`); returns 400 `\"Invalid paper ID\"` (papers/[id]/pdf/route.ts:22-23)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "GET validates `id` param as numeric (`/^\\d+$/`); returns 400 `\"Invalid paper ID\"` (papers/[id]/pdf/route.ts:22-23)");
    }


    // This test validates: GET validates `id` param as numeric (`/^\d+$/`); returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:22-23)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: GET requires authentication returns 401 Authentication required papersidpdfroute', async ({ page }) => {
    // Checkpoint 11: GET requires authentication; returns 401 `"Authentication required"` (papers/[id]/pdf/route.ts:28-31)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET requires authentication; returns 401 `\"Authentication required\"` (papers/[id]/pdf/route.ts:28-31)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "GET requires authentication; returns 401 `\"Authentication required\"` (papers/[id]/pdf/route.ts:28-31)");
    }


    // This test validates: GET requires authentication; returns 401 `"Authentication required"` (papers/[id]/pdf/route.ts:28-31)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: GET applies rate limiting with RATE_LIMITSexport bucket papersidpdfroutets35-36', async ({ page }) => {
    // Checkpoint 12: GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)");
    }


    // This test validates: GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: GET first attempts getSignedPdfUrl with the current R2local helper this resolves', async ({ page }) => {
    // Checkpoint 13: GET first attempts `getSignedPdfUrl(...)`; with the current R2/local helper this resolves to `null`, so the effective runtime fallback is local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET first attempts `getSignedPdfUrl(...)`; with the current R2/local helper this resolves to `null`, so the effective runtime fallback is local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "GET first attempts `getSignedPdfUrl(...)`; with the current R2/local helper this resolves to `null`, so the effective runtime fallback is local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)");
    }


    // This test validates: GET first attempts `getSignedPdfUrl(...)`; with the current R2/local helper this resolves to `null`, so the effective runtime fallback is local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: GET returns 404 PDF not found for this paper when no PDF source found papersidpd', async ({ page }) => {
    // Checkpoint 14: GET returns 404 `"PDF not found for this paper"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET returns 404 `\"PDF not found for this paper\"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "GET returns 404 `\"PDF not found for this paper\"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)");
    }


    // This test validates: GET returns 404 `"PDF not found for this paper"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: GET returns 500 Failed to serve PDF on server errors papersidpdfroutets83-86', async ({ page }) => {
    // Checkpoint 15: GET returns 500 `"Failed to serve PDF"` on server errors (papers/[id]/pdf/route.ts:83-86)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "GET returns 500 `\"Failed to serve PDF\"` on server errors (papers/[id]/pdf/route.ts:83-86)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "GET returns 500 `\"Failed to serve PDF\"` on server errors (papers/[id]/pdf/route.ts:83-86)");
    }


    // This test validates: GET returns 500 `"Failed to serve PDF"` on server errors (papers/[id]/pdf/route.ts:83-86)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: POST validates Content-Type must include multipartform-data returns 400 papersid', async ({ page }) => {
    // Checkpoint 16: POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)");
    }


    // This test validates: POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: POST validates id param as numeric returns 400 Invalid paper ID papersidpdfroute', async ({ page }) => {
    // Checkpoint 17: POST validates `id` param as numeric; returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:102-103)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST validates `id` param as numeric; returns 400 `\"Invalid paper ID\"` (papers/[id]/pdf/route.ts:102-103)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "POST validates `id` param as numeric; returns 400 `\"Invalid paper ID\"` (papers/[id]/pdf/route.ts:102-103)");
    }


    // This test validates: POST validates `id` param as numeric; returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:102-103)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: POST stores PDF via uploadPdf to the apps R2local storage layer then sets pdf_st', async ({ page }) => {
    // Checkpoint 18: POST stores PDF via `uploadPdf(...)` to the app's R2/local storage layer, then sets `pdf_storage_path` and `full_text_available = true` on the paper record (papers/[id]/pdf/route.ts:143-152)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST stores PDF via `uploadPdf(...)` to the app's R2/local storage layer, then sets `pdf_storage_path` and `full_text_available = true` on the paper record (papers/[id]/pdf/route.ts:143-152)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "POST stores PDF via `uploadPdf(...)` to the app's R2/local storage layer, then sets `pdf_storage_path` and `full_text_available = true` on the paper record (papers/[id]/pdf/route.ts:143-152)");
    }


    // This test validates: POST stores PDF via `uploadPdf(...)` to the app's R2/local storage layer, then sets `pdf_storage_path` and `full_text_available = true` on the paper record (papers/[id]/pdf/route.ts:143-152)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: POST triggers queuePdfProcessingpaperId buffer for background text extraction an', async ({ page }) => {
    // Checkpoint 19: POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)");
    }


    // This test validates: POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: POST returns success true paperId string storagePath string on success papersidp', async ({ page }) => {
    // Checkpoint 20: POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)");
    }


    // This test validates: POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: POST returns 500 Failed to store PDF file on server errors papersidpdfroutets164', async ({ page }) => {
    // Checkpoint 21: POST returns 500 `"Failed to store PDF file"` on server errors (papers/[id]/pdf/route.ts:164-168)
    // Section: Quick Test Workflows > `/api/papers/[id]/pdf` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "POST returns 500 `\"Failed to store PDF file\"` on server errors (papers/[id]/pdf/route.ts:164-168)",
      section: "Quick Test Workflows",
      subsection: "`/api/papers/[id]/pdf` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "POST returns 500 `\"Failed to store PDF file\"` on server errors (papers/[id]/pdf/route.ts:164-168)");
    }


    // This test validates: POST returns 500 `"Failed to store PDF file"` on server errors (papers/[id]/pdf/route.ts:164-168)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Uses 10-second AbortSignaltimeout on CrossRef and PubMed external API calls refe', async ({ page }) => {
    // Checkpoint 22: Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-022 ' + "Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)");
    }


    // This test validates: Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Returns 504 on CrossRef timeout CrossRef request timed out Try again referencesr', async ({ page }) => {
    // Checkpoint 23: Returns 504 on CrossRef timeout: `"CrossRef request timed out. Try again."` (references/resolve/route.ts:118-120)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 504 on CrossRef timeout: `\"CrossRef request timed out. Try again.\"` (references/resolve/route.ts:118-120)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-023 ' + "Returns 504 on CrossRef timeout: `\"CrossRef request timed out. Try again.\"` (references/resolve/route.ts:118-120)");
    }


    // This test validates: Returns 504 on CrossRef timeout: `"CrossRef request timed out. Try again."` (references/resolve/route.ts:118-120)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Returns 504 on PubMed timeout PubMed request timed out Try again referencesresol', async ({ page }) => {
    // Checkpoint 24: Returns 504 on PubMed timeout: `"PubMed request timed out. Try again."` (references/resolve/route.ts:169-174)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 504 on PubMed timeout: `\"PubMed request timed out. Try again.\"` (references/resolve/route.ts:169-174)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-024 ' + "Returns 504 on PubMed timeout: `\"PubMed request timed out. Try again.\"` (references/resolve/route.ts:169-174)");
    }


    // This test validates: Returns 504 on PubMed timeout: `"PubMed request timed out. Try again."` (references/resolve/route.ts:169-174)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: DOI 404 returns status 200 with success false error Could not find a reference f', async ({ page }) => {
    // Checkpoint 25: DOI 404 returns status 200 with `{ success: false, error: "Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually." }` (references/resolve/route.ts:91-96)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "DOI 404 returns status 200 with `{ success: false, error: \"Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually.\" }` (references/resolve/route.ts:91-96)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-025 ' + "DOI 404 returns status 200 with `{ success: false, error: \"Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually.\" }` (references/resolve/route.ts:91-96)");
    }


    // This test validates: DOI 404 returns status 200 with `{ success: false, error: "Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually." }` (references/resolve/route.ts:91-96)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Non-404 DOI failure returns 502 CrossRef returned status N referencesresolverout', async ({ page }) => {
    // Checkpoint 26: Non-404 DOI failure returns 502 `"CrossRef returned status {N}"` (references/resolve/route.ts:97-103)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Non-404 DOI failure returns 502 `\"CrossRef returned status {N}\"` (references/resolve/route.ts:97-103)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-026 ' + "Non-404 DOI failure returns 502 `\"CrossRef returned status {N}\"` (references/resolve/route.ts:97-103)");
    }


    // This test validates: Non-404 DOI failure returns 502 `"CrossRef returned status {N}"` (references/resolve/route.ts:97-103)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Bad PMID returns No PubMed record found for this ID checks both HTTP error and X', async ({ page }) => {
    // Checkpoint 27: Bad PMID returns `"No PubMed record found for this ID."` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Bad PMID returns `\"No PubMed record found for this ID.\"` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-027 ' + "Bad PMID returns `\"No PubMed record found for this ID.\"` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)");
    }


    // This test validates: Bad PMID returns `"No PubMed record found for this ID."` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Unparseable PubMed record returns Could not parse PubMed record referencesresolv', async ({ page }) => {
    // Checkpoint 28: Unparseable PubMed record returns `"Could not parse PubMed record."` (references/resolve/route.ts:156-159)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Unparseable PubMed record returns `\"Could not parse PubMed record.\"` (references/resolve/route.ts:156-159)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-028 ' + "Unparseable PubMed record returns `\"Could not parse PubMed record.\"` (references/resolve/route.ts:156-159)");
    }


    // This test validates: Unparseable PubMed record returns `"Could not parse PubMed record."` (references/resolve/route.ts:156-159)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Unresolvable PMCID returns Could not resolve PMCID Try using the PMID or DOI ins', async ({ page }) => {
    // Checkpoint 29: Unresolvable PMCID returns `"Could not resolve PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:198-201)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Unresolvable PMCID returns `\"Could not resolve PMCID. Try using the PMID or DOI instead.\"` (references/resolve/route.ts:198-201)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-029 ' + "Unresolvable PMCID returns `\"Could not resolve PMCID. Try using the PMID or DOI instead.\"` (references/resolve/route.ts:198-201)");
    }


    // This test validates: Unresolvable PMCID returns `"Could not resolve PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:198-201)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: PMCID converter failure returns Failed to convert PMCID Try using the PMID or DO', async ({ page }) => {
    // Checkpoint 30: PMCID converter failure returns `"Failed to convert PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:203-206)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PMCID converter failure returns `\"Failed to convert PMCID. Try using the PMID or DOI instead.\"` (references/resolve/route.ts:203-206)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-030 ' + "PMCID converter failure returns `\"Failed to convert PMCID. Try using the PMID or DOI instead.\"` (references/resolve/route.ts:203-206)");
    }


    // This test validates: PMCID converter failure returns `"Failed to convert PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:203-206)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: URL without extractable DOI returns Could not extract a DOI from this URL Try pa', async ({ page }) => {
    // Checkpoint 31: URL without extractable DOI returns `"Could not extract a DOI from this URL. Try pasting the DOI directly."` (references/resolve/route.ts:49-56)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "URL without extractable DOI returns `\"Could not extract a DOI from this URL. Try pasting the DOI directly.\"` (references/resolve/route.ts:49-56)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-031 ' + "URL without extractable DOI returns `\"Could not extract a DOI from this URL. Try pasting the DOI directly.\"` (references/resolve/route.ts:49-56)");
    }


    // This test validates: URL without extractable DOI returns `"Could not extract a DOI from this URL. Try pasting the DOI directly."` (references/resolve/route.ts:49-56)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Unknown identifier type returns Could not determine identifier type Try a DOI st', async ({ page }) => {
    // Checkpoint 32: Unknown identifier type returns `"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric)."` (references/resolve/route.ts:59-66)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Unknown identifier type returns `\"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric).\"` (references/resolve/route.ts:59-66)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-032 ' + "Unknown identifier type returns `\"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric).\"` (references/resolve/route.ts:59-66)");
    }


    // This test validates: Unknown identifier type returns `"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric)."` (references/resolve/route.ts:59-66)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Returns 500 Internal server error on unexpected exceptions referencesresolverout', async ({ page }) => {
    // Checkpoint 33: Returns 500 `"Internal server error"` on unexpected exceptions (references/resolve/route.ts:70-74)
    // Section: Quick Test Workflows > `/api/references/resolve` Route Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Returns 500 `\"Internal server error\"` on unexpected exceptions (references/resolve/route.ts:70-74)",
      section: "Quick Test Workflows",
      subsection: "`/api/references/resolve` Route Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-033 ' + "Returns 500 `\"Internal server error\"` on unexpected exceptions (references/resolve/route.ts:70-74)");
    }


    // This test validates: Returns 500 `"Internal server error"` on unexpected exceptions (references/resolve/route.ts:70-74)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: savePaper creates userReference with collection All Papers as default collection', async ({ page }) => {
    // Checkpoint 34: `savePaper` creates userReference with `collection: "All Papers"` as default collection value (papers.ts:464)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-010');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`savePaper` creates userReference with `collection: \"All Papers\"` as default collection value (papers.ts:464)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-034 ' + "`savePaper` creates userReference with `collection: \"All Papers\"` as default collection value (papers.ts:464)");
    }


    // This test validates: `savePaper` creates userReference with `collection: "All Papers"` as default collection value (papers.ts:464)
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
