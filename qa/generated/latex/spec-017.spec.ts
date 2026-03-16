/**
 * Auto-generated Playwright test for latex/spec-017
 * Source: e2e/specs/latex/spec-017.md
 * Generated: 2026-03-15T17:53:05.299Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-017
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-017', () => {
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

  test('cp-000: File delete DOES have a confirmation dialog windowconfirmDelete path is called i', async ({ page }) => {
    // Checkpoint 0: **File delete DOES have a confirmation dialog**: `window.confirm("Delete {path}?")` is called in file-tree.tsx — the Codex audit statement "Project and file deletions currently have no confirmation dialog" is only correct for project deletion (page.tsx), not file deletion
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**File delete DOES have a confirmation dialog**: `window.confirm(\"Delete {path}?\")` is called in file-tree.tsx — the Codex audit statement \"Project and file deletions currently have no confirmation dialog\" is only correct for project deletion (page.tsx), not file deletion",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "**File delete DOES have a confirmation dialog**: `window.confirm(\"Delete {path}?\")` is called in file-tree.tsx — the Codex audit statement \"Project and file deletions currently have no confirmation dialog\" is only correct for project deletion (page.tsx), not file deletion");
    }


    // This test validates: **File delete DOES have a confirmation dialog**: `window.confirm("Delete {path}?")` is called in file-tree.tsx — the Codex audit statement "Project and file deletions currently have no confirmation dialog" is only correct for project deletion (page.tsx), not file deletion
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Draft-tab auto-send for section drafting uses a 50ms setTimeout not a custom eve', async ({ page }) => {
    // Checkpoint 1: **Draft-tab auto-send for section drafting uses a 50ms setTimeout**, not a custom event dispatch — the existing doc mentions `latex:draft-section` event but the actual mechanism is `pendingDraftSection` store state consumed by a useEffect
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Draft-tab auto-send for section drafting uses a 50ms setTimeout**, not a custom event dispatch — the existing doc mentions `latex:draft-section` event but the actual mechanism is `pendingDraftSection` store state consumed by a useEffect",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "**Draft-tab auto-send for section drafting uses a 50ms setTimeout**, not a custom event dispatch — the existing doc mentions `latex:draft-section` event but the actual mechanism is `pendingDraftSection` store state consumed by a useEffect");
    }


    // This test validates: **Draft-tab auto-send for section drafting uses a 50ms setTimeout**, not a custom event dispatch — the existing doc mentions `latex:draft-section` event but the actual mechanism is `pendingDraftSection` store state consumed by a useEffect
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: SourceEditor does not import the custom completions from completionsts current e', async ({ page }) => {
    // Checkpoint 2: `SourceEditor` does not import the custom completions from `completions.ts`; current editor behavior comes from `codemirror-lang-latex` plus CodeMirror built-ins
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`SourceEditor` does not import the custom completions from `completions.ts`; current editor behavior comes from `codemirror-lang-latex` plus CodeMirror built-ins",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "`SourceEditor` does not import the custom completions from `completions.ts`; current editor behavior comes from `codemirror-lang-latex` plus CodeMirror built-ins");
    }


    // This test validates: `SourceEditor` does not import the custom completions from `completions.ts`; current editor behavior comes from `codemirror-lang-latex` plus CodeMirror built-ins
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: SourceEditor does not import ai-completion-extensionts ghost-text AI completion ', async ({ page }) => {
    // Checkpoint 3: `SourceEditor` does not import `ai-completion-extension.ts`; ghost-text AI completion is not active in the current workspace
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`SourceEditor` does not import `ai-completion-extension.ts`; ghost-text AI completion is not active in the current workspace",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "`SourceEditor` does not import `ai-completion-extension.ts`; ghost-text AI completion is not active in the current workspace");
    }


    // This test validates: `SourceEditor` does not import `ai-completion-extension.ts`; ghost-text AI completion is not active in the current workspace
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: SourceEditor does not import track-changes-extensionts switching to Suggest mode', async ({ page }) => {
    // Checkpoint 4: `SourceEditor` does not import `track-changes-extension.ts`; switching to `Suggest` mode changes store state only and does not mount inline diff decorations
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`SourceEditor` does not import `track-changes-extension.ts`; switching to `Suggest` mode changes store state only and does not mount inline diff decorations",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "`SourceEditor` does not import `track-changes-extension.ts`; switching to `Suggest` mode changes store state only and does not mount inline diff decorations");
    }


    // This test validates: `SourceEditor` does not import `track-changes-extension.ts`; switching to `Suggest` mode changes store state only and does not mount inline diff decorations
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: CmdCtrlS manual save does not clear saveTimerRef so a pending autosave can still', async ({ page }) => {
    // Checkpoint 5: `Cmd/Ctrl+S` manual save does not clear `saveTimerRef`, so a pending autosave can still fire after the manual save completes
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`Cmd/Ctrl+S` manual save does not clear `saveTimerRef`, so a pending autosave can still fire after the manual save completes",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "`Cmd/Ctrl+S` manual save does not clear `saveTimerRef`, so a pending autosave can still fire after the manual save completes");
    }


    // This test validates: `Cmd/Ctrl+S` manual save does not clear `saveTimerRef`, so a pending autosave can still fire after the manual save completes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Export PDF is not visually disabled when no compiled PDF exists handleExportPdf ', async ({ page }) => {
    // Checkpoint 6: Export PDF is not visually disabled when no compiled PDF exists; `handleExportPdf()` simply returns early when `compiledPdfUrl` is null
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Export PDF is not visually disabled when no compiled PDF exists; `handleExportPdf()` simply returns early when `compiledPdfUrl` is null",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Export PDF is not visually disabled when no compiled PDF exists; `handleExportPdf()` simply returns early when `compiledPdfUrl` is null");
    }


    // This test validates: Export PDF is not visually disabled when no compiled PDF exists; `handleExportPdf()` simply returns early when `compiledPdfUrl` is null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Compiled PDF blob URLs created after successful compile are never revoked on rep', async ({ page }) => {
    // Checkpoint 7: Compiled PDF blob URLs created after successful compile are never revoked on replacement or unmount; only ad hoc `.tex` / `.zip` export URLs are cleaned up
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compiled PDF blob URLs created after successful compile are never revoked on replacement or unmount; only ad hoc `.tex` / `.zip` export URLs are cleaned up",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "Compiled PDF blob URLs created after successful compile are never revoked on replacement or unmount; only ad hoc `.tex` / `.zip` export URLs are cleaned up");
    }


    // This test validates: Compiled PDF blob URLs created after successful compile are never revoked on replacement or unmount; only ad hoc `.tex` / `.zip` export URLs are cleaned up
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: createAddToDictionaryAction points at apilatexspell-checkadd but there is no mat', async ({ page }) => {
    // Checkpoint 8: `createAddToDictionaryAction()` points at `/api/latex/spell-check/add`, but there is no matching API route under `src/app/api/latex/spell-check/add`
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`createAddToDictionaryAction()` points at `/api/latex/spell-check/add`, but there is no matching API route under `src/app/api/latex/spell-check/add`",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "`createAddToDictionaryAction()` points at `/api/latex/spell-check/add`, but there is no matching API route under `src/app/api/latex/spell-check/add`");
    }


    // This test validates: `createAddToDictionaryAction()` points at `/api/latex/spell-check/add`, but there is no matching API route under `src/app/api/latex/spell-check/add`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: latex latexnew and latexprojectId currently have no route-level loadingtsx or er', async ({ page }) => {
    // Checkpoint 9: `/latex`, `/latex/new`, and `/latex/[projectId]` currently have no route-level `loading.tsx` or `error.tsx`; recovery is handled inline at the page and component level
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`/latex`, `/latex/new`, and `/latex/[projectId]` currently have no route-level `loading.tsx` or `error.tsx`; recovery is handled inline at the page and component level",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "`/latex`, `/latex/new`, and `/latex/[projectId]` currently have no route-level `loading.tsx` or `error.tsx`; recovery is handled inline at the page and component level");
    }


    // This test validates: `/latex`, `/latex/new`, and `/latex/[projectId]` currently have no route-level `loading.tsx` or `error.tsx`; recovery is handled inline at the page and component level
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Several icon-only controls rely on title tooltips instead of explicit aria-label', async ({ page }) => {
    // Checkpoint 10: Several icon-only controls rely on `title` tooltips instead of explicit `aria-label`s; the new-file type select is the notable exception with a dedicated accessibility label
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Several icon-only controls rely on `title` tooltips instead of explicit `aria-label`s; the new-file type select is the notable exception with a dedicated accessibility label",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "Several icon-only controls rely on `title` tooltips instead of explicit `aria-label`s; the new-file type select is the notable exception with a dedicated accessibility label");
    }


    // This test validates: Several icon-only controls rely on `title` tooltips instead of explicit `aria-label`s; the new-file type select is the notable exception with a dedicated accessibility label
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
