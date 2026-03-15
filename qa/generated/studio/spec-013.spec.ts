/**
 * Auto-generated Playwright test for studio/spec-013
 * Source: e2e/specs/studio/spec-013.md
 * Generated: 2026-03-15T16:17:42.584Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts studio spec-013
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';





import { assertStudioCheckpoint } from '../../module-assertions/studio';














test.describe('studio / spec-013', () => {
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

  test('cp-000: flushSave extracts content via doctoJSON plain text via doctextBetween0 docconte', async ({ page }) => {
    // Checkpoint 0: `flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, "\n")`, and word count via `getDocumentWordCount(doc)`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, \"\\n\")`, and word count via `getDocumentWordCount(doc)`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-000 ' + "`flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, \"\\n\")`, and word count via `getDocumentWordCount(doc)`");
    }


    // This test validates: `flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, "\n")`, and word count via `getDocumentWordCount(doc)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Editor renders sub-components Toolbar SelectionToolbar LinkPopover DocumentOutli', async ({ page }) => {
    // Checkpoint 1: Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-001 ' + "Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`");
    }


    // This test validates: Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: SelectionToolbar and LinkPopover and DocumentOutline only render when editor is ', async ({ page }) => {
    // Checkpoint 2: `SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-002 ' + "`SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy");
    }


    // This test validates: `SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: OutlinePlugin configured with debounceMs 500', async ({ page }) => {
    // Checkpoint 3: OutlinePlugin configured with `debounceMs: 500`
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "OutlinePlugin configured with `debounceMs: 500`",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-003 ' + "OutlinePlugin configured with `debounceMs: 500`");
    }


    // This test validates: OutlinePlugin configured with `debounceMs: 500`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Initial outline computed 300ms after editor ready heading list only shown if 2 h', async ({ page }) => {
    // Checkpoint 4: Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-004 ' + "Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)");
    }


    // This test validates: Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: contentKey change triggers editorcommandssetContentcontent or editorcommandsclea', async ({ page }) => {
    // Checkpoint 5: `contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-005 ' + "`contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching");
    }


    // This test validates: `contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Debounced save timer cleaned up on unmount via useEffect cleanup', async ({ page }) => {
    // Checkpoint 6: Debounced save timer cleaned up on unmount via `useEffect` cleanup
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Debounced save timer cleaned up on unmount via `useEffect` cleanup",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-006 ' + "Debounced save timer cleaned up on unmount via `useEffect` cleanup");
    }


    // This test validates: Debounced save timer cleaned up on unmount via `useEffect` cleanup
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Custom CitationNumbering extension wraps createCitationPlugin as a ProseMirror p', async ({ page }) => {
    // Checkpoint 7: Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin
    // Section: Quick Test Workflows > TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin",
      section: "Quick Test Workflows",
      subsection: "TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-007 ' + "Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin");
    }


    // This test validates: Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: CmdShiftX toggles strikethrough', async ({ page }) => {
    // Checkpoint 8: `Cmd+Shift+X` toggles strikethrough
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+X` toggles strikethrough",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-008 ' + "`Cmd+Shift+X` toggles strikethrough");
    }


    // This test validates: `Cmd+Shift+X` toggles strikethrough
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: CmdShiftH toggles highlight', async ({ page }) => {
    // Checkpoint 9: `Cmd+Shift+H` toggles highlight
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+H` toggles highlight",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-009 ' + "`Cmd+Shift+H` toggles highlight");
    }


    // This test validates: `Cmd+Shift+H` toggles highlight
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: CmdShiftK inserts link prompts URL via windowpromptEnter URL', async ({ page }) => {
    // Checkpoint 10: `Cmd+Shift+K` inserts link — prompts URL via `window.prompt("Enter URL:")`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+K` inserts link — prompts URL via `window.prompt(\"Enter URL:\")`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-010 ' + "`Cmd+Shift+K` inserts link — prompts URL via `window.prompt(\"Enter URL:\")`");
    }


    // This test validates: `Cmd+Shift+K` inserts link — prompts URL via `window.prompt("Enter URL:")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: CmdShift toggles superscript', async ({ page }) => {
    // Checkpoint 11: `Cmd+Shift+.` toggles superscript
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+.` toggles superscript",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-011 ' + "`Cmd+Shift+.` toggles superscript");
    }


    // This test validates: `Cmd+Shift+.` toggles superscript
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: CmdShift toggles subscript', async ({ page }) => {
    // Checkpoint 12: `Cmd+Shift+,` toggles subscript
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+,` toggles subscript",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-012 ' + "`Cmd+Shift+,` toggles subscript");
    }


    // This test validates: `Cmd+Shift+,` toggles subscript
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: CmdShiftF inserts footnote prompts text via windowpromptFootnote text', async ({ page }) => {
    // Checkpoint 13: `Cmd+Shift+F` inserts footnote — prompts text via `window.prompt("Footnote text:")`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+F` inserts footnote — prompts text via `window.prompt(\"Footnote text:\")`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-013 ' + "`Cmd+Shift+F` inserts footnote — prompts text via `window.prompt(\"Footnote text:\")`");
    }


    // This test validates: `Cmd+Shift+F` inserts footnote — prompts text via `window.prompt("Footnote text:")`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Cmd toggles Comment Sidebar dispatches scholarsynceditor-action with action togg', async ({ page }) => {
    // Checkpoint 14: `Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: "toggle-comment-sidebar"`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: \"toggle-comment-sidebar\"`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-014 ' + "`Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: \"toggle-comment-sidebar\"`");
    }


    // This test validates: `Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: "toggle-comment-sidebar"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: CmdS forces immediate save handled in editorProps not in this extension', async ({ page }) => {
    // Checkpoint 15: `Cmd+S` forces immediate save (handled in editorProps, not in this extension)
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+S` forces immediate save (handled in editorProps, not in this extension)",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-015 ' + "`Cmd+S` forces immediate save (handled in editorProps, not in this extension)");
    }


    // This test validates: `Cmd+S` forces immediate save (handled in editorProps, not in this extension)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: CmdShiftZ is the redo shortcut from StarterKit not CtrlY as listed in section 15', async ({ page }) => {
    // Checkpoint 16: `Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-016 ' + "`Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15");
    }


    // This test validates: `Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: CmdShiftEnter inserts horizontal rule', async ({ page }) => {
    // Checkpoint 17: `Cmd+Shift+Enter` inserts horizontal rule
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+Enter` inserts horizontal rule",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-017 ' + "`Cmd+Shift+Enter` inserts horizontal rule");
    }


    // This test validates: `Cmd+Shift+Enter` inserts horizontal rule
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Heading shortcuts in the extension use Mod-Shift-1 through Mod-Shift-4 ie CmdShi', async ({ page }) => {
    // Checkpoint 18: Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-018 ' + "Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`");
    }


    // This test validates: Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: CmdShiftC in the extension dispatches scholarsynceditor-action with action inser', async ({ page }) => {
    // Checkpoint 19: `Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: "insert-citation"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: \"insert-citation\"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-019 ' + "`Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: \"insert-citation\"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`");
    }


    // This test validates: `Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: "insert-citation"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: CmdShiftR in the extension dispatches scholarsynceditor-action with action toggl', async ({ page }) => {
    // Checkpoint 20: `Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: "toggle-reference-sidebar"` — the page has a separate `document.addEventListener("keydown")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`
    // Section: Quick Test Workflows > Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: \"toggle-reference-sidebar\"` — the page has a separate `document.addEventListener(\"keydown\")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`",
      section: "Quick Test Workflows",
      subsection: "Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-020 ' + "`Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: \"toggle-reference-sidebar\"` — the page has a separate `document.addEventListener(\"keydown\")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`");
    }


    // This test validates: `Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: "toggle-reference-sidebar"` — the page has a separate `document.addEventListener("keydown")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 23 total slash commands defined in structuralCommands array', async ({ page }) => {
    // Checkpoint 21: 23 total slash commands defined in `structuralCommands` array
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "23 total slash commands defined in `structuralCommands` array",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-021 ' + "23 total slash commands defined in `structuralCommands` array");
    }


    // This test validates: 23 total slash commands defined in `structuralCommands` array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Slash trigger character is allowed at start of parent block parentOffset 0 or af', async ({ page }) => {
    // Checkpoint 22: Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-022 ' + "Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline");
    }


    // This test validates: Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Slash command Text description Plain paragraph text icon paragraph category basi', async ({ page }) => {
    // Checkpoint 23: Slash command "Text": description "Plain paragraph text", icon `paragraph`, category `basic`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Text\": description \"Plain paragraph text\", icon `paragraph`, category `basic`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-023 ' + "Slash command \"Text\": description \"Plain paragraph text\", icon `paragraph`, category `basic`");
    }


    // This test validates: Slash command "Text": description "Plain paragraph text", icon `paragraph`, category `basic`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Slash command Heading 1 description Manuscript title icon h1 shortcut label CmdO', async ({ page }) => {
    // Checkpoint 24: Slash command "Heading 1": description "Manuscript title", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Heading 1\": description \"Manuscript title\", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-024 ' + "Slash command \"Heading 1\": description \"Manuscript title\", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`");
    }


    // This test validates: Slash command "Heading 1": description "Manuscript title", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Slash command Heading 2 description IMRAD sections icon h2 shortcut label CmdOpt', async ({ page }) => {
    // Checkpoint 25: Slash command "Heading 2": description "IMRAD sections", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Heading 2\": description \"IMRAD sections\", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-025 ' + "Slash command \"Heading 2\": description \"IMRAD sections\", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`");
    }


    // This test validates: Slash command "Heading 2": description "IMRAD sections", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Slash command Heading 3 description Subsections icon h3 shortcut label CmdOpt3 c', async ({ page }) => {
    // Checkpoint 26: Slash command "Heading 3": description "Subsections", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Heading 3\": description \"Subsections\", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-026 ' + "Slash command \"Heading 3\": description \"Subsections\", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`");
    }


    // This test validates: Slash command "Heading 3": description "Subsections", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Slash command Heading 4 description Sub-subsections icon h4 shortcut label CmdOp', async ({ page }) => {
    // Checkpoint 27: Slash command "Heading 4": description "Sub-subsections", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Heading 4\": description \"Sub-subsections\", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-027 ' + "Slash command \"Heading 4\": description \"Sub-subsections\", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`");
    }


    // This test validates: Slash command "Heading 4": description "Sub-subsections", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Slash command Bullet List description Unordered list icon bullet shortcut label ', async ({ page }) => {
    // Checkpoint 28: Slash command "Bullet List": description "Unordered list", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Bullet List\": description \"Unordered list\", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-028 ' + "Slash command \"Bullet List\": description \"Unordered list\", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`");
    }


    // This test validates: Slash command "Bullet List": description "Unordered list", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Slash command Numbered List description Ordered list icon numbered shortcut labe', async ({ page }) => {
    // Checkpoint 29: Slash command "Numbered List": description "Ordered list", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Numbered List\": description \"Ordered list\", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-029 ' + "Slash command \"Numbered List\": description \"Ordered list\", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`");
    }


    // This test validates: Slash command "Numbered List": description "Ordered list", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Slash command Checklist description Task checklist icon checklist shortcut label', async ({ page }) => {
    // Checkpoint 30: Slash command "Checklist": description "Task checklist", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Checklist\": description \"Task checklist\", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-030 ' + "Slash command \"Checklist\": description \"Task checklist\", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`");
    }


    // This test validates: Slash command "Checklist": description "Task checklist", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Slash command Block Quote description Quote text icon quote category basic calls', async ({ page }) => {
    // Checkpoint 31: Slash command "Block Quote": description "Quote text", icon `quote`, category `basic`, calls `toggleBlockquote()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Block Quote\": description \"Quote text\", icon `quote`, category `basic`, calls `toggleBlockquote()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-031 ' + "Slash command \"Block Quote\": description \"Quote text\", icon `quote`, category `basic`, calls `toggleBlockquote()`");
    }


    // This test validates: Slash command "Block Quote": description "Quote text", icon `quote`, category `basic`, calls `toggleBlockquote()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Slash command Divider description Horizontal rule icon divider category basic ca', async ({ page }) => {
    // Checkpoint 32: Slash command "Divider": description "Horizontal rule", icon `divider`, category `basic`, calls `setHorizontalRule()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Divider\": description \"Horizontal rule\", icon `divider`, category `basic`, calls `setHorizontalRule()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-032 ' + "Slash command \"Divider\": description \"Horizontal rule\", icon `divider`, category `basic`, calls `setHorizontalRule()`");
    }


    // This test validates: Slash command "Divider": description "Horizontal rule", icon `divider`, category `basic`, calls `setHorizontalRule()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Slash command Code Block description For statistical code icon code category bas', async ({ page }) => {
    // Checkpoint 33: Slash command "Code Block": description "For statistical code", icon `code`, category `basic`, calls `toggleCodeBlock()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Code Block\": description \"For statistical code\", icon `code`, category `basic`, calls `toggleCodeBlock()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-033 ' + "Slash command \"Code Block\": description \"For statistical code\", icon `code`, category `basic`, calls `toggleCodeBlock()`");
    }


    // This test validates: Slash command "Code Block": description "For statistical code", icon `code`, category `basic`, calls `toggleCodeBlock()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Slash command Table description Insert data table icon table category academic i', async ({ page }) => {
    // Checkpoint 34: Slash command "Table": description "Insert data table", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Table\": description \"Insert data table\", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-034 ' + "Slash command \"Table\": description \"Insert data table\", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`");
    }


    // This test validates: Slash command "Table": description "Insert data table", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`
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
