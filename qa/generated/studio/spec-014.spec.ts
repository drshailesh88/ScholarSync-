/**
 * Auto-generated Playwright test for studio/spec-014
 * Source: e2e/specs/studio/spec-014.md
 * Generated: 2026-03-14T01:15:27.368Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts studio spec-014
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';





import { assertStudioCheckpoint } from '../../module-assertions/studio';














test.describe('studio / spec-014', () => {
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

  test('cp-000: Slash command Image description Insert an image icon image category academic cre', async ({ page }) => {
    // Checkpoint 0: Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Image\": description \"Insert an image\", icon `image`, category `academic`, creates hidden `<input type=\"file\" accept=\"image/*\">`, reads file as DataURL, inserts via `setImage({ src })`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-000 Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`');
    }


    // This test validates: Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Slash command Abstract description Structured abstract Background Methods Result', async ({ page }) => {
    // Checkpoint 1: Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Abstract\": description \"Structured abstract (Background, Methods, Results, Conclusion)\", icon `academic`, category `academic`, inserts H2 \"Abstract\" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-001 Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `');
    }


    // This test validates: Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Slash command Figure Caption description Insert a figure caption with numbering ', async ({ page }) => {
    // Checkpoint 2: Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Figure Caption\": description \"Insert a figure caption with numbering\", icon `image`, category `academic`, counts existing `Figure \\d+` paragraphs and inserts bold `Figure {N+1}. ` + \"Caption text here\"",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-002 Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"');
    }


    // This test validates: Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Slash command Table Caption description Insert a table caption with numbering ic', async ({ page }) => {
    // Checkpoint 3: Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Table Caption\": description \"Insert a table caption with numbering\", icon `table`, category `academic`, counts existing `Table \\d+` paragraphs and inserts bold `Table {N+1}. ` + \"Caption text here\"",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-003 Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"');
    }


    // This test validates: Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Slash command Footnote description Add a footnote reference icon footnote shortc', async ({ page }) => {
    // Checkpoint 4: Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Footnote\": description \"Add a footnote reference\", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-004 Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`');
    }


    // This test validates: Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Slash command Cite description Insert a citation from your library icon academic', async ({ page }) => {
    // Checkpoint 5: Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Cite\": description \"Insert a citation from your library\", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-005 Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`');
    }


    // This test validates: Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Slash command Continue Writing description AI continues from cursor icon ai cate', async ({ page }) => {
    // Checkpoint 6: Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Continue Writing\": description \"AI continues from cursor\", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: \"continue\"` and `context: editor.getText()`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-006 Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`');
    }


    // This test validates: Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Slash command Outline Section description AI generates bullet outline icon ai ca', async ({ page }) => {
    // Checkpoint 7: Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Outline Section\": description \"AI generates bullet outline\", icon `ai`, category `ai`, dispatches `action: \"outline-section\"`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-007 Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`');
    }


    // This test validates: Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Slash command Check Guidelines description Run reporting guideline check icon ai', async ({ page }) => {
    // Checkpoint 8: Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Check Guidelines\": description \"Run reporting guideline check\", icon `ai`, category `ai`, dispatches `action: \"check-guidelines\"`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-008 Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`');
    }


    // This test validates: Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Slash command Ask AI description Ask a question no edits icon ai category ai dis', async ({ page }) => {
    // Checkpoint 9: Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Ask AI\": description \"Ask a question (no edits)\", icon `ai`, category `ai`, dispatches `action: \"ask\"` with no context",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-009 Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context');
    }


    // This test validates: Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Slash command Word Count description Show section word counts icon tools categor', async ({ page }) => {
    // Checkpoint 10: Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash command \"Word Count\": description \"Show section word counts\", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: \"show-word-count\"`",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-010 Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`');
    }


    // This test validates: Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: filterCommands uses case-insensitive includes matching on title description and ', async ({ page }) => {
    // Checkpoint 11: `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching
    // Section: Quick Test Workflows > Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching",
      section: "Quick Test Workflows",
      subsection: "Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-011 `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching');
    }


    // This test validates: `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Empty filter results render No commands found text centered in py-4', async ({ page }) => {
    // Checkpoint 12: Empty filter results render "No commands found" text centered in `py-4`
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Empty filter results render \"No commands found\" text centered in `py-4`",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-012 Empty filter results render "No commands found" text centered in `py-4`');
    }


    // This test validates: Empty filter results render "No commands found" text centered in `py-4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Slash menu max height max-h-400px with overflow-y-auto width w-80 320px', async ({ page }) => {
    // Checkpoint 13: Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-013 Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)');
    }


    // This test validates: Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Slash menu items grouped by category with uppercase labels BASIC BLOCKS ACADEMIC', async ({ page }) => {
    // Checkpoint 14: Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-014 Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`');
    }


    // This test validates: Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Category header shown only when category changes between adjacent items not repe', async ({ page }) => {
    // Checkpoint 15: Category header shown only when category changes between adjacent items (not repeated per item)
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Category header shown only when category changes between adjacent items (not repeated per item)",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-015 Category header shown only when category changes between adjacent items (not repeated per item)');
    }


    // This test validates: Category header shown only when category changes between adjacent items (not repeated per item)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Each command item shows 32px icon box w-8 h-8 rounded-md title text-sm font-medi', async ({ page }) => {
    // Checkpoint 16: Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-016 Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])');
    }


    // This test validates: Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: AI icon items icon ai use weightfill on the Sparkle icon others use weightregula', async ({ page }) => {
    // Checkpoint 17: AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "AI icon items (`icon === \"ai\"`) use `weight=\"fill\"` on the Sparkle icon; others use `weight=\"regular\"`",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-017 AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`');
    }


    // This test validates: AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Selected item highlights with bg-brand10 text-brand and icon box bg-brand15', async ({ page }) => {
    // Checkpoint 18: Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-018 Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`');
    }


    // This test validates: Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Slash menu uses tippyjs for positioning with placement bottom-start and offset 0', async ({ page }) => {
    // Checkpoint 19: Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Slash menu uses tippy.js for positioning with `placement: \"bottom-start\"` and `offset: [0, 4]`",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-019 Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`');
    }


    // This test validates: Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Escape key in slash menu hides the tippy popup', async ({ page }) => {
    // Checkpoint 20: Escape key in slash menu hides the tippy popup
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Escape key in slash menu hides the tippy popup",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-020 Escape key in slash menu hides the tippy popup');
    }


    // This test validates: Escape key in slash menu hides the tippy popup
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Arrow UpDown wraps around modular arithmetic on index', async ({ page }) => {
    // Checkpoint 21: Arrow Up/Down wraps around (modular arithmetic on index)
    // Section: Quick Test Workflows > Slash Menu UI (`src/components/editor/SlashMenu.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Arrow Up/Down wraps around (modular arithmetic on index)",
      section: "Quick Test Workflows",
      subsection: "Slash Menu UI (`src/components/editor/SlashMenu.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-021 Arrow Up/Down wraps around (modular arithmetic on index)');
    }


    // This test validates: Arrow Up/Down wraps around (modular arithmetic on index)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: outline-section handler prompt Create a concise bullet outline for the current s', async ({ page }) => {
    // Checkpoint 22: `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`
    // Section: Quick Test Workflows > AI Action Handlers — page.tsx event switch

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\\n\\n{context}`",
      section: "Quick Test Workflows",
      subsection: "AI Action Handlers — page.tsx event switch",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-022 `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`');
    }


    // This test validates: `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: check-guidelines handler prompt Review this draft against the most relevant repo', async ({ page }) => {
    // Checkpoint 23: `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`
    // Section: Quick Test Workflows > AI Action Handlers — page.tsx event switch

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\\n\\n{context}`",
      section: "Quick Test Workflows",
      subsection: "AI Action Handlers — page.tsx event switch",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-023 `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`');
    }


    // This test validates: `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: precision-edit handler prompt Improve the clarity precision and academic tone of', async ({ page }) => {
    // Checkpoint 24: `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`
    // Section: Quick Test Workflows > AI Action Handlers — page.tsx event switch

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\\n\\n{context}`",
      section: "Quick Test Workflows",
      subsection: "AI Action Handlers — page.tsx event switch",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-024 `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`');
    }


    // This test validates: `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: cite handler prompt Help me add a citation from my library What paper should I c', async ({ page }) => {
    // Checkpoint 25: `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`
    // Section: Quick Test Workflows > AI Action Handlers — page.tsx event switch

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`",
      section: "Quick Test Workflows",
      subsection: "AI Action Handlers — page.tsx event switch",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-025 `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`');
    }


    // This test validates: `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: ask handler focuses chat input by querying inputplaceholderAI research assistant', async ({ page }) => {
    // Checkpoint 26: `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`
    // Section: Quick Test Workflows > AI Action Handlers — page.tsx event switch

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`ask` handler focuses chat input by querying `input[placeholder*=\"AI research assistant\"], input[placeholder*=\"challenge your thinking\"]` after a `setTimeout(..., 0)`",
      section: "Quick Test Workflows",
      subsection: "AI Action Handlers — page.tsx event switch",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-026 `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`');
    }


    // This test validates: `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Zod schema validates messages as array max 50 items each with role enum user ass', async ({ page }) => {
    // Checkpoint 27: Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Zod schema validates messages as array max 50 items, each with `role` enum `[\"user\", \"assistant\", \"system\"]` and `content` string max 50,000 chars",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-027 Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars');
    }


    // This test validates: Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Auth failure returns 401 with error Authentication required', async ({ page }) => {
    // Checkpoint 28: Auth failure returns 401 with `{ error: "Authentication required." }`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Auth failure returns 401 with `{ error: \"Authentication required.\" }`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-028 Auth failure returns 401 with `{ error: "Authentication required." }`');
    }


    // This test validates: Auth failure returns 401 with `{ error: "Authentication required." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Validation failure returns 400 with error Invalid request Please check your inpu', async ({ page }) => {
    // Checkpoint 29: Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Validation failure returns 400 with `{ error: \"Invalid request. Please check your input and try again.\" }`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-029 Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`');
    }


    // This test validates: Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: AI not configured returns 503 with error AI service is not configured Please con', async ({ page }) => {
    // Checkpoint 30: AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "AI not configured returns 503 with `{ error: \"AI service is not configured. Please contact an administrator.\" }`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-030 AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`');
    }


    // This test validates: AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Unhandled error returns 500 with error An unexpected error occurred Please try a', async ({ page }) => {
    // Checkpoint 31: Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Unhandled error returns 500 with `{ error: \"An unexpected error occurred. Please try again.\" }`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-031 Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`');
    }


    // This test validates: Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Rate limiting checked with checkRateLimituserId chat RATE_LIMITSai before proces', async ({ page }) => {
    // Checkpoint 32: Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Rate limiting checked with `checkRateLimit(userId, \"chat\", RATE_LIMITS.ai)` before processing",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-032 Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing');
    }


    // This test validates: Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: When mode is neither learn nor draft standard assistant system prompt used You a', async ({ page }) => {
    // Checkpoint 33: When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "When `mode` is neither `\"learn\"` nor `\"draft\"`, standard assistant system prompt used: `\"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.\"`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-033 When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync\'s AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`');
    }


    // This test validates: When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Response produced via streamText from ai SDK returned as resulttoTextStreamRespo', async ({ page }) => {
    // Checkpoint 34: Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`
    // Section: Quick Test Workflows > Chat API Route (`src/app/api/chat/route.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-014');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Response produced via `streamText` from `\"ai\"` SDK, returned as `result.toTextStreamResponse()`",
      section: "Quick Test Workflows",
      subsection: "Chat API Route (`src/app/api/chat/route.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-034 Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`');
    }


    // This test validates: Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`
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
