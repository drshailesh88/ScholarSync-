/**
 * Auto-generated Playwright test for slides/spec-023
 * Source: e2e/specs/slides/spec-023.md
 * Generated: 2026-03-14T10:18:37.803Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts slides spec-023
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';













import { assertSlidesCheckpoint } from '../../module-assertions/slides';






test.describe('slides / spec-023', () => {
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

  test('cp-000: apislidesimport-pptx returns 401 error Unauthorized for unauthenticated users', async ({ page }) => {
    // Checkpoint 0: `/api/slides/import-pptx` returns 401 `{ error: "Unauthorized" }` for unauthenticated users
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` returns 401 `{ error: \"Unauthorized\" }` for unauthenticated users",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-000 ' + "`/api/slides/import-pptx` returns 401 `{ error: \"Unauthorized\" }` for unauthenticated users");
    }


    // This test validates: `/api/slides/import-pptx` returns 401 `{ error: "Unauthorized" }` for unauthenticated users
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: apislidesimport-pptx returns 400 error Please upload a pptx file when no file or', async ({ page }) => {
    // Checkpoint 1: `/api/slides/import-pptx` returns 400 `{ error: "Please upload a .pptx file" }` when no file or wrong type
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` returns 400 `{ error: \"Please upload a .pptx file\" }` when no file or wrong type",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-001 ' + "`/api/slides/import-pptx` returns 400 `{ error: \"Please upload a .pptx file\" }` when no file or wrong type");
    }


    // This test validates: `/api/slides/import-pptx` returns 400 `{ error: "Please upload a .pptx file" }` when no file or wrong type
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: apislidesimport-pptx returns 400 error File exceeds 50MB limit for oversized fil', async ({ page }) => {
    // Checkpoint 2: `/api/slides/import-pptx` returns 400 `{ error: "File exceeds 50MB limit" }` for oversized files
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` returns 400 `{ error: \"File exceeds 50MB limit\" }` for oversized files",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-002 ' + "`/api/slides/import-pptx` returns 400 `{ error: \"File exceeds 50MB limit\" }` for oversized files");
    }


    // This test validates: `/api/slides/import-pptx` returns 400 `{ error: "File exceeds 50MB limit" }` for oversized files
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: apislidesimport-pptx returns 400 error Password-protected files are not supporte', async ({ page }) => {
    // Checkpoint 3: `/api/slides/import-pptx` returns 400 `{ error: "Password-protected files are not supported" }` for encrypted PPTX
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` returns 400 `{ error: \"Password-protected files are not supported\" }` for encrypted PPTX",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-003 ' + "`/api/slides/import-pptx` returns 400 `{ error: \"Password-protected files are not supported\" }` for encrypted PPTX");
    }


    // This test validates: `/api/slides/import-pptx` returns 400 `{ error: "Password-protected files are not supported" }` for encrypted PPTX
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: apislidesimport-pptx returns 500 error Import failed on unexpected server error', async ({ page }) => {
    // Checkpoint 4: `/api/slides/import-pptx` returns 500 `{ error: "Import failed" }` on unexpected server error
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` returns 500 `{ error: \"Import failed\" }` on unexpected server error",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-004 ' + "`/api/slides/import-pptx` returns 500 `{ error: \"Import failed\" }` on unexpected server error");
    }


    // This test validates: `/api/slides/import-pptx` returns 500 `{ error: "Import failed" }` on unexpected server error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: apislidesimport-pptx creates deck with description Imported from filename plus o', async ({ page }) => {
    // Checkpoint 5: `/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-005 ' + "`/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name");
    }


    // This test validates: `/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: apislidesimport-pptx processes image assets via storeImportedSlideAsset and patc', async ({ page }) => {
    // Checkpoint 6: `/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-006 ' + "`/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs");
    }


    // This test validates: `/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: apislidesimport-pptx appends Presentation contains no slides to warnings when sl', async ({ page }) => {
    // Checkpoint 7: `/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-007 ' + "`/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`");
    }


    // This test validates: `/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: All three API routes enforce rate limiting via checkRateLimit before processing', async ({ page }) => {
    // Checkpoint 8: All three API routes enforce rate limiting via `checkRateLimit` before processing
    // Section: Quick Test Workflows > API Routes — Validation & Error Handling

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "All three API routes enforce rate limiting via `checkRateLimit` before processing",
      section: "Quick Test Workflows",
      subsection: "API Routes — Validation & Error Handling",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-008 ' + "All three API routes enforce rate limiting via `checkRateLimit` before processing");
    }


    // This test validates: All three API routes enforce rate limiting via `checkRateLimit` before processing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Toolbar renders CollaborationAvatarsSlot between the A11y button and the Present', async ({ page }) => {
    // Checkpoint 9: Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button
    // Section: Quick Test Workflows > Slides Toolbar — Collaboration Avatars

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button",
      section: "Quick Test Workflows",
      subsection: "Slides Toolbar — Collaboration Avatars",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-009 ' + "Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button");
    }


    // This test validates: Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Avatars slot is imported from collaboration-slots as AvatarsSlot', async ({ page }) => {
    // Checkpoint 10: Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`
    // Section: Quick Test Workflows > Slides Toolbar — Collaboration Avatars

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`",
      section: "Quick Test Workflows",
      subsection: "Slides Toolbar — Collaboration Avatars",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-010 ' + "Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`");
    }


    // This test validates: Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: BlockPropertyEditor is shown when exactly one block is selected AND the block ty', async ({ page }) => {
    // Checkpoint 11: `BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`
    // Section: Quick Test Workflows > Properties Panel — Block Property Editor Guard

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`",
      section: "Quick Test Workflows",
      subsection: "Properties Panel — Block Property Editor Guard",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-011 ' + "`BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`");
    }


    // This test validates: `BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Single-block alignment buttons are disabled when the selected block has no posit', async ({ page }) => {
    // Checkpoint 12: Single-block alignment buttons are disabled when the selected block has no `position` property
    // Section: Quick Test Workflows > Properties Panel — Block Property Editor Guard

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Single-block alignment buttons are disabled when the selected block has no `position` property",
      section: "Quick Test Workflows",
      subsection: "Properties Panel — Block Property Editor Guard",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-012 ' + "Single-block alignment buttons are disabled when the selected block has no `position` property");
    }


    // This test validates: Single-block alignment buttons are disabled when the selected block has no `position` property
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: ModeSelector renders two buttons Slides and Create not Slides Mode Create Mode', async ({ page }) => {
    // Checkpoint 13: `ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)
    // Section: Quick Test Workflows > Mode Selector — Visual Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)",
      section: "Quick Test Workflows",
      subsection: "Mode Selector — Visual Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-013 ' + "`ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)");
    }


    // This test validates: `ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Active mode button has classes bg-brand text-white shadow-sm', async ({ page }) => {
    // Checkpoint 14: Active mode button has classes `bg-brand text-white shadow-sm`
    // Section: Quick Test Workflows > Mode Selector — Visual Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Active mode button has classes `bg-brand text-white shadow-sm`",
      section: "Quick Test Workflows",
      subsection: "Mode Selector — Visual Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-014 ' + "Active mode button has classes `bg-brand text-white shadow-sm`");
    }


    // This test validates: Active mode button has classes `bg-brand text-white shadow-sm`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Each mode button includes an inline SVG icon slides grid icon for Slides star ic', async ({ page }) => {
    // Checkpoint 15: Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)
    // Section: Quick Test Workflows > Mode Selector — Visual Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)",
      section: "Quick Test Workflows",
      subsection: "Mode Selector — Visual Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-015 ' + "Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)");
    }


    // This test validates: Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Wizard shows 3 progress dots at the top center for topic audience theme steps', async ({ page }) => {
    // Checkpoint 16: Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)
    // Section: Quick Test Workflows > New Presentation Wizard — Progress Dots

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Progress Dots",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-016 ' + "Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)");
    }


    // This test validates: Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Active step dot is bg-brand completed steps are bg-brand40 future steps are bg-b', async ({ page }) => {
    // Checkpoint 17: Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`
    // Section: Quick Test Workflows > New Presentation Wizard — Progress Dots

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Progress Dots",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-017 ' + "Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`");
    }


    // This test validates: Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: During generating step the third dot shows as active bg-brand', async ({ page }) => {
    // Checkpoint 18: During generating step, the third dot shows as active (`bg-brand`)
    // Section: Quick Test Workflows > New Presentation Wizard — Progress Dots

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "During generating step, the third dot shows as active (`bg-brand`)",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Progress Dots",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-018 ' + "During generating step, the third dot shows as active (`bg-brand`)");
    }


    // This test validates: During generating step, the third dot shows as active (`bg-brand`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Each audience option shows a description beneath the label General audience pres', async ({ page }) => {
    // Checkpoint 19: Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`
    // Section: Quick Test Workflows > New Presentation Wizard — Audience Descriptions

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Audience Descriptions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-019 ' + "Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`");
    }


    // This test validates: Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Audience options are rendered in a grid-cols-2 layout 7 options one orphan cell', async ({ page }) => {
    // Checkpoint 20: Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)
    // Section: Quick Test Workflows > New Presentation Wizard — Audience Descriptions

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Audience Descriptions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-020 ' + "Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)");
    }


    // This test validates: Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Selected audience card has border-brand bg-brand5', async ({ page }) => {
    // Checkpoint 21: Selected audience card has `border-brand bg-brand/5`
    // Section: Quick Test Workflows > New Presentation Wizard — Audience Descriptions

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Selected audience card has `border-brand bg-brand/5`",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Audience Descriptions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-021 ' + "Selected audience card has `border-brand bg-brand/5`");
    }


    // This test validates: Selected audience card has `border-brand bg-brand/5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Audience step includes a Back button that returns to topic step', async ({ page }) => {
    // Checkpoint 22: Audience step includes a `Back` button that returns to topic step
    // Section: Quick Test Workflows > New Presentation Wizard — Back Navigation

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Audience step includes a `Back` button that returns to topic step",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Back Navigation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-022 ' + "Audience step includes a `Back` button that returns to topic step");
    }


    // This test validates: Audience step includes a `Back` button that returns to topic step
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Theme step includes a Back button that returns to audience step', async ({ page }) => {
    // Checkpoint 23: Theme step includes a `Back` button that returns to audience step
    // Section: Quick Test Workflows > New Presentation Wizard — Back Navigation

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Theme step includes a `Back` button that returns to audience step",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Back Navigation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-023 ' + "Theme step includes a `Back` button that returns to audience step");
    }


    // This test validates: Theme step includes a `Back` button that returns to audience step
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Topic step has no Back button', async ({ page }) => {
    // Checkpoint 24: Topic step has no Back button
    // Section: Quick Test Workflows > New Presentation Wizard — Back Navigation

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Topic step has no Back button",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Back Navigation",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-024 ' + "Topic step has no Back button");
    }


    // This test validates: Topic step has no Back button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Generating step sub-text is Setting up your deck and generating initial slides', async ({ page }) => {
    // Checkpoint 25: Generating step sub-text is `Setting up your deck and generating initial slides...`
    // Section: Quick Test Workflows > New Presentation Wizard — Generating Step Text

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Generating step sub-text is `Setting up your deck and generating initial slides...`",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Generating Step Text",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-025 ' + "Generating step sub-text is `Setting up your deck and generating initial slides...`");
    }


    // This test validates: Generating step sub-text is `Setting up your deck and generating initial slides...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Create button during generation shows spinner Creating not Create Presentation', async ({ page }) => {
    // Checkpoint 26: Create button during generation shows spinner + `Creating...` (not `Create Presentation`)
    // Section: Quick Test Workflows > New Presentation Wizard — Generating Step Text

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Create button during generation shows spinner + `Creating...` (not `Create Presentation`)",
      section: "Quick Test Workflows",
      subsection: "New Presentation Wizard — Generating Step Text",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-026 ' + "Create button during generation shows spinner + `Creating...` (not `Create Presentation`)");
    }


    // This test validates: Create button during generation shows spinner + `Creating...` (not `Create Presentation`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Parsing phase copy Extracting slide structure and preview content', async ({ page }) => {
    // Checkpoint 27: Parsing phase copy: `Extracting slide structure and preview content...`
    // Section: Quick Test Workflows > Import State Card — Phase Copy Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Parsing phase copy: `Extracting slide structure and preview content...`",
      section: "Quick Test Workflows",
      subsection: "Import State Card — Phase Copy Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-027 ' + "Parsing phase copy: `Extracting slide structure and preview content...`");
    }


    // This test validates: Parsing phase copy: `Extracting slide structure and preview content...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Ready phase copy Preview the extracted slides before importing them into Scholar', async ({ page }) => {
    // Checkpoint 28: Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`
    // Section: Quick Test Workflows > Import State Card — Phase Copy Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`",
      section: "Quick Test Workflows",
      subsection: "Import State Card — Phase Copy Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-028 ' + "Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`");
    }


    // This test validates: Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Importing phase copy Uploading assets and creating the imported deck', async ({ page }) => {
    // Checkpoint 29: Importing phase copy: `Uploading assets and creating the imported deck...`
    // Section: Quick Test Workflows > Import State Card — Phase Copy Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Importing phase copy: `Uploading assets and creating the imported deck...`",
      section: "Quick Test Workflows",
      subsection: "Import State Card — Phase Copy Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-029 ' + "Importing phase copy: `Uploading assets and creating the imported deck...`");
    }


    // This test validates: Importing phase copy: `Uploading assets and creating the imported deck...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Idle-with-error copy The selected file could not be imported', async ({ page }) => {
    // Checkpoint 30: Idle-with-error copy: `The selected file could not be imported.`
    // Section: Quick Test Workflows > Import State Card — Phase Copy Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Idle-with-error copy: `The selected file could not be imported.`",
      section: "Quick Test Workflows",
      subsection: "Import State Card — Phase Copy Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-030 ' + "Idle-with-error copy: `The selected file could not be imported.`");
    }


    // This test validates: Idle-with-error copy: `The selected file could not be imported.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Export-all-PNG timeout before capture is 120ms after 2 animation frames document', async ({ page }) => {
    // Checkpoint 31: Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)
    // Section: Quick Test Workflows > Export — All-Slides ZIP Additional Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)",
      section: "Quick Test Workflows",
      subsection: "Export — All-Slides ZIP Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-031 ' + "Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)");
    }


    // This test validates: Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Export-all-PNG sorts slides by sortOrder before rendering', async ({ page }) => {
    // Checkpoint 32: Export-all-PNG sorts slides by `sortOrder` before rendering
    // Section: Quick Test Workflows > Export — All-Slides ZIP Additional Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Export-all-PNG sorts slides by `sortOrder` before rendering",
      section: "Quick Test Workflows",
      subsection: "Export — All-Slides ZIP Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-032 ' + "Export-all-PNG sorts slides by `sortOrder` before rendering");
    }


    // This test validates: Export-all-PNG sorts slides by `sortOrder` before rendering
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Export-all-PNG uses createRoot from react-domclient for off-screen rendering', async ({ page }) => {
    // Checkpoint 33: Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering
    // Section: Quick Test Workflows > Export — All-Slides ZIP Additional Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering",
      section: "Quick Test Workflows",
      subsection: "Export — All-Slides ZIP Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-033 ' + "Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering");
    }


    // This test validates: Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: After export-all-PNG completes root is unmounted and container is removed from D', async ({ page }) => {
    // Checkpoint 34: After export-all-PNG completes, root is unmounted and container is removed from DOM
    // Section: Quick Test Workflows > Export — All-Slides ZIP Additional Details

    // Navigate to the page
    await page.goto('/slides', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides/spec-023');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "After export-all-PNG completes, root is unmounted and container is removed from DOM",
      section: "Quick Test Workflows",
      subsection: "Export — All-Slides ZIP Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-034 ' + "After export-all-PNG completes, root is unmounted and container is removed from DOM");
    }


    // This test validates: After export-all-PNG completes, root is unmounted and container is removed from DOM
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
