/**
 * Auto-generated Playwright test for library/spec-011
 * Source: e2e/specs/library/spec-011.md
 * Generated: 2026-03-15T16:00:00.134Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts library spec-011
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';



import { assertLibraryCheckpoint } from '../../module-assertions/library';
















test.describe('library / spec-011', () => {
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

  test('cp-000: savePaper creates userReference with isFavorite false as default papersts465', async ({ page }) => {
    // Checkpoint 0: `savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-000 ' + "`savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)");
    }


    // This test validates: `savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: savePaper uses onConflictDoNothing on userReference insert silently deduplicatin', async ({ page }) => {
    // Checkpoint 1: `savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-001 ' + "`savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)");
    }


    // This test validates: `savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: savePaper auto-triggers background autoChunkPaper embedPaperChunks for papers wi', async ({ page }) => {
    // Checkpoint 2: `savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-002 ' + "`savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)");
    }


    // This test validates: `savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: savePaper auto-triggers background queuePdfProcessing for papers with DOI or ope', async ({ page }) => {
    // Checkpoint 3: `savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-003 ' + "`savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)");
    }


    // This test validates: `savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: toggleFavorite server action verifies both refId AND userId match before updatin', async ({ page }) => {
    // Checkpoint 4: `toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-004 ' + "`toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)");
    }


    // This test validates: `toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: removePaper server action verifies both refId AND userId match before soft-delet', async ({ page }) => {
    // Checkpoint 5: `removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-005 ' + "`removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)");
    }


    // This test validates: `removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: getAllCitationFormats is a server action not API route called via React Server A', async ({ page }) => {
    // Checkpoint 6: `getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-006 ' + "`getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)");
    }


    // This test validates: `getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: getAllCitationFormats iterates all five non-BibTeX styles in a for loop generati', async ({ page }) => {
    // Checkpoint 7: `getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)
    // Section: Quick Test Workflows > Server Action Additional Details

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)",
      section: "Quick Test Workflows",
      subsection: "Server Action Additional Details",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-007 ' + "`getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)");
    }


    // This test validates: `getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: Sections 12 Citation Dialog and 13 Reference Store describe shared components NO', async ({ page }) => {
    // Checkpoint 8: Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-008 ' + "Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only");
    }


    // This test validates: Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: Section 14 describes POST apireferencesresolve which is called by the Citation D', async ({ page }) => {
    // Checkpoint 9: Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-009 ' + "Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself");
    }


    // This test validates: Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: Original section 5 claims infinite scroll not implemented Library renders a flat', async ({ page }) => {
    // Checkpoint 10: Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)
    // Section: Quick Test Workflows > Components Referenced But Not Rendered

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)",
      section: "Quick Test Workflows",
      subsection: "Components Referenced But Not Rendered",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-010 ' + "Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)");
    }


    // This test validates: Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Citation tabs are rendered by the shared Tabs component which uses plain button ', async ({ page }) => {
    // Checkpoint 11: Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role="tablist"`, `role="tab"`, or `aria-selected`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role=\"tablist\"`, `role=\"tab\"`, or `aria-selected`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-011 ' + "Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role=\"tablist\"`, `role=\"tab\"`, or `aria-selected`");
    }


    // This test validates: Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role="tablist"`, `role="tab"`, or `aria-selected`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Active citation tab styling is bg-surface-raised text-ink border border-border-s', async ({ page }) => {
    // Checkpoint 12: Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-012 ' + "Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`");
    }


    // This test validates: Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: The shared Modal component used for citations does not set roledialog or aria-mo', async ({ page }) => {
    // Checkpoint 13: The shared `Modal` component used for citations does not set `role="dialog"` or `aria-modal`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "The shared `Modal` component used for citations does not set `role=\"dialog\"` or `aria-modal`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-013 ' + "The shared `Modal` component used for citations does not set `role=\"dialog\"` or `aria-modal`");
    }


    // This test validates: The shared `Modal` component used for citations does not set `role="dialog"` or `aria-modal`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: The shared Modal close button has no aria-label', async ({ page }) => {
    // Checkpoint 14: The shared `Modal` close button has no `aria-label`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "The shared `Modal` close button has no `aria-label`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-014 ' + "The shared `Modal` close button has no `aria-label`");
    }


    // This test validates: The shared `Modal` close button has no `aria-label`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: Search input relies on placeholder text only it has no associated label or aria-', async ({ page }) => {
    // Checkpoint 15: Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-015 ' + "Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`");
    }


    // This test validates: Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Project Study Type and year filter controls have no explicit label or aria-label', async ({ page }) => {
    // Checkpoint 16: Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-016 ' + "Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`");
    }


    // This test validates: Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: Favorite and delete icon-only buttons have no aria-label or title', async ({ page }) => {
    // Checkpoint 17: Favorite and delete icon-only buttons have no `aria-label` or `title`
    // Section: Quick Test Workflows > Accessibility & Shared UI

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Favorite and delete icon-only buttons have no `aria-label` or `title`",
      section: "Quick Test Workflows",
      subsection: "Accessibility & Shared UI",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-017 ' + "Favorite and delete icon-only buttons have no `aria-label` or `title`");
    }


    // This test validates: Favorite and delete icon-only buttons have no `aria-label` or `title`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: Search debounce effect clears its pending timeout in cleanup via return clearTim', async ({ page }) => {
    // Checkpoint 18: Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`
    // Section: Quick Test Workflows > Edge Cases & Cleanup

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`",
      section: "Quick Test Workflows",
      subsection: "Edge Cases & Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-018 ' + "Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`");
    }


    // This test validates: Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: Custom collection names are keyed and matched by the raw string value names diff', async ({ page }) => {
    // Checkpoint 19: Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections
    // Section: Quick Test Workflows > Edge Cases & Cleanup

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections",
      section: "Quick Test Workflows",
      subsection: "Edge Cases & Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-019 ' + "Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections");
    }


    // This test validates: Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: Special characters in collection names are rendered verbatim with no slugging or', async ({ page }) => {
    // Checkpoint 20: Special characters in collection names are rendered verbatim with no slugging or normalization layer
    // Section: Quick Test Workflows > Edge Cases & Cleanup

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Special characters in collection names are rendered verbatim with no slugging or normalization layer",
      section: "Quick Test Workflows",
      subsection: "Edge Cases & Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-020 ' + "Special characters in collection names are rendered verbatim with no slugging or normalization layer");
    }


    // This test validates: Special characters in collection names are rendered verbatim with no slugging or normalization layer
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Upload concurrency is gated only by the disabled Upload PDF trigger button preve', async ({ page }) => {
    // Checkpoint 21: Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true
    // Section: Quick Test Workflows > Edge Cases & Cleanup

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true",
      section: "Quick Test Workflows",
      subsection: "Edge Cases & Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-021 ' + "Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true");
    }


    // This test validates: Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: If apipaperspaperIdpdf fails after savePaper succeeds the paper record remains s', async ({ page }) => {
    // Checkpoint 22: If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback
    // Section: Quick Test Workflows > Edge Cases & Cleanup

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback",
      section: "Quick Test Workflows",
      subsection: "Edge Cases & Cleanup",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-022 ' + "If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback");
    }


    // This test validates: If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: fetchPapers has no request-cancellation or sequence guard so slower older respon', async ({ page }) => {
    // Checkpoint 23: `fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-023 ' + "`fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order");
    }


    // This test validates: `fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: openCiteModal has no request-cancellation or sequencing guard so citation result', async ({ page }) => {
    // Checkpoint 24: `openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-024 ' + "`openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order");
    }


    // This test validates: `openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: copied feedback state is not reset on modal open or tab switch so Copied can lin', async ({ page }) => {
    // Checkpoint 25: `copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-025 ' + "`copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears");
    }


    // This test validates: `copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: findExistingPaper only performs normalized title deduplication when BOTH title a', async ({ page }) => {
    // Checkpoint 26: `findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-026 ' + "`findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path");
    }


    // This test validates: `findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: POST apipapersidpdf accepts any uploaded File object and does not validate PDF M', async ({ page }) => {
    // Checkpoint 27: `POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-027 ' + "`POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage");
    }


    // This test validates: `POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: GET apipapersidpdf authenticates the requester but does not verify a userReferen', async ({ page }) => {
    // Checkpoint 28: `GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-028 ' + "`GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content");
    }


    // This test validates: `GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: POST apipapersidpdf authenticates the requester but does not verify paper owners', async ({ page }) => {
    // Checkpoint 29: `POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID
    // Section: Quick Test Workflows > Async Edge Cases & Authorization

    // Navigate to the page
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/library/spec-011');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertLibraryCheckpoint({
      page,
      description: "`POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID",
      section: "Quick Test Workflows",
      subsection: "Async Edge Cases & Authorization",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled library checkpoint: cp-029 ' + "`POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID");
    }


    // This test validates: `POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID
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
