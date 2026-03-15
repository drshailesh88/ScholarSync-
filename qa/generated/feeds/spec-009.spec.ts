/**
 * Auto-generated Playwright test for feeds/spec-009
 * Source: e2e/specs/feeds/spec-009.md
 * Generated: 2026-03-14T18:57:47.061Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts feeds spec-009
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';












import { assertFeedsCheckpoint } from '../../module-assertions/feeds';







test.describe('feeds / spec-009', () => {
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

  test('cp-000: Article Notes local textarea state resets when store notes for that article chan', async ({ page }) => {
    // Checkpoint 0: Article Notes local textarea state resets when store notes for that article change
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Article Notes local textarea state resets when store notes for that article change",
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
      throw new Error('Unhandled feeds checkpoint: cp-000 Article Notes local textarea state resets when store notes for that article change');
    }


    // This test validates: Article Notes local textarea state resets when store notes for that article change
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Article Notes auto-save waits 1 second after the last keystroke before persistin', async ({ page }) => {
    // Checkpoint 1: Article Notes auto-save waits 1 second after the last keystroke before persisting
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Article Notes auto-save waits 1 second after the last keystroke before persisting",
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
      throw new Error('Unhandled feeds checkpoint: cp-001 Article Notes auto-save waits 1 second after the last keystroke before persisting');
    }


    // This test validates: Article Notes auto-save waits 1 second after the last keystroke before persisting
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Blurring the notes field flushes any pending unsaved local changes immediately', async ({ page }) => {
    // Checkpoint 2: Blurring the notes field flushes any pending unsaved local changes immediately
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Blurring the notes field flushes any pending unsaved local changes immediately",
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
      throw new Error('Unhandled feeds checkpoint: cp-002 Blurring the notes field flushes any pending unsaved local changes immediately');
    }


    // This test validates: Blurring the notes field flushes any pending unsaved local changes immediately
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Note saves optimistically update the store before the PUT request resolves', async ({ page }) => {
    // Checkpoint 3: Note saves optimistically update the store before the PUT request resolves
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Note saves optimistically update the store before the PUT request resolves",
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
      throw new Error('Unhandled feeds checkpoint: cp-003 Note saves optimistically update the store before the PUT request resolves');
    }


    // This test validates: Note saves optimistically update the store before the PUT request resolves
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Empty notes are stored as null to the API and removed from the local articleNote', async ({ page }) => {
    // Checkpoint 4: Empty notes are stored as `null` to the API and removed from the local `articleNotes` map
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Empty notes are stored as `null` to the API and removed from the local `articleNotes` map",
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
      throw new Error('Unhandled feeds checkpoint: cp-004 Empty notes are stored as `null` to the API and removed from the local `articleNotes` map');
    }


    // This test validates: Empty notes are stored as `null` to the API and removed from the local `articleNotes` map
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Notes save failures are silent and rely on a future article reopen to refresh se', async ({ page }) => {
    // Checkpoint 5: Notes save failures are silent and rely on a future article reopen to refresh server state
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Notes save failures are silent and rely on a future article reopen to refresh server state",
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
      throw new Error('Unhandled feeds checkpoint: cp-005 Notes save failures are silent and rely on a future article reopen to refresh server state');
    }


    // This test validates: Notes save failures are silent and rely on a future article reopen to refresh server state
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Saved notes indicator is purely local UI state and appears for 2 seconds after e', async ({ page }) => {
    // Checkpoint 6: `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call",
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
      throw new Error('Unhandled feeds checkpoint: cp-006 `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call');
    }


    // This test validates: `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Add Feed modal defaults to the Add URL tab each time the component mounts fresh', async ({ page }) => {
    // Checkpoint 7: Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh",
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
      throw new Error('Unhandled feeds checkpoint: cp-007 Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh');
    }


    // This test validates: Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Add Feed modal Add button is disabled until feedUrltrim is non-empty', async ({ page }) => {
    // Checkpoint 8: Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty",
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
      throw new Error('Unhandled feeds checkpoint: cp-008 Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty');
    }


    // This test validates: Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Add Feed modal Create Feed button is disabled until pubmedQuerytrim is non-empty', async ({ page }) => {
    // Checkpoint 9: Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty",
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
      throw new Error('Unhandled feeds checkpoint: cp-009 Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty');
    }


    // This test validates: Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Pressing Enter in the RSS URL input triggers handleAddUrl', async ({ page }) => {
    // Checkpoint 10: Pressing Enter in the RSS URL input triggers `handleAddUrl()`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Pressing Enter in the RSS URL input triggers `handleAddUrl()`",
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
      throw new Error('Unhandled feeds checkpoint: cp-010 Pressing Enter in the RSS URL input triggers `handleAddUrl()`');
    }


    // This test validates: Pressing Enter in the RSS URL input triggers `handleAddUrl()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Pressing Enter in the PubMed query input triggers handlePubMed', async ({ page }) => {
    // Checkpoint 11: Pressing Enter in the PubMed query input triggers `handlePubMed()`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Pressing Enter in the PubMed query input triggers `handlePubMed()`",
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
      throw new Error('Unhandled feeds checkpoint: cp-011 Pressing Enter in the PubMed query input triggers `handlePubMed()`');
    }


    // This test validates: Pressing Enter in the PubMed query input triggers `handlePubMed()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Successful Add URL and PubMed-subscription actions clear only the submitted fiel', async ({ page }) => {
    // Checkpoint 12: Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal",
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
      throw new Error('Unhandled feeds checkpoint: cp-012 Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal');
    }


    // This test validates: Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Add Feed modal error state is rendered as red helper text inside the modal not a', async ({ page }) => {
    // Checkpoint 13: Add Feed modal error state is rendered as red helper text inside the modal, not a global banner
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Add Feed modal error state is rendered as red helper text inside the modal, not a global banner",
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
      throw new Error('Unhandled feeds checkpoint: cp-013 Add Feed modal error state is rendered as red helper text inside the modal, not a global banner');
    }


    // This test validates: Add Feed modal error state is rendered as red helper text inside the modal, not a global banner
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Copilot panel only renders when copilotOpen is true and a selected article still', async ({ page }) => {
    // Checkpoint 14: Copilot panel only renders when `copilotOpen` is true and a selected article still exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot panel only renders when `copilotOpen` is true and a selected article still exists",
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
      throw new Error('Unhandled feeds checkpoint: cp-014 Copilot panel only renders when `copilotOpen` is true and a selected article still exists');
    }


    // This test validates: Copilot panel only renders when `copilotOpen` is true and a selected article still exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Copilot panel close button hides the panel but does not deselect the article', async ({ page }) => {
    // Checkpoint 15: Copilot panel close button hides the panel but does not deselect the article
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot panel close button hides the panel but does not deselect the article",
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
      throw new Error('Unhandled feeds checkpoint: cp-015 Copilot panel close button hides the panel but does not deselect the article');
    }


    // This test validates: Copilot panel close button hides the panel but does not deselect the article
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Copilot empty state shows Ask me about this paper plus helper copy before any me', async ({ page }) => {
    // Checkpoint 16: Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist",
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
      throw new Error('Unhandled feeds checkpoint: cp-016 Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist');
    }


    // This test validates: Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Copilot source badge appears only after summarizechat populates copilotSourceTie', async ({ page }) => {
    // Checkpoint 17: Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`",
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
      throw new Error('Unhandled feeds checkpoint: cp-017 Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`');
    }


    // This test validates: Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Summarize checks copilotSummaryCache first and reuses cached summary text withou', async ({ page }) => {
    // Checkpoint 18: `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API",
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
      throw new Error('Unhandled feeds checkpoint: cp-018 `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API');
    }


    // This test validates: `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Fresh summarize requests POST to apifeedscopilotsummarize', async ({ page }) => {
    // Checkpoint 19: Fresh summarize requests POST to `/api/feeds/copilot/summarize`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Fresh summarize requests POST to `/api/feeds/copilot/summarize`",
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
      throw new Error('Unhandled feeds checkpoint: cp-019 Fresh summarize requests POST to `/api/feeds/copilot/summarize`');
    }


    // This test validates: Fresh summarize requests POST to `/api/feeds/copilot/summarize`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Successful summarize stores source tier source label suggestions assistant summa', async ({ page }) => {
    // Checkpoint 20: Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry",
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
      throw new Error('Unhandled feeds checkpoint: cp-020 Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry');
    }


    // This test validates: Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Suggested follow-up questions are automatically augmented to include Find relate', async ({ page }) => {
    // Checkpoint 21: Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists",
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
      throw new Error('Unhandled feeds checkpoint: cp-021 Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists');
    }


    // This test validates: Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Sending a question matching the related-papers intent triggers the related-paper', async ({ page }) => {
    // Checkpoint 22: Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming",
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
      throw new Error('Unhandled feeds checkpoint: cp-022 Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming');
    }


    // This test validates: Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Related-papers-intent matches set both copilotLoading and relatedPapersLoading t', async ({ page }) => {
    // Checkpoint 23: Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true",
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
      throw new Error('Unhandled feeds checkpoint: cp-023 Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true');
    }


    // This test validates: Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Successful related-paper intent handling appends an assistant summary message wi', async ({ page }) => {
    // Checkpoint 24: Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely",
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
      throw new Error('Unhandled feeds checkpoint: cp-024 Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely');
    }


    // This test validates: Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Standard copilot chat posts to apifeedscopilotchat with article metadata prior u', async ({ page }) => {
    // Checkpoint 25: Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`",
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
      throw new Error('Unhandled feeds checkpoint: cp-025 Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`');
    }


    // This test validates: Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Copilot chat appends an empty assistant message first and streams text chunks in', async ({ page }) => {
    // Checkpoint 26: Copilot chat appends an empty assistant message first and streams text chunks into it
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot chat appends an empty assistant message first and streams text chunks into it",
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
      throw new Error('Unhandled feeds checkpoint: cp-026 Copilot chat appends an empty assistant message first and streams text chunks into it');
    }


    // This test validates: Copilot chat appends an empty assistant message first and streams text chunks into it
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Copilot loading indicator uses the same three bouncing dots pattern as the main ', async ({ page }) => {
    // Checkpoint 27: Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat",
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
      throw new Error('Unhandled feeds checkpoint: cp-027 Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat');
    }


    // This test validates: Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Copilot input placeholder reads Ask about this paper', async ({ page }) => {
    // Checkpoint 28: Copilot input placeholder reads `Ask about this paper...`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot input placeholder reads `Ask about this paper...`",
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
      throw new Error('Unhandled feeds checkpoint: cp-028 Copilot input placeholder reads `Ask about this paper...`');
    }


    // This test validates: Copilot input placeholder reads `Ask about this paper...`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Copilot input and send button are disabled while copilotLoading is true', async ({ page }) => {
    // Checkpoint 29: Copilot input and send button are disabled while `copilotLoading` is true
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot input and send button are disabled while `copilotLoading` is true",
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
      throw new Error('Unhandled feeds checkpoint: cp-029 Copilot input and send button are disabled while `copilotLoading` is true');
    }


    // This test validates: Copilot input and send button are disabled while `copilotLoading` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Changing the selected article clears copilot messages suggestions source badge a', async ({ page }) => {
    // Checkpoint 30: Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`",
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
      throw new Error('Unhandled feeds checkpoint: cp-030 Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`');
    }


    // This test validates: Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: findRelatedPapers resets prior related papers before fetching a fresh related-pa', async ({ page }) => {
    // Checkpoint 31: `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result",
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
      throw new Error('Unhandled feeds checkpoint: cp-031 `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result');
    }


    // This test validates: `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Failed related-paper lookups clear loading state but do not surface a user-facin', async ({ page }) => {
    // Checkpoint 32: Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel",
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
      throw new Error('Unhandled feeds checkpoint: cp-032 Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel');
    }


    // This test validates: Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Route-level loadingtsx renders header skeletons a sidebar skeleton and 6 article', async ({ page }) => {
    // Checkpoint 33: Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons",
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
      throw new Error('Unhandled feeds checkpoint: cp-033 Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons');
    }


    // This test validates: Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Route-level error boundary title reads Journal Feed unavailable', async ({ page }) => {
    // Checkpoint 34: Route-level error boundary title reads `Journal Feed unavailable`
    // Section: Quick Test Workflows > Detailed QA Coverage

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-009');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Route-level error boundary title reads `Journal Feed unavailable`",
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
      throw new Error('Unhandled feeds checkpoint: cp-034 Route-level error boundary title reads `Journal Feed unavailable`');
    }


    // This test validates: Route-level error boundary title reads `Journal Feed unavailable`
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
