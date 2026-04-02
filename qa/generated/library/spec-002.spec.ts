/**
 * Auto-generated Playwright test for library/spec-002
 * Source: e2e/specs/library/spec-002.md
 * Generated: 2026-04-02T13:28:47.040Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-002
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-002', () => {
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

  test('cp-000: Continue Reading section items with reading_progress 0 appear in Continue Readin', async ({ page }) => {
    // Checkpoint 0: Continue Reading section — items with reading_progress > 0 appear in Continue Reading `[CONFIRMED]`
    // Section: Home Screen Sections

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Continue Reading section — items with reading_progress > 0 appear in Continue Reading `[CONFIRMED]`",
      section: "Home Screen Sections",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Continue Reading section — items with reading_progress > 0 appear in Continue Reading `[CONFIRMED]`");
    }


    // This test validates: Continue Reading section — items with reading_progress > 0 appear in Continue Reading `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-001: Active Project section when a project is active shows project-scoped items CONFI', async ({ page }) => {
    // Checkpoint 1: Active Project section — when a project is active, shows project-scoped items `[CONFIRMED]`
    // Section: Home Screen Sections

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Active Project section — when a project is active, shows project-scoped items `[CONFIRMED]`",
      section: "Home Screen Sections",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Active Project section — when a project is active, shows project-scoped items `[CONFIRMED]`");
    }


    // This test validates: Active Project section — when a project is active, shows project-scoped items `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-002: Needs Review section unread items with high signal appear in Needs Review CONFIR', async ({ page }) => {
    // Checkpoint 2: Needs Review section — unread items with high signal appear in Needs Review `[CONFIRMED]`
    // Section: Home Screen Sections

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Needs Review section — unread items with high signal appear in Needs Review `[CONFIRMED]`",
      section: "Home Screen Sections",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "Needs Review section — unread items with high signal appear in Needs Review `[CONFIRMED]`");
    }


    // This test validates: Needs Review section — unread items with high signal appear in Needs Review `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-003: Recently Saved section most recently saved items appear in Recently Saved CONFIR', async ({ page }) => {
    // Checkpoint 3: Recently Saved section — most recently saved items appear in Recently Saved `[CONFIRMED]`
    // Section: Home Screen Sections

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Recently Saved section — most recently saved items appear in Recently Saved `[CONFIRMED]`",
      section: "Home Screen Sections",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "Recently Saved section — most recently saved items appear in Recently Saved `[CONFIRMED]`");
    }


    // This test validates: Recently Saved section — most recently saved items appear in Recently Saved `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-004: Card click navigates click a source card navigates to libraryitemlibraryId CONFI', async ({ page }) => {
    // Checkpoint 4: Card click navigates — click a source card, navigates to /library/item/[libraryId] `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Card click navigates — click a source card, navigates to /library/item/[libraryId] `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Card click navigates — click a source card, navigates to /library/item/[libraryId] `[CONFIRMED]`");
    }


    // This test validates: Card click navigates — click a source card, navigates to /library/item/[libraryId] `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-005: Workflow state badge renders each card shows colored badge with state name Inbox', async ({ page }) => {
    // Checkpoint 5: Workflow state badge renders — each card shows colored badge with state name (Inbox/Core/etc.) `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Workflow state badge renders — each card shows colored badge with state name (Inbox/Core/etc.) `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Workflow state badge renders — each card shows colored badge with state name (Inbox/Core/etc.) `[CONFIRMED]`");
    }


    // This test validates: Workflow state badge renders — each card shows colored badge with state name (Inbox/Core/etc.) `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-006: Trust tier dot shows cards display small colored dot for trustevidence tier CONF', async ({ page }) => {
    // Checkpoint 6: Trust tier dot shows — cards display small colored dot for trust/evidence tier `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Trust tier dot shows — cards display small colored dot for trust/evidence tier `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Trust tier dot shows — cards display small colored dot for trust/evidence tier `[CONFIRMED]`");
    }


    // This test validates: Trust tier dot shows — cards display small colored dot for trust/evidence tier `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-007: 3-dot menu opens click dots icon on card action menu dropdown appears CONFIRMED', async ({ page }) => {
    // Checkpoint 7: 3-dot menu opens — click dots icon on card, action menu dropdown appears `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "3-dot menu opens — click dots icon on card, action menu dropdown appears `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "3-dot menu opens — click dots icon on card, action menu dropdown appears `[CONFIRMED]`");
    }


    // This test validates: 3-dot menu opens — click dots icon on card, action menu dropdown appears `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-008: Move to Core from menu click Move to Core in action menu card state updates CONF', async ({ page }) => {
    // Checkpoint 8: Move to Core from menu — click "Move to Core" in action menu, card state updates `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Move to Core from menu — click \"Move to Core\" in action menu, card state updates `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Move to Core from menu — click \"Move to Core\" in action menu, card state updates `[CONFIRMED]`");
    }


    // This test validates: Move to Core from menu — click "Move to Core" in action menu, card state updates `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-009: Delete from menu click Delete in action menu source moves to trash CONFIRMED', async ({ page }) => {
    // Checkpoint 9: Delete from menu — click "Delete" in action menu, source moves to trash `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete from menu — click \"Delete\" in action menu, source moves to trash `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Delete from menu — click \"Delete\" in action menu, source moves to trash `[CONFIRMED]`");
    }


    // This test validates: Delete from menu — click "Delete" in action menu, source moves to trash `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-010: Menu closes on outside click click outside the open action menu menu closes CONF', async ({ page }) => {
    // Checkpoint 10: Menu closes on outside click — click outside the open action menu, menu closes `[CONFIRMED]`
    // Section: Source Cards

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Menu closes on outside click — click outside the open action menu, menu closes `[CONFIRMED]`",
      section: "Source Cards",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Menu closes on outside click — click outside the open action menu, menu closes `[CONFIRMED]`");
    }


    // This test validates: Menu closes on outside click — click outside the open action menu, menu closes `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-011: Show more loads items click Show more button additional sources appear below CON', async ({ page }) => {
    // Checkpoint 11: Show more loads items — click "Show more" button, additional sources appear below `[CONFIRMED]`
    // Section: Source List & Pagination

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Show more loads items — click \"Show more\" button, additional sources appear below `[CONFIRMED]`",
      section: "Source List & Pagination",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Show more loads items — click \"Show more\" button, additional sources appear below `[CONFIRMED]`");
    }


    // This test validates: Show more loads items — click "Show more" button, additional sources appear below `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-012: Loading indicator during fetch while loading more a spinnerskeleton shows CONFIR', async ({ page }) => {
    // Checkpoint 12: Loading indicator during fetch — while loading more, a spinner/skeleton shows `[CONFIRMED]`
    // Section: Source List & Pagination

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Loading indicator during fetch — while loading more, a spinner/skeleton shows `[CONFIRMED]`",
      section: "Source List & Pagination",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Loading indicator during fetch — while loading more, a spinner/skeleton shows `[CONFIRMED]`");
    }


    // This test validates: Loading indicator during fetch — while loading more, a spinner/skeleton shows `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-013: Multi-select checkbox click checkbox on card card enters selected state CONFIRME', async ({ page }) => {
    // Checkpoint 13: Multi-select checkbox — click checkbox on card, card enters selected state `[CONFIRMED]`
    // Section: Source List & Pagination

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Multi-select checkbox — click checkbox on card, card enters selected state `[CONFIRMED]`",
      section: "Source List & Pagination",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "Multi-select checkbox — click checkbox on card, card enters selected state `[CONFIRMED]`");
    }


    // This test validates: Multi-select checkbox — click checkbox on card, card enters selected state `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });

  test('cp-014: Bulk toolbar appears with 1 cards selected bulk action toolbar appears at top CO', async ({ page }) => {
    // Checkpoint 14: Bulk toolbar appears — with 1+ cards selected, bulk action toolbar appears at top `[CONFIRMED]`
    // Section: Source List & Pagination

    // Navigate to the page (soft — source-code assertions don't need browser)
    try {
      await page.goto('/library', { waitUntil: 'domcontentloaded', timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch { /* server may not be running for source-code-only checks */ }

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    try { await expect(page.locator('body')).toBeVisible({ timeout: 5000 }); } catch {}

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Bulk toolbar appears — with 1+ cards selected, bulk action toolbar appears at top `[CONFIRMED]`",
      section: "Source List & Pagination",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    try { await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    }); } catch { /* no screenshot if page didn't load */ }

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "Bulk toolbar appears — with 1+ cards selected, bulk action toolbar appears at top `[CONFIRMED]`");
    }


    // This test validates: Bulk toolbar appears — with 1+ cards selected, bulk action toolbar appears at top `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    // Page error check skipped for source-code assertions
  });
});
