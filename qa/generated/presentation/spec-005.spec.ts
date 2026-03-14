/**
 * Auto-generated Playwright test for presentation/spec-005
 * Source: e2e/specs/presentation/spec-005.md
 * Generated: 2026-03-14T10:20:50.249Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-005
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-005', () => {
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

  test('cp-000: 932 Delete block button with Trash icon content-block-editortsx117 120', async ({ page }) => {
    // Checkpoint 0: **9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 ' + "**9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)");
    }


    // This test validates: **9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 933 Add block menu shows content categories BLOCK_CATEGORIEScontent content-bloc', async ({ page }) => {
    // Checkpoint 1: **9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 ' + "**9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)");
    }


    // This test validates: **9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: 934 Add block menu shows media categories BLOCK_CATEGORIESmedia content-block-ed', async ({ page }) => {
    // Checkpoint 2: **9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 ' + "**9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)");
    }


    // This test validates: **9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: 935 More toggle button expands academic block categories content-block-editortsx', async ({ page }) => {
    // Checkpoint 3: **9.35** "More" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.35** \"More\" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 ' + "**9.35** \"More\" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)");
    }


    // This test validates: **9.35** "More" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 936 Academic categories visible when showAllBlockstrue content-block-editortsx17', async ({ page }) => {
    // Checkpoint 4: **9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 ' + "**9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)");
    }


    // This test validates: **9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: 937 Style selector dropdown TitleSubtitleBodyCaption shown when active content-b', async ({ page }) => {
    // Checkpoint 5: **9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 ' + "**9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)");
    }


    // This test validates: **9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: 938 Text content editable via EditableText component content-block-editortsx218', async ({ page }) => {
    // Checkpoint 6: **9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 ' + "**9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)");
    }


    // This test validates: **9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: 939 Numbered checkbox to toggle orderedunordered content-block-editortsx232 237 ', async ({ page }) => {
    // Checkpoint 7: **9.39** "Numbered" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.39** \"Numbered\" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 ' + "**9.39** \"Numbered\" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)");
    }


    // This test validates: **9.39** "Numbered" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 940 Each bullet item editable via EditableText content-block-editortsx244 251', async ({ page }) => {
    // Checkpoint 8: **9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 ' + "**9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)");
    }


    // This test validates: **9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 941 Remove bullet button shown when active and items 1 content-block-editortsx25', async ({ page }) => {
    // Checkpoint 9: **9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 ' + "**9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)");
    }


    // This test validates: **9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 942 Add item button to append new bullet content-block-editortsx271 273 276', async ({ page }) => {
    // Checkpoint 10: **9.42** "+ Add item" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.42** \"+ Add item\" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 ' + "**9.42** \"+ Add item\" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)");
    }


    // This test validates: **9.42** "+ Add item" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 943 Quote text editable via EditableText content-block-editortsx288', async ({ page }) => {
    // Checkpoint 11: **9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 ' + "**9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)");
    }


    // This test validates: **9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: 944 Attribution field with placeholder Attribution content-block-editortsx291 29', async ({ page }) => {
    // Checkpoint 12: **9.44** Attribution field with placeholder "Attribution" (`content-block-editor.tsx:291`, `:293`, `:295`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.44** Attribution field with placeholder \"Attribution\" (`content-block-editor.tsx:291`, `:293`, `:295`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 ' + "**9.44** Attribution field with placeholder \"Attribution\" (`content-block-editor.tsx:291`, `:293`, `:295`)");
    }


    // This test validates: **9.44** Attribution field with placeholder "Attribution" (`content-block-editor.tsx:291`, `:293`, `:295`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 945 Citation text editable content-block-editortsx303 305', async ({ page }) => {
    // Checkpoint 13: **9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 ' + "**9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)");
    }


    // This test validates: **9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: 946 Source field with placeholder Source content-block-editortsx308 310 312', async ({ page }) => {
    // Checkpoint 14: **9.46** Source field with placeholder "Source" (`content-block-editor.tsx:308`, `:310`, `:312`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.46** Source field with placeholder \"Source\" (`content-block-editor.tsx:308`, `:310`, `:312`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 ' + "**9.46** Source field with placeholder \"Source\" (`content-block-editor.tsx:308`, `:310`, `:312`)");
    }


    // This test validates: **9.46** Source field with placeholder "Source" (`content-block-editor.tsx:308`, `:310`, `:312`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 947 DOI field with placeholder DOI eg 101000xyz123 content-block-editortsx318 32', async ({ page }) => {
    // Checkpoint 15: **9.47** DOI field with placeholder "DOI (e.g., 10.1000/xyz123)" (`content-block-editor.tsx:318`, `:320`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.47** DOI field with placeholder \"DOI (e.g., 10.1000/xyz123)\" (`content-block-editor.tsx:318`, `:320`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 ' + "**9.47** DOI field with placeholder \"DOI (e.g., 10.1000/xyz123)\" (`content-block-editor.tsx:318`, `:320`)");
    }


    // This test validates: **9.47** DOI field with placeholder "DOI (e.g., 10.1000/xyz123)" (`content-block-editor.tsx:318`, `:320`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 948 Year field with placeholder Year content-block-editortsx324 326', async ({ page }) => {
    // Checkpoint 16: **9.48** Year field with placeholder "Year" (`content-block-editor.tsx:324`, `:326`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.48** Year field with placeholder \"Year\" (`content-block-editor.tsx:324`, `:326`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 ' + "**9.48** Year field with placeholder \"Year\" (`content-block-editor.tsx:324`, `:326`)");
    }


    // This test validates: **9.48** Year field with placeholder "Year" (`content-block-editor.tsx:324`, `:326`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: 949 Image preview when URL exists content-block-editortsx336', async ({ page }) => {
    // Checkpoint 17: **9.49** Image preview when URL exists (`content-block-editor.tsx:336`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.49** Image preview when URL exists (`content-block-editor.tsx:336`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 ' + "**9.49** Image preview when URL exists (`content-block-editor.tsx:336`)");
    }


    // This test validates: **9.49** Image preview when URL exists (`content-block-editor.tsx:336`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: 950 Alt text field with placeholder Alt text shown when active content-block-edi', async ({ page }) => {
    // Checkpoint 18: **9.50** Alt text field with placeholder "Alt text" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.50** Alt text field with placeholder \"Alt text\" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 ' + "**9.50** Alt text field with placeholder \"Alt text\" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)");
    }


    // This test validates: **9.50** Alt text field with placeholder "Alt text" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 951 Header cells editable via EditableText when active content-block-editortsx37', async ({ page }) => {
    // Checkpoint 19: **9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 ' + "**9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)");
    }


    // This test validates: **9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 952 Body cells editable via EditableText when active content-block-editortsx388 ', async ({ page }) => {
    // Checkpoint 20: **9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 ' + "**9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)");
    }


    // This test validates: **9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 953 LaTeX Math label with MathOperations icon content-block-editortsx420 421', async ({ page }) => {
    // Checkpoint 21: **9.53** "LaTeX Math" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.53** \"LaTeX Math\" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 ' + "**9.53** \"LaTeX Math\" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)");
    }


    // This test validates: **9.53** "LaTeX Math" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: 954 Display mode checkbox when active content-block-editortsx422 427 430', async ({ page }) => {
    // Checkpoint 22: **9.54** "Display mode" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.54** \"Display mode\" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 ' + "**9.54** \"Display mode\" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)");
    }


    // This test validates: **9.54** "Display mode" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 955 Expression textarea with placeholder eg E mc2 or fracab content-block-editor', async ({ page }) => {
    // Checkpoint 23: **9.55** Expression textarea with placeholder `e.g., E = mc^2 or \frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.55** Expression textarea with placeholder `e.g., E = mc^2 or \\frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 ' + "**9.55** Expression textarea with placeholder `e.g., E = mc^2 or \\frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)");
    }


    // This test validates: **9.55** Expression textarea with placeholder `e.g., E = mc^2 or \frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: 956 Caption field with placeholder Caption shown when caption exists and active ', async ({ page }) => {
    // Checkpoint 24: **9.56** Caption field with placeholder "Caption" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.56** Caption field with placeholder \"Caption\" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 ' + "**9.56** Caption field with placeholder \"Caption\" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)");
    }


    // This test validates: **9.56** Caption field with placeholder "Caption" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: 957 Mermaid Diagram label with TreeStructure icon content-block-editortsx456 457', async ({ page }) => {
    // Checkpoint 25: **9.57** "Mermaid Diagram" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.57** \"Mermaid Diagram\" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 ' + "**9.57** \"Mermaid Diagram\" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)");
    }


    // This test validates: **9.57** "Mermaid Diagram" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: 958 Diagram type selector with options Flowchart Sequence Class Diagram Gantt Mi', async ({ page }) => {
    // Checkpoint 26: **9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 ' + "**9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)");
    }


    // This test validates: **9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: 959 Syntax textarea with placeholder content-block-editortsx476 479', async ({ page }) => {
    // Checkpoint 27: **9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 ' + "**9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)");
    }


    // This test validates: **9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: 960 Code label with Code icon content-block-editortsx488 489', async ({ page }) => {
    // Checkpoint 28: **9.60** "Code" label with Code icon (`content-block-editor.tsx:488`, `:489`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.60** \"Code\" label with Code icon (`content-block-editor.tsx:488`, `:489`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 ' + "**9.60** \"Code\" label with Code icon (`content-block-editor.tsx:488`, `:489`)");
    }


    // This test validates: **9.60** "Code" label with Code icon (`content-block-editor.tsx:488`, `:489`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: 961 Language input with placeholder Language when active content-block-editortsx', async ({ page }) => {
    // Checkpoint 29: **9.61** Language input with placeholder "Language" when active (`content-block-editor.tsx:490`, `:493`, `:495`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.61** Language input with placeholder \"Language\" when active (`content-block-editor.tsx:490`, `:493`, `:495`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 ' + "**9.61** Language input with placeholder \"Language\" when active (`content-block-editor.tsx:490`, `:493`, `:495`)");
    }


    // This test validates: **9.61** Language input with placeholder "Language" when active (`content-block-editor.tsx:490`, `:493`, `:495`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: 962 Code textarea with placeholder Your code here content-block-editortsx501 505', async ({ page }) => {
    // Checkpoint 30: **9.62** Code textarea with placeholder "// Your code here" (`content-block-editor.tsx:501`, `:505`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.62** Code textarea with placeholder \"// Your code here\" (`content-block-editor.tsx:501`, `:505`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 ' + "**9.62** Code textarea with placeholder \"// Your code here\" (`content-block-editor.tsx:501`, `:505`)");
    }


    // This test validates: **9.62** Code textarea with placeholder "// Your code here" (`content-block-editor.tsx:501`, `:505`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: 963 Style selector dropdown with options Info Warning Success Key Finding Limita', async ({ page }) => {
    // Checkpoint 31: **9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 ' + "**9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)");
    }


    // This test validates: **9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: 964 Callout title editable when block has title content-block-editortsx536 537 5', async ({ page }) => {
    // Checkpoint 32: **9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 ' + "**9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)");
    }


    // This test validates: **9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: 965 Callout body text editable content-block-editortsx544 546', async ({ page }) => {
    // Checkpoint 33: **9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 ' + "**9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)");
    }


    // This test validates: **9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: 966 Label field with placeholder Metric name content-block-editortsx557 559 561', async ({ page }) => {
    // Checkpoint 34: **9.66** Label field with placeholder "Metric name" (`content-block-editor.tsx:557`, `:559`, `:561`)
    // Section: Content Block Types (20+) > Content Block Editor -- Inline Editing UI

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**9.66** Label field with placeholder \"Metric name\" (`content-block-editor.tsx:557`, `:559`, `:561`)",
      section: "Content Block Types (20+)",
      subsection: "Content Block Editor -- Inline Editing UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 ' + "**9.66** Label field with placeholder \"Metric name\" (`content-block-editor.tsx:557`, `:559`, `:561`)");
    }


    // This test validates: **9.66** Label field with placeholder "Metric name" (`content-block-editor.tsx:557`, `:559`, `:561`)
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
