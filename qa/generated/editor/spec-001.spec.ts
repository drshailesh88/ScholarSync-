/**
 * Auto-generated Playwright test for editor/spec-001
 * Source: e2e/specs/editor/spec-001.md
 * Generated: 2026-03-15T16:23:28.932Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts editor spec-001
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';




import { assertEditorCheckpoint } from '../../module-assertions/editor';















test.describe('editor / spec-001', () => {
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

  test('cp-000: Editable document title click the title input field type to rename debounced 1s ', async ({ page }) => {
    // Checkpoint 0: Editable document title — click the title input field, type to rename (debounced 1s save)
    // Section: Document Header & Metadata > Editor Page (`/editor/[id]`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editable document title — click the title input field, type to rename (debounced 1s save)",
      section: "Document Header & Metadata",
      subsection: "Editor Page (`/editor/[id]`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-000 ' + "Editable document title — click the title input field, type to rename (debounced 1s save)");
    }


    // This test validates: Editable document title — click the title input field, type to rename (debounced 1s save)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Back button arrow left navigates to dashboard', async ({ page }) => {
    // Checkpoint 1: Back button — arrow left navigates to `/dashboard`
    // Section: Document Header & Metadata > Editor Page (`/editor/[id]`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Back button — arrow left navigates to `/dashboard`",
      section: "Document Header & Metadata",
      subsection: "Editor Page (`/editor/[id]`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-001 ' + "Back button — arrow left navigates to `/dashboard`");
    }


    // This test validates: Back button — arrow left navigates to `/dashboard`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Document type selector dropdown with 4 options', async ({ page }) => {
    // Checkpoint 2: Document type selector — dropdown with 4 options:
    // Section: Document Header & Metadata > Editor Page (`/editor/[id]`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Document type selector — dropdown with 4 options:",
      section: "Document Header & Metadata",
      subsection: "Editor Page (`/editor/[id]`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-002 ' + "Document type selector — dropdown with 4 options:");
    }


    // This test validates: Document type selector — dropdown with 4 options:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Pending citation notice blue banner shows Saved X to your library Open Citation ', async ({ page }) => {
    // Checkpoint 3: Pending citation notice — blue banner shows "Saved 'X' to your library. Open Citation Dialog to cite it." when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s
    // Section: Document Header & Metadata > Editor Page (`/editor/[id]`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Pending citation notice — blue banner shows \"Saved 'X' to your library. Open Citation Dialog to cite it.\" when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s",
      section: "Document Header & Metadata",
      subsection: "Editor Page (`/editor/[id]`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-003 ' + "Pending citation notice — blue banner shows \"Saved 'X' to your library. Open Citation Dialog to cite it.\" when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s");
    }


    // This test validates: Pending citation notice — blue banner shows "Saved 'X' to your library. Open Citation Dialog to cite it." when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Editable document title in the left sidebar header', async ({ page }) => {
    // Checkpoint 4: Editable document title — in the left sidebar header
    // Section: Document Header & Metadata > Studio Page (`/studio`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editable document title — in the left sidebar header",
      section: "Document Header & Metadata",
      subsection: "Studio Page (`/studio`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-004 ' + "Editable document title — in the left sidebar header");
    }


    // This test validates: Editable document title — in the left sidebar header
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Project selector dropdown appears with multiple projects switches between them', async ({ page }) => {
    // Checkpoint 5: Project selector dropdown — appears with multiple projects, switches between them
    // Section: Document Header & Metadata > Studio Page (`/studio`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Project selector dropdown — appears with multiple projects, switches between them",
      section: "Document Header & Metadata",
      subsection: "Studio Page (`/studio`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-005 ' + "Project selector dropdown — appears with multiple projects, switches between them");
    }


    // This test validates: Project selector dropdown — appears with multiple projects, switches between them
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: URL parameter support projectIdX pre-selects project fix was studioid studioproj', async ({ page }) => {
    // Checkpoint 6: URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode
    // Section: Document Header & Metadata > Studio Page (`/studio`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode",
      section: "Document Header & Metadata",
      subsection: "Studio Page (`/studio`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-006 ' + "URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode");
    }


    // This test validates: URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Editing mode full editing described as Direct changes to document', async ({ page }) => {
    // Checkpoint 7: Editing mode — full editing, described as "Direct changes to document"
    // Section: Editor Modes > Editor Page

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Editing mode — full editing, described as \"Direct changes to document\"",
      section: "Editor Modes",
      subsection: "Editor Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-007 ' + "Editing mode — full editing, described as \"Direct changes to document\"");
    }


    // This test validates: Editing mode — full editing, described as "Direct changes to document"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Viewing mode read-only editor becomes non-editable described as Read-only no edi', async ({ page }) => {
    // Checkpoint 8: Viewing mode — read-only, editor becomes non-editable, described as "Read-only, no edits"
    // Section: Editor Modes > Editor Page

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Viewing mode — read-only, editor becomes non-editable, described as \"Read-only, no edits\"",
      section: "Editor Modes",
      subsection: "Editor Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-008 ' + "Viewing mode — read-only, editor becomes non-editable, described as \"Read-only, no edits\"");
    }


    // This test validates: Viewing mode — read-only, editor becomes non-editable, described as "Read-only, no edits"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Mode toggle dropdown in TopBar shows icon label description for each mode', async ({ page }) => {
    // Checkpoint 9: Mode toggle dropdown in TopBar shows icon + label + description for each mode
    // Section: Editor Modes > Editor Page

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Mode toggle dropdown in TopBar shows icon + label + description for each mode",
      section: "Editor Modes",
      subsection: "Editor Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-009 ' + "Mode toggle dropdown in TopBar shows icon + label + description for each mode");
    }


    // This test validates: Mode toggle dropdown in TopBar shows icon + label + description for each mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Write mode AI drafting assistance shows AI Intensity bar', async ({ page }) => {
    // Checkpoint 10: Write mode — AI drafting assistance, shows AI Intensity bar
    // Section: Editor Modes > Studio Page

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Write mode — AI drafting assistance, shows AI Intensity bar",
      section: "Editor Modes",
      subsection: "Studio Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-010 ' + "Write mode — AI drafting assistance, shows AI Intensity bar");
    }


    // This test validates: Write mode — AI drafting assistance, shows AI Intensity bar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Learn mode guided educational mode AI teaches instead of writing for you', async ({ page }) => {
    // Checkpoint 11: Learn mode — guided educational mode, AI teaches instead of writing for you
    // Section: Editor Modes > Studio Page

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Learn mode — guided educational mode, AI teaches instead of writing for you",
      section: "Editor Modes",
      subsection: "Studio Page",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-011 ' + "Learn mode — guided educational mode, AI teaches instead of writing for you");
    }


    // This test validates: Learn mode — guided educational mode, AI teaches instead of writing for you
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Menu appears when typing at start of block or after whitespace', async ({ page }) => {
    // Checkpoint 12: Menu appears when typing `/` at start of block or after whitespace
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Menu appears when typing `/` at start of block or after whitespace",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-012 ' + "Menu appears when typing `/` at start of block or after whitespace");
    }


    // This test validates: Menu appears when typing `/` at start of block or after whitespace
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Fuzzy search filtering typing after filters commands by title description or cat', async ({ page }) => {
    // Checkpoint 13: Fuzzy search filtering — typing after `/` filters commands by title, description, or category
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Fuzzy search filtering — typing after `/` filters commands by title, description, or category",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-013 ' + "Fuzzy search filtering — typing after `/` filters commands by title, description, or category");
    }


    // This test validates: Fuzzy search filtering — typing after `/` filters commands by title, description, or category
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Keyboard navigation Arrow UpDown to navigate Enter to select Escape to close', async ({ page }) => {
    // Checkpoint 14: Keyboard navigation — Arrow Up/Down to navigate, Enter to select, Escape to close
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Keyboard navigation — Arrow Up/Down to navigate, Enter to select, Escape to close",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-014 ' + "Keyboard navigation — Arrow Up/Down to navigate, Enter to select, Escape to close");
    }


    // This test validates: Keyboard navigation — Arrow Up/Down to navigate, Enter to select, Escape to close
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Category headers commands grouped under Basic Academic AI Tools', async ({ page }) => {
    // Checkpoint 15: Category headers — commands grouped under Basic, Academic, AI, Tools
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Category headers — commands grouped under Basic, Academic, AI, Tools",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-015 ' + "Category headers — commands grouped under Basic, Academic, AI, Tools");
    }


    // This test validates: Category headers — commands grouped under Basic, Academic, AI, Tools
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Menu shows icon title description for each command', async ({ page }) => {
    // Checkpoint 16: Menu shows icon + title + description for each command
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Menu shows icon + title + description for each command",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-016 ' + "Menu shows icon + title + description for each command");
    }


    // This test validates: Menu shows icon + title + description for each command
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: No commands empty state when filter yields no results', async ({ page }) => {
    // Checkpoint 17: "No commands" empty state when filter yields no results
    // Section: Structural Blocks (via Slash Commands) > Slash Menu UX

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "\"No commands\" empty state when filter yields no results",
      section: "Structural Blocks (via Slash Commands)",
      subsection: "Slash Menu UX",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-017 ' + "\"No commands\" empty state when filter yields no results");
    }


    // This test validates: "No commands" empty state when filter yields no results
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Tables are resizable drag column borders', async ({ page }) => {
    // Checkpoint 18: Tables are **resizable** (drag column borders)
    // Section: Academic Blocks (via Slash Commands) > Table Features

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Tables are **resizable** (drag column borders)",
      section: "Academic Blocks (via Slash Commands)",
      subsection: "Table Features",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-018 ' + "Tables are **resizable** (drag column borders)");
    }


    // This test validates: Tables are **resizable** (drag column borders)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: First row renders as header', async ({ page }) => {
    // Checkpoint 19: First row renders as header
    // Section: Academic Blocks (via Slash Commands) > Table Features

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "First row renders as header",
      section: "Academic Blocks (via Slash Commands)",
      subsection: "Table Features",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-019 ' + "First row renders as header");
    }


    // This test validates: First row renders as header
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Tables have CSS class academic-table', async ({ page }) => {
    // Checkpoint 20: Tables have CSS class `academic-table`
    // Section: Academic Blocks (via Slash Commands) > Table Features

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Tables have CSS class `academic-table`",
      section: "Academic Blocks (via Slash Commands)",
      subsection: "Table Features",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-020 ' + "Tables have CSS class `academic-table`");
    }


    // This test validates: Tables have CSS class `academic-table`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Positioning toolbar appears above the selection centered horizontally', async ({ page }) => {
    // Checkpoint 21: Positioning — toolbar appears above the selection, centered horizontally
    // Section: Floating Selection Toolbar

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Positioning — toolbar appears above the selection, centered horizontally",
      section: "Floating Selection Toolbar",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-021 ' + "Positioning — toolbar appears above the selection, centered horizontally");
    }


    // This test validates: Positioning — toolbar appears above the selection, centered horizontally
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Auto-hide disappears when selection is cleared or editor loses focus 150ms delay', async ({ page }) => {
    // Checkpoint 22: Auto-hide — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)
    // Section: Floating Selection Toolbar

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Auto-hide — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)",
      section: "Floating Selection Toolbar",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-022 ' + "Auto-hide — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)");
    }


    // This test validates: Auto-hide — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: CmdShiftK prompts for URL via windowprompt', async ({ page }) => {
    // Checkpoint 23: Cmd+Shift+K — prompts for URL via `window.prompt`
    // Section: Link Management > Link Insertion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Cmd+Shift+K — prompts for URL via `window.prompt`",
      section: "Link Management",
      subsection: "Link Insertion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-023 ' + "Cmd+Shift+K — prompts for URL via `window.prompt`");
    }


    // This test validates: Cmd+Shift+K — prompts for URL via `window.prompt`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Selection toolbar link button prompts for URL pre-fills with existing link URL', async ({ page }) => {
    // Checkpoint 24: Selection toolbar link button — prompts for URL, pre-fills with existing link URL
    // Section: Link Management > Link Insertion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Selection toolbar link button — prompts for URL, pre-fills with existing link URL",
      section: "Link Management",
      subsection: "Link Insertion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-024 ' + "Selection toolbar link button — prompts for URL, pre-fills with existing link URL");
    }


    // This test validates: Selection toolbar link button — prompts for URL, pre-fills with existing link URL
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Auto-linking URLs pasted or typed are auto-detected autolink true', async ({ page }) => {
    // Checkpoint 25: Auto-linking — URLs pasted or typed are auto-detected (`autolink: true`)
    // Section: Link Management > Link Insertion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Auto-linking — URLs pasted or typed are auto-detected (`autolink: true`)",
      section: "Link Management",
      subsection: "Link Insertion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-025 ' + "Auto-linking — URLs pasted or typed are auto-detected (`autolink: true`)");
    }


    // This test validates: Auto-linking — URLs pasted or typed are auto-detected (`autolink: true`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Link on paste pasting a URL over selected text creates a link linkOnPaste true', async ({ page }) => {
    // Checkpoint 26: Link on paste — pasting a URL over selected text creates a link (`linkOnPaste: true`)
    // Section: Link Management > Link Insertion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Link on paste — pasting a URL over selected text creates a link (`linkOnPaste: true`)",
      section: "Link Management",
      subsection: "Link Insertion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-026 ' + "Link on paste — pasting a URL over selected text creates a link (`linkOnPaste: true`)");
    }


    // This test validates: Link on paste — pasting a URL over selected text creates a link (`linkOnPaste: true`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Links do NOT open on click in the editor openOnClick false', async ({ page }) => {
    // Checkpoint 27: Links do NOT open on click in the editor (`openOnClick: false`)
    // Section: Link Management > Link Insertion

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Links do NOT open on click in the editor (`openOnClick: false`)",
      section: "Link Management",
      subsection: "Link Insertion",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-027 ' + "Links do NOT open on click in the editor (`openOnClick: false`)");
    }


    // This test validates: Links do NOT open on click in the editor (`openOnClick: false`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Clicking a link shows a floating popover with', async ({ page }) => {
    // Checkpoint 28: Clicking a link shows a floating popover with:
    // Section: Link Management > LinkPopover (Editor page only)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Clicking a link shows a floating popover with:",
      section: "Link Management",
      subsection: "LinkPopover (Editor page only)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-028 ' + "Clicking a link shows a floating popover with:");
    }


    // This test validates: Clicking a link shows a floating popover with:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Enter key confirms edit Escape cancels', async ({ page }) => {
    // Checkpoint 29: Enter key confirms edit, Escape cancels
    // Section: Link Management > LinkPopover (Editor page only)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Enter key confirms edit, Escape cancels",
      section: "Link Management",
      subsection: "LinkPopover (Editor page only)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-029 ' + "Enter key confirms edit, Escape cancels");
    }


    // This test validates: Enter key confirms edit, Escape cancels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Popover positions above the clicked link', async ({ page }) => {
    // Checkpoint 30: Popover positions above the clicked link
    // Section: Link Management > LinkPopover (Editor page only)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "Popover positions above the clicked link",
      section: "Link Management",
      subsection: "LinkPopover (Editor page only)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-030 ' + "Popover positions above the clicked link");
    }


    // This test validates: Popover positions above the clicked link
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Opens via CmdShiftC keyboard shortcut', async ({ page }) => {
    // Checkpoint 31: **Opens via** `Cmd+Shift+C` keyboard shortcut
    // Section: Citation System > Citation Dialog

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "**Opens via** `Cmd+Shift+C` keyboard shortcut",
      section: "Citation System",
      subsection: "Citation Dialog",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-031 ' + "**Opens via** `Cmd+Shift+C` keyboard shortcut");
    }


    // This test validates: **Opens via** `Cmd+Shift+C` keyboard shortcut
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Opens via slash command if available', async ({ page }) => {
    // Checkpoint 32: **Opens via** slash command (if available)
    // Section: Citation System > Citation Dialog

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "**Opens via** slash command (if available)",
      section: "Citation System",
      subsection: "Citation Dialog",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-032 ' + "**Opens via** slash command (if available)");
    }


    // This test validates: **Opens via** slash command (if available)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Opens via button in Studio left sidebar references section', async ({ page }) => {
    // Checkpoint 33: **Opens via** "+" button in Studio left sidebar references section
    // Section: Citation System > Citation Dialog

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "**Opens via** \"+\" button in Studio left sidebar references section",
      section: "Citation System",
      subsection: "Citation Dialog",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-033 ' + "**Opens via** \"+\" button in Studio left sidebar references section");
    }


    // This test validates: **Opens via** "+" button in Studio left sidebar references section
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Opens via reference sidebar Add button', async ({ page }) => {
    // Checkpoint 34: **Opens via** reference sidebar "Add" button
    // Section: Citation System > Citation Dialog

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/editor/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertEditorCheckpoint({
      page,
      description: "**Opens via** reference sidebar \"Add\" button",
      section: "Citation System",
      subsection: "Citation Dialog",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled editor checkpoint: cp-034 ' + "**Opens via** reference sidebar \"Add\" button");
    }


    // This test validates: **Opens via** reference sidebar "Add" button
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
