/**
 * Auto-generated Playwright test for library/spec-005
 * Source: e2e/specs/library/spec-005.md
 * Generated: 2026-04-02T13:28:49.325Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-005
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-005', () => {
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

  test('cp-000: Text selection shows popover select text in reader highlight color popover appea', async ({ page }) => {
    // Checkpoint 0: Text selection shows popover — select text in reader, highlight color popover appears `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Text selection shows popover — select text in reader, highlight color popover appears `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Text selection shows popover — select text in reader, highlight color popover appears `[CONFIRMED]`");
    }


    // This test validates: Text selection shows popover — select text in reader, highlight color popover appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Choose highlight color click a color dot in popover highlight applies with chose', async ({ page }) => {
    // Checkpoint 1: Choose highlight color — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Choose highlight color — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Choose highlight color — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`");
    }


    // This test validates: Choose highlight color — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Default highlight is yellow create highlight without changing color it renders y', async ({ page }) => {
    // Checkpoint 2: Default highlight is yellow — create highlight without changing color, it renders yellow `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Default highlight is yellow — create highlight without changing color, it renders yellow `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "Default highlight is yellow — create highlight without changing color, it renders yellow `[CONFIRMED]`");
    }


    // This test validates: Default highlight is yellow — create highlight without changing color, it renders yellow `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Add note to highlight click Add note in popover note textarea appears CONFIRMED', async ({ page }) => {
    // Checkpoint 3: Add note to highlight — click "Add note" in popover, note textarea appears `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Add note to highlight — click \"Add note\" in popover, note textarea appears `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "Add note to highlight — click \"Add note\" in popover, note textarea appears `[CONFIRMED]`");
    }


    // This test validates: Add note to highlight — click "Add note" in popover, note textarea appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Submit note with CmdEnter type note text press CmdEnter note saves CONFIRMED', async ({ page }) => {
    // Checkpoint 4: Submit note with Cmd+Enter — type note text, press Cmd+Enter, note saves `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Submit note with Cmd+Enter — type note text, press Cmd+Enter, note saves `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Submit note with Cmd+Enter — type note text, press Cmd+Enter, note saves `[CONFIRMED]`");
    }


    // This test validates: Submit note with Cmd+Enter — type note text, press Cmd+Enter, note saves `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Cancel highlight popover press Escape in popover popover closes without saving C', async ({ page }) => {
    // Checkpoint 5: Cancel highlight popover — press Escape in popover, popover closes without saving `[CONFIRMED]`
    // Section: Annotations — Highlights

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Cancel highlight popover — press Escape in popover, popover closes without saving `[CONFIRMED]`",
      section: "Annotations — Highlights",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Cancel highlight popover — press Escape in popover, popover closes without saving `[CONFIRMED]`");
    }


    // This test validates: Cancel highlight popover — press Escape in popover, popover closes without saving `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Create general note in workbench Notes tab type note and click submit CONFIRMED', async ({ page }) => {
    // Checkpoint 6: Create general note — in workbench Notes tab, type note and click submit `[CONFIRMED]`
    // Section: Annotations — Notes

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Create general note — in workbench Notes tab, type note and click submit `[CONFIRMED]`",
      section: "Annotations — Notes",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Create general note — in workbench Notes tab, type note and click submit `[CONFIRMED]`");
    }


    // This test validates: Create general note — in workbench Notes tab, type note and click submit `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Edit note inline click edit icon on existing note text becomes editable CONFIRME', async ({ page }) => {
    // Checkpoint 7: Edit note inline — click edit icon on existing note, text becomes editable `[CONFIRMED]`
    // Section: Annotations — Notes

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Edit note inline — click edit icon on existing note, text becomes editable `[CONFIRMED]`",
      section: "Annotations — Notes",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Edit note inline — click edit icon on existing note, text becomes editable `[CONFIRMED]`");
    }


    // This test validates: Edit note inline — click edit icon on existing note, text becomes editable `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Save edited note edit note text and click saveCmdEnter note updates CONFIRMED', async ({ page }) => {
    // Checkpoint 8: Save edited note — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`
    // Section: Annotations — Notes

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Save edited note — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`",
      section: "Annotations — Notes",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Save edited note — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`");
    }


    // This test validates: Save edited note — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Delete annotation click delete icon on notehighlight it is removed CONFIRMED', async ({ page }) => {
    // Checkpoint 9: Delete annotation — click delete icon on note/highlight, it is removed `[CONFIRMED]`
    // Section: Annotations — Notes

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete annotation — click delete icon on note/highlight, it is removed `[CONFIRMED]`",
      section: "Annotations — Notes",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Delete annotation — click delete icon on note/highlight, it is removed `[CONFIRMED]`");
    }


    // This test validates: Delete annotation — click delete icon on note/highlight, it is removed `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Click highlight jumps in workbench Highlights tab click a highlight reader scrol', async ({ page }) => {
    // Checkpoint 10: Click highlight jumps — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`
    // Section: Annotations — Notes

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Click highlight jumps — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`",
      section: "Annotations — Notes",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Click highlight jumps — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`");
    }


    // This test validates: Click highlight jumps — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Project dropdown opens click project switcher in header dropdown with project li', async ({ page }) => {
    // Checkpoint 11: Project dropdown opens — click project switcher in header, dropdown with project list appears `[CONFIRMED]`
    // Section: Project Switching

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Project dropdown opens — click project switcher in header, dropdown with project list appears `[CONFIRMED]`",
      section: "Project Switching",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Project dropdown opens — click project switcher in header, dropdown with project list appears `[CONFIRMED]`");
    }


    // This test validates: Project dropdown opens — click project switcher in header, dropdown with project list appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Select project re-scopes click a project URL updates to libraryprojectid sources', async ({ page }) => {
    // Checkpoint 12: Select project re-scopes — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`
    // Section: Project Switching

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Select project re-scopes — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`",
      section: "Project Switching",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Select project re-scopes — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`");
    }


    // This test validates: Select project re-scopes — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: All Library option click All Library in dropdown exits project scope shows all s', async ({ page }) => {
    // Checkpoint 13: All Library option — click "All Library" in dropdown, exits project scope, shows all sources `[CONFIRMED]`
    // Section: Project Switching

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "All Library option — click \"All Library\" in dropdown, exits project scope, shows all sources `[CONFIRMED]`",
      section: "Project Switching",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "All Library option — click \"All Library\" in dropdown, exits project scope, shows all sources `[CONFIRMED]`");
    }


    // This test validates: All Library option — click "All Library" in dropdown, exits project scope, shows all sources `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Last active project persists select a project navigate away return to library sa', async ({ page }) => {
    // Checkpoint 14: Last active project persists — select a project, navigate away, return to /library, same project active `[CONFIRMED]`
    // Section: Project Switching

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Last active project persists — select a project, navigate away, return to /library, same project active `[CONFIRMED]`",
      section: "Project Switching",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "Last active project persists — select a project, navigate away, return to /library, same project active `[CONFIRMED]`");
    }


    // This test validates: Last active project persists — select a project, navigate away, return to /library, same project active `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Escape closes dropdown with dropdown open press Escape dropdown closes CONFIRMED', async ({ page }) => {
    // Checkpoint 15: Escape closes dropdown — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`
    // Section: Project Switching

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Escape closes dropdown — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`",
      section: "Project Switching",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "Escape closes dropdown — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`");
    }


    // This test validates: Escape closes dropdown — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Add Source button visible Add Source button visible in library header CONFIRMED', async ({ page }) => {
    // Checkpoint 16: Add Source button visible — "Add Source" button visible in library header `[CONFIRMED]`
    // Section: Ingestion — URL Paste

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Add Source button visible — \"Add Source\" button visible in library header `[CONFIRMED]`",
      section: "Ingestion — URL Paste",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "Add Source button visible — \"Add Source\" button visible in library header `[CONFIRMED]`");
    }


    // This test validates: Add Source button visible — "Add Source" button visible in library header `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Add Source dialog opens click Add Source dialog with URLPDF tabs appears CONFIRM', async ({ page }) => {
    // Checkpoint 17: Add Source dialog opens — click "Add Source", dialog with URL/PDF tabs appears `[CONFIRMED]`
    // Section: Ingestion — URL Paste

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Add Source dialog opens — click \"Add Source\", dialog with URL/PDF tabs appears `[CONFIRMED]`",
      section: "Ingestion — URL Paste",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "Add Source dialog opens — click \"Add Source\", dialog with URL/PDF tabs appears `[CONFIRMED]`");
    }


    // This test validates: Add Source dialog opens — click "Add Source", dialog with URL/PDF tabs appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Paste URL and save paste a URL click Save to Library success message shows CONFI', async ({ page }) => {
    // Checkpoint 18: Paste URL and save — paste a URL, click "Save to Library", success message shows `[CONFIRMED]`
    // Section: Ingestion — URL Paste

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paste URL and save — paste a URL, click \"Save to Library\", success message shows `[CONFIRMED]`",
      section: "Ingestion — URL Paste",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "Paste URL and save — paste a URL, click \"Save to Library\", success message shows `[CONFIRMED]`");
    }


    // This test validates: Paste URL and save — paste a URL, click "Save to Library", success message shows `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Enter submits URL type URL and press Enter form submits CONFIRMED', async ({ page }) => {
    // Checkpoint 19: Enter submits URL — type URL and press Enter, form submits `[CONFIRMED]`
    // Section: Ingestion — URL Paste

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Enter submits URL — type URL and press Enter, form submits `[CONFIRMED]`",
      section: "Ingestion — URL Paste",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "Enter submits URL — type URL and press Enter, form submits `[CONFIRMED]`");
    }


    // This test validates: Enter submits URL — type URL and press Enter, form submits `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Escape closes dialog press Escape dialog closes and state resets CONFIRMED', async ({ page }) => {
    // Checkpoint 20: Escape closes dialog — press Escape, dialog closes and state resets `[CONFIRMED]`
    // Section: Ingestion — URL Paste

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Escape closes dialog — press Escape, dialog closes and state resets `[CONFIRMED]`",
      section: "Ingestion — URL Paste",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "Escape closes dialog — press Escape, dialog closes and state resets `[CONFIRMED]`");
    }


    // This test validates: Escape closes dialog — press Escape, dialog closes and state resets `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: PDF upload tab click Upload PDF tab file picker area appears CONFIRMED', async ({ page }) => {
    // Checkpoint 21: PDF upload tab — click "Upload PDF" tab, file picker area appears `[CONFIRMED]`
    // Section: Ingestion — PDF Upload

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-005');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF upload tab — click \"Upload PDF\" tab, file picker area appears `[CONFIRMED]`",
      section: "Ingestion — PDF Upload",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "PDF upload tab — click \"Upload PDF\" tab, file picker area appears `[CONFIRMED]`");
    }


    // This test validates: PDF upload tab — click "Upload PDF" tab, file picker area appears `[CONFIRMED]`
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
