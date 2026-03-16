/**
 * Auto-generated Playwright test for slides-ai/spec-016
 * Source: e2e/specs/slides-ai/spec-016.md
 * Generated: 2026-03-14T21:22:04.100Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts slides-ai spec-016
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';













import { assertSlidesCheckpoint } from '../../module-assertions/slides';






test.describe('slides-ai / spec-016', () => {
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

  test('cp-000: PresenterMode is lazy-loaded via Reactlazy with Suspense fallback showing Loadin', async ({ page }) => {
    // Checkpoint 0: `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing \"Loading presenter mode...\" on a full-screen black background",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-000 `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background');
    }


    // This test validates: `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Presenter mode filters out slides where hidden true before passing to PresenterM', async ({ page }) => {
    // Checkpoint 1: Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-001 Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`');
    }


    // This test validates: Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Presenter mode starts at the index of the current activeSlideId within the visib', async ({ page }) => {
    // Checkpoint 2: Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-002 Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)');
    }


    // This test validates: Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Entire workspace is wrapped in ThemeProvider themethemeConfig so theme context p', async ({ page }) => {
    // Checkpoint 3: Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-003 Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children');
    }


    // This test validates: Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Mode selection screen is shown only when slideslength 0 AND user has not yet cho', async ({ page }) => {
    // Checkpoint 4: Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-004 Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically');
    }


    // This test validates: Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Presenter receives masters themeKey themeConfig and transition from the store', async ({ page }) => {
    // Checkpoint 5: Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store
    // Section:  > SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store",
      section: "",
      subsection: "SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-005 Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store');
    }


    // This test validates: Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Default agentMode is draft not learn', async ({ page }) => {
    // Checkpoint 6: Default `agentMode` is `"draft"`, not `"learn"`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Default `agentMode` is `\"draft\"`, not `\"learn\"`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-006 Default `agentMode` is `"draft"`, not `"learn"`');
    }


    // This test validates: Default `agentMode` is `"draft"`, not `"learn"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Default transition is fade', async ({ page }) => {
    // Checkpoint 7: Default `transition` is `"fade"`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Default `transition` is `\"fade\"`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-007 Default `transition` is `"fade"`');
    }


    // This test validates: Default `transition` is `"fade"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Default themeKey is modern and themeConfig is PRESET_THEMESmodern', async ({ page }) => {
    // Checkpoint 8: Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Default `themeKey` is `\"modern\"` and `themeConfig` is `PRESET_THEMES.modern`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-008 Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`');
    }


    // This test validates: Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: RightPanel full type union properties agent comments versions analytics defense ', async ({ page }) => {
    // Checkpoint 9: `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`RightPanel` full type union: `\"properties\" | \"agent\" | \"comments\" | \"versions\" | \"analytics\" | \"defense\" | \"accessibility\" | null`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-009 `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`');
    }


    // This test validates: `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: loadDeck clears agentChatHistory to empty array on every deck load', async ({ page }) => {
    // Checkpoint 10: `loadDeck` clears `agentChatHistory` to empty array on every deck load
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`loadDeck` clears `agentChatHistory` to empty array on every deck load",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-010 `loadDeck` clears `agentChatHistory` to empty array on every deck load');
    }


    // This test validates: `loadDeck` clears `agentChatHistory` to empty array on every deck load
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: loadDeck sets activeSlideId to the first slides ID and selectedSlideIds to a Set', async ({ page }) => {
    // Checkpoint 11: `loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-011 `loadDeck` sets `activeSlideId` to the first slide\'s ID and `selectedSlideIds` to a Set of that ID');
    }


    // This test validates: `loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: setActiveSlide clears selectedBlockIndices allBlocksSelected and editingBlockInd', async ({ page }) => {
    // Checkpoint 12: `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-012 `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`');
    }


    // This test validates: `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: addSlide creates a slide with title New Slide and one text block type text data ', async ({ page }) => {
    // Checkpoint 13: `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`addSlide` creates a slide with title `\"New Slide\"` and one text block `{ type: \"text\", data: { text: \"Click to add content\", style: \"body\" } }`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-013 `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`');
    }


    // This test validates: `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: duplicateSlide appends copy to the original slides title', async ({ page }) => {
    // Checkpoint 14: `duplicateSlide` appends `" (copy)"` to the original slide's title
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`duplicateSlide` appends `\" (copy)\"` to the original slide's title",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-014 `duplicateSlide` appends `" (copy)"` to the original slide\'s title');
    }


    // This test validates: `duplicateSlide` appends `" (copy)"` to the original slide's title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: deleteSlide is optimistic removes from local state first then restores slides ac', async ({ page }) => {
    // Checkpoint 15: `deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-015 `deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure');
    }


    // This test validates: `deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: reorderSlides is optimistic applies new order locally reverts on server failure', async ({ page }) => {
    // Checkpoint 16: `reorderSlides` is optimistic: applies new order locally, reverts on server failure
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`reorderSlides` is optimistic: applies new order locally, reverts on server failure",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-016 `reorderSlides` is optimistic: applies new order locally, reverts on server failure');
    }


    // This test validates: `reorderSlides` is optimistic: applies new order locally, reverts on server failure
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Undo stack is capped at MAX_UNDO_HISTORY 50 entries', async ({ page }) => {
    // Checkpoint 17: Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-017 Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries');
    }


    // This test validates: Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Undo coalesces rapid changes to the same slide within a 500ms debounce window ke', async ({ page }) => {
    // Checkpoint 18: Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-018 Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state');
    }


    // This test validates: Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Calling undo or redo flushes any pending debounced undo entry first', async ({ page }) => {
    // Checkpoint 19: Calling `undo()` or `redo()` flushes any pending debounced undo entry first
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Calling `undo()` or `redo()` flushes any pending debounced undo entry first",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-019 Calling `undo()` or `redo()` flushes any pending debounced undo entry first');
    }


    // This test validates: Calling `undo()` or `redo()` flushes any pending debounced undo entry first
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Any new edit clears the redo stack', async ({ page }) => {
    // Checkpoint 20: Any new edit clears the redo stack
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Any new edit clears the redo stack",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-020 Any new edit clears the redo stack');
    }


    // This test validates: Any new edit clears the redo stack
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Save debounce _debouncedSave waits 800ms of inactivity then saveStatus goes savi', async ({ page }) => {
    // Checkpoint 21: Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `\"saving\"` → `\"saved\"` → (1500ms later) `\"idle\"`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-021 Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`');
    }


    // This test validates: Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Save is skipped if the slide was deleted during the debounce window', async ({ page }) => {
    // Checkpoint 22: Save is skipped if the slide was deleted during the debounce window
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Save is skipped if the slide was deleted during the debounce window",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-022 Save is skipped if the slide was deleted during the debounce window');
    }


    // This test validates: Save is skipped if the slide was deleted during the debounce window
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: customThemes support addCustomThemekey config and deleteCustomThemekey persisted', async ({ page }) => {
    // Checkpoint 23: `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-023 `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`');
    }


    // This test validates: `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: institutionKit support setInstitutionKitkit for branding', async ({ page }) => {
    // Checkpoint 24: `institutionKit` support: `setInstitutionKit(kit)` for branding
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`institutionKit` support: `setInstitutionKit(kit)` for branding",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-024 `institutionKit` support: `setInstitutionKit(kit)` for branding');
    }


    // This test validates: `institutionKit` support: `setInstitutionKit(kit)` for branding
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: gridSize clamped between 1 and 100 defaults to 5', async ({ page }) => {
    // Checkpoint 25: `gridSize` clamped between 1 and 100, defaults to 5
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`gridSize` clamped between 1 and 100, defaults to 5",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-025 `gridSize` clamped between 1 and 100, defaults to 5');
    }


    // This test validates: `gridSize` clamped between 1 and 100, defaults to 5
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Store exposes showFindReplace showSlideSorter showRulers showGrid snapToGrid sho', async ({ page }) => {
    // Checkpoint 26: Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-026 Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles');
    }


    // This test validates: Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Block clipboard copyBlock deep-clones selected blocks cutBlock copies then delet', async ({ page }) => {
    // Checkpoint 27: Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-027 Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block');
    }


    // This test validates: Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: clipboardSlide for slide-level copypaste copySlideid strips id and sortOrder pas', async ({ page }) => {
    // Checkpoint 28: `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-028 `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide');
    }


    // This test validates: `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: regenerateSlide tracks in-progress IDs via regeneratingSlideIds Set adds on star', async ({ page }) => {
    // Checkpoint 29: `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-029 `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`');
    }


    // This test validates: `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: regenerateSlide sends context prevSlideTitle nextSlideTitle deckTitle audienceTy', async ({ page }) => {
    // Checkpoint 30: `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-030 `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`');
    }


    // This test validates: `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: replaceAllSlides preserves activeSlideId if found in new slides otherwise falls ', async ({ page }) => {
    // Checkpoint 31: `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first
    // Section:  > Slides Store — Additional State & Defaults (`slides-store.ts`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first",
      section: "",
      subsection: "Slides Store — Additional State & Defaults (`slides-store.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-031 `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first');
    }


    // This test validates: `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Slides mode agent panel width is w-80 320px not w-360px like Gamma mode', async ({ page }) => {
    // Checkpoint 32: Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode
    // Section:  > SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode",
      section: "",
      subsection: "SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-032 Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode');
    }


    // This test validates: Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Global keyboard shortcuts registered on mount via registerGlobalShortcutsuseSlid', async ({ page }) => {
    // Checkpoint 33: Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`
    // Section:  > SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`",
      section: "",
      subsection: "SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-033 Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`');
    }


    // This test validates: Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: PresenceBridgeSlot rendered for real-time collaboration sync', async ({ page }) => {
    // Checkpoint 34: `PresenceBridgeSlot` rendered for real-time collaboration sync
    // Section:  > SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)

    // Navigate to the page
    await page.goto('/slides/ai', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/slides-ai/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertSlidesCheckpoint({
      page,
      description: "`PresenceBridgeSlot` rendered for real-time collaboration sync",
      section: "",
      subsection: "SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled slides checkpoint: cp-034 `PresenceBridgeSlot` rendered for real-time collaboration sync');
    }


    // This test validates: `PresenceBridgeSlot` rendered for real-time collaboration sync
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
