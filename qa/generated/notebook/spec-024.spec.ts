/**
 * Auto-generated Playwright test for notebook/spec-024
 * Source: e2e/specs/notebook/spec-024.md
 * Generated: 2026-03-14T10:51:00.159Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts notebook spec-024
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';








import { assertNotebookCheckpoint } from '../../module-assertions/notebook';











test.describe('notebook / spec-024', () => {
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

  test('cp-000: generateMetadata returns title Not Found - ScholarSync when token lookup returns', async ({ page }) => {
    // Checkpoint 0: `generateMetadata` returns `{ title: "Not Found - ScholarSync" }` when token lookup returns null
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`generateMetadata` returns `{ title: \"Not Found - ScholarSync\" }` when token lookup returns null",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-000 ' + "`generateMetadata` returns `{ title: \"Not Found - ScholarSync\" }` when token lookup returns null");
    }


    // This test validates: `generateMetadata` returns `{ title: "Not Found - ScholarSync" }` when token lookup returns null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: generateMetadata returns description Shared notebook by ownerName for valid note', async ({ page }) => {
    // Checkpoint 1: `generateMetadata` returns `{ description: "Shared notebook by {ownerName}" }` for valid notebooks
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`generateMetadata` returns `{ description: \"Shared notebook by {ownerName}\" }` for valid notebooks",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-001 ' + "`generateMetadata` returns `{ description: \"Shared notebook by {ownerName}\" }` for valid notebooks");
    }


    // This test validates: `generateMetadata` returns `{ description: "Shared notebook by {ownerName}" }` for valid notebooks
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Shared viewer uses hardcoded hex colors bg-020617 text-f1f5f9 text-64748b bg-636', async ({ page }) => {
    // Checkpoint 2: Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-002 ' + "Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook");
    }


    // This test validates: Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Shared viewer citation pills use bg-6366f110 border-6366f120 text-818cf8 hardcod', async ({ page }) => {
    // Checkpoint 3: Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-003 ' + "Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes");
    }


    // This test validates: Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Shared viewer user messages use bg-white5 not bg-surface-raised like the main no', async ({ page }) => {
    // Checkpoint 4: Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-004 ' + "Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)");
    }


    // This test validates: Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Shared viewer date in header uses toLocaleDateString with year numeric month lon', async ({ page }) => {
    // Checkpoint 5: Shared viewer date in header uses `toLocaleDateString` with `{ year: "numeric", month: "long", day: "numeric" }`
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer date in header uses `toLocaleDateString` with `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-005 ' + "Shared viewer date in header uses `toLocaleDateString` with `{ year: \"numeric\", month: \"long\", day: \"numeric\" }`");
    }


    // This test validates: Shared viewer date in header uses `toLocaleDateString` with `{ year: "numeric", month: "long", day: "numeric" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: NotebookPasswordGate clears error state setError on each new submission before s', async ({ page }) => {
    // Checkpoint 6: `NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`NotebookPasswordGate` clears error state (`setError(\"\")`) on each new submission before setting loading",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-006 ' + "`NotebookPasswordGate` clears error state (`setError(\"\")`) on each new submission before setting loading");
    }


    // This test validates: `NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Shared viewer defensively checks ArrayisArraymsgretrieved_chunks before casting ', async ({ page }) => {
    // Checkpoint 7: Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array
    // Section: Quick Test Workflows > Shared Notebook — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array",
      section: "Quick Test Workflows",
      subsection: "Shared Notebook — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-007 ' + "Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array");
    }


    // This test validates: Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Paper cards start expanded by default useStatetrue for expanded', async ({ page }) => {
    // Checkpoint 8: Paper cards start expanded by default (`useState(true)` for `expanded`)
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Paper cards start expanded by default (`useState(true)` for `expanded`)",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-008 ' + "Paper cards start expanded by default (`useState(true)` for `expanded`)");
    }


    // This test validates: Paper cards start expanded by default (`useState(true)` for `expanded`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: getErrorMessage utility returns errormessage for Error instances otherwise Unabl', async ({ page }) => {
    // Checkpoint 9: `getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`getErrorMessage()` utility returns `error.message` for Error instances, otherwise `\"Unable to generate notes right now. Please try again.\"`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-009 ' + "`getErrorMessage()` utility returns `error.message` for Error instances, otherwise `\"Unable to generate notes right now. Please try again.\"`");
    }


    // This test validates: `getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Panel backdrop opacity transitions from opacity-0 to opacity-100 with duration-2', async ({ page }) => {
    // Checkpoint 10: Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-010 ' + "Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`");
    }


    // This test validates: Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Panel slide-in transform transitions from translate-x-full to translate-x-0 with', async ({ page }) => {
    // Checkpoint 11: Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-011 ' + "Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`");
    }


    // This test validates: Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Panel max-width is max-w-md not full sidebar width', async ({ page }) => {
    // Checkpoint 12: Panel max-width is `max-w-md` (not full sidebar width)
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Panel max-width is `max-w-md` (not full sidebar width)",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-012 ' + "Panel max-width is `max-w-md` (not full sidebar width)");
    }


    // This test validates: Panel max-width is `max-w-md` (not full sidebar width)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Panel uses glass-panel class with shadow-2xl', async ({ page }) => {
    // Checkpoint 13: Panel uses `glass-panel` class with `shadow-2xl`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Panel uses `glass-panel` class with `shadow-2xl`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-013 ' + "Panel uses `glass-panel` class with `shadow-2xl`");
    }


    // This test validates: Panel uses `glass-panel` class with `shadow-2xl`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Paper notes fetch uses a cancelled flag pattern via useEffect cleanup to prevent', async ({ page }) => {
    // Checkpoint 14: Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-014 ' + "Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount");
    }


    // This test validates: Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Generate All button disabled when generatingPaperssize 0 any paper generating wi', async ({ page }) => {
    // Checkpoint 15: `Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-015 ' + "`Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`");
    }


    // This test validates: `Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Panel header count uses singularplural 1 paper vs N papers', async ({ page }) => {
    // Checkpoint 16: Panel header count uses singular/plural: `"1 paper"` vs `"N papers"`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Panel header count uses singular/plural: `\"1 paper\"` vs `\"N papers\"`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-016 ' + "Panel header count uses singular/plural: `\"1 paper\"` vs `\"N papers\"`");
    }


    // This test validates: Panel header count uses singular/plural: `"1 paper"` vs `"N papers"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Suggested questions section header ChatCircleDots icon size 10 Ask about this pa', async ({ page }) => {
    // Checkpoint 17: Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Suggested questions section header: `ChatCircleDots` icon (size 10) + `\"Ask about this paper\"` label",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-017 ' + "Suggested questions section header: `ChatCircleDots` icon (size 10) + `\"Ask about this paper\"` label");
    }


    // This test validates: Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Question items use ArrowRight icon not generic arrow with text-brand50 default g', async ({ page }) => {
    // Checkpoint 18: Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-018 ' + "Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover");
    }


    // This test validates: Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Question text is line-clamped to 1 line via line-clamp-1', async ({ page }) => {
    // Checkpoint 19: Question text is line-clamped to 1 line via `line-clamp-1`
    // Section: Quick Test Workflows > Source Notes Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Question text is line-clamped to 1 line via `line-clamp-1`",
      section: "Quick Test Workflows",
      subsection: "Source Notes Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-019 ' + "Question text is line-clamped to 1 line via `line-clamp-1`");
    }


    // This test validates: Question text is line-clamped to 1 line via `line-clamp-1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: normalizedPaperIds deduplicates via new Set sorts numerically then filters out n', async ({ page }) => {
    // Checkpoint 20: `normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-020 ' + "`normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values");
    }


    // This test validates: `normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: PlayPause button has dynamic title Pause when playing Play otherwise', async ({ page }) => {
    // Checkpoint 21: Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Play/Pause button has dynamic `title`: `\"Pause\"` when playing, `\"Play\"` otherwise",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-021 ' + "Play/Pause button has dynamic `title`: `\"Pause\"` when playing, `\"Play\"` otherwise");
    }


    // This test validates: Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Play icon and Pause icon both use weightfill not the default regular weight', async ({ page }) => {
    // Checkpoint 22: Play icon and Pause icon both use `weight="fill"` (not the default regular weight)
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Play icon and Pause icon both use `weight=\"fill\"` (not the default regular weight)",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-022 ' + "Play icon and Pause icon both use `weight=\"fill\"` (not the default regular weight)");
    }


    // This test validates: Play icon and Pause icon both use `weight="fill"` (not the default regular weight)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Speed button has titlePlayback speed', async ({ page }) => {
    // Checkpoint 23: Speed button has `title="Playback speed"`
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Speed button has `title=\"Playback speed\"`",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-023 ' + "Speed button has `title=\"Playback speed\"`");
    }


    // This test validates: Speed button has `title="Playback speed"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Download button has titleDownload audio', async ({ page }) => {
    // Checkpoint 24: Download button has `title="Download audio"`
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Download button has `title=\"Download audio\"`",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-024 ' + "Download button has `title=\"Download audio\"`");
    }


    // This test validates: Download button has `title="Download audio"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Audio element uses preloadauto attribute', async ({ page }) => {
    // Checkpoint 25: Audio element uses `preload="auto"` attribute
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Audio element uses `preload=\"auto\"` attribute",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-025 ' + "Audio element uses `preload=\"auto\"` attribute");
    }


    // This test validates: Audio element uses `preload="auto"` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Seek slider value clamped MathmincurrentTime durationSeconds for value Mathmaxdu', async ({ page }) => {
    // Checkpoint 26: Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-026 ' + "Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max");
    }


    // This test validates: Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Options toggle link text is literally Options visible only when canControlAudio ', async ({ page }) => {
    // Checkpoint 27: Options toggle link text is literally `"Options"` — visible only when `canControlAudio && !showOptions`
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Options toggle link text is literally `\"Options\"` — visible only when `canControlAudio && !showOptions`",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-027 ' + "Options toggle link text is literally `\"Options\"` — visible only when `canControlAudio && !showOptions`");
    }


    // This test validates: Options toggle link text is literally `"Options"` — visible only when `canControlAudio && !showOptions`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: formatTime returns 000 for non-finite zero or negative values formats as MSS wit', async ({ page }) => {
    // Checkpoint 28: `formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`formatTime` returns `\"0:00\"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-028 ' + "`formatTime` returns `\"0:00\"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds");
    }


    // This test validates: `formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Time display elements use tabular-nums class and fixed w-8 width for stable layo', async ({ page }) => {
    // Checkpoint 29: Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-029 ' + "Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout");
    }


    // This test validates: Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Reset effect clears audioUrl script durationSeconds currentTime showTranscript e', async ({ page }) => {
    // Checkpoint 30: Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-030 ' + "Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`");
    }


    // This test validates: Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: In idle state before first generation no GenerateRegenerate button appears gener', async ({ page }) => {
    // Checkpoint 31: In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-031 ' + "In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`");
    }


    // This test validates: In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Download creates a temporary anchor element appended to documentbody sets anchor', async ({ page }) => {
    // Checkpoint 32: Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = "noopener"`, clicks it, then removes it
    // Section: Quick Test Workflows > Audio Overview Panel — Additional Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = \"noopener\"`, clicks it, then removes it",
      section: "Quick Test Workflows",
      subsection: "Audio Overview Panel — Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-032 ' + "Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = \"noopener\"`, clicks it, then removes it");
    }


    // This test validates: Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = "noopener"`, clicks it, then removes it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: createConversation defaults title to New Conversation when title param is falsy', async ({ page }) => {
    // Checkpoint 33: `createConversation` defaults title to `"New Conversation"` when title param is falsy
    // Section: Quick Test Workflows > Conversation Actions — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`createConversation` defaults title to `\"New Conversation\"` when title param is falsy",
      section: "Quick Test Workflows",
      subsection: "Conversation Actions — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-033 ' + "`createConversation` defaults title to `\"New Conversation\"` when title param is falsy");
    }


    // This test validates: `createConversation` defaults title to `"New Conversation"` when title param is falsy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: createConversation defaults paper_ids to empty array when not provided', async ({ page }) => {
    // Checkpoint 34: `createConversation` defaults `paper_ids` to empty array when not provided
    // Section: Quick Test Workflows > Conversation Actions — Server-Side Details

    // Navigate to the page
    await page.goto('/notebook', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/notebook/spec-024');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertNotebookCheckpoint({
      page,
      description: "`createConversation` defaults `paper_ids` to empty array when not provided",
      section: "Quick Test Workflows",
      subsection: "Conversation Actions — Server-Side Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled notebook checkpoint: cp-034 ' + "`createConversation` defaults `paper_ids` to empty array when not provided");
    }


    // This test validates: `createConversation` defaults `paper_ids` to empty array when not provided
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
