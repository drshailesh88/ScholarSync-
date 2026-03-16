/**
 * Auto-generated Playwright test for research/spec-017
 * Source: e2e/specs/research/spec-017.md
 * Generated: 2026-03-15T17:36:06.056Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts research spec-017
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';






import { assertResearchCheckpoint } from '../../module-assertions/research';













test.describe('research / spec-017', () => {
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

  test('cp-000: Inactive filter chip styling bg-surface-raised text-ink-muted border-border hove', async ({ page }) => {
    // Checkpoint 0: Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-000 ' + "Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`");
    }


    // This test validates: Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Sort dropdown overlay uses z-20 z-index', async ({ page }) => {
    // Checkpoint 1: Sort dropdown overlay uses `z-20` z-index
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort dropdown overlay uses `z-20` z-index",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-001 ' + "Sort dropdown overlay uses `z-20` z-index");
    }


    // This test validates: Sort dropdown overlay uses `z-20` z-index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Copilot floating toggle button uses z-40 z-index', async ({ page }) => {
    // Checkpoint 2: Copilot floating toggle button uses `z-40` z-index
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot floating toggle button uses `z-40` z-index",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-002 ' + "Copilot floating toggle button uses `z-40` z-index");
    }


    // This test validates: Copilot floating toggle button uses `z-40` z-index
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Pagination total-pages display clamps the rendered denominator with Mathmaxtotal', async ({ page }) => {
    // Checkpoint 3: Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-003 ' + "Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible");
    }


    // This test validates: Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Sort dropdown menu has min-w-140px minimum width', async ({ page }) => {
    // Checkpoint 4: Sort dropdown menu has `min-w-[140px]` minimum width
    // Section: Quick Test Workflows > Page Layout & CSS Behavior

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort dropdown menu has `min-w-[140px]` minimum width",
      section: "Quick Test Workflows",
      subsection: "Page Layout & CSS Behavior",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-004 ' + "Sort dropdown menu has `min-w-[140px]` minimum width");
    }


    // This test validates: Sort dropdown menu has `min-w-[140px]` minimum width
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Search input has no aria-label or accessible name attribute', async ({ page }) => {
    // Checkpoint 5: Search input has no `aria-label` or accessible name attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Search input has no `aria-label` or accessible name attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-005 ' + "Search input has no `aria-label` or accessible name attribute");
    }


    // This test validates: Search input has no `aria-label` or accessible name attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: Filter chip buttons have no aria-pressed attribute to indicate toggle state to a', async ({ page }) => {
    // Checkpoint 6: Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-006 ' + "Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology");
    }


    // This test validates: Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: Sort dropdown trigger has no aria-expanded or aria-haspopup attribute', async ({ page }) => {
    // Checkpoint 7: Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-007 ' + "Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute");
    }


    // This test validates: Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Sort dropdown menu has no rolelistbox or rolemenu attribute', async ({ page }) => {
    // Checkpoint 8: Sort dropdown menu has no `role="listbox"` or `role="menu"` attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort dropdown menu has no `role=\"listbox\"` or `role=\"menu\"` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-008 ' + "Sort dropdown menu has no `role=\"listbox\"` or `role=\"menu\"` attribute");
    }


    // This test validates: Sort dropdown menu has no `role="listbox"` or `role="menu"` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Sort dropdown items have no roleoption or rolemenuitem attributes', async ({ page }) => {
    // Checkpoint 9: Sort dropdown items have no `role="option"` or `role="menuitem"` attributes
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Sort dropdown items have no `role=\"option\"` or `role=\"menuitem\"` attributes",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-009 ' + "Sort dropdown items have no `role=\"option\"` or `role=\"menuitem\"` attributes");
    }


    // This test validates: Sort dropdown items have no `role="option"` or `role="menuitem"` attributes
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Copilot close button has no aria-label attribute', async ({ page }) => {
    // Checkpoint 10: Copilot close button has no `aria-label` attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot close button has no `aria-label` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-010 ' + "Copilot close button has no `aria-label` attribute");
    }


    // This test validates: Copilot close button has no `aria-label` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Copilot chat input has no aria-label attribute', async ({ page }) => {
    // Checkpoint 11: Copilot chat input has no `aria-label` attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot chat input has no `aria-label` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-011 ' + "Copilot chat input has no `aria-label` attribute");
    }


    // This test validates: Copilot chat input has no `aria-label` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Copilot send button has no aria-label attribute', async ({ page }) => {
    // Checkpoint 12: Copilot send button has no `aria-label` attribute
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Copilot send button has no `aria-label` attribute",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-012 ' + "Copilot send button has no `aria-label` attribute");
    }


    // This test validates: Copilot send button has no `aria-label` attribute
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: No aria-live region exists for search result count updates or loadingerror state', async ({ page }) => {
    // Checkpoint 13: No `aria-live` region exists for search result count updates or loading/error state transitions
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "No `aria-live` region exists for search result count updates or loading/error state transitions",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-013 ' + "No `aria-live` region exists for search result count updates or loading/error state transitions");
    }


    // This test validates: No `aria-live` region exists for search result count updates or loading/error state transitions
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Pagination PreviousNext buttons have no aria-label attributes eg Go to previous ', async ({ page }) => {
    // Checkpoint 14: Pagination Previous/Next buttons have no `aria-label` attributes (e.g., "Go to previous page")
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Pagination Previous/Next buttons have no `aria-label` attributes (e.g., \"Go to previous page\")",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-014 ' + "Pagination Previous/Next buttons have no `aria-label` attributes (e.g., \"Go to previous page\")");
    }


    // This test validates: Pagination Previous/Next buttons have no `aria-label` attributes (e.g., "Go to previous page")
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Evidence level badges have no title or aria-label explaining the evidence level ', async ({ page }) => {
    // Checkpoint 15: Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning
    // Section: Quick Test Workflows > Accessibility Gaps (Missing Attributes)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning",
      section: "Quick Test Workflows",
      subsection: "Accessibility Gaps (Missing Attributes)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-015 ' + "Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning");
    }


    // This test validates: Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Route-level loadingtsx renders ResearchLoading one Skeleton title bar h-8 w-48 o', async ({ page }) => {
    // Checkpoint 16: Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders
    // Section: Quick Test Workflows > Route-Level Loading & Error Verified

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading & Error Verified",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-016 ' + "Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders");
    }


    // This test validates: Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Route-level errortsx renders ErrorDisplay component with onRetryreset prop provi', async ({ page }) => {
    // Checkpoint 17: Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button
    // Section: Quick Test Workflows > Route-Level Loading & Error Verified

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button",
      section: "Quick Test Workflows",
      subsection: "Route-Level Loading & Error Verified",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-017 ' + "Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button");
    }


    // This test validates: Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Section 21 line 397 claims Scroll position restored from searchScrollPosition WR', async ({ page }) => {
    // Checkpoint 18: Section 21 line 397 claims "Scroll position — restored from `searchScrollPosition`" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 21 line 397 claims \"Scroll position — restored from `searchScrollPosition`\" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-018 ' + "Section 21 line 397 claims \"Scroll position — restored from `searchScrollPosition`\" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.");
    }


    // This test validates: Section 21 line 397 claims "Scroll position — restored from `searchScrollPosition`" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Section 2 lines 71-73 claim Parsed filter chips appear below input when natural ', async ({ page }) => {
    // Checkpoint 19: Section 2 lines 71-73 claim "Parsed filter chips — appear below input when natural language filters detected" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 2 lines 71-73 claim \"Parsed filter chips — appear below input when natural language filters detected\" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-019 ' + "Section 2 lines 71-73 claim \"Parsed filter chips — appear below input when natural language filters detected\" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.");
    }


    // This test validates: Section 2 lines 71-73 claim "Parsed filter chips — appear below input when natural language filters detected" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Section 5 line 135 claims Skeleton loader 5 placeholder cards during search WRON', async ({ page }) => {
    // Checkpoint 20: Section 5 line 135 claims "Skeleton loader — 5 placeholder cards during search" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 5 line 135 claims \"Skeleton loader — 5 placeholder cards during search\" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-020 ' + "Section 5 line 135 claims \"Skeleton loader — 5 placeholder cards during search\" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.");
    }


    // This test validates: Section 5 line 135 claims "Skeleton loader — 5 placeholder cards during search" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Section 7 line 165 claims authors are truncated with et al if 5 WRONG Result car', async ({ page }) => {
    // Checkpoint 21: Section 7 line 165 claims authors are truncated with "et al." if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show " et al." when `r.authors.length > 3` (threshold is 3, not 5).
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 7 line 165 claims authors are truncated with \"et al.\" if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show \" et al.\" when `r.authors.length > 3` (threshold is 3, not 5).",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-021 ' + "Section 7 line 165 claims authors are truncated with \"et al.\" if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show \" et al.\" when `r.authors.length > 3` (threshold is 3, not 5).");
    }


    // This test validates: Section 7 line 165 claims authors are truncated with "et al." if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show " et al." when `r.authors.length > 3` (threshold is 3, not 5).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Section 7 line 169 claims a Study type badge is rendered on each result card WRO', async ({ page }) => {
    // Checkpoint 22: Section 7 line 169 claims a "Study type badge" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 7 line 169 claims a \"Study type badge\" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-022 ' + "Section 7 line 169 claims a \"Study type badge\" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.");
    }


    // This test validates: Section 7 line 169 claims a "Study type badge" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Section 7 line 171 claims a Source badge pubmed semantic_scholar or both is rend', async ({ page }) => {
    // Checkpoint 23: Section 7 line 171 claims a "Source badge" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 7 line 171 claims a \"Source badge\" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-023 ' + "Section 7 line 171 claims a \"Source badge\" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.");
    }


    // This test validates: Section 7 line 171 claims a "Source badge" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Section 7 line 173 claims a PMID badge is rendered WRONG PMID is not displayed a', async ({ page }) => {
    // Checkpoint 24: Section 7 line 173 claims a "PMID badge" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 7 line 173 claims a \"PMID badge\" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-024 ' + "Section 7 line 173 claims a \"PMID badge\" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.");
    }


    // This test validates: Section 7 line 173 claims a "PMID badge" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Section 7 line 174 claims a DOI badge is rendered WRONG DOI is rendered as a tex', async ({ page }) => {
    // Checkpoint 25: Section 7 line 174 claims a "DOI badge" is rendered — **WRONG**. DOI is rendered as a text link ("DOI") in the metadata row, not as a badge component.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 7 line 174 claims a \"DOI badge\" is rendered — **WRONG**. DOI is rendered as a text link (\"DOI\") in the metadata row, not as a badge component.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-025 ' + "Section 7 line 174 claims a \"DOI badge\" is rendered — **WRONG**. DOI is rendered as a text link (\"DOI\") in the metadata row, not as a badge component.");
    }


    // This test validates: Section 7 line 174 claims a "DOI badge" is rendered — **WRONG**. DOI is rendered as a text link ("DOI") in the metadata row, not as a badge component.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Section 17 line 345 claims Temperature 03 for consistent output for synthesis ge', async ({ page }) => {
    // Checkpoint 26: Section 17 line 345 claims "Temperature — 0.3 for consistent output" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 17 line 345 claims \"Temperature — 0.3 for consistent output\" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-026 ' + "Section 17 line 345 claims \"Temperature — 0.3 for consistent output\" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).");
    }


    // This test validates: Section 17 line 345 claims "Temperature — 0.3 for consistent output" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Section 20 Verification System claims Per-paper verification calls apiresearchve', async ({ page }) => {
    // Checkpoint 27: Section 20 (Verification System) claims "Per-paper verification — calls `/api/research/verify`" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Section 20 (Verification System) claims \"Per-paper verification — calls `/api/research/verify`\" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-027 ' + "Section 20 (Verification System) claims \"Per-paper verification — calls `/api/research/verify`\" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.");
    }


    // This test validates: Section 20 (Verification System) claims "Per-paper verification — calls `/api/research/verify`" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: ResearchPage never aborts abortRefcurrent on component unmount so an in-flight a', async ({ page }) => {
    // Checkpoint 28: `ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-028 ' + "`ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`");
    }


    // This test validates: `ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: handleSearch has no stale-request guard beyond AbortController so an older abort', async ({ page }) => {
    // Checkpoint 29: `handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-029 ' + "`handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search");
    }


    // This test validates: `handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Failed searches do not clear the prior results array so an error banner can rend', async ({ page }) => {
    // Checkpoint 30: Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-030 ' + "Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search");
    }


    // This test validates: Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: handleSearch sets hasSearched to true before the fetch resolves so a failed firs', async ({ page }) => {
    // Checkpoint 31: `handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-031 ' + "`handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render");
    }


    // This test validates: `handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Main search button remains enabled for whitespace-only input the no-op happens i', async ({ page }) => {
    // Checkpoint 32: Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-032 ' + "Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`");
    }


    // This test validates: Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Similar-paper cards use unstable React keys keysimIdx instead of a paper identit', async ({ page }) => {
    // Checkpoint 33: Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-033 ' + "Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field");
    }


    // This test validates: Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: handleFindSimilar does not use an AbortController or timeout so similar-paper fe', async ({ page }) => {
    // Checkpoint 34: `handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page
    // Section: Quick Test Workflows > Behavior Corrections (Pass 3)

    // Navigate to the page
    await page.goto('/research', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/research/spec-017');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertResearchCheckpoint({
      page,
      description: "`handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 3)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled research checkpoint: cp-034 ' + "`handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page");
    }


    // This test validates: `handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page
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
