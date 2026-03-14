/**
 * Auto-generated Playwright test for presentation/spec-002
 * Source: e2e/specs/presentation/spec-002.md
 * Generated: 2026-03-14T10:20:40.895Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts presentation spec-002
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';














import { assertPresentationCheckpoint } from '../../module-assertions/presentation';





test.describe('presentation / spec-002', () => {
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

  test('cp-000: 352 Document path numeric ID input with placeholder Enter document ID source-sel', async ({ page }) => {
    // Checkpoint 0: **3.52** Document path: numeric ID input with placeholder "Enter document ID" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.52** Document path: numeric ID input with placeholder \"Enter document ID\" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-000 ' + "**3.52** Document path: numeric ID input with placeholder \"Enter document ID\" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)");
    }


    // This test validates: **3.52** Document path: numeric ID input with placeholder "Enter document ID" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: 353 Document helper Enter the ID of a synthesis document to generate slides from', async ({ page }) => {
    // Checkpoint 1: **3.53** Document helper: "Enter the ID of a synthesis document to generate slides from" (`source-selector.tsx:173`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.53** Document helper: \"Enter the ID of a synthesis document to generate slides from\" (`source-selector.tsx:173`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-001 ' + "**3.53** Document helper: \"Enter the ID of a synthesis document to generate slides from\" (`source-selector.tsx:173`)");
    }


    // This test validates: **3.53** Document helper: "Enter the ID of a synthesis document to generate slides from" (`source-selector.tsx:173`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: 354 Text path textarea with placeholder Paste your research content abstract or ', async ({ page }) => {
    // Checkpoint 2: **3.54** Text path: textarea with placeholder "Paste your research content, abstract, or notes here..." and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.54** Text path: textarea with placeholder \"Paste your research content, abstract, or notes here...\" and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-002 ' + "**3.54** Text path: textarea with placeholder \"Paste your research content, abstract, or notes here...\" and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)");
    }


    // This test validates: **3.54** Text path: textarea with placeholder "Paste your research content, abstract, or notes here..." and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: 355 URL path UrlSourceInput component with per-URL rows source-selectortsx192-19', async ({ page }) => {
    // Checkpoint 3: **3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-003 ' + "**3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)");
    }


    // This test validates: **3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: 356 URL helper Paste a URL to any article blog post or documentation page source', async ({ page }) => {
    // Checkpoint 4: **3.56** URL helper: "Paste a URL to any article, blog post, or documentation page" (`source-selector.tsx:450`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.56** URL helper: \"Paste a URL to any article, blog post, or documentation page\" (`source-selector.tsx:450`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-004 ' + "**3.56** URL helper: \"Paste a URL to any article, blog post, or documentation page\" (`source-selector.tsx:450`)");
    }


    // This test validates: **3.56** URL helper: "Paste a URL to any article, blog post, or documentation page" (`source-selector.tsx:450`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: 357 URL input placeholder httpsexamplecomarticle source-selectortsx503', async ({ page }) => {
    // Checkpoint 5: **3.57** URL input placeholder: "https://example.com/article" (`source-selector.tsx:503`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.57** URL input placeholder: \"https://example.com/article\" (`source-selector.tsx:503`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-005 ' + "**3.57** URL input placeholder: \"https://example.com/article\" (`source-selector.tsx:503`)");
    }


    // This test validates: **3.57** URL input placeholder: "https://example.com/article" (`source-selector.tsx:503`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: 358 URL Add button disabled until valid URL source-selectortsx507-508 511 516', async ({ page }) => {
    // Checkpoint 6: **3.58** URL "Add" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.58** URL \"Add\" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-006 ' + "**3.58** URL \"Add\" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)");
    }


    // This test validates: **3.58** URL "Add" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: 359 Each URL row shows Globe icon and fetched titleword count source-selectortsx', async ({ page }) => {
    // Checkpoint 7: **3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-007 ' + "**3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)");
    }


    // This test validates: **3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: 360 URL fetch error shown inline per-source source-selectortsx470', async ({ page }) => {
    // Checkpoint 8: **3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-008 ' + "**3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)");
    }


    // This test validates: **3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: 361 Fetch Preview button per unfetched URL source-selectortsx473 478', async ({ page }) => {
    // Checkpoint 9: **3.61** "Fetch Preview" button per unfetched URL (`source-selector.tsx:473`, `:478`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.61** \"Fetch Preview\" button per unfetched URL (`source-selector.tsx:473`, `:478`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-009 ' + "**3.61** \"Fetch Preview\" button per unfetched URL (`source-selector.tsx:473`, `:478`)");
    }


    // This test validates: **3.61** "Fetch Preview" button per unfetched URL (`source-selector.tsx:473`, `:478`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: 362 Fetching state shows CircleNotch spinner source-selectortsx481', async ({ page }) => {
    // Checkpoint 10: **3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-010 ' + "**3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)");
    }


    // This test validates: **3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: 363 Remove URL button with Trash icon source-selectortsx483 486', async ({ page }) => {
    // Checkpoint 11: **3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-011 ' + "**3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)");
    }


    // This test validates: **3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: 364 Max 3 URLs input area replaced by Maximum of 3 URLs reached source-selectort', async ({ page }) => {
    // Checkpoint 12: **3.64** Max 3 URLs: input area replaced by "Maximum of 3 URLs reached" (`source-selector.tsx:492`, `:521`, `:522`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.64** Max 3 URLs: input area replaced by \"Maximum of 3 URLs reached\" (`source-selector.tsx:492`, `:521`, `:522`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-012 ' + "**3.64** Max 3 URLs: input area replaced by \"Maximum of 3 URLs reached\" (`source-selector.tsx:492`, `:521`, `:522`)");
    }


    // This test validates: **3.64** Max 3 URLs: input area replaced by "Maximum of 3 URLs reached" (`source-selector.tsx:492`, `:521`, `:522`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: 365 Import Deck path ImportDeckInput component with pptx file upload source-sele', async ({ page }) => {
    // Checkpoint 13: **3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-013 ' + "**3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)");
    }


    // This test validates: **3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: 366 Import upload button Choose pptx file Parsing presentation while loading sou', async ({ page }) => {
    // Checkpoint 14: **3.66** Import upload button: "Choose .pptx file" / "Parsing presentation..." while loading (`source-selector.tsx:311`, `:314-315`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.66** Import upload button: \"Choose .pptx file\" / \"Parsing presentation...\" while loading (`source-selector.tsx:311`, `:314-315`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-014 ' + "**3.66** Import upload button: \"Choose .pptx file\" / \"Parsing presentation...\" while loading (`source-selector.tsx:311`, `:314-315`)");
    }


    // This test validates: **3.66** Import upload button: "Choose .pptx file" / "Parsing presentation..." while loading (`source-selector.tsx:311`, `:314-315`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: 367 Import errors WarningCircle icon with error text source-selectortsx318 320', async ({ page }) => {
    // Checkpoint 15: **3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-015 ' + "**3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)");
    }


    // This test validates: **3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: 368 Password-protected PPTX error Password-protected files are not supported sou', async ({ page }) => {
    // Checkpoint 16: **3.68** Password-protected PPTX error: "Password-protected files are not supported" (`source-selector.tsx:264`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.68** Password-protected PPTX error: \"Password-protected files are not supported\" (`source-selector.tsx:264`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-016 ' + "**3.68** Password-protected PPTX error: \"Password-protected files are not supported\" (`source-selector.tsx:264`)");
    }


    // This test validates: **3.68** Password-protected PPTX error: "Password-protected files are not supported" (`source-selector.tsx:264`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: 369 Import preview shows deck title plus N slides from fileName with Clear butto', async ({ page }) => {
    // Checkpoint 17: **3.69** Import preview: shows deck title plus "N slides from {fileName}" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.69** Import preview: shows deck title plus \"N slides from {fileName}\" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-017 ' + "**3.69** Import preview: shows deck title plus \"N slides from {fileName}\" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)");
    }


    // This test validates: **3.69** Import preview: shows deck title plus "N slides from {fileName}" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: 370 Import slide preview up to 6 slides shown with Slide N label source-selector', async ({ page }) => {
    // Checkpoint 18: **3.70** Import slide preview: up to 6 slides shown with "Slide N" label (`source-selector.tsx:348`, `:351`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.70** Import slide preview: up to 6 slides shown with \"Slide N\" label (`source-selector.tsx:348`, `:351`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-018 ' + "**3.70** Import slide preview: up to 6 slides shown with \"Slide N\" label (`source-selector.tsx:348`, `:351`)");
    }


    // This test validates: **3.70** Import slide preview: up to 6 slides shown with "Slide N" label (`source-selector.tsx:348`, `:351`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: 371 Import preview text truncated per slide source-selectortsx356', async ({ page }) => {
    // Checkpoint 19: **3.71** Import preview text truncated per slide (`source-selector.tsx:356`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.71** Import preview text truncated per slide (`source-selector.tsx:356`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-019 ' + "**3.71** Import preview text truncated per slide (`source-selector.tsx:356`)");
    }


    // This test validates: **3.71** Import preview text truncated per slide (`source-selector.tsx:356`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: 372 Showing 6 of N imported slide previews when 6 slides source-selectortsx363 3', async ({ page }) => {
    // Checkpoint 20: **3.72** "Showing 6 of N imported slide previews." when > 6 slides (`source-selector.tsx:363`, `:365`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.72** \"Showing 6 of N imported slide previews.\" when > 6 slides (`source-selector.tsx:363`, `:365`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-020 ' + "**3.72** \"Showing 6 of N imported slide previews.\" when > 6 slides (`source-selector.tsx:363`, `:365`)");
    }


    // This test validates: **3.72** "Showing 6 of N imported slide previews." when > 6 slides (`source-selector.tsx:363`, `:365`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: 373 Import warnings rendered when present source-selectortsx369', async ({ page }) => {
    // Checkpoint 21: **3.73** Import warnings rendered when present (`source-selector.tsx:369`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.73** Import warnings rendered when present (`source-selector.tsx:369`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-021 ' + "**3.73** Import warnings rendered when present (`source-selector.tsx:369`)");
    }


    // This test validates: **3.73** Import warnings rendered when present (`source-selector.tsx:369`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: 374 References path shows selected count and Clear re-import button source-selec', async ({ page }) => {
    // Checkpoint 22: **3.74** References path: shows selected count and "Clear & re-import" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.74** References path: shows selected count and \"Clear & re-import\" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-022 ' + "**3.74** References path: shows selected count and \"Clear & re-import\" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)");
    }


    // This test validates: **3.74** References path: shows selected count and "Clear & re-import" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: 375 References selected summary renders per-reference with BookBookmark icon sou', async ({ page }) => {
    // Checkpoint 23: **3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-023 ' + "**3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)");
    }


    // This test validates: **3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: 376 References fallback opens ReferenceImportPanel when none selected source-sel', async ({ page }) => {
    // Checkpoint 24: **3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-024 ' + "**3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)");
    }


    // This test validates: **3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: 377 API POST apislidesfetch-url for URL preview source-selectortsx406', async ({ page }) => {
    // Checkpoint 25: **3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 0 -- Select Source

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 0 -- Select Source",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-025 ' + "**3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)");
    }


    // This test validates: **3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: 311 Step 1 header displays Template Audience', async ({ page }) => {
    // Checkpoint 26: **3.11** Step 1 header displays "Template & Audience"
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 1 -- Template & Audience

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.11** Step 1 header displays \"Template & Audience\"",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 1 -- Template & Audience",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-026 ' + "**3.11** Step 1 header displays \"Template & Audience\"");
    }


    // This test validates: **3.11** Step 1 header displays "Template & Audience"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: 312 TemplateSelector component renders', async ({ page }) => {
    // Checkpoint 27: **3.12** TemplateSelector component renders
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 1 -- Template & Audience

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.12** TemplateSelector component renders",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 1 -- Template & Audience",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-027 ' + "**3.12** TemplateSelector component renders");
    }


    // This test validates: **3.12** TemplateSelector component renders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: 323 Selecting audience and template advances to Step 2', async ({ page }) => {
    // Checkpoint 28: **3.23** Selecting audience and template advances to Step 2
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 1 -- Template & Audience

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.23** Selecting audience and template advances to Step 2",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 1 -- Template & Audience",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-028 ' + "**3.23** Selecting audience and template advances to Step 2");
    }


    // This test validates: **3.23** Selecting audience and template advances to Step 2
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: 324 Step 2 header displays Configure', async ({ page }) => {
    // Checkpoint 29: **3.24** Step 2 header displays "Configure"
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.24** Step 2 header displays \"Configure\"",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-029 ' + "**3.24** Step 2 header displays \"Configure\"");
    }


    // This test validates: **3.24** Step 2 header displays "Configure"
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: 325 Title field is editable', async ({ page }) => {
    // Checkpoint 30: **3.25** Title field is editable
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.25** Title field is editable",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-030 ' + "**3.25** Title field is editable");
    }


    // This test validates: **3.25** Title field is editable
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: 326 Slide count field defaults to 12', async ({ page }) => {
    // Checkpoint 31: **3.26** Slide count field defaults to 12
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.26** Slide count field defaults to 12",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-031 ' + "**3.26** Slide count field defaults to 12");
    }


    // This test validates: **3.26** Slide count field defaults to 12
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: 327 Theme key selector is functional', async ({ page }) => {
    // Checkpoint 32: **3.27** Theme key selector is functional
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.27** Theme key selector is functional",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-032 ' + "**3.27** Theme key selector is functional");
    }


    // This test validates: **3.27** Theme key selector is functional
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: 328 Instructions textarea is available', async ({ page }) => {
    // Checkpoint 33: **3.28** Instructions textarea is available
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.28** Instructions textarea is available",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-033 ' + "**3.28** Instructions textarea is available");
    }


    // This test validates: **3.28** Instructions textarea is available
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: 329 Citation style APA', async ({ page }) => {
    // Checkpoint 34: **3.29** Citation style: APA
    // Section: New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`) > Step 2 -- Configure

    // Navigate to the page
    await page.goto('/presentation', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/presentation/spec-002');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertPresentationCheckpoint({
      page,
      description: "**3.29** Citation style: APA",
      section: "New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)",
      subsection: "Step 2 -- Configure",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled presentation checkpoint: cp-034 ' + "**3.29** Citation style: APA");
    }


    // This test validates: **3.29** Citation style: APA
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
