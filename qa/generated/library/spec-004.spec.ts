/**
 * Auto-generated Playwright test for library/spec-004
 * Source: e2e/specs/library/spec-004.md
 * Generated: 2026-04-02T13:28:48.552Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-004
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-004', () => {
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

  test('cp-000: Web content renders navigate to a web source with extraction_stateready extracte', async ({ page }) => {
    // Checkpoint 0: Web content renders — navigate to a web source with extraction_state=ready, extracted HTML displays `[CONFIRMED]`
    // Section: Web Source Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Web content renders — navigate to a web source with extraction_state=ready, extracted HTML displays `[CONFIRMED]`",
      section: "Web Source Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Web content renders — navigate to a web source with extraction_state=ready, extracted HTML displays `[CONFIRMED]`");
    }


    // This test validates: Web content renders — navigate to a web source with extraction_state=ready, extracted HTML displays `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Sanitized HTML extracted content renders without script tags or unsafe elements ', async ({ page }) => {
    // Checkpoint 1: Sanitized HTML — extracted content renders without script tags or unsafe elements `[EMERGENT: isomorphic-dompurify]`
    // Section: Web Source Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sanitized HTML — extracted content renders without script tags or unsafe elements `[EMERGENT: isomorphic-dompurify]`",
      section: "Web Source Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Sanitized HTML — extracted content renders without script tags or unsafe elements `[EMERGENT: isomorphic-dompurify]`");
    }


    // This test validates: Sanitized HTML — extracted content renders without script tags or unsafe elements `[EMERGENT: isomorphic-dompurify]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Reader typography content renders in Source Serif 4 at 17px within 720px max-wid', async ({ page }) => {
    // Checkpoint 2: Reader typography — content renders in Source Serif 4 at 17px within 720px max-width column `[CONFIRMED]`
    // Section: Web Source Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Reader typography — content renders in Source Serif 4 at 17px within 720px max-width column `[CONFIRMED]`",
      section: "Web Source Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "Reader typography — content renders in Source Serif 4 at 17px within 720px max-width column `[CONFIRMED]`");
    }


    // This test validates: Reader typography — content renders in Source Serif 4 at 17px within 720px max-width column `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Abstract view renders navigate to a paper source abstract and metadata display C', async ({ page }) => {
    // Checkpoint 3: Abstract view renders — navigate to a paper source, abstract and metadata display `[CONFIRMED]`
    // Section: Paper Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Abstract view renders — navigate to a paper source, abstract and metadata display `[CONFIRMED]`",
      section: "Paper Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "Abstract view renders — navigate to a paper source, abstract and metadata display `[CONFIRMED]`");
    }


    // This test validates: Abstract view renders — navigate to a paper source, abstract and metadata display `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: PDF view toggle click Full Text tab switches from abstract to PDFfull-text view ', async ({ page }) => {
    // Checkpoint 4: PDF view toggle — click "Full Text" tab, switches from abstract to PDF/full-text view `[CONFIRMED]`
    // Section: Paper Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "PDF view toggle — click \"Full Text\" tab, switches from abstract to PDF/full-text view `[CONFIRMED]`",
      section: "Paper Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "PDF view toggle — click \"Full Text\" tab, switches from abstract to PDF/full-text view `[CONFIRMED]`");
    }


    // This test validates: PDF view toggle — click "Full Text" tab, switches from abstract to PDF/full-text view `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Back to abstract click Abstract tab switches back to abstract view CONFIRMED', async ({ page }) => {
    // Checkpoint 5: Back to abstract — click "Abstract" tab, switches back to abstract view `[CONFIRMED]`
    // Section: Paper Reader

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Back to abstract — click \"Abstract\" tab, switches back to abstract view `[CONFIRMED]`",
      section: "Paper Reader",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Back to abstract — click \"Abstract\" tab, switches back to abstract view `[CONFIRMED]`");
    }


    // This test validates: Back to abstract — click "Abstract" tab, switches back to abstract view `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Pending shows skeleton source with extraction_statepending shows loading skeleto', async ({ page }) => {
    // Checkpoint 6: Pending shows skeleton — source with extraction_state=pending shows loading skeleton `[CONFIRMED]`
    // Section: Extraction States

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Pending shows skeleton — source with extraction_state=pending shows loading skeleton `[CONFIRMED]`",
      section: "Extraction States",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Pending shows skeleton — source with extraction_state=pending shows loading skeleton `[CONFIRMED]`");
    }


    // This test validates: Pending shows skeleton — source with extraction_state=pending shows loading skeleton `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Ready shows content source with extraction_stateready shows extracted HTML CONFI', async ({ page }) => {
    // Checkpoint 7: Ready shows content — source with extraction_state=ready shows extracted HTML `[CONFIRMED]`
    // Section: Extraction States

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Ready shows content — source with extraction_state=ready shows extracted HTML `[CONFIRMED]`",
      section: "Extraction States",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Ready shows content — source with extraction_state=ready shows extracted HTML `[CONFIRMED]`");
    }


    // This test validates: Ready shows content — source with extraction_state=ready shows extracted HTML `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Partial shows warning source with extraction_statepartial shows content warning ', async ({ page }) => {
    // Checkpoint 8: Partial shows warning — source with extraction_state=partial shows content + warning banner `[CONFIRMED]`
    // Section: Extraction States

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Partial shows warning — source with extraction_state=partial shows content + warning banner `[CONFIRMED]`",
      section: "Extraction States",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Partial shows warning — source with extraction_state=partial shows content + warning banner `[CONFIRMED]`");
    }


    // This test validates: Partial shows warning — source with extraction_state=partial shows content + warning banner `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Failed shows retry source with extraction_statefailed shows Open original retry ', async ({ page }) => {
    // Checkpoint 9: Failed shows retry — source with extraction_state=failed shows "Open original" + retry button `[CONFIRMED]`
    // Section: Extraction States

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Failed shows retry — source with extraction_state=failed shows \"Open original\" + retry button `[CONFIRMED]`",
      section: "Extraction States",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Failed shows retry — source with extraction_state=failed shows \"Open original\" + retry button `[CONFIRMED]`");
    }


    // This test validates: Failed shows retry — source with extraction_state=failed shows "Open original" + retry button `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Retry extraction click retry on failed source extraction re-triggers CONFIRMED', async ({ page }) => {
    // Checkpoint 10: Retry extraction — click retry on failed source, extraction re-triggers `[CONFIRMED]`
    // Section: Extraction States

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Retry extraction — click retry on failed source, extraction re-triggers `[CONFIRMED]`",
      section: "Extraction States",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Retry extraction — click retry on failed source, extraction re-triggers `[CONFIRMED]`");
    }


    // This test validates: Retry extraction — click retry on failed source, extraction re-triggers `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Reading progress bar scroll through content progress bar at top updates proporti', async ({ page }) => {
    // Checkpoint 11: Reading progress bar — scroll through content, progress bar at top updates proportionally `[CONFIRMED]`
    // Section: Reader Controls

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Reading progress bar — scroll through content, progress bar at top updates proportionally `[CONFIRMED]`",
      section: "Reader Controls",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Reading progress bar — scroll through content, progress bar at top updates proportionally `[CONFIRMED]`");
    }


    // This test validates: Reading progress bar — scroll through content, progress bar at top updates proportionally `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Workbench panel toggle click Workbench button right panel openscloses CONFIRMED', async ({ page }) => {
    // Checkpoint 12: Workbench panel toggle — click "Workbench" button, right panel opens/closes `[CONFIRMED]`
    // Section: Reader Controls

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Workbench panel toggle — click \"Workbench\" button, right panel opens/closes `[CONFIRMED]`",
      section: "Reader Controls",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Workbench panel toggle — click \"Workbench\" button, right panel opens/closes `[CONFIRMED]`");
    }


    // This test validates: Workbench panel toggle — click "Workbench" button, right panel opens/closes `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Escape closes panel with panel open press Escape panel closes CONFIRMED', async ({ page }) => {
    // Checkpoint 13: Escape closes panel — with panel open, press Escape, panel closes `[CONFIRMED]`
    // Section: Reader Controls

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Escape closes panel — with panel open, press Escape, panel closes `[CONFIRMED]`",
      section: "Reader Controls",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "Escape closes panel — with panel open, press Escape, panel closes `[CONFIRMED]`");
    }


    // This test validates: Escape closes panel — with panel open, press Escape, panel closes `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Open original link click Open original original URL opens in new tab CONFIRMED', async ({ page }) => {
    // Checkpoint 14: Open original link — click "Open original", original URL opens in new tab `[CONFIRMED]`
    // Section: Reader Controls

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Open original link — click \"Open original\", original URL opens in new tab `[CONFIRMED]`",
      section: "Reader Controls",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "Open original link — click \"Open original\", original URL opens in new tab `[CONFIRMED]`");
    }


    // This test validates: Open original link — click "Open original", original URL opens in new tab `[CONFIRMED]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Send to editor click send-to-editor button creates editor handoff CONFIRMED', async ({ page }) => {
    // Checkpoint 15: Send to editor — click send-to-editor button, creates editor handoff `[CONFIRMED]`
    // Section: Reader Controls

    // Navigate to the page
    await page.goto('/library/item/web_1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-004');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Send to editor — click send-to-editor button, creates editor handoff `[CONFIRMED]`",
      section: "Reader Controls",
      subsection: "",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "Send to editor — click send-to-editor button, creates editor handoff `[CONFIRMED]`");
    }


    // This test validates: Send to editor — click send-to-editor button, creates editor handoff `[CONFIRMED]`
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
