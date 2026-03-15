/**
 * Auto-generated Playwright test for editor/spec-038
 * Source: e2e/specs/editor/spec-038.md
 * Generated: 2026-03-15T17:13:33.099Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-038
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-038', () => {
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

  test('cp-000: Heading item base padding uses inline style paddingLeft 12 indentpx 12px base pl', async ({ page }) => {
    // Checkpoint 0: Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 ' + "Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent");
    }


    // This test validates: Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Word count per heading visibility uses opacity-0 group-hoveropacity-100 transiti', async ({ page }) => {
    // Checkpoint 1: Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 ' + "Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)");
    }


    // This test validates: Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Total word count in footer uses wordCounttoLocaleString for thousands-separator ', async ({ page }) => {
    // Checkpoint 2: Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting
    // Section: Error Handling & Edge Cases > Document Outline Header and Styling Details

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting",
      section: "Error Handling & Edge Cases",
      subsection: "Document Outline Header and Styling Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 ' + "Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting");
    }


    // This test validates: Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: TopBar SaveStatusIndicator saved state uses Check icon size 12 the editor page h', async ({ page }) => {
    // Checkpoint 3: TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state
    // Section: Error Handling & Edge Cases > TopBar SaveStatusIndicator vs Editor Page Header Save Icons

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state",
      section: "Error Handling & Edge Cases",
      subsection: "TopBar SaveStatusIndicator vs Editor Page Header Save Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 ' + "TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state");
    }


    // This test validates: TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: TopBar saving state uses CloudArrowUp size 12 with text-brand animate-pulse the ', async ({ page }) => {
    // Checkpoint 4: TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)
    // Section: Error Handling & Edge Cases > TopBar SaveStatusIndicator vs Editor Page Header Save Icons

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)",
      section: "Error Handling & Edge Cases",
      subsection: "TopBar SaveStatusIndicator vs Editor Page Header Save Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 ' + "TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)");
    }


    // This test validates: TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: TopBar SaveStatusIndicator default case unknown state returns null it does not r', async ({ page }) => {
    // Checkpoint 5: TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states
    // Section: Error Handling & Edge Cases > TopBar SaveStatusIndicator vs Editor Page Header Save Icons

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states",
      section: "Error Handling & Edge Cases",
      subsection: "TopBar SaveStatusIndicator vs Editor Page Header Save Icons",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 ' + "TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states");
    }


    // This test validates: TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: CORRECTION Existing doc section 15 states Document Outline is Editor page only T', async ({ page }) => {
    // Checkpoint 6: CORRECTION: Existing doc section 15 states Document Outline is "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 15 states Document Outline is \"Editor page only\" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 ' + "CORRECTION: Existing doc section 15 states Document Outline is \"Editor page only\" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`");
    }


    // This test validates: CORRECTION: Existing doc section 15 states Document Outline is "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: CORRECTION Existing doc section 9 describes the Floating Selection Toolbar impli', async ({ page }) => {
    // Checkpoint 7: CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 ' + "CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`");
    }


    // This test validates: CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: CORRECTION Existing doc section 10 describes LinkPopover as Editor page only Tip', async ({ page }) => {
    // Checkpoint 8: CORRECTION: Existing doc section 10 describes LinkPopover as "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 10 describes LinkPopover as \"Editor page only\" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 ' + "CORRECTION: Existing doc section 10 describes LinkPopover as \"Editor page only\" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well");
    }


    // This test validates: CORRECTION: Existing doc section 10 describes LinkPopover as "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: CORRECTION Existing doc section 14 describes FootnoteSection implicitly as edito', async ({ page }) => {
    // Checkpoint 9: CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 ' + "CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`");
    }


    // This test validates: CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: CORRECTION Existing doc line 1491 states bottom new-comment input placeholder is', async ({ page }) => {
    // Checkpoint 10: CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `"Add a general comment about this document..."` — a Pass 3 correction already flagged this as `"Add a comment..."`, but line 1908 then re-states it as `"Add a comment..."` while the Pass 2 doc at line 1491 remains uncorrected
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `\"Add a general comment about this document...\"` — a Pass 3 correction already flagged this as `\"Add a comment...\"`, but line 1908 then re-states it as `\"Add a comment...\"` while the Pass 2 doc at line 1491 remains uncorrected",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 ' + "CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `\"Add a general comment about this document...\"` — a Pass 3 correction already flagged this as `\"Add a comment...\"`, but line 1908 then re-states it as `\"Add a comment...\"` while the Pass 2 doc at line 1491 remains uncorrected");
    }


    // This test validates: CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `"Add a general comment about this document..."` — a Pass 3 correction already flagged this as `"Add a comment..."`, but line 1908 then re-states it as `"Add a comment..."` while the Pass 2 doc at line 1491 remains uncorrected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: toolbartsx now uses a single ToolbarProps interface that includes editor onOpenC', async ({ page }) => {
    // Checkpoint 11: `toolbar.tsx` now uses a single `ToolbarProps` interface that includes `editor`, `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount`; the dead narrow prop interface was removed
    // Section: Error Handling & Edge Cases > Components Referenced But Not Rendered (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`toolbar.tsx` now uses a single `ToolbarProps` interface that includes `editor`, `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount`; the dead narrow prop interface was removed",
      section: "Error Handling & Edge Cases",
      subsection: "Components Referenced But Not Rendered (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 ' + "`toolbar.tsx` now uses a single `ToolbarProps` interface that includes `editor`, `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount`; the dead narrow prop interface was removed");
    }


    // This test validates: `toolbar.tsx` now uses a single `ToolbarProps` interface that includes `editor`, `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount`; the dead narrow prop interface was removed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: editor-configts EDITOR_SHORTCUTSclearFormatting defines Mod- and AcademicKeyboar', async ({ page }) => {
    // Checkpoint 12: `editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `"Mod-\\"`, and `AcademicKeyboardShortcuts` now registers that shortcut to clear marks and reset nodes
    // Section: Error Handling & Edge Cases > Components Referenced But Not Rendered (Pass 4)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-038');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `\"Mod-\\\\\"`, and `AcademicKeyboardShortcuts` now registers that shortcut to clear marks and reset nodes",
      section: "Error Handling & Edge Cases",
      subsection: "Components Referenced But Not Rendered (Pass 4)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 ' + "`editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `\"Mod-\\\\\"`, and `AcademicKeyboardShortcuts` now registers that shortcut to clear marks and reset nodes");
    }


    // This test validates: `editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `"Mod-\\"`, and `AcademicKeyboardShortcuts` now registers that shortcut to clear marks and reset nodes
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
