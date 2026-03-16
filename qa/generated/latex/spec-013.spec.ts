/**
 * Auto-generated Playwright test for latex/spec-013
 * Source: e2e/specs/latex/spec-013.md
 * Generated: 2026-03-15T17:49:14.148Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts latex spec-013
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';







import { assertLatexCheckpoint } from '../../module-assertions/latex';












test.describe('latex / spec-013', () => {
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

  test('cp-000: Line number link displays as Lline format eg L42 and is clickable to jump', async ({ page }) => {
    // Checkpoint 0: Line number link displays as "L{line}" format (e.g., "L42") and is clickable to jump
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Line number link displays as \"L{line}\" format (e.g., \"L42\") and is clickable to jump",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-000 ' + "Line number link displays as \"L{line}\" format (e.g., \"L42\") and is clickable to jump");
    }


    // This test validates: Line number link displays as "L{line}" format (e.g., "L42") and is clickable to jump
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Category badge eg Syntax Package Math appears only when enriched explanation dif', async ({ page }) => {
    // Checkpoint 1: Category badge (e.g., "Syntax", "Package", "Math") appears only when enriched explanation differs from raw message
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Category badge (e.g., \"Syntax\", \"Package\", \"Math\") appears only when enriched explanation differs from raw message",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-001 ' + "Category badge (e.g., \"Syntax\", \"Package\", \"Math\") appears only when enriched explanation differs from raw message");
    }


    // This test validates: Category badge (e.g., "Syntax", "Package", "Math") appears only when enriched explanation differs from raw message
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Category label mapping syntaxSyntax packagePackage mathMath referenceReference f', async ({ page }) => {
    // Checkpoint 2: Category label mapping: syntax→"Syntax", package→"Package", math→"Math", reference→"Reference", font→"Font", file→"File", other→"General"
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Category label mapping: syntax→\"Syntax\", package→\"Package\", math→\"Math\", reference→\"Reference\", font→\"Font\", file→\"File\", other→\"General\"",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-002 ' + "Category label mapping: syntax→\"Syntax\", package→\"Package\", math→\"Math\", reference→\"Reference\", font→\"Font\", file→\"File\", other→\"General\"");
    }


    // This test validates: Category label mapping: syntax→"Syntax", package→"Package", math→"Math", reference→"Reference", font→"Font", file→"File", other→"General"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Error-gutter fix button context extraction in the panel itself uses 5 lines 11 l', async ({ page }) => {
    // Checkpoint 3: Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context
    // Section: Quick Test Workflows > Error Gutter Panel — Expanded Details

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context",
      section: "Quick Test Workflows",
      subsection: "Error Gutter Panel — Expanded Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-003 ' + "Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context");
    }


    // This test validates: Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 20 regex patterns organized into 7 categories syntax package math reference font', async ({ page }) => {
    // Checkpoint 4: 20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other
    // Section: Quick Test Workflows > Error Intelligence (`error-intelligence.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other",
      section: "Quick Test Workflows",
      subsection: "Error Intelligence (`error-intelligence.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-004 ' + "20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other");
    }


    // This test validates: 20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Pattern matching substitutes regex capture groups 1 2 into explanation and sugge', async ({ page }) => {
    // Checkpoint 5: Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates
    // Section: Quick Test Workflows > Error Intelligence (`error-intelligence.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates",
      section: "Quick Test Workflows",
      subsection: "Error Intelligence (`error-intelligence.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-005 ' + "Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates");
    }


    // This test validates: Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Unmatched errors return the raw message as the explanation null suggestion and o', async ({ page }) => {
    // Checkpoint 6: Unmatched errors return the raw message as the explanation, null suggestion, and "other" category
    // Section: Quick Test Workflows > Error Intelligence (`error-intelligence.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Unmatched errors return the raw message as the explanation, null suggestion, and \"other\" category",
      section: "Quick Test Workflows",
      subsection: "Error Intelligence (`error-intelligence.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-006 ' + "Unmatched errors return the raw message as the explanation, null suggestion, and \"other\" category");
    }


    // This test validates: Unmatched errors return the raw message as the explanation, null suggestion, and "other" category
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Specific patterns include Undefined control sequence with and without command na', async ({ page }) => {
    // Checkpoint 7: Specific patterns include: "Undefined control sequence" (with and without command name), "Missing $ inserted", "Missing \\begin{document}", "Missing { or } inserted", "Extra }", "Misplaced alignment tab character &", "\\begin{X} ended by \\end{Y}", "Environment X undefined", "File not found", "Unknown option for package", "Package Error", "Option clash", "Display math should end with $$", "Double subscript/superscript", "Extra alignment tab", "Citation undefined", "Reference undefined", "Label multiply defined", "undefined references", "Font not found/unavailable", "Encoding scheme unknown", "can't write on file", "Emergency stop", "Overfull \\hbox (with pt value)", "Underfull \\hbox"
    // Section: Quick Test Workflows > Error Intelligence (`error-intelligence.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Specific patterns include: \"Undefined control sequence\" (with and without command name), \"Missing $ inserted\", \"Missing \\\\begin{document}\", \"Missing { or } inserted\", \"Extra }\", \"Misplaced alignment tab character &\", \"\\\\begin{X} ended by \\\\end{Y}\", \"Environment X undefined\", \"File not found\", \"Unknown option for package\", \"Package Error\", \"Option clash\", \"Display math should end with $$\", \"Double subscript/superscript\", \"Extra alignment tab\", \"Citation undefined\", \"Reference undefined\", \"Label multiply defined\", \"undefined references\", \"Font not found/unavailable\", \"Encoding scheme unknown\", \"can't write on file\", \"Emergency stop\", \"Overfull \\\\hbox (with pt value)\", \"Underfull \\\\hbox\"",
      section: "Quick Test Workflows",
      subsection: "Error Intelligence (`error-intelligence.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-007 ' + "Specific patterns include: \"Undefined control sequence\" (with and without command name), \"Missing $ inserted\", \"Missing \\\\begin{document}\", \"Missing { or } inserted\", \"Extra }\", \"Misplaced alignment tab character &\", \"\\\\begin{X} ended by \\\\end{Y}\", \"Environment X undefined\", \"File not found\", \"Unknown option for package\", \"Package Error\", \"Option clash\", \"Display math should end with $$\", \"Double subscript/superscript\", \"Extra alignment tab\", \"Citation undefined\", \"Reference undefined\", \"Label multiply defined\", \"undefined references\", \"Font not found/unavailable\", \"Encoding scheme unknown\", \"can't write on file\", \"Emergency stop\", \"Overfull \\\\hbox (with pt value)\", \"Underfull \\\\hbox\"");
    }


    // This test validates: Specific patterns include: "Undefined control sequence" (with and without command name), "Missing $ inserted", "Missing \\begin{document}", "Missing { or } inserted", "Extra }", "Misplaced alignment tab character &", "\\begin{X} ended by \\end{Y}", "Environment X undefined", "File not found", "Unknown option for package", "Package Error", "Option clash", "Display math should end with $$", "Double subscript/superscript", "Extra alignment tab", "Citation undefined", "Reference undefined", "Label multiply defined", "undefined references", "Font not found/unavailable", "Encoding scheme unknown", "can't write on file", "Emergency stop", "Overfull \\hbox (with pt value)", "Underfull \\hbox"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Spell check linter calls POST apilatexspell-check with content body', async ({ page }) => {
    // Checkpoint 8: Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-008 ' + "Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body");
    }


    // This test validates: Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Spell check debounce delay is 2000ms', async ({ page }) => {
    // Checkpoint 9: Spell check debounce delay is 2000ms
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Spell check debounce delay is 2000ms",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-009 ' + "Spell check debounce delay is 2000ms");
    }


    // This test validates: Spell check debounce delay is 2000ms
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Spell check skips documents shorter than 10 characters returns empty array', async ({ page }) => {
    // Checkpoint 10: Spell check skips documents shorter than 10 characters (returns empty array)
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Spell check skips documents shorter than 10 characters (returns empty array)",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-010 ' + "Spell check skips documents shorter than 10 characters (returns empty array)");
    }


    // This test validates: Spell check skips documents shorter than 10 characters (returns empty array)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Spell check diagnostics use severity info blue squiggly underlines not red', async ({ page }) => {
    // Checkpoint 11: Spell check diagnostics use severity "info" (blue squiggly underlines, not red)
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Spell check diagnostics use severity \"info\" (blue squiggly underlines, not red)",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-011 ' + "Spell check diagnostics use severity \"info\" (blue squiggly underlines, not red)");
    }


    // This test validates: Spell check diagnostics use severity "info" (blue squiggly underlines, not red)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Each misspelling message reads Unknown word word', async ({ page }) => {
    // Checkpoint 12: Each misspelling message reads `Unknown word: "{word}"`
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Each misspelling message reads `Unknown word: \"{word}\"`",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-012 ' + "Each misspelling message reads `Unknown word: \"{word}\"`");
    }


    // This test validates: Each misspelling message reads `Unknown word: "{word}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint act', async ({ page }) => {
    // Checkpoint 13: Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-013 ' + "Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions");
    }


    // This test validates: Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Suggestion actions directly replace the misspelled word in the editor via viewdi', async ({ page }) => {
    // Checkpoint 14: Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-014 ' + "Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`");
    }


    // This test validates: Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: createAddToDictionaryAction function exists and POSTs to apilatexspell-checkadd ', async ({ page }) => {
    // Checkpoint 15: `createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-015 ' + "`createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`");
    }


    // This test validates: `createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Spell check fetch errors are caught silently returns empty diagnostics', async ({ page }) => {
    // Checkpoint 16: Spell check fetch errors are caught silently (returns empty diagnostics)
    // Section: Quick Test Workflows > Spell Check Extension (`spell-check-extension.ts`)

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Spell check fetch errors are caught silently (returns empty diagnostics)",
      section: "Quick Test Workflows",
      subsection: "Spell Check Extension (`spell-check-extension.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-016 ' + "Spell check fetch errors are caught silently (returns empty diagnostics)");
    }


    // This test validates: Spell check fetch errors are caught silently (returns empty diagnostics)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Visual editor hides line number gutters entirely via CSS display none', async ({ page }) => {
    // Checkpoint 17: Visual editor hides line number gutters entirely via CSS `display: "none"`
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor hides line number gutters entirely via CSS `display: \"none\"`",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-017 ' + "Visual editor hides line number gutters entirely via CSS `display: \"none\"`");
    }


    // This test validates: Visual editor hides line number gutters entirely via CSS `display: "none"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Visual editor uses sans-serif font stack Inter SF Pro Text system-ui -apple-syst', async ({ page }) => {
    // Checkpoint 18: Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-018 ' + "Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`");
    }


    // This test validates: Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Visual editor content area has maxWidth 680px with auto margins for centered lay', async ({ page }) => {
    // Checkpoint 19: Visual editor content area has `maxWidth: "680px"` with auto margins for centered layout
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor content area has `maxWidth: \"680px\"` with auto margins for centered layout",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-019 ' + "Visual editor content area has `maxWidth: \"680px\"` with auto margins for centered layout");
    }


    // This test validates: Visual editor content area has `maxWidth: "680px"` with auto margins for centered layout
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Visual editor content padding is 24px 32px vs source editors 16px 0', async ({ page }) => {
    // Checkpoint 20: Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-020 ' + "Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)");
    }


    // This test validates: Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Visual editor base font size is 14px with line-height 17', async ({ page }) => {
    // Checkpoint 21: Visual editor base font size is 14px with line-height 1.7
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor base font size is 14px with line-height 1.7",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-021 ' + "Visual editor base font size is 14px with line-height 1.7");
    }


    // This test validates: Visual editor base font size is 14px with line-height 1.7
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: emph is rendered identically to textit italic decoration', async ({ page }) => {
    // Checkpoint 22: `\emph{}` is rendered identically to `\textit{}` (italic decoration)
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\emph{}` is rendered identically to `\\textit{}` (italic decoration)",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-022 ' + "`\\emph{}` is rendered identically to `\\textit{}` (italic decoration)");
    }


    // This test validates: `\emph{}` is rendered identically to `\textit{}` (italic decoration)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: citetp matches receive brand-colored background styling cm-visual-cite class', async ({ page }) => {
    // Checkpoint 23: `\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-023 ' + "`\\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)");
    }


    // This test validates: `\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: item lines receive 24px left padding cm-visual-list-item class', async ({ page }) => {
    // Checkpoint 24: `\item` lines receive 24px left padding (`.cm-visual-list-item` class)
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\item` lines receive 24px left padding (`.cm-visual-list-item` class)",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-024 ' + "`\\item` lines receive 24px left padding (`.cm-visual-list-item` class)");
    }


    // This test validates: `\item` lines receive 24px left padding (`.cm-visual-list-item` class)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: beginequationalignfiguretableitemizeenumerate and corresponding end lines get a ', async ({ page }) => {
    // Checkpoint 25: `\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`\\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-025 ' + "`\\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size");
    }


    // This test validates: `\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: findMatchingBrace correctly handles nested brace depth counting', async ({ page }) => {
    // Checkpoint 26: `findMatchingBrace()` correctly handles nested brace depth counting
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "`findMatchingBrace()` correctly handles nested brace depth counting",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-026 ' + "`findMatchingBrace()` correctly handles nested brace depth counting");
    }


    // This test validates: `findMatchingBrace()` correctly handles nested brace depth counting
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Visual editor includes closeBrackets and autocompletion extensions explicitly', async ({ page }) => {
    // Checkpoint 27: Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-027 ' + "Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly");
    }


    // This test validates: Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Visual editor active line has transparent background no highlight', async ({ page }) => {
    // Checkpoint 28: Visual editor active line has transparent background (no highlight)
    // Section: Quick Test Workflows > Visual Editor — Theme & Decorations

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Visual editor active line has transparent background (no highlight)",
      section: "Quick Test Workflows",
      subsection: "Visual Editor — Theme & Decorations",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-028 ' + "Visual editor active line has transparent background (no highlight)");
    }


    // This test validates: Visual editor active line has transparent background (no highlight)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Collaboration gracefully degrades no WebSocket connection when NEXT_PUBLIC_COLLA', async ({ page }) => {
    // Checkpoint 29: Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-029 ' + "Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set");
    }


    // This test validates: Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Room ID format latex-project-sanitized where non-alphanumeric characters become ', async ({ page }) => {
    // Checkpoint 30: Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-030 ' + "Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens");
    }


    // This test validates: Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: 8 collaborator colors FF6B6B 4ECDC4 45B7D1 96CEB4 FFEAA7 DDA0DD 98D8C8 F7DC6F', async ({ page }) => {
    // Checkpoint 31: 8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-031 ' + "8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`");
    }


    // This test validates: 8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Color assignment is deterministic character code sum of userId modulo 8', async ({ page }) => {
    // Checkpoint 32: Color assignment is deterministic: character code sum of userId modulo 8
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Color assignment is deterministic: character code sum of userId modulo 8",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-032 ' + "Color assignment is deterministic: character code sum of userId modulo 8");
    }


    // This test validates: Color assignment is deterministic: character code sum of userId modulo 8
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Default current user name is You', async ({ page }) => {
    // Checkpoint 33: Default current user name is "You"
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Default current user name is \"You\"",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-033 ' + "Default current user name is \"You\"");
    }


    // This test validates: Default current user name is "You"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Typing status auto-resets to false after 2000ms timeout via setIsTyping', async ({ page }) => {
    // Checkpoint 34: Typing status auto-resets to false after 2000ms timeout via `setIsTyping`
    // Section: Quick Test Workflows > Collaboration Provider

    // Navigate to the page
    await page.goto('/latex', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/latex/spec-013');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLatexCheckpoint({
      page,
      description: "Typing status auto-resets to false after 2000ms timeout via `setIsTyping`",
      section: "Quick Test Workflows",
      subsection: "Collaboration Provider",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled latex checkpoint: cp-034 ' + "Typing status auto-resets to false after 2000ms timeout via `setIsTyping`");
    }


    // This test validates: Typing status auto-resets to false after 2000ms timeout via `setIsTyping`
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
