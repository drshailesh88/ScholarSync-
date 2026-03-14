/**
 * Auto-generated Playwright test for feeds/spec-015
 * Source: e2e/specs/feeds/spec-015.md
 * Generated: 2026-03-14T14:50:25.000Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts feeds spec-015
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';












import { assertFeedsCheckpoint } from '../../module-assertions/feeds';







test.describe('feeds / spec-015', () => {
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

  test('cp-000: Paper card container rounded-xl border border-border-subtle bg-surface-raised60 ', async ({ page }) => {
    // Checkpoint 0: Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-000 Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`');
    }


    // This test validates: Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Paper title text-sm font-medium leading-snug text-ink', async ({ page }) => {
    // Checkpoint 1: Paper title: `text-sm font-medium leading-snug text-ink`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Paper title: `text-sm font-medium leading-snug text-ink`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-001 Paper title: `text-sm font-medium leading-snug text-ink`');
    }


    // This test validates: Paper title: `text-sm font-medium leading-snug text-ink`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Authors first 3 joined by et al when more than 3', async ({ page }) => {
    // Checkpoint 2: Authors: first 3 joined by ", " + " et al." when more than 3
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Authors: first 3 joined by \", \" + \" et al.\" when more than 3",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-002 Authors: first 3 joined by ", " + " et al." when more than 3');
    }


    // This test validates: Authors: first 3 joined by ", " + " et al." when more than 3
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Authors fallback Unknown authors when authors array is empty', async ({ page }) => {
    // Checkpoint 3: Authors fallback: "Unknown authors" when authors array is empty
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Authors fallback: \"Unknown authors\" when authors array is empty",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-003 Authors fallback: "Unknown authors" when authors array is empty');
    }


    // This test validates: Authors fallback: "Unknown authors" when authors array is empty
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Paper metadata line authors journal year each part conditional', async ({ page }) => {
    // Checkpoint 4: Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-004 Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)');
    }


    // This test validates: Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: Paper abstract line-clamp-3 text-xs leading-relaxed text-ink-muted only shown wh', async ({ page }) => {
    // Checkpoint 5: Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-005 Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists');
    }


    // This test validates: Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: DOI link inline-flex items-center gap-1 text-xs text-brand hoverunderline with A', async ({ page }) => {
    // Checkpoint 6: DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-006 DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)');
    }


    // This test validates: DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: PubMed link same styling as DOI link links to httpspubmedncbinlmnihgovpmid', async ({ page }) => {
    // Checkpoint 7: PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-007 PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`');
    }


    // This test validates: PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Citation count count citations in text-xs text-ink-muted only shown when citatio', async ({ page }) => {
    // Checkpoint 8: Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-008 Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`');
    }


    // This test validates: Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Save button Saving state icon Spinner with animate-spin', async ({ page }) => {
    // Checkpoint 9: Save button "Saving..." state icon: `Spinner` with `animate-spin`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Save button \"Saving...\" state icon: `Spinner` with `animate-spin`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-009 Save button "Saving..." state icon: `Spinner` with `animate-spin`');
    }


    // This test validates: Save button "Saving..." state icon: `Spinner` with `animate-spin`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Save button Saved state icon Check with weightbold', async ({ page }) => {
    // Checkpoint 10: Save button "Saved" state icon: `Check` with `weight="bold"`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Save button \"Saved\" state icon: `Check` with `weight=\"bold\"`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-010 Save button "Saved" state icon: `Check` with `weight="bold"`');
    }


    // This test validates: Save button "Saved" state icon: `Check` with `weight="bold"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Save button Retry Save state icon BookmarkSimple with weightfill', async ({ page }) => {
    // Checkpoint 11: Save button "Retry Save" state icon: `BookmarkSimple` with `weight="fill"`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Save button \"Retry Save\" state icon: `BookmarkSimple` with `weight=\"fill\"`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-011 Save button "Retry Save" state icon: `BookmarkSimple` with `weight="fill"`');
    }


    // This test validates: Save button "Retry Save" state icon: `BookmarkSimple` with `weight="fill"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Save button idle state icon BookmarkSimple with weightregular', async ({ page }) => {
    // Checkpoint 12: Save button idle state icon: `BookmarkSimple` with `weight="regular"`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Save button idle state icon: `BookmarkSimple` with `weight=\"regular\"`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-012 Save button idle state icon: `BookmarkSimple` with `weight="regular"`');
    }


    // This test validates: Save button idle state icon: `BookmarkSimple` with `weight="regular"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Save POSTs to apipaperssave with paper body', async ({ page }) => {
    // Checkpoint 13: Save POSTs to `/api/papers/save` with `{ paper }` body
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Save POSTs to `/api/papers/save` with `{ paper }` body",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-013 Save POSTs to `/api/papers/save` with `{ paper }` body');
    }


    // This test validates: Save POSTs to `/api/papers/save` with `{ paper }` body
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: RelatedPapers uses local component state separate from stores copilot-related pa', async ({ page }) => {
    // Checkpoint 14: `RelatedPapers` uses local component state (separate from store's copilot-related papers)
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`RelatedPapers` uses local component state (separate from store's copilot-related papers)",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-014 `RelatedPapers` uses local component state (separate from store\'s copilot-related papers)');
    }


    // This test validates: `RelatedPapers` uses local component state (separate from store's copilot-related papers)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: RelatedPapers prevents re-fetch after first load if loading loaded return', async ({ page }) => {
    // Checkpoint 15: `RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-015 `RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`');
    }


    // This test validates: `RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: getPaperKey fallback chain paperdoi paperpmid papers2Id title-year-index', async ({ page }) => {
    // Checkpoint 16: `getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || "{title}-{year}-{index}"`
    // Section: Quick Test Workflows > Related Papers (related-papers.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "`getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || \"{title}-{year}-{index}\"`",
      section: "Quick Test Workflows",
      subsection: "Related Papers (related-papers.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-016 `getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || "{title}-{year}-{index}"`');
    }


    // This test validates: `getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || "{title}-{year}-{index}"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Copilot header icon container w-6 h-6 rounded-full bg-brand20', async ({ page }) => {
    // Checkpoint 17: Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-017 Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`');
    }


    // This test validates: Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Copilot title AI Copilot text-sm font-semibold text-ink', async ({ page }) => {
    // Checkpoint 18: Copilot title: "AI Copilot" (`text-sm font-semibold text-ink`)
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Copilot title: \"AI Copilot\" (`text-sm font-semibold text-ink`)",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-018 Copilot title: "AI Copilot" (`text-sm font-semibold text-ink`)');
    }


    // This test validates: Copilot title: "AI Copilot" (`text-sm font-semibold text-ink`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Close button p-15 rounded-lg text-ink-muted hovertext-ink hoverbg-surface-raised', async ({ page }) => {
    // Checkpoint 19: Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-019 Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`');
    }


    // This test validates: Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: CompactHeader styling px-4 py-3 bg-surface-raised50 rounded-xl border border-bor', async ({ page }) => {
    // Checkpoint 20: CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-020 CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`');
    }


    // This test validates: CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: CompactHeader title text-sm font-semibold text-ink line-clamp-2', async ({ page }) => {
    // Checkpoint 21: CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-021 CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`');
    }


    // This test validates: CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: CompactHeader second line authors journal year year from new DatepublishedAtgetF', async ({ page }) => {
    // Checkpoint 22: CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-022 CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)');
    }


    // This test validates: CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: CompactHeader authors fallback empty string when null', async ({ page }) => {
    // Checkpoint 23: CompactHeader authors fallback: empty string `""` when null
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "CompactHeader authors fallback: empty string `\"\"` when null",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-023 CompactHeader authors fallback: empty string `""` when null');
    }


    // This test validates: CompactHeader authors fallback: empty string `""` when null
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Quick actions layout flex gap-2 NOT grid despite doc section calling it 3-column', async ({ page }) => {
    // Checkpoint 24: Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it "3-column grid")
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it \"3-column grid\")",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-024 Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it "3-column grid")');
    }


    // This test validates: Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it "3-column grid")
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Summarize button full styling bg-brand10 text-brand with Lightning icon weightfi', async ({ page }) => {
    // Checkpoint 25: Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight="fill"`)
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight=\"fill\"`)",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-025 Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight="fill"`)');
    }


    // This test validates: Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight="fill"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Explain button full styling bg-surface-raised text-ink with ChatText icon', async ({ page }) => {
    // Checkpoint 26: Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-026 Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon');
    }


    // This test validates: Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Explain sends hardcoded question Explain this paper to me in simple terms what w', async ({ page }) => {
    // Checkpoint 27: Explain sends hardcoded question: "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Explain sends hardcoded question: \"Explain this paper to me in simple terms — what was studied, what was found, and why it matters.\"",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-027 Explain sends hardcoded question: "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."');
    }


    // This test validates: Explain sends hardcoded question: "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Related button full styling bg-surface-raised text-ink with Books icon', async ({ page }) => {
    // Checkpoint 28: Related button full styling: `bg-surface-raised text-ink` with `Books` icon
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Related button full styling: `bg-surface-raised text-ink` with `Books` icon",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-028 Related button full styling: `bg-surface-raised text-ink` with `Books` icon');
    }


    // This test validates: Related button full styling: `bg-surface-raised text-ink` with `Books` icon
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Related button disabled condition copilotLoading relatedPapersLoading stricter t', async ({ page }) => {
    // Checkpoint 29: Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-029 Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)');
    }


    // This test validates: Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Summarize and Explain disabled condition only copilotLoading', async ({ page }) => {
    // Checkpoint 30: Summarize and Explain disabled condition: only `copilotLoading`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Summarize and Explain disabled condition: only `copilotLoading`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-030 Summarize and Explain disabled condition: only `copilotLoading`');
    }


    // This test validates: Summarize and Explain disabled condition: only `copilotLoading`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Source badge full_paper bg-emerald-50010 border-emerald-50020 text-emerald-600 d', async ({ page }) => {
    // Checkpoint 31: Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-031 Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`');
    }


    // This test validates: Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Source badge abstract_only bg-amber-50010 border-amber-50020 text-amber-600 dark', async ({ page }) => {
    // Checkpoint 32: Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-032 Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`');
    }


    // This test validates: Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Source badge title_only bg-red-50010 border-red-50020 text-red-500', async ({ page }) => {
    // Checkpoint 33: Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-033 Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`');
    }


    // This test validates: Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: Source badge icons full_paper abstract_only title_only', async ({ page }) => {
    // Checkpoint 34: Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only
    // Section: Quick Test Workflows > Copilot Panel (copilot-panel.tsx)

    // Navigate to the page
    await page.goto('/feeds', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/feeds/spec-015');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertFeedsCheckpoint({
      page,
      description: "Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only",
      section: "Quick Test Workflows",
      subsection: "Copilot Panel (copilot-panel.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled feeds checkpoint: cp-034 Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only');
    }


    // This test validates: Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only
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
