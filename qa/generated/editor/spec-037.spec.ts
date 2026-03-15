/**
 * Auto-generated Playwright test for editor/spec-037
 * Source: e2e/specs/editor/spec-037.md
 * Generated: 2026-03-15T17:12:07.913Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-037
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-037', () => {
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

  test('cp-000: Chat input has rounded-xl border radius with focusring-2 focusring-brand40 focus', async ({ page }) => {
    // Checkpoint 0: Chat input has `rounded-xl` border radius with `focus:ring-2 focus:ring-brand/40` focus ring
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Chat input has `rounded-xl` border radius with `focus:ring-2 focus:ring-brand/40` focus ring",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 ' + "Chat input has `rounded-xl` border radius with `focus:ring-2 focus:ring-brand/40` focus ring");
    }


    // This test validates: Chat input has `rounded-xl` border radius with `focus:ring-2 focus:ring-brand/40` focus ring
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Chat form uses form onSubmit pattern Enter key in the input triggers form submis', async ({ page }) => {
    // Checkpoint 1: Chat form uses `<form onSubmit>` pattern — Enter key in the input triggers form submission
    // Section: Error Handling & Edge Cases > Studio Chat UI Specifics

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Chat form uses `<form onSubmit>` pattern — Enter key in the input triggers form submission",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Chat UI Specifics",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 ' + "Chat form uses `<form onSubmit>` pattern — Enter key in the input triggers form submission");
    }


    // This test validates: Chat form uses `<form onSubmit>` pattern — Enter key in the input triggers form submission
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Export dropdown container uses glass-panel class with w-48 192px width', async ({ page }) => {
    // Checkpoint 2: Export dropdown container uses `glass-panel` class with `w-48` (192px) width
    // Section: Error Handling & Edge Cases > Studio Export Dropdown Icon Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Export dropdown container uses `glass-panel` class with `w-48` (192px) width",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Dropdown Icon Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 ' + "Export dropdown container uses `glass-panel` class with `w-48` (192px) width");
    }


    // This test validates: Export dropdown container uses `glass-panel` class with `w-48` (192px) width
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: PDF export button icon FilePdf uses text-red-400 color class', async ({ page }) => {
    // Checkpoint 3: PDF export button icon `FilePdf` uses `text-red-400` color class
    // Section: Error Handling & Edge Cases > Studio Export Dropdown Icon Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "PDF export button icon `FilePdf` uses `text-red-400` color class",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Dropdown Icon Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 ' + "PDF export button icon `FilePdf` uses `text-red-400` color class");
    }


    // This test validates: PDF export button icon `FilePdf` uses `text-red-400` color class
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Word export button icon FileDoc uses text-blue-400 color class', async ({ page }) => {
    // Checkpoint 4: Word export button icon `FileDoc` uses `text-blue-400` color class
    // Section: Error Handling & Edge Cases > Studio Export Dropdown Icon Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Word export button icon `FileDoc` uses `text-blue-400` color class",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Dropdown Icon Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 ' + "Word export button icon `FileDoc` uses `text-blue-400` color class");
    }


    // This test validates: Word export button icon `FileDoc` uses `text-blue-400` color class
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: PDF export button has rounded-t-lg border radius Word export button has rounded-', async ({ page }) => {
    // Checkpoint 5: PDF export button has `rounded-t-lg` border radius; Word export button has `rounded-b-lg`
    // Section: Error Handling & Edge Cases > Studio Export Dropdown Icon Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "PDF export button has `rounded-t-lg` border radius; Word export button has `rounded-b-lg`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Export Dropdown Icon Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 ' + "PDF export button has `rounded-t-lg` border radius; Word export button has `rounded-b-lg`");
    }


    // This test validates: PDF export button has `rounded-t-lg` border radius; Word export button has `rounded-b-lg`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: CitationDialog receives documentIdStringdbDocumentId default falls back to liter', async ({ page }) => {
    // Checkpoint 6: `CitationDialog` receives `documentId={String(dbDocumentId || "default")}` — falls back to literal string `"default"` when no DB document ID exists
    // Section: Error Handling & Edge Cases > Editor Page Fallback Values and Conditions

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`CitationDialog` receives `documentId={String(dbDocumentId || \"default\")}` — falls back to literal string `\"default\"` when no DB document ID exists",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Fallback Values and Conditions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 ' + "`CitationDialog` receives `documentId={String(dbDocumentId || \"default\")}` — falls back to literal string `\"default\"` when no DB document ID exists");
    }


    // This test validates: `CitationDialog` receives `documentId={String(dbDocumentId || "default")}` — falls back to literal string `"default"` when no DB document ID exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: ExportDialog receives contentdbContent editorContent type doc content ultimate f', async ({ page }) => {
    // Checkpoint 7: `ExportDialog` receives `content={dbContent || editorContent || { type: "doc", content: [] }}` — ultimate fallback is an empty Tiptap document node
    // Section: Error Handling & Edge Cases > Editor Page Fallback Values and Conditions

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`ExportDialog` receives `content={dbContent || editorContent || { type: \"doc\", content: [] }}` — ultimate fallback is an empty Tiptap document node",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Fallback Values and Conditions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 ' + "`ExportDialog` receives `content={dbContent || editorContent || { type: \"doc\", content: [] }}` — ultimate fallback is an empty Tiptap document node");
    }


    // This test validates: `ExportDialog` receives `content={dbContent || editorContent || { type: "doc", content: [] }}` — ultimate fallback is an empty Tiptap document node
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: VersionHistory panel only renders when all three conditions are true showVersion', async ({ page }) => {
    // Checkpoint 8: `VersionHistory` panel only renders when all three conditions are true: `showVersionHistory && dbDocumentId && sectionId !== null`
    // Section: Error Handling & Edge Cases > Editor Page Fallback Values and Conditions

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`VersionHistory` panel only renders when all three conditions are true: `showVersionHistory && dbDocumentId && sectionId !== null`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Fallback Values and Conditions",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 ' + "`VersionHistory` panel only renders when all three conditions are true: `showVersionHistory && dbDocumentId && sectionId !== null`");
    }


    // This test validates: `VersionHistory` panel only renders when all three conditions are true: `showVersionHistory && dbDocumentId && sectionId !== null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Editor page computes sidebarOpen as logical OR of editorReferenceSidebarOpen edi', async ({ page }) => {
    // Checkpoint 9: Editor page computes `sidebarOpen` as logical OR of `editorReferenceSidebarOpen` (editor store) and `referenceSidebarOpen` (reference store)
    // Section: Error Handling & Edge Cases > Editor Page Reference Sidebar Dual-Store Sync

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor page computes `sidebarOpen` as logical OR of `editorReferenceSidebarOpen` (editor store) and `referenceSidebarOpen` (reference store)",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Reference Sidebar Dual-Store Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 ' + "Editor page computes `sidebarOpen` as logical OR of `editorReferenceSidebarOpen` (editor store) and `referenceSidebarOpen` (reference store)");
    }


    // This test validates: Editor page computes `sidebarOpen` as logical OR of `editorReferenceSidebarOpen` (editor store) and `referenceSidebarOpen` (reference store)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: handleSetReferenceSidebarOpen updates BOTH the editor store and the reference st', async ({ page }) => {
    // Checkpoint 10: `handleSetReferenceSidebarOpen` updates BOTH the editor store and the reference store simultaneously
    // Section: Error Handling & Edge Cases > Editor Page Reference Sidebar Dual-Store Sync

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`handleSetReferenceSidebarOpen` updates BOTH the editor store and the reference store simultaneously",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Reference Sidebar Dual-Store Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 ' + "`handleSetReferenceSidebarOpen` updates BOTH the editor store and the reference store simultaneously");
    }


    // This test validates: `handleSetReferenceSidebarOpen` updates BOTH the editor store and the reference store simultaneously
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: A useEffect syncs the two stores when they fall out of sync if either store valu', async ({ page }) => {
    // Checkpoint 11: A `useEffect` syncs the two stores when they fall out of sync — if either store value changes, both are set to the OR of their current values
    // Section: Error Handling & Edge Cases > Editor Page Reference Sidebar Dual-Store Sync

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "A `useEffect` syncs the two stores when they fall out of sync — if either store value changes, both are set to the OR of their current values",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Reference Sidebar Dual-Store Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 ' + "A `useEffect` syncs the two stores when they fall out of sync — if either store value changes, both are set to the OR of their current values");
    }


    // This test validates: A `useEffect` syncs the two stores when they fall out of sync — if either store value changes, both are set to the OR of their current values
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Reference sidebar container on editor page uses w-80 border-l border-border bg-s', async ({ page }) => {
    // Checkpoint 12: Reference sidebar container on editor page uses `w-80 border-l border-border bg-surface shrink-0`
    // Section: Error Handling & Edge Cases > Editor Page Reference Sidebar Dual-Store Sync

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reference sidebar container on editor page uses `w-80 border-l border-border bg-surface shrink-0`",
      section: "Error Handling & Edge Cases",
      subsection: "Editor Page Reference Sidebar Dual-Store Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 ' + "Reference sidebar container on editor page uses `w-80 border-l border-border bg-surface shrink-0`");
    }


    // This test validates: Reference sidebar container on editor page uses `w-80 border-l border-border bg-surface shrink-0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: AcademicEditoronUpdate sets editor store saveStatus to state saving immediately ', async ({ page }) => {
    // Checkpoint 13: `AcademicEditor.onUpdate` sets editor store `saveStatus` to `{ state: "saving" }` immediately on every content change (before debounce fires)
    // Section: Error Handling & Edge Cases > AcademicEditor Internal Save Status vs External Persistence

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`AcademicEditor.onUpdate` sets editor store `saveStatus` to `{ state: \"saving\" }` immediately on every content change (before debounce fires)",
      section: "Error Handling & Edge Cases",
      subsection: "AcademicEditor Internal Save Status vs External Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 ' + "`AcademicEditor.onUpdate` sets editor store `saveStatus` to `{ state: \"saving\" }` immediately on every content change (before debounce fires)");
    }


    // This test validates: `AcademicEditor.onUpdate` sets editor store `saveStatus` to `{ state: "saving" }` immediately on every content change (before debounce fires)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: After debounce timer fires AcademicEditor sets state saved lastSavedAt new Date ', async ({ page }) => {
    // Checkpoint 14: After debounce timer fires, `AcademicEditor` sets `{ state: "saved", lastSavedAt: new Date() }` — this happens before the parent's actual DB persistence completes
    // Section: Error Handling & Edge Cases > AcademicEditor Internal Save Status vs External Persistence

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "After debounce timer fires, `AcademicEditor` sets `{ state: \"saved\", lastSavedAt: new Date() }` — this happens before the parent's actual DB persistence completes",
      section: "Error Handling & Edge Cases",
      subsection: "AcademicEditor Internal Save Status vs External Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 ' + "After debounce timer fires, `AcademicEditor` sets `{ state: \"saved\", lastSavedAt: new Date() }` — this happens before the parent's actual DB persistence completes");
    }


    // This test validates: After debounce timer fires, `AcademicEditor` sets `{ state: "saved", lastSavedAt: new Date() }` — this happens before the parent's actual DB persistence completes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: This means the TopBar save indicator shows Saved after the debounce delay even t', async ({ page }) => {
    // Checkpoint 15: This means the TopBar save indicator shows "Saved" after the debounce delay, even though the actual server save triggered by `handleEditorUpdate` may still be in progress or may fail
    // Section: Error Handling & Edge Cases > AcademicEditor Internal Save Status vs External Persistence

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "This means the TopBar save indicator shows \"Saved\" after the debounce delay, even though the actual server save triggered by `handleEditorUpdate` may still be in progress or may fail",
      section: "Error Handling & Edge Cases",
      subsection: "AcademicEditor Internal Save Status vs External Persistence",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 ' + "This means the TopBar save indicator shows \"Saved\" after the debounce delay, even though the actual server save triggered by `handleEditorUpdate` may still be in progress or may fail");
    }


    // This test validates: This means the TopBar save indicator shows "Saved" after the debounce delay, even though the actual server save triggered by `handleEditorUpdate` may still be in progress or may fail
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Footnote node parseHTML matches selector spandata-footnote-id', async ({ page }) => {
    // Checkpoint 16: Footnote node `parseHTML` matches selector `span[data-footnote-id]`
    // Section: Error Handling & Edge Cases > Footnote Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Footnote node `parseHTML` matches selector `span[data-footnote-id]`",
      section: "Error Handling & Edge Cases",
      subsection: "Footnote Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 ' + "Footnote node `parseHTML` matches selector `span[data-footnote-id]`");
    }


    // This test validates: Footnote node `parseHTML` matches selector `span[data-footnote-id]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Footnote id attribute maps to data-footnote-id HTML attribute', async ({ page }) => {
    // Checkpoint 17: Footnote `id` attribute maps to `data-footnote-id` HTML attribute
    // Section: Error Handling & Edge Cases > Footnote Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Footnote `id` attribute maps to `data-footnote-id` HTML attribute",
      section: "Error Handling & Edge Cases",
      subsection: "Footnote Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 ' + "Footnote `id` attribute maps to `data-footnote-id` HTML attribute");
    }


    // This test validates: Footnote `id` attribute maps to `data-footnote-id` HTML attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Footnote text attribute maps to data-footnote-text HTML attribute', async ({ page }) => {
    // Checkpoint 18: Footnote `text` attribute maps to `data-footnote-text` HTML attribute
    // Section: Error Handling & Edge Cases > Footnote Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Footnote `text` attribute maps to `data-footnote-text` HTML attribute",
      section: "Error Handling & Edge Cases",
      subsection: "Footnote Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 ' + "Footnote `text` attribute maps to `data-footnote-text` HTML attribute");
    }


    // This test validates: Footnote `text` attribute maps to `data-footnote-text` HTML attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Footnote number attribute maps to data-footnote-number HTML attribute parsed wit', async ({ page }) => {
    // Checkpoint 19: Footnote `number` attribute maps to `data-footnote-number` HTML attribute, parsed with `parseInt(value, 10)` defaulting to string `"1"`
    // Section: Error Handling & Edge Cases > Footnote Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Footnote `number` attribute maps to `data-footnote-number` HTML attribute, parsed with `parseInt(value, 10)` defaulting to string `\"1\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Footnote Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 ' + "Footnote `number` attribute maps to `data-footnote-number` HTML attribute, parsed with `parseInt(value, 10)` defaulting to string `\"1\"`");
    }


    // This test validates: Footnote `number` attribute maps to `data-footnote-number` HTML attribute, parsed with `parseInt(value, 10)` defaulting to string `"1"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Footnote renderHTML outputs span classfootnote-marker contenteditablefalsesupnum', async ({ page }) => {
    // Checkpoint 20: Footnote `renderHTML` outputs: `<span class="footnote-marker" contenteditable="false"><sup>{number}</sup></span>`
    // Section: Error Handling & Edge Cases > Footnote Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Footnote `renderHTML` outputs: `<span class=\"footnote-marker\" contenteditable=\"false\"><sup>{number}</sup></span>`",
      section: "Error Handling & Edge Cases",
      subsection: "Footnote Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 ' + "Footnote `renderHTML` outputs: `<span class=\"footnote-marker\" contenteditable=\"false\"><sup>{number}</sup></span>`");
    }


    // This test validates: Footnote `renderHTML` outputs: `<span class="footnote-marker" contenteditable="false"><sup>{number}</sup></span>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Citation node parseHTML matches selector spandata-typecitation', async ({ page }) => {
    // Checkpoint 21: Citation node `parseHTML` matches selector `span[data-type="citation"]`
    // Section: Error Handling & Edge Cases > Citation Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Citation node `parseHTML` matches selector `span[data-type=\"citation\"]`",
      section: "Error Handling & Edge Cases",
      subsection: "Citation Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 ' + "Citation node `parseHTML` matches selector `span[data-type=\"citation\"]`");
    }


    // This test validates: Citation node `parseHTML` matches selector `span[data-type="citation"]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: referenceIds attribute serialized as JSON string in data-reference-ids HTML attr', async ({ page }) => {
    // Checkpoint 22: `referenceIds` attribute serialized as JSON string in `data-reference-ids` HTML attribute
    // Section: Error Handling & Edge Cases > Citation Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`referenceIds` attribute serialized as JSON string in `data-reference-ids` HTML attribute",
      section: "Error Handling & Edge Cases",
      subsection: "Citation Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 ' + "`referenceIds` attribute serialized as JSON string in `data-reference-ids` HTML attribute");
    }


    // This test validates: `referenceIds` attribute serialized as JSON string in `data-reference-ids` HTML attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: overrides attribute serialized as JSON string in data-overrides HTML attribute o', async ({ page }) => {
    // Checkpoint 23: `overrides` attribute serialized as JSON string in `data-overrides` HTML attribute; omitted entirely from HTML when `overrides` is null
    // Section: Error Handling & Edge Cases > Citation Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`overrides` attribute serialized as JSON string in `data-overrides` HTML attribute; omitted entirely from HTML when `overrides` is null",
      section: "Error Handling & Edge Cases",
      subsection: "Citation Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 ' + "`overrides` attribute serialized as JSON string in `data-overrides` HTML attribute; omitted entirely from HTML when `overrides` is null");
    }


    // This test validates: `overrides` attribute serialized as JSON string in `data-overrides` HTML attribute; omitted entirely from HTML when `overrides` is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Both referenceIds and overrides use JSONparse with fallback and null respectivel', async ({ page }) => {
    // Checkpoint 24: Both `referenceIds` and `overrides` use `JSON.parse()` with fallback (`[]` and `null` respectively) on parse error
    // Section: Error Handling & Edge Cases > Citation Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Both `referenceIds` and `overrides` use `JSON.parse()` with fallback (`[]` and `null` respectively) on parse error",
      section: "Error Handling & Edge Cases",
      subsection: "Citation Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 ' + "Both `referenceIds` and `overrides` use `JSON.parse()` with fallback (`[]` and `null` respectively) on parse error");
    }


    // This test validates: Both `referenceIds` and `overrides` use `JSON.parse()` with fallback (`[]` and `null` respectively) on parse error
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Citation extension addKeyboardShortcuts registers Mod-Shift-c lowercase c not up', async ({ page }) => {
    // Checkpoint 25: Citation extension `addKeyboardShortcuts` registers `"Mod-Shift-c"` (lowercase `c`), not uppercase `C`
    // Section: Error Handling & Edge Cases > Citation Node HTML Serialization

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Citation extension `addKeyboardShortcuts` registers `\"Mod-Shift-c\"` (lowercase `c`), not uppercase `C`",
      section: "Error Handling & Edge Cases",
      subsection: "Citation Node HTML Serialization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 ' + "Citation extension `addKeyboardShortcuts` registers `\"Mod-Shift-c\"` (lowercase `c`), not uppercase `C`");
    }


    // This test validates: Citation extension `addKeyboardShortcuts` registers `"Mod-Shift-c"` (lowercase `c`), not uppercase `C`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: toCitationAuthors handles comma-separated names eg Smith John by splitting on wi', async ({ page }) => {
    // Checkpoint 26: `toCitationAuthors()` handles comma-separated names (e.g. `"Smith, John"`) by splitting on `","` with first part as family name
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`toCitationAuthors()` handles comma-separated names (e.g. `\"Smith, John\"`) by splitting on `\",\"` with first part as family name",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 ' + "`toCitationAuthors()` handles comma-separated names (e.g. `\"Smith, John\"`) by splitting on `\",\"` with first part as family name");
    }


    // This test validates: `toCitationAuthors()` handles comma-separated names (e.g. `"Smith, John"`) by splitting on `","` with first part as family name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: toCitationAuthors handles space-separated names eg John Smith by taking the last', async ({ page }) => {
    // Checkpoint 27: `toCitationAuthors()` handles space-separated names (e.g. `"John Smith"`) by taking the last word as family name and remaining words as given name
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`toCitationAuthors()` handles space-separated names (e.g. `\"John Smith\"`) by taking the last word as family name and remaining words as given name",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 ' + "`toCitationAuthors()` handles space-separated names (e.g. `\"John Smith\"`) by taking the last word as family name and remaining words as given name");
    }


    // This test validates: `toCitationAuthors()` handles space-separated names (e.g. `"John Smith"`) by taking the last word as family name and remaining words as given name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Single-word author names use the word as family name with empty string for given', async ({ page }) => {
    // Checkpoint 28: Single-word author names use the word as family name with empty string for given name
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Single-word author names use the word as family name with empty string for given name",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 ' + "Single-word author names use the word as family name with empty string for given name");
    }


    // This test validates: Single-word author names use the word as family name with empty string for given name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Empty or whitespace-only author strings return family Unknown given', async ({ page }) => {
    // Checkpoint 29: Empty or whitespace-only author strings return `{ family: "Unknown", given: "" }`
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Empty or whitespace-only author strings return `{ family: \"Unknown\", given: \"\" }`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 ' + "Empty or whitespace-only author strings return `{ family: \"Unknown\", given: \"\" }`");
    }


    // This test validates: Empty or whitespace-only author strings return `{ family: "Unknown", given: "" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: buildResearchReference always creates CSL data with type article-journal regardl', async ({ page }) => {
    // Checkpoint 30: `buildResearchReference()` always creates CSL data with `type: "article-journal"` regardless of actual source type
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`buildResearchReference()` always creates CSL data with `type: \"article-journal\"` regardless of actual source type",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 ' + "`buildResearchReference()` always creates CSL data with `type: \"article-journal\"` regardless of actual source type");
    }


    // This test validates: `buildResearchReference()` always creates CSL data with `type: "article-journal"` regardless of actual source type
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Research reference stableKey falls back to a slugified title titletrimtoLowerCas', async ({ page }) => {
    // Checkpoint 31: Research reference `stableKey` falls back to a slugified title (`title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")`) when neither DOI nor PMID is available
    // Section: Error Handling & Edge Cases > Studio Research Citation Author Parsing

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Research reference `stableKey` falls back to a slugified title (`title.trim().toLowerCase().replace(/[^a-z0-9]+/g, \"-\")`) when neither DOI nor PMID is available",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Research Citation Author Parsing",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 ' + "Research reference `stableKey` falls back to a slugified title (`title.trim().toLowerCase().replace(/[^a-z0-9]+/g, \"-\")`) when neither DOI nor PMID is available");
    }


    // This test validates: Research reference `stableKey` falls back to a slugified title (`title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")`) when neither DOI nor PMID is available
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Outline panel header text is Document Outline full phrase not abbreviated', async ({ page }) => {
    // Checkpoint 32: Outline panel header text is `"Document Outline"` (full phrase, not abbreviated)
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Outline panel header text is `\"Document Outline\"` (full phrase, not abbreviated)",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 ' + "Outline panel header text is `\"Document Outline\"` (full phrase, not abbreviated)");
    }


    // This test validates: Outline panel header text is `"Document Outline"` (full phrase, not abbreviated)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Outline header uses text-xs font-semibold text-ink-muted uppercase tracking-wide', async ({ page }) => {
    // Checkpoint 33: Outline header uses `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Outline header uses `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 ' + "Outline header uses `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling");
    }


    // This test validates: Outline header uses `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Collapsed outline toggle button title attribute is Document Outline', async ({ page }) => {
    // Checkpoint 34: Collapsed outline toggle button `title` attribute is `"Document Outline"`
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-037');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Collapsed outline toggle button `title` attribute is `\"Document Outline\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 ' + "Collapsed outline toggle button `title` attribute is `\"Document Outline\"`");
    }


    // This test validates: Collapsed outline toggle button `title` attribute is `"Document Outline"`
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
