/**
 * Auto-generated Playwright test for illustrate/spec-005
 * Source: e2e/specs/illustrate/spec-005.md
 * Generated: 2026-03-14T10:22:15.019Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts illustrate spec-005
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';















import { assertIllustrateCheckpoint } from '../../module-assertions/illustrate';




test.describe('illustrate / spec-005', () => {
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

  test('cp-000: Ungroup CtrlShiftG Ungroups selected group', async ({ page }) => {
    // Checkpoint 0: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
    // Section: MenuBar > Edit Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group",
      section: "MenuBar",
      subsection: "Edit Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-000 ' + "**Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group");
    }


    // This test validates: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Zoom In Increments zoom by 01', async ({ page }) => {
    // Checkpoint 1: **Zoom In** (`+`) — Increments zoom by 0.1
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Zoom In** (`+`) — Increments zoom by 0.1",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-001 ' + "**Zoom In** (`+`) — Increments zoom by 0.1");
    }


    // This test validates: **Zoom In** (`+`) — Increments zoom by 0.1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Zoom Out - Decrements zoom by 01', async ({ page }) => {
    // Checkpoint 2: **Zoom Out** (`-`) — Decrements zoom by 0.1
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Zoom Out** (`-`) — Decrements zoom by 0.1",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-002 ' + "**Zoom Out** (`-`) — Decrements zoom by 0.1");
    }


    // This test validates: **Zoom Out** (`-`) — Decrements zoom by 0.1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Zoom to 100 Ctrl0 Resets viewport to 10', async ({ page }) => {
    // Checkpoint 3: **Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-003 ' + "**Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0");
    }


    // This test validates: **Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Fit to Window Ctrl1 Fits all objects in view', async ({ page }) => {
    // Checkpoint 4: **Fit to Window** (`Ctrl+1`) — Fits all objects in view
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Fit to Window** (`Ctrl+1`) — Fits all objects in view",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-004 ' + "**Fit to Window** (`Ctrl+1`) — Fits all objects in view");
    }


    // This test validates: **Fit to Window** (`Ctrl+1`) — Fits all objects in view
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Zoom presets 50 100 150 200 Each sets zoom to value', async ({ page }) => {
    // Checkpoint 5: **Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-005 ' + "**Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value");
    }


    // This test validates: **Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Show Grid Ctrl Toggles gridVisible', async ({ page }) => {
    // Checkpoint 6: **Show Grid** (`Ctrl+'`) — Toggles `gridVisible`
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Show Grid** (`Ctrl+'`) — Toggles `gridVisible`",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-006 ' + "**Show Grid** (`Ctrl+'`) — Toggles `gridVisible`");
    }


    // This test validates: **Show Grid** (`Ctrl+'`) — Toggles `gridVisible`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Snap to Grid CtrlShift Toggles snapToGrid', async ({ page }) => {
    // Checkpoint 7: **Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-007 ' + "**Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`");
    }


    // This test validates: **Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Show Rulers CtrlR Toggles ruler visibility', async ({ page }) => {
    // Checkpoint 8: **Show Rulers** (`Ctrl+R`) — Toggles ruler visibility
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Show Rulers** (`Ctrl+R`) — Toggles ruler visibility",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-008 ' + "**Show Rulers** (`Ctrl+R`) — Toggles ruler visibility");
    }


    // This test validates: **Show Rulers** (`Ctrl+R`) — Toggles ruler visibility
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Show Guides CtrlShiftR Toggles guide visibility', async ({ page }) => {
    // Checkpoint 9: **Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility
    // Section: MenuBar > View Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility",
      section: "MenuBar",
      subsection: "View Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-009 ' + "**Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility");
    }


    // This test validates: **Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Bring to Front CtrlShift Moves selected to top z-index', async ({ page }) => {
    // Checkpoint 10: **Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-010 ' + "**Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index");
    }


    // This test validates: **Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Bring Forward Ctrl Increases z-index by 1', async ({ page }) => {
    // Checkpoint 11: **Bring Forward** (`Ctrl+]`) — Increases z-index by 1
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Bring Forward** (`Ctrl+]`) — Increases z-index by 1",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-011 ' + "**Bring Forward** (`Ctrl+]`) — Increases z-index by 1");
    }


    // This test validates: **Bring Forward** (`Ctrl+]`) — Increases z-index by 1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Send Backward Ctrl Decreases z-index by 1', async ({ page }) => {
    // Checkpoint 12: **Send Backward** (`Ctrl+[`) — Decreases z-index by 1
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Send Backward** (`Ctrl+[`) — Decreases z-index by 1",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-012 ' + "**Send Backward** (`Ctrl+[`) — Decreases z-index by 1");
    }


    // This test validates: **Send Backward** (`Ctrl+[`) — Decreases z-index by 1
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Send to Back CtrlShift Moves selected to bottom z-index', async ({ page }) => {
    // Checkpoint 13: **Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-013 ' + "**Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index");
    }


    // This test validates: **Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Flip Horizontal ShiftH Flips selection horizontally', async ({ page }) => {
    // Checkpoint 14: **Flip Horizontal** (`Shift+H`) — Flips selection horizontally
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Flip Horizontal** (`Shift+H`) — Flips selection horizontally",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-014 ' + "**Flip Horizontal** (`Shift+H`) — Flips selection horizontally");
    }


    // This test validates: **Flip Horizontal** (`Shift+H`) — Flips selection horizontally
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Flip Vertical ShiftV Flips selection vertically', async ({ page }) => {
    // Checkpoint 15: **Flip Vertical** (`Shift+V`) — Flips selection vertically
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Flip Vertical** (`Shift+V`) — Flips selection vertically",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-015 ' + "**Flip Vertical** (`Shift+V`) — Flips selection vertically");
    }


    // This test validates: **Flip Vertical** (`Shift+V`) — Flips selection vertically
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Group CtrlG Groups selected objects', async ({ page }) => {
    // Checkpoint 16: **Group** (`Ctrl+G`) — Groups selected objects
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Group** (`Ctrl+G`) — Groups selected objects",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-016 ' + "**Group** (`Ctrl+G`) — Groups selected objects");
    }


    // This test validates: **Group** (`Ctrl+G`) — Groups selected objects
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Ungroup CtrlShiftG Ungroups selected group', async ({ page }) => {
    // Checkpoint 17: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-017 ' + "**Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group");
    }


    // This test validates: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Make Clipping Mask Ctrl7 Requires 2 objects selected', async ({ page }) => {
    // Checkpoint 18: **Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-018 ' + "**Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected");
    }


    // This test validates: **Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Release Clipping Mask CtrlAlt7 Requires single clipped group', async ({ page }) => {
    // Checkpoint 19: **Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-019 ' + "**Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group");
    }


    // This test validates: **Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Make Compound Path Ctrl8 Requires 2 path objects', async ({ page }) => {
    // Checkpoint 20: **Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-020 ' + "**Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects");
    }


    // This test validates: **Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Release Compound Path CtrlAlt8 Requires single compound path', async ({ page }) => {
    // Checkpoint 21: **Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-021 ' + "**Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path");
    }


    // This test validates: **Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Offset Path Prompts for distance positive outward negative inward', async ({ page }) => {
    // Checkpoint 22: Offset Path — Prompts for distance (positive = outward, negative = inward)
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Offset Path — Prompts for distance (positive = outward, negative = inward)",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-022 ' + "Offset Path — Prompts for distance (positive = outward, negative = inward)");
    }


    // This test validates: Offset Path — Prompts for distance (positive = outward, negative = inward)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Pathfinder Unite Combines shapes into one', async ({ page }) => {
    // Checkpoint 23: Pathfinder — Unite — Combines shapes into one
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathfinder — Unite — Combines shapes into one",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-023 ' + "Pathfinder — Unite — Combines shapes into one");
    }


    // This test validates: Pathfinder — Unite — Combines shapes into one
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Pathfinder Subtract Cuts bottom shape from top', async ({ page }) => {
    // Checkpoint 24: Pathfinder — Subtract — Cuts bottom shape from top
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathfinder — Subtract — Cuts bottom shape from top",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-024 ' + "Pathfinder — Subtract — Cuts bottom shape from top");
    }


    // This test validates: Pathfinder — Subtract — Cuts bottom shape from top
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Pathfinder Intersect Keeps only overlapping area', async ({ page }) => {
    // Checkpoint 25: Pathfinder — Intersect — Keeps only overlapping area
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathfinder — Intersect — Keeps only overlapping area",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-025 ' + "Pathfinder — Intersect — Keeps only overlapping area");
    }


    // This test validates: Pathfinder — Intersect — Keeps only overlapping area
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Pathfinder Exclude XOR keeps non-overlapping areas', async ({ page }) => {
    // Checkpoint 26: Pathfinder — Exclude — XOR: keeps non-overlapping areas
    // Section: MenuBar > Object Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathfinder — Exclude — XOR: keeps non-overlapping areas",
      section: "MenuBar",
      subsection: "Object Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-026 ' + "Pathfinder — Exclude — XOR: keeps non-overlapping areas");
    }


    // This test validates: Pathfinder — Exclude — XOR: keeps non-overlapping areas
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: DNA Helix CtrlShiftD Inserts DNA helix shape', async ({ page }) => {
    // Checkpoint 27: **DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-027 ' + "**DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape");
    }


    // This test validates: **DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Cell Membrane CtrlShiftM Inserts cell membrane shape', async ({ page }) => {
    // Checkpoint 28: **Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-028 ' + "**Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape");
    }


    // This test validates: **Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Cell Layer Tissue Inserts tissue layer shape', async ({ page }) => {
    // Checkpoint 29: Cell Layer / Tissue — Inserts tissue layer shape
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Cell Layer / Tissue — Inserts tissue layer shape",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-029 ' + "Cell Layer / Tissue — Inserts tissue layer shape");
    }


    // This test validates: Cell Layer / Tissue — Inserts tissue layer shape
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Neuron Inserts neuron shape', async ({ page }) => {
    // Checkpoint 30: Neuron — Inserts neuron shape
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Neuron — Inserts neuron shape",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-030 ' + "Neuron — Inserts neuron shape");
    }


    // This test validates: Neuron — Inserts neuron shape
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Mitochondria Inserts mitochondria shape', async ({ page }) => {
    // Checkpoint 31: Mitochondria — Inserts mitochondria shape
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Mitochondria — Inserts mitochondria shape",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-031 ' + "Mitochondria — Inserts mitochondria shape");
    }


    // This test validates: Mitochondria — Inserts mitochondria shape
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Pathway Arrows Inserts pathway arrow set', async ({ page }) => {
    // Checkpoint 32: Pathway Arrows — Inserts pathway arrow set
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "Pathway Arrows — Inserts pathway arrow set",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-032 ' + "Pathway Arrows — Inserts pathway arrow set");
    }


    // This test validates: Pathway Arrows — Inserts pathway arrow set
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: All Scientific Shapes CtrlShiftS Opens full shape generator panel', async ({ page }) => {
    // Checkpoint 33: **All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel
    // Section: MenuBar > Insert Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel",
      section: "MenuBar",
      subsection: "Insert Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-033 ' + "**All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel");
    }


    // This test validates: **All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: AI Generate Image CtrlShiftA Opens AIGenerationTool dialog', async ({ page }) => {
    // Checkpoint 34: **AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog
    // Section: MenuBar > Image Menu

    // Navigate to the page
    await page.goto('/illustrate', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/illustrate/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertIllustrateCheckpoint({
      page,
      description: "**AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog",
      section: "MenuBar",
      subsection: "Image Menu",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled illustrate checkpoint: cp-034 ' + "**AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog");
    }


    // This test validates: **AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog
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
