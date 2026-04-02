/**
 * Auto-generated Playwright test for library/spec-003
 * Source: e2e/specs/library/spec-003.md
 * Generated: 2026-04-02T13:28:47.744Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-003
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-003', () => {
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

  test('cp-000: Move source between states use card menu to move from Inbox to Core source appea', async ({ page }) => {
    // Checkpoint 0: Move source between states — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Move source between states — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Move source between states — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`");
    }


    // This test validates: Move source between states — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Sidebar counts update optimistically after moving source sidebar count decrement', async ({ page }) => {
    // Checkpoint 1: Sidebar counts update optimistically — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sidebar counts update optimistically — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Sidebar counts update optimistically — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`");
    }


    // This test validates: Sidebar counts update optimistically — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Undo toast appears after moving a source toast with Moved to state and Undo link', async ({ page }) => {
    // Checkpoint 2: Undo toast appears — after moving a source, toast with "Moved to [state]" and Undo link appears `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Undo toast appears — after moving a source, toast with \"Moved to [state]\" and Undo link appears `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "Undo toast appears — after moving a source, toast with \"Moved to [state]\" and Undo link appears `[CONFIRMED]`");
    }


    // This test validates: Undo toast appears — after moving a source, toast with "Moved to [state]" and Undo link appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Countdown progress bar undo toast shows a shrinking progress bar over 5-8 second', async ({ page }) => {
    // Checkpoint 3: Countdown progress bar — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Countdown progress bar — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "Countdown progress bar — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`");
    }


    // This test validates: Countdown progress bar — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Click undo reverts move click Undo on toast source returns to previous state CON', async ({ page }) => {
    // Checkpoint 4: Click undo reverts move — click "Undo" on toast, source returns to previous state `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Click undo reverts move — click \"Undo\" on toast, source returns to previous state `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Click undo reverts move — click \"Undo\" on toast, source returns to previous state `[CONFIRMED]`");
    }


    // This test validates: Click undo reverts move — click "Undo" on toast, source returns to previous state `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Toast auto-dismisses after countdown expires toast disappears automatically CONF', async ({ page }) => {
    // Checkpoint 5: Toast auto-dismisses — after countdown expires, toast disappears automatically `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Toast auto-dismisses — after countdown expires, toast disappears automatically `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Toast auto-dismisses — after countdown expires, toast disappears automatically `[CONFIRMED]`");
    }


    // This test validates: Toast auto-dismisses — after countdown expires, toast disappears automatically `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Bulk send to editor select multiple cards click Send to Editor in toolbar CONFIR', async ({ page }) => {
    // Checkpoint 6: Bulk send to editor — select multiple cards, click "Send to Editor" in toolbar `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Bulk send to editor — select multiple cards, click \"Send to Editor\" in toolbar `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Bulk send to editor — select multiple cards, click \"Send to Editor\" in toolbar `[CONFIRMED]`");
    }


    // This test validates: Bulk send to editor — select multiple cards, click "Send to Editor" in toolbar `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Clear selection click X in bulk toolbar all selections cleared CONFIRMED', async ({ page }) => {
    // Checkpoint 7: Clear selection — click X in bulk toolbar, all selections cleared `[CONFIRMED]`
    // Section: Workflow State Transitions

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clear selection — click X in bulk toolbar, all selections cleared `[CONFIRMED]`",
      section: "Workflow State Transitions",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Clear selection — click X in bulk toolbar, all selections cleared `[CONFIRMED]`");
    }


    // This test validates: Clear selection — click X in bulk toolbar, all selections cleared `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Delete sends to trash delete a source it disappears from list and appears in lib', async ({ page }) => {
    // Checkpoint 8: Delete sends to trash — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`
    // Section: Trash & Deletion

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete sends to trash — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`",
      section: "Trash & Deletion",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Delete sends to trash — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`");
    }


    // This test validates: Delete sends to trash — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Restore from trash click Restore button on a trashed item it returns to inbox CO', async ({ page }) => {
    // Checkpoint 9: Restore from trash — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`
    // Section: Trash & Deletion

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Restore from trash — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`",
      section: "Trash & Deletion",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Restore from trash — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`");
    }


    // This test validates: Restore from trash — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Permanent delete confirmation click delete on trash item confirmation dialog app', async ({ page }) => {
    // Checkpoint 10: Permanent delete confirmation — click delete on trash item, confirmation dialog appears `[CONFIRMED]`
    // Section: Trash & Deletion

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Permanent delete confirmation — click delete on trash item, confirmation dialog appears `[CONFIRMED]`",
      section: "Trash & Deletion",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Permanent delete confirmation — click delete on trash item, confirmation dialog appears `[CONFIRMED]`");
    }


    // This test validates: Permanent delete confirmation — click delete on trash item, confirmation dialog appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Confirm permanent delete click confirm in dialog source is permanently removed C', async ({ page }) => {
    // Checkpoint 11: Confirm permanent delete — click confirm in dialog, source is permanently removed `[CONFIRMED]`
    // Section: Trash & Deletion

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Confirm permanent delete — click confirm in dialog, source is permanently removed `[CONFIRMED]`",
      section: "Trash & Deletion",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Confirm permanent delete — click confirm in dialog, source is permanently removed `[CONFIRMED]`");
    }


    // This test validates: Confirm permanent delete — click confirm in dialog, source is permanently removed `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Cancel permanent delete click cancel in confirmation dialog source remains in tr', async ({ page }) => {
    // Checkpoint 12: Cancel permanent delete — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`
    // Section: Trash & Deletion

    // Navigate to the page
    await page.goto('/library/inbox', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-003');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Cancel permanent delete — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`",
      section: "Trash & Deletion",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Cancel permanent delete — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`");
    }


    // This test validates: Cancel permanent delete — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`
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
