/**
 * Auto-generated Playwright test for library/spec-006
 * Source: e2e/specs/library/spec-006.md
 * Generated: 2026-03-15T15:52:41.983Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-006
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-006', () => {
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

  test('cp-000: Selecting a server-side filter does not clear the current collection or favorite', async ({ page }) => {
    // Checkpoint 0: Selecting a server-side filter does not clear the current collection or favorites selection
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Selecting a server-side filter does not clear the current collection or favorites selection",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "Selecting a server-side filter does not clear the current collection or favorites selection");
    }


    // This test validates: Selecting a server-side filter does not clear the current collection or favorites selection
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Results area loading state currently shows text Loading papers without a spinner', async ({ page }) => {
    // Checkpoint 1: Results area loading state currently shows text `Loading papers...` without a spinner icon
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Results area loading state currently shows text `Loading papers...` without a spinner icon",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "Results area loading state currently shows text `Loading papers...` without a spinner icon");
    }


    // This test validates: Results area loading state currently shows text `Loading papers...` without a spinner icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: If the paper query resolves to an empty result while search or filters are activ', async ({ page }) => {
    // Checkpoint 2: If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`");
    }


    // This test validates: If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: If the user has no library papers and no active searchfilter state the empty-sta', async ({ page }) => {
    // Checkpoint 3: If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`");
    }


    // This test validates: If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Empty states render a BookOpen icon above the message text', async ({ page }) => {
    // Checkpoint 4: Empty states render a `BookOpen` icon above the message text
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Empty states render a `BookOpen` icon above the message text",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "Empty states render a `BookOpen` icon above the message text");
    }


    // This test validates: Empty states render a `BookOpen` icon above the message text
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Each paper card key is paperrefId not paperid', async ({ page }) => {
    // Checkpoint 5: Each paper card key is `paper.refId`, not `paper.id`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Each paper card key is `paper.refId`, not `paper.id`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "Each paper card key is `paper.refId`, not `paper.id`");
    }


    // This test validates: Each paper card key is `paper.refId`, not `paper.id`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Paper cards render a PDF icon only when papersource user_upload all other source', async ({ page }) => {
    // Checkpoint 6: Paper cards render a PDF icon only when `paper.source === "user_upload"`; all other sources show the globe icon
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper cards render a PDF icon only when `paper.source === \"user_upload\"`; all other sources show the globe icon",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "Paper cards render a PDF icon only when `paper.source === \"user_upload\"`; all other sources show the globe icon");
    }


    // This test validates: Paper cards render a PDF icon only when `paper.source === "user_upload"`; all other sources show the globe icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Paper title renders as plain text not as a link to a detail page', async ({ page }) => {
    // Checkpoint 7: Paper title renders as plain text, not as a link to a detail page
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Paper title renders as plain text, not as a link to a detail page",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "Paper title renders as plain text, not as a link to a detail page");
    }


    // This test validates: Paper title renders as plain text, not as a link to a detail page
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Authors line joins the authors array with separators', async ({ page }) => {
    // Checkpoint 8: Authors line joins the authors array with `, ` separators
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Authors line joins the authors array with `, ` separators",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Authors line joins the authors array with `, ` separators");
    }


    // This test validates: Authors line joins the authors array with `, ` separators
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: If authors is not an array the authors row renders as an empty string instead of', async ({ page }) => {
    // Checkpoint 9: If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON");
    }


    // This test validates: If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Missing journal renders fallback text Unknown journal', async ({ page }) => {
    // Checkpoint 10: Missing `journal` renders fallback text `Unknown journal`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Missing `journal` renders fallback text `Unknown journal`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Missing `journal` renders fallback text `Unknown journal`");
    }


    // This test validates: Missing `journal` renders fallback text `Unknown journal`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Missing year renders fallback text nd', async ({ page }) => {
    // Checkpoint 11: Missing `year` renders fallback text `n.d.`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Missing `year` renders fallback text `n.d.`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Missing `year` renders fallback text `n.d.`");
    }


    // This test validates: Missing `year` renders fallback text `n.d.`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Citation-count suffix is shown only when citation_count 0', async ({ page }) => {
    // Checkpoint 12: Citation-count suffix is shown only when `citation_count > 0`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation-count suffix is shown only when `citation_count > 0`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Citation-count suffix is shown only when `citation_count > 0`");
    }


    // This test validates: Citation-count suffix is shown only when `citation_count > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Study-type suffix is shown only when paperstudy_type is truthy', async ({ page }) => {
    // Checkpoint 13: Study-type suffix is shown only when `paper.study_type` is truthy
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Study-type suffix is shown only when `paper.study_type` is truthy",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "Study-type suffix is shown only when `paper.study_type` is truthy");
    }


    // This test validates: Study-type suffix is shown only when `paper.study_type` is truthy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Action button row is visually indented under the metadata block with ml-14', async ({ page }) => {
    // Checkpoint 14: Action button row is visually indented under the metadata block with `ml-14`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Action button row is visually indented under the metadata block with `ml-14`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "Action button row is visually indented under the metadata block with `ml-14`");
    }


    // This test validates: Action button row is visually indented under the metadata block with `ml-14`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Cite button is rendered for every paper row', async ({ page }) => {
    // Checkpoint 15: `Cite` button is rendered for every paper row
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`Cite` button is rendered for every paper row",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "`Cite` button is rendered for every paper row");
    }


    // This test validates: `Cite` button is rendered for every paper row
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Cite in Editor button is rendered for every paper row', async ({ page }) => {
    // Checkpoint 16: `Cite in Editor` button is rendered for every paper row
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`Cite in Editor` button is rendered for every paper row",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "`Cite in Editor` button is rendered for every paper row");
    }


    // This test validates: `Cite in Editor` button is rendered for every paper row
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: View PDF button renders only when the paper is a user upload or has pdf_storage_', async ({ page }) => {
    // Checkpoint 17: `View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "`View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`");
    }


    // This test validates: `View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: DOI button renders only when paperdoi is truthy', async ({ page }) => {
    // Checkpoint 18: `DOI` button renders only when `paper.doi` is truthy
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`DOI` button renders only when `paper.doi` is truthy",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "`DOI` button renders only when `paper.doi` is truthy");
    }


    // This test validates: `DOI` button renders only when `paper.doi` is truthy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: DOI button targets httpsdoiorgdoi in a new tab with relnoopener noreferrer', async ({ page }) => {
    // Checkpoint 19: `DOI` button targets `https://doi.org/{doi}` in a new tab with `rel="noopener noreferrer"`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`DOI` button targets `https://doi.org/{doi}` in a new tab with `rel=\"noopener noreferrer\"`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "`DOI` button targets `https://doi.org/{doi}` in a new tab with `rel=\"noopener noreferrer\"`");
    }


    // This test validates: `DOI` button targets `https://doi.org/{doi}` in a new tab with `rel="noopener noreferrer"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Favorite button uses a filled star only when paperisFavorite is truthy', async ({ page }) => {
    // Checkpoint 20: Favorite button uses a filled star only when `paper.isFavorite` is truthy
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Favorite button uses a filled star only when `paper.isFavorite` is truthy",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "Favorite button uses a filled star only when `paper.isFavorite` is truthy");
    }


    // This test validates: Favorite button uses a filled star only when `paper.isFavorite` is truthy
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Delete button is always present and does not open a confirmation dialog before r', async ({ page }) => {
    // Checkpoint 21: Delete button is always present and does not open a confirmation dialog before removal
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete button is always present and does not open a confirmation dialog before removal",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "Delete button is always present and does not open a confirmation dialog before removal");
    }


    // This test validates: Delete button is always present and does not open a confirmation dialog before removal
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Clicking the favorite button updates the star state optimistically before toggle', async ({ page }) => {
    // Checkpoint 22: Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-022 ' + "Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves");
    }


    // This test validates: Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: If toggleFavorite throws the same row is flipped back to its prior favorite stat', async ({ page }) => {
    // Checkpoint 23: If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-023 ' + "If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state");
    }


    // This test validates: If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Favorite failures are logged to the console and do not show a toast inline error', async ({ page }) => {
    // Checkpoint 24: Favorite failures are logged to the console and do not show a toast, inline error, or retry UI
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Favorite failures are logged to the console and do not show a toast, inline error, or retry UI",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-024 ' + "Favorite failures are logged to the console and do not show a toast, inline error, or retry UI");
    }


    // This test validates: Favorite failures are logged to the console and do not show a toast, inline error, or retry UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Favorites count in the sidebar updates immediately because it is derived from th', async ({ page }) => {
    // Checkpoint 25: Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-025 ' + "Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state");
    }


    // This test validates: Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Clicking delete removes the row optimistically before removePaper resolves', async ({ page }) => {
    // Checkpoint 26: Clicking delete removes the row optimistically before `removePaper(...)` resolves
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clicking delete removes the row optimistically before `removePaper(...)` resolves",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-026 ' + "Clicking delete removes the row optimistically before `removePaper(...)` resolves");
    }


    // This test validates: Clicking delete removes the row optimistically before `removePaper(...)` resolves
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: If delete fails the page restores the previous full papers array', async ({ page }) => {
    // Checkpoint 27: If delete fails, the page restores the previous full `papers` array
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If delete fails, the page restores the previous full `papers` array",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-027 ' + "If delete fails, the page restores the previous full `papers` array");
    }


    // This test validates: If delete fails, the page restores the previous full `papers` array
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Successful delete triggers refreshMetadata so projectsstudy-typesyear-range can ', async ({ page }) => {
    // Checkpoint 28: Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-028 ' + "Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal");
    }


    // This test validates: Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Delete failures are logged to the console and do not show a toast inline error o', async ({ page }) => {
    // Checkpoint 29: Delete failures are logged to the console and do not show a toast, inline error, or retry UI
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Delete failures are logged to the console and do not show a toast, inline error, or retry UI",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-029 ' + "Delete failures are logged to the console and do not show a toast, inline error, or retry UI");
    }


    // This test validates: Delete failures are logged to the console and do not show a toast, inline error, or retry UI
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Clicking Cite opens the modal and immediately resets the active citation tab to ', async ({ page }) => {
    // Checkpoint 30: Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-030 ' + "Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`");
    }


    // This test validates: Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Opening the citation modal clears any previous citationFormats value before the ', async ({ page }) => {
    // Checkpoint 31: Opening the citation modal clears any previous `citationFormats` value before the new request resolves
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Opening the citation modal clears any previous `citationFormats` value before the new request resolves",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-031 ' + "Opening the citation modal clears any previous `citationFormats` value before the new request resolves");
    }


    // This test validates: Opening the citation modal clears any previous `citationFormats` value before the new request resolves
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Citation modal title reads Cite Source', async ({ page }) => {
    // Checkpoint 32: Citation modal title reads `Cite Source`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation modal title reads `Cite Source`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-032 ' + "Citation modal title reads `Cite Source`");
    }


    // This test validates: Citation modal title reads `Cite Source`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Citation tabs render exactly APA 7 MLA 9 Chicago Vancouver Harvard and BibTeX', async ({ page }) => {
    // Checkpoint 33: Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-033 ' + "Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`");
    }


    // This test validates: Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Citation content panel keeps a minimum height of 80px across loading and loaded ', async ({ page }) => {
    // Checkpoint 34: Citation content panel keeps a minimum height of `80px` across loading and loaded states
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-006');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation content panel keeps a minimum height of `80px` across loading and loaded states",
      section: "Quick Test Workflows",
      subsection: "Detailed QA Coverage",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-034 ' + "Citation content panel keeps a minimum height of `80px` across loading and loaded states");
    }


    // This test validates: Citation content panel keeps a minimum height of `80px` across loading and loaded states
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
