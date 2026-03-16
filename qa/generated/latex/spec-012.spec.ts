/**
 * Auto-generated Playwright test for latex/spec-012
 * Source: e2e/specs/latex/spec-012.md
 * Generated: 2026-03-15T17:48:16.088Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-012
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-012', () => {
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

  test('cp-000: Cite-tab result click copies citekey to the clipboard and dispatches latexinsert', async ({ page }) => {
    // Checkpoint 0: Cite-tab result click copies `\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Cite-tab result click copies `\\\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "Cite-tab result click copies `\\\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`");
    }


    // This test validates: Cite-tab result click copies `\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Cite-tab copied state text is Copied citekey for the last clicked result only', async ({ page }) => {
    // Checkpoint 1: Cite-tab copied state text is `Copied \\cite{key}` for the last clicked result only
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Cite-tab copied state text is `Copied \\\\cite{key}` for the last clicked result only",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "Cite-tab copied state text is `Copied \\\\cite{key}` for the last clicked result only");
    }


    // This test validates: Cite-tab copied state text is `Copied \\cite{key}` for the last clicked result only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Check-tab primary button label is Run LaTeX Checks', async ({ page }) => {
    // Checkpoint 2: Check-tab primary button label is `Run LaTeX Checks`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Check-tab primary button label is `Run LaTeX Checks`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "Check-tab primary button label is `Run LaTeX Checks`");
    }


    // This test validates: Check-tab primary button label is `Run LaTeX Checks`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Check-tab initial helper text reads Check for unused refs missing labels package', async ({ page }) => {
    // Checkpoint 3: Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`
    // Section: Quick Test Workflows > Agent Panel Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`",
      section: "Quick Test Workflows",
      subsection: "Agent Panel Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`");
    }


    // This test validates: Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: File tree and agent panel are both closed by default the workspace does not open', async ({ page }) => {
    // Checkpoint 4: File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded");
    }


    // This test validates: File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Export PDF downloads only when a compiled PDF blob URL already exists the export', async ({ page }) => {
    // Checkpoint 5: Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically");
    }


    // This test validates: Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Source mode is the real default editor mode visual mode is opt-in', async ({ page }) => {
    // Checkpoint 6: Source mode is the real default editor mode; visual mode is opt-in
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Source mode is the real default editor mode; visual mode is opt-in",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Source mode is the real default editor mode; visual mode is opt-in");
    }


    // This test validates: Source mode is the real default editor mode; visual mode is opt-in
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Live preview is the real default preview mode PDF preview is selected automatica', async ({ page }) => {
    // Checkpoint 7: Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile");
    }


    // This test validates: Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Project deletion is still confirmation-free on the list page but file deletion i', async ({ page }) => {
    // Checkpoint 8: Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`");
    }


    // This test validates: Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Slash-command menu has no explicit No commands empty-state row it simply unmount', async ({ page }) => {
    // Checkpoint 9: Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches");
    }


    // This test validates: Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Draft-tab and cite-tab request failures are largely silent in the current UI ins', async ({ page }) => {
    // Checkpoint 10: Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners");
    }


    // This test validates: Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: The workspace mobile experience relies on full-screen overlays and an EditorPrev', async ({ page }) => {
    // Checkpoint 11: The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout
    // Section: Quick Test Workflows > Actual Current Behavior Corrections

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout",
      section: "Quick Test Workflows",
      subsection: "Actual Current Behavior Corrections",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout");
    }


    // This test validates: The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Error card title text is exactly Unable to open this paper', async ({ page }) => {
    // Checkpoint 12: Error card title text is exactly "Unable to open this paper"
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error card title text is exactly \"Unable to open this paper\"",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "Error card title text is exactly \"Unable to open this paper\"");
    }


    // This test validates: Error card title text is exactly "Unable to open this paper"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Error card fallback text when error state is null This LaTeX workspace could not', async ({ page }) => {
    // Checkpoint 13: Error card fallback text when `error` state is null: "This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing."
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error card fallback text when `error` state is null: \"This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing.\"",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "Error card fallback text when `error` state is null: \"This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing.\"");
    }


    // This test validates: Error card fallback text when `error` state is null: "This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Catch block uses the thrown errors message when it is an Error instance otherwis', async ({ page }) => {
    // Checkpoint 14: Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows "Unable to load this LaTeX workspace right now."
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows \"Unable to load this LaTeX workspace right now.\"",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows \"Unable to load this LaTeX workspace right now.\"");
    }


    // This test validates: Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows "Unable to load this LaTeX workspace right now."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Error card Retry button includes an ArrowClockwise icon size 16', async ({ page }) => {
    // Checkpoint 15: Error card "Retry" button includes an ArrowClockwise icon (size 16)
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error card \"Retry\" button includes an ArrowClockwise icon (size 16)",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "Error card \"Retry\" button includes an ArrowClockwise icon (size 16)");
    }


    // This test validates: Error card "Retry" button includes an ArrowClockwise icon (size 16)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Error card Back to Papers button text is exactly Back to Papers', async ({ page }) => {
    // Checkpoint 16: Error card "Back to Papers" button text is exactly "Back to Papers"
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error card \"Back to Papers\" button text is exactly \"Back to Papers\"",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "Error card \"Back to Papers\" button text is exactly \"Back to Papers\"");
    }


    // This test validates: Error card "Back to Papers" button text is exactly "Back to Papers"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: useEffect cleanup sets a cancelled flag to prevent state updates after unmount', async ({ page }) => {
    // Checkpoint 17: useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount");
    }


    // This test validates: useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Loading spinner text below the CircleNotch reads Loading editor', async ({ page }) => {
    // Checkpoint 18: Loading spinner text below the CircleNotch reads "Loading editor..."
    // Section: Quick Test Workflows > Editor Page (`[projectId]/page.tsx`) — Loading & Error States

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Loading spinner text below the CircleNotch reads \"Loading editor...\"",
      section: "Quick Test Workflows",
      subsection: "Editor Page (`[projectId]/page.tsx`) — Loading & Error States",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "Loading spinner text below the CircleNotch reads \"Loading editor...\"");
    }


    // This test validates: Loading spinner text below the CircleNotch reads "Loading editor..."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: A separate amber compile-error banner renders above the editor below the top bar', async ({ page }) => {
    // Checkpoint 19: A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null
    // Section: Quick Test Workflows > Workspace — Compile Error Banner

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null",
      section: "Quick Test Workflows",
      subsection: "Workspace — Compile Error Banner",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null");
    }


    // This test validates: A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Compile-error banner uses a WarningCircle icon size 14 and 11px amber text', async ({ page }) => {
    // Checkpoint 20: Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text
    // Section: Quick Test Workflows > Workspace — Compile Error Banner

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text",
      section: "Quick Test Workflows",
      subsection: "Workspace — Compile Error Banner",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text");
    }


    // This test validates: Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Compile-error banner is distinct from the error-gutter panel below the editor', async ({ page }) => {
    // Checkpoint 21: Compile-error banner is distinct from the error-gutter panel below the editor
    // Section: Quick Test Workflows > Workspace — Compile Error Banner

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compile-error banner is distinct from the error-gutter panel below the editor",
      section: "Quick Test Workflows",
      subsection: "Workspace — Compile Error Banner",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "Compile-error banner is distinct from the error-gutter panel below the editor");
    }


    // This test validates: Compile-error banner is distinct from the error-gutter panel below the editor
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: getBibContent callback finds the first file in the files array whose path ends w', async ({ page }) => {
    // Checkpoint 22: `getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`
    // Section: Quick Test Workflows > Workspace — BibTeX Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`",
      section: "Quick Test Workflows",
      subsection: "Workspace — BibTeX Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "`getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`");
    }


    // This test validates: `getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: setBibContent store action is called via useEffect whenever the files array chan', async ({ page }) => {
    // Checkpoint 23: `setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync
    // Section: Quick Test Workflows > Workspace — BibTeX Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync",
      section: "Quick Test Workflows",
      subsection: "Workspace — BibTeX Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "`setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync");
    }


    // This test validates: `setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Error fix extracts context as error line 2 lines 5 lines total errorLineIdx - 2 ', async ({ page }) => {
    // Checkpoint 24: Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)
    // Section: Quick Test Workflows > Workspace — AI Error Fix Flow (`handleFixError`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)",
      section: "Quick Test Workflows",
      subsection: "Workspace — AI Error Fix Flow (`handleFixError`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)");
    }


    // This test validates: Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Error fix POSTs to apilatexgenerate with command fix description context errorMe', async ({ page }) => {
    // Checkpoint 25: Error fix POSTs to `/api/latex/generate` with `{ command: "fix", description: context, errorMessage: diagnostic.message }`
    // Section: Quick Test Workflows > Workspace — AI Error Fix Flow (`handleFixError`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error fix POSTs to `/api/latex/generate` with `{ command: \"fix\", description: context, errorMessage: diagnostic.message }`",
      section: "Quick Test Workflows",
      subsection: "Workspace — AI Error Fix Flow (`handleFixError`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "Error fix POSTs to `/api/latex/generate` with `{ command: \"fix\", description: context, errorMessage: diagnostic.message }`");
    }


    // This test validates: Error fix POSTs to `/api/latex/generate` with `{ command: "fix", description: context, errorMessage: diagnostic.message }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Error fix streams the response body and replaces the context range in the CodeMi', async ({ page }) => {
    // Checkpoint 26: Error fix streams the response body and replaces the context range in the CodeMirror editor
    // Section: Quick Test Workflows > Workspace — AI Error Fix Flow (`handleFixError`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error fix streams the response body and replaces the context range in the CodeMirror editor",
      section: "Quick Test Workflows",
      subsection: "Workspace — AI Error Fix Flow (`handleFixError`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "Error fix streams the response body and replaces the context range in the CodeMirror editor");
    }


    // This test validates: Error fix streams the response body and replaces the context range in the CodeMirror editor
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: When the editor view is unavailable the fix text is copied to the clipboard as f', async ({ page }) => {
    // Checkpoint 27: When the editor view is unavailable, the fix text is copied to the clipboard as fallback
    // Section: Quick Test Workflows > Workspace — AI Error Fix Flow (`handleFixError`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "When the editor view is unavailable, the fix text is copied to the clipboard as fallback",
      section: "Quick Test Workflows",
      subsection: "Workspace — AI Error Fix Flow (`handleFixError`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "When the editor view is unavailable, the fix text is copied to the clipboard as fallback");
    }


    // This test validates: When the editor view is unavailable, the fix text is copied to the clipboard as fallback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Error fix errors are caught silently no toast or error banner', async ({ page }) => {
    // Checkpoint 28: Error fix errors are caught silently (no toast or error banner)
    // Section: Quick Test Workflows > Workspace — AI Error Fix Flow (`handleFixError`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error fix errors are caught silently (no toast or error banner)",
      section: "Quick Test Workflows",
      subsection: "Workspace — AI Error Fix Flow (`handleFixError`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "Error fix errors are caught silently (no toast or error banner)");
    }


    // This test validates: Error fix errors are caught silently (no toast or error banner)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Error gutter panel returns null renders nothing when the diagnostics array is em', async ({ page }) => {
    // Checkpoint 29: Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty");
    }


    // This test validates: Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Fix button appears only for errors not warnings only when onFixError is provided', async ({ page }) => {
    // Checkpoint 30: Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number");
    }


    // This test validates: Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Fix button icon sequence Wrench spinning CircleNotch 2000ms green Check 2000ms r', async ({ page }) => {
    // Checkpoint 31: Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets");
    }


    // This test validates: Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Clicking an error row toggles expandedcollapsed state CaretRight CaretDown', async ({ page }) => {
    // Checkpoint 32: Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)");
    }


    // This test validates: Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Expanded detail shows raw error message in monospace font when enriched explanat', async ({ page }) => {
    // Checkpoint 33: Expanded detail shows raw error message in monospace font when enriched explanation differs from raw
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Expanded detail shows raw error message in monospace font when enriched explanation differs from raw",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "Expanded detail shows raw error message in monospace font when enriched explanation differs from raw");
    }


    // This test validates: Expanded detail shows raw error message in monospace font when enriched explanation differs from raw
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Expanded detail shows a Lightbulb icon suggestion in emerald text when a fix sug', async ({ page }) => {
    // Checkpoint 34: Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-012');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available");
    }


    // This test validates: Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available
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
