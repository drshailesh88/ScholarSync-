/**
 * Auto-generated Playwright test for editor/spec-036
 * Source: e2e/specs/editor/spec-036.md
 * Generated: 2026-03-15T17:10:43.040Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-036
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-036', () => {
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

  test('cp-000: Studio Toolbar reference count badge uses bg-blue-100 darkbg-blue-90040 text-blu', async ({ page }) => {
    // Checkpoint 0: Studio `Toolbar` reference count badge uses `bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` reference count badge uses `bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 ' + "Studio `Toolbar` reference count badge uses `bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none`");
    }


    // This test validates: Studio `Toolbar` reference count badge uses `bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Studio Toolbar returns null renders nothing when editor prop is null', async ({ page }) => {
    // Checkpoint 1: Studio `Toolbar` returns `null` (renders nothing) when `editor` prop is null
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` returns `null` (renders nothing) when `editor` prop is null",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 ' + "Studio `Toolbar` returns `null` (renders nothing) when `editor` prop is null");
    }


    // This test validates: Studio `Toolbar` returns `null` (renders nothing) when `editor` prop is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Studio Toolbar container uses glass-panel CSS class with border-b border-border', async ({ page }) => {
    // Checkpoint 2: Studio `Toolbar` container uses `glass-panel` CSS class with `border-b border-border`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` container uses `glass-panel` CSS class with `border-b border-border`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 ' + "Studio `Toolbar` container uses `glass-panel` CSS class with `border-b border-border`");
    }


    // This test validates: Studio `Toolbar` container uses `glass-panel` CSS class with `border-b border-border`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Studio Toolbar has a w-px h-5 bg-border mx-1 separator div between formatting bu', async ({ page }) => {
    // Checkpoint 3: Studio `Toolbar` has a `w-px h-5 bg-border mx-1` separator div between formatting buttons and citation buttons
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` has a `w-px h-5 bg-border mx-1` separator div between formatting buttons and citation buttons",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 ' + "Studio `Toolbar` has a `w-px h-5 bg-border mx-1` separator div between formatting buttons and citation buttons");
    }


    // This test validates: Studio `Toolbar` has a `w-px h-5 bg-border mx-1` separator div between formatting buttons and citation buttons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: All Studio Toolbar buttons use onMouseDown with eventpreventDefault to preserve ', async ({ page }) => {
    // Checkpoint 4: All Studio `Toolbar` buttons use `onMouseDown` with `event.preventDefault()` to preserve text selection
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "All Studio `Toolbar` buttons use `onMouseDown` with `event.preventDefault()` to preserve text selection",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 ' + "All Studio `Toolbar` buttons use `onMouseDown` with `event.preventDefault()` to preserve text selection");
    }


    // This test validates: All Studio `Toolbar` buttons use `onMouseDown` with `event.preventDefault()` to preserve text selection
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Active Studio Toolbar buttons use bg-brand10 text-brand styling inactive use tex', async ({ page }) => {
    // Checkpoint 5: Active Studio `Toolbar` buttons use `bg-brand/10 text-brand` styling; inactive use `text-ink-muted hover:text-ink hover:bg-surface-raised`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Active Studio `Toolbar` buttons use `bg-brand/10 text-brand` styling; inactive use `text-ink-muted hover:text-ink hover:bg-surface-raised`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 ' + "Active Studio `Toolbar` buttons use `bg-brand/10 text-brand` styling; inactive use `text-ink-muted hover:text-ink hover:bg-surface-raised`");
    }


    // This test validates: Active Studio `Toolbar` buttons use `bg-brand/10 text-brand` styling; inactive use `text-ink-muted hover:text-ink hover:bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: TiptapEditor mounts SelectionToolbar LinkPopover DocumentOutline and FootnoteSec', async ({ page }) => {
    // Checkpoint 6: `TiptapEditor` mounts `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` as sibling components alongside `EditorContent` — making all four available on `/studio`
    // Section: Error Handling & Edge Cases > TiptapEditor Renders Floating Overlays on Studio

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` mounts `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` as sibling components alongside `EditorContent` — making all four available on `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Renders Floating Overlays on Studio",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 ' + "`TiptapEditor` mounts `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` as sibling components alongside `EditorContent` — making all four available on `/studio`");
    }


    // This test validates: `TiptapEditor` mounts `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` as sibling components alongside `EditorContent` — making all four available on `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: TiptapEditor floating overlays SelectionToolbar LinkPopover DocumentOutline are ', async ({ page }) => {
    // Checkpoint 7: `TiptapEditor` floating overlays (`SelectionToolbar`, `LinkPopover`, `DocumentOutline`) are conditionally rendered only when `editor` is non-null
    // Section: Error Handling & Edge Cases > TiptapEditor Renders Floating Overlays on Studio

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` floating overlays (`SelectionToolbar`, `LinkPopover`, `DocumentOutline`) are conditionally rendered only when `editor` is non-null",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Renders Floating Overlays on Studio",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 ' + "`TiptapEditor` floating overlays (`SelectionToolbar`, `LinkPopover`, `DocumentOutline`) are conditionally rendered only when `editor` is non-null");
    }


    // This test validates: `TiptapEditor` floating overlays (`SelectionToolbar`, `LinkPopover`, `DocumentOutline`) are conditionally rendered only when `editor` is non-null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: FootnoteSection is rendered outside the overlay conditional after the EditorCont', async ({ page }) => {
    // Checkpoint 8: `FootnoteSection` is rendered outside the overlay conditional, after the `EditorContent` container
    // Section: Error Handling & Edge Cases > TiptapEditor Renders Floating Overlays on Studio

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`FootnoteSection` is rendered outside the overlay conditional, after the `EditorContent` container",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Renders Floating Overlays on Studio",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 ' + "`FootnoteSection` is rendered outside the overlay conditional, after the `EditorContent` container");
    }


    // This test validates: `FootnoteSection` is rendered outside the overlay conditional, after the `EditorContent` container
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: TiptapEditor flushSave CmdS path extracts plain text via doctextBetween0 doccont', async ({ page }) => {
    // Checkpoint 9: `TiptapEditor` `flushSave` (Cmd+S path) extracts plain text via `doc.textBetween(0, doc.content.size, "\n")` using newline as block separator
    // Section: Error Handling & Edge Cases > TiptapEditor Save Behavior Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` `flushSave` (Cmd+S path) extracts plain text via `doc.textBetween(0, doc.content.size, \"\\n\")` using newline as block separator",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Save Behavior Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 ' + "`TiptapEditor` `flushSave` (Cmd+S path) extracts plain text via `doc.textBetween(0, doc.content.size, \"\\n\")` using newline as block separator");
    }


    // This test validates: `TiptapEditor` `flushSave` (Cmd+S path) extracts plain text via `doc.textBetween(0, doc.content.size, "\n")` using newline as block separator
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: TiptapEditor debounced save extracts plain text via edgetText with no block sepa', async ({ page }) => {
    // Checkpoint 10: `TiptapEditor` debounced save extracts plain text via `ed.getText()` with no block separator argument — producing different plain text output from `flushSave`
    // Section: Error Handling & Edge Cases > TiptapEditor Save Behavior Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` debounced save extracts plain text via `ed.getText()` with no block separator argument — producing different plain text output from `flushSave`",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Save Behavior Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 ' + "`TiptapEditor` debounced save extracts plain text via `ed.getText()` with no block separator argument — producing different plain text output from `flushSave`");
    }


    // This test validates: `TiptapEditor` debounced save extracts plain text via `ed.getText()` with no block separator argument — producing different plain text output from `flushSave`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: TiptapEditor debounced save computes word count inline with textsplitsfilterw wl', async ({ page }) => {
    // Checkpoint 11: `TiptapEditor` debounced save computes word count inline with `text.split(/\s+/).filter((w) => w.length > 0).length` rather than using `getDocumentWordCount()` helper
    // Section: Error Handling & Edge Cases > TiptapEditor Save Behavior Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` debounced save computes word count inline with `text.split(/\\s+/).filter((w) => w.length > 0).length` rather than using `getDocumentWordCount()` helper",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Save Behavior Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 ' + "`TiptapEditor` debounced save computes word count inline with `text.split(/\\s+/).filter((w) => w.length > 0).length` rather than using `getDocumentWordCount()` helper");
    }


    // This test validates: `TiptapEditor` debounced save computes word count inline with `text.split(/\s+/).filter((w) => w.length > 0).length` rather than using `getDocumentWordCount()` helper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: TiptapEditor flushSave computes word count via getDocumentWordCountdoc ProseMirr', async ({ page }) => {
    // Checkpoint 12: `TiptapEditor` `flushSave` computes word count via `getDocumentWordCount(doc)` (ProseMirror-level), while debounced save uses string-level splitting — potentially producing different counts
    // Section: Error Handling & Edge Cases > TiptapEditor Save Behavior Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` `flushSave` computes word count via `getDocumentWordCount(doc)` (ProseMirror-level), while debounced save uses string-level splitting — potentially producing different counts",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Save Behavior Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 ' + "`TiptapEditor` `flushSave` computes word count via `getDocumentWordCount(doc)` (ProseMirror-level), while debounced save uses string-level splitting — potentially producing different counts");
    }


    // This test validates: `TiptapEditor` `flushSave` computes word count via `getDocumentWordCount(doc)` (ProseMirror-level), while debounced save uses string-level splitting — potentially producing different counts
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: TiptapEditor content key change with null content calls editorcommandsclearConte', async ({ page }) => {
    // Checkpoint 13: `TiptapEditor` content key change with null `content` calls `editor.commands.clearContent()` to reset the editor for a fresh document
    // Section: Error Handling & Edge Cases > TiptapEditor Save Behavior Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`TiptapEditor` content key change with null `content` calls `editor.commands.clearContent()` to reset the editor for a fresh document",
      section: "Error Handling & Edge Cases",
      subsection: "TiptapEditor Save Behavior Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 ' + "`TiptapEditor` content key change with null `content` calls `editor.commands.clearContent()` to reset the editor for a fresh document");
    }


    // This test validates: `TiptapEditor` content key change with null `content` calls `editor.commands.clearContent()` to reset the editor for a fresh document
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Editor page loading spinner uses Spinner icon from phosphor-iconsreact with size', async ({ page }) => {
    // Checkpoint 14: Editor page loading spinner uses `Spinner` icon (from `@phosphor-icons/react`) with size 32, `animate-spin text-brand` class, and `mb-3` margin below
    // Section: Error Handling & Edge Cases > Editor Page vs Studio Loading State Icons

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor page loading spinner uses `Spinner` icon (from `@phosphor-icons/react`) with size 32, `animate-spin text-brand` class, and `mb-3` margin below",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page vs Studio Loading State Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 ' + "Editor page loading spinner uses `Spinner` icon (from `@phosphor-icons/react`) with size 32, `animate-spin text-brand` class, and `mb-3` margin below");
    }


    // This test validates: Editor page loading spinner uses `Spinner` icon (from `@phosphor-icons/react`) with size 32, `animate-spin text-brand` class, and `mb-3` margin below
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Studio loading spinner uses CircleNotch icon with size 28 and animate-spin text-', async ({ page }) => {
    // Checkpoint 15: Studio loading spinner uses `CircleNotch` icon with size 28 and `animate-spin text-brand` class — a different icon from the editor page
    // Section: Error Handling & Edge Cases > Editor Page vs Studio Loading State Icons

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio loading spinner uses `CircleNotch` icon with size 28 and `animate-spin text-brand` class — a different icon from the editor page",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page vs Studio Loading State Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 ' + "Studio loading spinner uses `CircleNotch` icon with size 28 and `animate-spin text-brand` class — a different icon from the editor page");
    }


    // This test validates: Studio loading spinner uses `CircleNotch` icon with size 28 and `animate-spin text-brand` class — a different icon from the editor page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: SelectionToolbar icon weight changes dynamically weightactive bold regular for e', async ({ page }) => {
    // Checkpoint 16: `SelectionToolbar` icon weight changes dynamically: `weight={active ? "bold" : "regular"}` for each `ToolbarButton` icon
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` icon weight changes dynamically: `weight={active ? \"bold\" : \"regular\"}` for each `ToolbarButton` icon",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 ' + "`SelectionToolbar` icon weight changes dynamically: `weight={active ? \"bold\" : \"regular\"}` for each `ToolbarButton` icon");
    }


    // This test validates: `SelectionToolbar` icon weight changes dynamically: `weight={active ? "bold" : "regular"}` for each `ToolbarButton` icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: SelectionToolbar icon size is 16 for all formatting buttons', async ({ page }) => {
    // Checkpoint 17: `SelectionToolbar` icon size is `16` for all formatting buttons
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` icon size is `16` for all formatting buttons",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 ' + "`SelectionToolbar` icon size is `16` for all formatting buttons");
    }


    // This test validates: `SelectionToolbar` icon size is `16` for all formatting buttons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: SelectionToolbar Y position is calculated as starttop - 8 8px gap above selectio', async ({ page }) => {
    // Checkpoint 18: `SelectionToolbar` Y position is calculated as `start.top - 8` (8px gap above selection)
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` Y position is calculated as `start.top - 8` (8px gap above selection)",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 ' + "`SelectionToolbar` Y position is calculated as `start.top - 8` (8px gap above selection)");
    }


    // This test validates: `SelectionToolbar` Y position is calculated as `start.top - 8` (8px gap above selection)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: SelectionToolbar container uses fixed z-50 positioning with CSS transform transl', async ({ page }) => {
    // Checkpoint 19: `SelectionToolbar` container uses `fixed z-50` positioning with CSS `transform: translate(-50%, -100%)`
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` container uses `fixed z-50` positioning with CSS `transform: translate(-50%, -100%)`",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 ' + "`SelectionToolbar` container uses `fixed z-50` positioning with CSS `transform: translate(-50%, -100%)`");
    }


    // This test validates: `SelectionToolbar` container uses `fixed z-50` positioning with CSS `transform: translate(-50%, -100%)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: SelectionToolbar style dropdown popup width is w-44 176px', async ({ page }) => {
    // Checkpoint 20: `SelectionToolbar` style dropdown popup width is `w-44` (176px)
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` style dropdown popup width is `w-44` (176px)",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 ' + "`SelectionToolbar` style dropdown popup width is `w-44` (176px)");
    }


    // This test validates: `SelectionToolbar` style dropdown popup width is `w-44` (176px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Highlight color circle buttons are w-5 h-5 rounded-full 20px diameter with hover', async ({ page }) => {
    // Checkpoint 21: Highlight color circle buttons are `w-5 h-5 rounded-full` (20px diameter) with `hover:scale-110` animation
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Highlight color circle buttons are `w-5 h-5 rounded-full` (20px diameter) with `hover:scale-110` animation",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 ' + "Highlight color circle buttons are `w-5 h-5 rounded-full` (20px diameter) with `hover:scale-110` animation");
    }


    // This test validates: Highlight color circle buttons are `w-5 h-5 rounded-full` (20px diameter) with `hover:scale-110` animation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: SelectionToolbar inner container classes bg-surface border border-border rounded', async ({ page }) => {
    // Checkpoint 22: `SelectionToolbar` inner container classes: `bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5`
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` inner container classes: `bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5`",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 ' + "`SelectionToolbar` inner container classes: `bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5`");
    }


    // This test validates: `SelectionToolbar` inner container classes: `bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: SelectionToolbar Separator component renders w-px h-5 bg-border mx-05', async ({ page }) => {
    // Checkpoint 23: `SelectionToolbar` `Separator` component renders `w-px h-5 bg-border mx-0.5`
    // Section: Error Handling & Edge Cases > SelectionToolbar Rendering Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`SelectionToolbar` `Separator` component renders `w-px h-5 bg-border mx-0.5`",
      section: "Error Handling & Edge Cases",
      subsection: "SelectionToolbar Rendering Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 ' + "`SelectionToolbar` `Separator` component renders `w-px h-5 bg-border mx-0.5`");
    }


    // This test validates: `SelectionToolbar` `Separator` component renders `w-px h-5 bg-border mx-0.5`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Studio page renders its own KeyboardShortcutsDialog component triggered by a Que', async ({ page }) => {
    // Checkpoint 24: Studio page renders its own `KeyboardShortcutsDialog` component, triggered by a `Question` icon button in the center toolbar — keyboard shortcuts help is available on both `/editor/[id]` and `/studio`
    // Section: Error Handling & Edge Cases > Studio KeyboardShortcutsDialog Availability

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio page renders its own `KeyboardShortcutsDialog` component, triggered by a `Question` icon button in the center toolbar — keyboard shortcuts help is available on both `/editor/[id]` and `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio KeyboardShortcutsDialog Availability",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 ' + "Studio page renders its own `KeyboardShortcutsDialog` component, triggered by a `Question` icon button in the center toolbar — keyboard shortcuts help is available on both `/editor/[id]` and `/studio`");
    }


    // This test validates: Studio page renders its own `KeyboardShortcutsDialog` component, triggered by a `Question` icon button in the center toolbar — keyboard shortcuts help is available on both `/editor/[id]` and `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Studio keyboard shortcuts button title is Keyboard shortcuts without the Cmd suf', async ({ page }) => {
    // Checkpoint 25: Studio keyboard shortcuts button `title` is `"Keyboard shortcuts"` — without the `"(Cmd+/)"` suffix used by the Editor page TopBar
    // Section: Error Handling & Edge Cases > Studio KeyboardShortcutsDialog Availability

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio keyboard shortcuts button `title` is `\"Keyboard shortcuts\"` — without the `\"(Cmd+/)\"` suffix used by the Editor page TopBar",
      section: "Error Handling & Edge Cases",
      subsection: "Studio KeyboardShortcutsDialog Availability",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 ' + "Studio keyboard shortcuts button `title` is `\"Keyboard shortcuts\"` — without the `\"(Cmd+/)\"` suffix used by the Editor page TopBar");
    }


    // This test validates: Studio keyboard shortcuts button `title` is `"Keyboard shortcuts"` — without the `"(Cmd+/)"` suffix used by the Editor page TopBar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Studio right panel shows ReferenceSidebar when sidebarOpen is true CommentSideba', async ({ page }) => {
    // Checkpoint 26: Studio right panel shows `ReferenceSidebar` when `sidebarOpen` is true, `CommentSidebar` when reference sidebar is closed but `commentSidebarOpen` is true, or the AI chat panel as fallback — only one of these three renders at a time
    // Section: Error Handling & Edge Cases > Studio AI Panel Mutual Exclusion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio right panel shows `ReferenceSidebar` when `sidebarOpen` is true, `CommentSidebar` when reference sidebar is closed but `commentSidebarOpen` is true, or the AI chat panel as fallback — only one of these three renders at a time",
      section: "Error Handling & Edge Cases",
      subsection: "Studio AI Panel Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 ' + "Studio right panel shows `ReferenceSidebar` when `sidebarOpen` is true, `CommentSidebar` when reference sidebar is closed but `commentSidebarOpen` is true, or the AI chat panel as fallback — only one of these three renders at a time");
    }


    // This test validates: Studio right panel shows `ReferenceSidebar` when `sidebarOpen` is true, `CommentSidebar` when reference sidebar is closed but `commentSidebarOpen` is true, or the AI chat panel as fallback — only one of these three renders at a time
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Studio CommentSidebar requires both studioDocid AND editorRefcurrent to be truth', async ({ page }) => {
    // Checkpoint 27: Studio `CommentSidebar` requires both `studioDoc?.id` AND `editorRef.current` to be truthy before rendering (in addition to `commentSidebarOpen`)
    // Section: Error Handling & Edge Cases > Studio AI Panel Mutual Exclusion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `CommentSidebar` requires both `studioDoc?.id` AND `editorRef.current` to be truthy before rendering (in addition to `commentSidebarOpen`)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio AI Panel Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 ' + "Studio `CommentSidebar` requires both `studioDoc?.id` AND `editorRef.current` to be truthy before rendering (in addition to `commentSidebarOpen`)");
    }


    // This test validates: Studio `CommentSidebar` requires both `studioDoc?.id` AND `editorRef.current` to be truthy before rendering (in addition to `commentSidebarOpen`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Studio ResearchSidebar renders as a direct child of the main flex container betw', async ({ page }) => {
    // Checkpoint 28: Studio `ResearchSidebar` renders as a direct child of the main flex container, between the center editor column and the right panel — it is NOT inside the AI panel
    // Section: Error Handling & Edge Cases > Studio AI Panel Mutual Exclusion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `ResearchSidebar` renders as a direct child of the main flex container, between the center editor column and the right panel — it is NOT inside the AI panel",
      section: "Error Handling & Edge Cases",
      subsection: "Studio AI Panel Mutual Exclusion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 ' + "Studio `ResearchSidebar` renders as a direct child of the main flex container, between the center editor column and the right panel — it is NOT inside the AI panel");
    }


    // This test validates: Studio `ResearchSidebar` renders as a direct child of the main flex container, between the center editor column and the right panel — it is NOT inside the AI panel
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Studio chat send button icon is PaperPlaneRight size 16 with bg-brand text-white', async ({ page }) => {
    // Checkpoint 29: Studio chat send button icon is `PaperPlaneRight` (size 16) with `bg-brand text-white hover:bg-brand-hover` styling
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio chat send button icon is `PaperPlaneRight` (size 16) with `bg-brand text-white hover:bg-brand-hover` styling",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 ' + "Studio chat send button icon is `PaperPlaneRight` (size 16) with `bg-brand text-white hover:bg-brand-hover` styling");
    }


    // This test validates: Studio chat send button icon is `PaperPlaneRight` (size 16) with `bg-brand text-white hover:bg-brand-hover` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Chat message text uses whitespace-pre-wrap text-xs leading-relaxed class for mul', async ({ page }) => {
    // Checkpoint 30: Chat message text uses `whitespace-pre-wrap text-xs leading-relaxed` class for multiline rendering
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Chat message text uses `whitespace-pre-wrap text-xs leading-relaxed` class for multiline rendering",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 ' + "Chat message text uses `whitespace-pre-wrap text-xs leading-relaxed` class for multiline rendering");
    }


    // This test validates: Chat message text uses `whitespace-pre-wrap text-xs leading-relaxed` class for multiline rendering
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Chat message container max width is max-w-85 of the panel width', async ({ page }) => {
    // Checkpoint 31: Chat message container max width is `max-w-[85%]` of the panel width
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Chat message container max width is `max-w-[85%]` of the panel width",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 ' + "Chat message container max width is `max-w-[85%]` of the panel width");
    }


    // This test validates: Chat message container max width is `max-w-[85%]` of the panel width
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: User message bubble style bg-surface-raised text-ink assistant message bubble st', async ({ page }) => {
    // Checkpoint 32: User message bubble style: `bg-surface-raised text-ink`; assistant message bubble style: `bg-brand/5 text-ink`
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "User message bubble style: `bg-surface-raised text-ink`; assistant message bubble style: `bg-brand/5 text-ink`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 ' + "User message bubble style: `bg-surface-raised text-ink`; assistant message bubble style: `bg-brand/5 text-ink`");
    }


    // This test validates: User message bubble style: `bg-surface-raised text-ink`; assistant message bubble style: `bg-brand/5 text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Loading animation sparkle avatar uses animate-spin class spinning sparkle icon d', async ({ page }) => {
    // Checkpoint 33: Loading animation sparkle avatar uses `animate-spin` class (spinning sparkle icon) — distinct from the bouncing dots below it
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Loading animation sparkle avatar uses `animate-spin` class (spinning sparkle icon) — distinct from the bouncing dots below it",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 ' + "Loading animation sparkle avatar uses `animate-spin` class (spinning sparkle icon) — distinct from the bouncing dots below it");
    }


    // This test validates: Loading animation sparkle avatar uses `animate-spin` class (spinning sparkle icon) — distinct from the bouncing dots below it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Loading animation bouncing dots are w-15 h-15 rounded-full bg-brand40 with anima', async ({ page }) => {
    // Checkpoint 34: Loading animation bouncing dots are `w-1.5 h-1.5 rounded-full bg-brand/40` with animation delays `0ms`, `150ms`, and `300ms`
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-036');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Loading animation bouncing dots are `w-1.5 h-1.5 rounded-full bg-brand/40` with animation delays `0ms`, `150ms`, and `300ms`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 ' + "Loading animation bouncing dots are `w-1.5 h-1.5 rounded-full bg-brand/40` with animation delays `0ms`, `150ms`, and `300ms`");
    }


    // This test validates: Loading animation bouncing dots are `w-1.5 h-1.5 rounded-full bg-brand/40` with animation delays `0ms`, `150ms`, and `300ms`
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
