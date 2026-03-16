/**
 * Auto-generated Playwright test for studio/spec-016
 * Source: e2e/specs/studio/spec-016.md
 * Generated: 2026-03-15T16:21:51.816Z
 *
 * Each test case corresponds to one checkbox in the spec file.
 * The controller (qa/controller.ts) uses Playwright JSON output
 * and artifact existence to determine verdicts.
 *
 * DO NOT EDIT — regenerate with: npx tsx qa/spec-to-playwright.ts studio spec-016
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';





import { assertStudioCheckpoint } from '../../module-assertions/studio';














test.describe('studio / spec-016', () => {
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

  test('cp-000: Replies indented with ml-4', async ({ page }) => {
    // Checkpoint 0: Replies indented with `ml-4`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Replies indented with `ml-4`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-000.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-000 ' + "Replies indented with `ml-4`");
    }


    // This test validates: Replies indented with `ml-4`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-001: Enter key submits comment or reply without Shift epreventDefault blocks newline', async ({ page }) => {
    // Checkpoint 1: Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-001.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-001 ' + "Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline");
    }


    // This test validates: Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-002: Comments stored via document-comments-local localStorage functions NOT database ', async ({ page }) => {
    // Checkpoint 2: Comments stored via `document-comments-local` localStorage functions — NOT database API
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Comments stored via `document-comments-local` localStorage functions — NOT database API",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-002.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-002 ' + "Comments stored via `document-comments-local` localStorage functions — NOT database API");
    }


    // This test validates: Comments stored via `document-comments-local` localStorage functions — NOT database API
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-003: Comment user ID is hardcoded as local-user', async ({ page }) => {
    // Checkpoint 3: Comment user ID is hardcoded as `"local-user"`
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Comment user ID is hardcoded as `\"local-user\"`",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-003.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-003 ' + "Comment user ID is hardcoded as `\"local-user\"`");
    }


    // This test validates: Comment user ID is hardcoded as `"local-user"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-004: Clicking a comments quoted text calls scrollToComment which sets editor text sel', async ({ page }) => {
    // Checkpoint 4: Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-004.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-004 ' + "Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view");
    }


    // This test validates: Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-005: New comment input at bottom of sidebar is hidden when inline comment form is act', async ({ page }) => {
    // Checkpoint 5: New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === "new-inline"`)
    // Section: Quick Test Workflows > Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === \"new-inline\"`)",
      section: "Quick Test Workflows",
      subsection: "Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-005.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-005 ' + "New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === \"new-inline\"`)");
    }


    // This test validates: New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === "new-inline"`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-006: toCitationAuthors empty or whitespace-only author string maps to family Unknown ', async ({ page }) => {
    // Checkpoint 6: `toCitationAuthors`: empty or whitespace-only author string maps to `{ family: "Unknown", given: "" }`
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`toCitationAuthors`: empty or whitespace-only author string maps to `{ family: \"Unknown\", given: \"\" }`",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-006.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-006 ' + "`toCitationAuthors`: empty or whitespace-only author string maps to `{ family: \"Unknown\", given: \"\" }`");
    }


    // This test validates: `toCitationAuthors`: empty or whitespace-only author string maps to `{ family: "Unknown", given: "" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-007: toCitationAuthors author with comma eg Smith John splits on first comma first pa', async ({ page }) => {
    // Checkpoint 7: `toCitationAuthors`: author with comma (e.g. "Smith, John") splits on first comma — first part is family, second is given
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`toCitationAuthors`: author with comma (e.g. \"Smith, John\") splits on first comma — first part is family, second is given",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-007.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-007 ' + "`toCitationAuthors`: author with comma (e.g. \"Smith, John\") splits on first comma — first part is family, second is given");
    }


    // This test validates: `toCitationAuthors`: author with comma (e.g. "Smith, John") splits on first comma — first part is family, second is given
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-008: toCitationAuthors author without comma splits on spaces last word is family rest', async ({ page }) => {
    // Checkpoint 8: `toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-008.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-008 ' + "`toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given");
    }


    // This test validates: `toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-009: toCitationAuthors single-word author name maps to family name given', async ({ page }) => {
    // Checkpoint 9: `toCitationAuthors`: single-word author name maps to `{ family: name, given: "" }`
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`toCitationAuthors`: single-word author name maps to `{ family: name, given: \"\" }`",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-009.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-009 ' + "`toCitationAuthors`: single-word author name maps to `{ family: name, given: \"\" }`");
    }


    // This test validates: `toCitationAuthors`: single-word author name maps to `{ family: name, given: "" }`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-010: buildResearchReference creates ID ref-research-stableKey where stableKey is trim', async ({ page }) => {
    // Checkpoint 10: `buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, "-")`)
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, \"-\")`)",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-010.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-010 ' + "`buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, \"-\")`)");
    }


    // This test validates: `buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, "-")`)
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-011: Research reference sets type article CSL type article-journal and year defaults ', async ({ page }) => {
    // Checkpoint 11: Research reference sets `type: "article"`, CSL type `"article-journal"`, and `year` defaults to `0` when missing
    // Section: Quick Test Workflows > Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Research reference sets `type: \"article\"`, CSL type `\"article-journal\"`, and `year` defaults to `0` when missing",
      section: "Quick Test Workflows",
      subsection: "Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-011.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-011 ' + "Research reference sets `type: \"article\"`, CSL type `\"article-journal\"`, and `year` defaults to `0` when missing");
    }


    // This test validates: Research reference sets `type: "article"`, CSL type `"article-journal"`, and `year` defaults to `0` when missing
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-012: Default document title initialized as Untitled Document', async ({ page }) => {
    // Checkpoint 12: Default document title initialized as `"Untitled Document"`
    // Section: Quick Test Workflows > useStudioDocument Hook (`src/hooks/use-studio-document.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Default document title initialized as `\"Untitled Document\"`",
      section: "Quick Test Workflows",
      subsection: "useStudioDocument Hook (`src/hooks/use-studio-document.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-012.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-012 ' + "Default document title initialized as `\"Untitled Document\"`");
    }


    // This test validates: Default document title initialized as `"Untitled Document"`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-013: Document load failure without doc error set to Failed to load or create document', async ({ page }) => {
    // Checkpoint 13: Document load failure without doc: error set to `"Failed to load or create document."`
    // Section: Quick Test Workflows > useStudioDocument Hook (`src/hooks/use-studio-document.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Document load failure without doc: error set to `\"Failed to load or create document.\"`",
      section: "Quick Test Workflows",
      subsection: "useStudioDocument Hook (`src/hooks/use-studio-document.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-013.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-013 ' + "Document load failure without doc: error set to `\"Failed to load or create document.\"`");
    }


    // This test validates: Document load failure without doc: error set to `"Failed to load or create document."`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-014: Document load network error error set to Failed to load document Please try agai', async ({ page }) => {
    // Checkpoint 14: Document load network error: error set to `"Failed to load document. Please try again."` and logged as `"Failed to load document:"` to console
    // Section: Quick Test Workflows > useStudioDocument Hook (`src/hooks/use-studio-document.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Document load network error: error set to `\"Failed to load document. Please try again.\"` and logged as `\"Failed to load document:\"` to console",
      section: "Quick Test Workflows",
      subsection: "useStudioDocument Hook (`src/hooks/use-studio-document.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-014.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-014 ' + "Document load network error: error set to `\"Failed to load document. Please try again.\"` and logged as `\"Failed to load document:\"` to console");
    }


    // This test validates: Document load network error: error set to `"Failed to load document. Please try again."` and logged as `"Failed to load document:"` to console
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-015: After first load hasLoadedRef listUserProjects is re-fetched to catch projects c', async ({ page }) => {
    // Checkpoint 15: After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`
    // Section: Quick Test Workflows > useStudioDocument Hook (`src/hooks/use-studio-document.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`",
      section: "Quick Test Workflows",
      subsection: "useStudioDocument Hook (`src/hooks/use-studio-document.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-015.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-015 ' + "After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`");
    }


    // This test validates: After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-016: Title save timer cleaned up on unmount via useEffect cleanup', async ({ page }) => {
    // Checkpoint 16: Title save timer cleaned up on unmount via `useEffect` cleanup
    // Section: Quick Test Workflows > useStudioDocument Hook (`src/hooks/use-studio-document.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "Title save timer cleaned up on unmount via `useEffect` cleanup",
      section: "Quick Test Workflows",
      subsection: "useStudioDocument Hook (`src/hooks/use-studio-document.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-016.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-016 ' + "Title save timer cleaned up on unmount via `useEffect` cleanup");
    }


    // This test validates: Title save timer cleaned up on unmount via `useEffect` cleanup
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-017: REPORTING_GUIDELINES constant maps document types to guideline arrays case_repor', async ({ page }) => {
    // Checkpoint 17: `REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `["CARE"]`, `original_article` → `["CONSORT", "STROBE", "STARD", "TRIPOD"]`, `review_article` → `["PRISMA", "Narrative review best practices"]`, `meta_analysis` → `["PRISMA 2020", "Cochrane Handbook"]`
    // Section: Quick Test Workflows > Guide Types (`src/types/guide.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `[\"CARE\"]`, `original_article` → `[\"CONSORT\", \"STROBE\", \"STARD\", \"TRIPOD\"]`, `review_article` → `[\"PRISMA\", \"Narrative review best practices\"]`, `meta_analysis` → `[\"PRISMA 2020\", \"Cochrane Handbook\"]`",
      section: "Quick Test Workflows",
      subsection: "Guide Types (`src/types/guide.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-017.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-017 ' + "`REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `[\"CARE\"]`, `original_article` → `[\"CONSORT\", \"STROBE\", \"STARD\", \"TRIPOD\"]`, `review_article` → `[\"PRISMA\", \"Narrative review best practices\"]`, `meta_analysis` → `[\"PRISMA 2020\", \"Cochrane Handbook\"]`");
    }


    // This test validates: `REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `["CARE"]`, `original_article` → `["CONSORT", "STROBE", "STARD", "TRIPOD"]`, `review_article` → `["PRISMA", "Narrative review best practices"]`, `meta_analysis` → `["PRISMA 2020", "Cochrane Handbook"]`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-018: book_chapter academic_draft and letter have empty reporting guidelines arrays', async ({ page }) => {
    // Checkpoint 18: `book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays
    // Section: Quick Test Workflows > Guide Types (`src/types/guide.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays",
      section: "Quick Test Workflows",
      subsection: "Guide Types (`src/types/guide.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-018.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-018 ' + "`book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays");
    }


    // This test validates: `book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-019: PrecisionEditAction type defines 14 precision edit actions rephrase shorten expa', async ({ page }) => {
    // Checkpoint 19: `PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`
    // Section: Quick Test Workflows > Draft Types (`src/types/draft.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`",
      section: "Quick Test Workflows",
      subsection: "Draft Types (`src/types/draft.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-019.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-019 ' + "`PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`");
    }


    // This test validates: `PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-020: ScholarRules interface defines project-level AI configuration including dialect ', async ({ page }) => {
    // Checkpoint 20: `ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings
    // Section: Quick Test Workflows > Draft Types (`src/types/draft.ts`)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings",
      section: "Quick Test Workflows",
      subsection: "Draft Types (`src/types/draft.ts`)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-020.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-020 ' + "`ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings");
    }


    // This test validates: `ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-021: Section 1 check 264px Left sidebar is w-64 which is 256px 16rem not 264px', async ({ page }) => {
    // Checkpoint 21: **Section 1 check "264px"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 1 check \"264px\"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-021.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-021 ' + "**Section 1 check \"264px\"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.");
    }


    // This test validates: **Section 1 check "264px"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-022: Section 6 check Heading levels 14 StarterKit is configured with heading levels 1', async ({ page }) => {
    // Checkpoint 22: **Section 6 check "Heading levels 1–4"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 6 check \"Heading levels 1–4\"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-022.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-022 ' + "**Section 6 check \"Heading levels 1–4\"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.");
    }


    // This test validates: **Section 6 check "Heading levels 1–4"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-023: Section 8 check Messages render markdown content Messages are rendered as plain ', async ({ page }) => {
    // Checkpoint 23: **Section 8 check "Messages render markdown content"**: Messages are rendered as **plain text** inside `<p className="whitespace-pre-wrap">`, not as rendered markdown.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 8 check \"Messages render markdown content\"**: Messages are rendered as **plain text** inside `<p className=\"whitespace-pre-wrap\">`, not as rendered markdown.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-023.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-023 ' + "**Section 8 check \"Messages render markdown content\"**: Messages are rendered as **plain text** inside `<p className=\"whitespace-pre-wrap\">`, not as rendered markdown.");
    }


    // This test validates: **Section 8 check "Messages render markdown content"**: Messages are rendered as **plain text** inside `<p className="whitespace-pre-wrap">`, not as rendered markdown.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-024: Section 15 checks CmdOpt1-4 for headings AcademicKeyboardShortcuts binds Mod-Shi', async ({ page }) => {
    // Checkpoint 24: **Section 15 checks "Cmd+Opt+1-4" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show "Cmd+Opt+1-4" but the actual keyboard bindings are Cmd+Shift.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 15 checks \"Cmd+Opt+1-4\" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show \"Cmd+Opt+1-4\" but the actual keyboard bindings are Cmd+Shift.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-024.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-024 ' + "**Section 15 checks \"Cmd+Opt+1-4\" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show \"Cmd+Opt+1-4\" but the actual keyboard bindings are Cmd+Shift.");
    }


    // This test validates: **Section 15 checks "Cmd+Opt+1-4" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show "Cmd+Opt+1-4" but the actual keyboard bindings are Cmd+Shift.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-025: Section 15 check Redo CtrlY Redo is bound as CmdShiftZ from StarterKit and shown', async ({ page }) => {
    // Checkpoint 25: **Section 15 check "Redo Ctrl+Y"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 15 check \"Redo Ctrl+Y\"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-025.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-025 ' + "**Section 15 check \"Redo Ctrl+Y\"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.");
    }


    // This test validates: **Section 15 check "Redo Ctrl+Y"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-026: Section 7 AI Summarize Selection This is NOT a slash command No entry named AI S', async ({ page }) => {
    // Checkpoint 26: **Section 7 "AI Summarize Selection"**: This is **NOT a slash command**. No entry named "AI Summarize Selection" or "Summarize" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 7 \"AI Summarize Selection\"**: This is **NOT a slash command**. No entry named \"AI Summarize Selection\" or \"Summarize\" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-026.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-026 ' + "**Section 7 \"AI Summarize Selection\"**: This is **NOT a slash command**. No entry named \"AI Summarize Selection\" or \"Summarize\" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.");
    }


    // This test validates: **Section 7 "AI Summarize Selection"**: This is **NOT a slash command**. No entry named "AI Summarize Selection" or "Summarize" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-027: Section 7 Find Sources This is NOT a slash command No entry named Find Sources e', async ({ page }) => {
    // Checkpoint 27: **Section 7 "Find Sources"**: This is **NOT a slash command**. No entry named "Find Sources" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 7 \"Find Sources\"**: This is **NOT a slash command**. No entry named \"Find Sources\" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-027.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-027 ' + "**Section 7 \"Find Sources\"**: This is **NOT a slash command**. No entry named \"Find Sources\" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.");
    }


    // This test validates: **Section 7 "Find Sources"**: This is **NOT a slash command**. No entry named "Find Sources" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-028: Section 7 Check Integrity This is NOT a slash command No entry named Check Integ', async ({ page }) => {
    // Checkpoint 28: **Section 7 "Check Integrity"**: This is **NOT a slash command**. No entry named "Check Integrity" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 7 \"Check Integrity\"**: This is **NOT a slash command**. No entry named \"Check Integrity\" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-028.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-028 ' + "**Section 7 \"Check Integrity\"**: This is **NOT a slash command**. No entry named \"Check Integrity\" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.");
    }


    // This test validates: **Section 7 "Check Integrity"**: This is **NOT a slash command**. No entry named "Check Integrity" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-029: Section 7 Add Citation The actual slash command title is Cite not Add Citation', async ({ page }) => {
    // Checkpoint 29: **Section 7 "Add Citation"**: The actual slash command title is **"Cite"**, not "Add Citation".
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 7 \"Add Citation\"**: The actual slash command title is **\"Cite\"**, not \"Add Citation\".",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-029.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-029 ' + "**Section 7 \"Add Citation\"**: The actual slash command title is **\"Cite\"**, not \"Add Citation\".");
    }


    // This test validates: **Section 7 "Add Citation"**: The actual slash command title is **"Cite"**, not "Add Citation".
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-030: Section 7 AI Continue Writing The actual slash command title is Continue Writing', async ({ page }) => {
    // Checkpoint 30: **Section 7 "AI Continue Writing"**: The actual slash command title is **"Continue Writing"**, not "AI Continue Writing".
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Section 7 \"AI Continue Writing\"**: The actual slash command title is **\"Continue Writing\"**, not \"AI Continue Writing\".",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-030.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-030 ' + "**Section 7 \"AI Continue Writing\"**: The actual slash command title is **\"Continue Writing\"**, not \"AI Continue Writing\".");
    }


    // This test validates: **Section 7 "AI Continue Writing"**: The actual slash command title is **"Continue Writing"**, not "AI Continue Writing".
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-031: Check 759 getEditorText Actual code is editorRefcurrentviewdominnerTexttrim edit', async ({ page }) => {
    // Checkpoint 31: **Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: \"\\n\\n\" }) || \"\"` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-031.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-031 ' + "**Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: \"\\n\\n\" }) || \"\"` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.");
    }


    // This test validates: **Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-032: Check 767 no sources prop IntegrityPanel IS passed sourcesintegritySources a com', async ({ page }) => {
    // Checkpoint 32: **Check #767 "no sources prop"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Check #767 \"no sources prop\"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-032.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-032 ' + "**Check #767 \"no sources prop\"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.");
    }


    // This test validates: **Check #767 "no sources prop"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-033: Check 730 CmdShiftC emits scholarsyncopen-citation-dialog The keyboard-shortcuts', async ({ page }) => {
    // Checkpoint 33: **Check #730 "Cmd+Shift+C emits scholarsync:open-citation-dialog"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: "insert-citation"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command "Cite" dispatches `scholarsync:open-citation-dialog`.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "**Check #730 \"Cmd+Shift+C emits scholarsync:open-citation-dialog\"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: \"insert-citation\"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command \"Cite\" dispatches `scholarsync:open-citation-dialog`.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-033.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-033 ' + "**Check #730 \"Cmd+Shift+C emits scholarsync:open-citation-dialog\"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: \"insert-citation\"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command \"Cite\" dispatches `scholarsync:open-citation-dialog`.");
    }


    // This test validates: **Check #730 "Cmd+Shift+C emits scholarsync:open-citation-dialog"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: "insert-citation"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command "Cite" dispatches `scholarsync:open-citation-dialog`.
    // The controller will parse results from Playwright JSON output.
    // A PASS here means:
    //   1. Page loaded without crash
    //   2. Screenshot captured (proof of browser execution)
    //   3. No uncaught page errors
    if (errors.length > 0) {
      throw new Error(`Page errors detected: ${errors.join('; ')}`);
    }
  });

  test('cp-034: studio renders KeyboardShortcutsDialog but CmdShiftC is still a broken route-lev', async ({ page }) => {
    // Checkpoint 34: `/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: "insert-citation"` is never handled by the page listener.
    // Section: Quick Test Workflows > Behavior Corrections (Pass 2)

    // Navigate to the page
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});

    // Take a screenshot as proof of page load
    const screenshotDir = path.join(process.cwd(), 'qa/artifacts/studio/spec-016');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    // Verify the page loaded without critical errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Wait for main content to be visible
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });

    const handled = await assertStudioCheckpoint({
      page,
      description: "`/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: \"insert-citation\"` is never handled by the page listener.",
      section: "Quick Test Workflows",
      subsection: "Behavior Corrections (Pass 2)",
      rootDir: process.cwd(),
    });


    // Screenshot as proof this test actually ran in a browser
    await page.screenshot({
      path: path.join(screenshotDir, 'cp-034.png'),
      fullPage: false,
    });

    if (!handled) {
      throw new Error('Unhandled studio checkpoint: cp-034 ' + "`/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: \"insert-citation\"` is never handled by the page listener.");
    }


    // This test validates: `/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: "insert-citation"` is never handled by the page listener.
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
