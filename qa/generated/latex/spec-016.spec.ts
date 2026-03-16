/**
 * Auto-generated Playwright test for latex/spec-016
 * Source: e2e/specs/latex/spec-016.md
 * Generated: 2026-03-15T17:52:07.566Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-016
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-016', () => {
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

  test('cp-000: LaTeX comments stripped but escaped preserved via placeholder swap', async ({ page }) => {
    // Checkpoint 0: LaTeX comments (`%...`) stripped but escaped `\%` preserved via placeholder swap
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "LaTeX comments (`%...`) stripped but escaped `\\%` preserved via placeholder swap",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "LaTeX comments (`%...`) stripped but escaped `\\%` preserved via placeholder swap");
    }


    // This test validates: LaTeX comments (`%...`) stripped but escaped `\%` preserved via placeholder swap
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: protect noindent centering vfill hfill silently removed', async ({ page }) => {
    // Checkpoint 1: `\protect`, `\noindent`, `\centering`, `\vfill`, `\hfill` silently removed
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\protect`, `\\noindent`, `\\centering`, `\\vfill`, `\\hfill` silently removed",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "`\\protect`, `\\noindent`, `\\centering`, `\\vfill`, `\\hfill` silently removed");
    }


    // This test validates: `\protect`, `\noindent`, `\centering`, `\vfill`, `\hfill` silently removed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: pagenumbering pagestyle thispagestyle setcounter silently removed', async ({ page }) => {
    // Checkpoint 2: `\pagenumbering`, `\pagestyle`, `\thispagestyle`, `\setcounter` silently removed
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\pagenumbering`, `\\pagestyle`, `\\thispagestyle`, `\\setcounter` silently removed",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "`\\pagenumbering`, `\\pagestyle`, `\\thispagestyle`, `\\setcounter` silently removed");
    }


    // This test validates: `\pagenumbering`, `\pagestyle`, `\thispagestyle`, `\setcounter` silently removed
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Special characters amp __', async ({ page }) => {
    // Checkpoint 3: Special characters: `\$`→$, `\&`→&amp;, `\#`→#, `\_`→_, `\{`→{, `\}`→}
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Special characters: `\\$`→$, `\\&`→&amp;, `\\#`→#, `\\_`→_, `\\{`→{, `\\}`→}",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Special characters: `\\$`→$, `\\&`→&amp;, `\\#`→#, `\\_`→_, `\\{`→{, `\\}`→}");
    }


    // This test validates: Special characters: `\$`→$, `\&`→&amp;, `\#`→#, `\_`→_, `\{`→{, `\}`→}
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: double backslash renders as br line break', async ({ page }) => {
    // Checkpoint 4: `\\` (double backslash) renders as `<br />` line break
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\\\` (double backslash) renders as `<br />` line break",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "`\\\\` (double backslash) renders as `<br />` line break");
    }


    // This test validates: `\\` (double backslash) renders as `<br />` line break
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Double newlines converted to paragraph breaks pp', async ({ page }) => {
    // Checkpoint 5: Double newlines converted to paragraph breaks (`</p><p>`)
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Double newlines converted to paragraph breaks (`</p><p>`)",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "Double newlines converted to paragraph breaks (`</p><p>`)");
    }


    // This test validates: Double newlines converted to paragraph breaks (`</p><p>`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Preamble everything before begindocument and everything after enddocument is str', async ({ page }) => {
    // Checkpoint 6: Preamble (everything before `\begin{document}`) and everything after `\end{document}` is stripped
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Preamble (everything before `\\begin{document}`) and everything after `\\end{document}` is stripped",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Preamble (everything before `\\begin{document}`) and everything after `\\end{document}` is stripped");
    }


    // This test validates: Preamble (everything before `\begin{document}`) and everything after `\end{document}` is stripped
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: includegraphics renders as actual img tag with src apilateximagesservepathencode', async ({ page }) => {
    // Checkpoint 7: `\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "`\\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`");
    }


    // This test validates: `\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: refkey styled span refkey eqrefkey key citeptauthorkeys key1 key2', async ({ page }) => {
    // Checkpoint 8: `\ref{key}` → styled span `[ref:key]`, `\eqref{key}` → `(key)`, `\cite[p|t|author]?{keys}` → `[key1, key2]`
    // Section: Quick Test Workflows > Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\ref{key}` → styled span `[ref:key]`, `\\eqref{key}` → `(key)`, `\\cite[p|t|author]?{keys}` → `[key1, key2]`",
      section: "Quick Test Workflows",
      subsection: "Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "`\\ref{key}` → styled span `[ref:key]`, `\\eqref{key}` → `(key)`, `\\cite[p|t|author]?{keys}` → `[key1, key2]`");
    }


    // This test validates: `\ref{key}` → styled span `[ref:key]`, `\eqref{key}` → `(key)`, `\cite[p|t|author]?{keys}` → `[key1, key2]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Figure environment extracts caption and includegraphics renders as figure with t', async ({ page }) => {
    // Checkpoint 9: Figure environment extracts `\caption{}` and `\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Figure environment extracts `\\caption{}` and `\\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "Figure environment extracts `\\caption{}` and `\\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)");
    }


    // This test validates: Figure environment extracts `\caption{}` and `\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Table environment extracts caption and nested tabular', async ({ page }) => {
    // Checkpoint 10: Table environment extracts `\caption{}` and nested tabular
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Table environment extracts `\\caption{}` and nested tabular",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "Table environment extracts `\\caption{}` and nested tabular");
    }


    // This test validates: Table environment extracts `\caption{}` and nested tabular
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Tabular column spec lLleft cCcenter rRright alignment', async ({ page }) => {
    // Checkpoint 11: Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment");
    }


    // This test validates: Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: multicolumnNaligncontent handled inside tabular cells with correct colspan', async ({ page }) => {
    // Checkpoint 12: `\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "`\\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan");
    }


    // This test validates: `\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: First tabular row renders as th subsequent rows as td', async ({ page }) => {
    // Checkpoint 13: First tabular row renders as `<th>`, subsequent rows as `<td>`
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "First tabular row renders as `<th>`, subsequent rows as `<td>`",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "First tabular row renders as `<th>`, subsequent rows as `<td>`");
    }


    // This test validates: First tabular row renders as `<th>`, subsequent rows as `<td>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Standalone tabular not inside begintable also converted', async ({ page }) => {
    // Checkpoint 14: Standalone tabular (not inside `\begin{table}`) also converted
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Standalone tabular (not inside `\\begin{table}`) also converted",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Standalone tabular (not inside `\\begin{table}`) also converted");
    }


    // This test validates: Standalone tabular (not inside `\begin{table}`) also converted
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: verbatim pre lstlisting precode', async ({ page }) => {
    // Checkpoint 15: `verbatim` → `<pre>`, `lstlisting` → `<pre><code>`
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`verbatim` → `<pre>`, `lstlisting` → `<pre><code>`",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "`verbatim` → `<pre>`, `lstlisting` → `<pre><code>`");
    }


    // This test validates: `verbatim` → `<pre>`, `lstlisting` → `<pre><code>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: quotequotation blockquote', async ({ page }) => {
    // Checkpoint 16: `quote`/`quotation` → `<blockquote>`
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`quote`/`quotation` → `<blockquote>`",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "`quote`/`quotation` → `<blockquote>`");
    }


    // This test validates: `quote`/`quotation` → `<blockquote>`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: center centered div flushleft left-aligned div flushright right-aligned div', async ({ page }) => {
    // Checkpoint 17: `center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "`center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div");
    }


    // This test validates: `center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: minipage plain div classlatex-minipage wrapper width parameter consumed but not ', async ({ page }) => {
    // Checkpoint 18: `minipage` → plain `<div class="latex-minipage">` wrapper (width parameter consumed but not applied)
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`minipage` → plain `<div class=\"latex-minipage\">` wrapper (width parameter consumed but not applied)",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "`minipage` → plain `<div class=\"latex-minipage\">` wrapper (width parameter consumed but not applied)");
    }


    // This test validates: `minipage` → plain `<div class="latex-minipage">` wrapper (width parameter consumed but not applied)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 10 theorem-like environments theorem lemma definition corollary proposition rema', async ({ page }) => {
    // Checkpoint 19: 10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label");
    }


    // This test validates: 10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: proof div with italic Proof and QED symbol float right', async ({ page }) => {
    // Checkpoint 20: `proof` → div with italic "Proof." and QED symbol ∎ (float right)
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`proof` → div with italic \"Proof.\" and QED symbol ∎ (float right)",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "`proof` → div with italic \"Proof.\" and QED symbol ∎ (float right)");
    }


    // This test validates: `proof` → div with italic "Proof." and QED symbol ∎ (float right)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: titlepage centered padded div', async ({ page }) => {
    // Checkpoint 21: `titlepage` → centered padded div
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`titlepage` → centered padded div",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "`titlepage` → centered padded div");
    }


    // This test validates: `titlepage` → centered padded div
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: thebibliography ordered list with References heading splitting on bibitemkey', async ({ page }) => {
    // Checkpoint 22: `thebibliography` → ordered list with "References" heading, splitting on `\bibitem{key}`
    // Section: Quick Test Workflows > Environment Conversions (`latex-environments.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`thebibliography` → ordered list with \"References\" heading, splitting on `\\bibitem{key}`",
      section: "Quick Test Workflows",
      subsection: "Environment Conversions (`latex-environments.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "`thebibliography` → ordered list with \"References\" heading, splitting on `\\bibitem{key}`");
    }


    // This test validates: `thebibliography` → ordered list with "References" heading, splitting on `\bibitem{key}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Mobile breakpoint 768px minTouchTarget 44px', async ({ page }) => {
    // Checkpoint 23: Mobile breakpoint: `<768px`, minTouchTarget = 44px
    // Section: Quick Test Workflows > useMediaQuery Hook

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Mobile breakpoint: `<768px`, minTouchTarget = 44px",
      section: "Quick Test Workflows",
      subsection: "useMediaQuery Hook",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "Mobile breakpoint: `<768px`, minTouchTarget = 44px");
    }


    // This test validates: Mobile breakpoint: `<768px`, minTouchTarget = 44px
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Tablet breakpoint 768px width 1024px minTouchTarget 32px', async ({ page }) => {
    // Checkpoint 24: Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px
    // Section: Quick Test Workflows > useMediaQuery Hook

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px",
      section: "Quick Test Workflows",
      subsection: "useMediaQuery Hook",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px");
    }


    // This test validates: Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Desktop breakpoint width 1024px minTouchTarget 24px', async ({ page }) => {
    // Checkpoint 25: Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px
    // Section: Quick Test Workflows > useMediaQuery Hook

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px",
      section: "Quick Test Workflows",
      subsection: "useMediaQuery Hook",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px");
    }


    // This test validates: Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Resize listener debounced by 100ms', async ({ page }) => {
    // Checkpoint 26: Resize listener debounced by 100ms
    // Section: Quick Test Workflows > useMediaQuery Hook

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Resize listener debounced by 100ms",
      section: "Quick Test Workflows",
      subsection: "useMediaQuery Hook",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "Resize listener debounced by 100ms");
    }


    // This test validates: Resize listener debounced by 100ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Server-side rendering default assumes desktop 1024768', async ({ page }) => {
    // Checkpoint 27: Server-side rendering default assumes desktop (1024×768)
    // Section: Quick Test Workflows > useMediaQuery Hook

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Server-side rendering default assumes desktop (1024×768)",
      section: "Quick Test Workflows",
      subsection: "useMediaQuery Hook",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "Server-side rendering default assumes desktop (1024×768)");
    }


    // This test validates: Server-side rendering default assumes desktop (1024×768)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: acceptChangeid optimistically updates local state AND sends PATCH to apilatextra', async ({ page }) => {
    // Checkpoint 28: `acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: "accepted" }`
    // Section: Quick Test Workflows > Zustand Store — Track Changes Server Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: \"accepted\" }`",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Track Changes Server Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "`acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: \"accepted\" }`");
    }


    // This test validates: `acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: "accepted" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: rejectChangeid same pattern local update PATCH with id status rejected', async ({ page }) => {
    // Checkpoint 29: `rejectChange(id)` same pattern: local update + PATCH with `{ id, status: "rejected" }`
    // Section: Quick Test Workflows > Zustand Store — Track Changes Server Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`rejectChange(id)` same pattern: local update + PATCH with `{ id, status: \"rejected\" }`",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Track Changes Server Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "`rejectChange(id)` same pattern: local update + PATCH with `{ id, status: \"rejected\" }`");
    }


    // This test validates: `rejectChange(id)` same pattern: local update + PATCH with `{ id, status: "rejected" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: acceptAllChanges batch-updates every change currently stored in pendingChanges a', async ({ page }) => {
    // Checkpoint 30: `acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry
    // Section: Quick Test Workflows > Zustand Store — Track Changes Server Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Track Changes Server Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "`acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry");
    }


    // This test validates: `acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: rejectAllChanges follows the same all-entries batch pattern', async ({ page }) => {
    // Checkpoint 31: `rejectAllChanges()` follows the same all-entries batch pattern
    // Section: Quick Test Workflows > Zustand Store — Track Changes Server Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`rejectAllChanges()` follows the same all-entries batch pattern",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Track Changes Server Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "`rejectAllChanges()` follows the same all-entries batch pattern");
    }


    // This test validates: `rejectAllChanges()` follows the same all-entries batch pattern
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: All track-change server sync errors are caught silently', async ({ page }) => {
    // Checkpoint 32: All track-change server sync errors are caught silently
    // Section: Quick Test Workflows > Zustand Store — Track Changes Server Sync

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "All track-change server sync errors are caught silently",
      section: "Quick Test Workflows",
      subsection: "Zustand Store — Track Changes Server Sync",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "All track-change server sync errors are caught silently");
    }


    // This test validates: All track-change server sync errors are caught silently
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Image insert code is NOT a figure environment source generates only includegraph', async ({ page }) => {
    // Checkpoint 33: **Image insert code is NOT a figure environment**: source generates only `\includegraphics[width=\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\begin{figure}...\end{figure}` wrapper
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**Image insert code is NOT a figure environment**: source generates only `\\includegraphics[width=\\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\\begin{figure}...\\end{figure}` wrapper",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "**Image insert code is NOT a figure environment**: source generates only `\\includegraphics[width=\\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\\begin{figure}...\\end{figure}` wrapper");
    }


    // This test validates: **Image insert code is NOT a figure environment**: source generates only `\includegraphics[width=\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\begin{figure}...\end{figure}` wrapper
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: New-file input placeholder is filename or foldername not filenametex as stated i', async ({ page }) => {
    // Checkpoint 34: **New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "**New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "**New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section");
    }


    // This test validates: **New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section
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
