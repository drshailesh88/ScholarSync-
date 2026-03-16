/**
 * Auto-generated Playwright test for latex/spec-015
 * Source: e2e/specs/latex/spec-015.md
 * Generated: 2026-03-15T17:51:09.728Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-015', () => {
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

  test('cp-000: Delete sends DELETE to apilateximagesstorageKeyencodedKey', async ({ page }) => {
    // Checkpoint 0: Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`
    // Section: Quick Test Workflows > Image Browser — Full Behavior

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`",
      section: "Quick Test Workflows",
      subsection: "Image Browser — Full Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`");
    }


    // This test validates: Delete sends DELETE to `/api/latex/images?storageKey={encodedKey}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: PDF thumbnails render as inline iframe images use Nextjs Image with unoptimized ', async ({ page }) => {
    // Checkpoint 1: PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag
    // Section: Quick Test Workflows > Image Browser — Full Behavior

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag",
      section: "Quick Test Workflows",
      subsection: "Image Browser — Full Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag");
    }


    // This test validates: PDF thumbnails render as inline iframe; images use Next.js `<Image>` with `unoptimized` flag
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: File input accept attribute pngjpgjpegpdf', async ({ page }) => {
    // Checkpoint 2: File input accept attribute: `.png,.jpg,.jpeg,.pdf`
    // Section: Quick Test Workflows > Image Browser — Full Behavior

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "File input accept attribute: `.png,.jpg,.jpeg,.pdf`",
      section: "Quick Test Workflows",
      subsection: "Image Browser — Full Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "File input accept attribute: `.png,.jpg,.jpeg,.pdf`");
    }


    // This test validates: File input accept attribute: `.png,.jpg,.jpeg,.pdf`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Request body validated via zod projectId must be a UUID string', async ({ page }) => {
    // Checkpoint 3: Request body validated via zod: `projectId` must be a UUID string
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Request body validated via zod: `projectId` must be a UUID string",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Request body validated via zod: `projectId` must be a UUID string");
    }


    // This test validates: Request body validated via zod: `projectId` must be a UUID string
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Invalid body 400 error Invalid request', async ({ page }) => {
    // Checkpoint 4: Invalid body → 400 `{ error: "Invalid request" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Invalid body → 400 `{ error: \"Invalid request\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "Invalid body → 400 `{ error: \"Invalid request\" }`");
    }


    // This test validates: Invalid body → 400 `{ error: "Invalid request" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Project not found or not owned by current user 404 error Project not found', async ({ page }) => {
    // Checkpoint 5: Project not found or not owned by current user → 404 `{ error: "Project not found" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Project not found or not owned by current user → 404 `{ error: \"Project not found\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "Project not found or not owned by current user → 404 `{ error: \"Project not found\" }`");
    }


    // This test validates: Project not found or not owned by current user → 404 `{ error: "Project not found" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: No files in project 400 error No files in project', async ({ page }) => {
    // Checkpoint 6: No files in project → 400 `{ error: "No files in project" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "No files in project → 400 `{ error: \"No files in project\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "No files in project → 400 `{ error: \"No files in project\" }`");
    }


    // This test validates: No files in project → 400 `{ error: "No files in project" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: No main file found 400 error No main tex file found', async ({ page }) => {
    // Checkpoint 7: No main file found → 400 `{ error: "No main .tex file found" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "No main file found → 400 `{ error: \"No main .tex file found\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "No main file found → 400 `{ error: \"No main .tex file found\" }`");
    }


    // This test validates: No main file found → 400 `{ error: "No main .tex file found" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Server-side compile timeout 60 seconds per attempt AbortSignaltimeout60_000', async ({ page }) => {
    // Checkpoint 8: Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)");
    }


    // This test validates: Server-side compile timeout: 60 seconds per attempt (`AbortSignal.timeout(60_000)`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Server-side retry up to 2 retries on 503504 or fetch errors with progressive bac', async ({ page }) => {
    // Checkpoint 9: Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)");
    }


    // This test validates: Server-side retry: up to 2 retries on 503/504 or fetch errors, with progressive backoff (1s × attempt)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 429 from upstream compiler is passed through directly to the client', async ({ page }) => {
    // Checkpoint 10: 429 from upstream compiler is passed through directly to the client
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "429 from upstream compiler is passed through directly to the client",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "429 from upstream compiler is passed through directly to the client");
    }


    // This test validates: 429 from upstream compiler is passed through directly to the client
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 422 compilation failure saves an error compilation record to DB and returns erro', async ({ page }) => {
    // Checkpoint 11: 422 (compilation failure) saves an error compilation record to DB and returns `{ error: "Compilation failed", log, errors, durationMs }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "422 (compilation failure) saves an error compilation record to DB and returns `{ error: \"Compilation failed\", log, errors, durationMs }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "422 (compilation failure) saves an error compilation record to DB and returns `{ error: \"Compilation failed\", log, errors, durationMs }`");
    }


    // This test validates: 422 (compilation failure) saves an error compilation record to DB and returns `{ error: "Compilation failed", log, errors, durationMs }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Successful compilation saves record to DB and returns PDF binary with headers Co', async ({ page }) => {
    // Checkpoint 12: Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`");
    }


    // This test validates: Successful compilation saves record to DB and returns PDF binary with headers: `Content-Disposition`, `X-Compilation-Status`, `X-Compilation-Duration`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Compilation log is decoded from base64 X-Compilation-Log response header', async ({ page }) => {
    // Checkpoint 13: Compilation log is decoded from base64 `X-Compilation-Log` response header
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compilation log is decoded from base64 `X-Compilation-Log` response header",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "Compilation log is decoded from base64 `X-Compilation-Log` response header");
    }


    // This test validates: Compilation log is decoded from base64 `X-Compilation-Log` response header
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Compiler authenticated via Authorization Bearer secret when LATEX_COMPILER_SECRE', async ({ page }) => {
    // Checkpoint 14: Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set");
    }


    // This test validates: Compiler authenticated via `Authorization: Bearer {secret}` when `LATEX_COMPILER_SECRET` env var is set
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Compile payload includes projectId for persistent build cache on the compiler se', async ({ page }) => {
    // Checkpoint 15: Compile payload includes `projectId` for persistent build cache on the compiler service
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compile payload includes `projectId` for persistent build cache on the compiler service",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "Compile payload includes `projectId` for persistent build cache on the compiler service");
    }


    // This test validates: Compile payload includes `projectId` for persistent build cache on the compiler service
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Unexpected status codes 502 error Compilation service error', async ({ page }) => {
    // Checkpoint 16: Unexpected status codes → 502 `{ error: "Compilation service error" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Unexpected status codes → 502 `{ error: \"Compilation service error\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "Unexpected status codes → 502 `{ error: \"Compilation service error\" }`");
    }


    // This test validates: Unexpected status codes → 502 `{ error: "Compilation service error" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Unhandled exceptions 500 error Internal server error', async ({ page }) => {
    // Checkpoint 17: Unhandled exceptions → 500 `{ error: "Internal server error" }`
    // Section: Quick Test Workflows > Compile API Route (`/api/latex/compile`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Unhandled exceptions → 500 `{ error: \"Internal server error\" }`",
      section: "Quick Test Workflows",
      subsection: "Compile API Route (`/api/latex/compile`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "Unhandled exceptions → 500 `{ error: \"Internal server error\" }`");
    }


    // This test validates: Unhandled exceptions → 500 `{ error: "Internal server error" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Preview handles part centered 18em and chapter sectioning commands in addition t', async ({ page }) => {
    // Checkpoint 18: Preview handles `\part` (centered, 1.8em) and `\chapter` sectioning commands in addition to section/subsection/subsubsection
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Preview handles `\\part` (centered, 1.8em) and `\\chapter` sectioning commands in addition to section/subsection/subsubsection",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "Preview handles `\\part` (centered, 1.8em) and `\\chapter` sectioning commands in addition to section/subsection/subsubsection");
    }


    // This test validates: Preview handles `\part` (centered, 1.8em) and `\chapter` sectioning commands in addition to section/subsection/subsubsection
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Preview handles paragraph and subparagraph as inline bold text not block heading', async ({ page }) => {
    // Checkpoint 19: Preview handles `\paragraph` and `\subparagraph` as inline bold text (not block headings)
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Preview handles `\\paragraph` and `\\subparagraph` as inline bold text (not block headings)",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "Preview handles `\\paragraph` and `\\subparagraph` as inline bold text (not block headings)");
    }


    // This test validates: Preview handles `\paragraph` and `\subparagraph` as inline bold text (not block headings)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: footnotetext renders as superscript with title tooltip showing the footnote text', async ({ page }) => {
    // Checkpoint 20: `\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "`\\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text");
    }


    // This test validates: `\footnote{text}` renders as superscript `[*]` with title tooltip showing the footnote text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: textcolorcolortext renders with inline color style', async ({ page }) => {
    // Checkpoint 21: `\textcolor{color}{text}` renders with inline `color` style
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\textcolor{color}{text}` renders with inline `color` style",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "`\\textcolor{color}{text}` renders with inline `color` style");
    }


    // This test validates: `\textcolor{color}{text}` renders with inline `color` style
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: colorboxcolortext renders with inline background-color style and padding', async ({ page }) => {
    // Checkpoint 22: `\colorbox{color}{text}` renders with inline `background-color` style and padding
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\colorbox{color}{text}` renders with inline `background-color` style and padding",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "`\\colorbox{color}{text}` renders with inline `background-color` style and padding");
    }


    // This test validates: `\colorbox{color}{text}` renders with inline `background-color` style and padding
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 10 font size commands handled tiny 06em through Huge 25em', async ({ page }) => {
    // Checkpoint 23: 10 font size commands handled: `\tiny` (0.6em) through `\Huge` (2.5em)
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "10 font size commands handled: `\\tiny` (0.6em) through `\\Huge` (2.5em)",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "10 font size commands handled: `\\tiny` (0.6em) through `\\Huge` (2.5em)");
    }


    // This test validates: 10 font size commands handled: `\tiny` (0.6em) through `\Huge` (2.5em)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: hrefurltext renders as anchor with target_blank relnoopener', async ({ page }) => {
    // Checkpoint 24: `\href{url}{text}` renders as anchor with `target="_blank" rel="noopener"`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\href{url}{text}` renders as anchor with `target=\"_blank\" rel=\"noopener\"`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "`\\href{url}{text}` renders as anchor with `target=\"_blank\" rel=\"noopener\"`");
    }


    // This test validates: `\href{url}{text}` renders as anchor with `target="_blank" rel="noopener"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: urlurl renders as code-styled link with same attributes', async ({ page }) => {
    // Checkpoint 25: `\url{url}` renders as code-styled link with same attributes
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\url{url}` renders as code-styled link with same attributes",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "`\\url{url}` renders as code-styled link with same attributes");
    }


    // This test validates: `\url{url}` renders as code-styled link with same attributes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: LaTeX and TeX render as styled logo elements with supsub tags', async ({ page }) => {
    // Checkpoint 26: `\LaTeX` and `\TeX` render as styled logo elements with sup/sub tags
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\LaTeX` and `\\TeX` render as styled logo elements with sup/sub tags",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "`\\LaTeX` and `\\TeX` render as styled logo elements with sup/sub tags");
    }


    // This test validates: `\LaTeX` and `\TeX` render as styled logo elements with sup/sub tags
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: today renders current date in en-US locale with year numeric month long day nume', async ({ page }) => {
    // Checkpoint 27: `\today` renders current date in `en-US` locale with `{ year: "numeric", month: "long", day: "numeric" }`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\today` renders current date in `en-US` locale with `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "`\\today` renders current date in `en-US` locale with `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`");
    }


    // This test validates: `\today` renders current date in `en-US` locale with `{ year: "numeric", month: "long", day: "numeric" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Smart quote conversion left double quote right double quote left single quote', async ({ page }) => {
    // Checkpoint 28: Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote");
    }


    // This test validates: Smart quote conversion: ` `` ` → left double quote, `''` → right double quote, `` ` `` → left single quote
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: --- em-dash U2014 -- en-dash U2013', async ({ page }) => {
    // Checkpoint 29: `---` → em-dash (U+2014), `--` → en-dash (U+2013)
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`---` → em-dash (U+2014), `--` → en-dash (U+2013)",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "`---` → em-dash (U+2014), `--` → en-dash (U+2013)");
    }


    // This test validates: `---` → em-dash (U+2014), `--` → en-dash (U+2013)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: newpageclearpagecleardoublepage render as hr with pagebreak class', async ({ page }) => {
    // Checkpoint 30: `\newpage`/`\clearpage`/`\cleardoublepage` render as `<hr>` with pagebreak class
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\newpage`/`\\clearpage`/`\\cleardoublepage` render as `<hr>` with pagebreak class",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "`\\newpage`/`\\clearpage`/`\\cleardoublepage` render as `<hr>` with pagebreak class");
    }


    // This test validates: `\newpage`/`\clearpage`/`\cleardoublepage` render as `<hr>` with pagebreak class
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: tableofcontents italic Table of Contents placeholder listoffigures List of Figur', async ({ page }) => {
    // Checkpoint 31: `\tableofcontents` → italic "Table of Contents" placeholder, `\listoffigures` → "List of Figures", `\listoftables` → "List of Tables"
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\tableofcontents` → italic \"Table of Contents\" placeholder, `\\listoffigures` → \"List of Figures\", `\\listoftables` → \"List of Tables\"",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "`\\tableofcontents` → italic \"Table of Contents\" placeholder, `\\listoffigures` → \"List of Figures\", `\\listoftables` → \"List of Tables\"");
    }


    // This test validates: `\tableofcontents` → italic "Table of Contents" placeholder, `\listoffigures` → "List of Figures", `\listoftables` → "List of Tables"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: vspaceX div with margin-topX hspaceX span with margin-leftX', async ({ page }) => {
    // Checkpoint 32: `\vspace{X}` → div with `margin-top:X`, `\hspace{X}` → span with `margin-left:X`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\vspace{X}` → div with `margin-top:X`, `\\hspace{X}` → span with `margin-left:X`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "`\\vspace{X}` → div with `margin-top:X`, `\\hspace{X}` → span with `margin-left:X`");
    }


    // This test validates: `\vspace{X}` → div with `margin-top:X`, `\hspace{X}` → span with `margin-left:X`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: textsctext font-variant small-caps', async ({ page }) => {
    // Checkpoint 33: `\textsc{text}` → `font-variant: small-caps`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\textsc{text}` → `font-variant: small-caps`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "`\\textsc{text}` → `font-variant: small-caps`");
    }


    // This test validates: `\textsc{text}` → `font-variant: small-caps`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: tilde renders as non-breaking space U00A0', async ({ page }) => {
    // Checkpoint 34: `~` (tilde) renders as non-breaking space (U+00A0)
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`~` (tilde) renders as non-breaking space (U+00A0)",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "`~` (tilde) renders as non-breaking space (U+00A0)");
    }


    // This test validates: `~` (tilde) renders as non-breaking space (U+00A0)
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
