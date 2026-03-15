/**
 * Auto-generated Playwright test for illustrate/spec-001
 * Source: e2e/specs/illustrate/spec-001.md
 * Generated: 2026-03-15T14:23:39.375Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts illustrate spec-001
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';















import { assertIllustrateCheckpoint } from '../../module-assertions/illustrate';




test.describe('illustrate / spec-001', () => {
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

  test('cp-000: Gradient title Scientific Illustration Made Simple renders correctly', async ({ page }) => {
    // Checkpoint 0: Gradient title "Scientific Illustration Made Simple" renders correctly
    // Section: Welcome Page (`/illustrate`) > Hero Section

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Gradient title \"Scientific Illustration Made Simple\" renders correctly",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Hero Section",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-000 ' + "Gradient title \"Scientific Illustration Made Simple\" renders correctly");
    }


    // This test validates: Gradient title "Scientific Illustration Made Simple" renders correctly
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Tagline text displays below the title', async ({ page }) => {
    // Checkpoint 1: Tagline text displays below the title
    // Section: Welcome Page (`/illustrate`) > Hero Section

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Tagline text displays below the title",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Hero Section",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-001 ' + "Tagline text displays below the title");
    }


    // This test validates: Tagline text displays below the title
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Create with AI card visible with correct icon', async ({ page }) => {
    // Checkpoint 2: "Create with AI" card visible with correct icon
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "\"Create with AI\" card visible with correct icon",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-002 ' + "\"Create with AI\" card visible with correct icon");
    }


    // This test validates: "Create with AI" card visible with correct icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Clicking Create with AI navigates to illustrateagent', async ({ page }) => {
    // Checkpoint 3: Clicking "Create with AI" navigates to `/illustrate/agent`
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Clicking \"Create with AI\" navigates to `/illustrate/agent`",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-003 ' + "Clicking \"Create with AI\" navigates to `/illustrate/agent`");
    }


    // This test validates: Clicking "Create with AI" navigates to `/illustrate/agent`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Open Editor card visible with correct icon', async ({ page }) => {
    // Checkpoint 4: "Open Editor" card visible with correct icon
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "\"Open Editor\" card visible with correct icon",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-004 ' + "\"Open Editor\" card visible with correct icon");
    }


    // This test validates: "Open Editor" card visible with correct icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Clicking Open Editor navigates to illustrateeditor', async ({ page }) => {
    // Checkpoint 5: Clicking "Open Editor" navigates to `/illustrate/editor`
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Clicking \"Open Editor\" navigates to `/illustrate/editor`",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-005 ' + "Clicking \"Open Editor\" navigates to `/illustrate/editor`");
    }


    // This test validates: Clicking "Open Editor" navigates to `/illustrate/editor`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Hover state shows elevation and accent border', async ({ page }) => {
    // Checkpoint 6: Hover state shows elevation and accent border
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Hover state shows elevation and accent border",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-006 ' + "Hover state shows elevation and accent border");
    }


    // This test validates: Hover state shows elevation and accent border
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Keyboard activation with EnterSpace on focused card', async ({ page }) => {
    // Checkpoint 7: Keyboard activation with Enter/Space on focused card
    // Section: Welcome Page (`/illustrate`) > Action Cards

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Keyboard activation with Enter/Space on focused card",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Action Cards",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-007 ' + "Keyboard activation with Enter/Space on focused card");
    }


    // This test validates: Keyboard activation with Enter/Space on focused card
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Section displays up to 6 recent diagrams from localStoragefinnish-recent-diagram', async ({ page }) => {
    // Checkpoint 8: Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-008 ' + "Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`");
    }


    // This test validates: Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Each card shows thumbnail or placeholder if none', async ({ page }) => {
    // Checkpoint 9: Each card shows thumbnail (or placeholder if none)
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Each card shows thumbnail (or placeholder if none)",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-009 ' + "Each card shows thumbnail (or placeholder if none)");
    }


    // This test validates: Each card shows thumbnail (or placeholder if none)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Each card shows diagram name', async ({ page }) => {
    // Checkpoint 10: Each card shows diagram name
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Each card shows diagram name",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-010 ' + "Each card shows diagram name");
    }


    // This test validates: Each card shows diagram name
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Relative date displays correctly Today Yesterday N days ago', async ({ page }) => {
    // Checkpoint 11: Relative date displays correctly: "Today", "Yesterday", "N days ago"
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Relative date displays correctly: \"Today\", \"Yesterday\", \"N days ago\"",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-011 ' + "Relative date displays correctly: \"Today\", \"Yesterday\", \"N days ago\"");
    }


    // This test validates: Relative date displays correctly: "Today", "Yesterday", "N days ago"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Clicking a card navigates to illustrateeditordiagramId', async ({ page }) => {
    // Checkpoint 12: Clicking a card navigates to `/illustrate/editor/{diagramId}`
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Clicking a card navigates to `/illustrate/editor/{diagramId}`",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-012 ' + "Clicking a card navigates to `/illustrate/editor/{diagramId}`");
    }


    // This test validates: Clicking a card navigates to `/illustrate/editor/{diagramId}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Keyboard accessible Tab Enter', async ({ page }) => {
    // Checkpoint 13: Keyboard accessible (Tab + Enter)
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Keyboard accessible (Tab + Enter)",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-013 ' + "Keyboard accessible (Tab + Enter)");
    }


    // This test validates: Keyboard accessible (Tab + Enter)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Empty state shown when no recent diagrams exist', async ({ page }) => {
    // Checkpoint 14: Empty state shown when no recent diagrams exist
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Empty state shown when no recent diagrams exist",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-014 ' + "Empty state shown when no recent diagrams exist");
    }


    // This test validates: Empty state shown when no recent diagrams exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Section hidden or shows message when localStorage is empty', async ({ page }) => {
    // Checkpoint 15: Section hidden or shows message when localStorage is empty
    // Section: Welcome Page (`/illustrate`) > Recent Diagrams

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Section hidden or shows message when localStorage is empty",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Recent Diagrams",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-015 ' + "Section hidden or shows message when localStorage is empty");
    }


    // This test validates: Section hidden or shows message when localStorage is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 4 template cards displayed Flowchart Sequence Scientific Annotation', async ({ page }) => {
    // Checkpoint 16: 4 template cards displayed: Flowchart, Sequence, Scientific, Annotation
    // Section: Welcome Page (`/illustrate`) > Quick Templates

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "4 template cards displayed: Flowchart, Sequence, Scientific, Annotation",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Quick Templates",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-016 ' + "4 template cards displayed: Flowchart, Sequence, Scientific, Annotation");
    }


    // This test validates: 4 template cards displayed: Flowchart, Sequence, Scientific, Annotation
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Each card shows category icon and label', async ({ page }) => {
    // Checkpoint 17: Each card shows category icon and label
    // Section: Welcome Page (`/illustrate`) > Quick Templates

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Each card shows category icon and label",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Quick Templates",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-017 ' + "Each card shows category icon and label");
    }


    // This test validates: Each card shows category icon and label
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Clicking a template navigates to illustrateagenttemplatetemplateId', async ({ page }) => {
    // Checkpoint 18: Clicking a template navigates to `/illustrate/agent?template={templateId}`
    // Section: Welcome Page (`/illustrate`) > Quick Templates

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Clicking a template navigates to `/illustrate/agent?template={templateId}`",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Quick Templates",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-018 ' + "Clicking a template navigates to `/illustrate/agent?template={templateId}`");
    }


    // This test validates: Clicking a template navigates to `/illustrate/agent?template={templateId}`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Hover state shows visual feedback', async ({ page }) => {
    // Checkpoint 19: Hover state shows visual feedback
    // Section: Welcome Page (`/illustrate`) > Quick Templates

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Hover state shows visual feedback",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Quick Templates",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-019 ' + "Hover state shows visual feedback");
    }


    // This test validates: Hover state shows visual feedback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Grid layout responsive at different viewport widths', async ({ page }) => {
    // Checkpoint 20: Grid layout responsive at different viewport widths
    // Section: Welcome Page (`/illustrate`) > Quick Templates

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Grid layout responsive at different viewport widths",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Quick Templates",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-020 ' + "Grid layout responsive at different viewport widths");
    }


    // This test validates: Grid layout responsive at different viewport widths
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: All interactive elements have ARIA labels', async ({ page }) => {
    // Checkpoint 21: All interactive elements have ARIA labels
    // Section: Welcome Page (`/illustrate`) > Accessibility

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "All interactive elements have ARIA labels",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Accessibility",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-021 ' + "All interactive elements have ARIA labels");
    }


    // This test validates: All interactive elements have ARIA labels
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Tab navigation reaches every card and link', async ({ page }) => {
    // Checkpoint 22: Tab navigation reaches every card and link
    // Section: Welcome Page (`/illustrate`) > Accessibility

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Tab navigation reaches every card and link",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Accessibility",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-022 ' + "Tab navigation reaches every card and link");
    }


    // This test validates: Tab navigation reaches every card and link
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Focus indicator visible on all interactive elements', async ({ page }) => {
    // Checkpoint 23: Focus indicator visible on all interactive elements
    // Section: Welcome Page (`/illustrate`) > Accessibility

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Focus indicator visible on all interactive elements",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Accessibility",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-023 ' + "Focus indicator visible on all interactive elements");
    }


    // This test validates: Focus indicator visible on all interactive elements
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Role attributes set on action cards', async ({ page }) => {
    // Checkpoint 24: Role attributes set on action cards
    // Section: Welcome Page (`/illustrate`) > Accessibility

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Role attributes set on action cards",
      section: "Welcome Page (`/illustrate`)",
      subsection: "Accessibility",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-024 ' + "Role attributes set on action cards");
    }


    // This test validates: Role attributes set on action cards
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Sidebar renders with template categories', async ({ page }) => {
    // Checkpoint 25: Sidebar renders with template categories
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Sidebar renders with template categories",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-025 ' + "Sidebar renders with template categories");
    }


    // This test validates: Sidebar renders with template categories
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Sidebar can be collapsedexpanded via toggle button', async ({ page }) => {
    // Checkpoint 26: Sidebar can be collapsed/expanded via toggle button
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Sidebar can be collapsed/expanded via toggle button",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-026 ' + "Sidebar can be collapsed/expanded via toggle button");
    }


    // This test validates: Sidebar can be collapsed/expanded via toggle button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Medicine category shows 3 templates', async ({ page }) => {
    // Checkpoint 27: **Medicine** category shows 3 templates:
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Medicine** category shows 3 templates:",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-027 ' + "**Medicine** category shows 3 templates:");
    }


    // This test validates: **Medicine** category shows 3 templates:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: CONSORT Clinical trial flow diagrams', async ({ page }) => {
    // Checkpoint 28: CONSORT — Clinical trial flow diagrams
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "CONSORT — Clinical trial flow diagrams",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-028 ' + "CONSORT — Clinical trial flow diagrams");
    }


    // This test validates: CONSORT — Clinical trial flow diagrams
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: PRISMA Systematic review flows', async ({ page }) => {
    // Checkpoint 29: PRISMA — Systematic review flows
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "PRISMA — Systematic review flows",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-029 ' + "PRISMA — Systematic review flows");
    }


    // This test validates: PRISMA — Systematic review flows
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Forest Plot Meta-analysis visualization', async ({ page }) => {
    // Checkpoint 30: Forest Plot — Meta-analysis visualization
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Forest Plot — Meta-analysis visualization",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-030 ' + "Forest Plot — Meta-analysis visualization");
    }


    // This test validates: Forest Plot — Meta-analysis visualization
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Biology category shows 3 templates', async ({ page }) => {
    // Checkpoint 31: **Biology** category shows 3 templates:
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Biology** category shows 3 templates:",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-031 ' + "**Biology** category shows 3 templates:");
    }


    // This test validates: **Biology** category shows 3 templates:
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Pathway Biological signaling cascades', async ({ page }) => {
    // Checkpoint 32: Pathway — Biological signaling cascades
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathway — Biological signaling cascades",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-032 ' + "Pathway — Biological signaling cascades");
    }


    // This test validates: Pathway — Biological signaling cascades
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Cell Diagram Cellular structure', async ({ page }) => {
    // Checkpoint 33: Cell Diagram — Cellular structure
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Cell Diagram — Cellular structure",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-033 ' + "Cell Diagram — Cellular structure");
    }


    // This test validates: Cell Diagram — Cellular structure
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Phylogenetic Tree Evolutionary relationships', async ({ page }) => {
    // Checkpoint 34: Phylogenetic Tree — Evolutionary relationships
    // Section: Agent Mode — AI Diagram Generation (`/illustrate/agent`) > Template Gallery (Left Sidebar)

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-001');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Phylogenetic Tree — Evolutionary relationships",
      section: "Agent Mode — AI Diagram Generation (`/illustrate/agent`)",
      subsection: "Template Gallery (Left Sidebar)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-034 ' + "Phylogenetic Tree — Evolutionary relationships");
    }


    // This test validates: Phylogenetic Tree — Evolutionary relationships
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
