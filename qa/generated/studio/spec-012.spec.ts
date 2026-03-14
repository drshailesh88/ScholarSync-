/**
 * Auto-generated Playwright test for studio/spec-012
 * Source: e2e/specs/studio/spec-012.md
 * Generated: 2026-03-14T01:11:23.180Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts studio spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';





import { assertStudioCheckpoint } from '../../module-assertions/studio';














test.describe('studio / spec-012', () => {
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

  test('cp-000: PDF export silently returns when apiexportpdf responds non-OK no error UI no con', async ({ page }) => {
    // Checkpoint 0: PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)
    // Section: Quick Test Workflows > Page Architecture (`src/app/(app)/studio/page.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)",
      section: "Quick Test Workflows",
      subsection: "Page Architecture (`src/app/(app)/studio/page.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-000 PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)');
    }


    // This test validates: PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Word export silently returns when apiexportdocx responds non-OK no error UI no c', async ({ page }) => {
    // Checkpoint 1: Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)
    // Section: Quick Test Workflows > Page Architecture (`src/app/(app)/studio/page.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)",
      section: "Quick Test Workflows",
      subsection: "Page Architecture (`src/app/(app)/studio/page.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-001 Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)');
    }


    // This test validates: Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Word export creates a temporary a element appends it to documentbody triggers cl', async ({ page }) => {
    // Checkpoint 2: Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL
    // Section: Quick Test Workflows > Page Architecture (`src/app/(app)/studio/page.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL",
      section: "Quick Test Workflows",
      subsection: "Page Architecture (`src/app/(app)/studio/page.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-002 Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL');
    }


    // This test validates: Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: getEditorContent reads HTML from documentquerySelectorProseMirrorinnerHTML retur', async ({ page }) => {
    // Checkpoint 3: `getEditorContent()` reads HTML from `document.querySelector(".ProseMirror")?.innerHTML` — returns empty string if no `.ProseMirror` element exists
    // Section: Quick Test Workflows > Page Architecture (`src/app/(app)/studio/page.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`getEditorContent()` reads HTML from `document.querySelector(\".ProseMirror\")?.innerHTML` — returns empty string if no `.ProseMirror` element exists",
      section: "Quick Test Workflows",
      subsection: "Page Architecture (`src/app/(app)/studio/page.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-003 `getEditorContent()` reads HTML from `document.querySelector(".ProseMirror")?.innerHTML` — returns empty string if no `.ProseMirror` element exists');
    }


    // This test validates: `getEditorContent()` reads HTML from `document.querySelector(".ProseMirror")?.innerHTML` — returns empty string if no `.ProseMirror` element exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Content-change save does NOT transition through unsaved goes directly from curre', async ({ page }) => {
    // Checkpoint 4: Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)
    // Section: Quick Test Workflows > Page Architecture (`src/app/(app)/studio/page.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)",
      section: "Quick Test Workflows",
      subsection: "Page Architecture (`src/app/(app)/studio/page.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-004 Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)');
    }


    // This test validates: Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Question mark button in the status bar between save indicator and export dropdow', async ({ page }) => {
    // Checkpoint 5: Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-005 Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`');
    }


    // This test validates: Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Question button styled w-8 h-8 rounded-lg text-ink-muted hovertext-ink bg-surfac', async ({ page }) => {
    // Checkpoint 6: Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-006 Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`');
    }


    // This test validates: Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Dialog renders as fixed full-screen overlay with bg-black50 backdrop at z-50', async ({ page }) => {
    // Checkpoint 7: Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-007 Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`');
    }


    // This test validates: Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Clicking the backdrop overlay dismisses the dialog onClickonClose on wrapper', async ({ page }) => {
    // Checkpoint 8: Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-008 Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)');
    }


    // This test validates: Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Dialog content stops propagation estopPropagation to prevent backdrop dismiss wh', async ({ page }) => {
    // Checkpoint 9: Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-009 Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside');
    }


    // This test validates: Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Dialog header Keyboard icon 20px text-brand title text Keyboard Shortcuts text-l', async ({ page }) => {
    // Checkpoint 10: Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-010 Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)');
    }


    // This test validates: Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Dialog close button X icon 20px in top-right of header', async ({ page }) => {
    // Checkpoint 11: Dialog close button: `X` icon (20px) in top-right of header
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog close button: `X` icon (20px) in top-right of header",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-011 Dialog close button: `X` icon (20px) in top-right of header');
    }


    // This test validates: Dialog close button: `X` icon (20px) in top-right of header
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Dialog max width max-w-2xl max height max-h-80vh overflow hidden on outer scroll', async ({ page }) => {
    // Checkpoint 12: Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-012 Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area');
    }


    // This test validates: Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Dialog has 4 shortcut categories displayed in order Formatting Structure Academi', async ({ page }) => {
    // Checkpoint 13: Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-013 Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`');
    }


    // This test validates: Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Formatting category lists 8 shortcuts Bold CmdB Italic CmdI Underline CmdU Strik', async ({ page }) => {
    // Checkpoint 14: "Formatting" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "\"Formatting\" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-014 "Formatting" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`');
    }


    // This test validates: "Formatting" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Structure category lists 8 shortcuts Heading 14 CmdShift1-4 Bullet List CmdShift', async ({ page }) => {
    // Checkpoint 15: "Structure" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "\"Structure\" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-015 "Structure" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`');
    }


    // This test validates: "Structure" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Academic category lists 3 shortcuts Insert Citation CmdShiftC Insert Footnote Cm', async ({ page }) => {
    // Checkpoint 16: "Academic" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "\"Academic\" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-016 "Academic" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`');
    }


    // This test validates: "Academic" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Tools category lists 5 shortcuts Undo CmdZ Redo CmdShiftZ Save CmdS Toggle Comme', async ({ page }) => {
    // Checkpoint 17: "Tools" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "\"Tools\" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-017 "Tools" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`');
    }


    // This test validates: "Tools" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Shortcuts displayed in 2-column grid grid-cols-2 gap-2 within each category', async ({ page }) => {
    // Checkpoint 18: Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-018 Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category');
    }


    // This test validates: Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Each shortcut row shows description text on left and key pills on right px-15 py', async ({ page }) => {
    // Checkpoint 19: Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-019 Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)');
    }


    // This test validates: Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Category headers styled as uppercase tracking-wider text-xs font-semibold text-i', async ({ page }) => {
    // Checkpoint 20: Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted
    // Section: Quick Test Workflows > Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-020 Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted');
    }


    // This test validates: Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: StarterKit configured with heading levels 1 2 3 4 5 6 supports 6 heading levels ', async ({ page }) => {
    // Checkpoint 21: StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-021 StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4');
    }


    // This test validates: StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Highlight extension configured with multicolor true', async ({ page }) => {
    // Checkpoint 22: Highlight extension configured with `multicolor: true`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Highlight extension configured with `multicolor: true`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-022 Highlight extension configured with `multicolor: true`');
    }


    // This test validates: Highlight extension configured with `multicolor: true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: TextAlign extension configured for types heading paragraph', async ({ page }) => {
    // Checkpoint 23: TextAlign extension configured for types `["heading", "paragraph"]`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "TextAlign extension configured for types `[\"heading\", \"paragraph\"]`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-023 TextAlign extension configured for types `["heading", "paragraph"]`');
    }


    // This test validates: TextAlign extension configured for types `["heading", "paragraph"]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: TextStyle Color and FontFamily extensions loaded enabling inline color and font ', async ({ page }) => {
    // Checkpoint 24: TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-024 TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes');
    }


    // This test validates: TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Link extension configured openOnClick false autolink true linkOnPaste true', async ({ page }) => {
    // Checkpoint 25: Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-025 Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`');
    }


    // This test validates: Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Table extension configured resizable true HTMLAttributes class academic-table', async ({ page }) => {
    // Checkpoint 26: Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-026 Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`');
    }


    // This test validates: Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Image extension configured inline false allowBase64 true', async ({ page }) => {
    // Checkpoint 27: Image extension configured: `inline: false`, `allowBase64: true`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Image extension configured: `inline: false`, `allowBase64: true`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-027 Image extension configured: `inline: false`, `allowBase64: true`');
    }


    // This test validates: Image extension configured: `inline: false`, `allowBase64: true`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: TaskItem extension configured nested true supports nested task lists', async ({ page }) => {
    // Checkpoint 28: TaskItem extension configured: `nested: true` — supports nested task lists
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "TaskItem extension configured: `nested: true` — supports nested task lists",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-028 TaskItem extension configured: `nested: true` — supports nested task lists');
    }


    // This test validates: TaskItem extension configured: `nested: true` — supports nested task lists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Placeholder text reads Start typing or press for AI commands', async ({ page }) => {
    // Checkpoint 29: Placeholder text reads `Start typing or press '/' for AI commands...`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Placeholder text reads `Start typing or press '/' for AI commands...`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-029 Placeholder text reads `Start typing or press \'/\' for AI commands...`');
    }


    // This test validates: Placeholder text reads `Start typing or press '/' for AI commands...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: CharacterCount and Typography extensions loaded', async ({ page }) => {
    // Checkpoint 30: CharacterCount and Typography extensions loaded
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "CharacterCount and Typography extensions loaded",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-030 CharacterCount and Typography extensions loaded');
    }


    // This test validates: CharacterCount and Typography extensions loaded
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: immediatelyRender false set on useEditor prevents server-side rendering mismatch', async ({ page }) => {
    // Checkpoint 31: `immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-031 `immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch');
    }


    // This test validates: `immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Editor editorProps attributes class academic-editor-content max-w-none focusoutl', async ({ page }) => {
    // Checkpoint 32: Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-032 Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`');
    }


    // This test validates: Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Editor spellcheck attribute set to true', async ({ page }) => {
    // Checkpoint 33: Editor `spellcheck` attribute set to `"true"`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Editor `spellcheck` attribute set to `\"true\"`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-033 Editor `spellcheck` attribute set to `"true"`');
    }


    // This test validates: Editor `spellcheck` attribute set to `"true"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: CmdS key handler in editorProps calls flushSaveviewstatedoc saves immediately by', async ({ page }) => {
    // Checkpoint 34: `Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-034 `Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer');
    }


    // This test validates: `Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer
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
