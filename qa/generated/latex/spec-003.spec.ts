/**
 * Auto-generated Playwright test for latex/spec-003
 * Source: e2e/specs/latex/spec-003.md
 * Generated: 2026-03-14T09:55:00.618Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-003
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-003', () => {
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

  test('cp-000: Section headings section renders as h1-style subsection as h2 subsubsection as h', async ({ page }) => {
    // Checkpoint 0: Section headings — `\section{}` renders as h1-style, `\subsection{}` as h2, `\subsubsection{}` as h3
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Section headings — `\\section{}` renders as h1-style, `\\subsection{}` as h2, `\\subsubsection{}` as h3",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "Section headings — `\\section{}` renders as h1-style, `\\subsection{}` as h2, `\\subsubsection{}` as h3");
    }


    // This test validates: Section headings — `\section{}` renders as h1-style, `\subsection{}` as h2, `\subsubsection{}` as h3
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Bold text textbf shows visual bold styling', async ({ page }) => {
    // Checkpoint 1: Bold text — `\textbf{}` shows visual bold styling
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Bold text — `\\textbf{}` shows visual bold styling",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "Bold text — `\\textbf{}` shows visual bold styling");
    }


    // This test validates: Bold text — `\textbf{}` shows visual bold styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Italic text textit shows visual italic styling', async ({ page }) => {
    // Checkpoint 2: Italic text — `\textit{}` shows visual italic styling
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Italic text — `\\textit{}` shows visual italic styling",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "Italic text — `\\textit{}` shows visual italic styling");
    }


    // This test validates: Italic text — `\textit{}` shows visual italic styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Underline underline shows underline decoration', async ({ page }) => {
    // Checkpoint 3: Underline — `\underline{}` shows underline decoration
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Underline — `\\underline{}` shows underline decoration",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Underline — `\\underline{}` shows underline decoration");
    }


    // This test validates: Underline — `\underline{}` shows underline decoration
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Monospace texttt shows monospace styling', async ({ page }) => {
    // Checkpoint 4: Monospace — `\texttt{}` shows monospace styling
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Monospace — `\\texttt{}` shows monospace styling",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "Monospace — `\\texttt{}` shows monospace styling");
    }


    // This test validates: Monospace — `\texttt{}` shows monospace styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Maintains underlying LaTeX source decorations dont change the source', async ({ page }) => {
    // Checkpoint 5: Maintains underlying LaTeX source — decorations don't change the source
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Maintains underlying LaTeX source — decorations don't change the source",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "Maintains underlying LaTeX source — decorations don't change the source");
    }


    // This test validates: Maintains underlying LaTeX source — decorations don't change the source
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Content changes trigger onChange callback', async ({ page }) => {
    // Checkpoint 6: Content changes trigger `onChange` callback
    // Section: Visual Editor (WYSIWYM)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Content changes trigger `onChange` callback",
      section: "Visual Editor (WYSIWYM)",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Content changes trigger `onChange` callback");
    }


    // This test validates: Content changes trigger `onChange` callback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: TitleAuthorDate extracted from title author date', async ({ page }) => {
    // Checkpoint 7: Title/Author/Date — extracted from `\title{}`, `\author{}`, `\date{}`
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Title/Author/Date — extracted from `\\title{}`, `\\author{}`, `\\date{}`",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "Title/Author/Date — extracted from `\\title{}`, `\\author{}`, `\\date{}`");
    }


    // This test validates: Title/Author/Date — extracted from `\title{}`, `\author{}`, `\date{}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Sections section subsection subsubsection rendered as headings', async ({ page }) => {
    // Checkpoint 8: Sections — `\section`, `\subsection`, `\subsubsection` rendered as headings
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Sections — `\\section`, `\\subsection`, `\\subsubsection` rendered as headings",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "Sections — `\\section`, `\\subsection`, `\\subsubsection` rendered as headings");
    }


    // This test validates: Sections — `\section`, `\subsection`, `\subsubsection` rendered as headings
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Abstract beginabstractendabstract rendered with styling', async ({ page }) => {
    // Checkpoint 9: Abstract — `\begin{abstract}...\end{abstract}` rendered with styling
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Abstract — `\\begin{abstract}...\\end{abstract}` rendered with styling",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "Abstract — `\\begin{abstract}...\\end{abstract}` rendered with styling");
    }


    // This test validates: Abstract — `\begin{abstract}...\end{abstract}` rendered with styling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Math rendering via KaTeX', async ({ page }) => {
    // Checkpoint 10: **Math rendering** via KaTeX:
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Math rendering** via KaTeX:",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "**Math rendering** via KaTeX:");
    }


    // This test validates: **Math rendering** via KaTeX:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Display math and', async ({ page }) => {
    // Checkpoint 11: Display math: `$$ ... $$` and `\[ ... \]`
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Display math: `$$ ... $$` and `\\[ ... \\]`",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "Display math: `$$ ... $$` and `\\[ ... \\]`");
    }


    // This test validates: Display math: `$$ ... $$` and `\[ ... \]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Inline math and', async ({ page }) => {
    // Checkpoint 12: Inline math: `$ ... $` and `\( ... \)`
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Inline math: `$ ... $` and `\\( ... \\)`",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "Inline math: `$ ... $` and `\\( ... \\)`");
    }


    // This test validates: Inline math: `$ ... $` and `\( ... \)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Equation environment beginequationendequation', async ({ page }) => {
    // Checkpoint 13: Equation environment: `\begin{equation}...\end{equation}`
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Equation environment: `\\begin{equation}...\\end{equation}`",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "Equation environment: `\\begin{equation}...\\end{equation}`");
    }


    // This test validates: Equation environment: `\begin{equation}...\end{equation}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Align environment beginalignendalign', async ({ page }) => {
    // Checkpoint 14: Align environment: `\begin{align}...\end{align}`
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Align environment: `\\begin{align}...\\end{align}`",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Align environment: `\\begin{align}...\\end{align}`");
    }


    // This test validates: Align environment: `\begin{align}...\end{align}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Lists itemize enumerate description environments', async ({ page }) => {
    // Checkpoint 15: Lists — itemize, enumerate, description environments
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Lists — itemize, enumerate, description environments",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "Lists — itemize, enumerate, description environments");
    }


    // This test validates: Lists — itemize, enumerate, description environments
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Tables tabular environment conversion', async ({ page }) => {
    // Checkpoint 16: Tables — tabular environment conversion
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Tables — tabular environment conversion",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "Tables — tabular environment conversion");
    }


    // This test validates: Tables — tabular environment conversion
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Text formatting bold italic underline monospace', async ({ page }) => {
    // Checkpoint 17: Text formatting — bold, italic, underline, monospace
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Text formatting — bold, italic, underline, monospace",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "Text formatting — bold, italic, underline, monospace");
    }


    // This test validates: Text formatting — bold, italic, underline, monospace
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Preamble removal usepackage and other preamble content hidden', async ({ page }) => {
    // Checkpoint 18: Preamble removal — `\usepackage` and other preamble content hidden
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Preamble removal — `\\usepackage` and other preamble content hidden",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "Preamble removal — `\\usepackage` and other preamble content hidden");
    }


    // This test validates: Preamble removal — `\usepackage` and other preamble content hidden
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Styling Computer Modern Serif font LaTeX-like appearance', async ({ page }) => {
    // Checkpoint 19: Styling — Computer Modern Serif font, LaTeX-like appearance
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Styling — Computer Modern Serif font, LaTeX-like appearance",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "Styling — Computer Modern Serif font, LaTeX-like appearance");
    }


    // This test validates: Styling — Computer Modern Serif font, LaTeX-like appearance
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Scroll sync preview follows editor scroll position', async ({ page }) => {
    // Checkpoint 20: Scroll sync — preview follows editor scroll position
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Scroll sync — preview follows editor scroll position",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "Scroll sync — preview follows editor scroll position");
    }


    // This test validates: Scroll sync — preview follows editor scroll position
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Error handling graceful fallback when math rendering fails', async ({ page }) => {
    // Checkpoint 21: Error handling — graceful fallback when math rendering fails
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error handling — graceful fallback when math rendering fails",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "Error handling — graceful fallback when math rendering fails");
    }


    // This test validates: Error handling — graceful fallback when math rendering fails
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Dark mode support adapts colors', async ({ page }) => {
    // Checkpoint 22: Dark mode support — adapts colors
    // Section: Preview Panel > Live Preview (KaTeX)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Dark mode support — adapts colors",
      section: "Preview Panel",
      subsection: "Live Preview (KaTeX)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "Dark mode support — adapts colors");
    }


    // This test validates: Dark mode support — adapts colors
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Embedded PDF viewer shows compiled PDF', async ({ page }) => {
    // Checkpoint 23: Embedded PDF viewer — shows compiled PDF
    // Section: Preview Panel > PDF Preview

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Embedded PDF viewer — shows compiled PDF",
      section: "Preview Panel",
      subsection: "PDF Preview",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "Embedded PDF viewer — shows compiled PDF");
    }


    // This test validates: Embedded PDF viewer — shows compiled PDF
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Displayed after successful compilation', async ({ page }) => {
    // Checkpoint 24: Displayed after successful compilation
    // Section: Preview Panel > PDF Preview

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Displayed after successful compilation",
      section: "Preview Panel",
      subsection: "PDF Preview",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "Displayed after successful compilation");
    }


    // This test validates: Displayed after successful compilation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Auto-switches to PDF mode on compilation success', async ({ page }) => {
    // Checkpoint 25: Auto-switches to PDF mode on compilation success
    // Section: Preview Panel > PDF Preview

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Auto-switches to PDF mode on compilation success",
      section: "Preview Panel",
      subsection: "PDF Preview",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "Auto-switches to PDF mode on compilation success");
    }


    // This test validates: Auto-switches to PDF mode on compilation success
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Compile button in top bar', async ({ page }) => {
    // Checkpoint 26: **Compile button** in top bar
    // Section: Compilation System > Compile Trigger

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Compile button** in top bar",
      section: "Compilation System",
      subsection: "Compile Trigger",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "**Compile button** in top bar");
    }


    // This test validates: **Compile button** in top bar
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: CmdEnter keyboard shortcut', async ({ page }) => {
    // Checkpoint 27: **Cmd+Enter** keyboard shortcut
    // Section: Compilation System > Compile Trigger

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Cmd+Enter** keyboard shortcut",
      section: "Compilation System",
      subsection: "Compile Trigger",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "**Cmd+Enter** keyboard shortcut");
    }


    // This test validates: **Cmd+Enter** keyboard shortcut
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: fix slash command triggers compilation', async ({ page }) => {
    // Checkpoint 28: `/fix` slash command — triggers compilation
    // Section: Compilation System > Compile Trigger

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`/fix` slash command — triggers compilation",
      section: "Compilation System",
      subsection: "Compile Trigger",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "`/fix` slash command — triggers compilation");
    }


    // This test validates: `/fix` slash command — triggers compilation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Auto-saves current file before compiling', async ({ page }) => {
    // Checkpoint 29: **Auto-saves** current file before compiling
    // Section: Compilation System > Compile Trigger

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Auto-saves** current file before compiling",
      section: "Compilation System",
      subsection: "Compile Trigger",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "**Auto-saves** current file before compiling");
    }


    // This test validates: **Auto-saves** current file before compiling
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Idle compile button ready', async ({ page }) => {
    // Checkpoint 30: Idle — compile button ready
    // Section: Compilation System > Compilation Status

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Idle — compile button ready",
      section: "Compilation System",
      subsection: "Compilation Status",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "Idle — compile button ready");
    }


    // This test validates: Idle — compile button ready
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Compiling loading state on button', async ({ page }) => {
    // Checkpoint 31: Compiling — loading state on button
    // Section: Compilation System > Compilation Status

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Compiling — loading state on button",
      section: "Compilation System",
      subsection: "Compilation Status",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "Compiling — loading state on button");
    }


    // This test validates: Compiling — loading state on button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Success success indicator auto-switches preview to PDF mode', async ({ page }) => {
    // Checkpoint 32: Success — success indicator, auto-switches preview to PDF mode
    // Section: Compilation System > Compilation Status

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Success — success indicator, auto-switches preview to PDF mode",
      section: "Compilation System",
      subsection: "Compilation Status",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "Success — success indicator, auto-switches preview to PDF mode");
    }


    // This test validates: Success — success indicator, auto-switches preview to PDF mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Error error indicator diagnostics displayed in error gutter', async ({ page }) => {
    // Checkpoint 33: Error — error indicator, diagnostics displayed in error gutter
    // Section: Compilation System > Compilation Status

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error — error indicator, diagnostics displayed in error gutter",
      section: "Compilation System",
      subsection: "Compilation Status",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "Error — error indicator, diagnostics displayed in error gutter");
    }


    // This test validates: Error — error indicator, diagnostics displayed in error gutter
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Rate limit 429 waits Retry-After seconds retries up to 2 times', async ({ page }) => {
    // Checkpoint 34: Rate limit (429) — waits `Retry-After` seconds, retries up to 2 times
    // Section: Compilation System > Retry Logic

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Rate limit (429) — waits `Retry-After` seconds, retries up to 2 times",
      section: "Compilation System",
      subsection: "Retry Logic",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "Rate limit (429) — waits `Retry-After` seconds, retries up to 2 times");
    }


    // This test validates: Rate limit (429) — waits `Retry-After` seconds, retries up to 2 times
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
