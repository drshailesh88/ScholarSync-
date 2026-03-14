/**
 * Auto-generated Playwright test for editor/spec-035
 * Source: e2e/specs/editor/spec-035.md
 * Generated: 2026-03-14T02:13:36.347Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-035
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-035', () => {
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

  test('cp-000: Studio citation insertion notice text is Citation inserted singular or N citatio', async ({ page }) => {
    // Checkpoint 0: Studio citation insertion notice text is `"Citation inserted"` (singular) or `"{N} citations inserted"` (plural)
    // Section: Error Handling & Edge Cases > Studio Citation Notice vs Editor Citation Notice

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio citation insertion notice text is `\"Citation inserted\"` (singular) or `\"{N} citations inserted\"` (plural)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Citation Notice vs Editor Citation Notice",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 Studio citation insertion notice text is `"Citation inserted"` (singular) or `"{N} citations inserted"` (plural)');
    }


    // This test validates: Studio citation insertion notice text is `"Citation inserted"` (singular) or `"{N} citations inserted"` (plural)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Studio citation notice auto-clears after 2500ms 25 seconds', async ({ page }) => {
    // Checkpoint 1: Studio citation notice auto-clears after 2500ms (2.5 seconds)
    // Section: Error Handling & Edge Cases > Studio Citation Notice vs Editor Citation Notice

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio citation notice auto-clears after 2500ms (2.5 seconds)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Citation Notice vs Editor Citation Notice",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 Studio citation notice auto-clears after 2500ms (2.5 seconds)');
    }


    // This test validates: Studio citation notice auto-clears after 2500ms (2.5 seconds)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Editor page has NO citation insertion notice it has only a pending-from-library ', async ({ page }) => {
    // Checkpoint 2: Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)
    // Section: Error Handling & Edge Cases > Studio Citation Notice vs Editor Citation Notice

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Citation Notice vs Editor Citation Notice",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)');
    }


    // This test validates: Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Bottom new-comment input placeholder is Add a general comment about this documen', async ({ page }) => {
    // Checkpoint 3: Bottom new-comment input placeholder is `"Add a general comment about this document..."` in the actual source code
    // Section: Error Handling & Edge Cases > Comment Sidebar Input Variants

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Bottom new-comment input placeholder is `\"Add a general comment about this document...\"` in the actual source code",
      section: "Error Handling & Edge Cases",
      subsection: "Comment Sidebar Input Variants",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 Bottom new-comment input placeholder is `"Add a general comment about this document..."` in the actual source code');
    }


    // This test validates: Bottom new-comment input placeholder is `"Add a general comment about this document..."` in the actual source code
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Bottom new-comment input submits on Enter key when not ShiftEnter', async ({ page }) => {
    // Checkpoint 4: Bottom new-comment input submits on `Enter` key (when not Shift+Enter)
    // Section: Error Handling & Edge Cases > Comment Sidebar Input Variants

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Bottom new-comment input submits on `Enter` key (when not Shift+Enter)",
      section: "Error Handling & Edge Cases",
      subsection: "Comment Sidebar Input Variants",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 Bottom new-comment input submits on `Enter` key (when not Shift+Enter)');
    }


    // This test validates: Bottom new-comment input submits on `Enter` key (when not Shift+Enter)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Reply input submits on Enter key when not ShiftEnter', async ({ page }) => {
    // Checkpoint 5: Reply input submits on `Enter` key (when not Shift+Enter)
    // Section: Error Handling & Edge Cases > Comment Sidebar Input Variants

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Reply input submits on `Enter` key (when not Shift+Enter)",
      section: "Error Handling & Edge Cases",
      subsection: "Comment Sidebar Input Variants",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 Reply input submits on `Enter` key (when not Shift+Enter)');
    }


    // This test validates: Reply input submits on `Enter` key (when not Shift+Enter)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Comment sidebar unresolved badge uses bg-amber-50015 text-amber-500 amber stylin', async ({ page }) => {
    // Checkpoint 6: Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size
    // Section: Error Handling & Edge Cases > Comment Sidebar Input Variants

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size",
      section: "Error Handling & Edge Cases",
      subsection: "Comment Sidebar Input Variants",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size');
    }


    // This test validates: Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: CORRECTION Any older doc note claiming the bottom new-comment input uses Add a c', async ({ page }) => {
    // Checkpoint 7: CORRECTION: Any older doc note claiming the bottom new-comment input uses `"Add a comment..."` is stale — the current source code uses `"Add a general comment about this document..."`
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Any older doc note claiming the bottom new-comment input uses `\"Add a comment...\"` is stale — the current source code uses `\"Add a general comment about this document...\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 CORRECTION: Any older doc note claiming the bottom new-comment input uses `"Add a comment..."` is stale — the current source code uses `"Add a general comment about this document..."`');
    }


    // This test validates: CORRECTION: Any older doc note claiming the bottom new-comment input uses `"Add a comment..."` is stale — the current source code uses `"Add a general comment about this document..."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: CORRECTION Existing doc section 19 says save status indicators show pulsing clou', async ({ page }) => {
    // Checkpoint 8: CORRECTION: Existing doc section 19 says save status indicators show "pulsing cloud icon" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 19 says save status indicators show \"pulsing cloud icon\" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 CORRECTION: Existing doc section 19 says save status indicators show "pulsing cloud icon" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)');
    }


    // This test validates: CORRECTION: Existing doc section 19 says save status indicators show "pulsing cloud icon" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: CORRECTION Existing doc section 19 says Studio idle state shows green check Save', async ({ page }) => {
    // Checkpoint 9: CORRECTION: Existing doc section 19 says Studio idle state shows "green check + Saved HH:MM" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Existing doc section 19 says Studio idle state shows \"green check + Saved HH:MM\" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 CORRECTION: Existing doc section 19 says Studio idle state shows "green check + Saved HH:MM" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green');
    }


    // This test validates: CORRECTION: Existing doc section 19 says Studio idle state shows "green check + Saved HH:MM" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: CORRECTION Slash menu heading shortcut badges are now aligned with the registere', async ({ page }) => {
    // Checkpoint 10: CORRECTION: Slash menu heading shortcut badges are now aligned with the registered shortcuts and display `Cmd+Shift+N`, not `Cmd+Opt+N`
    // Section: Error Handling & Edge Cases > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CORRECTION: Slash menu heading shortcut badges are now aligned with the registered shortcuts and display `Cmd+Shift+N`, not `Cmd+Opt+N`",
      section: "Error Handling & Edge Cases",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 CORRECTION: Slash menu heading shortcut badges are now aligned with the registered shortcuts and display `Cmd+Shift+N`, not `Cmd+Opt+N`');
    }


    // This test validates: CORRECTION: Slash menu heading shortcut badges are now aligned with the registered shortcuts and display `Cmd+Shift+N`, not `Cmd+Opt+N`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: template-pickertsx exists in srccomponentseditor but is NOT imported by either e', async ({ page }) => {
    // Checkpoint 11: `template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes
    // Section: Error Handling & Edge Cases > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes",
      section: "Error Handling & Edge Cases",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 `template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes');
    }


    // This test validates: `template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: EDITOR_SHORTCUTS EDITOR_FONTS and TYPOGRAPHY constants from editor-configts are ', async ({ page }) => {
    // Checkpoint 12: `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components
    // Section: Error Handling & Edge Cases > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components",
      section: "Error Handling & Edge Cases",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components');
    }


    // This test validates: `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: DiffViewtsx exists in srccomponentsintegrity but is NOT imported by IntegrityPan', async ({ page }) => {
    // Checkpoint 13: `DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow
    // Section: Error Handling & Edge Cases > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow",
      section: "Error Handling & Edge Cases",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 `DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow');
    }


    // This test validates: `DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Global CommandPalette is mounted by AppShell on editorid and studio and CmdCtrlK', async ({ page }) => {
    // Checkpoint 14: Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components');
    }


    // This test validates: Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: DocumentOutline heading click scrolls the resolved DOM node into view and then s', async ({ page }) => {
    // Checkpoint 15: DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`');
    }


    // This test validates: DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: FootnoteSection row click focuses the editor sets text selection to the footnote', async ({ page }) => {
    // Checkpoint 16: FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`');
    }


    // This test validates: FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Research store clearSearch preserves hasSearchedBefore while clearing query filt', async ({ page }) => {
    // Checkpoint 17: Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state');
    }


    // This test validates: Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: ResearchSidebar library badge hard-caps at literal 99 when the library count exc', async ({ page }) => {
    // Checkpoint 18: ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99');
    }


    // This test validates: ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Toolbar from srccomponentseditortoolbartsx is actually rendered by TiptapEditor ', async ({ page }) => {
    // Checkpoint 19: `Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`
    // Section: Error Handling & Edge Cases > Verification Corrections

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`",
      section: "Error Handling & Edge Cases",
      subsection: "Verification Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 `Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`');
    }


    // This test validates: `Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Global command palette input placeholder is Type a command or search', async ({ page }) => {
    // Checkpoint 20: Global command palette input placeholder is `Type a command or search...`
    // Section: Error Handling & Edge Cases > Command Palette

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global command palette input placeholder is `Type a command or search...`",
      section: "Error Handling & Edge Cases",
      subsection: "Command Palette",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 Global command palette input placeholder is `Type a command or search...`');
    }


    // This test validates: Global command palette input placeholder is `Type a command or search...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Global command palette closes on backdrop click', async ({ page }) => {
    // Checkpoint 21: Global command palette closes on backdrop click
    // Section: Error Handling & Edge Cases > Command Palette

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global command palette closes on backdrop click",
      section: "Error Handling & Edge Cases",
      subsection: "Command Palette",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 Global command palette closes on backdrop click');
    }


    // This test validates: Global command palette closes on backdrop click
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Global command palette closes on Escape', async ({ page }) => {
    // Checkpoint 22: Global command palette closes on `Escape`
    // Section: Error Handling & Edge Cases > Command Palette

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global command palette closes on `Escape`",
      section: "Error Handling & Edge Cases",
      subsection: "Command Palette",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 Global command palette closes on `Escape`');
    }


    // This test validates: Global command palette closes on `Escape`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Global command palette navigation commands include Dashboard Studio Literature S', async ({ page }) => {
    // Checkpoint 23: Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`
    // Section: Error Handling & Edge Cases > Command Palette

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`",
      section: "Error Handling & Edge Cases",
      subsection: "Command Palette",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`');
    }


    // This test validates: Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Global command palette action commands include Toggle Theme and New Project', async ({ page }) => {
    // Checkpoint 24: Global command palette action commands include `Toggle Theme` and `New Project`
    // Section: Error Handling & Edge Cases > Command Palette

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Global command palette action commands include `Toggle Theme` and `New Project`",
      section: "Error Handling & Edge Cases",
      subsection: "Command Palette",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 Global command palette action commands include `Toggle Theme` and `New Project`');
    }


    // This test validates: Global command palette action commands include `Toggle Theme` and `New Project`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: CommentSidebar registers scholarsyncnew-inline-comment on mount and removes that', async ({ page }) => {
    // Checkpoint 25: CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount
    // Section: Error Handling & Edge Cases > Lifecycle And Cleanup

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount",
      section: "Error Handling & Edge Cases",
      subsection: "Lifecycle And Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount');
    }


    // This test validates: CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: useStudioDocument clears its debounced title-save timer on unmount', async ({ page }) => {
    // Checkpoint 26: `useStudioDocument` clears its debounced title-save timer on unmount
    // Section: Error Handling & Edge Cases > Lifecycle And Cleanup

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "`useStudioDocument` clears its debounced title-save timer on unmount",
      section: "Error Handling & Edge Cases",
      subsection: "Lifecycle And Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 `useStudioDocument` clears its debounced title-save timer on unmount');
    }


    // This test validates: `useStudioDocument` clears its debounced title-save timer on unmount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Studio citation insertion flow clears any existing dismissal timer before starti', async ({ page }) => {
    // Checkpoint 27: Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers
    // Section: Error Handling & Edge Cases > Lifecycle And Cleanup

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers",
      section: "Error Handling & Edge Cases",
      subsection: "Lifecycle And Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers');
    }


    // This test validates: Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Studio Toolbar renders 8 formatting buttons in order Heading 1 TextHOne Heading ', async ({ page }) => {
    // Checkpoint 28: Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)');
    }


    // This test validates: Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Studio Toolbar formatting button icons use size 18', async ({ page }) => {
    // Checkpoint 29: Studio `Toolbar` formatting button icons use size `18`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` formatting button icons use size `18`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 Studio `Toolbar` formatting button icons use size `18`');
    }


    // This test validates: Studio `Toolbar` formatting button icons use size `18`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Studio Toolbar Cite button uses BookOpen icon size 16 with title Insert Citation', async ({ page }) => {
    // Checkpoint 30: Studio `Toolbar` "Cite" button uses `BookOpen` icon (size 16) with title `"Insert Citation (Cmd+Shift+C)"`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` \"Cite\" button uses `BookOpen` icon (size 16) with title `\"Insert Citation (Cmd+Shift+C)\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 Studio `Toolbar` "Cite" button uses `BookOpen` icon (size 16) with title `"Insert Citation (Cmd+Shift+C)"`');
    }


    // This test validates: Studio `Toolbar` "Cite" button uses `BookOpen` icon (size 16) with title `"Insert Citation (Cmd+Shift+C)"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Studio Toolbar Cite label text Cite is hidden below sm breakpoint via hidden smi', async ({ page }) => {
    // Checkpoint 31: Studio `Toolbar` "Cite" label text `"Cite"` is hidden below `sm` breakpoint via `hidden sm:inline` class
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` \"Cite\" label text `\"Cite\"` is hidden below `sm` breakpoint via `hidden sm:inline` class",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 Studio `Toolbar` "Cite" label text `"Cite"` is hidden below `sm` breakpoint via `hidden sm:inline` class');
    }


    // This test validates: Studio `Toolbar` "Cite" label text `"Cite"` is hidden below `sm` breakpoint via `hidden sm:inline` class
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Studio Toolbar Cite button only renders when onOpenCitationDialog prop is provid', async ({ page }) => {
    // Checkpoint 32: Studio `Toolbar` "Cite" button only renders when `onOpenCitationDialog` prop is provided
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` \"Cite\" button only renders when `onOpenCitationDialog` prop is provided",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 Studio `Toolbar` "Cite" button only renders when `onOpenCitationDialog` prop is provided');
    }


    // This test validates: Studio `Toolbar` "Cite" button only renders when `onOpenCitationDialog` prop is provided
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Studio Toolbar References button uses Books icon size 16 with title Toggle Refer', async ({ page }) => {
    // Checkpoint 33: Studio `Toolbar` "References" button uses `Books` icon (size 16) with title `"Toggle Reference Sidebar (Cmd+Shift+R)"`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` \"References\" button uses `Books` icon (size 16) with title `\"Toggle Reference Sidebar (Cmd+Shift+R)\"`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 Studio `Toolbar` "References" button uses `Books` icon (size 16) with title `"Toggle Reference Sidebar (Cmd+Shift+R)"`');
    }


    // This test validates: Studio `Toolbar` "References" button uses `Books` icon (size 16) with title `"Toggle Reference Sidebar (Cmd+Shift+R)"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Studio Toolbar reference count badge renders only when referenceCount 0', async ({ page }) => {
    // Checkpoint 34: Studio `Toolbar` reference count badge renders only when `referenceCount > 0`
    // Section: Error Handling & Edge Cases > Studio Toolbar Component (`src/components/editor/toolbar.tsx`)

    // Navigate to the page
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-035');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Studio `Toolbar` reference count badge renders only when `referenceCount > 0`",
      section: "Error Handling & Edge Cases",
      subsection: "Studio Toolbar Component (`src/components/editor/toolbar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 Studio `Toolbar` reference count badge renders only when `referenceCount > 0`');
    }


    // This test validates: Studio `Toolbar` reference count badge renders only when `referenceCount > 0`
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
